import { app } from "./src/app/web.js";

const port = 8080;
const host = "0.0.0.0";

app.listen(port, host, () => {
	console.log(`app running at port : http://localhost:${port}`);
});
