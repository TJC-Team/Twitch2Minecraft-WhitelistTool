export declare function sanitizeParameter(param: string, spaceAllowed?: boolean): string;
export declare function isChannel(str: string, validTypes?: string): boolean;
export interface ParsedCtcp {
    command: string;
    params: string;
}
export declare function decodeCtcp(message: string): ParsedCtcp | false;
