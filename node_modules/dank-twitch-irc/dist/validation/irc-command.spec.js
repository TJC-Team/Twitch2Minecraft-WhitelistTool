"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_spec_1 = require("../helpers.spec");
const irc_command_1 = require("./irc-command");
const validation_error_1 = require("./validation-error");
describe("./validation/irc-command", function () {
    describe("#validateIRCCommand", function () {
        it("should reject newlines", function () {
            helpers_spec_1.assertThrowsChain(() => irc_command_1.validateIRCCommand("JOIN\n"), validation_error_1.ValidationError, "IRC command may not include \\n or \\r");
            helpers_spec_1.assertThrowsChain(() => irc_command_1.validateIRCCommand("\n"), validation_error_1.ValidationError, "IRC command may not include \\n or \\r");
            helpers_spec_1.assertThrowsChain(() => irc_command_1.validateIRCCommand("\nJOIN"), validation_error_1.ValidationError, "IRC command may not include \\n or \\r");
            helpers_spec_1.assertThrowsChain(() => irc_command_1.validateIRCCommand("JOIN\nJOIN"), validation_error_1.ValidationError, "IRC command may not include \\n or \\r");
        });
        it("should reject carriage returns", function () {
            helpers_spec_1.assertThrowsChain(() => irc_command_1.validateIRCCommand("JOIN\r"), validation_error_1.ValidationError, "IRC command may not include \\n or \\r");
            helpers_spec_1.assertThrowsChain(() => irc_command_1.validateIRCCommand("\r"), validation_error_1.ValidationError, "IRC command may not include \\n or \\r");
            helpers_spec_1.assertThrowsChain(() => irc_command_1.validateIRCCommand("\rJOIN"), validation_error_1.ValidationError, "IRC command may not include \\n or \\r");
            helpers_spec_1.assertThrowsChain(() => irc_command_1.validateIRCCommand("JOIN\rJOIN"), validation_error_1.ValidationError, "IRC command may not include \\n or \\r");
        });
        it("should pass normal IRC commands", function () {
            irc_command_1.validateIRCCommand("JOIN");
            irc_command_1.validateIRCCommand("");
            irc_command_1.validateIRCCommand("PRIVMSG #forsen :asd");
            irc_command_1.validateIRCCommand("JOIN #pajlada");
        });
    });
});
//# sourceMappingURL=irc-command.spec.js.map