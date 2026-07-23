import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";

import {
    GET_ABOVE_TILES,
    MV_START_TRAMPOLINE,
    MV_RISE_JUMP_STRAIGHT,
    MV_FALL_JUMP_STRAIGHT,
    MV_TILE_SAME,
    MV_FENCE_BLOCKED,
    MV_FALL_STEP_OFF,
    MV_TILE_NEW,
    MV_RISE_TRAMPOLINE,
    MV_FALL_TRAMPOLINE
} from "../values/the-constants.js";

import { TRAMPOLINE_ITERATIONS, TURNS_TO_FLIP } from "../values/move-consts.js";

import { floatCoords2tileIndex } from "../tiles/hex-tile.js";
import { hexIndex } from "../tiles/hex-routines.js";
import { transition2NewTile } from "./adjust-camera.js";
import { flipTileColorG } from "../colors/colors-tiles.js";

import { doRiseTrampoline, doFallTrampoline, trampolineLift } from "../trampolines/trampoline-moves.js";

import { doFallPlayer, jumpClick, doRiseJump, doFallJump } from "../player/player-moves.js";

function followCamera(the_objects, frame_vars, e_do_click, g_camera) {
    //
    function isWalkwayClick() {
        const tile_same = f_move_result == MV_TILE_SAME;
        const tile_new = f_move_result == MV_TILE_NEW;
        const tile_blocked = f_move_result == MV_FENCE_BLOCKED;
        const on_walkway = tile_same || tile_new || tile_blocked;
        const MV_CLICK_ON_WALKWAY = e_do_click.was_clicked && on_walkway;
        return MV_CLICK_ON_WALKWAY;
    }

    function doStartJumpingUp() {
        let jump_data = jumpClick(f_prev_coords, f_this_coords);
        ({ f_jump_x_step, f_jump_z_step, f_bounce_speed } = jump_data);
        ({ f_rise_step_size, f_fall_step_size, f_step_iterations } = jump_data);
        f_move_result = MV_RISE_JUMP_STRAIGHT;
    }

    function isJumpingUp() {
        return f_move_result == MV_RISE_JUMP_STRAIGHT;
    }
    function doJumpUp() {
        [changed_move, f_y100_height] = doRiseJump(f_step_iterations, f_rise_step_size, f_y100_height);
        f_move_result = changed_move;
    }

    function isJumpingDown() {
        return f_move_result == MV_FALL_JUMP_STRAIGHT;
    }
    function doJumpDown() {
        [changed_move, f_y100_height] = doFallJump(fall_data);
        f_move_result = changed_move;
    }

    function isSteppingOff() {
        return f_move_result == MV_FALL_STEP_OFF;
    }

    function doStepOff() {
        f_move_result = transition2NewTile(the_objects, f_prev_coords, f_this_coords);
        [f_move_result, f_y100_height] = doFallPlayer(fall_data);
    }

    function isStartTrampoline() {
        return f_move_result == MV_START_TRAMPOLINE;
    }

    function doStartBounceUp(o_trampolines) {
        let bounced_data = trampolineLift(o_trampolines, f_this_hex);
        ({ f_jump_x_step, f_jump_z_step, f_bounce_speed } = bounced_data);
        ({ f_rise_step_size, f_fall_step_size, f_step_iterations } = bounced_data);
        f_move_result = MV_RISE_TRAMPOLINE;
    }

    function isBouncingUp() {
        return f_move_result == MV_RISE_TRAMPOLINE;
    }
    function doBounceUp() {
        [changed_move, f_y100_height] = doRiseTrampoline(f_step_iterations, f_rise_step_size, f_y100_height);
        f_move_result = changed_move;
    }

    function isBouncingDown() {
        return f_move_result == MV_FALL_TRAMPOLINE;
    }

    function doBounceDown(o_trampolines) {
        [changed_move, f_y100_height] = doFallTrampoline(fall_data);
        let is_a_trampoline = o_trampolines.has(f_this_hex);
        if (is_a_trampoline) {
            f_step_iterations = TRAMPOLINE_ITERATIONS;
        }
        f_move_result = changed_move;
    }

    function isFenceBlocked() {
        return f_move_result == MV_FENCE_BLOCKED;
    }
    function doFenceBlock() {
        f_move_result = transition2NewTile(the_objects, f_prev_coords, f_this_coords);
        g_camera.position.x = f_prev_coords.x;
        g_camera.position.z = f_prev_coords.z;
    }

    function isOnNewTile() {
        return f_move_result == MV_TILE_NEW;
    }

    function doNewTile(the_objects) {
        f_move_result = transition2NewTile(the_objects, f_prev_coords, f_this_coords);
    }

    function doSameTile(the_objects) {
        f_move_result = transition2NewTile(the_objects, f_prev_coords, f_this_coords);
    }

    function red2Green(the_objects, f_this_hex, f_red_2_green) {
        let { cur_hex_tile, red_turns_left } = f_red_2_green;
        if (f_this_hex == cur_hex_tile) {
            red_turns_left--;
        } else {
            cur_hex_tile = f_this_hex;
            red_turns_left = TURNS_TO_FLIP;
        }

        if (red_turns_left == 0) {
            flipTileColorG(the_objects, f_this_hex);
        }

        return { cur_hex_tile, red_turns_left };
    }

    function adustCameraHeight(the_objects, o_walkway_tiles, ndx_x, f_y100_height, ndx_z) {
        let low = `${ndx_x},${f_y100_height - 100},${ndx_z}`;
        let high = `${ndx_x},${f_y100_height + 100},${ndx_z}`;
        if (o_walkway_tiles.has(low)) {
            f_y100_height -= 100;
        } else if (o_walkway_tiles.has(high)) {
            f_y100_height += 100;
            g_camera.position.y = f_y100_height / 100 + GET_ABOVE_TILES + 0;
        }
        doNewTile(the_objects);
        return f_y100_height;
    }

    function processMovement() {
        if (isWalkwayClick()) {
            doStartJumpingUp();
        } else if (isJumpingUp()) {
            doJumpUp();
        } else if (isJumpingDown()) {
            doJumpDown();
        } else if (isSteppingOff()) {
            doStepOff();
        } else if (isStartTrampoline()) {
            doStartBounceUp(o_trampolines);
        } else if (isBouncingUp()) {
            doBounceUp();
        } else if (isBouncingDown()) {
            doBounceDown(o_trampolines);
        } else if (isFenceBlocked()) {
            doFenceBlock();
        } else if (isOnNewTile()) {
            f_y100_height = adustCameraHeight(the_objects, o_walkway_tiles, ndx_x, f_y100_height, ndx_z);
        } else {
            doSameTile(the_objects);
        }
    }
    /////////////////////////////////////////
    let {
        f_move_result,
        f_cam_vect,
        f_prev_hex,
        f_this_hex,
        f_step_iterations,
        f_bounce_speed,
        f_rise_step_size,
        f_fall_step_size,
        f_y100_height,
        f_jump_x_step,
        f_jump_z_step,
        f_prev_coords,
        f_this_coords,
        f_red_2_green
    } = frame_vars;

    let changed_move;
    let [ndx_x, ndx_z] = floatCoords2tileIndex(f_cam_vect.x, f_cam_vect.z);
    let { o_walkway_tiles, o_trampolines } = the_objects;
    f_this_hex = hexIndex(ndx_x, f_y100_height, ndx_z);
    f_red_2_green = red2Green(the_objects, f_this_hex, f_red_2_green);
    let fall_data = { o_walkway_tiles, o_trampolines, f_this_hex, f_y100_height, f_fall_step_size };
    processMovement();
    f_prev_hex = f_this_hex;
    e_do_click.was_clicked = false;

    const changed_vars = {
        f_move_result,
        f_y100_height,
        f_jump_x_step,
        f_jump_z_step,
        f_bounce_speed,
        f_rise_step_size,
        f_fall_step_size,
        f_step_iterations,
        f_prev_hex,
        f_this_hex,
        f_prev_coords,
        f_this_coords,
        f_red_2_green
    };
    return changed_vars;
}

export { followCamera };
