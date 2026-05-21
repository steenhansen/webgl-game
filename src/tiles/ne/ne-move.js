import { ee, tt, EE, TT } from "../../console-short.js";

import {
    MOVE_FALLING,
    MOVE_NEW_TILE,
    MOVE_SAME_TILE,
    MOVE_BLOCKED,
    TESTING_PRINT,
    WALL_SW,
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
    NE_AIRBORNE,
    NE_1_UP_UP_CLOCK,
    NE_2_UP_UP_COUNTER,
    NE_3_DOWN_DOWN_CLOCK,
    NE_4_DOWN_DOWN_COUNTER,
    NE_5_FLAT__FLAT,
    NE_6_FLAT__UP,
    NE_7_UP__FLAT,
    NE_8_DOWN__FLAT,
    NE_9_FLAT__DOWN,
    NE_10_UP__UP,
    NE_11_DOWN__DOWN,
    NE_12_UP__DOWN,
    NE_13_DOWN__UP,
    NE_14_BLOCKED
} from "./ne-constants.js";

function neAllow(local_data, mess_1) {
    let { run_or_test, print_allowed, prev_tilt_up, new_tilt_up } = local_data;
    if (print_allowed == TESTING_PRINT) {
        ee(`TEST allowed NE :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
    }
    return MOVE_NEW_TILE;
}

function neBlock(local_data, mess_1) {
    let { run_or_test, print_allowed, prev_tilt_up, new_tilt_up } = local_data;
    if (print_allowed == TESTING_PRINT) {
        ee(`TEST blocked NE :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
    }
    return MOVE_BLOCKED;
}

function neFall(local_data, mess_1) {
    let { run_or_test, print_allowed, prev_tilt_up, new_tilt_up } = local_data;
    if (print_allowed == TESTING_PRINT) {
        ee(`TEST airborne NE :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
    }
    return MOVE_FALLING;
}

function neAirborne(run_or_test, print_allowed) {
    const local_data = { run_or_test, print_allowed, prev_tilt_up: NE_AIRBORNE, new_tilt_up: NE_AIRBORNE };
    return neFall(local_data, NE_AIRBORNE);
}

function neInAir(walkway_columns, new_index) {
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

function neHitSsWall(wall_squares, wall_columns, new_index) {
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

function neTileData(walkway_tiles, prev_index, new_index) {
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

function moveToNe(current_data) {
    const { run_or_test, print_allowed, walkway_tiles, walkway_columns, wall_squares, wall_columns, prev_index, new_index } = current_data;

    if (neHitSsWall(wall_squares, wall_columns, new_index)) {
        return neBlock(run_or_test, print_allowed, prev_index, new_index, NE_14_BLOCKED);
    }
    if (neInAir(walkway_columns, new_index)) {
        return neAirborne(run_or_test, print_allowed);
    }
    const { prev_new_data, data } = neTileData(walkway_tiles, prev_index, new_index);
    const { prev_tilt_up, new_tilt_up } = prev_new_data;
    const { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high } = data;
    const local_data = { run_or_test, print_allowed, prev_tilt_up, new_tilt_up };

    if (neCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return neAllow(local_data, NE_1_UP_UP_CLOCK); //      ⭮
    } else if (neCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return neAllow(local_data, NE_2_UP_UP_COUNTER); //      ⭯
    } else if (neCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return neAllow(local_data, NE_3_DOWN_DOWN_CLOCK); //  ⭮
    } else if (neCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return neAllow(local_data, NE_4_DOWN_DOWN_COUNTER); //  ⭯
    } else if (neFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return neAllow(local_data, NE_5_FLAT__FLAT); // - -
    } else if (neFlatToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return neAllow(local_data, NE_6_FLAT__UP); //   _⭜
    } else if (neUpToFlat(prev_tilt_up, new_tilt_up, high_to_high)) {
        return neAllow(local_data, NE_7_UP__FLAT); //   ↗¯¯
    } else if (neDownToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return neAllow(local_data, NE_8_DOWN__FLAT); // ↘__
    } else if (neFlatToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return neAllow(local_data, NE_9_FLAT__DOWN); // ¯⭝
    } else if (neUpToUp(prev_tilt_up, new_tilt_up, high_to_low)) {
        return neAllow(local_data, NE_10_UP__UP); //     ↗↗
    } else if (neDownToDown(prev_tilt_up, new_tilt_up, low_to_high)) {
        return neAllow(local_data, NE_11_DOWN__DOWN); // ↘↘
    } else if (neUpToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return neAllow(local_data, NE_12_UP__DOWN); //  ↗↘
    } else if (neDownToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return neAllow(local_data, NE_13_DOWN__UP); //  ↘↗
    } else if (prev_index == new_index) {
        return MOVE_SAME_TILE;
    }
    return neAllow(local_data, NE_13_DOWN__UP); //  ↘↗
}

/*  curve_up__curve_up.png   like a flower */
function neCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NW_to_NN = prev_tilt_up == TILT_NW && new_tilt_up == TILT_NN;
    if (NW_to_NN && lows_and_highs) {
        ee("FLOWER CLOCK ne");
        return true;
    }
    return false;
}

function neCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SS_to_SE = prev_tilt_up == TILT_SS && new_tilt_up == TILT_SE;
    if (SS_to_SE && lows_and_highs) {
        ee("FLOWER COUNT ne");
        return true;
    }
    return false;
}

/*  curve_down__curve_down.png  like a cap */
function neCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SE_to_SS = prev_tilt_up == TILT_SE && new_tilt_up == TILT_SS;
    if (SE_to_SS && lows_and_highs) {
        ee("hat CLOCK ne");
        return true;
    }
    return false;
}

function neCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NN_to_NW = prev_tilt_up == TILT_NN && new_tilt_up == TILT_NW;
    if (NN_to_NW && lows_and_highs) {
        ee("hat COUNT ne");
        return true;
    }
    return false;
}

function neFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_to_NONE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NONE;
    if (NONE_to_NONE && low_to_low) {
        return true;
    }
    return false;
}

function neFlatToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_to_NE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NE;
    if (NONE_to_NE && low_to_low) {
        return true;
    }
    return false;
}

function neUpToFlat(prev_tilt_up, new_tilt_up, high_to_high) {
    const NE_to_NONE = prev_tilt_up == TILT_NE && new_tilt_up == TILT_NONE;
    if (NE_to_NONE && high_to_high) {
        return true;
    }
    return false;
}

function neDownToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const SW_to_NONE = prev_tilt_up == TILT_SW && new_tilt_up == TILT_NONE;
    if (SW_to_NONE && low_to_low) {
        return true;
    }
    return false;
}

function neFlatToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const NONE_to_SW = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_SW;
    if (NONE_to_SW && high_to_high) {
        return true;
    }
    return false;
}

function neUpToUp(prev_tilt_up, new_tilt_up, high_to_low) {
    const NE_to_NE = prev_tilt_up == TILT_NE && new_tilt_up == TILT_NE;
    if (NE_to_NE && high_to_low) {
        return true;
    }
    return false;
}

function neDownToDown(prev_tilt_up, new_tilt_up, low_to_high) {
    const SW_to_SW = prev_tilt_up == TILT_SW && new_tilt_up == TILT_SW;
    if (SW_to_SW && low_to_high) {
        return true;
    }
    return false;
}

function neUpToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const NE_to_SW = prev_tilt_up == TILT_NE && new_tilt_up == TILT_SW;
    if (NE_to_SW && high_to_high) {
        return true;
    }
    return false;
}

function neDownToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const SW_to_NE = prev_tilt_up == TILT_SW && new_tilt_up == TILT_NE;
    if (SW_to_NE && low_to_low) {
        return true;
    }
    return false;
}

export { moveToNe };
