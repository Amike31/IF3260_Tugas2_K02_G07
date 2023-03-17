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

function updateRotationSlider(elmtContainer: ElmtContainer, model_ids: number[]) {
  model_ids.forEach(id => {
    elmtContainer.rotateXObject.valueAsNumber = globalVars.models[id].oldRotateX;
    elmtContainer.rotateYObject.valueAsNumber = globalVars.models[id].oldRotateY;
    elmtContainer.rotateZObject.valueAsNumber = globalVars.models[id].oldRotateZ;  
  });
}