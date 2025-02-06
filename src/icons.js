const icons = {};

function importAll(r) {
  r.keys().forEach((key) => {
    const imageName = key.replace("./", "");
    icons[imageName] = r(key);
  });
}

importAll(require.context("./assets/", false, /\.png$/));

export default icons;
