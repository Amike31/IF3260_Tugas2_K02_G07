function drawAll(contextGL: ContextGL) {
  // console.log("drawAll", globalVars.models);
  globalVars.models.forEach((model) => {
    model.draw(contextGL);
  });
}

function getSelectedObjectIdx() {
  const objects = globalVars.models;

  let selectedIdx = -1;
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].name === globalVars.selectedShape) {
      selectedIdx = i;
      break;
    }
  }

  return selectedIdx;
}

function updateSelected(selectedShape: string) {
  globalVars.selectedShape = selectedShape;
  globalVars.selectedIdx = getSelectedObjectIdx();
}

function updateRotationSlider(elmtContainer: ElmtContainer, id: number) {
  elmtContainer.rotateXObject.valueAsNumber = globalVars.models[id].oldRotateX;
  elmtContainer.rotateYObject.valueAsNumber = globalVars.models[id].oldRotateY;
  elmtContainer.rotateZObject.valueAsNumber = globalVars.models[id].oldRotateZ;
}

function updateCameraSlider(elmtContainer: ElmtContainer) {
  elmtContainer.cameraRotateX.valueAsNumber = globalVars.camera.oldCameraX * 55;
  elmtContainer.cameraRotateY.valueAsNumber = globalVars.camera.oldCameraY * 55;
  elmtContainer.cameraRotateZ.valueAsNumber = globalVars.camera.oldCameraZ * 55;
  elmtContainer.horizontalCamera.valueAsNumber =
    globalVars.camera.oldHorizontal;
  elmtContainer.verticalCamera.valueAsNumber = globalVars.camera.oldVertical;
}

function resetConfig(elmtContainer: ElmtContainer) {
  resetRotationSlider(elmtContainer);
  resetCameraSlider(elmtContainer);
  resetCameraConfig(globalVars.camera);
  globalVars.camera.setProjection("orthographic");
  resetObject();
  console.log(
    "models",
    globalVars.models.map((e) => e.copy())
  );

  function resetRotationSlider(elmtContainer: ElmtContainer) {
    elmtContainer.rotateXObject.valueAsNumber = 0;
    elmtContainer.rotateYObject.valueAsNumber = 0;
    elmtContainer.rotateZObject.valueAsNumber = 0;
  }

  function resetCameraSlider(elmtContainer: ElmtContainer) {
    elmtContainer.cameraRotateX.valueAsNumber = 0;
    elmtContainer.cameraRotateY.valueAsNumber = 0;
    elmtContainer.cameraRotateZ.valueAsNumber = 0;
    elmtContainer.horizontalCamera.valueAsNumber = 0;
    elmtContainer.verticalCamera.valueAsNumber = 0;
  }

  function resetCameraConfig(camera: Camera) {
    camera.viewMatrix = defaultMatrix.view;
    camera.projMatrix = defaultMatrix.projection;
    camera.oldCameraX = 0;
    camera.oldCameraY = 0;
    camera.oldCameraZ = 0;
    camera.oldHorizontal = 0;
    camera.oldVertical = 0;
  }

  function resetObject() {
    globalVars.models = [];
  }
}

function saveConfig() {
  let saveModels: Record<string, Model> = {};
  globalVars.models.forEach((model) => {
    saveModels[model.name] = model;
  });
  const saveData = {
    camera: globalVars.camera,
    models: saveModels,
    isShading: globalVars.isShading,
  };
  const blob = new Blob([JSON.stringify(saveData)], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.download = "hollow object.json";
  link.href = url;
  link.click();
}

const parseCameraData = (camData: ICameraData) => {
  return new Camera({
    oldCameraX: camData.oldCameraX,
    oldCameraY: camData.oldCameraY,
    oldCameraZ: camData.oldCameraZ,
    viewMatrix: camData.viewMatrix,
    projMatrix: camData.projMatrix,
    oldHorizontal: camData.oldHorizontal,
    oldVertical: camData.oldVertical,
  });
};

const parseModelsData = (modelsData: IModelsData) => {
  const models: Model[] = [];

  let counterOffset = 0;
  for (const key in modelsData) {
    const model = modelsData[key];
    const numVertices = model.vertices.length / 3;
    const end = counterOffset + numVertices / 4;
    models.push(
      new Model({
        name: model.name,
        offset: counterOffset,
        end,
        numVertices,
        vertices: model.vertices,
        color: model.color,
        normals: [],
        modelMatrix: model.modelMatrix,
        oldRotateX: model.oldRotateX,
        oldRotateY: model.oldRotateY,
        oldRotateZ: model.oldRotateZ,
      })
    );
    counterOffset = end;
  }

  return models;
};

function loadConfigFromFile(file: File) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const data: ISavedData = JSON.parse(e.target?.result as string);

    // GET CAMERA DATA FROM FILE
    globalVars.camera = parseCameraData(data.camera);

    // GET MODEL DATA FROM FILE
    globalVars.models = parseModelsData(data.models);

    // GET SHADING DATA FROM FILE
    globalVars.isShading = data.isShading;
  };
  reader.readAsText(file);
}
