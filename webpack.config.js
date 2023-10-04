const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  watch: true,
};
//Firebase is a backend as a service (BaaS), provided by Google. It is a very easy way to create a scalable backend for mobile, desktop, and web applications, thus reducing the work load of the developer. 
// It provides backend services like databases (Firestore), authentication, analytics, crash-analytics, fire-hosting, cloud functions etc.
// Webpack is a module bundler, and is needed by fireabse 9 (which uses a modular api ) for tree shaking. Tree shaking is the removal of unnecessary javascript funciton. Manually this is a tedious, and risky task, but with the help of bundler like webpack (which uses express.js web server), viteJS (which uses goa, and ES-build)