import { getBucketName, storagePath } from "../app/cloudStorage.js";
import { deletedReportCollection, reportCollection } from "../app/firestore.js";
import { getCurrentTime, deleteCountdown, unlinkFIle } from "../app/util.js";
import { storeReportValidation } from "../validation/reportValidation.js";
import { validation } from "../validation/validation.js";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import {
	GCP_BUCKET_FOLDER,
	GCP_BUCKET_NAME,
	GCP_REPORT_BUCKET_FOLDER,
} from "../app/const.js";
dotenv.config();

const storeReport = async (req, userId, file) => {
	req = validation(storeReportValidation, req);

	const filePath = file.path;
	const fileName = file.filename;

	let gcs = getBucketName(process.env.GCP_BUCKET_NAME || GCP_BUCKET_NAME);

	await gcs.upload(filePath, {
		destination: storagePath(
			process.env.GCP_REPORT_BUCKET_FOLDER || GCP_REPORT_BUCKET_FOLDER,
			fileName
		),
		predefinedAcl: "publicRead",
		metadata: {
			contentType: file.mimetype,
		},
	});

	unlinkFIle(filePath);

	req.report_id = `report-${uuid()}`;
	req.user_id = userId;
	req.image = `https://storage.googleapis.com/${
		process.env.GCP_BUCKET_NAME || GCP_BUCKET_NAME
	}/${
		process.env.GCP_REPORT_BUCKET_FOLDER || GCP_REPORT_BUCKET_FOLDER
	}/${fileName}`;

	req.created_at = getCurrentTime();
	req.delete_countdown = deleteCountdown();

	await reportCollection.doc(req.report_id).set(req);

	const getReport = await reportCollection
		.where("report_id", "==", req.report_id)
		.where("user_id", "==", req.user_id)
		.get();

	const data = getReport.docs.map((doc) => {
		const {
			report_id,
			user_id,
			latitude,
			longitude,
			image,
			description,
			sign,
		} = doc.data();
		return {
			report_id,
			user_id,
			latitude,
			longitude,
			image,
			description,
			sign,
		};
	});

	return data;
};

const getListReport = async (req, userId) => {
	const limit = Number(req.size);
	const page = Number(req.page);
	let lastVisible = null;

	let query = reportCollection.where("user_id", "==", userId).limit(limit);

	const offset = (page - 1) * limit;

	if (offset > 0) {
		const skipQuery = await reportCollection
			.where("user_id", "==", userId)
			.limit(offset)
			.get();
		lastVisible = skipQuery.docs[skipQuery.docs.length - 1];
		query = query.startAfter(lastVisible);
	}

	const getReport = await query.get();

	const data = getReport.docs.map((doc) => {
		const {
			report_id,
			user_id,
			latitude,
			longitude,
			image,
			description,
			sign,
			created_at,
		} = doc.data();
		return {
			report_id,
			user_id,
			latitude,
			longitude,
			image,
			description,
			sign,
			created_at,
		};
	});

	let totalItems = await reportCollection.where("user_id", "==", userId).get();
	totalItems = totalItems.size;

	return {
		data,
		paging: {
			total_item: totalItems,
			total_page: Math.ceil(totalItems / limit),
			page,
			size: limit,
		},
	};
};

const softDelete = async () => {
	const currentTime = getCurrentTime();

	const getData = await reportCollection
		.where("delete_countdown", "<=", currentTime)
		.get();

	getData.docs.forEach(async (doc) => {
		const data = doc.data();

		await deletedReportCollection.add(data);

		await doc.ref.delete();
	});
};

export default { storeReport, getListReport, softDelete };
