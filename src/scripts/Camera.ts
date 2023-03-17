interface ICameraProps {
    oldCameraX: number;
    oldCameraY: number;
    oldCameraZ: number;
    viewMatrix: number[];
    projMatrix: number[];
}

class Camera {
    public oldCameraX: number;
    public oldCameraY: number;
    public oldCameraZ: number;
    public viewMatrix: number[];
    public projMatrix: number[];

    constructor(props: ICameraProps) {
        this.oldCameraX = props.oldCameraX;
        this.oldCameraY = props.oldCameraY;
        this.oldCameraZ = props.oldCameraZ;
        this.viewMatrix = props.viewMatrix;
        this.projMatrix = props.projMatrix;
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
}
