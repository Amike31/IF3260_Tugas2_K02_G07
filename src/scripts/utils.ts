function drawAll(contextGL: ContextGL){
  globalVars.models.forEach((model) => {
    model.draw(contextGL);
  });
}

function getSelectedObjectIdx() {
    const objects = globalVars.models;

    let selectedIdx = -1;
    for (var i = 0; i < objects.length; i++) {
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
  }
  
  function resetObject(){
    globalVars.models = [];
  }
}