import { ee, tt, EE, TT } from "../misc/console-short.js";

//   http://localhost:5173/index-dev.html?figure=loop-walk
function figurePathway() {
    const location_search = window.location.search;
    const url_params = new URLSearchParams(location_search);
    if (url_params.has("figure")) {
        const url_name = url_params.get("figure");
        return url_name;
    }
    return "";
}

function translatePoint(x_org, y_org, z_org, x_shift, y_shift, z_shift) {
    let x_moved = parseInt(x_org) + x_shift;
    let y_moved = parseInt(y_org) + y_shift;
    let z_moved = parseInt(z_org) + z_shift;
    return [x_moved, y_moved, z_moved];
}

function createFigure(figure_name) {
    const empty_figure = {
        figure_name: figure_name,
        walkway_locs: [],
        fence_locs: [],
        trampoline_locs: [],
        pentagon_locs: []
    };
    return empty_figure;
}

function createStartFigure(figure_name, start_tile) {
    const empty_figure = {
        figure_name: figure_name,
        walkway_locs: [start_tile],
        fence_locs: [],
        trampoline_locs: [],
        pentagon_locs: []
    };
    return empty_figure;
}

function translateHex(walkway_tile, x_shift, y_shift, z_shift) {
    let translated_tile = [...walkway_tile];
    const [x_str, y_str, z_str] = walkway_tile;

    let x_moved = parseInt(x_str) + x_shift;
    let y_moved = parseInt(y_str) + y_shift;
    let z_moved = parseInt(z_str) + z_shift;

    translated_tile[0] = x_moved;
    translated_tile[1] = y_moved;
    translated_tile[2] = z_moved;
    return translated_tile;
}

function translateFigure(a_figure, x_shift, y_shift, z_shift) {
    const translated_figure = createFigure(a_figure.figure_name);

    let { walkway_locs, fence_locs, trampoline_locs } = a_figure;

    for (const walkway_tile of walkway_locs) {
        let translated_tile = translateHex(walkway_tile, x_shift, y_shift, z_shift);
        translated_figure.walkway_locs.push(translated_tile);
    }

    for (const fence_pair of fence_locs) {
        const [x_a, y_a, z_a] = fence_pair.hex_a;
        const [x_b, _y_b, z_b] = fence_pair.hex_b;
        const y_height = fence_pair.fence_height;
        const fence_a = [x_a, y_a, z_a];
        const fence_b = [x_b, y_a, z_b];
        let translated_fence_a = translateHex(fence_a, x_shift, y_shift, z_shift);
        let translated_fence_b = translateHex(fence_b, x_shift, y_shift, z_shift);
        const fence_translated = [translated_fence_a, translated_fence_b, y_height];
        translated_figure.fence_locs.push(fence_translated);
    }
    for (const trampoline_tile of trampoline_locs) {
        let translated_trampoline = translateHex(trampoline_tile, x_shift, y_shift, z_shift);
        translated_figure.trampoline_locs.push(translated_trampoline);
    }
    return translated_figure;
}

export { figurePathway, translateFigure, createStartFigure };
