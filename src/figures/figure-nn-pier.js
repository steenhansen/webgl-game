//  http://localhost:5173/index-dev.html?trace-route=figure-nn-pier

import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";

import { ENEMY_NN_PIER } from "../enemies/enemy-nn-pier.js";

import { HAT_SHAPE } from "../shapes/hat-shape.js";
import { FLOWER_SHAPE } from "../shapes/flower-shape.js";
import { tileIndex2floatCoords } from "../tiles/hex-tile.js";
import { combineFigures } from "../maps/merge-figures.js";

import { spiralfigure } from "../shapes/spiral-clockwise-shape.js";
//import { SPIRAL_CLOCKWISE_SHAPE } from "../shapes/spiral-clockwise-shape.js";

import { translateFigure, translateShape, createStartFigure, shape2figure } from "../paths/figure-path.js";
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
    ["0", 1100, "0"],
    ["0", 1100, "-1"],
    ["0", 1100, "-2"],
    ["0", 1100, "-3"],
    ["0", 1100, "-4"]
];

const TEST_FENCES = [];

const TEST_TRAMPOLINES = [];

const maps_figures = [...TEST_WALKWAY];

function makePier(pier_name, is_recording_or_playing) {
    let enemy__locs;
    if (is_recording_or_playing == ENEMY_VISIBLE) {
        const enemey_locations = { ENEMY_X_Y_Z: ENEMY_NN_PIER, START_ENEMY_IND: 0, INDEX_ITERATION: 1 };
        enemy__locs = { [pier_name]: enemey_locations };
    } else {
        enemy__locs = {};
    }

    const TEST_NN_PIER = {
        FIGURE__NAME: pier_name,
        WALKWAY__LOCS: maps_figures,
        FENCE__LOCS: TEST_FENCES,
        TRAMPOLINE__LOCS: TEST_TRAMPOLINES,
        ENEMY__LOCS: enemy__locs
    };
    return TEST_NN_PIER;
}

//////////////////////
const START_X_NDX = 0;
const START_Y_NDX = HEIGHT_Y___11; // start on 0,1100,0
const START_Z_NDX = 0;

const LOOK_X_NDX = 0;
const LOOK_Y_NDX = 1100;
const LOOK_Z_NDX = -2;

const start_tile = [START_X_NDX, START_Y_NDX, START_Z_NDX, TILT_NONE, INCLINE___0, IS_TRANSPARENT];

function makeNnPier(figure_name, x_y_z, is_recording_or_playing) {
    let [xx, yy, zz] = x_y_z;

    const spiral_a_name = figure_name + "__J";
    const spiral_b_name = figure_name + "__K";

    let spiral_a, spiral_b;
    spiral_a = spiralfigure(spiral_a_name, [0, 0, -5], [1, 1], is_recording_or_playing);
    spiral_b = spiralfigure(spiral_b_name, [0, 0, 0], [1, 1], is_recording_or_playing);
    const the_pier_a = makePier(figure_name, is_recording_or_playing);
    const figure_list = [the_pier_a, spiral_a, spiral_b];
    const figure_combined = combineFigures(figure_name, figure_list);
    const figure_moved = translateFigure(figure_combined, xx, yy, zz);
    return figure_moved;
}

function startNnPier() {
    let [start_coord_x, start_coord_z] = tileIndex2floatCoords(START_X_NDX, START_Z_NDX);
    let start_coord_y = +START_Y_NDX;
    let start_location = [start_coord_x, start_coord_y, start_coord_z];
    let [look_coord_x, look_coord_z] = tileIndex2floatCoords(LOOK_X_NDX, LOOK_Z_NDX);
    let start_look_at = [look_coord_x, LOOK_Y_NDX, look_coord_z];
    return [start_location, start_look_at];
}

function doFigureNnPier() {
    console.log("Hit O to start enemy position copying, P to stop");
    let the_map = makeNnPier("copy-nn-pier", [0, 0, 0], ENEMY_HIDDEN); // TILE_0_0_0
    let [start_location, start_look_at] = startNnPier();
    return [the_map, start_location, start_look_at];
}

export { doFigureNnPier, makeNnPier };
