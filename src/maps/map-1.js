import { ee, tt, EE, TT } from "../misc/console-short.js";
import { TRIE_FIGURE } from "../figures/trie-shape.js";
import { translateFigure, createStartFigure } from "../figures/figure-path.js";
import { translateAllFigures } from "./merge-figures.js";
import { tileCenterCoord } from "../tiles/hex-tile.js";

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

import {
    BOUNCE_COUNT___25,
    BOUNCE_SPEED___1,
    BOUNCE_SPEED_1_5,
    BOUNCE_SPEED___2,
    BOUNCE_SPEED_2_5,
    BOUNCE_SPEED___3,
    BOUNCE_SPEED_3_5,
    BOUNCE_SPEED___4
} from "../vertical-movement/trampoline-const.js";

import { TILT_NN, TILT_SS, TILT_NW, TILT_NE, TILT_SE, TILT_SW, TILT_NONE } from "../values/the-constants.js";

// const start_x_ndx = -3;
// const start_y_ndx = 2300;
// const start_z_ndx = -3;

const start_x_ndx = -4;
const start_y_ndx = 1100;
const start_z_ndx = -0;

const start_tile = [start_x_ndx, start_y_ndx, start_z_ndx, TILT_NONE, INCLINE___0, IS_TRANSPARENT];

const look_x_ndx = -1;
const look_y_ndx = 1210;
const look_z_ndx = 0;

function makeMap1() {
    const start_figure = createStartFigure("start-bobo", start_tile);

    const fig_1 = translateFigure(TRIE_FIGURE, 0, 0, 0);
    // const fig_2 = translateFigure(TRIE_FIGURE, 10, -500, 0);

    const trampoline_fig = {
        trampoline_locs: [["0", HEIGHT_Y___11, "3", BOUNCE_SPEED___4, BOUNCE_COUNT___25, TILT_SS, INCLINE___1]]
    };

    // const fig_3 = translateFigure(TRIE_FIGURE, 0, -1000, 10);
    //    const maps_figures = [start_figure, fig_1, fig_2, fig_3];
    const maps_figures = [start_figure, fig_1, trampoline_fig];

    const trie_map = translateAllFigures(maps_figures);

    return trie_map;
}

function startMap1() {
    let [start_coord_x, start_coord_z] = tileCenterCoord(start_x_ndx, start_z_ndx);
    let start_location = [start_coord_x, start_y_ndx, start_coord_z];

    let [look_coord_x, look_coord_z] = tileCenterCoord(look_x_ndx, look_z_ndx);
    let start_look_at = [look_coord_x, look_y_ndx, look_coord_z];

    return [start_location, start_look_at];
}

function doMap1() {
    let the_map = makeMap1();
    let [start_location, start_look_at] = startMap1();
    return [the_map, start_location, start_look_at];
}

export { doMap1 };
