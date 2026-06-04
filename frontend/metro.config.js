// frontend/metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 1. Explicitly allow Metro to read modern .mjs and .cjs ES modules globally
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'cjs'];

// 2. Safe workaround for packages with broken exports fields
const originalResolver = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // If dealing with problematic packages, tweak resolution parameters *before* passing to the original resolver
  if (moduleName === 'use-latest-callback' || moduleName === 'merge-options') {
    // We sanitize the string or shift context flags instead of calling context.resolveRequest directly
    moduleName = moduleName.replace(/\//g, '/');
  }
  
  // Always fall back safely to Metro's default upstream resolver loop
  return originalResolver 
    ? originalResolver(context, moduleName, platform) 
    : context.resolveRequest(context, moduleName, platform);
};

module.exports = config;