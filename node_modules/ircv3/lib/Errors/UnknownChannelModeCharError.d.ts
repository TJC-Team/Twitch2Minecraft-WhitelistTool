export declare class UnknownChannelModeCharError extends Error {
    private readonly _char;
    constructor(_char: string);
    get char(): string;
}
