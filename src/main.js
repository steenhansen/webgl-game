import { ee, tt, dd, EE, TT, DD } from "./values/the-globals.js";

import { moveCamera, followCamera, camVectCoords } from "./controls/perspective-camera.js";
import { bouncePlayer } from "./trampolines/player-moves.js";
import { minorTicks } from "./misc/minor-routines.js";
import { currentHexIdxs } from "./tiles/hex-routines.js";
import { frame_vars, e_do_click, the_globals, the_objects } from "./values/start-up.js";

let { f_this_coords, f_y100_height, f_bounce_speed, f_step_iterations, f_cam_vect, f_this_hex, f_prev_hex } = frame_vars;
let { g_camera, f_prev_coords, f_fall_step_size, f_rise_step_size, f_jump_x_step, f_jump_z_step, f_move_result } = frame_vars;

//g_camera.position.x = 0;
//g_camera.position.y = 11.999864555812998;
//g_camera.position.z = -0.8662599999979148; // exactly on angled piece

const frameTick = () => {
    [f_cam_vect, f_this_coords] = camVectCoords(g_camera, f_y100_height);
    let frame_vars = {
        f_step_iterations, // 20
        f_bounce_speed, // 4
        f_cam_vect, //     Vector3 {x: -1.36, y: 12, z: 0.58}
        f_fall_step_size, //    20
        f_rise_step_size, //    21
        f_jump_x_step, //  0.13
        f_jump_z_step, //  0.31
        f_move_result, //  MV_TILE_SAME
        f_prev_coords, //  {x: -1.17, y: 1100, z: -0.21}
        f_prev_hex, //     -1,1000,0
        f_this_coords, //  {x: -1.17, y: 1100, z: -0.32}
        f_this_hex, //     -2,900,1
        f_y100_height //   1100
    };

    let changed_vars = followCamera(the_objects, frame_vars, e_do_click, g_camera);
    ({ f_step_iterations, f_rise_step_size, f_prev_hex, f_bounce_speed, f_move_result, f_y100_height } = changed_vars);
    ({ f_this_hex, f_jump_x_step, f_jump_z_step, f_fall_step_size, f_prev_coords, f_this_coords } = changed_vars);

    f_y100_height = minorTicks(the_objects, the_globals, f_cam_vect, f_prev_coords, f_this_coords, f_y100_height, frameTick);
    const hex_data = { f_prev_coords, f_this_coords, f_y100_height, f_move_result, f_cam_vect };
    [f_prev_coords, f_this_coords, f_y100_height] = currentHexIdxs(hex_data);
    g_camera = moveCamera(the_globals, the_objects, f_this_coords, f_y100_height, f_move_result);

    const bounce_data = { f_step_iterations, f_move_result, g_camera, f_jump_x_step, f_jump_z_step, f_y100_height };
    [f_step_iterations, g_camera] = bouncePlayer(bounce_data, the_objects.o_unvisited_tiles);
};

frameTick();
