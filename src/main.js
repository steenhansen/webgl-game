var g_hex_tiles = new Map([]);
var g_covered_tiles = new Map([]);

//const xyz_camera = [5, 3, 0];
//const xyz_camera = [5, 5, 0];
//const xyz_camera = [11, 12, 22];

//const xyz_camera = [4, 6, 6];
const xyz_camera = [1.6, 1, 8.8];

import * as THREE from "three";

import GLBench from "gl-bench/dist/gl-bench.module";

import { PerspCamera, projMatrix } from "./perspective-camera.js";
import { AScene } from "./a-scene.js";
//import { ACube } from "./a-cube.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { HexTile, nearTile, hexRow, hexfield, hexFlower, hexNewColor, rowTilt, columnTilt, xzTilt } from "./hex-tile.js";

import { XyzDot } from "./a-dot.js";

const HI_DPI_ENABLE = Math.min(window.devicePixelRatio, 2);

const the_width = window.innerWidth;
const the_height = window.innerHeight;

const dark_gray = 0x202025;
const the_scene = AScene(dark_gray);

const the_fov = 75;
const width_height = [the_width, the_height];
const nf_planes = [0.1, 1000];
//const xyz_camera = [0, 0, 0];

const persp_camera = PerspCamera(the_fov, width_height, nf_planes, xyz_camera);
//persp_camera.lookAt(1, 2, 2);
persp_camera.lookAt(1, 2, 18);

the_scene.add(persp_camera);

g_hex_tiles = hexfield(g_hex_tiles, the_scene, 0, 10, 0x3366ee, 0x33ee66);

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

const controls = new PointerLockControls(persp_camera, document.body);

// controls.minPolarAngle = Math.PI / 2; // Limit upward rotation
// controls.maxPolarAngle = Math.PI / 2; // Limit downward rotation (e.g., no looking behind)

document.body.addEventListener("click", () => {
    controls.lock();
});

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

const onKeyDown = function (event) {
    switch (event.code) {
        case "ArrowUp":
        case "KeyW":
            moveForward = true;
            break;
        case "ArrowLeft":
        case "KeyA":
            moveLeft = true;
            break;
        case "ArrowDown":
        case "KeyS":
            moveBackward = true;
            break;
        case "ArrowRight":
        case "KeyD":
            moveRight = true;
            break;
    }
};

const onKeyUp = function (event) {
    switch (event.code) {
        case "ArrowUp":
        case "KeyW":
            moveForward = false;
            break;
        case "ArrowLeft":
        case "KeyA":
            moveLeft = false;
            break;
        case "ArrowDown":
        case "KeyS":
            moveBackward = false;
            break;
        case "ArrowRight":
        case "KeyD":
            moveRight = false;
            break;
    }
};

document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

var rot = Math.PI / 6;
// XyzDot(the_scene, 5, 1, 5, 0xff0000);
// XyzDot(the_scene, 15, 1, 5, 0x0000ff);
// XyzDot(the_scene, 15, 1, 15, 0x00ff00);
// XyzDot(the_scene, 5, 1, 15, 0x44aaff);
// XyzDot(the_scene, 10, 2, 10, 0xffffff);

//tipTile(g_hex_tiles, 1, 1, 0.05, 0xffccaa);

/**
 * 7. ANIMATION LOOP
 */
const clock = new THREE.Clock();
const vector = new THREE.Vector3(); // create once and reuse it!

columnTilt(g_hex_tiles, 6, 3, 4, 0xff2222);
xzTilt(g_hex_tiles, 7, 2, 3, 0x22ff22); // perfect green old x-rotate once trick easy

rowTilt(g_hex_tiles, 2, 6, 7, 0xcccccc);

const tick = () => {
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    //w tipTile(g_hex_tiles, 1, 1, elapsedTime / 1, 0xffccaa);

    const cam_pos = persp_camera.position;

    persp_camera.getWorldDirection(vector);

    //  console.log("cam_pos", cam_pos, vector);

    //  FOOTpRINT
    //  g_covered_tiles = nearTile(g_hex_tiles, g_covered_tiles, cam_pos.x, cam_pos.z);

    const speed = 10 * delta;
    if (moveForward) controls.moveForward(speed);
    if (moveBackward) controls.moveForward(-speed);

    if (moveLeft) controls.moveRight(-speed);
    if (moveRight) controls.moveRight(speed);
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
