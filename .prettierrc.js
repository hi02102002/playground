module.exports = {
  semi: true,
  trailingComma: "all",
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  plugins: [
    "prettier-plugin-tailwindcss",
    require.resolve("@trivago/prettier-plugin-sort-imports"),
  ],
  importOrder: [
    "user-client",
    "server-only",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$",
    "^[./].*(?<!\\.(c|le|sc)ss)$",
    "^[.]/[-a-zA-Z0-9_]+[.](module)[.](css|scss|less)$",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
