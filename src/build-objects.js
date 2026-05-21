import { ee, tt, EE, TT } from "./console-short.js";

import { makeWalkway } from "./tiles/walkway-coords.js";
import { makeWalls } from "./walls/wall-coords.js";
import { makeTrampolines } from "./trampoline/trampoline-coords.js";
import { makePentagon } from "./pentagon/pentagon-coords.js";
import { ground_field } from "./tiles/ground-tiles.js";

function buildObjects(the_scene, GAME_WALLS, g_walkway_coords, g_trampolines, g_pentagons) {
    var g_ground_tiles = new Map([]);
    var g_object_meshes = new Map([]);
    var g_walkway_tiles = new Map([]);
    var g_wall_squares = new Map([]);
    var g_walkway_columns = new Map([]);
    var g_wall_columns = new Map([]);
    const g_game_walls_coords = GAME_WALLS;

    [g_object_meshes, g_walkway_tiles, g_walkway_columns] = makeWalkway(the_scene, g_object_meshes, g_walkway_coords, g_walkway_tiles, g_walkway_columns);
    [g_object_meshes, g_wall_squares, g_wall_columns] = makeWalls(the_scene, g_object_meshes, g_game_walls_coords, g_wall_squares, g_wall_columns);
    [g_object_meshes, g_ground_tiles] = ground_field(the_scene, g_object_meshes, g_ground_tiles, -10, 10, 0x3366ee, 0x33ee66);
    /////
    tt(g_trampolines);

    [g_object_meshes, g_trampolines] = makeTrampolines(the_scene, g_object_meshes, g_trampolines);
    let the_pentagon_mesh;
    [the_pentagon_mesh, g_pentagons] = makePentagon(the_scene, g_object_meshes, g_pentagons);

    return {
        g_object_meshes,
        g_walkway_tiles,
        g_walkway_columns,
        g_wall_squares,
        g_wall_columns,
        g_ground_tiles,
        g_trampolines,
        g_pentagons,
        the_pentagon_mesh
    };
}
const HI_DPI_ENABLE = Math.min(window.devicePixelRatio, 2);
import { AScene } from "./a-scene.js";
import { PerspCamera } from "./perspective-camera.js";
function buildScene(test_xyz_camera) {
    const the_width = window.innerWidth - 200;
    const the_height = window.innerHeight - 300;
    const dark_gray = 0x202025;
    const the_scene = AScene(dark_gray);
    const the_fov = 75;
    const width_height = [the_width, the_height];
    const nf_planes = [0.1, 1000];
    const persp_camera = PerspCamera(the_fov, width_height, nf_planes, test_xyz_camera);

    return { the_scene, persp_camera, the_width, the_height };
}

import * as THREE from "three";
import GLBench from "gl-bench/dist/gl-bench.module";
function buildRenderer(the_scene, the_width, the_height) {
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
    return { a_renderer, bench };
}

function buildListener(persp_camera) {
    window.addEventListener("resize", () => {
        let new_width = window.innerWidth;
        let new_height = window.innerHeight;

        projMatrix(persp_camera, [new_width, new_height]);

        a_renderer.setSize(new_width, new_height);
        a_renderer.setPixelRatio(HI_DPI_ENABLE);
    });
}

export { buildObjects, buildScene, buildRenderer, buildListener };
