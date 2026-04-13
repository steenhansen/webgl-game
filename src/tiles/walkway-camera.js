import { pointInsideTile } from "./hex-tile.js";
import { walkwayIncline } from "./walkway-heights.js";

function walkwayCamera(cam_pos, walkway_overlaps, walkway_tiles) {
    const trunc_cam_x = Math.trunc(cam_pos.x);
    const cam_y = cam_pos.y;
    const trunc_cam_z = Math.trunc(cam_pos.z);
    const xz_key = `${trunc_cam_x},${trunc_cam_z}`;
    let highest_y_tile = 0;
    let highest_xyz_tile = "";
    if (walkway_overlaps.has(xz_key)) {
        let poss_aboves = walkway_overlaps.get(xz_key);
        for (var i = 0; i < poss_aboves.length; i++) {
            let x_y_z_str = poss_aboves[i];
            let [xx, yy, zz] = x_y_z_str.split(",");
            let stair_tile = walkway_tiles.get(x_y_z_str);
            if (cam_y >= yy) {
                highest_y_tile = yy;
                highest_xyz_tile = x_y_z_str;
                const point_in = pointInsideTile(cam_pos.x, cam_pos.z, stair_tile);
                if (point_in) {
                    let new_cam_y = walkwayIncline(cam_pos, stair_tile);
                    cam_pos.y = new_cam_y;
                    break;
                }
            }
        }
    } else {
        if (cam_pos.y > 0.2) {
            cam_pos.y = cam_pos.y - 0.02;
        }
    }
    return cam_pos.y;
}
export { walkwayCamera };
