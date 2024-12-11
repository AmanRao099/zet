// config-overrides.js
module.exports = {
  webpack: (config) => {
    // Add fallbacks for Node.js core modules
    config.resolve.fallback = {
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
    };

    return config;
  },
};
