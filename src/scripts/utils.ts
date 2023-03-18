function drawAll(contextGL: ContextGL){
  globalVars.models.forEach((model) => {
    model.draw(contextGL);
  });
}

function getSelectedObjectIdx() {
    const objects = globalVars.models;

    let selectedIdx = -1;
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].name == globalVars.selectedShape) {
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
  elmtContainer.cameraRotateX.valueAsNumber = globalVars.camera.oldCameraX*55;
  elmtContainer.cameraRotateY.valueAsNumber = globalVars.camera.oldCameraY*55;
  elmtContainer.cameraRotateZ.valueAsNumber = globalVars.camera.oldCameraZ*55;
  elmtContainer.horizontalCamera.valueAsNumber = globalVars.camera.oldHorizontal;
  elmtContainer.verticalCamera.valueAsNumber = globalVars.camera.oldVertical;
}

function resetConfig(elmtContainer: ElmtContainer){
  resetRotationSlider(elmtContainer);
  resetCameraSlider(elmtContainer);
  resetCameraConfig(globalVars.camera);
  resetObject();

  function resetRotationSlider(elmtContainer: ElmtContainer) {
    elmtContainer.rotateXObject.valueAsNumber = 0;
    elmtContainer.rotateYObject.valueAsNumber = 0;
    elmtContainer.rotateZObject.valueAsNumber = 0;
  }
  
  function resetCameraSlider(elmtContainer: ElmtContainer) {
    elmtContainer.cameraRotateX.valueAsNumber = 0;
    elmtContainer.cameraRotateY.valueAsNumber = 0;
    elmtContainer.cameraRotateZ.valueAsNumber = 0;
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
  
  function resetObject(){
    globalVars.models = [];
  }
}

function saveConfig(){
  let saveModels: Record<string,Model> = {};
  globalVars.models.forEach((model) => {
    saveModels[model.name] = model;
  });
  const saveData = {
    camera: globalVars.camera,
    models: saveModels,
    isShading: globalVars.isShading
  }
  const blob = new Blob([JSON.stringify(saveData)], {type: "text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.download = "hollow object.json";
  link.href = url;
  link.click();
}

function loadConfigFromFile(file: File){
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = JSON.parse(e.target?.result as string);

    // GET CAMERA DATA FROM FILE
    globalVars.camera = new Camera({oldCameraX: data.camera.oldCameraX,
                                    oldCameraY: data.camera.oldCameraY,
                                    oldCameraZ: data.camera.oldCameraZ,
                                    viewMatrix: data.camera.viewMatrix,
                                    projMatrix: data.camera.projMatrix,
                                    oldHorizontal: data.camera.oldHorizontal,
                                    oldVertical: data.camera.oldVertical});

    // GET MODEL DATA FROM FILE
    globalVars.models = [];
    for (const key in data.models) {
      const model = data.models[key];
      globalVars.models.push(new Model({name: model.name,
                                        offset: model.offset,
                                        end: model.end,
                                        numVertices: model.numVertices,
                                        vertices: model.vertices,
                                        color: model.color,
                                        normals: model.normals,
                                        modelMatrix: model.modelMatrix,
                                        oldRotateX: model.oldRotateX,
                                        oldRotateY: model.oldRotateY,
                                        oldRotateZ: model.oldRotateZ}));
    }
    
    // GET SHADING DATA FROM FILE
    globalVars.isShading = data.isShading;
  }
  reader.readAsText(file);
}