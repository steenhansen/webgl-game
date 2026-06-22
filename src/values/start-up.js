import { ee, tt, EE, TT } from "../misc/console-short.js";
import { buildGlobals, setCamera } from "./the-globals.js";
import { staticTests } from "../tests/live-test.js";
import { startGameTiles } from "../tiles/start-tiles.js";
import { doMap1 } from "../maps/map-1.js";
//import { doMap2 } from "../maps/map-2.js";
import { drawFps } from "../misc/minor-routines.js";
import { buildObjects } from "../objects/build-objects.js";
import * as THREE from "three";

let e_do_click = { was_clicked: false };
let e_enemy_points = { copy_output: "" };

let [the_map, start_location, start_look_at] = doMap1();

let { o_pentagons, o_trampolines, o_fence_ndxs, o_walkway_ndxs, o_unvisited_tiles } = startGameTiles(the_map);

let the_globals = buildGlobals(e_enemy_points, e_do_click);
let { g_scene, g_camera, g_renderer, g_bench } = the_globals;

setCamera(the_globals, start_location, start_look_at);

let the_objects = buildObjects(g_scene, o_fence_ndxs, o_walkway_ndxs, o_trampolines, o_pentagons, o_unvisited_tiles);

staticTests();

let frame_vars = {
    g_camera: the_globals.g_camera,
    f_step_iterations: 20,
    f_bounce_speed: 4,
    f_cam_vect: new THREE.Vector3(-1.36, 12, 0.58),
    f_fall_step_size: 20,
    f_rise_step_size: 21,
    f_jump_x_step: 0.13,
    f_jump_z_step: 0.31,
    f_move_result: "MV_TILE_SAME",
    f_prev_coords: { x: -1.17, y: 1100, z: -0.21 },
    f_prev_hex: "-1,1000,0",
    f_this_coords: { x: g_camera.position.x, y: g_camera.position.y, z: g_camera.position.z },
    f_this_hex: "-2,900,1",
    f_y100_height: g_camera.position.y * 100
};

g_renderer.setAnimationLoop((now_time) => drawFps(g_bench, now_time));

export { e_do_click, the_globals, the_objects, g_renderer, g_bench, frame_vars };
