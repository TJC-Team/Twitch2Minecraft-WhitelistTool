"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitchFlag = void 0;
/**
 * Single instance of a twitch automod flagged word in a message string.
 *
 * **Note:** This is an undocumented Twitch IRC feature and may change at any time, use at your own risk.
 */
class TwitchFlag {
    constructor(startIndex, endIndex, text, category) {
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.word = text;
        this.categories = category;
    }
}
exports.TwitchFlag = TwitchFlag;
//# sourceMappingURL=flag.js.map