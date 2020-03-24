const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	devtool: "source-map",
	plugins: [
		new HtmlWebpackPlugin({
			title: "WO Streaming Targeting SDK Release Test",
		}),
	],
};
