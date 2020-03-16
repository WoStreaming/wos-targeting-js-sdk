import HtmlWebpackPlugin from "html-webpack-plugin";
import MinifyPlugin from "babel-minify-webpack-plugin";

const ifDev = (tval, fval) => (/^dev/i.test(process.env.NODE_ENV) ? tval : fval);
const env = (process.env.NODE_ENV = ifDev("development", "production"));

export default {
	mode: env,
	devtool: ifDev("eval-source-map"),
	// context: __dirname,
	// entry: "index",
	output: {
		filename: "wos-targeting-sdk.js",
		path: `${__dirname}/dist`,
		library: "WosTargetingSDK"
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules\//,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "src/tag-dev.ejs",
			meta: { charset: "utf-8" }
			// inject: "head"
		}),
		new MinifyPlugin()
	].filter(Boolean),

	devServer: {
		contentBase: `${__dirname}/dist`,
		compress: true,
		port: 9000,
		hot: true
	}
};
