import { hexNewColor, flatWater } from "./hex-tile.js";

const NORMAL_HEIGHT = 0;
function hexfield(g_hex_tiles, g_angled_water, the_scene, start_x, end_x, base_color) {
    for (let x = start_x; x < end_x; x++) {
        [g_hex_tiles, g_angled_water] = hexRow(g_hex_tiles, g_angled_water, the_scene, x, -10, 10, base_color);
        //g_hex_tiles = hexRow(g_hex_tiles, the_scene, x, 0, 1, base_color);
    }
    return [g_hex_tiles, g_angled_water];
}

// row column
function hexRow(g_hex_tiles, g_angled_water, the_scene, x_row, start_z, end_z, base_color) {
    const top_color = 0x0000ff;
    const outline_color = 0x8888ff; // bronze   https://htmlcolorcodes.com/colors/shades-of-brown/
    //const six_side_colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffaaaa, 0xaaffaa, 0xaaaaff];

    const tile_colors = [top_color, outline_color];

    for (let z = start_z; z < end_z; z++) {
        g_hex_tiles = flatWater(g_hex_tiles, the_scene, [x_row, -1, z], tile_colors);
    }
    return [g_hex_tiles, g_angled_water];
}

function hexFlower(g_hex_tiles, x, z, center_color, outer_color) {
    hexNewColor(g_hex_tiles, x, z, center_color);

    hexNewColor(g_hex_tiles, x + 1, z, outer_color);
    hexNewColor(g_hex_tiles, x - 1, z, outer_color);
    hexNewColor(g_hex_tiles, x, z + 1, outer_color);
    hexNewColor(g_hex_tiles, x, z - 1, outer_color);

    hexNewColor(g_hex_tiles, x + 1, z - 1, outer_color);
    hexNewColor(g_hex_tiles, x - 1, z + 1, outer_color);
}

export { hexRow, hexfield, hexFlower };
