import {BaseFrames} from "../base/BaseFrames";
import {FrameBase} from "./FrameBase";
import {FrameHighlight} from "./FrameHighlight";
import {FrameBackdrop} from "./FrameBackdrop";
import {FrameButton} from "./FrameButton";
import {FrameScrollbar} from "./FrameScrollbar";
import {FrameGlueTextButton} from "./FrameGlueTextButton";

export type FrameType = BaseFrames | FrameBase | string;
export type FrameBackdropType = BaseFrames | FrameBackdrop | string;
export type FrameHighlightType = BaseFrames | FrameHighlight | string;
export type FrameButtonType = BaseFrames | FrameButton | FrameGlueTextButton | string;
export type FrameScrollbarType = BaseFrames | FrameScrollbar | string;