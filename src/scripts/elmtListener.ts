function addElmtListener(elmtContainer: ElmtContainer, contextGL: ContextGL) {
    
    // CHANGE OBJECT
    elmtContainer.selectShape.addEventListener("change", () => {
        updateSelected(elmtContainer.selectShape.value);
        updateRotationSlider(elmtContainer, [globalVars.selectedIdx]);
    });

    // TRANSLATION
    elmtContainer.buttonTranslateLeft.addEventListener("click", () => {
        translate_object("x", -0.1);
        drawAll(contextGL);
    });
    elmtContainer.buttonTranslateRight.addEventListener("click", () => {
        translate_object("x", 0.1);
        drawAll(contextGL);
    });
    elmtContainer.buttonTranslateUp.addEventListener("click", () => {
        translate_object("y", 0.1);
        drawAll(contextGL);
    });
    elmtContainer.buttonTranslateDown.addEventListener("click", () => {
        translate_object("y", -0.1);
        drawAll(contextGL);
    });
    elmtContainer.buttonTranslateIn.addEventListener("click", () => {
        translate_object("z", 0.1);
        drawAll(contextGL);
    });
    elmtContainer.buttonTranslateOut.addEventListener("click", () => {
        translate_object("z", -0.1);
        drawAll(contextGL);
    });

    // SCALING
    elmtContainer.scaleFactor.addEventListener("change", () => {
        globalVars.scaleFactor = elmtContainer.scaleFactor.valueAsNumber;
    });
    elmtContainer.scaleButton.addEventListener("click", () => {
        resize_object(globalVars.scaleFactor);
        drawAll(contextGL);
    });
    elmtContainer.buttonEnlarge.addEventListener("click", () => {
        resize_object(1.2);
        drawAll(contextGL);
    });
    elmtContainer.buttonShrink.addEventListener("click", () => {
        resize_object(0.8);
        drawAll(contextGL);
    });

    // ROTATION
    elmtContainer.rotateXObject.addEventListener("input", () => {
        rotate_object("x", elmtContainer.rotateXObject.valueAsNumber);
        drawAll(contextGL);
    });
    elmtContainer.rotateYObject.addEventListener("input", () => {
        rotate_object("y", elmtContainer.rotateYObject.valueAsNumber);
        drawAll(contextGL);
    });
    elmtContainer.rotateZObject.addEventListener("input", () => {
        rotate_object("z", elmtContainer.rotateZObject.valueAsNumber);
        drawAll(contextGL);
    });

    // CAMERA
    elmtContainer.buttonZoomIn.addEventListener("click", () => {
        globalVars.camera.zoom(1.1);
        drawAll(contextGL);
    });
    elmtContainer.buttonZoomOut.addEventListener("click", () => {
        globalVars.camera.zoom(0.9);
        drawAll(contextGL);
    });
    elmtContainer.cameraRotateX.addEventListener("input", () => {
        globalVars.camera.rotate("x", elmtContainer.cameraRotateX.valueAsNumber);
        drawAll(contextGL);
    });
    elmtContainer.cameraRotateY.addEventListener("input", () => {
        globalVars.camera.rotate("y", elmtContainer.cameraRotateY.valueAsNumber);
        drawAll(contextGL);
    });
    elmtContainer.cameraRotateZ.addEventListener("input", () => {
        globalVars.camera.rotate("z", elmtContainer.cameraRotateZ.valueAsNumber);
        drawAll(contextGL);
    });

    // RESET
    elmtContainer.buttonReset.addEventListener("click", () => {
        globalVars.models = [];
        sceneSetup(contextGL);
        updateRotationSlider(elmtContainer, [0, 1, 2])
    });
}