interface IModelProps {
  name: string;
  offset: number;
  end: number;
  numVertices: number;
  vertices: number[];
  color: number[];
  normals: number[];
  projMatrix: number[];
  modelMatrix: number[];
}

class Model {
  public readonly name: string;
  public offset: number;
  public end: number;
  public numVertices: number;
  public vertices: number[];
  public color: number[];
  public normals: number[];
  public projMatrix: number[];
  public modelMatrix: number[];

  constructor(props: IModelProps) {
    this.name = props.name;
    this.offset = props.offset;
    this.end = props.end;
    this.numVertices = props.numVertices;
    this.vertices = props.vertices;
    this.color = props.color;
    this.normals = props.normals;
    this.projMatrix = props.projMatrix;
    this.modelMatrix = props.modelMatrix;
  }

  draw(contextGL: ContextGL) {
    const gl = contextGL.gl;
    const Pmatrix = contextGL.Pmatrix;
    const Vmatrix = contextGL.Vmatrix;
    const Mmatrix = contextGL.Mmatrix;
    const Nmatrix = contextGL.Nmatrix;

    gl.uniformMatrix4fv(Pmatrix, false, this.projMatrix);
    gl.uniformMatrix4fv(Vmatrix, false, defaultMatrix.view);
    gl.uniformMatrix4fv(Mmatrix, false, this.modelMatrix);

    if (globalVars.isShading) {
      // TODO
    } else {
      gl.uniformMatrix4fv(Nmatrix, false, defaultMatrix.normal);
    }

    for (let i = this.offset; i < this.end; i++) {
      gl.drawArrays(gl.TRIANGLE_FAN, i * 4, 4);
    }
  }
}
