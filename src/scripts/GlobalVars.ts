class GlobalVars {
  public Pmatrix: WebGLUniformLocation | null = null;
  public Vmatrix: WebGLUniformLocation | null = null;
  public Mmatrix: WebGLUniformLocation | null = null;
  public Nmatrix: WebGLUniformLocation | null = null;

  public oldValueRotX = 0;
  public oldValueRotY = 0;
  public oldValueRotZ = 0;
  public oldValueMove = 0;
  public isShading = false;

  public vertices: number[] = [];
  public colors: number[] = [];
  public normals: number[] = [];
  public models: Model[] = [];
}

const globalVars = new GlobalVars();
