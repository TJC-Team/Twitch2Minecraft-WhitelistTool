import type { AccessTokenData } from './AccessToken';
/** @deprecated No replacement. */
export interface LegacyAuthCredentials {
    client_id: string;
    client_secret: string;
}
/** @deprecated Use `exchangeCode` instead. */
export declare function getUserAccessToken(creds: LegacyAuthCredentials, code: string, redirectUri?: string): Promise<AccessTokenData>;
/** @deprecated Use `refreshUserToken` instead. */
export declare function refreshUserAccessToken(creds: LegacyAuthCredentials, refreshToken: string): Promise<AccessTokenData>;
/** @deprecated Use `getAppToken` instead. */
export declare function getAppAccessToken(creds: LegacyAuthCredentials): Promise<AccessTokenData>;
