"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernoticeMessage = exports.extractEventParams = exports.getCamelCasedName = void 0;
const camelCase = require("lodash.camelcase");
const channel_irc_message_1 = require("../irc/channel-irc-message");
const irc_message_1 = require("../irc/irc-message");
const tag_values_1 = require("../parser/tag-values");
const convertersMap = {
    "msg-param-cumulative-months": tag_values_1.convertToInt,
    "msg-param-gift-months": tag_values_1.convertToInt,
    "msg-param-sender-count": tag_values_1.convertToInt,
    "msg-param-months": tag_values_1.convertToInt,
    "msg-param-promo-gift-total": tag_values_1.convertToInt,
    "msg-param-should-share-streak": tag_values_1.convertToBoolean,
    "msg-param-streak-months": tag_values_1.convertToInt,
    "msg-param-viewerCount": tag_values_1.convertToInt,
    "msg-param-threshold": tag_values_1.convertToInt,
};
function getCamelCasedName(tagKey) {
    let newKey = tagKey;
    // remove the leading msg-param-
    newKey = newKey.substring(10);
    // camel case
    newKey = camelCase(newKey);
    // convert somethingId to somethingID
    newKey = newKey.replace(/Id$/g, "ID");
    // To be consistent with the rest of the library,
    // don't camelcase username as userName
    newKey = newKey.replace(/([uU])serName/g, "$1sername");
    return newKey;
}
exports.getCamelCasedName = getCamelCasedName;
function extractEventParams(tags) {
    const params = {};
    // converts all msg-param-* tags into a new "params" object where keys are camelCased
    // and boolean/integer tags are parsed (including a identically named "Raw" property).
    // e.g. msg-param-should-share-streak would become
    // shouldShareStreak: true
    // shouldShareStreakRaw: '1'
    for (const tagKey of Object.keys(tags)) {
        if (!tagKey.startsWith("msg-param-")) {
            continue;
        }
        const newKey = getCamelCasedName(tagKey);
        const converter = convertersMap[tagKey];
        if (converter != null) {
            params[newKey] = tag_values_1.requireData(tags, tagKey, converter);
            params[newKey + "Raw"] = tag_values_1.requireData(tags, tagKey, tag_values_1.convertToString);
        }
        else {
            params[newKey] = tag_values_1.requireData(tags, tagKey, tag_values_1.convertToString);
        }
    }
    return params;
}
exports.extractEventParams = extractEventParams;
class UsernoticeMessage extends channel_irc_message_1.ChannelIRCMessage {
    constructor(message) {
        super(message);
        this.messageText = irc_message_1.getParameter(this, 1);
        const tagParser = tag_values_1.tagParserFor(this.ircTags);
        this.channelID = tagParser.requireString("room-id");
        this.systemMessage = tagParser.requireString("system-msg");
        this.messageTypeID = tagParser.requireString("msg-id");
        this.senderUsername = tagParser.requireString("login");
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
        if (this.messageText != null) {
            this.emotes = tagParser.requireEmotes("emotes", this.messageText);
            this.flags = tagParser.getFlags("flags", this.messageText);
        }
        else {
            this.emotes = [];
        }
        this.emotesRaw = tagParser.requireString("emotes");
        this.flagsRaw = tagParser.getString("flags");
        this.messageID = tagParser.requireString("id");
        this.isMod = tagParser.requireBoolean("mod");
        this.isModRaw = tagParser.requireString("mod");
        this.serverTimestamp = tagParser.requireTimestamp("tmi-sent-ts");
        this.serverTimestampRaw = tagParser.requireString("tmi-sent-ts");
        this.eventParams = extractEventParams(this.ircTags);
    }
    isCheer() {
        return this.bits != null;
    }
    isSub() {
        return this.messageTypeID === "sub";
    }
    isResub() {
        return this.messageTypeID === "resub";
    }
    isRaid() {
        return this.messageTypeID === "raid";
    }
    isSubgift() {
        return this.messageTypeID === "subgift";
    }
    isAnonSubgift() {
        return this.messageTypeID === "anonsubgift";
    }
    isAnonGiftPaidUpgrade() {
        return this.messageTypeID === "anongiftpaidupgrade";
    }
    isGiftPaidUpgrade() {
        return this.messageTypeID === "giftpaidupgrade";
    }
    isRitual() {
        return this.messageTypeID === "ritual";
    }
    isBitsBadgeTier() {
        return this.messageTypeID === "bitsbadgetier";
    }
}
exports.UsernoticeMessage = UsernoticeMessage;
//# sourceMappingURL=usernotice.js.map