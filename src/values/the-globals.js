window.HEX_VARS = {
    PRINT_ALLOWED: "PRINT_ALLXXOWED",
    MAX_PRINTS: 1111111150,
    BREAD_CRUMBS: true
};

import { ee, tt, EE, TT } from "../misc/console-short.js";

import * as THREE from "three";
import { moveKeys, makeControls } from "../controls/key-controls.js";
import { GET_ABOVE_TILES } from "./the-constants.js";

import { walkwayIncline } from "../tiles/walkway-heights.js";
import { buildScene, buildRenderer, buildListener } from "../objects/build-objects.js";

import { XyzDot } from "../objects/a-dot.js";

import { MV_RISE_JUMP_STRAIGHT, MV_FALL_JUMP_STRAIGHT, MV_TILE_SAME, MV_FENCE_BLOCKED } from "./the-constants.js";

function camVectCoords(g_camera, f_y100_height) {
    const f_cam_vect = g_camera.position;
    let f_this_coords = { x: f_cam_vect.x, y: f_y100_height, z: f_cam_vect.z };
    return [f_cam_vect, f_this_coords];
}

function buildGlobals(e_enemy_points, e_do_click) {
    let { g_scene, g_camera, g_width, g_height } = buildScene();
    let g_key_controls = makeControls(g_camera, e_enemy_points, e_do_click);

    const g_clock = new THREE.Clock();
    let g_vector_3 = new THREE.Vector3();
    const { g_renderer, g_bench } = buildRenderer(g_scene, g_width, g_height);
    buildListener(g_camera, g_renderer);
    const built_globals = {
        g_clock,
        g_vector_3,
        g_scene,
        g_camera,
        g_width,
        g_height,
        g_key_controls,
        g_renderer,
        g_bench
    };
    return built_globals;
}

function drawBreadcrumbs(the_globals, f_cam_vect) {
    if (window.HEX_VARS.BREAD_CRUMBS) {
        let { g_scene, g_camera } = the_globals;
        XyzDot(g_scene, f_cam_vect.x, g_camera.position.y, f_cam_vect.z, 0x666666);
    }
}

function setCamera(the_globals, test_xyz_camera, start_look_at) {
    let { g_scene, g_camera } = the_globals;
    g_camera.position.set(test_xyz_camera[0], test_xyz_camera[1] / 100, test_xyz_camera[2]);
    g_camera.lookAt(start_look_at[0], start_look_at[1] / 100, start_look_at[2]);
    g_scene.add(g_camera);
}

function renderRequest(the_globals, frameTick) {
    let { g_renderer, g_scene, g_camera } = the_globals;
    g_renderer.render(g_scene, g_camera);
    window.requestAnimationFrame(frameTick);
}

function resetUnderneath(f_y100_height) {
    if (f_y100_height < -100) {
        f_y100_height = 1600;
    }
    return f_y100_height;
}

function moveCamera(the_globals, the_objects, f_this_coords, f_y100_height, f_move_result) {
    let { g_key_controls, g_camera, g_clock, g_vector_3 } = the_globals;
    let o_walkway_tiles = the_objects.o_walkway_tiles;
    const clock_delta = g_clock.getDelta();
    g_camera.getWorldDirection(g_vector_3);
    if (f_move_result == MV_RISE_JUMP_STRAIGHT || f_move_result == MV_FALL_JUMP_STRAIGHT) {
        g_key_controls.enabled = false;
    } else {
        g_key_controls.enabled = true;
        moveKeys(clock_delta, g_key_controls);
    }
    const inc_y = walkwayIncline(o_walkway_tiles, f_this_coords);
    g_camera.position.y = f_y100_height / 100 + GET_ABOVE_TILES + inc_y;
    return g_camera;
}

export { ee, tt, EE, TT, drawBreadcrumbs, moveCamera, buildGlobals, setCamera, renderRequest, camVectCoords, resetUnderneath };
