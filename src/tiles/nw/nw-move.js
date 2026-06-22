import { ee, tt, EE, TT } from "../../misc/console-short.js";
import { moveDescendOneStep, moveOntoTrampoline, moveIntoAir, undefTileDebugInfo, moveAllow, moveBlock } from "../ground-tiles.js";
import {
    PRINT_ALLOWED,
    RUN_OR_TEST,
    MV_FALL_JUMP_STRAIGHT,
    MV_TILE_NEW,
    MV_TILE_SAME,
    MV_FENCE_BLOCKED,
    TESTINs_PRINT,
    FENCE_SE,
    TILT_SS,
    TILT_NONE,
    TILT_NN,
    TILT_NE,
    TILT_SE,
    TILT_SW,
    TILT_NW
} from "../../values/the-constants.js";
import { stripYindex, tileData, offWalkway, hitFence } from "../hex-routines.js";

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

function moveToNw(the_objects, prev_hex, this_hex, is_a_trampoline) {
    let { o_walkway_tiles, o_walkway_columns, o_fence_walls, o_fence_columns } = the_objects;
    const { prev_new_data, data } = tileData(o_walkway_tiles, prev_hex, this_hex);

    const { prev_tilt_up, new_tilt_up } = prev_new_data;
    const local_data = { prev_tilt_up, new_tilt_up, prev_hex, this_hex };
    if (hitFence(o_fence_walls, o_fence_columns, prev_hex, this_hex)) {
        return moveBlock(local_data, NW_14_BLOCKED);
    }
    if (offWalkway(o_walkway_columns, this_hex)) {
        if (is_a_trampoline) {
            return moveOntoTrampoline(local_data, NW_AIRBORNE);
        } else {
            return moveIntoAir(local_data, NW_AIRBORNE);
        }
    }

    const { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high } = data;

    if (nwCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, NW_1_UP_UP_CLOCK); //      ⭮
    } else if (nwCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, NW_2_UP_UP_COUNTER); //      ⭯
    } else if (nwCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, NW_3_DOWN_DOWN_CLOCK); //  ⭮
    } else if (nwCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, NW_4_DOWN_DOWN_COUNTER); //  ⭯
    } else if (nwFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, NW_5_FLAT__FLAT); // - -
    } else if (nwFlatToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, NW_6_FLAT__UP); //   _⭜
    } else if (nwUpToFlat(prev_tilt_up, new_tilt_up, high_to_high)) {
        return moveAllow(local_data, NW_7_UP__FLAT); //   ↗¯¯
    } else if (nwDownToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, NW_8_DOWN__FLAT); // ↘__
    } else if (nwFlatToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return moveAllow(local_data, NW_9_FLAT__DOWN); // ¯⭝
    } else if (nwUpToUp(prev_tilt_up, new_tilt_up, high_to_low)) {
        return moveAllow(local_data, NW_10_UP__UP); //     ↗↗
    } else if (nwDownToDown(prev_tilt_up, new_tilt_up, low_to_high)) {
        return moveAllow(local_data, NW_11_DOWN__DOWN); // ↘↘
    } else if (nwUpToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return moveAllow(local_data, NW_12_UP__DOWN); //  ↗↘
    } else if (nwDownToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, NW_13_DOWN__UP); //  ↘↗
    } else if (prev_hex == this_hex) {
        return MV_TILE_SAME;
    }
    if (prev_new_data.new_high_y <= prev_new_data.prev_low_y) {
        return moveDescendOneStep(local_data, NW_AIRBORNE);
    }
    return moveBlock(local_data, NW_14_BLOCKED); //  ↘↗
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
