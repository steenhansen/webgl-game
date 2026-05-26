import { ee, tt, EE, TT } from "../../misc/console-short.js";

import {
    MOVE_FALLING,
    MOVE_NEW_TILE,
    MOVE_SAME_TILE,
    MOVE_BLOCKED,
    TESTING_PRINT,
    WALL_NE,
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
    SW_AIRBORNE,
    SW_1_UP_UP_CLOCK,
    SW_2_UP_UP_COUNTER,
    SW_3_DOWN_DOWN_CLOCK,
    SW_4_DOWN_DOWN_COUNTER,
    SW_5_FLAT__FLAT,
    SW_6_FLAT__UP,
    SW_7_UP__FLAT,
    SW_8_DOWN__FLAT,
    SW_9_FLAT__DOWN,
    SW_10_UP__UP,
    SW_10_DOWN__DOWN,
    SW_11_UP__DOWN,
    SW_13_DOWN__UP,
    SW_14_BLOCKED
} from "./sw-constants.js";

function swAllow(local_data, mess_1) {
    let { run_or_test, print_allowed, prev_tilt_up, new_tilt_up } = local_data;
    if (print_allowed == TESTING_PRINT) {
        ee(`TEST allowed SW :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
    }
    return MOVE_NEW_TILE;
}

function swBlock(local_data, mess_1) {
    let { run_or_test, print_allowed, prev_tilt_up, new_tilt_up } = local_data;
    if (print_allowed == TESTING_PRINT) {
        ee(`TEST blocked SW :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
    }
    return MOVE_BLOCKED;
}

function swFall(local_data, mess_1) {
    let { run_or_test, print_allowed, prev_tilt_up, new_tilt_up } = local_data;
    if (print_allowed == TESTING_PRINT) {
        ee(`TEST airborne SW :: ${run_or_test} :: ${mess_1} :: ${prev_tilt_up}, ${new_tilt_up}`);
    }
    return MOVE_FALLING;
}

function swAirborne(run_or_test, print_allowed) {
    const local_data = { run_or_test, print_allowed, prev_tilt_up: SW_AIRBORNE, new_tilt_up: SW_AIRBORNE };
    return swFall(local_data, SW_AIRBORNE);
}

function swInAir(walkway_columns, new_index) {
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

function swHitSwWall(wall_squares, wall_columns, new_index) {
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

function swTileData(walkway_tiles, prev_index, new_index) {
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

function moveToSw(current_data) {
    const { run_or_test, print_allowed, walkway_tiles, walkway_columns, wall_squares, wall_columns, prev_index, new_index } = current_data;

    if (swHitSwWall(wall_squares, wall_columns, new_index)) {
        return swBlock(run_or_test, print_allowed, prev_index, new_index, SW_14_BLOCKED);
    }
    if (swInAir(walkway_columns, new_index)) {
        return swAirborne(run_or_test, print_allowed);
    }
    const { prev_new_data, data } = swTileData(walkway_tiles, prev_index, new_index);

    const { prev_tilt_up, new_tilt_up } = prev_new_data;
    const { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high } = data;
    const local_data = { run_or_test, print_allowed, prev_tilt_up, new_tilt_up };

    if (prev_index == new_index) {
        return MOVE_SAME_TILE;
    } else if (swCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return swAllow(local_data, SW_1_UP_UP_CLOCK); //      ⭮
    } else if (swCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return swAllow(local_data, SW_2_UP_UP_COUNTER); //      ⭯
    } else if (swCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return swAllow(local_data, SW_3_DOWN_DOWN_CLOCK); //  ⭮
    } else if (swCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return swAllow(local_data, SW_4_DOWN_DOWN_COUNTER); //  ⭯
    } else if (swFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return swAllow(local_data, SW_5_FLAT__FLAT); // - -
    } else if (swFlatToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return swAllow(local_data, SW_6_FLAT__UP); //   _⭜
    } else if (swUpToFlat(prev_tilt_up, new_tilt_up, high_to_high)) {
        return swAllow(local_data, SW_7_UP__FLAT); //   ↗¯¯
    } else if (swDownToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return swAllow(local_data, SW_8_DOWN__FLAT); // ↘__
    } else if (swFlatToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return swAllow(local_data, SW_9_FLAT__DOWN); // ¯⭝
    } else if (swUpToUp(prev_tilt_up, new_tilt_up, high_to_low)) {
        return swAllow(local_data, SW_10_UP__UP); //     ↗↗
    } else if (swDownToDown(prev_tilt_up, new_tilt_up, low_to_high)) {
        return swAllow(local_data, SW_10_DOWN__DOWN); // ↘↘
    } else if (swUpToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return swAllow(local_data, SW_11_UP__DOWN); //  ↗↘
    } else if (swDownToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return swAllow(local_data, SW_13_DOWN__UP); //  ↘↗
    } else if (prev_index == new_index) {
        return MOVE_SAME_TILE;
    }
    return swAllow(local_data, SW_13_DOWN__UP); //  ↘↗
}

/*  curve_up__curve_up.png   like a flower */
function swCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SE_to_SS = prev_tilt_up == TILT_SE && new_tilt_up == TILT_SS;
    if (SE_to_SS && lows_and_highs) {
        ee("FLOWER CLOCK sw");
        return true;
    }
    return false;
}

function swCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NN_to_NW = prev_tilt_up == TILT_NN && new_tilt_up == TILT_NW;
    if (NN_to_NW && lows_and_highs) {
        ee("FLOWER COUNT sw");
        return true;
    }
    return false;
}

/*  curve_down__curve_down.png  like a cap */
function swCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NW_to_NN = prev_tilt_up == TILT_NW && new_tilt_up == TILT_NN;
    if (NW_to_NN && lows_and_highs) {
        ee("hat CLOCK sw");
        return true;
    }
    return false;
}

function swCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SS_to_SE = prev_tilt_up == TILT_SS && new_tilt_up == TILT_SE;
    if (SS_to_SE && lows_and_highs) {
        ee("hat COUNT sw");
        return true;
    }
    return false;
}

function swFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_2_NONE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NONE;
    if (NONE_2_NONE && low_to_low) {
        return true;
    }
    return false;
}

function swFlatToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_2_SW = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_SW;
    if (NONE_2_SW && low_to_low) {
        return true;
    }
    return false;
}

function swUpToFlat(prev_tilt_up, new_tilt_up, high_to_high) {
    const SW_2_NONE = prev_tilt_up == TILT_SW && new_tilt_up == TILT_NONE;
    if (SW_2_NONE && high_to_high) {
        return true;
    }
    return false;
}

function swDownToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const NE_2_NONE = prev_tilt_up == TILT_NE && new_tilt_up == TILT_NONE;
    if (NE_2_NONE && low_to_low) {
        return true;
    }
    return false;
}

function swFlatToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const NONE_2_NE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NE;
    if (NONE_2_NE && high_to_high) {
        return true;
    }
    return false;
}

function swUpToUp(prev_tilt_up, new_tilt_up, high_to_low) {
    const SW_2_SW = prev_tilt_up == TILT_SW && new_tilt_up == TILT_SW;
    if (SW_2_SW && high_to_low) {
        return true;
    }
    return false;
}

function swDownToDown(prev_tilt_up, new_tilt_up, low_to_high) {
    const NE_2_NE = prev_tilt_up == TILT_NE && new_tilt_up == TILT_NE;
    if (NE_2_NE && low_to_high) {
        return true;
    }
    return false;
}

function swUpToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const SW_2_NE = prev_tilt_up == TILT_SW && new_tilt_up == TILT_NE;
    if (SW_2_NE && high_to_high) {
        return true;
    }
    return false;
}

function swDownToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const NE_2_SW = prev_tilt_up == TILT_NE && new_tilt_up == TILT_SW;
    if (NE_2_SW && low_to_low) {
        return true;
    }
    return false;
}

export { moveToSw };
