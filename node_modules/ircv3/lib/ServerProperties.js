"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultServerProperties = void 0;
// sane defaults based on RFC 1459
exports.defaultServerProperties = {
    channelTypes: '#&',
    supportedUserModes: 'iwso',
    supportedChannelModes: {
        prefix: 'ov',
        list: 'b',
        alwaysWithParam: 'ovk',
        paramWhenSet: 'l',
        noParam: 'imnpst'
    },
    prefixes: [
        {
            modeChar: 'v',
            prefix: '+'
        },
        {
            modeChar: 'o',
            prefix: '@'
        }
    ]
};
