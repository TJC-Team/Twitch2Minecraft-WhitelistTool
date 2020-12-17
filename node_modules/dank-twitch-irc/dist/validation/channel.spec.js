"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_spec_1 = require("../helpers.spec");
const channel_1 = require("./channel");
const validation_error_1 = require("./validation-error");
describe("./validation/channel", function () {
    describe("#validateChannelName()", function () {
        it("rejects undefined", function () {
            helpers_spec_1.assertThrowsChain(() => channel_1.validateChannelName(undefined), validation_error_1.ValidationError, "Channel name undefined is invalid/malformed");
        });
        it("rejects null", function () {
            helpers_spec_1.assertThrowsChain(() => channel_1.validateChannelName(null), validation_error_1.ValidationError, "Channel name null is invalid/malformed");
        });
        it("rejects empty strings", function () {
            helpers_spec_1.assertThrowsChain(() => channel_1.validateChannelName(""), validation_error_1.ValidationError, "Channel name empty string is invalid/malformed");
        });
        it("allows single letters", function () {
            channel_1.validateChannelName("a");
            channel_1.validateChannelName("b");
            channel_1.validateChannelName("x");
            channel_1.validateChannelName("z");
        });
        it("allows underscores", function () {
            channel_1.validateChannelName("a_b");
            channel_1.validateChannelName("b___c");
            channel_1.validateChannelName("lack_of_sanity");
            channel_1.validateChannelName("just__get__a__house");
        });
        it("rejects uppercase letters", function () {
            helpers_spec_1.assertThrowsChain(() => channel_1.validateChannelName("Pajlada"), validation_error_1.ValidationError, 'Channel name "Pajlada" is invalid/malformed');
        });
    });
});
//# sourceMappingURL=channel.spec.js.map