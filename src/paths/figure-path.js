import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";

import { tileIndex2floatCoords } from "../misc/hex-maths.js";

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

//          string
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

function translateFloatCoordsOffsets(walkway_tile, x_shift, y_shift, z_shift) {
    let translated_tile = [...walkway_tile];
    const [x_int, y_int, z_int] = walkway_tile;

    let x_moved = x_int + x_shift;

    let y_moved = y_int + y_shift;
    let z_moved = z_int + z_shift;

    translated_tile[0] = x_moved;
    translated_tile[1] = y_moved;
    translated_tile[2] = z_moved;
    return translated_tile;
}

function createStartFigure(figure_name, start_tile) {
    const empty_figure = {
        FIGURE__NAME: figure_name,
        WALKWAY__LOCS: [start_tile],
        FENCE__LOCS: [],
        ENEMY__LOCS: [],
        TRAMPOLINE__LOCS: [],
        PENTAGON__LOCS: []
    };
    return empty_figure;
}

function createFigure(figure_name, a_figure) {
    const empty_figure = {
        FIGURE__NAME: figure_name,
        WALKWAY__LOCS: []
        // FENCE__LOCS: [],
        // ENEMY__LOCS: [],
        // TRAMPOLINE__LOCS: [],
        // PENTAGON__LOCS: []
    };
    if (a_figure.FENCE__LOCS) {
        empty_figure.FENCE__LOCS = [];
    }
    if (a_figure.ENEMY__LOCS) {
        empty_figure.ENEMY__LOCS = [];
    }
    if (a_figure.TRAMPOLINE__LOCS) {
        empty_figure.TRAMPOLINE__LOCS = [];
    }
    return empty_figure;
}

function translateFigure(a_figure, x_shift, y_shift, z_shift) {
    let { FIGURE__NAME, WALKWAY__LOCS, FENCE__LOCS, TRAMPOLINE__LOCS, ENEMY__LOCS } = a_figure;
    const new_combined_name = `${FIGURE__NAME}_${x_shift}_${y_shift}_${z_shift}`;
    const empty_figure = {
        FIGURE__NAME: new_combined_name,
        WALKWAY__LOCS: [],
        FENCE__LOCS: [],
        TRAMPOLINE__LOCS: [],
        ENEMY__LOCS: {}
    };

    if (WALKWAY__LOCS) {
        for (const walkway_tile of WALKWAY__LOCS) {
            let translated_tile = translateHex(walkway_tile, x_shift, y_shift, z_shift); // x_coord_shift, ...
            empty_figure.WALKWAY__LOCS.push(translated_tile);
            tt("translated_tile, z_coord_offset", walkway_tile, translated_tile, x_shift, y_shift, z_shift);
        }
    }

    if (ENEMY__LOCS) {
        //   let x_coord_offset, z_coord_offset;
        // tt("ENEMY__LOCS", ENEMY__LOCS.length > 0, ENEMY__LOCS);
        //  if (ENEMY__LOCS.length > 0) {
        //tt("translateFigure, a_figure", a_figure);
        //tt("translateFigure, shifts", x_shift, y_shift, z_shift);
        let [x_coord_offset, z_coord_offset] = tileIndex2floatCoords(x_shift, z_shift);
        //tt("translateFigure, OFFSETS", x_coord_offset, z_coord_offset);
        // }
        // x_shift = -1;
        // z_shift = 0;
        //   y_shift = 0.4;
        for (const figure_id in ENEMY__LOCS) {
            let an_enemy_list = ENEMY__LOCS[figure_id];
            empty_figure.ENEMY__LOCS[figure_id] = [];
            let enemy_list = an_enemy_list.ENEMY_X_Y_Z;
            const start_at_perc = an_enemy_list.START_ENEMY_IND;
            const index_iteration = an_enemy_list.INDEX_ITERATION;
            let translated_locations = [];
            // tt("enemy_list", enemy_list.length > 0, enemy_list);
            // if (enemy_list.length > 0) {
            //     tt("translateFigure, a_figure", a_figure);
            //     tt("translateFigure, shifts", x_shift, y_shift, z_shift);
            //     [x_coord_offset, z_coord_offset] = tileIndex2floatCoords(x_shift, z_shift);
            //     tt("translateFigure, OFFSETS", x_coord_offset, z_coord_offset);
            // }
            if (enemy_list.length > 0) {
                //  tt("x_coord_offset, z_coord_offset", x_coord_offset, z_coord_offset);
            }
            for (const enemy_pos of enemy_list) {
                //                const translated_hex = translateFloatCoordsOffsets(enemy_pos, x_shift, y_shift, z_shift);
                const translated_hex = translateFloatCoordsOffsets(enemy_pos, x_coord_offset, y_shift, z_coord_offset);
                //   tt("enemy_pos", enemy_pos);
                //  tt("translated_hex", translated_hex);
                //  tt("enemy_pos, translated_hex", enemy_pos, translated_hex);
                translated_locations.push(translated_hex);
            }
            const enemey_locations = { ENEMY_X_Y_Z: translated_locations, START_ENEMY_IND: start_at_perc, INDEX_ITERATION: index_iteration };
            empty_figure.ENEMY__LOCS[figure_id] = enemey_locations;
        }
    }
    return empty_figure;
}

function translateShape(WALKWAY__LOCS, x_shift, y_shift, z_shift) {
    const translated_shape = [];
    for (const walkway_tile of WALKWAY__LOCS) {
        let translated_tile = translateHex(walkway_tile, x_shift, y_shift, z_shift);
        translated_shape.push(translated_tile);
    }
    return translated_shape;
}

function shape2figure(the_name, the_shape) {
    const a_figure = {
        FIGURE__NAME: the_name,
        WALKWAY__LOCS: the_shape
        //    FENCE__LOCS: [],
        // TRAMPOLINE__LOCS: [],
        //PENTAGON__LOCS: []
    };

    return a_figure;
}

export { figurePathway, translateFigure, translateShape, createStartFigure, shape2figure };
