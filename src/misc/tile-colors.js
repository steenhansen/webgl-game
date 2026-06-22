import { ee, tt, EE, TT } from "./console-short.js";

function seaColor(x_y_z, three_colors) {
    const [x_index, _y_height, z_index] = x_y_z;
    const c3 = (((x_index - z_index) % 3) + 3) % 3;
    const start_color = three_colors[c3];
    return start_color;
}

export { seaColor };
