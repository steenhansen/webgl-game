import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";

import { FENCE_NN, FENCE_SS, FENCE_SE, FENCE_NW, FENCE_SW, FENCE_NE } from "../values/the-constants.js";

import { C_____BLUE, C___YELLOW, C______RED, C___PURPLE, C____BROWN } from "../values/the-constants.js";

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
} from "../values/constants.js";

import {
    BOUNCE_COUNT___25,
    BOUNCE_SPEED___1,
    BOUNCE_SPEED_1_5,
    BOUNCE_SPEED___2,
    BOUNCE_SPEED_2_5,
    BOUNCE_SPEED___3,
    BOUNCE_SPEED_3_5,
    BOUNCE_SPEED___4
} from "../trampolines/trampoline-const.js";

import { TILT_NN, TILT_SS, TILT_NW, TILT_NE, TILT_SE, TILT_SW, TILT_NONE } from "../values/constants.js";

//  http://localhost:5173/index-dev.html?figure=loop-walk

const WALK_WAY = [
    ["001", HEIGHT_Y___11, "-2"],
    ["000", HEIGHT_Y___11, "-1"],
    ["-01", HEIGHT_Y___11, "2"],
    ["-01", HEIGHT_Y___11, "1"],
    ["-01", HEIGHT_Y___11, "0"],
    ["-02", HEIGHT_Y___11, "0"],
    ["-03", HEIGHT_Y___11, "0"]
];
const SQUARE_WALLS = [
    ["001", "200", "002", C_____BLUE, FENCE_SW, 0.5],
    ["001", "200", "003", C___YELLOW, FENCE_NW, 0.5],
    ["000", "200", "004", C______RED, FENCE_NN, 0.5],
    ["-01", "200", "004", C___PURPLE, FENCE_NE, 0.5],
    ["-01", "200", "003", C____BROWN, FENCE_SE, 0.5]
];

const LOOP_TRAMPS = ["-01", HEIGHT_Y___11, "-109", BOUNCE_SPEED___4, "12"];
const THE_TRAMPOLINES = [LOOP_TRAMPS];

const MOVING_PENTAGONS = [["0", "270", "3", C____GREEN]];

const LOOP_FIGURE = {
    figure_name: "LOOP_WALK",
    walkway_locs: WALK_WAY,
    barrier_locs: SQUARE_WALLS,
    trampoline_locs: THE_TRAMPOLINES,
    pentagon_locs: MOVING_PENTAGONS
};

export { LOOP_FIGURE };
