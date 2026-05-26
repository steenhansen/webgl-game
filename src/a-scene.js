import { ee, tt, EE, TT } from "./misc/console-short.js";

import {
    EdgesGeometry,
    Vector3,
    MeshPhongMaterial,
    Box3,
    InstancedMesh,
    LineBasicMaterial,
    LineSegments,
    BufferGeometry,
    Float32BufferAttribute,
    MeshLambertMaterial,
    Group,
    Mesh,
    AmbientLight,
    DoubleSide,
    RGB_ETC2_Format
} from "three";

import { Scene, Color } from "three";

function AScene(background_color) {
    const a_scene = new Scene();

    const ambientLight = new AmbientLight(0xffffff, 1);
    a_scene.add(ambientLight);

    a_scene.background = new Color(background_color);
    return a_scene;
}

export { AScene };
