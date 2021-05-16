import {StringStream} from "./StringStream";

export interface IWriteAble {
    writeToString(str: StringStream): void;
}