module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          unstable_transformImportMeta: true, // Forces Babel to polyfill import.meta for the web engine
        },
      ],
    ],
    plugins: [
      'react-native-worklets/plugin', // Keep this plugin from our last step!
    ],
  };
};