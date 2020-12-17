"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivmsgMessage = exports.parseActionAndMessage = void 0;
const channel_irc_message_1 = require("../irc/channel-irc-message");
const irc_message_1 = require("../irc/irc-message");
const tag_values_1 = require("../parser/tag-values");
// eslint-disable-next-line no-control-regex
const actionRegex = /^\u0001ACTION (.*)\u0001$/;
function parseActionAndMessage(trailingParameter) {
    const match = actionRegex.exec(trailingParameter);
    if (match == null) {
        return {
            isAction: false,
            message: trailingParameter,
        };
    }
    else {
        return {
            isAction: true,
            message: match[1],
        };
    }
}
exports.parseActionAndMessage = parseActionAndMessage;
class PrivmsgMessage extends channel_irc_message_1.ChannelIRCMessage {
    constructor(ircMessage) {
        super(ircMessage);
        const { isAction, message } = parseActionAndMessage(irc_message_1.requireParameter(this, 1));
        this.messageText = message;
        this.isAction = isAction;
        this.senderUsername = irc_message_1.requireNickname(this);
        const tagParser = tag_values_1.tagParserFor(this.ircTags);
        this.channelID = tagParser.requireString("room-id");
        this.senderUserID = tagParser.requireString("user-id");
        this.badgeInfo = tagParser.requireBadges("badge-info");
        this.badgeInfoRaw = tagParser.requireString("badge-info");
        this.badges = tagParser.requireBadges("badges");
        this.badgesRaw = tagParser.requireString("badges");
        this.bits = tagParser.getInt("bits");
        this.bitsRaw = tagParser.getString("bits");
        this.color = tagParser.getColor("color");
        this.colorRaw = tagParser.requireString("color");
        // trim: Twitch workaround for unsanitized data, see https://github.com/robotty/dank-twitch-irc/issues/33
        this.displayName = tagParser.requireString("display-name").trim();
        this.emotes = tagParser.requireEmotes("emotes", this.messageText);
        this.emotesRaw = tagParser.requireString("emotes");
        this.flags = tagParser.getFlags("flags", this.messageText);
        this.flagsRaw = tagParser.getString("flags");
        this.messageID = tagParser.requireString("id");
        this.isMod = tagParser.requireBoolean("mod");
        this.isModRaw = tagParser.requireString("mod");
        this.serverTimestamp = tagParser.requireTimestamp("tmi-sent-ts");
        this.serverTimestampRaw = tagParser.requireString("tmi-sent-ts");
    }
    /**
     * Extracts a plain object only containing the fields defined by the
     * {@link PrivmsgUserState} interface.
     */
    extractUserState() {
        return {
            badgeInfo: this.badgeInfo,
            badgeInfoRaw: this.badgeInfoRaw,
            badges: this.badges,
            badgesRaw: this.badgesRaw,
            color: this.color,
            colorRaw: this.colorRaw,
            displayName: this.displayName,
            isMod: this.isMod,
            isModRaw: this.isModRaw,
        };
    }
    isCheer() {
        return this.bits != null;
    }
}
exports.PrivmsgMessage = PrivmsgMessage;
//# sourceMappingURL=privmsg.js.map