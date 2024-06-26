import { deletedReportCollection, reportCollection } from "../app/firestore.js";
import { getCurrentTime } from "../app/util.js";
import dotenv from "dotenv";
dotenv.config();

const getListReport = async (req, userId) => {
	const limit = Number(req.size) || 10;
	const page = Number(req.page) || 1;
	const locationParams = req.location || 0;

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

	let data;

	if (locationParams == 1) {
		data = getReport.docs.map((doc) => {
			const {
				report_id,
				user_id,
				image,
				description,
				sign,
				created_at,
				prediction,
				classification_result,
				location,
			} = doc.data();
			return {
				report_id,
				user_id,
				image,
				description,
				sign,
				created_at,
				prediction,
				classification_result,
				location,
			};
		});
	} else {
		data = getReport.docs.map((doc, index) => {
			const {
				report_id,
				user_id,
				image,
				description,
				sign,
				created_at,
				prediction,
				classification_result,
				location,
			} = doc.data();

			const modifiedLocation =
				index === 0
					? location
					: {
							...location,
							_latitude: null,
							_longitude: null,
					  };
			return {
				report_id,
				user_id,
				image,
				description,
				sign,
				created_at,
				prediction,
				classification_result,
				location: modifiedLocation,
			};
		});
	}

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

export default { getListReport, softDelete };
