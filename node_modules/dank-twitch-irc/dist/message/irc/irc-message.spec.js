"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const helpers_spec_1 = require("../../helpers.spec");
const irc_message_1 = require("../parser/irc-message");
const missing_data_error_1 = require("../parser/missing-data-error");
const irc_message_2 = require("./irc-message");
describe("./message/irc/irc-message", function () {
    describe("#requireParameter()", function () {
        it("should throw MissingDataError if parameters have length 0", function () {
            helpers_spec_1.assertThrowsChain(() => irc_message_2.requireParameter({ ircParameters: [] }, 0), missing_data_error_1.MissingDataError, "Parameter at index 0 missing");
            helpers_spec_1.assertThrowsChain(() => irc_message_2.requireParameter({ ircParameters: [] }, 1), missing_data_error_1.MissingDataError, "Parameter at index 1 missing");
            helpers_spec_1.assertThrowsChain(() => irc_message_2.requireParameter({ ircParameters: [] }, 2), missing_data_error_1.MissingDataError, "Parameter at index 2 missing");
        });
        it("should be able to return parameter 0 if parameters have length 1", function () {
            chai_1.assert.strictEqual("test parameter", irc_message_2.requireParameter({ ircParameters: ["test parameter"] }, 0));
            helpers_spec_1.assertThrowsChain(() => irc_message_2.requireParameter({ ircParameters: ["test parameter"] }, 1), missing_data_error_1.MissingDataError, "Parameter at index 1 missing");
            helpers_spec_1.assertThrowsChain(() => irc_message_2.requireParameter({ ircParameters: ["test parameter"] }, 2), missing_data_error_1.MissingDataError, "Parameter at index 2 missing");
        });
        it("should be able to return parameter 0 and 1 if parameters have length 2", function () {
            chai_1.assert.strictEqual("test", irc_message_2.requireParameter({ ircParameters: ["test", "parameters"] }, 0));
            chai_1.assert.strictEqual("parameters", irc_message_2.requireParameter({ ircParameters: ["test", "parameters"] }, 1));
            helpers_spec_1.assertThrowsChain(() => irc_message_2.requireParameter({ ircParameters: ["test", "parameters"] }, 2), missing_data_error_1.MissingDataError, "Parameter at index 2 missing");
        });
    });
    describe("#getNickname()", function () {
        it("should throw MissingDataError if nickname or prefix is missing", function () {
            helpers_spec_1.assertThrowsChain(() => irc_message_2.requireNickname(irc_message_1.parseIRCMessage("JOIN #pajlada")), missing_data_error_1.MissingDataError, "Missing prefix or missing nickname in prefix");
            helpers_spec_1.assertThrowsChain(() => irc_message_2.requireNickname(irc_message_1.parseIRCMessage(":tmi.twitch.tv JOIN #pajlada")), missing_data_error_1.MissingDataError, "Missing prefix or missing nickname in prefix");
        });
        it("should return the nickname otherwise", function () {
            const message = irc_message_1.parseIRCMessage(":leppunen!LEPPUNEN@lePPunen.tmi.twitch.tv JOIN #pajlada");
            chai_1.assert.strictEqual(irc_message_2.requireNickname(message), "leppunen");
        });
    });
});
//# sourceMappingURL=irc-message.spec.js.map