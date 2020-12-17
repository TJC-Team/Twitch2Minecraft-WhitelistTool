"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearchatMessage = void 0;
const channel_irc_message_1 = require("../irc/channel-irc-message");
const irc_message_1 = require("../irc/irc-message");
const tag_values_1 = require("../parser/tag-values");
class ClearchatMessage extends channel_irc_message_1.ChannelIRCMessage {
    constructor(message) {
        super(message);
        const tagParser = tag_values_1.tagParserFor(this.ircTags);
        this.targetUsername = irc_message_1.getParameter(this, 1);
        this.banDuration = tagParser.getInt("ban-duration");
    }
    wasChatCleared() {
        return this.targetUsername == null && this.banDuration == null;
    }
    isTimeout() {
        return this.targetUsername != null && this.banDuration != null;
    }
    isPermaban() {
        return this.targetUsername != null && this.banDuration == null;
    }
}
exports.ClearchatMessage = ClearchatMessage;
//# sourceMappingURL=clearchat.js.map