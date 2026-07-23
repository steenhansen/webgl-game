import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";
import { SEA_COLORS, SEA_EDGE, WALK_BEFORE_COLORS, WALK_EDGE } from "../values/color-consts.js";
import { makeWalkway } from "../walkways/walkway-coords.js";
import { makeFences } from "../fences/make-fences.js";
import { makeTrampolines } from "../trampolines/trampoline-coords.js";
import { placePentagons } from "../pentagons/pentagon-coords.js";
import { ground_field } from "../tiles/ground-tiles.js";

import * as THREE from "three";
import GLBench from "gl-bench/dist/gl-bench.module";
import { AScene } from "../objects/a-scene.js";
import { PerspCamera, projMatrix } from "../camera/perspective-camera.js";

import { startPentagons } from "../pentagons/pentagon-coords.js";

function buildObjects(g_scene, o_fence_ndxs, o_walkway_ndxs, o_trampolines, o_pentagons, o_unvisited_tiles) {
    var o_ground_tiles = new Map([]);

    var o_object_meshes = new Map([]);

    var o_walkway_tiles = new Map([]);
    var o_walkway_columns = new Map([]);

    var o_fence_walls = new Map([]);
    var o_fence_columns = new Map([]);

    [o_object_meshes, o_walkway_tiles, o_walkway_columns] = makeWalkway(g_scene, o_object_meshes, o_walkway_ndxs, o_walkway_tiles, o_walkway_columns);

    [o_object_meshes, o_fence_walls, o_fence_columns] = makeFences(g_scene, o_object_meshes, o_fence_ndxs, o_fence_walls, o_fence_columns);

    [o_object_meshes, o_ground_tiles] = ground_field(g_scene, o_object_meshes, o_ground_tiles, -10, 10, SEA_COLORS, SEA_EDGE);

    let o_trampoline_meshes;
    [o_trampoline_meshes, o_trampolines] = makeTrampolines(g_scene, o_trampolines);

    let o_pentagon_meshes;
    o_pentagon_meshes = placePentagons(g_scene, o_object_meshes, o_pentagons);
    return {
        o_fence_walls,
        o_object_meshes,
        o_walkway_tiles,
        o_walkway_columns,
        o_fence_ndxs,
        o_fence_columns,
        o_ground_tiles,
        o_trampolines,
        o_trampoline_meshes,
        o_pentagons,
        o_pentagon_meshes,
        o_unvisited_tiles
    };
}
const HI_DPI_ENABLE = Math.min(window.devicePixelRatio, 2);

function buildScene() {
    const g_width = window.innerWidth - 10;
    const g_height = window.innerHeight - 35;
    const dark_gray = 0x202025;
    const g_scene = AScene(dark_gray);
    const the_fov = 75;
    const width_height = [g_width, g_height];
    const nf_planes = [0.1, 1000];
    const g_camera = PerspCamera(the_fov, width_height, nf_planes);

    return { g_scene, g_camera, g_width, g_height };
}

function buildRenderer(g_scene, g_width, g_height) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    g_scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 10);
    pointLight.position.set(2, 3, 4);
    g_scene.add(pointLight);

    const axesHelper = new THREE.AxesHelper(5); // xyz -> rgb
    g_scene.add(axesHelper);

    const g_renderer = new THREE.WebGLRenderer({ antialias: true });
    g_renderer.setSize(g_width, g_height);
    g_renderer.setPixelRatio(HI_DPI_ENABLE);
    document.body.appendChild(g_renderer.domElement);

    let g_bench = new GLBench(g_renderer.getContext());
    return { g_renderer, g_bench };
}

function buildListener(g_camera, g_renderer) {
    window.addEventListener("resize", () => {
        let new_width = window.innerWidth;
        let new_height = window.innerHeight;

        projMatrix(g_camera, [new_width, new_height]);

        g_renderer.setSize(new_width, new_height);
        g_renderer.setPixelRatio(HI_DPI_ENABLE);
    });
}

export { buildObjects, buildScene, buildRenderer, buildListener };
