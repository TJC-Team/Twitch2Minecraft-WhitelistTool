"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppAccessToken = exports.refreshUserAccessToken = exports.getUserAccessToken = void 0;
var tslib_1 = require("tslib");
var deprecate_1 = require("@d-fischer/deprecate");
var twitch_api_call_1 = require("twitch-api-call");
/** @deprecated Use `exchangeCode` instead. */
function getUserAccessToken(creds, code, redirectUri) {
    if (redirectUri === void 0) { redirectUri = 'http://localhost'; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            deprecate_1.default('[twitch-auth] getUserAccessToken', 'Use exchangeCode instead.');
            return [2 /*return*/, twitch_api_call_1.callTwitchApi({
                    type: twitch_api_call_1.TwitchApiCallType.Auth,
                    url: 'token',
                    method: 'POST',
                    query: {
                        grant_type: 'authorization_code',
                        client_id: creds.client_id,
                        client_secret: creds.client_secret,
                        code: code,
                        redirect_uri: redirectUri
                    }
                })];
        });
    });
}
exports.getUserAccessToken = getUserAccessToken;
/** @deprecated Use `refreshUserToken` instead. */
function refreshUserAccessToken(creds, refreshToken) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            deprecate_1.default('[twitch-auth] refreshUserAccessToken', 'Use refreshUserToken instead.');
            return [2 /*return*/, twitch_api_call_1.callTwitchApi({
                    type: twitch_api_call_1.TwitchApiCallType.Auth,
                    url: 'token',
                    method: 'POST',
                    query: {
                        grant_type: 'refresh_token',
                        client_id: creds.client_id,
                        client_secret: creds.client_secret,
                        refresh_token: refreshToken
                    }
                })];
        });
    });
}
exports.refreshUserAccessToken = refreshUserAccessToken;
/** @deprecated Use `getAppToken` instead. */
function getAppAccessToken(creds) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            deprecate_1.default('[twitch-auth] getAppAccessToken', 'Use getAppToken instead.');
            return [2 /*return*/, twitch_api_call_1.callTwitchApi({
                    type: twitch_api_call_1.TwitchApiCallType.Auth,
                    url: 'token',
                    method: 'POST',
                    query: {
                        grant_type: 'client_credentials',
                        client_id: creds.client_id,
                        client_secret: creds.client_secret
                    }
                })];
        });
    });
}
exports.getAppAccessToken = getAppAccessToken;
