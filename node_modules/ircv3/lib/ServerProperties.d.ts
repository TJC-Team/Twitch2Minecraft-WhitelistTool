export interface SupportedModesByType {
    prefix: string;
    list: string;
    alwaysWithParam: string;
    paramWhenSet: string;
    noParam: string;
}
export interface AccessLevelDefinition {
    modeChar: string;
    prefix: string;
}
export interface ServerProperties {
    channelTypes: string;
    supportedUserModes: string;
    supportedChannelModes: SupportedModesByType;
    prefixes: AccessLevelDefinition[];
}
export declare const defaultServerProperties: ServerProperties;
