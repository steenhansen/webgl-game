import { ee, tt, EE, TT } from "../../console-short.js";

import {
    MOVE_FALLING,
    MOVE_NEW_TILE,
    MOVE_SAME_TILE,
    MOVE_BLOCKED,
    TESTING_PRINT,
    WALL_SS,
    TILT_SS,
    TILT_NONE,
    TILT_NN,
    TILT_NE,
    TILT_SE,
    TILT_SW,
    TILT_NW
} from "../../constants.js";
import { stripYindex } from "../hex-routines.js";

import {
    NN_AIRBORNE,
    NN_1_UP_UP_CLOCK,
    NN_2_UP_UP_COUNTER,
    NN_3_DOWN_DOWN_CLOCK,
    NN_4_DOWN_DOWN_COUNTER,
    NN_5_FLAT__FLAT,
    NN_6_FLAT__UP,
    NN_7_UP__FLAT,
    NN_8_DOWN__FLAT,
    NN_9_FLAT__DOWN,
    NN_10_UP__UP,
    NN_11_DOWN__DOWN,
    NN_12_UP__DOWN,
    NN_13_DOWN__UP,
    NN_14_BLOCKED
} from "./nn-constants.js";

function nnInAir(walkway_columns, new_index) {
    let current_xz_index = stripYindex(new_index);
    let current_xz_column = walkway_columns.get(current_xz_index);
    if (current_xz_column == undefined) {
        return true; // falling in a column with no tiles
    }
    let current_xyz_walkway_index = current_xz_column.get(new_index);

    if (current_xyz_walkway_index == undefined) {
        return true; // falling in a column with tiles, but no tile at this height
    }
    return false;
}

function nnAllow(local_data, mess_1) {
    let { run_or_test, print_allowed, prev_tilt_up, new_tilt_up } = local_data;
    if (print_allowed == TESTING_PRINT) {
        ee(`TEST allowed NN :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
    }
    return MOVE_NEW_TILE;
}

function nnBlock(local_data, mess_1) {
    let { run_or_test, print_allowed, prev_tilt_up, new_tilt_up } = local_data;
    if (print_allowed == TESTING_PRINT) {
        ee(`TEST blocked NN :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
    }
    return MOVE_BLOCKED;
}

function nnFall(local_data, mess_1) {
    let { run_or_test, print_allowed, prev_tilt_up, new_tilt_up } = local_data;
    if (print_allowed == TESTING_PRINT) {
        ee(`TEST airborne NN :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
    }
    return MOVE_FALLING;
}

function nnAirborne(run_or_test, print_allowed) {
    const local_data = { run_or_test, print_allowed, prev_tilt_up: NN_AIRBORNE, new_tilt_up: NN_AIRBORNE };
    return nnFall(local_data, NN_AIRBORNE);
}

function nnHitSsWall(wall_squares, wall_columns, new_index) {
    let current_xz_index = stripYindex(new_index);
    let cur_xz_wall_column = wall_columns.get(current_xz_index);
    if (cur_xz_wall_column) {
        let possible_wall = wall_squares.get(new_index);
        if (possible_wall) {
            return true;
        }
    }
    return false;
}

function nnTileData(walkway_tiles, prev_index, new_index) {
    let current_walkway_tile = walkway_tiles.get(new_index);
    const { tilt_up: new_tilt_up, low_y: new_low_y, high_y: new_high_y } = current_walkway_tile;
    let prev_tilt_up, prev_low_y, prev_high_y;
    let prev_walkway_tile = walkway_tiles.get(prev_index);
    if (prev_walkway_tile) {
        prev_tilt_up = prev_walkway_tile.tilt_up;
        prev_low_y = prev_walkway_tile.low_y;
        prev_high_y = prev_walkway_tile.high_y;
    } else {
        prev_tilt_up = new_tilt_up;
        prev_low_y = new_low_y;
        prev_high_y = new_high_y;
    }
    const low_to_low = prev_low_y == new_low_y;
    const high_to_high = prev_high_y == new_high_y;
    const lows_and_highs = low_to_low && high_to_high;
    const high_to_low = prev_high_y == new_low_y;
    const low_to_high = prev_low_y == new_high_y;

    const prev_new_data = { prev_tilt_up, prev_low_y, prev_high_y, new_tilt_up, new_low_y, new_high_y };
    const data = { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high };
    return { prev_new_data, data };
}

function moveToNn(current_data) {
    const { run_or_test, print_allowed, walkway_tiles, walkway_columns, wall_squares, wall_columns, prev_index, new_index } = current_data;
    if (nnHitSsWall(wall_squares, wall_columns, new_index)) {
        return nnBlock(run_or_test, print_allowed, prev_index, new_index, NN_14_BLOCKED);
    }
    if (nnInAir(walkway_columns, new_index)) {
        return nnAirborne(run_or_test, print_allowed);
    }

    const { prev_new_data, data } = nnTileData(walkway_tiles, prev_index, new_index);
    const { prev_tilt_up, new_tilt_up } = prev_new_data;

    const { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high } = data;
    const local_data = { run_or_test, print_allowed, prev_tilt_up, new_tilt_up };
    if (nnCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return nnAllow(local_data, NN_1_UP_UP_CLOCK); //      ⭮
    } else if (nnCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return nnAllow(local_data, NN_2_UP_UP_COUNTER); //      ⭯
    } else if (nnCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return nnAllow(local_data, NN_3_DOWN_DOWN_CLOCK); //  ⭮
    } else if (nnCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return nnAllow(local_data, NN_4_DOWN_DOWN_COUNTER); //  ⭯
    } else if (nnFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return nnAllow(local_data, NN_5_FLAT__FLAT); // - -
    } else if (nnFlatToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return nnAllow(local_data, NN_6_FLAT__UP); //   _⭜
    } else if (nnUpToFlat(prev_tilt_up, new_tilt_up, high_to_high)) {
        return nnAllow(local_data, NN_7_UP__FLAT); //   ↗¯¯
    } else if (nnDownToFlat(prev_tilt_up, new_tilt_up, low_to_high)) {
        return nnAllow(local_data, NN_8_DOWN__FLAT); // ↘__
    } else if (nnFlatToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return nnAllow(local_data, NN_9_FLAT__DOWN); // ¯⭝
    } else if (nnUpToUp(prev_tilt_up, new_tilt_up, high_to_low)) {
        return nnAllow(local_data, NN_10_UP__UP); //     ↗↗
    } else if (nnDownToDown(prev_tilt_up, new_tilt_up, low_to_high)) {
        return nnAllow(local_data, NN_11_DOWN__DOWN); // ↘↘
    } else if (nnUpToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return nnAllow(local_data, NN_12_UP__DOWN); //  ↗↘
    } else if (nnDownToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return nnAllow(local_data, NN_13_DOWN__UP); //  ↘↗
    } else if (prev_index == new_index) {
        return MOVE_SAME_TILE;
    }
    return nnAllow(local_data, NN_14_BLOCKED);
}

function nnFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_to_NONE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NONE;
    if (NONE_to_NONE && low_to_low) {
        return true;
    }
    return false;
}

/*  curve_up__curve_up.png   like a flower */
function nnCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SW_to_NW = prev_tilt_up == TILT_SW && new_tilt_up == TILT_NW;
    if (SW_to_NW && lows_and_highs) {
        return true;
    }
    return false;
}

function nnCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SE_to_NE = prev_tilt_up == TILT_SE && new_tilt_up == TILT_NE;
    if (SE_to_NE && lows_and_highs) {
        return true;
    }
    return false;
}

/*  curve_down__curve_down.png  like a cap */
function nnCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NE_to_SE = prev_tilt_up == TILT_NE && new_tilt_up == TILT_SE;
    if (NE_to_SE && lows_and_highs) {
        return true;
    }
    return false;
}

function nnCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NW_to_SW = prev_tilt_up == TILT_NW && new_tilt_up == TILT_SW;
    if (NW_to_SW && lows_and_highs) {
        return true;
    }
    return false;
}

function nnFlatToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_to_NN = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NN;
    if (NONE_to_NN && low_to_low) {
        return true;
    }
    return false;
}

function nnUpToFlat(prev_tilt_up, new_tilt_up, high_to_high) {
    const NN_to_NONE = prev_tilt_up == TILT_NN && new_tilt_up == TILT_NONE;
    if (NN_to_NONE && high_to_high) {
        return true;
    }
    return false;
}

function nnDownToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const SS_to_NONE = prev_tilt_up == TILT_SS && new_tilt_up == TILT_NONE;
    if (SS_to_NONE && low_to_low) {
        return true;
    }
    return false;
}

function nnFlatToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const NONE_to_SS = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_SS;
    if (NONE_to_SS && high_to_high) {
        return true;
    }
    return false;
}

function nnUpToUp(prev_tilt_up, new_tilt_up, high_to_low) {
    const NN_to_NN = prev_tilt_up == TILT_NN && new_tilt_up == TILT_NN;
    if (NN_to_NN && high_to_low) {
        return true;
    }
    return false;
}

function nnDownToDown(prev_tilt_up, new_tilt_up, low_to_high) {
    const SS_to_SS = prev_tilt_up == TILT_SS && new_tilt_up == TILT_SS;
    if (SS_to_SS && low_to_high) {
        return true;
    }
    return false;
}

function nnUpToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const NN_to_SS = prev_tilt_up == TILT_NN && new_tilt_up == TILT_SS;
    if (NN_to_SS && high_to_high) {
        return true;
    }
    return false;
}

function nnDownToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const SS_to_NN = prev_tilt_up == TILT_SS && new_tilt_up == TILT_NN;
    if (SS_to_NN && low_to_low) {
        return true;
    }
    return false;
}

export { moveToNn };
