import fs from "fs";
import { addDays, addHours } from "date-fns";

export const unlinkFIle = (filePath) => {
	fs.unlink(`${filePath}`, (err) => {
		if (err) throw new ResponseError(err.status, err.message);
	});
};

export const getCurrentTime = () => {
	let date = new Date();
	date = addHours(date, 7);
	return date.toISOString();
};

export const deleteCountdown = () => {
	let date = new Date();
	date = addHours(date, 7);
	date = addDays(date, 7);
	return date.toISOString();
};
