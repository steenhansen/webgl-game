import { HAT_SHAPE } from "../shapes/hat-shape.js";
import { FLOWER_SHAPE } from "../shapes/flower-shape.js";

import { translateFigure, translateShape, createStartFigure } from "../paths/figure-path.js";
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
    ["0", 1100, "1"], //                        B A+B=NN_5_FLAT__FLAT

    ["0", 1100, "2"],
    ["0", 1100, "3"],

    ["0", 1100, "4", TILT_SS, INCLINE___1], // C B+C=NN_6_FLAT__UP
    ["0", 1200, "5"], //                       D C+D=NN_7_UP__FLAT
    ["0", 1100, "6", TILT_NN, INCLINE___1], // E D+E=NN_9_FLAT__DOWN
    ["0", 1100, "7"], //                       F E+F=NN_8_DOWN__FLAT
    ["0", 1100, "8", TILT_SS, INCLINE___1], // G
    ["0", 1200, "9", TILT_SS, INCLINE___1], // H G+H=NN_10_UP__UP
    ["0", 1200, "10", TILT_NN, INCLINE___1], // I H+I=NN_12_UP__DOWN
    ["0", 1100, "11", TILT_NN, INCLINE___1], // J I+J=NN_11_DOWN__DOWN
    ["0", 1100, "12", TILT_SS, INCLINE___1], // K J+K=NN_13_DOWN__UP

    ["0", 1200, "13"],
    ["0", 1200, "14"],

    ["0", 1100, "15"], //  NE_16_DESCEND_ONE_STEP
    // //    ["14", 1100, "-14"], //  NE_15_TRAMPOLINE

    ["0", 800, "17"], //  NE_15_STROLL_INTO_AIR
    ["0", 800, "18"], // NE_14_BLOCKED

    ["1", 1100, "7"], // PATH TO HAT
    ["-1", 1100, "8"] // PATH TO FLOWER

    // ["50", 1100, "-50"] // so don't finish
];

const fence_NE = { hex_a: ["0", 800, "18"], hex_b: ["0", 800, "19"], fence_height: HEIGHT_Y___11 };
const TEST_FENCES = [fence_NE];

const TEST_TRAMPOLINES = [["0", 1100, "16", BOUNCE_SPEED___4, BOUNCE_COUNT___25, TILT_NONE, INCLINE___0]];

const shape_hat = translateShape(HAT_SHAPE, -3, 0, 10);

const shape_flower = translateShape(FLOWER_SHAPE, 3, -100, 7);

const maps_figures = [...TEST_WALKWAY, ...shape_hat, ...shape_flower];

const TEST_SS_FIGURE = {
    WALKWAY__LOCS: maps_figures,
    FENCE__LOCS: TEST_FENCES,
    TRAMPOLINE__LOCS: TEST_TRAMPOLINES,
    ENEMY__LOCS: []
};

export { TEST_SS_FIGURE };
