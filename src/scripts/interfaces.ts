interface IModelData {
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

interface ICameraData {
  oldCameraX: number;
  oldCameraY: number;
  oldCameraZ: number;
  viewMatrix: number[];
  projMatrix: number[];
  oldHorizontal: number;
  oldVertical: number;
}

interface IModelsData {
  [key: string]: IModelData;
}

interface ISavedData {
  camera: ICameraData;
  models: IModelsData;
  isShading: boolean;
}

interface IHelpConfig {
  title: string;
  description: string;
}
