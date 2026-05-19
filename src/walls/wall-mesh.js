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
    DoubleSide,
    RGB_ETC2_Format
} from "three";

import {
    WALL_NN,
    WALL_SS,
    WALL_NW,
    WALL_NE,
    WALL_SE,
    WALL_SW,
    X_INDX,
    Y_INDX,
    Z_INDX,
    TILT_NN,
    TILT_SS,
    TILT_NW,
    TILT_NE,
    TILT_SE,
    TILT_SW,
    TILT_NONE
} from "../constants.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { type_face } from "../helvetiker_regular.typeface.js";

var loader2 = new FontLoader();

const WHITE_LABELS = 0xffffff;
var the_font = loader2.parse(type_face);

function wallCoords(a_tile, x_y_z, wall_position, wall_height) {
    const [x_index, y_index, z_index] = x_y_z;
    var textMaterial = new MeshLambertMaterial({
        emissive: 0xffffff,
        color: WHITE_LABELS
    });
    const wall_text = `${x_index},${z_index}`; // ${wall_position}`;
    var textGeometry = new TextGeometry(wall_text, {
        font: the_font,
        size: 0.2,
        depth: 0,
        curveSegments: 12
    });
    var text_mesh = new Mesh(textGeometry, textMaterial);

    text_mesh.position.y = y_index + wall_height + 0.4; // qbert hard to see

    if (wall_position != TILT_NONE) {
        text_mesh.rotation.y = -Math.PI / 2;
        text_mesh.rotation.z = -Math.PI / 2;
    }
    let x, z;
    if (wall_position == TILT_NONE) {
        x = -0.15;
        z = 0.1;
    } else if (wall_position == WALL_NN) {
        x = -0.15;
        z = -0.55;
    } else if (wall_position == WALL_NE) {
        x = 0.3;
        z = -0.25;
    } else if (wall_position == WALL_SE) {
        x = 1;
        z = 0.4;
        //text_mesh.position.y -= 0.1;
    } else if (wall_position == WALL_SS) {
        x = -0.15;
        z = 0.48;
    } else if (wall_position == WALL_SW) {
        x = -0.6;
        z = 0.4;
    } else if (wall_position == WALL_NW) {
        x = +0.9;
        z = 0.25;
    } else {
        ee(" wallCoords() unknown wall_position", wall_position);
    }

    text_mesh.position.x = x;
    text_mesh.position.z = z;
    a_tile.add(text_mesh);
}

export { wallCoords }; //, geoMesh };
