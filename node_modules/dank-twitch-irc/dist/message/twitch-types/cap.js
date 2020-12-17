"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapMessage = void 0;
const irc_message_1 = require("../irc/irc-message");
// https://ircv3.net/specs/core/capability-negotiation.html
// example messages:
// :tmi.twitch.tv CAP * LS :twitch.tv/commands twitch.tv/tags twitch.tv/membership
// :tmi.twitch.tv CAP * ACK :twitch.tv/commands twitch.tv/tags twitch.tv/membership
// :tmi.twitch.tv CAP * NAK :twitch.tv/invalid
class CapMessage extends irc_message_1.IRCMessage {
    constructor(message) {
        super(message);
        // ignore the first parameter (the '*') since twitch doesn't ever send anything but a '*' in that slot
        this.subCommand = irc_message_1.requireParameter(this, 1);
        this.capabilities = irc_message_1.requireParameter(this, 2).split(" ");
    }
}
exports.CapMessage = CapMessage;
//# sourceMappingURL=cap.js.map