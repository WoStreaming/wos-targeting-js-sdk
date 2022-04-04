import WOSTargetingParams from './WOSTargetingParams';

export default class WOSTargetingClient {
	clientId = '0';
	hasPrivacyPolicy = false;
	useTestProfile = false;

	constructor (clientId, hasPrivacyPolicy) {
		this.clientId = clientId;
		this.hasPrivacyPolicy = hasPrivacyPolicy;
	}

	getTargetingParams () {
		const makeParams = (profile = {}) => new WOSTargetingParams(profile, { privacypolicy: this.hasPrivacyPolicy });
		return this.getAudienceInfo().
			then(makeParams).
			catch((err) => (console.error(`Error getting targeting params: ${err}`), makeParams()));
	}

	getAudienceInfo () {
		// This used to call Lotame to get audience data.  The side effects should be cleaned out by someone competent that can actually exercise the code
		return new Promise((res, rej) => {
			res({});
		});
	}
}
