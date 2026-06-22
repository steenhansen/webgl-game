import { drawBreadcrumbs, renderRequest, resetUnderneath } from "../values/the-globals.js";
import { doSpin, recordPentagon } from "../pentagon/pentagon-coords.js";
import { ee, tt, EE, TT } from "./console-short.js";

import { PROD_ENVIRONMENT, RECORD_ENEMY_POINTS } from "../values/the-constants.js";
const e_environment = PROD_ENVIRONMENT;
const e_record_enemy_points = RECORD_ENEMY_POINTS;
let e_enemy_points = { copy_output: "" };

function minorTicks(the_objects, the_globals, f_cam_vect, f_prev_coords, f_this_coords, f_y100_height, frameTick) {
    drawBreadcrumbs(the_globals, f_cam_vect);
    doSpin(the_objects);
    f_y100_height = resetUnderneath(f_y100_height);
    recordPentagon(e_record_enemy_points, e_enemy_points, f_prev_coords, f_this_coords);
    renderRequest(the_globals, frameTick);
    return f_y100_height;
}

function drawFps(g_bench, now_time) {
    g_bench.begin();
    // monitored code
    g_bench.end();
    g_bench.nextFrame(now_time);
}

export { minorTicks, drawFps };
