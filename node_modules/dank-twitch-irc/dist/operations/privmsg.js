"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPrivmsg = void 0;
async function sendPrivmsg(conn, channelName, message) {
    conn.sendRaw(`PRIVMSG #${channelName} :${message}`);
}
exports.sendPrivmsg = sendPrivmsg;
//# sourceMappingURL=privmsg.js.map