# WideOrbit Streaming Targeting SDK

## Installation

You must install the SDK from NPM even if you intend to
include it directly as a `<script>` tag.

```bash
npm i @wostreaming/targeting-sdk
```

## Quick Usage

```js
const client = new WOSTargetingClient(1234, true);
client.getTargetingParams().then(function (params) {
	// Do something with `WOSTargetingParams` object
	const qs = params.toString({
		// ...Add extra parameters here if needed
	});

	// Notice that the `WOSTargetingParams` object can be
	// automatically cast to a string
	console.log(`?${qs}`);
	// Example output:
	// dnt=0&lptid=f412452b20820396319d8f35b14d96cb&ltids=99286%2C513599%2C513593%2C513421&privacypolicy=false&user-id=5a08398c-1b8f-5230-919f-a94dc36bb5b7
});
```

### Including the SDK in your code

The provided SDK is built as a UMD module, making it compatible with any
environment or development pattern. You can `import` or `require` the
module in a bundled or transpiled Node app:

```js
// ESM
import WOSTargetingClient from "@wostreaming/targeting-sdk";

// Node require
const WOSTargetingClient = require("@wostreaming/targeting-sdk");
```

Or if you prefer to use it as a standard `<script>` tag, that works too;
but, you'll have to serve the script tag somehow. In the packaged release,
it's available under the `dist/wos-targeting-sdk.js` path. You
can serve it as a static file however you prefer.

**Example express server**

<!-- prettier-ignore -->
```js
import express from "express";

const app = express();
app.use(
	"/static/js/wos-targeting-sdk.js",
	express.static(
		require.resolve("@wostreaming/targeting-sdk")
	)
);

app.listen(3000);
```

**Example `<script>` tag**

<!-- prettier-ignore -->
```html
<script
	type="text/javascript"
	src="/static/js/wos-targeting-sdk.js">
</script>
```

When you include the script tag it will make a global
variable accessible named `WOSTargetingClient`. The
rest of the usage information applies regardless of how
you include the SDK.

# API

## **class** WOSTargetingClient

### # constructor(clientId: string, hasPrivacyPolicy: boolean)

- **clientId** Your Lotame client ID as a string or int
- **hasPrivacyPolicy** Have your users agreed to a privacy policy consenting to anonymized tracking and ad targeting?

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
as well as optional additional parameters to override or add to the query string but not set
on this object. This will properly filter out private information if `dnt` is overridden.
