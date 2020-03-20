import HtmlWebpackPlugin from "html-webpack-plugin";
import MinifyPlugin from "babel-minify-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { DefinePlugin, HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const ifEnv = (tval, fval, eVarName, cond = Boolean.bind(null)) => {
	const evar = process.env[eVarName];
	let result;
	if (typeof cond === "string") {
		result = evar === cond;
	} else if (cond instanceof RegExp) {
		result = cond.test(evar);
	} else {
		result = cond(evar);
	}
	return result ? tval : fval;
};
const ifDev = (tval, fval) => ifEnv(tval, fval, "NODE_ENV", /^dev/i);

const prodConfig = {
	name: "prod-bundle",
	mode: "production",
	entry: `${__dirname}/src/client`,
	output: {
		filename: "wos-targeting-sdk.js",
		path: `${__dirname}/dist`
	},

	performance: {
		hints: ifDev("warning", "error"),
		maxEntrypointSize: 30000
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin(),
		new DefinePlugin({ IS_DEV_ENV: false }),
		new MinifyPlugin(),
		ifEnv(
			new BundleAnalyzerPlugin({
				defaultSizes: "gzip",
				exclude: [/^((?!(dist\/)).)*\.js$/]
			}),
			undefined,
			"ANALYZE_BUNDLE"
		)
	].filter(Boolean)
};

const devConfig = {
	name: "dev-bundle",
	mode: "development",
	devtool: ifDev("inline-source-map"),
	entry: ["webpack-hot-middleware/client", `${__dirname}/src/client/index.js`],
	output: {
		filename: "wos-targeting-sdk.dev.js",
		path: `${__dirname}/dist`,
		publicPath: "/",
		hotUpdateChunkFilename: "hot/[hash].hot-update.js",
		hotUpdateMainFilename: "hot/[hash].hot-update.json"
	},

	optimization: {
		noEmitOnErrors: true,
		removeEmptyChunks: true
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin(),
		new DefinePlugin({ IS_DEV_ENV: ifDev(true, false) }),
		new HtmlWebpackPlugin({
			template: `${__dirname}/src/dev-server/tag-dev.ejs`,
			meta: { charset: "utf-8" }
		}),
		new HotModuleReplacementPlugin()
	].filter(Boolean)
};
export default [ifDev(devConfig), prodConfig].filter(Boolean);
