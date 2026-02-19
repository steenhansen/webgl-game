import * as THREE from "three";

function XyzDot(the_scene, x, y, z, the_color) {
    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array([x, y, z]), 3));
    // console.log("xyDot", x, y, z);
    const dotMaterial = new THREE.PointsMaterial({ size: 0.4, color: the_color });
    const dot = new THREE.Points(dotGeometry, dotMaterial);

    // dot.position.x = 7.5;
    // dot.position.y = 0;
    // dot.position.z = 7.5;

    the_scene.add(dot);
}
export { XyzDot };
