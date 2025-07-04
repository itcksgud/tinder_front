// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
          '@assets': './assets',
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
        },
      }],
    ],
  };
};
