import WOSTargetingParams from "./WOSTargetingParams";
import { addScript } from "./utils";

addScript("https://tags.crwdcntrl.net/c/6395/cc_af.js");

export default class WOSTargetingClient {
	clientId = "0";
	hasPrivacyPolicy = false;
	useTestProfile = false;

	constructor(clientId, hasPrivacyPolicy) {
		this.clientId = clientId;
		this.hasPrivacyPolicy = hasPrivacyPolicy;
	}

	getTargetingParams() {
		return this.getAudienceInfo().then((profile) => {
			return new WOSTargetingParams(profile, { privacypolicy: this.hasPrivacyPolicy });
		});
	}

	getAudienceInfo() {
		// NOTE: Awkward as it may be, this has to use a JSONP request to get audience data since a normal
		//       XHR request blocks 3rd-party cookies from being sent
		return new Promise((res, rej) => {
			const cbName = `wost${(Math.random() * 1000) | 0}`;
			const audLoadScript = addScript(`https://bcp.crwdcntrl.net/5/c=${this.clientId}/pe=y/callback=${cbName}`);

			window[cbName] = ({ Profile: profile }) => {
				delete window[cbName];
				document.head.removeChild(audLoadScript);
				res(profile);
			};
		});
	}
}
