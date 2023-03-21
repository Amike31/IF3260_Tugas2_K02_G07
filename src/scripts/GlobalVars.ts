class GlobalVars {
  public Pmatrix: WebGLUniformLocation | null = null;
  public Vmatrix: WebGLUniformLocation | null = null;
  public Mmatrix: WebGLUniformLocation | null = null;
  public Nmatrix: WebGLUniformLocation | null = null;

  public selectedShape: string = "cube";
  public selectedIdx: number = 0;
  public scaleFactor: number = 1;
  public isShading: boolean = false;

  public vertices: number[] = [];
  public colors: number[] = [];
  public normals: number[] = [];
  public models: Model[] = [];
  public defaultModels: Model[] = [];
  public camera: Camera = new Camera({
    oldCameraX: 0,
    oldCameraY: 0,
    oldCameraZ: 0,
    viewMatrix: defaultMatrix.view,
    projMatrix: defaultMatrix.projection,
    oldHorizontal: 0,
    oldVertical: 0,
  });
}

const globalVars = new GlobalVars();
