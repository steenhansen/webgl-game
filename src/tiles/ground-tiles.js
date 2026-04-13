import { groundTile } from "./hex-tile.js";

function ground_field(hex_tiles, ground_tiles, the_scene, start_x, end_x, base_color) {
    for (let x = start_x; x < end_x; x++) {
        [hex_tiles, ground_tiles] = groundRow(hex_tiles, ground_tiles, the_scene, x, -10, 10, base_color);
    }
    return [hex_tiles, ground_tiles];
}

function groundRow(hex_tiles, ground_tiles, the_scene, x_row, start_z, end_z, base_color) {
    const top_color = 0xff0000;
    const outline_color = 0xff8888;
    const tile_colors = [top_color, outline_color];
    for (let z = start_z; z < end_z; z++) {
        hex_tiles = groundTile(hex_tiles, the_scene, [x_row, -1, z], tile_colors);
    }
    return [hex_tiles, ground_tiles];
}

export { groundRow, ground_field };
