import { ee, tt, EE, TT } from "../../misc/console-short.js";

import {
    MOVE_FALLING,
    MOVE_NEW_TILE,
    MOVE_SAME_TILE,
    MOVE_BLOCKED,
    TESTING_PRINT,
    WALL_NW,
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
    SE_AIRBORNE,
    SE_1_UP_UP_CLOCK,
    SE_2_UP_UP_COUNTER,
    SE_3_DOWN_DOWN_CLOCK,
    SE_4_DOWN_DOWN_COUNTER,
    SE_5_FLAT__FLAT,
    SE_6_FLAT__UP,
    SE_7_UP__FLAT,
    SE_8_DOWN__FLAT,
    SE_9_FLAT__DOWN,
    SE_10_UP__UP,
    SE_11_DOWN__DOWN,
    SE_12_UP__DOWN,
    SE_13_DOWN__UP,
    SE_14_BLOCKED
} from "./se-constants.js";

function seAllow(local_data, mess_1) {
    let { run_or_test, print_allowed, prev_tilt_up, new_tilt_up } = local_data;
    if (print_allowed == TESTING_PRINT) {
        ee(`TEST allowed SE :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
    }
    return MOVE_NEW_TILE;
}

function seBlock(local_data, mess_1) {
    let { run_or_test, print_allowed, prev_tilt_up, new_tilt_up } = local_data;
    if (print_allowed == TESTING_PRINT) {
        ee(`TEST blocked SE :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
    }
    return MOVE_BLOCKED;
}

function seFall(local_data, mess_1) {
    let { run_or_test, print_allowed, prev_tilt_up, new_tilt_up } = local_data;
    if (print_allowed == TESTING_PRINT) {
        ee(`TEST airborne SE :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
    }
    return MOVE_FALLING;
}

function seAirborne(run_or_test, print_allowed) {
    const local_data = { run_or_test, print_allowed, prev_tilt_up: SE_AIRBORNE, new_tilt_up: SE_AIRBORNE };
    return seFall(local_data, SE_AIRBORNE);
}

function seInAir(walkway_columns, new_index) {
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

function seHitSeWall(wall_squares, wall_columns, new_index) {
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

function seTileData(walkway_tiles, prev_index, new_index) {
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

function moveToSe(current_data) {
    const { run_or_test, print_allowed, walkway_tiles, walkway_columns, wall_squares, wall_columns, prev_index, new_index } = current_data;

    if (seHitSeWall(wall_squares, wall_columns, new_index)) {
        return seBlock(run_or_test, print_allowed, prev_index, new_index, SE_14_BLOCKED);
    }
    if (seInAir(walkway_columns, new_index)) {
        return seAirborne(run_or_test, print_allowed);
    }
    const { prev_new_data, data } = seTileData(walkway_tiles, prev_index, new_index);

    const { prev_tilt_up, new_tilt_up } = prev_new_data;
    const { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high } = data;
    const local_data = { run_or_test, print_allowed, prev_tilt_up, new_tilt_up };

    if (seCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return seAllow(local_data, SE_1_UP_UP_CLOCK); //      ⭮
    } else if (seCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return seAllow(local_data, SE_2_UP_UP_COUNTER); //      ⭯
    } else if (seCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return seAllow(local_data, SE_3_DOWN_DOWN_CLOCK); //  ⭮
    } else if (seCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return seAllow(local_data, SE_4_DOWN_DOWN_COUNTER); //  ⭯
    } else if (seFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return seAllow(local_data, SE_5_FLAT__FLAT); // - -
    } else if (seFlatToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return seAllow(local_data, SE_6_FLAT__UP); //   _⭜
    } else if (seUpToFlat(prev_tilt_up, new_tilt_up, high_to_high)) {
        return seAllow(local_data, SE_7_UP__FLAT); //   ↗¯¯
    } else if (seDownToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return seAllow(local_data, SE_8_DOWN__FLAT); // ↘__
    } else if (seFlatToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return seAllow(local_data, SE_9_FLAT__DOWN); // ¯⭝
    } else if (seUpToUp(prev_tilt_up, new_tilt_up, high_to_low)) {
        return seAllow(local_data, SE_10_UP__UP); //     ↗↗
    } else if (seDownToDown(prev_tilt_up, new_tilt_up, low_to_high)) {
        return seAllow(local_data, SE_11_DOWN__DOWN); // ↘↘
    } else if (seUpToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return seAllow(local_data, SE_12_UP__DOWN); //  ↗↘
    } else if (seDownToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return seAllow(local_data, SE_13_DOWN__UP); //  ↘↗
    } else if (prev_index == new_index) {
        return MOVE_SAME_TILE;
    }
    return seAllow(local_data, SE_13_DOWN__UP); //  ↘↗
}

/*  curve_up__curve_up.png   like a flower */
function seCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NN_to_NE = prev_tilt_up == TILT_NN && new_tilt_up == TILT_NE;
    if (NN_to_NE && lows_and_highs) {
        return true;
    }
    return false;
}

function seCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SW_to_SS = prev_tilt_up == TILT_SW && new_tilt_up == TILT_SS;
    if (SW_to_SS && lows_and_highs) {
        return true;
    }
    return false;
}

/*  curve_down__curve_down.png  like a cap */
function seCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SS_to_SW = prev_tilt_up == TILT_SS && new_tilt_up == TILT_SW;
    if (SS_to_SW && lows_and_highs) {
        return true;
    }
    return false;
}

function seCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NE_to_NN = prev_tilt_up == TILT_NE && new_tilt_up == TILT_NN;
    if (NE_to_NN && lows_and_highs) {
        return true;
    }
    return false;
}

function seFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_2_NONE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NONE;
    if (NONE_2_NONE && low_to_low) {
        return true;
    }
    return false;
}

function seFlatToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_2_SE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_SE;
    if (NONE_2_SE && low_to_low) {
        return true;
    }
    return false;
}

function seUpToFlat(prev_tilt_up, new_tilt_up, high_to_high) {
    const SE_2_NONE = prev_tilt_up == TILT_SE && new_tilt_up == TILT_NONE;
    if (SE_2_NONE && high_to_high) {
        return true;
    }
    return false;
}

function seDownToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const NW_2_NONE = prev_tilt_up == TILT_NW && new_tilt_up == TILT_NONE;
    if (NW_2_NONE && low_to_low) {
        return true;
    }
    return false;
}

function seFlatToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const NONE_2_NW = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NW;
    if (NONE_2_NW && high_to_high) {
        return true;
    }
    return false;
}

function seUpToUp(prev_tilt_up, new_tilt_up, high_to_low) {
    const SE_2_SE = prev_tilt_up == TILT_SE && new_tilt_up == TILT_SE;
    if (SE_2_SE && high_to_low) {
        return true;
    }
    return false;
}

function seDownToDown(prev_tilt_up, new_tilt_up, low_to_high) {
    const NW_2_NW = prev_tilt_up == TILT_NW && new_tilt_up == TILT_NW;
    if (NW_2_NW && low_to_high) {
        return true;
    }
    return false;
}

function seUpToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const SE_2_NW = prev_tilt_up == TILT_SE && new_tilt_up == TILT_NW;
    if (SE_2_NW && high_to_high) {
        return true;
    }
    return false;
}

function seDownToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const NW_2_SE = prev_tilt_up == TILT_NW && new_tilt_up == TILT_SE;
    if (NW_2_SE && low_to_low) {
        return true;
    }
    return false;
}

export { moveToSe };
