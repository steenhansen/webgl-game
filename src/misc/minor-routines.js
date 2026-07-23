import { ee, tt, dd, EE, TT, DD } from "./console-short.js";

import { drawBreadcrumbs, renderRequest, resetUnderneath } from "../values/the-globals.js";
import { doSpin } from "../pentagons/pentagon-coords.js";

import { recordEnemy } from "../enemies/record-figure.js";
//record-enemy.js
import { PROD_ENVIRONMENT, RECORD_ENEMY_POINTS } from "../values/the-constants.js";
const e_environment = PROD_ENVIRONMENT;
const e_record_enemy_points = RECORD_ENEMY_POINTS;
//let e_enemy_points = { copy_output: "" };

function minorTicks(the_objects, the_globals, f_cam_vect, f_prev_coords, f_this_coords, f_y100_height, frameTick, f_enemy_inds) {
    // tt("minorticks, f_cam_vect", f_cam_vect);
    drawBreadcrumbs(the_globals, f_cam_vect);
    f_enemy_inds = doSpin(the_objects, f_enemy_inds);
    f_y100_height = resetUnderneath(f_y100_height);
    //recordPentagon(e_record_enemy_points, e_enemy_points, f_prev_coords, f_this_coords);

    recordEnemy(e_record_enemy_points, the_globals.g_enemy_points, f_cam_vect, f_prev_coords, f_this_coords);

    renderRequest(the_globals, frameTick);
    return [f_y100_height, f_enemy_inds];
}

function drawFps(g_bench, now_time) {
    g_bench.begin();
    // monitored code
    g_bench.end();
    g_bench.nextFrame(now_time);
}

// let [my_map, my_figure] = urlMapTrace(window.location.search)
function urlMapTrace(query_string) {
    //const query_string = window.location.search;
    const url_params = new URLSearchParams(query_string);
    const my_map = url_params.get("map");
    const my_figure = url_params.get("trace-route");
    return [my_map, my_figure];
}

export { minorTicks, drawFps, urlMapTrace };
