const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "mfPayment",

  /**
   * @description exposes will contain all the project modules
   * that will be shared
   */
  exposes: {
    "./PaymentComponent":
      "./projects/mf-payment/src/app/payment/payment.component.ts",
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
