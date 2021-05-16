import {BaseFrames} from "../base/BaseFrames";
import {FrameBase} from "./FrameBase";
import {FrameHighlight} from "./FrameHighlight";
import {FrameBackdrop} from "./FrameBackdrop";
import {FrameButton} from "./FrameButton";

export type FrameType = BaseFrames | FrameBase | string;
export type FrameBackdropType = BaseFrames | FrameBackdrop | string;
export type FrameHighlightType = BaseFrames | FrameHighlight | string;
export type FrameButtonType = BaseFrames | FrameButton | string;