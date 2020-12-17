"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRateLimitPresets = void 0;
exports.messageRateLimitPresets = {
    default: {
        highPrivmsgLimits: 100,
        lowPrivmsgLimits: 20,
    },
    knownBot: {
        highPrivmsgLimits: 100,
        lowPrivmsgLimits: 50,
    },
    verifiedBot: {
        highPrivmsgLimits: 7500,
        lowPrivmsgLimits: 7500,
    },
};
//# sourceMappingURL=message-rate-limits.js.map