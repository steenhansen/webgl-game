import { ee, tt, EE, TT } from "../console-short.js";

function testTile(x_index, z_index) {
    var new_tile = {
        x_center: x_index,
        z_center: z_index,
        x_z: `${x_index},${z_index}`
    };
    return new_tile;
}

function testAngledTile(x_index, y_position, z_index, tilt_up) {
    var new_tile = {
        x_center: x_index,
        y_position: y_position,
        z_center: z_index,
        tilt_up: tilt_up,
        x_z: `${x_index},${z_index}`
    };
    return new_tile;
}

export { testTile, testAngledTile };
