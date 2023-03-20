interface IModelProps {
  name: string;
  offset: number;
  end: number;
  numVertices: number;
  vertices: number[];
  color: number[];
  normals: number[];
  modelMatrix: number[];
  oldRotateX: number;
  oldRotateY: number;
  oldRotateZ: number;
}

class Model {
  public readonly name: string;
  public offset: number;
  public end: number;
  public numVertices: number;
  public vertices: number[];
  public color: number[];
  public normals: number[];
  public modelMatrix: number[];
  public oldRotateX: number;
  public oldRotateY: number;
  public oldRotateZ: number;

  constructor(props: IModelProps) {
    this.name = props.name;
    this.offset = props.offset;
    this.end = props.end;
    this.numVertices = props.numVertices;
    this.vertices = props.vertices;
    this.color = props.color;
    this.normals = props.normals;
    this.modelMatrix = props.modelMatrix;
    this.oldRotateX = props.oldRotateX;
    this.oldRotateY = props.oldRotateY;
    this.oldRotateZ = props.oldRotateZ;
  }

  getCenterPoint(): number[] {
    const centerPoint = [0, 0, 0];

    for (let i = 0; i < this.numVertices; i++) {
      centerPoint[0] += this.vertices[i * 3];
      centerPoint[1] += this.vertices[i * 3 + 1];
      centerPoint[2] += this.vertices[i * 3 + 2];
    }

    centerPoint[0] /= this.numVertices;
    centerPoint[1] /= this.numVertices;
    centerPoint[2] /= this.numVertices;
    return centerPoint;
  }

  draw(contextGL: ContextGL) {
    const gl = contextGL.gl;
    const Pmatrix = contextGL.Pmatrix;
    const Vmatrix = contextGL.Vmatrix;
    const Mmatrix = contextGL.Mmatrix;
    const Nmatrix = contextGL.Nmatrix;

    gl.uniformMatrix4fv(Pmatrix, false, globalVars.camera.projMatrix);
    gl.uniformMatrix4fv(Vmatrix, false, globalVars.camera.viewMatrix);
    gl.uniformMatrix4fv(Mmatrix, false, this.modelMatrix);

    if (globalVars.isShading) {
      // TODO
      this.normals = globalVars.camera.shading_the_normal(this.modelMatrix);
    } else {
      this.normals = defaultMatrix.normal;
    }
    gl.uniformMatrix4fv(Nmatrix, false, this.normals);

    for (let i = this.offset; i < this.end; i++) {
      gl.drawArrays(gl.TRIANGLE_FAN, i * 4, 4);
    }
  }
}
