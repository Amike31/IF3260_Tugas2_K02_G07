interface ICameraProps {
    oldCameraX: number;
    oldCameraY: number;
    oldCameraZ: number;
    viewMatrix: number[];
    projMatrix: number[];
    oldHorizontal: number;
    oldVertical: number;
}

class Camera {
    public oldCameraX: number;
    public oldCameraY: number;
    public oldCameraZ: number;
    public viewMatrix: number[];
    public projMatrix: number[];
    public oldHorizontal: number;
    public oldVertical: number;

    constructor(props: ICameraProps) {
        this.oldCameraX = props.oldCameraX;
        this.oldCameraY = props.oldCameraY;
        this.oldCameraZ = props.oldCameraZ;
        this.viewMatrix = props.viewMatrix;
        this.projMatrix = props.projMatrix;
        this.oldHorizontal = props.oldHorizontal;
        this.oldVertical = props.oldVertical;
    }


    zoom(value: number) {
        let oldViewMat = this.viewMatrix.slice();
        this.viewMatrix = multiply_matrix_by_array(affine_scaling(value, value, value), oldViewMat);
    }
    
    rotate(axis: string, value: number) {
        // Adjust the value to fit UI of Web
        value /= 55;
        let rotate_value: number = 0;
        if (axis == 'x') {
            rotate_value = value - this.oldCameraX;
            this.oldCameraX = value;
            this.viewMatrix = multiply_matrix_by_array(affine_rotation_x(rotate_value), this.viewMatrix);
        } else if (axis == 'y') {
            rotate_value = value - this.oldCameraY;
            this.oldCameraY = value;
            this.viewMatrix = multiply_matrix_by_array(affine_rotation_y(rotate_value), this.viewMatrix);
        } else if (axis == 'z') {
            rotate_value = value - this.oldCameraZ;
            this.oldCameraZ = value;
            this.viewMatrix = multiply_matrix_by_array(affine_rotation_z(rotate_value), this.viewMatrix);
        }
    }
    setProjection(projection: string) {
        if (projection == "orthographic") {
            console.log("orthographic");
            this.projMatrix = this.orthographic_projection(-1, 1, -1, 1, 1, 100)
        } else if (projection == "perspective") {
            console.log("perspective")
            this.projMatrix = this.perspective_projection(45, 1, 0.1, 100);
        } else if (projection == "oblique") {
            console.log("oblique")
            this.projMatrix = this.oblique_projection(0.4)
        }
    }
    orthographic_projection(left: number, right: number, bottom: number, top: number, near: number, far: number) {
        let a = (right - left);
        let b = (top - bottom);
        let c = (far - near);
        let d = (right + left);
        let e = (top + bottom);
        let f = (far + near);
        let affine_orthographic = 
        [
            2/a,  0,   0,-d/a,
              0,2/b,   0,-e/b,
              0,  0,-2/c,-f/c,
              0,  0,   0,   1
        ];
        return multiply_matrix_by_array(defaultMatrix.projection, affine_orthographic);
    }
    perspective_projection(fov: number, aspect: number, near: number, far: number) {
        let f = 1 / Math.tan(fov / 2);
        let nf = 1 / (near - far);
        let affine_perspective =
        [
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (far + near) * nf, -1,
            0, 0, (2 * far * near) * nf, 0
        ];
        return affine_perspective;
    }
    oblique_projection(shearFactor: number) {
        let shearMat = [1, 0, 0, 0,
                        0, 1, 0, 0, 
                        shearFactor, shearFactor, shearFactor, 0,
                        0, 0, 0, 1];
        let transFixing = shearFactor*1.5
        let transMat = affine_translation(transFixing, transFixing, transFixing);
        let affine_oblique = multiply_matrix_by_array(transMat, shearMat);
        return affine_oblique
    }
    slide(type: string, value: number){
        let slide_value: number = 0;
        if (type == 'x') {
            slide_value = value - this.oldHorizontal;
            this.oldHorizontal = value;
            this.viewMatrix = multiply_matrix_by_array(affine_translation(-slide_value, 0, 0), this.viewMatrix);
        } else if (type == 'y') {
            slide_value = value - this.oldVertical;
            this.oldVertical = value;
            this.viewMatrix = multiply_matrix_by_array(affine_translation(0, -slide_value, 0), this.viewMatrix);
        }
    }
}