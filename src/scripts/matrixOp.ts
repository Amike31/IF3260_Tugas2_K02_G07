// define ROWS and COLS = 4
const ROWS = 4;
const COLS = 4;

// Array is matrix in row-major order with 4 rows and 4 columns
// Matrix Operation of two 4x4 matrices represented as arrays
// Matrix multiplication
function simpleOp_matrix_by_array(a: number[], b: number[], addition: boolean = true): number[] {
    const result = new Array(ROWS * COLS).fill(0);
  
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (addition) {
                result[i * COLS + j] = a[i * COLS + j] + b[i * COLS + j];
            } else {
                result[i * COLS + j] = a[i * COLS + j] + b[i * COLS + j];
            }
        }
    }
  
    return result;
}

function multiply_matrix_by_array(a: number[], b: number[]): number[] {
    const result = new Array(ROWS * COLS).fill(0);
  
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            for (let k = 0; k < COLS; k++) {
                result[i * COLS + j] += a[i * COLS + k] * b[k * COLS + j];
            }
        }
    }
  
    return result;
}

// Matrix transpose
function transpose_matrix(a: number[][]) {
    const result: number[][] = [];
    for (let i = 0; i < ROWS; i++) {
        result[i] = [];
        for (let j = 0; j < COLS; j++) {
            result[i][j] = a[j][i];
        }
    }
    return result;
}

// Matrix inverse, Matrix initiation by 0 for all elements
function invert_matrix(a: number[][]) {
    const copied: number[][] = [];
    for (let i = 0; i < ROWS; i++) {
        copied[i] = [];
        for (let j = 0; j < COLS; j++) {
            copied[i][j] = a[i][j];
        }
    }
    
    const result: number[][] = [];
    for (let i = 0; i < ROWS; i++) {
        result[i] = [];
        for (let j = 0; j < COLS; j++) {
            result[i][j] = 0;
        }
        result[i][i] = 1;
    }
    
    for (let i = 0; i < ROWS; i++) {
        let maxEl = Math.abs(copied[i][i]);
        let maxRow = i;
        for (let k = i + 1; k < ROWS; k++) {
            if (Math.abs(copied[k][i]) > maxEl) {
                maxEl = Math.abs(copied[k][i]);
                maxRow = k;
            }
        }
    
        for (let k = i; k < COLS; k++) {
            const tmp = copied[maxRow][k];
            copied[maxRow][k] = copied[i][k];
            copied[i][k] = tmp;
        }
    
        for (let k = i; k < COLS; k++) {
            copied[i][k] /= maxEl;
        }
        for (let k = 0; k < ROWS; k++) {
            result[i][k] /= maxEl;
        }
    
        for (let j = 0; j < ROWS; j++) {
            if (j != i) {
                const c = copied[j][i];
                for (let k = 0; k < COLS; k++) {
                    copied[j][k] -= c * copied[i][k];
                    result[j][k] -= c * result[i][k];
                }
            }
        }
    }
    
    return result;
}