import qs from "query-string";
import { getAdvertisingId } from "./utils";

export default class WOSTargetingParams {
	constructor(profile, params = {}) {
		this._params = {
			dnt: navigator.doNotTrack === "1" ? "1" : "0",
			"user-id": getAdvertisingId(profile.tpid),
			privacypolicy: false,
			lptid: profile.tpid,
			ltids: profile.Audiences.Audience.map((aud) => aud.id),
		};

		this.setParams(params);
	}

	toJSON = () => this.getParams();

	getParams() {
		return this._filterDnt({ ...this._params });
	}

	setParams(paramsObj = {}) {
		Object.assign(this._params, paramsObj);
		return this;
	}

	toString(additionalParams = {}) {
		const params = this.getParams();

		// Send array as comma-separated list
		Object.assign(params, additionalParams);
		Object.assign(params, {
			ltids: params.ltids && params.ltids.join(","),
			dnt: Number(params.dnt),
			privacypolicy: Number(params.privacypolicy),
		});
		return qs.stringify(this._filterDnt(params));
	}

	_filterDnt = (p) => {
		if (p.dnt === "1") {
			delete p.lptid;
			delete p.ltids;
		}
		return p;
	};
}
