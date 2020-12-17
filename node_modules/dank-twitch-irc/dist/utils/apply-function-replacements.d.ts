import { A } from "ts-toolbelt";
export declare type SelectKeys<O extends object, M extends any> = {
    [K in keyof O]: {
        1: K;
        0: never;
    }[A.Is<O[K], M>];
}[keyof O];
export declare type FunctionKeysOf<T extends object> = SelectKeys<T, (...args: any) => any>;
export declare type FunctionAt<T extends object, K extends FunctionKeysOf<T>> = (...args: Parameters<T[K]>) => ReturnType<T[K]>;
export declare type OverrideFunction<S, T extends object, K extends FunctionKeysOf<T>> = (this: S, oldFn: FunctionAt<T, K>, ...args: Parameters<T[K]>) => ReturnType<T[K]>;
export declare function applyReplacement<S, T extends object, K extends FunctionKeysOf<T>>(self: S, target: T, key: K, newFn: OverrideFunction<S, T, K>): void;
export declare type OverrideFunctions<S, T extends object> = {
    [K in FunctionKeysOf<T>]?: OverrideFunction<S, T, K>;
};
export declare function applyReplacements<S, T extends object>(self: S, target: T, replacements: OverrideFunctions<S, T>): void;
//# sourceMappingURL=apply-function-replacements.d.ts.map