const imagePreload = (images = []) => {
  images.forEach((image) => {
    new Image().src = image;
  });
};

export default imagePreload;
