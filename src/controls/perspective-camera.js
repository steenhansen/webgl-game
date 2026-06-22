import { ee, tt, EE, TT } from "../misc/console-short.js";

import * as THREE from "three";
import { HEX_PAIR_DIVIDER } from "../values/the-constants.js";

import {
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

import { TRAMPOLINE_ITERATIONS } from "../values/move-consts.js";

import { coords2Indexes } from "../tiles/hex-tile.js";
import { hexIndex } from "../tiles/hex-routines.js";
import { transition2NewTile } from "../tiles/cam-adjust/camAdjust.js";
import { flipTileColorG } from "../tiles/colors-tiles.js";

import { doRiseTrampoline, doFallTrampoline, trampolineLift } from "../vertical-movement/trampoline-moves.js";

import { doFallPlayer, jumpClick, doRiseJump, doFallJump } from "../vertical-movement/player-moves.js";

function followCamera(the_objects, frame_vars, e_do_click, g_camera) {
    function isWalkwayClick() {
        const on_walkway = f_move_result == MV_TILE_SAME || f_move_result == MV_TILE_NEW || f_move_result == MV_FENCE_BLOCKED;
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
        f_move_result = transition2NewTile(the_objects, f_prev_coords, f_this_coords, false);
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
        let is_a_trampoline = false;
        f_move_result = transition2NewTile(the_objects, f_prev_coords, f_this_coords, is_a_trampoline);
        g_camera.position.x = f_prev_coords.x;
        g_camera.position.z = f_prev_coords.z;
    }

    function isOnNewTile() {
        return f_move_result == MV_TILE_NEW;
    }

    function doNewTile(the_objects) {
        let { o_trampolines } = the_objects;
        let is_a_trampoline = o_trampolines.has(f_this_hex);
        f_move_result = transition2NewTile(the_objects, f_prev_coords, f_this_coords, is_a_trampoline);
        if (is_a_trampoline) {
            f_step_iterations = TRAMPOLINE_ITERATIONS;
        }
        flipTileColorG(the_objects, f_this_hex, f_prev_hex);
    }

    function _isOnSameTile() {
        return f_move_result == MV_TILE_NEW;
    }
    function doSameTile(the_objects) {
        f_move_result = transition2NewTile(the_objects, f_prev_coords, f_this_coords, false);
        flipTileColorG(the_objects, f_this_hex, f_prev_hex);
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
        f_this_coords
    } = frame_vars;

    let changed_move;
    let [ndx_x, ndx_z] = coords2Indexes(f_cam_vect.x, f_cam_vect.z);
    f_this_hex = hexIndex(ndx_x, f_y100_height, ndx_z);
    let { o_walkway_tiles, o_trampolines } = the_objects;
    let fall_data = { o_walkway_tiles, o_trampolines, f_this_hex, f_y100_height, f_fall_step_size };

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
        doNewTile(the_objects);
    } else {
        //_isOnSameTile();
        doSameTile(the_objects);
    }

    f_prev_hex = f_this_hex;
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
        f_this_coords
    };
    e_do_click.was_clicked = false;
    return changed_vars;
}

function PerspCamera(the_fov, width_height, nf_planes) {
    const [camera_width, camera_height] = width_height;
    const [near_plane, far_plane] = nf_planes;
    const camera_aspect = camera_width / camera_height;
    const g_camera = new THREE.PerspectiveCamera(the_fov, camera_aspect, near_plane, far_plane);
    return g_camera;
}

function projMatrix(the_camera, width_height) {
    const [camera_width, camera_height] = width_height;
    const camera_aspect = camera_width / camera_height;
    the_camera.aspect = camera_aspect;
    the_camera.updateProjectionMatrix();
}

export { PerspCamera, projMatrix, followCamera };
