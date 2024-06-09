import reportService from "../service/reportService.js";

const storeReport = async (req, res, next) => {
	try {
		const userId = req.user[0].user_id;
		const file = req.file;
		const request = req.body;

		const data = await reportService.storeReport(request, userId, file);
		res.status(200).json({
			message: "success",
			data: data[0],
		});
	} catch (error) {
		next(error);
	}
};

const getListReport = async (req, res, next) => {
	try {
		const userId = req.user[0].user_id;
		const request = {
			page: req.query.page,
			size: req.query.size,
		};

		const result = await reportService.getListReport(request, userId);
		res.status(200).json({
			data: result.data,
			paging: result.paging,
		});
	} catch (error) {
		next(error);
	}
};

const softDelete = async (req, res, next) => {
	try {
		await reportService.softDelete();
		res.status(200).json({
			message: "success",
		});
	} catch (error) {
		next(error);
	}
};

export default { storeReport, getListReport, softDelete };
