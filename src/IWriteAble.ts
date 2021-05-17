import {StringStream} from "./StringStream";

export interface IWriteAble {
    compileToStringStream(str: StringStream): void;
}