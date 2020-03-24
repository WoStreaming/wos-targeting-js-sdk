import WOSTargetingClient from "./WOSTargetingClient";

// NOTE: This section gets stripped from the production build due to the DefinePlugin and dead code elimination
if (IS_DEV_ENV) {
	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => console.clear());
	}
}

if (window) {
	window["WOSTargetingClient"] = WOSTargetingClient;
}

export default WOSTargetingClient;
