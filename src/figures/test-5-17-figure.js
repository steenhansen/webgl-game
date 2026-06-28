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

const TEST_WALKWAY = [
    // absolute start 0,1100,0                  A
    ["1", 1100, "-1"], //                        B A+B=NN_5_FLAT__FLAT
    ["2", 1100, "-2", TILT_NE, INCLINE___1], // C B+C=NN_6_FLAT__UP
    ["3", 1200, "-3"], //                       D C+D=NN_7_UP__FLAT
    ["4", 1100, "-4", TILT_SW, INCLINE___1], // E D+E=NN_9_FLAT__DOWN
    ["5", 1100, "-5"], //                       F E+F=NN_8_DOWN__FLAT
    ["6", 1100, "-6", TILT_NE, INCLINE___1], // G
    ["7", 1200, "-7", TILT_NE, INCLINE___1], // H G+H=NN_10_UP__UP
    ["8", 1200, "-8", TILT_SW, INCLINE___1], // I H+I=NN_12_UP__DOWN
    ["9", 1100, "-9", TILT_SW, INCLINE___1], // J I+J=NN_11_DOWN__DOWN
    ["10", 1100, "-10", TILT_NE, INCLINE___1], // K J+K=NN_13_DOWN__UP

    ["11", 1200, "-11"],
    ["12", 1200, "-12"],
    ["13", 1200, "-13"],
    ["14", 1200, "-14"],
    ["15", 1200, "-15"],
    ["16", 1200, "-16"],
    ["17", 1200, "-17"],
    ["18", 1200, "-18"],
    ["19", 1200, "-19"],
    ["20", 1200, "-20"],
    ["21", 1200, "-21"],
    ["22", 1200, "-22"],
    ["23", 1200, "-23"],
    ["24", 1200, "-24"],

    ["1", 1100, "-2"] // for the fence

    // NN_14_BLOCKED
    // NE_15_TRAMPOLINE
    // NE_16_STROLL_INTO_AIR    NE_STROLL_INTO_AIR
    // NE_17_DESCEND_ONE_STEP    NE_17_DESCEND_ONE_STEP
];

const fence_NW = { hex_a: ["1", HEIGHT_Y___11, "-2"], hex_b: ["0", HEIGHT_Y___11, "-2"], fence_height: HEIGHT_Y____3 };

const fence_NN = { hex_a: ["1", HEIGHT_Y___11, "-2"], hex_b: ["1", HEIGHT_Y___11, "-3"], fence_height: HEIGHT_Y____4 };
const fence_NE = { hex_a: ["1", HEIGHT_Y___11, "-2"], hex_b: ["2", HEIGHT_Y___11, "-3"], fence_height: HEIGHT_Y____5 };
const fence_SE = { hex_a: ["1", HEIGHT_Y___11, "-2"], hex_b: ["2", HEIGHT_Y___11, "-2"], fence_height: HEIGHT_Y____6 };

const fence_SS = { hex_a: ["1", HEIGHT_Y___11, "-2"], hex_b: ["1", HEIGHT_Y___11, "-1"], fence_height: HEIGHT_Y____7 };

const fence_SW = { hex_a: ["1", HEIGHT_Y___11, "-2"], hex_b: ["0", HEIGHT_Y___11, "-1"], fence_height: HEIGHT_Y____8 };

const TEST_FENCES = [fence_NW, fence_NN, fence_NE, fence_SE, fence_SS, fence_SW];
//const TEST_FENCES = [fence_NW];

const TEST_TRAMPOLINES = [
    //   ["000", HEIGHT_Y___10, "-1", BOUNCE_SPEED___4, BOUNCE_COUNT___25, TILT_NONE, INCLINE___0],
    // ["0", HEIGHT_Y___11, "1", BOUNCE_SPEED___4, 100, TILT_NONE, INCLINE___0]
];

const TEST_5_17_FIGURE = {
    walkway_locs: TEST_WALKWAY,
    fence_locs: TEST_FENCES,
    trampoline_locs: TEST_TRAMPOLINES,
    pentagon_locs: []
};

export { TEST_5_17_FIGURE };
