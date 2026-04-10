/*

what if to make ramp, we dont rotate just make ready make



so     /-----------------\        height 20     NO rotating
      /                   \
     /                     \
    /                       \
   /                         \       height
   \                         /
    \                       /
     \                     /
       -------------------         hieght 10

       /-------------------\       height 10




So we have a bunch of flat hexagons, then a hexagon with different hieghts is made for a ramp





        




















*/

var g_stair_meshes = new Map([]); //
var g_stair_overlaps = new Map([]); // g_stacked_stairs
var g_stair_tiles = new Map([]); // g_stair_centers

var g_angled_water = new Map([]);
var g_covered_tiles = new Map([]);

//const xyz_camera = [5, 3, 0];
//const xyz_camera = [5, 5, 0];
//const xyz_camera = [11, 12, 22];

//const xyz_camera = [4, 6, 6];
//const xyz_camera = [1.6, 1, 8.8];

import * as THREE from "three";

import GLBench from "gl-bench/dist/gl-bench.module";

import { PerspCamera, projMatrix } from "./perspective-camera.js";
import { AScene } from "./a-scene.js";
import { findIncline, crissCross, pointInHex, HexRamp, hexNewColor } from "./tiles/hex-tile.js";

import { hexRow, hexfield, hexFlower } from "./tiles/field-tiles.js";

import { nearTile } from "./tiles/hover-tiles.js";
//import { makeWave } from "./waves.js";
import { tiltTile, tipTileZx, doColumnTipTile, doRowTipTile } from "./tiles/tilt-tiles.js";

import { moveKeys, makeControls } from "./controls/key-controls.js";

import { XyzDot } from "./a-dot.js";


const HI_DPI_ENABLE = Math.min(window.devicePixelRatio, 2);

const the_width = window.innerWidth;
const the_height = window.innerHeight;

const dark_gray = 0x202025;
const the_scene = AScene(dark_gray);

const the_fov = 75;
const width_height = [the_width, the_height];
const nf_planes = [0.1, 1000];
const xyz_camera = [4, 3, 7]; /// these are xyz NOT hex indexes

const persp_camera = PerspCamera(the_fov, width_height, nf_planes, xyz_camera);
persp_camera.lookAt(4,3,7); //0, 0, 0);

the_scene.add(persp_camera);

const top_color = 0x8888ff;
const outline_color = 0x8888ff; // bronze   https://htmlcolorcodes.com/colors/shades-of-brown/
//const six_side_colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffaaaa, 0xaaffaa, 0xaaaaff];
const six_side_colors = [0x0000cc];
const tile_colors = [top_color, outline_color, six_side_colors];

const top_color2 = 0x88ee88;
const outline_color2 = 0x88ff88; // bronze   https://htmlcolorcodes.com/colors/shades-of-brown/

const tile_colors2 = [top_color2, outline_color2];

let xx = crissCross([0, 0, 10, 10], [0, 1, 1, 0]);


const the_ramp = [
    ["001", "04.0", "002"],     
    ["001", "04.0", "001"],     
    ["001", "04.0", "000"],     
    ["002", "04.0", "-01"],     
    ["003", "04.0", "-01"],     
    // x,     y,      z,  incline_dir, incline_amount
    ["003", "03.0", "000", "NN", 1.0],     
    ["003", "02.0", "001", "NN", 1.0],     
    ["003", "01.0", "002", "NN", 1.0],     
    ["003", "01.0", "003"],     
    ["004", "01.0", "003", "SE", 0.5],     
    ["005", "01.5", "003", "SE", 0.5],     
    ["006", "02.0", "003", "SE", 0.5],     
    ["002", "01.0", "004", "SW", 0.2],   
    ["001", "01.2", "005", "SW", 0.2],   
    ["000", "01.4", "006", "SW", 0.2],   
];

for (var i = 0; i < the_ramp.length; i++) {
    const ramp_piece = the_ramp[i];
    const [x_str, y_str, z_str] = ramp_piece;
    const x_index = parseInt(x_str);
    const y_index = parseFloat(y_str);
    const z_index = parseInt(z_str);
    const ramp_xyz = [x_index, y_index, z_index];

    if (ramp_piece.length == 3) {
        // HexStairs
        [g_stair_meshes, g_stair_tiles, g_stair_overlaps] = HexRamp(g_stair_meshes, g_stair_tiles, g_stair_overlaps, the_scene, ramp_xyz, tile_colors2);
    } else {
        const incline_and_dir = [ramp_piece[3], ramp_piece[4]];
        [g_stair_meshes, g_stair_tiles, g_stair_overlaps] = HexRamp(
            g_stair_meshes,
            g_stair_tiles,
            g_stair_overlaps,
            the_scene,
            ramp_xyz,
            tile_colors2,
            incline_and_dir
        );
    }
}
//console.log("g_stair_meshes", g_stair_meshes); // stair_meshes
//console.log("g_stair_tiles", g_stair_tiles); // stair_tiles
//console.log("g_stair_overlaps", g_stair_overlaps); // stair_overlaps
[g_stair_meshes, g_angled_water] = hexfield(g_stair_meshes, g_angled_water, the_scene, -10, 10, 0x3366ee, 0x33ee66);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
the_scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.set(2, 3, 4);
the_scene.add(pointLight);

const axesHelper = new THREE.AxesHelper(5); // xyz -> rgb
the_scene.add(axesHelper);

const a_renderer = new THREE.WebGLRenderer({ antialias: true });
a_renderer.setSize(the_width, the_height);
a_renderer.setPixelRatio(HI_DPI_ENABLE);
document.body.appendChild(a_renderer.domElement);

let bench = new GLBench(a_renderer.getContext());

window.addEventListener("resize", () => {
    let the_width = window.innerWidth;
    let the_height = window.innerHeight;

    projMatrix(persp_camera, [the_width, the_height]);

    a_renderer.setSize(the_width, the_height);
    a_renderer.setPixelRatio(HI_DPI_ENABLE);
});

let controls = makeControls(persp_camera);

var rot = Math.PI / 6;

/**
 * 7. ANIMATION LOOP
 */
const clock = new THREE.Clock();
const vector = new THREE.Vector3(); // create once and reuse it!


var last_x=0;
var last_z=0;
const tick = () => {
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();
    const cam_pos = persp_camera.position;
console.log("camp_pos", cam_pos)
    let cam_pos_t =  {x: 1.1, y: 2.3, z: 5.8}; // positive line side
  //  let cam_pos_t =  {x: 1.9, y: 2.3, z: 6.8}; // negative line side

      const trunc_cam_x = Math.trunc(cam_pos.x); 
    const cam_y = cam_pos.y;
    const trunc_cam_z = Math.trunc(cam_pos.z);
    const xz_key = `${trunc_cam_x},${trunc_cam_z}`;
    let highest_y_tile = 0;
    let highest_xyz_tile = "";
    if (g_stair_overlaps.has(xz_key)) {
        let poss_aboves = g_stair_overlaps.get(xz_key);
        for (var i = 0; i < poss_aboves.length; i++) {
            let x_y_z_str = poss_aboves[i];
            let [xx, yy, zz] = x_y_z_str.split(","); 
            let stair_tile = g_stair_tiles.get(x_y_z_str);
//            if (xx>=0 && xx<10 && zz>=0 && zz<10){
            if (1){
                if (cam_y >= yy) {
                    highest_y_tile = yy;
                    highest_xyz_tile = x_y_z_str;
                    const point_in = pointInHex(cam_pos.x, cam_pos.z, stair_tile);
                    if (point_in) {
                        let new_cam_y =findIncline(cam_pos, stair_tile);
                        cam_pos.y= new_cam_y;
                    } else {
              //           console.log("point NOT IN", x_y_z_str)
                    }
                }else{
                //    console.log("cam_y not >= yy", cam_y, yy)
                }
            }else {
          //  console.log("NO xx, zz", xx,zz)
            }



        }
    }else {
        if (cam_pos.y > 0.2){
             cam_pos.y =cam_pos.y-0.02;
        }
    }
    XyzDot(the_scene, cam_pos.x, cam_pos.y, cam_pos.z, 0x666666);
    persp_camera.getWorldDirection(vector);
    moveKeys(delta, controls);
    a_renderer.render(the_scene, persp_camera);
    window.requestAnimationFrame(tick);
        if (cam_pos.x != last_x || cam_pos.z != last_z){
        last_x = cam_pos.x;
        last_z = cam_pos.z;
    }
   
};

tick();

function draw(now) {
    bench.begin();
    // monitored code
    bench.end();
    bench.nextFrame(now);
}
a_renderer.setAnimationLoop((now) => draw(now));
