# WideOrbit Streaming Targeting SDK

## Quick Usage

### Using NPM

```bash
npm i @wostreaming/targeting-sdk
```

```js
import WOSTargetingClient from "@wostreaming/targeting-sdk";

const client = WOSTargetingClient(1234, true);
const params = client.getTargetingParams();

console.log(params.toJSON()); // Returns params object
// Output:
// {
//   "dnt": "0",
//   "user-id": "5a08398c-1b8f-5230-919f-a94dc36bb5b7",
//   "privacypolicy": false,
//   "lptid": "f412452b20820396319d8f35b14d96cb",
//   "ltids": [ "99286", "513599", "513593", "513421", ...]
// }

console.log(params.toString()); // Also castable: console.log(`?${params}`)
// Output:
// dnt=0&lptid=f412452b20820396319d8f35b14d96cb&ltids=99286%2C513599%2C513593%2C513421&privacypolicy=false&user-id=5a08398c-1b8f-5230-919f-a94dc36bb5b7
```

# API

## **class** WOSTargetingClient

### # constructor(clientId: string, hasPrivacyPolicy: boolean, useTestProfile: boolean = false)

- **clientId** Your Lotame client ID as a string or int
- **hasPrivacyPolicy** Have your users agreed to a privacy policy consenting to anonymized tracking and ad targeting?
- **useTestProfile** Useful for testing in development. When `true` Lotame will send fake test data.

### # getAudienceInfo(): Promise<Profile>

Returns a Promise that resolves with a Lotame `Profile` object containing the user's audience information for targeting.
You generally shouldn't need to call this directly.

### # getTargetingParams(): Promise<WOSTargetingParams>

Returns a Promise that resolves with a `WOSTargetingParams` object for working with audience info parsed and managed by the WOS Targeting SDK.

---

## **class** WOSTargetingParams

### # constructor(profile: Profile)

- **profile** The Lotame `Profile` object

### # toJSON(): Object -> getParams()

Alias of `getParams()`

### # getParams(): Object

Returns an object of `key -> value` pairs representing the URL querystring parameters.

### # setParams(paramsObj: Object = {})

Set additional parameters or override existing ones

### # toString(additionalParams: Object = {})

Returns a URL encoded querystring with all the parameters managed by this object
as well as optional additional parameters to add to the query string but not set
on this object.
