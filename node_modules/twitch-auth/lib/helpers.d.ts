import type { Logger } from '@d-fischer/logger';
import { AccessToken } from './AccessToken';
import type { AuthProvider } from './AuthProvider/AuthProvider';
import { TokenInfo } from './TokenInfo';
/**
 * Retrieves an access token with your client credentials and an authorization code.
 *
 * @param clientId The client ID of your application.
 * @param clientSecret The client secret of your application.
 * @param code The authorization code.
 * @param redirectUri The redirect URI. This serves no real purpose here, but must still match one of the redirect URIs you configured in the Twitch Developer dashboard.
 */
export declare function exchangeCode(clientId: string, clientSecret: string, code: string, redirectUri: string): Promise<AccessToken>;
/**
 * Retrieves an app access token with your client credentials.
 *
 * @param clientId The client ID of your application.
 * @param clientSecret The client secret of your application.
 * @param clientSecret
 */
export declare function getAppToken(clientId: string, clientSecret: string): Promise<AccessToken>;
/**
 * Refreshes an expired access token with your client credentials and the refresh token that was given by the initial authentication.
 *
 * @param clientId The client ID of your application.
 * @param clientSecret The client secret of your application.
 * @param refreshToken The refresh token.
 */
export declare function refreshUserToken(clientId: string, clientSecret: string, refreshToken: string): Promise<AccessToken>;
/**
 * Revokes an access token.
 *
 * @param clientId The client ID of your application.
 * @param accessToken The access token.
 */
export declare function revokeToken(clientId: string, accessToken: string): Promise<void>;
/**
 * Retrieves information about an access token.
 *
 * @param clientId The client ID of your application.
 * @param accessToken The access token to get the information of.
 *
 * You need to obtain one using one of the [Twitch OAuth flows](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).
 */
export declare function getTokenInfo(accessToken: string, clientId?: string): Promise<TokenInfo>;
/** @private */
export declare function getValidTokenFromProvider(provider: AuthProvider, scopes?: string[], logger?: Logger): Promise<{
    accessToken: AccessToken;
    tokenInfo: TokenInfo;
}>;
