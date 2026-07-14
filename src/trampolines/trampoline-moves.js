import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";

import {
    MV_START_TRAMPOLINE,
    MV_TILE_SAME,
    MV_FALL_TRAMPOLINE,
    MV_RISE_TRAMPOLINE,
    TILT_NN,
    TILT_SS,
    TILT_NW,
    TILT_NE,
    TILT_SE,
    TILT_SW,
    TILT_NONE,
    SQRT_3
} from "../values/the-constants.js";
import { RISE_NN_Z_DIFF, RISE_SS_Z_DIFF, RISE_XZ_SPEED_SLOW } from "../values/move-consts.js";

import { TRAMPOLINE_RISE_SPEED, TRAMPOLINE_FALL_SPEED } from "../values/move-consts.js";

function doRiseTrampoline(f_step_iterations, f_rise_step_size, f_y100_height) {
    if (f_step_iterations == 0) {
        let c_move_result = MV_FALL_TRAMPOLINE;
        return [c_move_result, f_y100_height];
    }
    const rise_y_100 = f_y100_height + f_rise_step_size;
    let c_move_result = MV_RISE_TRAMPOLINE;
    return [c_move_result, rise_y_100];
}

function doFallTrampoline(fall_data) {
    let { o_walkway_tiles, o_trampolines, f_this_hex, f_y100_height, f_fall_step_size } = fall_data;
    if (o_walkway_tiles.has(f_this_hex)) {
        let c_move_result = MV_TILE_SAME;
        return [c_move_result, f_y100_height];
    } else if (o_trampolines.has(f_this_hex)) {
        let c_move_result = MV_START_TRAMPOLINE;
        return [c_move_result, f_y100_height];
    } else {
        const fall_y_100 = f_y100_height - f_fall_step_size;
        let c_move_result = MV_FALL_TRAMPOLINE;
        return [c_move_result, fall_y_100];
    }
}

// https://www.dummies.com/article/academics-the-arts/math/pre-calculus/quick-guide-to-the-30-60-90-degree-triangle-168056/
function trampolineLift(o_trampolines, tile_index) {
    let the_trampo = o_trampolines.get(tile_index);
    let f_jump_x_step, f_jump_z_step;

    if (the_trampo.f_bounce_speed === undefined) {
        ee("the_trampo.f_bounce_speed is undef", o_trampolines, tile_index);
    }
    let f_bounce_speed = the_trampo.f_bounce_speed; // qbert undefined
    let f_rise_step_size = TRAMPOLINE_RISE_SPEED;
    let f_fall_step_size = TRAMPOLINE_FALL_SPEED;
    let f_step_iterations = the_trampo.f_step_iterations;
    const tamp_tilt = the_trampo.tilt_up;
    if (tamp_tilt == TILT_NONE) {
        f_jump_x_step = 0;
        f_jump_z_step = 0;
    } else if (tamp_tilt == TILT_NN) {
        f_jump_x_step = 0;
        f_jump_z_step = RISE_NN_Z_DIFF;
    } else if (tamp_tilt == TILT_SS) {
        f_jump_x_step = 0;
        f_jump_z_step = RISE_SS_Z_DIFF;
    } else if (tamp_tilt == TILT_SW) {
        ///
        f_jump_x_step = +(0.5 * SQRT_3) / RISE_XZ_SPEED_SLOW;
        f_jump_z_step = -0.5 / RISE_XZ_SPEED_SLOW;
    } else if (tamp_tilt == TILT_NE) {
        f_jump_x_step = -(0.5 * SQRT_3) / RISE_XZ_SPEED_SLOW;
        f_jump_z_step = +0.5 / RISE_XZ_SPEED_SLOW;
    } else if (tamp_tilt == TILT_NW) {
        f_jump_x_step = +(0.5 * SQRT_3) / RISE_XZ_SPEED_SLOW;
        f_jump_z_step = +0.5 / RISE_XZ_SPEED_SLOW;
    } else if (tamp_tilt == TILT_SE) {
        f_jump_x_step = -(0.5 * SQRT_3) / RISE_XZ_SPEED_SLOW;
        f_jump_z_step = -0.5 / RISE_XZ_SPEED_SLOW;
    }
    f_jump_z_step *= f_bounce_speed;
    f_jump_x_step *= f_bounce_speed;
    let data_values = { f_jump_x_step, f_jump_z_step, f_bounce_speed, f_rise_step_size, f_fall_step_size, f_step_iterations };
    return data_values;
}

export { doRiseTrampoline, doFallTrampoline, trampolineLift };
