const imgImport = import.meta.glob("/src/assets/**/*.png", { eager: true });

export const getImageUrl = (imageName) => {
  const image = imgImport[`/src/assets/${imageName}`];
  return image ? image.default : "";
};
