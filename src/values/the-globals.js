import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";
import * as THREE from "three";

window.HEX_VARS = {
    PRINT_ALLOWED: "PRINT_XXXXALLOWED",
    MAX_PRINTS: 1111111150,
    BREAD_CRUMBS: true
};

import { makeControls } from "../controls/key-controls.js";

import { buildScene, buildRenderer, buildListener } from "../objects/build-objects.js";

import { XyzDot } from "../objects/a-dot.js";

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

function setCamera(the_globals, start_xyz_coords, start_look_at) {
    let { g_scene, g_camera } = the_globals;
    g_camera.position.set(start_xyz_coords[0], start_xyz_coords[1] / 100, start_xyz_coords[2]);
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

export { ee, tt, dd, EE, TT, DD, drawBreadcrumbs, buildGlobals, setCamera, renderRequest, resetUnderneath };
