// Affine Matrix is 4x4 matrix, where 1st row represent x-axis, 
// 2nd row represent y-axis, 3rd row represent z-axis

function affine_translation(tx:number = 0, ty:number = 0, tz:number = 0): number[] {
    const result = new Array(16).fill(0);
    result[0] = 1;
    result[5] = 1;
    result[10] = 1;
    result[15] = 1;
    result[12] = tx;
    result[13] = ty;
    result[14] = tz;
    return result;
}

function affine_scale(sx:number = 1, sy:number = 1, sz:number = 1): number[] {
    const result = new Array(16).fill(0);
    result[0] = sx;
    result[5] = sy;
    result[10] = sz;
    result[15] = 1;
    return result;
}

function affine_rotation_x(theta_radian:number = 0): number[] {
    const result = new Array(16).fill(0);
    const cos = Math.cos(theta_radian);
    const sin = Math.sin(theta_radian);
    result[0] = 1;
    result[5] = cos;
    result[6] = -sin;
    result[9] = sin;
    result[10] = cos;
    result[15] = 1;
    return result;
}

function affine_rotation_y(theta_radian:number = 0): number[] {
    const result = new Array(16).fill(0);
    const cos = Math.cos(theta_radian);
    const sin = Math.sin(theta_radian);
    result[0] = cos;
    result[2] = sin;
    result[5] = 1;
    result[8] = -sin;
    result[10] = cos;
    result[15] = 1;
    return result;
}

function affine_rotation_z(theta_radian:number = 0): number[] {
    const result = new Array(16).fill(0);
    const cos = Math.cos(theta_radian);
    const sin = Math.sin(theta_radian);
    result[0] = cos;
    result[1] = -sin;
    result[4] = sin;
    result[5] = cos;
    result[10] = 1;
    result[15] = 1;
    return result;
}