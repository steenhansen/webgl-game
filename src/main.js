var g_walkway_meshes = new Map([]);
var g_walkway_overlaps = new Map([]);
var g_walkway_tiles = new Map([]);
var g_ground_tiles = new Map([]);

import * as THREE from "three";
import GLBench from "gl-bench/dist/gl-bench.module";
import { PerspCamera, projMatrix } from "./perspective-camera.js";

import { AScene } from "./a-scene.js";
import { makeWalkway } from "./tiles/walkway-coords.js";
import { walkwayCamera } from "./tiles/walkway-camera.js";
import { ground_field, groundTile } from "./tiles/ground-tiles.js";
import { moveKeys, makeControls } from "./controls/key-controls.js";
import { XyzDot } from "./a-dot.js";
import { tileCenterCoord } from "./tiles/hex-tile.js";

import { START_X_HEX, START_Y_HEX, START_Z_HEX, START_X_LOOK, START_Y_LOOK, START_Z_LOOK } from "./constants.js";

const HI_DPI_ENABLE = Math.min(window.devicePixelRatio, 2);

const the_width = window.innerWidth - 200;
const the_height = window.innerHeight - 300;

const dark_gray = 0x202025;
const the_scene = AScene(dark_gray);

const the_fov = 75;
const width_height = [the_width, the_height];
const nf_planes = [0.1, 1000];

let [x_cam, z_cam] = tileCenterCoord(START_X_HEX, START_Z_HEX);
const xyz_camera = [x_cam, START_Y_HEX, z_cam];

const persp_camera = PerspCamera(the_fov, width_height, nf_planes, xyz_camera);

let [x_look, z_look] = tileCenterCoord(START_X_LOOK, START_Z_LOOK);
persp_camera.lookAt(x_look, START_Y_LOOK, z_look);

the_scene.add(persp_camera);

const top_color = 0x8888ff;
const outline_color = 0x8888ff;
const six_side_colors = [0x0000cc];
const tile_colors = [top_color, outline_color, six_side_colors];

const top_color2 = 0x88ee88;
const outline_color2 = 0x88ff88;

const tile_colors2 = [top_color2, outline_color2];

[g_walkway_meshes, g_walkway_tiles, g_walkway_overlaps] = makeWalkway(the_scene, g_walkway_meshes, g_walkway_tiles, g_walkway_overlaps, tile_colors2);

[g_walkway_meshes, g_ground_tiles] = ground_field(g_walkway_meshes, g_ground_tiles, the_scene, -10, 10, 0x3366ee, 0x33ee66);

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

var last_x = 0;
var last_z = 0;
const tick = () => {
    const delta = clock.getDelta();
    const cam_pos = persp_camera.position;
    cam_pos.y = walkwayCamera(cam_pos, g_walkway_overlaps, g_walkway_tiles);
    XyzDot(the_scene, cam_pos.x, cam_pos.y, cam_pos.z, 0x666666);
    persp_camera.getWorldDirection(vector);
    moveKeys(delta, controls);
    a_renderer.render(the_scene, persp_camera);
    window.requestAnimationFrame(tick);
    if (cam_pos.x != last_x || cam_pos.z != last_z) {
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
