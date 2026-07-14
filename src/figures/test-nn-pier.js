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
    ["-1", 1100, "-1", TILT_NN, INCLINE___1],

    ["0", 1100, "-1"], //

    ["0", 1100, "-2"],

    ["0", 1100, "-3"],
    ["0", 1100, "-4"],
    ["0", 1100, "-5"],
    ["0", 1100, "-6"],
    ["0", 1100, "-7"],
    ["0", 1100, "-8"],
    ["0", 1100, "-9"],
    ["0", 1100, "-10"],
    ["0", 1100, "-11"],
    ["0", 1100, "-12"],
    ["0", 1100, "-13"],
    ["0", 1100, "-14"],
    ["0", 1100, "-15"],
    ["0", 1100, "-16"],
    ["0", 1100, "-17"],
    ["0", 1100, "-18"]
];

const TEST_FENCES = [];

const TEST_TRAMPOLINES = [];

const maps_figures = [...TEST_WALKWAY];

const TEST_NN_PIER = {
    walkway_locs: maps_figures,
    fence_locs: TEST_FENCES,
    trampoline_locs: TEST_TRAMPOLINES,
    pentagon_locs: []
};

export { TEST_NN_PIER };
