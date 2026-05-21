import { ee, tt, EE, TT } from "../../console-short.js";

import {
    MOVE_FALLING,
    MOVE_NEW_TILE,
    MOVE_SAME_TILE,
    MOVE_BLOCKED,
    TESTING_PRINT,
    WALL_SE,
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
    NW_AIRBORNE,
    NW_1_UP_UP_CLOCK,
    NW_2_UP_UP_COUNTER,
    NW_3_DOWN_DOWN_CLOCK,
    NW_4_DOWN_DOWN_COUNTER,
    NW_5_FLAT__FLAT,
    NW_6_FLAT__UP,
    NW_7_UP__FLAT,
    NW_8_DOWN__FLAT,
    NW_9_FLAT__DOWN,
    NW_10_UP__UP,
    NW_11_DOWN__DOWN,
    NW_12_UP__DOWN,
    NW_13_DOWN__UP,
    NW_14_BLOCKED
} from "./nw-constants.js";

function nwAllow(local_data, mess_1) {
    let { run_or_test, print_allowed, prev_tilt_up, new_tilt_up } = local_data;
    if (print_allowed == TESTING_PRINT) {
        ee(`TEST allowed NW :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
    }
    return MOVE_NEW_TILE;
}

function nwBlock(local_data, mess_1) {
    let { run_or_test, print_allowed, prev_tilt_up, new_tilt_up } = local_data;
    if (print_allowed == TESTING_PRINT) {
        ee(`TEST blocked NW :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
    }
    return MOVE_BLOCKED;
}

function nwFall(local_data, mess_1) {
    let { run_or_test, print_allowed, prev_tilt_up, new_tilt_up } = local_data;
    if (print_allowed == TESTING_PRINT) {
        ee(`TEST airborne NW :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
    }
    return MOVE_FALLING;
}

function nwAirborne(run_or_test, print_allowed) {
    const local_data = { run_or_test, print_allowed, prev_tilt_up: NW_AIRBORNE, new_tilt_up: NW_AIRBORNE };
    return nwFall(local_data, NW_AIRBORNE);
}

function nwInAir(walkway_columns, new_index) {
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

function nwHitSsWall(wall_squares, wall_columns, new_index) {
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

function nwTileData(walkway_tiles, prev_index, new_index) {
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

function moveToNw(current_data) {
    const { run_or_test, print_allowed, walkway_tiles, walkway_columns, wall_squares, wall_columns, prev_index, new_index } = current_data;

    if (nwHitSsWall(wall_squares, wall_columns, new_index)) {
        return nwBlock(run_or_test, print_allowed, prev_index, new_index, NW_14_BLOCKED);
    }
    if (nwInAir(walkway_columns, new_index)) {
        return nwAirborne(run_or_test, print_allowed);
    }
    const { prev_new_data, data } = nwTileData(walkway_tiles, prev_index, new_index);
    const { prev_tilt_up, new_tilt_up } = prev_new_data;
    const { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high } = data;
    const local_data = { run_or_test, print_allowed, prev_tilt_up, new_tilt_up };
    if (nwCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return nwAllow(local_data, NW_1_UP_UP_CLOCK); //      ⭮
    } else if (nwCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return nwAllow(local_data, NW_2_UP_UP_COUNTER); //      ⭯
    } else if (nwCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return nwAllow(local_data, NW_3_DOWN_DOWN_CLOCK); //  ⭮
    } else if (nwCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return nwAllow(local_data, NW_4_DOWN_DOWN_COUNTER); //  ⭯
    } else if (nwFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return nwAllow(local_data, NW_5_FLAT__FLAT); // - -
    } else if (nwFlatToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return nwAllow(local_data, NW_6_FLAT__UP); //   _⭜
    } else if (nwUpToFlat(prev_tilt_up, new_tilt_up, high_to_high)) {
        return nwAllow(local_data, NW_7_UP__FLAT); //   ↗¯¯
    } else if (nwDownToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return nwAllow(local_data, NW_8_DOWN__FLAT); // ↘__
    } else if (nwFlatToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return nwAllow(local_data, NW_9_FLAT__DOWN); // ¯⭝
    } else if (nwUpToUp(prev_tilt_up, new_tilt_up, high_to_low)) {
        return nwAllow(local_data, NW_10_UP__UP); //     ↗↗
    } else if (nwDownToDown(prev_tilt_up, new_tilt_up, low_to_high)) {
        return nwAllow(local_data, NW_11_DOWN__DOWN); // ↘↘
    } else if (nwUpToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return nwAllow(local_data, NW_12_UP__DOWN); //  ↗↘
    } else if (nwDownToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return nwAllow(local_data, NW_13_DOWN__UP); //  ↘↗
    } else if (prev_index == new_index) {
        return MOVE_SAME_TILE;
    }
    return nwAllow(local_data, NW_13_DOWN__UP); //  ↘↗
}

/*  curve_up__curve_up.png   like a flower */
function nwCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SS_to_SW = prev_tilt_up == TILT_SS && new_tilt_up == TILT_SW;
    if (SS_to_SW && lows_and_highs) {
        ee("FLOWER CLOCK nw");
        return true;
    }
    return false;
}

function nwCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NE_to_NN = prev_tilt_up == TILT_NE && new_tilt_up == TILT_NN;
    if (NE_to_NN && lows_and_highs) {
        ee("FLOWER COUNT nw");
        return true;
    }
    return false;
}

/*  curve_down__curve_down.png  like a cap */
function nwCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NN_to_NE = prev_tilt_up == TILT_NN && new_tilt_up == TILT_NE;
    if (NN_to_NE && lows_and_highs) {
        return true;
    }
    return false;
}

function nwCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SW_to_SS = prev_tilt_up == TILT_SW && new_tilt_up == TILT_SS;
    if (SW_to_SS && lows_and_highs) {
        ee("hat COUNT nw");
        return true;
    }
    return false;
}

function nwFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_to_NONE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NONE;
    if (NONE_to_NONE && low_to_low) {
        return true;
    }
    return false;
}

function nwFlatToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_to_NW = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NW;
    if (NONE_to_NW && low_to_low) {
        return true;
    }
    return false;
}

function nwUpToFlat(prev_tilt_up, new_tilt_up, high_to_high) {
    const NW_to_NONE = prev_tilt_up == TILT_NW && new_tilt_up == TILT_NONE;
    if (NW_to_NONE && high_to_high) {
        return true;
    }
    return false;
}

function nwDownToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const SE_to_NONE = prev_tilt_up == TILT_SE && new_tilt_up == TILT_NONE;
    if (SE_to_NONE && low_to_low) {
        return true;
    }
    return false;
}

function nwFlatToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const NONE_to_SE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_SE;
    if (NONE_to_SE && high_to_high) {
        return true;
    }
    return false;
}

function nwUpToUp(prev_tilt_up, new_tilt_up, high_to_low) {
    const NW_to_NW = prev_tilt_up == TILT_NW && new_tilt_up == TILT_NW;
    if (NW_to_NW && high_to_low) {
        return true;
    }
    return false;
}

function nwDownToDown(prev_tilt_up, new_tilt_up, low_to_high) {
    const SE_to_SE = prev_tilt_up == TILT_SE && new_tilt_up == TILT_SE;
    if (SE_to_SE && low_to_high) {
        return true;
    }
    return false;
}

function nwUpToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const NW_to_SE = prev_tilt_up == TILT_NW && new_tilt_up == TILT_SE;
    if (NW_to_SE && high_to_high) {
        return true;
    }
    return false;
}

function nwDownToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const SE_to_NW = prev_tilt_up == TILT_SE && new_tilt_up == TILT_NW;
    if (SE_to_NW && low_to_low) {
        return true;
    }
    return false;
}

export { moveToNw };
