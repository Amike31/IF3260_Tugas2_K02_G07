function shading_the_normal(model: number[], view: number[]) {
    
    let mvMul = multiply_matrix_by_array(model, view);
    let mvMatrix = [];
    for (let index = 0; index < 4; index++) {
        mvMatrix.push(mvMul.slice(index * 4, index * 4 + 4));
    }

    let normalMatrix = transpose_matrix(invert_matrix(mvMatrix));
    let normalMatrixID = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            normalMatrixID.push(normalMatrix[i][j]);
        }
    }

    return normalMatrixID;
}