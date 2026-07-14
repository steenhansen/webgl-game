import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";
import * as THREE from "three";

import { TURNS_TO_FLIP } from "../values/move-consts.js";
import { hexIndex } from "../tiles/hex-routines.js";
import { buildGlobals, setCamera } from "./the-globals.js";
import { staticTests } from "../tests/live-test.js";
import { doMap1 } from "../maps/map-1.js";
import { doMap2 } from "../maps/map-2.js";
import { drawFps } from "../misc/minor-routines.js";
import { buildObjects } from "../objects/build-objects.js";

function startGameTiles(the_map) {
    const o_trampolines = the_map.trampoline_locs;
    const o_pentagons = the_map.pentagon_locs;
    const o_walkway_ndxs = the_map.walkway_locs;

    var o_unvisited_tiles = new Map([]);
    for (const a_tile of o_walkway_ndxs) {
        const [x_index, y_100_index, z_index] = a_tile;
        const xyz_index = `${x_index},${y_100_index},${z_index}`;
        o_unvisited_tiles.set(xyz_index, xyz_index);
    }
    const o_fence_ndxs = the_map.fence_locs;
    return { o_pentagons, o_trampolines, o_fence_ndxs, o_walkway_ndxs, o_unvisited_tiles };
}

const query_string = window.location.search;
const url_params = new URLSearchParams(query_string);
const my_map = url_params.get("map");

let e_do_click = { was_clicked: false };
let e_enemy_points = { copy_output: "" };

let the_map, start_location, start_look_at;

if (my_map == "1") {
    [the_map, start_location, start_look_at] = doMap1();
} else {
    [the_map, start_location, start_look_at] = doMap2();
}

let { o_pentagons, o_trampolines, o_fence_ndxs, o_walkway_ndxs, o_unvisited_tiles } = startGameTiles(the_map);
let the_globals = buildGlobals(e_enemy_points, e_do_click);
let { g_key_controls, g_scene, g_camera, g_renderer, g_bench } = the_globals;
setCamera(the_globals, start_location, start_look_at);
let the_objects = buildObjects(g_scene, o_fence_ndxs, o_walkway_ndxs, o_trampolines, o_pentagons, o_unvisited_tiles);
staticTests();
const [start_x, start_y, start_z] = start_location;

let f_this_hex = hexIndex(start_x, start_y, start_z);

//const TURNS_TO_FLIP = 3;

let frame_vars = {
    g_camera: the_globals.g_camera,
    f_step_iterations: 20,
    f_bounce_speed: 4,
    f_cam_vect: new THREE.Vector3(-1.36, 12, 0.58),
    f_fall_step_size: 20,
    f_rise_step_size: 21,

    f_move_result: "MV_TILE_SAME",
    f_prev_coords: { x: start_x, y: start_y, z: start_z },
    f_this_coords: { x: g_camera.position.x, y: g_camera.position.y, z: g_camera.position.z },
    f_this_hex: f_this_hex,
    f_y100_height: start_location[1],
    f_jump_x_step: 0,
    f_jump_z_step: 0,
    f_red_2_green: { cur_hex_tile: f_this_hex, red_turns_left: TURNS_TO_FLIP }
};

g_renderer.setAnimationLoop((now_time) => drawFps(g_bench, now_time));
export { e_do_click, the_globals, the_objects, g_renderer, g_bench, frame_vars };
