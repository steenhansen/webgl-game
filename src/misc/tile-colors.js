import { ee, tt, EE, TT } from "./console-short.js";

function tile3color(x_y_z, tile_3colors) {
    // tt(tile_3colors);
    let { start_3colors, light_3colors, dark_3colors, edge_3colors } = tile_3colors;
    const [x_index, _y_height, z_index] = x_y_z;
    const c3 = (((x_index - z_index) % 3) + 3) % 3;
    const start_color = start_3colors[c3];
    const light_color = light_3colors[c3];
    const dark_color = dark_3colors[c3];
    const edge_color = edge_3colors[c3];
    return { start_color, light_color, dark_color, edge_color };
}

export { tile3color };
