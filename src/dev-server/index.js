import path from "path";
import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "../../webpack.config.babel";

const compiler = webpack(webpackConfig);

const app = express();
app.use(
	webpackDevMiddleware(compiler, {
		logTime: true
		// publicPath: "/__webpack_hmr"
		// writeToDisk: true
	})
);
app.use(webpackHotMiddleware(compiler));

// app.use(express.static("dist"));

app.listen(3000, () => {
	console.log(`Server listening on port 3000`);
});
