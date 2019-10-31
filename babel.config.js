module.exports = function(api) {
  api.cache(true);

  return {
    plugins: ["@babel/plugin-proposal-class-properties"],
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false
        }
      ],
      "@babel/preset-react",
      "@babel/preset-typescript",
      "babel-preset-web"
    ]
  };
};
