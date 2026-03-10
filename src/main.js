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

var g_hex_tiles = new Map([]);
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
import { HexTile, HexTile2, hexNewColor } from "./tiles/hex-tile.js";

import { hexRow, hexfield, hexFlower } from "./tiles/field-tiles.js";

import { nearTile } from "./tiles/hover-tiles.js";
import { makeWave } from "./waves.js";
import { tiltTile, tipTileZx, doColumnTipTile, doRowTipTile } from "./tiles/tilt-tiles.js";

import { moveKeys, makeControls } from "./controls/key-controls.js";

import { XyzDot } from "./a-dot.js";

var doWaves = makeWave(-10, 20);

doWaves();
// doWaves();
// doWaves();
// doWaves();
// doWaves();
// doWaves();
// doWaves();
// doWaves();

doWaves();

const HI_DPI_ENABLE = Math.min(window.devicePixelRatio, 2);

const the_width = window.innerWidth;
const the_height = window.innerHeight;

const dark_gray = 0x202025;
const the_scene = AScene(dark_gray);

const the_fov = 75;
const width_height = [the_width, the_height];
const nf_planes = [0.1, 1000];
const xyz_camera = [8, 3, 7];

const persp_camera = PerspCamera(the_fov, width_height, nf_planes, xyz_camera);
persp_camera.lookAt(0, 1, 3);

the_scene.add(persp_camera);

const top_color = 0x8888ff;
const outline_color = 0x8888ff; // bronze   https://htmlcolorcodes.com/colors/shades-of-brown/
//const six_side_colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffaaaa, 0xaaffaa, 0xaaaaff];
const six_side_colors = [0x0000cc];
const tile_colors = [top_color, outline_color, six_side_colors];

const top_color2 = 0x8888ee;
const outline_color2 = 0x8888ff; // bronze   https://htmlcolorcodes.com/colors/shades-of-brown/
const six_side_colors2 = [0x0000cc];
const tile_colors2 = [top_color2, outline_color2, six_side_colors2];

//                                              x,y,z, height
g_hex_tiles = HexTile2(g_hex_tiles, the_scene, [1, 1, 1, 0], tile_colors2, "SW");
g_hex_tiles = HexTile2(g_hex_tiles, the_scene, [2, 0.5, 1, 0.5], tile_colors2, "NW");
g_hex_tiles = HexTile2(g_hex_tiles, the_scene, [3, 0, 1, 0.5], tile_colors2, "NW");

[g_hex_tiles, g_angled_water] = hexfield(g_hex_tiles, g_angled_water, the_scene, -10, 10, 0x3366ee, 0x33ee66);

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

const tick = () => {
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    const cam_pos = persp_camera.position;
    //console.log("cam_pos", cam_pos);

    persp_camera.getWorldDirection(vector);
    moveKeys(delta, controls);

    a_renderer.render(the_scene, persp_camera);

    window.requestAnimationFrame(tick);
};

tick();

function draw(now) {
    bench.begin();
    // monitored code
    bench.end();
    bench.nextFrame(now);
}
a_renderer.setAnimationLoop((now) => draw(now));
