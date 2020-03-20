module.exports = api => {
	const presets = [
		"@babel/preset-env",
		["minify", { mangle: { exclude: ["WOSTargetingClient", "WOSTargetingParams"] }, builtIns: false }]
	];
	const plugins = ["@babel/plugin-proposal-class-properties"];

	api.cache(true);

	return {
		presets,
		plugins
	};
};
