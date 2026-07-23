import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";

import { translateFigure, createStartFigure, translateShape, shape2figure } from "../paths/figure-path.js";
import { combineFigures } from "./merge-figures.js";
import { tileIndex2floatCoords } from "../tiles/hex-tile.js";

//import { SPIRAL_CLOCKWISE_SHAPE } from "../shapes/spiral-clockwise-shape.js";

import {
    ENEMY_VISIBLE,
    ENEMY_HIDDEN,
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
    HEIGHT_Y___11,
    HEIGHT_Y___20,
    HEIGHT_Y___30
} from "../values/the-constants.js";

import {
    BOUNCE_COUNT__250,
    BOUNCE_COUNT___50,
    BOUNCE_COUNT___25,
    BOUNCE_COUNT___10,
    BOUNCE_SPEED___1,
    BOUNCE_SPEED_1_5,
    BOUNCE_SPEED___2,
    BOUNCE_SPEED_2_5,
    BOUNCE_SPEED___3,
    BOUNCE_SPEED_3_5,
    BOUNCE_SPEED___4,
    BOUNCE_SPEED__10,
    BOUNCE_SPEED__50
} from "../trampolines/trampoline-const.js";

import { TILT_NN, TILT_SS, TILT_NW, TILT_NE, TILT_SE, TILT_SW, TILT_NONE } from "../values/the-constants.js";

// const START_X_NDX = 2;  // 2,1000,-5 is ok? on trans green
// const START_Y_NDX = 1000;
// const START_Z_NDX = -5;

// {x: 3, y: 12, z: -6.928203230275509}

const START_X_NDX = 0;
const START_Y_NDX = HEIGHT_Y___11; // start on -1,1100,0 ????? waht
const START_Z_NDX = 0;

const PLAYER_START_HEIGHT = HEIGHT_Y____1;
const start_tile = [START_X_NDX, START_Y_NDX, START_Z_NDX, TILT_NONE, INCLINE___0, IS_TRANSPARENT];

const LOOK_X_NDX = 0;
const LOOK_Y_NDX = 1100;
const LOOK_Z_NDX = -2;

import { makeNnPier } from "../figures/figure-nn-pier.js";
import { TEST_NN_FIGURE } from "../figures/test-nn-figure.js";
import { TEST_SS_FIGURE } from "../figures/test-ss-figure.js";
import { TEST_SW_FIGURE } from "../figures/test-sw-figure.js";
import { TEST_NW_FIGURE } from "../figures/test-nw-figure.js";
import { TEST_SE_FIGURE } from "../figures/test-se-figure.js";
//import { HAT_SHAPE } from "../figures/hat-shape.js";
//import { FLOWER_FIGURE } from "../figures/flower-shape.js";

const MAP2_ENEMY = [
    // [0, 1159, 0],
    // [0, 1159, -0.14],
    // [0, 1159, -0.21]
];

const MAP2_WALKWAY = [
    [0, 1100, 0, TILT_NONE, INCLINE___0, IS_TRANSPARENT]
    //   [0, 1100, 1]
    // [0, 1100, 2],
    // [0, 1100, 3]
];

function makeMap2(the_name) {
    const start_figure = createStartFigure(the_name, start_tile);

    const enemey_locations = { ENEMY_X_Y_Z: MAP2_ENEMY, START_ENEMY_IND: 0, INDEX_ITERATION: 1 };

    start_figure.WALKWAY__LOCS = MAP2_WALKWAY;
    start_figure.ENEMY__LOCS = { [the_name]: enemey_locations };

    const pier_a_name = the_name + "__A";
    const pier_b_name = the_name + "__B";
    const pier_nn_a = makeNnPier(pier_a_name, [0, 0, -1], ENEMY_VISIBLE);
    const pier_nn_b = makeNnPier(pier_b_name, [-8, -800, 5], ENEMY_VISIBLE);

    const figure_22list = [start_figure, pier_nn_a, pier_nn_b];
    const map_2 = combineFigures(the_name, figure_22list);
    return map_2;
}

function startMap2() {
    let [start_coord_x, start_coord_z] = tileIndex2floatCoords(START_X_NDX, START_Z_NDX);
    let start_coord_y = +START_Y_NDX;

    let start_location = [start_coord_x, start_coord_y, start_coord_z];

    let [look_coord_x, look_coord_z] = tileIndex2floatCoords(LOOK_X_NDX, LOOK_Z_NDX);
    let start_look_at = [look_coord_x, LOOK_Y_NDX, look_coord_z];

    return [start_location, start_look_at];
}

function doMap2() {
    let the_map = makeMap2("map2");
    let [start_location, start_look_at] = startMap2();
    return [the_map, start_location, start_look_at];
}

export { doMap2 };
