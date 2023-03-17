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
    // console.log("Selected: " + selectedShape + " at index " + globalVars.selectedIdx)
}