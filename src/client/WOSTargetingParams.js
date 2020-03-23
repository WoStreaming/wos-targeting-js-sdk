import qs from "query-string";
import { getAdvertisingId } from "./utils";

export default class WOSTargetingParams {
	constructor(profile) {
		const params = (this._params = {
			lmt: navigator.doNotTrack === "1" ? "1" : "0",
			"user-id": getAdvertisingId(profile.tpid),
			privacypolicy: false,
		});

		if (params.lmt === "0") {
			Object.assign(params, {
				lptid: profile.tpid,
				ltids: profile.Audiences.Audience.map((aud) => aud.id),
			});
		}
	}

	toJSON = () => this.getParams();

	getParams() {
		return { ...this._params };
	}

	setParams(paramsObj = {}) {
		Object.assign(this._params, paramsObj);
	}

	toString(additionalParams = {}) {
		// Send array as comma-separated list
		const params = {
			...this._params,
			ltids: this._params.ltids && this._params.ltids.join(","),
			...additionalParams,
		};
		return qs.stringify(params);
	}
}
