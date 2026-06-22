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
    FENCE_NW,
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

function moveToSe(the_objects, prev_hex, this_hex, is_a_trampoline) {
    let { o_walkway_tiles, o_walkway_columns, o_fence_walls, o_fence_columns } = the_objects;
    const { prev_new_data, data } = tileData(o_walkway_tiles, prev_hex, this_hex);
    const { prev_tilt_up, new_tilt_up } = prev_new_data;
    const local_data = { prev_tilt_up, new_tilt_up, prev_hex, this_hex };
    if (hitFence(o_fence_walls, o_fence_columns, prev_hex, this_hex)) {
        return moveBlock(local_data, SE_14_BLOCKED);
    }
    if (offWalkway(o_walkway_columns, this_hex)) {
        if (is_a_trampoline) {
            return moveOntoTrampoline(local_data, SE_AIRBORNE);
        } else {
            return moveIntoAir(local_data, SE_AIRBORNE);
        }
    }
    const { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high } = data;
    if (seCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, SE_1_UP_UP_CLOCK); //      ⭮
    } else if (seCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, SE_2_UP_UP_COUNTER); //      ⭯
    } else if (seCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, SE_3_DOWN_DOWN_CLOCK); //  ⭮
    } else if (seCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, SE_4_DOWN_DOWN_COUNTER); //  ⭯
    } else if (seFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, SE_5_FLAT__FLAT); // - -
    } else if (seFlatToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, SE_6_FLAT__UP); //   _⭜
    } else if (seUpToFlat(prev_tilt_up, new_tilt_up, high_to_high)) {
        return moveAllow(local_data, SE_7_UP__FLAT); //   ↗¯¯
    } else if (seDownToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, SE_8_DOWN__FLAT); // ↘__
    } else if (seFlatToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return moveAllow(local_data, SE_9_FLAT__DOWN); // ¯⭝
    } else if (seUpToUp(prev_tilt_up, new_tilt_up, high_to_low)) {
        return moveAllow(local_data, SE_10_UP__UP); //     ↗↗
    } else if (seDownToDown(prev_tilt_up, new_tilt_up, low_to_high)) {
        return moveAllow(local_data, SE_11_DOWN__DOWN); // ↘↘
    } else if (seUpToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return moveAllow(local_data, SE_12_UP__DOWN); //  ↗↘
    } else if (seDownToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, SE_13_DOWN__UP); //  ↘↗
    } else if (prev_hex == this_hex) {
        return MV_TILE_SAME;
    }
    if (prev_new_data.new_high_y <= prev_new_data.prev_low_y) {
        return moveDescendOneStep(local_data, SE_AIRBORNE);
    }
    return moveBlock(local_data, SE_14_BLOCKED); //  ↘↗
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
