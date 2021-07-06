module.exports = {
  purge: {
    mode: "all",
    enabled: true,
    preserveHtmlElements: false,
    options: {
      keyframes: true,
    },
    content: ["./**/*.twig"],
  },
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
