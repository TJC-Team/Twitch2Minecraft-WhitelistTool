"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartMessage = void 0;
const channel_irc_message_1 = require("../../irc/channel-irc-message");
const irc_message_1 = require("../../irc/irc-message");
class PartMessage extends channel_irc_message_1.ChannelIRCMessage {
    constructor(message) {
        super(message);
        this.partedUsername = irc_message_1.requireNickname(this);
    }
}
exports.PartMessage = PartMessage;
//# sourceMappingURL=part.js.map