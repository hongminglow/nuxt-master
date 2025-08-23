// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      // Allow single-word component names for pages, layouts, and app components
      "vue/multi-word-component-names": [
        "error",
        {
          ignores: ["default", "error", "index", "login", "dashboard"],
        },
      ],
    },
  }
);
