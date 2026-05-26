import { ee, tt, EE, TT } from "../misc/console-short.js";

function hexIndex(x_hex_ind, y_height, z_hex_ind) {
    let y_fixed_to_10ths = Math.trunc(y_height * 10) / 10;

    let hex_index = `${x_hex_ind},${y_fixed_to_10ths},${z_hex_ind}`;
    return hex_index;
}

function stripYindex(hex_index) {
    let [x_hex_ind, _y_height, z_hex_ind] = hex_index.split(",");
    return `${x_hex_ind},${z_hex_ind}`;
}

export { hexIndex, stripYindex };
