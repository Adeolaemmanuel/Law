/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */


const blacklist = require('metro-config/src/defaults/blacklist');
module.exports = {
    resolver: {
        blacklistRE: blacklist([
            /\/nodejs-assets\/.*/,
            /\/android\/.*/,
            /\/ios\/.*/
        ])
    },
    transformer: {
    getTransformOptions: async () => ({
        transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
        },
    }),
    },
};

