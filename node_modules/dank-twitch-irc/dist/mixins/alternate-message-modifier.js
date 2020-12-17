"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlternateMessageModifier = exports.invisibleSuffix = void 0;
const apply_function_replacements_1 = require("../utils/apply-function-replacements");
const utils_1 = require("./ratelimiters/utils");
exports.invisibleSuffix = " \u{000e0000}";
class AlternateMessageModifier {
    constructor(client) {
        this.lastMessages = {};
        this.client = client;
    }
    appendInvisibleCharacter(channelName, messageText, action) {
        const lastMessage = this.lastMessages[channelName];
        if (lastMessage != null &&
            lastMessage.messageText === messageText &&
            lastMessage.action === action) {
            return messageText + exports.invisibleSuffix;
        }
        else {
            return messageText;
        }
    }
    applyToClient(client) {
        const genericReplament = (action) => async (oldFn, channelName, message) => {
            const { fastSpam } = utils_1.canSpamFast(channelName, client.configuration.username, client.userStateTracker);
            if (fastSpam) {
                await oldFn(channelName, message);
                return;
            }
            const newMsg = this.appendInvisibleCharacter(channelName, message, action);
            await oldFn(channelName, newMsg);
            if (!this.client.joinedChannels.has(channelName)) {
                // in this case we won't get our own message back via the
                // onPrivmsg handler, so this will have to do. (Save the sent
                // message)
                this.lastMessages[channelName] = {
                    messageText: newMsg,
                    action,
                };
            }
        };
        apply_function_replacements_1.applyReplacements(this, client, {
            say: genericReplament(false),
            me: genericReplament(true),
        });
        client.on("PRIVMSG", this.onPrivmsgMessage.bind(this));
    }
    onPrivmsgMessage(message) {
        // msg must be from us (the logged in user)
        if (!(message.senderUsername === this.client.configuration.username)) {
            return;
        }
        this.lastMessages[message.channelName] = {
            messageText: message.messageText,
            action: message.isAction,
        };
    }
}
exports.AlternateMessageModifier = AlternateMessageModifier;
//# sourceMappingURL=alternate-message-modifier.js.map