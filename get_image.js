const res = await fetch("https://pixabay.com/api/?key=45423184-e4a87c53d9e87dc9cfd0c0071&q=desert+architecture&image_type=photo");
const json = await res.json();
console.log(json.hits[0].largeImageURL);
