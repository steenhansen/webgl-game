import { ee, tt, EE, TT } from "../misc/console-short.js";
import { TEST_SS, TEST_NN, TEST_NE, TEST_SW, TEST_NW, TEST_SE } from "../values/the-constants.js";

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

function startTestTiles(test_direction) {
    if (TEST_DIRECTION == TEST_SS) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = ss_load_test(TEST_NUMBER_1_TO_11);
        // the_coords.pop(); // get rid of name
        ee("main start test coord ss", the_coords);
    } else if (TEST_DIRECTION == TEST_NN) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = nn_load_test(TEST_NUMBER_1_TO_11);
        // the_coords.pop(); // get rid of name
        ee("main start test coord nn", the_coords);
    } else if (TEST_DIRECTION == TEST_NE) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = ne_load_test(TEST_NUMBER_1_TO_11);
        // the_coords.pop(); // get rid of name
        ee("main start test coord ne", the_coords);
    } else if (TEST_DIRECTION == TEST_SW) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = sw_load_test(TEST_NUMBER_1_TO_11);
        // the_coords.pop(); // get rid of name
    } else if (TEST_DIRECTION == TEST_NW) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = nw_load_test(TEST_NUMBER_1_TO_11);
        // the_coords.pop(); // get rid of name
        ee("main start test coord nw", the_coords);
    } else if (TEST_DIRECTION == TEST_SE) {
        [the_coords, test_xyz_camera, test_xyz_lookat, test_name] = se_load_test(TEST_NUMBER_1_TO_11);
        // the_coords.pop(); // get rid of name
    }

    if (test_name !== "") {
        ee(`Physical mouse moving TEST NAME :: ${test_name} :: move forward to cause test`);
    }
}

export { startGameTiles };
