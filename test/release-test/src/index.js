import WOSTargetingClient from "@wostreaming/targeting-sdk";

const client = new WOSTargetingClient(6394, true);
client.getTargetingParams().then((p) => {
	console.log(`${p}`);
});
