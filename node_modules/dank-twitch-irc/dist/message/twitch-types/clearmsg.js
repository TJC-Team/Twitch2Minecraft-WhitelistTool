"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearmsgMessage = void 0;
const channel_irc_message_1 = require("../irc/channel-irc-message");
const irc_message_1 = require("../irc/irc-message");
const tag_values_1 = require("../parser/tag-values");
class ClearmsgMessage extends channel_irc_message_1.ChannelIRCMessage {
    constructor(message) {
        super(message);
        const tagParser = tag_values_1.tagParserFor(this.ircTags);
        this.targetUsername = tagParser.requireString("login");
        this.targetMessageID = tagParser.requireString("target-msg-id");
        this.targetMessageContent = irc_message_1.requireParameter(this, 1);
    }
}
exports.ClearmsgMessage = ClearmsgMessage;
//# sourceMappingURL=clearmsg.js.map