import { ee, tt, EE, TT } from "../../misc/console-short.js";

import {
    PRINT_ALLOWED,
    RUN_OR_TEST,
    MV_FALL_JUMP_STRAIGHT,
    MV_TILE_NEW,
    MV_TILE_SAME,
    MV_FENCE_BLOCKED,
    TESTINs_PRINT,
    FENCE_NE,
    TILT_SS,
    TILT_NONE,
    TILT_NN,
    TILT_NE,
    TILT_SE,
    TILT_SW,
    TILT_NW
} from "../../values/the-constants.js";
import { stripYindex, tileData, offWalkway, hitFence } from "../hex-routines.js";
import { moveDescendOneStep, moveOntoTrampoline, moveIntoAir, undefTileDebugInfo, moveAllow, moveBlock } from "../ground-tiles.js";
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

function moveToSw(the_objects, prev_hex, this_hex, is_a_trampoline) {
    let { o_walkway_tiles, o_walkway_columns, o_fence_walls, o_fence_columns } = the_objects;
    const { prev_new_data, data } = tileData(o_walkway_tiles, prev_hex, this_hex);
    const { prev_tilt_up, new_tilt_up } = prev_new_data;
    const local_data = { prev_tilt_up, new_tilt_up, prev_hex, this_hex };
    if (hitFence(o_fence_walls, o_fence_columns, prev_hex, this_hex)) {
        const is_blocked = moveBlock(local_data, SW_14_BLOCKED);
        return is_blocked;
    }
    if (offWalkway(o_walkway_columns, this_hex)) {
        if (is_a_trampoline) {
            return moveOntoTrampoline(local_data, SW_AIRBORNE);
        } else {
            return moveIntoAir(local_data, SW_AIRBORNE);
        }
    }
    const { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high } = data;
    if (prev_hex == this_hex) {
        return MV_TILE_SAME;
    } else if (swCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, SW_1_UP_UP_CLOCK); //      ⭮
    } else if (swCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, SW_2_UP_UP_COUNTER); //      ⭯
    } else if (swCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, SW_3_DOWN_DOWN_CLOCK); //  ⭮
    } else if (swCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, SW_4_DOWN_DOWN_COUNTER); //  ⭯
    } else if (swFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, SW_5_FLAT__FLAT); // - -
    } else if (swFlatToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, SW_6_FLAT__UP); //   _⭜
    } else if (swUpToFlat(prev_tilt_up, new_tilt_up, high_to_high)) {
        return moveAllow(local_data, SW_7_UP__FLAT); //   ↗¯¯
    } else if (swDownToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        ///////////
        return moveAllow(local_data, SW_8_DOWN__FLAT); // ↘__
        ////////////
    } else if (swFlatToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return moveAllow(local_data, SW_9_FLAT__DOWN); // ¯⭝
    } else if (swUpToUp(prev_tilt_up, new_tilt_up, high_to_low)) {
        return moveAllow(local_data, SW_10_UP__UP); //     ↗↗
    } else if (swDownToDown(prev_tilt_up, new_tilt_up, low_to_high)) {
        return moveAllow(local_data, SW_10_DOWN__DOWN); // ↘↘
    } else if (swUpToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return moveAllow(local_data, SW_11_UP__DOWN); //  ↗↘
    } else if (swDownToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, SW_13_DOWN__UP); //  ↘↗
    }
    if (prev_new_data.new_high_y <= prev_new_data.prev_low_y) {
        return moveDescendOneStep(local_data, SW_AIRBORNE);
    }
    return moveBlock(local_data, SW_14_BLOCKED); //  ↘↗
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
