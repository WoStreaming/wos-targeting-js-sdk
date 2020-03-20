import Cookies from "js-cookie";
import { v5 as uuidv5 } from "uuid";
import { AD_ID_COOKIE } from "./constants";

// Since we can't set a 3rd-party cookie from JS, we'll generate the advertising ID based on the ID
// assigned by Lotame so we at least get a consistent ID across different domains.
export function getAdvertisingId(profileId) {
	const adId = Cookies.get(AD_ID_COOKIE) || uuidv5(`wostreaming.net/profile/${profileId}`, uuidv5.URL);
	Cookies.set(AD_ID_COOKIE, adId, { domain: location.hostname, path: "", expires: 180 });
	return Cookies.get(AD_ID_COOKIE);
}
