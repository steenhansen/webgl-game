import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";

import { translateFigure, createStartFigure, translateShape } from "../paths/figure-path.js";
import { combineFigures } from "./merge-figures.js";
import { tileIndex2floatCoords } from "../tiles/hex-tile.js";

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

import { TEST_NE_FIGURE } from "../figures/test-ne-figure.js";
import { TEST_NN_FIGURE } from "../figures/test-nn-figure.js";
import { TEST_SS_FIGURE } from "../figures/test-ss-figure.js";
import { TEST_SW_FIGURE } from "../figures/test-sw-figure.js";
import { TEST_NW_FIGURE } from "../figures/test-nw-figure.js";
import { TEST_SE_FIGURE } from "../figures/test-se-figure.js";

function makeMap1() {
    const start_figure = createStartFigure("start-bobo", start_tile);

    const fig_ne = translateFigure(TEST_NE_FIGURE, 0, 0, 0);
    const fig_nn = translateFigure(TEST_NN_FIGURE, 0, 0, 0);
    const fig_ss = translateFigure(TEST_SS_FIGURE, 0, 0, 0);
    const fig_sw = translateFigure(TEST_SW_FIGURE, 0, 0, 0);
    const fig_nw = translateFigure(TEST_NW_FIGURE, 0, 0, 0);
    const fig_se = translateFigure(TEST_SE_FIGURE, 0, 0, 0);

    const trampoline_fig = {
        TRAMPOLINE__LOCS: [
            // ["01", HEIGHT_Y___10, "00", BOUNCE_SPEED__50, BOUNCE_COUNT___25, TILT_NONE, INCLINE___0],
            // //   ["00", HEIGHT_Y___11, "-1", BOUNCE_SPEED__50, BOUNCE_COUNT__250, TILT_NONE, INCLINE___0],
            // ["00", HEIGHT_Y___11, "-1", 0, 50, TILT_NONE, INCLINE___0],
            // ["-1", HEIGHT_Y___10, "01", BOUNCE_SPEED___4, BOUNCE_COUNT___50, TILT_SW, INCLINE___1]
        ]
    };
    const figure_list = [start_figure, fig_ne, fig_nn, fig_ss, fig_sw, fig_nw, fig_se];
    const trie_map = combineFigures("map-1", figure_list);
    return trie_map;
}

function startMap1() {
    let [start_coord_x, start_coord_z] = tileIndex2floatCoords(START_X_NDX, START_Z_NDX);
    let start_coord_y = +START_Y_NDX;

    let start_location = [start_coord_x, start_coord_y, start_coord_z];

    let [look_coord_x, look_coord_z] = tileIndex2floatCoords(LOOK_X_NDX, LOOK_Z_NDX);
    let start_look_at = [look_coord_x, LOOK_Y_NDX, look_coord_z];

    return [start_location, start_look_at];
}

function doMap1() {
    let the_map = makeMap1();
    let [start_location, start_look_at] = startMap1();
    return [the_map, start_location, start_look_at];
}

export { doMap1 };
