import { app } from "./src/app/web.js";

const port = 3000;

app.listen(port, () => {
	console.log(`app running at port : http://localhost:${port}`);
});
