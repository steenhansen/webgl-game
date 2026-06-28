import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";

import {
    BOUNCE_COUNT___25,
    BOUNCE_SPEED___1,
    BOUNCE_SPEED_1_5,
    BOUNCE_SPEED___2,
    BOUNCE_SPEED_2_5,
    BOUNCE_SPEED___3,
    BOUNCE_SPEED_3_5,
    BOUNCE_SPEED___4
} from "./trampoline-const.js";

import {
    MV_START_TRAMPOLINE,
    MV_TILE_SAME,
    MV_FALL_TRAMPOLINE,
    MV_RISE_TRAMPOLINE,
    MV_FALL_JUMP_STRAIGHT,
    MV_RISE_JUMP_STRAIGHT,
    MV_FALL_STEP_OFF
} from "../values/the-constants.js";
import { HOR_JUMP_MULTIPLIER } from "../values/move-consts.js";

import { JUMP_ITERATIONS, JUMP_RISE_STEP_SIZE, JUMP_FALL_STEP_SIZE } from "../values/move-consts.js";

/////////
function doRiseJump(f_step_iterations, f_rise_step_size, f_y100_height) {
    if (f_step_iterations == 0) {
        let c_move_result = MV_FALL_JUMP_STRAIGHT;
        return [c_move_result, f_y100_height];
    }
    const rise_y_100 = f_y100_height + f_rise_step_size;
    let c_move_result = MV_RISE_JUMP_STRAIGHT;
    return [c_move_result, rise_y_100];
}
function doFallJump(fall_data) {
    let { o_walkway_tiles, o_trampolines, f_this_hex, f_y100_height, f_fall_step_size } = fall_data;
    if (o_walkway_tiles.has(f_this_hex)) {
        let c_move_result = MV_TILE_SAME;
        return [c_move_result, f_y100_height];
    } else if (o_trampolines.has(f_this_hex)) {
        let c_move_result = MV_START_TRAMPOLINE;
        return [c_move_result, f_y100_height];
    } else {
        const fall_y_100 = f_y100_height - f_fall_step_size;
        let c_move_result = MV_FALL_JUMP_STRAIGHT;
        return [c_move_result, fall_y_100];
    }
}

function doFallPlayer(fall_data) {
    let { o_walkway_tiles, o_trampolines, f_this_hex, f_y100_height, f_fall_step_size } = fall_data;
    if (o_walkway_tiles.has(f_this_hex)) {
        let c_move_result = MV_TILE_SAME;
        return [c_move_result, f_y100_height];
    } else if (o_trampolines.has(f_this_hex)) {
        let c_move_result = MV_START_TRAMPOLINE;
        return [c_move_result, f_y100_height];
    } else {
        const fall_y_100 = f_y100_height - f_fall_step_size;
        let c_move_result = MV_FALL_STEP_OFF;
        return [c_move_result, fall_y_100];
    }
}

function playerDie(done_died, done_finished) {
    window.location.reload();
}

function bouncePlayer(bounce_data, unvisited_tiles) {
    let { f_step_iterations, f_move_result, g_camera, f_jump_x_step, f_jump_z_step, f_y100_height } = bounce_data;
    let done_died = f_y100_height == 0;
    let done_finished = unvisited_tiles.size === 0;
    if (done_died || done_finished) {
        playerDie(done_died, done_finished);
    }

    if (
        f_move_result == MV_FALL_TRAMPOLINE ||
        f_move_result == MV_RISE_TRAMPOLINE ||
        f_move_result == MV_FALL_JUMP_STRAIGHT ||
        f_move_result == MV_RISE_JUMP_STRAIGHT ||
        f_move_result == MV_FALL_STEP_OFF
    ) {
        g_camera.position.z += f_jump_z_step;
        g_camera.position.x += f_jump_x_step;
        f_step_iterations--;
    }

    return [f_step_iterations, g_camera];
}

function jumpClick(f_prev_coords, f_this_coords) {
    const x_dif = f_this_coords.x - f_prev_coords.x;
    const z_dif = f_this_coords.z - f_prev_coords.z;
    let f_jump_x_step = x_dif * HOR_JUMP_MULTIPLIER;
    let f_jump_z_step = z_dif * HOR_JUMP_MULTIPLIER;
    //
    let f_bounce_speed = BOUNCE_SPEED___4;
    let f_rise_step_size = JUMP_RISE_STEP_SIZE;
    let f_fall_step_size = JUMP_FALL_STEP_SIZE;
    let f_step_iterations = JUMP_ITERATIONS;
    let data_values = { f_jump_x_step, f_jump_z_step, f_bounce_speed, f_rise_step_size, f_fall_step_size, f_step_iterations };
    return data_values;
}

export { doFallPlayer, jumpClick, doRiseJump, doFallJump, bouncePlayer };
