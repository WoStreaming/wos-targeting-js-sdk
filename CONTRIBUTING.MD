# How to setup and test

First clone the repo and open a terminal into the repo directory

```bash
npm i
npm start
```

Running that will compile the SDK and run a dev server with hot reloading enabled.

**Note**

> You will likely have noticed that it opened a browser tab that allows you to visualize and navigate
> the compiled bundle to see how big it is and what's adding the most size. During development it
> compiles both a minified production bundle and a dev bundle with source maps. The dev bundle will always
> be huge but it's important to generate the production bundle so you can get immediate warnings in
> the console if you make a change that makes the final minified bundle size too large.

Next, open your browser to [http://localhost:3000]() where you will see a blank page. If you open your
dev tools now you will find that the SDK has exposed two global variables:
`WOSTargetingClient` and `WOSTargetingParams`. You can develop and test manually using these objects.

# Guidelines

- Ideally, have your IDE configured to run prettier on save. Alternatively, you may use the defined npm
  package scripts defined by running either of the following or configuring your IDE to do so:

```bash
npm run lint
npm run lint:fix
```

- The configured upper limit for the size of the compiled file is currently set to 30,000 bytes.
  At the time of writing, the actual size is no more than half of that. This may be changed if there
  is good reason but always remember, this needs to load fast on any device so size matters. However,
  the gzip size matters more since it will pretty much always be served compressed with gzip and that
  provides a lot more leeway. At the time of writing, the uncompressed size is 13.8K but gzipped is 5K.

  To review the final build size including gzip size, run this npm script:

```bash
npm run build:review
```

# Generating a release

To publish a release you must first be logged in to NPM in the console. To do so, run this:

```
npm adduser --scope=@wostreaming
```

You will be prompted for you username and password. You should also have 2FA setup so you will be prompted for your
OTP whenever you do a release.

```bash
npm run release
```
