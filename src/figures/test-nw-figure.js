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
    ["-1", 1100, "0"], //                        B A+B=NN_5_FLAT__FLAT

    ["-2", 1100, "0"],
    ["-3", 1100, "0"],

    ["-4", 1100, "0", TILT_NW, INCLINE___1], // C B+C=NN_6_FLAT__UP
    ["-5", 1200, "0"], //                       D C+D=NN_7_UP__FLAT
    ["-6", 1100, "0", TILT_SE, INCLINE___1], // E D+E=NN_9_FLAT__DOWN
    ["-7", 1100, "0"], //                       F E+F=NN_8_DOWN__FLAT
    ["-8", 1100, "0", TILT_NW, INCLINE___1], // G
    ["-9", 1200, "0", TILT_NW, INCLINE___1], // H G+H=NN_10_UP__UP
    ["-10", 1200, "0", TILT_SE, INCLINE___1], // I H+I=NN_12_UP__DOWN
    ["-11", 1100, "0", TILT_SE, INCLINE___1], // J I+J=NN_11_DOWN__DOWN
    ["-12", 1100, "0", TILT_NW, INCLINE___1], // K J+K=NN_13_DOWN__UP

    ["-13", 1200, "0"],
    ["-14", 1200, "0"],
    ["-15", 1100, "0"], //  NE_16_DESCEND_ONE_STEP
    //    ["14", 1100, "-14"], //  NE_15_TRAMPOLINE

    ["-17", 800, "0"], //  NE_15_STROLL_INTO_AIR
    ["-18", 800, "0"], // NE_14_BLOCKED

    ["-8", 1100, "1"], // PATH TO HAT
    ["-7", 1100, "-1"], // PATH TO FLOWER

    ["50", 1100, "-50"] // so don't finish
];

const fence_NE = { hex_a: ["-18", 800, "0"], hex_b: ["-19", 800, "0"], fence_height: HEIGHT_Y___10 };
const TEST_FENCES = [fence_NE];

const TEST_TRAMPOLINES = [["-16", 1100, "0", BOUNCE_SPEED___4, BOUNCE_COUNT___25, TILT_NONE, INCLINE___0]];

const shape_hat = translateShape(HAT_SHAPE, -10, 0, 3);

const shape_flower = translateShape(FLOWER_SHAPE, -7, -100, -3);

const maps_figures = [...TEST_WALKWAY, ...shape_hat, ...shape_flower];

const TEST_NW_FIGURE = {
    WALKWAY__LOCS: maps_figures,
    FENCE__LOCS: TEST_FENCES,
    TRAMPOLINE__LOCS: TEST_TRAMPOLINES,
    ENEMY__LOCS: []
};

export { TEST_NW_FIGURE };
