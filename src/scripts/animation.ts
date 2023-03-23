const animatePerModel = (model: Model) => {
  const random = Math.floor(Math.random() * 3);

  let axis = "";
  const additional = 0.001;
  let value = additional;

  switch (random) {
    case 0:
      axis = "x";
      value += model.oldRotateX;
      break;
    case 1:
      axis = "y";
      value += model.oldRotateY;
      break;
    case 2:
      axis = "z";
      value += model.oldRotateZ;
      break;
  }

  rotate_object(axis, value, model);
};

const animate = () => {
  globalVars.models.forEach((model) => {
    animatePerModel(model);
  });
};
