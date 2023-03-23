function addElmtListener(elmtContainer: ElmtContainer, contextGL: ContextGL) {
  // CHANGE OBJECT
  elmtContainer.selectShape.addEventListener("change", () => {
    updateSelected(elmtContainer.selectShape.value);
    updateRotationSlider(elmtContainer, globalVars.selectedIdx);
  });

  // TRANSLATION
  elmtContainer.buttonTranslateLeft.addEventListener("click", () => {
    translate_object("x", -0.1);
  });
  elmtContainer.buttonTranslateRight.addEventListener("click", () => {
    translate_object("x", 0.1);
  });
  elmtContainer.buttonTranslateUp.addEventListener("click", () => {
    translate_object("y", 0.1);
  });
  elmtContainer.buttonTranslateDown.addEventListener("click", () => {
    translate_object("y", -0.1);
  });
  elmtContainer.buttonTranslateIn.addEventListener("click", () => {
    translate_object("z", 0.1);
  });
  elmtContainer.buttonTranslateOut.addEventListener("click", () => {
    translate_object("z", -0.1);
  });

  // SCALING
  elmtContainer.scaleFactor.addEventListener("change", () => {
    globalVars.scaleFactor = elmtContainer.scaleFactor.valueAsNumber;
  });
  elmtContainer.scaleButton.addEventListener("click", () => {
    resize_object(globalVars.scaleFactor);
  });
  elmtContainer.buttonEnlarge.addEventListener("click", () => {
    resize_object(1.2);
  });
  elmtContainer.buttonShrink.addEventListener("click", () => {
    resize_object(0.8);
  });

  // ROTATION
  elmtContainer.rotateXObject.addEventListener("input", () => {
    rotate_object(
      "x",
      elmtContainer.rotateXObject.valueAsNumber,
      globalVars.models[globalVars.selectedIdx]
    );
  });
  elmtContainer.rotateYObject.addEventListener("input", () => {
    rotate_object(
      "y",
      elmtContainer.rotateYObject.valueAsNumber,
      globalVars.models[globalVars.selectedIdx]
    );
  });
  elmtContainer.rotateZObject.addEventListener("input", () => {
    rotate_object(
      "z",
      elmtContainer.rotateZObject.valueAsNumber,
      globalVars.models[globalVars.selectedIdx]
    );
  });

  // CAMERA
  elmtContainer.buttonZoomIn.addEventListener("click", () => {
    globalVars.camera.zoom(1.1);
  });
  elmtContainer.buttonZoomOut.addEventListener("click", () => {
    globalVars.camera.zoom(0.9);
  });
  elmtContainer.cameraRotateX.addEventListener("input", () => {
    globalVars.camera.rotate("x", elmtContainer.cameraRotateX.valueAsNumber);
  });
  elmtContainer.cameraRotateY.addEventListener("input", () => {
    globalVars.camera.rotate("y", elmtContainer.cameraRotateY.valueAsNumber);
  });
  elmtContainer.cameraRotateZ.addEventListener("input", () => {
    globalVars.camera.rotate("z", elmtContainer.cameraRotateZ.valueAsNumber);
  });
  elmtContainer.horizontalCamera.addEventListener("input", () => {
    globalVars.camera.slide("x", elmtContainer.horizontalCamera.valueAsNumber);
  });
  elmtContainer.verticalCamera.addEventListener("input", () => {
    globalVars.camera.slide("y", -elmtContainer.verticalCamera.valueAsNumber);
  });

  // PROJECTION
  elmtContainer.buttonProjOrthographic.addEventListener("click", () => {
    globalVars.camera.setProjection("orthographic");
  });
  elmtContainer.buttonProjPerspective.addEventListener("click", () => {
    globalVars.camera.setProjection("perspective");
  });
  elmtContainer.buttonProjOblique.addEventListener("click", () => {
    globalVars.camera.setProjection("oblique");
  });

  // SHADE
  elmtContainer.shaderOn.addEventListener("click", () => {
    globalVars.isShading = elmtContainer.shaderOn.checked;
  });
  elmtContainer.animationOn.addEventListener("click", () => {
    globalVars.isAnimation = elmtContainer.animationOn.checked;
  });

  // RESET
  elmtContainer.buttonReset.addEventListener("click", () => {
    resetConfig(elmtContainer);
    sceneSetup(contextGL, globalVars.defaultModels);
  });

  // SAVE & LOAD
  elmtContainer.buttonSave.addEventListener("click", () => {
    saveConfig();
  });
  elmtContainer.loadInput.addEventListener("change", () => {
    loadConfigFromFile(elmtContainer.loadInput.files?.item(0) as File);
    setTimeout(function () {
      updateCameraSlider(elmtContainer);
      updateSelected(elmtContainer.selectShape.value);
      updateRotationSlider(elmtContainer, globalVars.selectedIdx);
    }, 500);
  });

  // MODAL
  elmtContainer.helpBtn.addEventListener("click", () => {
    elmtContainer.modalContainer.style.display = "block";
  });
  elmtContainer.modalBackdrop.addEventListener("click", () => {
    elmtContainer.modalContainer.style.display = "none";
  });
  console.log("addElmtListener");
}
