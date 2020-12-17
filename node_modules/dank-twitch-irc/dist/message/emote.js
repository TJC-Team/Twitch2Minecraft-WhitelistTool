"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitchEmote = void 0;
/**
 * Single instance of a twitch emote in a message string.
 */
class TwitchEmote {
    constructor(id, startIndex, endIndex, text) {
        this.id = id;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.code = text;
    }
}
exports.TwitchEmote = TwitchEmote;
//# sourceMappingURL=emote.js.map