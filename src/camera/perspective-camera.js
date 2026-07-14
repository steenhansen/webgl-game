import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";

import * as THREE from "three";
import { walkwayIncline } from "../walkways/walkway-heights.js";
import { moveKeys } from "../controls/key-controls.js";
import { GET_ABOVE_TILES, MV_RISE_JUMP_STRAIGHT, MV_FALL_JUMP_STRAIGHT } from "../values/the-constants.js";

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

function camVectCoords(g_camera, f_y100_height) {
    const f_cam_vect = g_camera.position;
    let f_this_coords = { x: f_cam_vect.x, y: f_y100_height, z: f_cam_vect.z };
    return [f_cam_vect, f_this_coords];
}
export { moveCamera, PerspCamera, projMatrix, camVectCoords };
