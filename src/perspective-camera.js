import { PerspectiveCamera } from "three";

function PerspCamera(the_fov, width_height, nf_planes, xyz_pos) {
    const [camera_width, camera_height] = width_height;
    const [near_plane, far_plane] = nf_planes;
    const camera_aspect = camera_width / camera_height;
    const persp_camera = new PerspectiveCamera(the_fov, camera_aspect, near_plane, far_plane);
    persp_camera.position.set(...xyz_pos);
    persp_camera.lookAt(3, 2, 2);
    persp_camera.lookAt(0, 0, 0);
    return persp_camera;
}

function projMatrix(the_camera, width_height) {
    const [camera_width, camera_height] = width_height;
    const camera_aspect = camera_width / camera_height;
    the_camera.aspect = camera_aspect;
    the_camera.updateProjectionMatrix();
}

export { PerspCamera, projMatrix };
