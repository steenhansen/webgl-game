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
    FENCE_SS,
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

function moveToNn(the_objects, prev_hex, this_hex, is_a_trampoline) {
    let { o_walkway_tiles, o_walkway_columns, o_fence_walls, o_fence_columns } = the_objects;
    const { prev_new_data, data } = tileData(o_walkway_tiles, prev_hex, this_hex);

    const { prev_tilt_up, new_tilt_up } = prev_new_data;
    const local_data = { prev_tilt_up, new_tilt_up, prev_hex, this_hex };
    if (hitFence(o_fence_walls, o_fence_columns, prev_hex, this_hex)) {
        return moveBlock(local_data, NN_14_BLOCKED);
    }
    if (offWalkway(o_walkway_columns, this_hex)) {
        if (is_a_trampoline) {
            return moveOntoTrampoline(local_data, NN_AIRBORNE);
        } else {
            return moveIntoAir(local_data, NN_AIRBORNE);
        }
    }
    const { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high } = data;
    if (nnCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, NN_1_UP_UP_CLOCK); //      ⭮
    } else if (nnCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, NN_2_UP_UP_COUNTER); //      ⭯
    } else if (nnCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, NN_3_DOWN_DOWN_CLOCK); //  ⭮
    } else if (nnCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, NN_4_DOWN_DOWN_COUNTER); //  ⭯
    } else if (nnFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, NN_5_FLAT__FLAT); // - -
    } else if (nnFlatToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, NN_6_FLAT__UP); //   _⭜
    } else if (nnUpToFlat(prev_tilt_up, new_tilt_up, high_to_high)) {
        return moveAllow(local_data, NN_7_UP__FLAT); //   ↗¯¯
    } else if (nnDownToFlat(prev_tilt_up, new_tilt_up, low_to_high)) {
        return moveAllow(local_data, NN_8_DOWN__FLAT); // ↘__
    } else if (nnFlatToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return moveAllow(local_data, NN_9_FLAT__DOWN); // ¯⭝
    } else if (nnUpToUp(prev_tilt_up, new_tilt_up, high_to_low)) {
        return moveAllow(local_data, NN_10_UP__UP); //     ↗↗
    } else if (nnDownToDown(prev_tilt_up, new_tilt_up, low_to_high)) {
        return moveAllow(local_data, NN_11_DOWN__DOWN); // ↘↘
    } else if (nnUpToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return moveAllow(local_data, NN_12_UP__DOWN); //  ↗↘
    } else if (nnDownToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, NN_13_DOWN__UP); //  ↘↗
    } else if (prev_hex == this_hex) {
        return MV_TILE_SAME;
    }
    if (prev_new_data.new_high_y <= prev_new_data.prev_low_y) {
        return moveDescendOneStep(local_data, NN_AIRBORNE);
    }
    return moveBlock(local_data, NN_14_BLOCKED);
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
