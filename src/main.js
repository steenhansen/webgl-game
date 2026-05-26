import { ee, tt, EE, TT } from "./misc/console-short.js";

import * as THREE from "three";
import * as HEX_CONST from "./constants.js";
import { CIRCLE_WALKWAY, CIRCLE_WALLS, CIRCLE_TRAMPOLINES, CIRCLE_PENTAGONS } from "./maps/circles.js";
import { walkwayIncline } from "./tiles/walkway-heights.js";
import { tileCenterCoord, coords2HexIndexes } from "./tiles/hex-tile.js";
import { transition2Tile } from "./tiles/cam-adjust/camAdjust.js";
import { setUpLiveTests, staticTests } from "./tests/live-test.js";
import { moveKeys, makeControls } from "./controls/key-controls.js";
import { XyzDot } from "./a-dot.js";
import { RUNNING_NO_PRINT } from "./constants.js";
import { startGameTiles } from "./tiles/start-tiles.js";
import { buildObjects, buildScene, buildRenderer, buildListener } from "./build-objects.js";
import { gameLoop } from "./game-loop.js";
import { hexIndex } from "./tiles/hex-routines.js"; // 2 hex-routines.js  and console-short.js

let the_coords, test_xyz_camera, test_xyz_lookat, test_name;
const g_walkway_coords = the_coords;
const TEST_DIRECTION = HEX_CONST.TEST_SW; //
const TEST_NUMBER_1_TO_11 = 0; // if 0 then none
const GAME_WALKWAY = CIRCLE_WALKWAY;
const GAME_WALLS = CIRCLE_WALLS;
const GAME_TRAMPOLINES = CIRCLE_TRAMPOLINES;
const GAME_PENTAGONS = CIRCLE_PENTAGONS;

const GET_ABOVE_TILES = 1;
let g_tile_3colors; //g_top_3colors, g_outline_3colors;

if (TEST_NUMBER_1_TO_11 == 0) {
    //  let { walkway_coords, start_xyz_camera, start_xyz_lookat, top_3colors, outline_3colors } = startGameTiles(GAME_WALKWAY);
    let { walkway_coords, start_xyz_camera, start_xyz_lookat, tile_3colors } = startGameTiles(GAME_WALKWAY);
    the_coords = walkway_coords;
    test_xyz_camera = start_xyz_camera;
    test_xyz_lookat = start_xyz_lookat;
    g_tile_3colors = tile_3colors;
    //  g_top_3colors = top_3colors;
    //  g_outline_3colors = outline_3colors;
    test_name = "";
} else {
    [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = setUpLiveTests(TEST_DIRECTION, TEST_NUMBER_1_TO_11);
}

const { the_scene, persp_camera, the_width, the_height } = buildScene(test_xyz_camera);

//persp_camera.position.set(...test_xyz_camera);
persp_camera.position.set(test_xyz_camera[0], test_xyz_camera[1] / 100, test_xyz_camera[2]);

persp_camera.lookAt(test_xyz_lookat[0], test_xyz_lookat[1] / 100, test_xyz_lookat[2]);

the_scene.add(persp_camera);

//const built_objects = buildObjects(the_scene, GAME_WALLS, the_coords, GAME_TRAMPOLINES, GAME_PENTAGONS, g_top_3colors, g_outline_3colors);
const built_objects = buildObjects(the_scene, GAME_WALLS, the_coords, GAME_TRAMPOLINES, GAME_PENTAGONS, g_tile_3colors);

const {
    g_object_meshes,
    g_walkway_tiles,
    g_walkway_colors,
    g_walkway_columns,
    g_wall_squares,
    g_wall_columns,
    g_ground_tiles,
    g_trampolines,
    trampoline_meshes,
    g_pentagons,
    pentagon_meshes
} = built_objects;

staticTests();

const { a_renderer, bench } = buildRenderer(the_scene, the_width, the_height);
buildListener(persp_camera);

let key_controls = makeControls(persp_camera);

/**
 * 7. ANIMATION LOOP
 */
const clock = new THREE.Clock();
const vector_3 = new THREE.Vector3(); // create once and reuse it!

const cam_start = persp_camera.position;
let prev_pos = { x: cam_start.x, y: cam_start.y, z: cam_start.z };
let cur_y_100_pos = cam_start.y * 100; // 1, 1.5, 2 ...
let next_pos;
let prev_tile_index;
// cur_y_100_pos = 600; since we minus 5
let tile_transition = { move_result: HEX_CONST.MOVE_FALLING, level_y: cur_y_100_pos };

const RISE_XZ_SPEED_SLOW = 4;
const RISE_Y_ADD = 25;
const FALL_Y_SUB = 5;
const RISE_NN_Z_DIFF = +1 / RISE_XZ_SPEED_SLOW; ///0.25;
const RISE_SS_Z_DIFF = -1 / RISE_XZ_SPEED_SLOW; ///0.25;

let tramp_z = 0;
let tramp_x = 0;

const tick = () => {
    const clock_delta = clock.getDelta();
    const cam_pos = persp_camera.position;
    next_pos = { x: cam_pos.x, y: cur_y_100_pos, z: cam_pos.z };

    let [prev_x_ind, prev_z_ind] = coords2HexIndexes(cam_pos.x, cam_pos.z);
    let tile_index = hexIndex(prev_x_ind, cur_y_100_pos, prev_z_ind);
    if (tile_transition.move_result == HEX_CONST.MOVE_RISING) {
        //    tt("rising");
        //        cur_y_100_pos = cur_y_100_pos + 25;
        cur_y_100_pos = cur_y_100_pos + RISE_Y_ADD;
        if (cur_y_100_pos >= 1600) {
            tile_transition.move_result = HEX_CONST.MOVE_FALLING;
        }
        // next_pos.x = next_pos.x + x_tramp;
    } else if (tile_transition.move_result == HEX_CONST.MOVE_FALLING) {
        //   tt("falling");
        // let [prev_x_ind, prev_z_ind] = coords2HexIndexes(cam_pos.x, cam_pos.z);
        // let tile_index = hexIndex(prev_x_ind, cur_y_100_pos, prev_z_ind);

        if (g_walkway_tiles.has(tile_index)) {
            tile_transition = { move_result: HEX_CONST.MOVE_SAME_TILE, level_y: cur_y_100_pos };
        } else if (g_trampolines.has(tile_index)) {
            let the_trampo = g_trampolines.get(tile_index);
            tt(the_trampo.tilt_up);
            tile_transition.move_result = HEX_CONST.MOVE_RISING;
            tramp_z = 0;
            tramp_x = 0;
            const tamp_tilt = the_trampo.tilt_up;
            if (tamp_tilt == HEX_CONST.TILT_NN) {
                tramp_z = RISE_NN_Z_DIFF;
                tramp_x = 0;
            } else if (tamp_tilt == HEX_CONST.TILT_SS) {
                tramp_z = RISE_SS_Z_DIFF;
                tramp_x = 0;
            } else if (tamp_tilt == HEX_CONST.TILT_SW) {
                //https://www.dummies.com/article/academics-the-arts/math/pre-calculus/quick-guide-to-the-30-60-90-degree-triangle-168056/
                tramp_z = -0.5 / RISE_XZ_SPEED_SLOW;
                tramp_x = +(0.5 * Math.sqrt(3)) / RISE_XZ_SPEED_SLOW;
            } else if (tamp_tilt == HEX_CONST.TILT_NE) {
                tramp_z = +0.5 / RISE_XZ_SPEED_SLOW;
                tramp_x = -(0.5 * Math.sqrt(3)) / RISE_XZ_SPEED_SLOW;
            }
        } else {
            //  cur_y_100_pos = cur_y_100_pos - 5;
            cur_y_100_pos = cur_y_100_pos - FALL_Y_SUB;
        }
    } else {
        //  tt("neither");
        tile_transition = transition2Tile(
            HEX_CONST.PHYS_TILE_MOVE,
            RUNNING_NO_PRINT,
            g_walkway_tiles,
            g_walkway_columns,
            g_wall_squares,
            g_wall_columns,
            prev_pos,
            next_pos
        );
        const new_movement = tile_transition.move_result;
        if (new_movement !== HEX_CONST.MOVE_FALLING) {
            if (tile_index !== prev_tile_index) {
                const new_y_100_pos = tile_transition.level_y;

                let new_tile_index = hexIndex(prev_x_ind, new_y_100_pos, prev_z_ind);
                //  tt("new_tile_index", new_tile_index);
                if (g_walkway_tiles.has(new_tile_index)) {
                    let current_tile = g_walkway_tiles.get(new_tile_index);
                    //tt("current_tile", current_tile);
                    let cur_light_dark = g_walkway_colors.get(new_tile_index);
                    // tt("cur_light_dark", cur_light_dark);
                    let changed_color;
                    if (cur_light_dark == "dark-color") {
                        changed_color = current_tile.light_color;
                        cur_light_dark = "light-color";
                    } else {
                        changed_color = current_tile.dark_color;
                        cur_light_dark = "dark-color";
                    }
                    g_walkway_colors.set(new_tile_index, cur_light_dark);

                    let tile_mesh = g_object_meshes.get(new_tile_index);
                    const retrievedMesh = tile_mesh.getObjectByName("Hexagon-Part");
                    retrievedMesh.material.color.setHex(changed_color);
                    prev_tile_index = new_tile_index;
                }
            }
        }
    }

    [prev_pos, next_pos, cur_y_100_pos] = gameLoop(prev_pos, next_pos, cur_y_100_pos, tile_transition, cam_pos);

    persp_camera.getWorldDirection(vector_3);
    moveKeys(clock_delta, key_controls);
    const inc_y = walkwayIncline(g_walkway_tiles, next_pos);
    persp_camera.position.y = cur_y_100_pos / 100 + GET_ABOVE_TILES + inc_y;

    // XyzDot(the_scene, cam_pos.x, persp_camera.position.y, cam_pos.z, 0x666666);

    // the spinning
    for (const [xyz_index, pentagon_mesh] of pentagon_meshes) {
        pentagon_mesh.rotation.y += 0.02;
        pentagon_mesh.material.color.setHex(0xff9900);
    }

    if (tile_transition.move_result == HEX_CONST.MOVE_RISING) {
        persp_camera.position.z += tramp_z;
        persp_camera.position.x += tramp_x;
    }

    a_renderer.render(the_scene, persp_camera);

    if (cur_y_100_pos < -100) {
        cur_y_100_pos = 1600;
    }

    // if (persp_camera.position.y > 0) {
    //     //  persp_camera.position.y -= GET_ABOVE_TILES;
    // }
    window.requestAnimationFrame(tick);
};

tick();

function draw(now) {
    bench.begin();
    // monitored code
    bench.end();
    bench.nextFrame(now);
}
a_renderer.setAnimationLoop((now) => draw(now));
