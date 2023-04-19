const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

/**
 * @description withModuleFederationPlugin allows us to inject
 * some extra functionalities to the default webpack's Angular project
 */
module.exports = withModuleFederationPlugin({
  /**
   * @description Sets the microfrontends that will be
   * integrated in the main project
   */
  remotes: {
    mfShopping: "http://localhost:4201/remoteEntry.js",
    mfPayment: "http://localhost:4202/remoteEntry.js",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },

  sharedMappings: ["@common-lib"],
});
