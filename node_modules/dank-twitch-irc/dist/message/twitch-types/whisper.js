"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhisperMessage = void 0;
const irc_message_1 = require("../irc/irc-message");
const tag_values_1 = require("../parser/tag-values");
// @badges=;color=#1E90FF;display-name=BotFactory;emotes=;message-id=6134;thread-id=40286300_403015524;turbo=0;
// user-id=403015524;user-type= :botfactory!botfactory@botfactory.tmi.twitch.tv WHISPER randers :Pong
class WhisperMessage extends irc_message_1.IRCMessage {
    constructor(ircMessage) {
        super(ircMessage);
        this.messageText = irc_message_1.requireParameter(this, 1);
        this.senderUsername = irc_message_1.requireNickname(this);
        const tagParser = tag_values_1.tagParserFor(this.ircTags);
        this.senderUserID = tagParser.requireString("user-id");
        this.recipientUsername = this.ircParameters[0];
        this.badges = tagParser.requireBadges("badges");
        this.badgesRaw = tagParser.requireString("badges");
        this.color = tagParser.getColor("color");
        this.colorRaw = tagParser.requireString("color");
        // trim: Twitch workaround for unsanitized data, see https://github.com/robotty/dank-twitch-irc/issues/33
        this.displayName = tagParser.requireString("display-name").trim();
        this.emotes = tagParser.requireEmotes("emotes", this.messageText);
        this.emotesRaw = tagParser.requireString("emotes");
        this.messageID = tagParser.requireString("message-id");
        this.threadID = tagParser.requireString("thread-id");
    }
}
exports.WhisperMessage = WhisperMessage;
//# sourceMappingURL=whisper.js.map