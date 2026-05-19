import { ee, tt, EE, TT } from "./misc-funcs.js";

import * as THREE from "three";
import * as HEX_CONST from "./constants.js";
import { CIRCLE_WALKWAY, CIRCLE_WALLS, CIRCLE_TRAMPOLINES } from "./maps/circles.js";
import { walkwayIncline } from "./tiles/walkway-heights.js";
import { tileCenterCoord, coords2HexIndexes } from "./tiles/hex-tile.js";
import { transition2Tile } from "./tiles/cam-adjust/camAdjust.js";
import { setUpLiveTests, staticTests } from "./tests/live-test.js";
import { moveKeys, makeControls } from "./controls/key-controls.js";
import { XyzDot } from "./a-dot.js";
import { RUNNING_NO_PRINT } from "./constants.js";
import { startGameTiles } from "./tiles/start-tiles.js";
import { buildTiles, buildScene, buildRenderer, buildListener } from "./build-tiles.js";
import { gameLoop } from "./game-loop.js";
import { hexIndex } from "./tiles/misc-func.js"; // 2 misc-func.js  and misc-funcs.js

let the_coords, test_xyz_camera, test_xyz_lookat, test_name;
const g_walkway_coords = the_coords;
const TEST_DIRECTION = HEX_CONST.TEST_SW; //
const TEST_NUMBER_1_TO_11 = 0; // if 0 then none
const GAME_WALKWAY = CIRCLE_WALKWAY;
const GAME_WALLS = CIRCLE_WALLS;
const GAME_TRAMPOLINES = CIRCLE_TRAMPOLINES;

const GET_ABOVE_TILES = 1;

if (TEST_NUMBER_1_TO_11 == 0) {
    let { walkway_coords, start_xyz_camera, start_xyz_lookat } = startGameTiles(GAME_WALKWAY);
    the_coords = walkway_coords;
    test_xyz_camera = start_xyz_camera;
    test_xyz_lookat = start_xyz_lookat;
    test_name = "";
} else {
    [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = setUpLiveTests(TEST_DIRECTION, TEST_NUMBER_1_TO_11);
}
const { the_scene, persp_camera, the_width, the_height } = buildScene(test_xyz_camera);

//persp_camera.position.set(...test_xyz_camera);
persp_camera.position.set(test_xyz_camera[0], test_xyz_camera[1] / 100, test_xyz_camera[2]);

persp_camera.lookAt(test_xyz_lookat[0], test_xyz_lookat[1] / 100, test_xyz_lookat[2]);

the_scene.add(persp_camera);

const { g_walkway_meshes, g_walkway_tiles, g_walkway_columns, g_wall_squares, g_wall_columns, g_ground_tiles } = buildTiles(the_scene, GAME_WALLS, the_coords);

// const { g_walkway_meshes, g_walkway_tiles, g_walkway_columns, g_wall_squares, g_wall_columns, g_ground_tiles } = buildTrampolines(
//     the_scene,
//     GAME_TRAMPOLINES,
//     the_coords
// );

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

// cur_y_100_pos = 600; since we minus 5
let tile_transition = { move_result: HEX_CONST.MOVE_FALLING, level_y: cur_y_100_pos };

const tick = () => {
    const clock_delta = clock.getDelta();
    const cam_pos = persp_camera.position;
    next_pos = { x: cam_pos.x, y: cur_y_100_pos, z: cam_pos.z };

    if (tile_transition.move_result == HEX_CONST.MOVE_FALLING) {
        let [prev_x_ind, prev_z_ind] = coords2HexIndexes(cam_pos.x, cam_pos.z);
        let tile_index = hexIndex(prev_x_ind, cur_y_100_pos, prev_z_ind);
        if (g_walkway_tiles.has(tile_index)) {
            tile_transition = { move_result: HEX_CONST.MOVE_SAME_TILE, level_y: cur_y_100_pos };
        } else {
            cur_y_100_pos = cur_y_100_pos - 5;
        }
    } else {
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

        if (tile_transition.move_result == HEX_CONST.MOVE_FALLING) {
        }
    }

    [prev_pos, next_pos, cur_y_100_pos] = gameLoop(prev_pos, next_pos, cur_y_100_pos, tile_transition, cam_pos);

    persp_camera.getWorldDirection(vector_3);
    moveKeys(clock_delta, key_controls);
    const inc_y = walkwayIncline(g_walkway_tiles, next_pos);
    persp_camera.position.y = cur_y_100_pos / 100 + GET_ABOVE_TILES + inc_y;

    // XyzDot(the_scene, cam_pos.x, persp_camera.position.y, cam_pos.z, 0x666666);

    a_renderer.render(the_scene, persp_camera);

    tt(cur_y_100_pos);
    if (cur_y_100_pos <= 0) {
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
