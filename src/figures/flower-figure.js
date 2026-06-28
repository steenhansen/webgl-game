import {
    IS_TRANSPARENT,
    INCLINE___0,
    INCLINE_0_5,
    INCLINE___1,
    INCLINE_1_5,
    INCLINE___2,
    INCLINE_2_5,
    INCLINE___3,
    HEIGHT_Y____0,
    HEIGHT_Y__0_5,
    HEIGHT_Y____1,
    HEIGHT_Y__1_5,
    HEIGHT_Y____2,
    HEIGHT_Y__2_5,
    HEIGHT_Y____3,
    HEIGHT_Y__3_5,
    HEIGHT_Y____4,
    HEIGHT_Y__4_5,
    HEIGHT_Y____5,
    HEIGHT_Y__5_5,
    HEIGHT_Y____6,
    HEIGHT_Y__6_5,
    HEIGHT_Y____7,
    HEIGHT_Y__7_5,
    HEIGHT_Y____8,
    HEIGHT_Y__8_5,
    HEIGHT_Y____9,
    HEIGHT_Y__9_5,
    HEIGHT_Y___10,
    HEIGHT_Y_10_5,
    HEIGHT_Y___11
} from "../values/the-constants.js";
import { TILT_NN, TILT_SS, TILT_NW, TILT_NE, TILT_SE, TILT_SW, TILT_NONE } from "../values/the-constants.js";

const HAT_WALKWAY = [
    // [START_X_NDX, START_Y_NDX, START_Z_NDX, TILT_NONE, INCLINE___0, IS_TRANSPARENT];
    ["001", HEIGHT_Y___11, "000", TILT_SE, INCLINE___1],
    ["000", HEIGHT_Y___11, "001", TILT_SS, INCLINE___1],
    ["-01", HEIGHT_Y___11, "001", TILT_SW, INCLINE___1],
    ["-01", HEIGHT_Y___11, "000", TILT_NW, INCLINE___1],
    ["000", HEIGHT_Y___11, "-01", TILT_NN, INCLINE___1],
    ["001", HEIGHT_Y___11, "-01", TILT_NE, INCLINE___1]
];

const FLOWER_FIGURE = {
    walkway_locs: HAT_WALKWAY,
    fence_locs: [],
    trampoline_locs: [],
    pentagon_locs: []
};

export { FLOWER_FIGURE };
