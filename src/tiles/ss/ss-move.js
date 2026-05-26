import { ee, tt, EE, TT } from "../../misc/console-short.js";

import {
    MOVE_FALLING,
    MOVE_NEW_TILE,
    MOVE_SAME_TILE,
    MOVE_BLOCKED,
    TESTING_PRINT,
    WALL_NN,
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
    SS_AIRBORNE,
    SS_1_UP_UP_CLOCK,
    SS_2_UP_UP_COUNTER,
    SS_3_DOWN_DOWN_CLOCK,
    SS_4_DOWN_DOWN_COUNTER,
    SS_5_FLAT__FLAT,
    SS_6_FLAT__UP,
    SS_7_UP__FLAT,
    SS_8_DOWN__FLAT,
    SS_9_FLAT__DOWN,
    SS_10_UP__UP,
    SS_11_DOWN__DOWN,
    SS_12_UP__DOWN,
    SS_13_DOWN__UP,
    SS_14_BLOCKED
} from "./ss-constants.js";

function ssAllow(local_data, mess_1) {
    let { run_or_test, print_allowed, prev_tilt_up, new_tilt_up } = local_data;
    if (print_allowed == TESTING_PRINT) {
        ee(`TEST allowed SS :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
    }
    return MOVE_NEW_TILE;
}

function ssBlock(local_data, mess_1) {
    let { run_or_test, print_allowed, prev_tilt_up, new_tilt_up } = local_data;
    if (print_allowed == TESTING_PRINT) {
        ee(`TEST blocked SS :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
    }
    return MOVE_BLOCKED;
}

function ssFall(local_data, mess_1) {
    let { run_or_test, print_allowed, prev_tilt_up, new_tilt_up } = local_data;
    if (print_allowed == TESTING_PRINT) {
        ee(`TEST airborne SS :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
    }
    return MOVE_FALLING;
}

function ssAirborne(run_or_test, print_allowed) {
    const local_data = { run_or_test, print_allowed, prev_tilt_up: SS_AIRBORNE, new_tilt_up: SS_AIRBORNE };
    return ssFall(local_data, SS_AIRBORNE);
}

function ssInAir(walkway_columns, new_index) {
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

function ssHitSsWall(wall_squares, wall_columns, new_index) {
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

function ssTileData(walkway_tiles, prev_index, new_index) {
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

function moveToSs(current_data) {
    const { run_or_test, print_allowed, walkway_tiles, walkway_columns, wall_squares, wall_columns, prev_index, new_index } = current_data;

    if (ssHitSsWall(wall_squares, wall_columns, new_index)) {
        return ssBlock(run_or_test, print_allowed, prev_index, new_index, SS_14_BLOCKED);
    }
    if (ssInAir(walkway_columns, new_index)) {
        return ssAirborne(run_or_test, print_allowed);
    }
    const { prev_new_data, data } = ssTileData(walkway_tiles, prev_index, new_index);

    const { prev_tilt_up, new_tilt_up } = prev_new_data;
    const { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high } = data;
    const local_data = { run_or_test, print_allowed, prev_tilt_up, new_tilt_up };

    if (prev_index == new_index) {
        return MOVE_SAME_TILE;
    } else if (ssCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return ssAllow(local_data, SS_1_UP_UP_CLOCK); //      ⭮
    } else if (ssCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return ssAllow(local_data, SS_2_UP_UP_COUNTER); //      ⭯
    } else if (ssCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return ssAllow(local_data, SS_3_DOWN_DOWN_CLOCK); //  ⭮
    } else if (ssCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return ssAllow(local_data, SS_4_DOWN_DOWN_COUNTER); //  ⭯
    } else if (ssFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return ssAllow(local_data, SS_5_FLAT__FLAT); // - -
    } else if (ssFlatToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return ssAllow(local_data, SS_6_FLAT__UP); //   _⭜
    } else if (ssUpToFlat(prev_tilt_up, new_tilt_up, high_to_high)) {
        return ssAllow(local_data, SS_7_UP__FLAT); //   ↗¯¯
    } else if (ssDownToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return ssAllow(local_data, SS_8_DOWN__FLAT); // ↘__
    } else if (ssFlatToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return ssAllow(local_data, SS_9_FLAT__DOWN); // ¯⭝
    } else if (ssUpToUp(prev_tilt_up, new_tilt_up, high_to_low)) {
        return ssAllow(local_data, SS_10_UP__UP); //     ↗↗
    } else if (ssDownToDown(prev_tilt_up, new_tilt_up, low_to_high)) {
        return ssAllow(local_data, SS_11_DOWN__DOWN); // ↘↘
    } else if (ssUpToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return ssAllow(local_data, SS_12_UP__DOWN); //  ↗↘
    } else if (ssDownToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return ssAllow(local_data, SS_13_DOWN__UP); //  ↘↗
    } else if (prev_index == new_index) {
        return MOVE_SAME_TILE;
    }
    return ssAllow(local_data, SS_13_DOWN__UP); //  ↘↗
}

/*  curve_up__curve_up.png   like a flower */
function ssCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NE_to_SE = prev_tilt_up == TILT_NE && new_tilt_up == TILT_SE;
    if (NE_to_SE && lows_and_highs) {
        return true;
    }
    return false;
}

function ssCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NW_to_SW = prev_tilt_up == TILT_NW && new_tilt_up == TILT_SW;
    if (NW_to_SW && lows_and_highs) {
        return true;
    }
    return false;
}

/*  curve_down__curve_down.png  like a cap */
function ssCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SW_to_NW = prev_tilt_up == TILT_SW && new_tilt_up == TILT_NW;
    if (SW_to_NW && lows_and_highs) {
        return true;
    }
    return false;
}

function ssCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SE_to_NE = prev_tilt_up == TILT_SE && new_tilt_up == TILT_NE;
    if (SE_to_NE && lows_and_highs) {
        return true;
    }
    return false;
}

function ssFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_2_NONE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NONE;
    if (NONE_2_NONE && low_to_low) {
        return true;
    }
    return false;
}

function ssFlatToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_2_SS = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_SS;
    if (NONE_2_SS && low_to_low) {
        return true;
    }
    return false;
}

function ssUpToFlat(prev_tilt_up, new_tilt_up, high_to_high) {
    const SS_2_NONE = prev_tilt_up == TILT_SS && new_tilt_up == TILT_NONE;
    if (SS_2_NONE && high_to_high) {
        return true;
    }
    return false;
}

function ssDownToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const NN_2_NONE = prev_tilt_up == TILT_NN && new_tilt_up == TILT_NONE;
    if (NN_2_NONE && low_to_low) {
        return true;
    }
    return false;
}

function ssFlatToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const NONE_2_NN = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NN;
    if (NONE_2_NN && high_to_high) {
        return true;
    }
    return false;
}

function ssUpToUp(prev_tilt_up, new_tilt_up, high_to_low) {
    const SS_2_SS = prev_tilt_up == TILT_SS && new_tilt_up == TILT_SS;
    if (SS_2_SS && high_to_low) {
        return true;
    }
    return false;
}

function ssDownToDown(prev_tilt_up, new_tilt_up, low_to_high) {
    const NN_2_NN = prev_tilt_up == TILT_NN && new_tilt_up == TILT_NN;
    if (NN_2_NN && low_to_high) {
        return true;
    }
    return false;
}

function ssUpToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const SS_2_NN = prev_tilt_up == TILT_SS && new_tilt_up == TILT_NN;
    if (SS_2_NN && high_to_high) {
        return true;
    }
    return false;
}

function ssDownToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const NN_2_SS = prev_tilt_up == TILT_NN && new_tilt_up == TILT_SS;
    if (NN_2_SS && low_to_low) {
        return true;
    }
    return false;
}

export { moveToSs };
