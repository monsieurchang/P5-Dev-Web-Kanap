// console.log("coucou")

// fetch("http://localhost:3000/api/products")
//   .then(function (res) {
//     if (res.ok) {
//       return res.json();
//     }
//   })
//   .then(function (value) {
//     console.log(value);
//   })
//   .catch(function (err) {
//     // Une erreur est survenue
//   });

const express = require('express');
const path = require('path');

const productRoutes = require('./routes/product');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productRoutes);

module.exports = app;

function displayArticle(array) {
  console.log(`${array[0].name}`)
}
displayArticle()

// function displayArticle(array) {
//   for (let i = 0; i < array.length; i++) {
//     let newDiv = document.createElement("div")

//     let img = document.createElement("img")
//     let titleH3 = document.createElement("h3")
//     titleH3.setAttribute('class', 'productName')
//     let para = document.createElement('p')
//     para.setAttribute('class', 'productDescription')

//     img.src = `http://localhost:3000/images/kanap0${i + 1}.jpeg`

//     newDiv.innerText += `${array[i].name}`

//     newDiv.appendChild(img)

//     document.body.appendChild(newDiv)
//   }
// }
// displayArticle(products)