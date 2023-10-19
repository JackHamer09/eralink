module.exports = {
  root: true,
  extends: ["@nuxtjs/eslint-config-typescript", "@vue/eslint-config-prettier"],
  rules: {
    semi: ["error", "always"], // Require semicolons
    quotes: ["error", "double"], // Require double quotes
    "vue/multi-word-component-names": "off", // Allow multi-word component names
    "vue/require-default-prop": "off", // Allow props without default values
  },
};
