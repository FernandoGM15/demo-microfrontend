const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "mfShopping",

  /**
   * @description exposes will contain all the project modules
   * that will be shared
   */
  exposes: {
    "./ProductsModule": "./projects/mf-shopping/src/app/products/products.module.ts",
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
