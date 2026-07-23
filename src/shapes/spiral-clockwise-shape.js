import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";

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
    HEIGHT_Y___11,
    HEIGHT_Y___12,
    HEIGHT_Y___13,
    HEIGHT_Y___14,
    HEIGHT_Y___15,
    HEIGHT_Y___16,
    HEIGHT_Y___17,
    HEIGHT_Y___18,
    HEIGHT_Y___19,
    HEIGHT_Y___20,
    HEIGHT_Y___21,
    HEIGHT_Y___22,
    HEIGHT_Y___23,
    HEIGHT_Y___24,
    HEIGHT_Y___25,
    HEIGHT_Y___26,
    HEIGHT_Y___27,
    HEIGHT_Y___28,
    HEIGHT_Y___29
} from "../values/the-constants.js";
import { TILT_NN, TILT_SS, TILT_NW, TILT_NE, TILT_SE, TILT_SW, TILT_NONE } from "../values/the-constants.js";

const SPIRAL_CLOCKWISE_SHAPE = [
    ["001", HEIGHT_Y___11, "000"],
    ["002", HEIGHT_Y___11, "-1", TILT_NE, INCLINE___1],
    ["003", HEIGHT_Y___12, "-2"],
    ["003", HEIGHT_Y___12, "-1", TILT_SS, INCLINE___1],
    ["003", HEIGHT_Y___13, "0"],
    ["002", HEIGHT_Y___13, "0", TILT_NW, INCLINE___1],

    ["001", HEIGHT_Y___14, "000"],
    ["002", HEIGHT_Y___14, "-1", TILT_NE, INCLINE___1],
    ["003", HEIGHT_Y___15, "-2"],
    ["003", HEIGHT_Y___15, "-1", TILT_SS, INCLINE___1],
    ["003", HEIGHT_Y___16, "0"],
    ["002", HEIGHT_Y___16, "0", TILT_NW, INCLINE___1],

    ["001", HEIGHT_Y___17, "000"],
    ["002", HEIGHT_Y___17, "-1", TILT_NE, INCLINE___1],
    ["003", HEIGHT_Y___18, "-2"],
    ["003", HEIGHT_Y___18, "-1", TILT_SS, INCLINE___1],
    ["003", HEIGHT_Y___19, "0"],
    ["002", HEIGHT_Y___19, "0", TILT_NW, INCLINE___1]
];

const SPIRAL_ENEMY = [
    // [1, 1159, -0.07],
    // [1, 1159, -0.14],
    // [1, 1159, -0.21]
];

function spiralfigure(the_name, x_y_z, enemy_moves, is_recording_or_playing) {
    let [x, y, z] = x_y_z;
    let [start_enemy_ind, index_iteration] = enemy_moves;

    const long_name = the_name + "__spiral";

    let enemy__locs;
    if (is_recording_or_playing == ENEMY_VISIBLE) {
        const enemey_locations = { ENEMY_X_Y_Z: SPIRAL_ENEMY, START_ENEMY_IND: start_enemy_ind, INDEX_ITERATION: index_iteration };
        enemy__locs = { [long_name]: enemey_locations };
    } else {
        enemy__locs = {};
    }
    const spiral_figure = {
        FIGURE__NAME: long_name,
        WALKWAY__LOCS: SPIRAL_CLOCKWISE_SHAPE,
        FENCE__LOCS: [],
        TRAMPOLINE__LOCS: [],
        ENEMY__LOCS: enemy__locs
    };
    const spiral_figure_t = translateFigure(spiral_figure, x, y, z);
    return spiral_figure_t;
}

export { spiralfigure };
