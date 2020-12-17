export declare class NotEnoughParametersError extends Error {
    private readonly _command;
    private readonly _expectedParams;
    private readonly _actualParams;
    constructor(_command: string, _expectedParams: number, _actualParams: number);
    get command(): string;
    get expectedParams(): number;
    get actualParams(): number;
}
