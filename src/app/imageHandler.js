import multer from "multer";
import { v4 as uuid } from "uuid";
import { ResponseError } from "../error/responseError.js";

const TYPE_IMAGE = {
	"image/jpeg": "jpeg",
	"image/png": "png",
	"image/jpg": "jpg",
};

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./assets/users");
	},
	filename: (req, file, cb) => {
		const filename = uuid().toString();
		const ext = TYPE_IMAGE[file.mimetype];
		cb(null, `${filename}.${ext}`);
	},
});

const fileFilter = (req, file, cb) => {
	const accptFile = Object.keys(TYPE_IMAGE);

	if (!accptFile.includes(file.mimetype)) {
		cb(new ResponseError(400, "File not accepted"));
	} else {
		cb(null, true);
	}
};

const fileSize = 10 * 1024 * 1024;

export const imageHandler = multer({
	storage,
	fileFilter,
	limits: { fileSize },
}).single("image");
