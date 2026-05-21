import { ee, tt, EE, TT } from "../console-short.js";

import { tileCenterCoord } from "./hex-tile.js";
import * as HEX_CONST from "../constants.js";

function startGameTiles(GAME_WALKWAY) {
    const start_hexes = GAME_WALKWAY.shift();
    const [game_start_hex_x, game_start_coord_y, game_start_hex_z] = start_hexes;

    let [game_start_coord_x, game_start_coord_z] = tileCenterCoord(game_start_hex_x, game_start_hex_z);

    let start_xyz_camera = [game_start_coord_x, game_start_coord_y, game_start_coord_z];

    const walkway_coords = GAME_WALKWAY;
    const start_xyz_lookat = GAME_WALKWAY.shift();
    return { walkway_coords, start_xyz_camera, start_xyz_lookat };
}

function startTestTiles(test_direction) {
    if (TEST_DIRECTION == HEX_CONST.TEST_SS) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = ss_load_test(TEST_NUMBER_1_TO_11);
        // the_coords.pop(); // get rid of name
        ee("main start test coord ss", the_coords);
    } else if (TEST_DIRECTION == HEX_CONST.TEST_NN) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = nn_load_test(TEST_NUMBER_1_TO_11);
        // the_coords.pop(); // get rid of name
        ee("main start test coord nn", the_coords);
    } else if (TEST_DIRECTION == HEX_CONST.TEST_NE) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = ne_load_test(TEST_NUMBER_1_TO_11);
        // the_coords.pop(); // get rid of name
        ee("main start test coord ne", the_coords);
    } else if (TEST_DIRECTION == HEX_CONST.TEST_SW) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = sw_load_test(TEST_NUMBER_1_TO_11);
        // the_coords.pop(); // get rid of name
    } else if (TEST_DIRECTION == HEX_CONST.TEST_NW) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = nw_load_test(TEST_NUMBER_1_TO_11);
        // the_coords.pop(); // get rid of name
        ee("main start test coord nw", the_coords);
    } else if (TEST_DIRECTION == HEX_CONST.TEST_SE) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = se_load_test(TEST_NUMBER_1_TO_11);
        // the_coords.pop(); // get rid of name
    }

    if (test_name !== "") {
        ee(`Physical mouse moving TEST NAME :: ${test_name} :: move forward to cause test`);
    }
}

export { startGameTiles };
