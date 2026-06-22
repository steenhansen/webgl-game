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
    FENCE_NN,
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

function moveToSs(the_objects, prev_hex, this_hex, is_a_trampoline) {
    let { o_walkway_tiles, o_walkway_columns, o_fence_walls, o_fence_columns } = the_objects;
    const { prev_new_data, data } = tileData(o_walkway_tiles, prev_hex, this_hex); // we assume there is a tile

    const { prev_tilt_up, new_tilt_up } = prev_new_data;
    const local_data = { prev_tilt_up, new_tilt_up, prev_hex, this_hex };
    if (hitFence(o_fence_walls, o_fence_columns, prev_hex, this_hex)) {
        return moveBlock(local_data, SS_14_BLOCKED);
    }
    if (offWalkway(o_walkway_columns, this_hex)) {
        if (is_a_trampoline) {
            return moveOntoTrampoline(local_data, SS_AIRBORNE);
        } else {
            return moveIntoAir(local_data, SS_AIRBORNE);
        }
    }

    const { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high } = data;

    if (prev_hex == this_hex) {
        return MV_TILE_SAME;
    } else if (ssCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, SS_1_UP_UP_CLOCK); //      ⭮
    } else if (ssCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, SS_2_UP_UP_COUNTER); //      ⭯
    } else if (ssCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, SS_3_DOWN_DOWN_CLOCK); //  ⭮
    } else if (ssCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, SS_4_DOWN_DOWN_COUNTER); //  ⭯
    } else if (ssFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, SS_5_FLAT__FLAT); // - -
    } else if (ssFlatToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, SS_6_FLAT__UP); //   _⭜
    } else if (ssUpToFlat(prev_tilt_up, new_tilt_up, high_to_high)) {
        return moveAllow(local_data, SS_7_UP__FLAT); //   ↗¯¯
    } else if (ssDownToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, SS_8_DOWN__FLAT); // ↘__
    } else if (ssFlatToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return moveAllow(local_data, SS_9_FLAT__DOWN); // ¯⭝
    } else if (ssUpToUp(prev_tilt_up, new_tilt_up, high_to_low)) {
        return moveAllow(local_data, SS_10_UP__UP); //     ↗↗
    } else if (ssDownToDown(prev_tilt_up, new_tilt_up, low_to_high)) {
        return moveAllow(local_data, SS_11_DOWN__DOWN); // ↘↘
    } else if (ssUpToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return moveAllow(local_data, SS_12_UP__DOWN); //  ↗↘
    } else if (ssDownToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, SS_13_DOWN__UP); //  ↘↗
    }

    if (prev_new_data.new_high_y <= prev_new_data.prev_low_y) {
        return moveDescendOneStep(local_data, SS_AIRBORNE);
    }
    return moveBlock(local_data, SS_14_BLOCKED); // ¯¯↗
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
