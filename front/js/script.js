let url= "http://localhost:3000/api/products"

fetch(url)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
  })
  .catch(function(err) {
    // Une erreur est survenue
  });



/* var requestURL = "http://localhost:3000/api/products"
var request = new XMLHttpRequest();
request.open('GET', requestURL, true);
request.responseType = 'json';
request.send(); 
request.onload = function (){
    var allCouch = request.response;
    showCouchs(allCouch);
}*/



// // Affichage des produits
// function showCouchs(productsSheet) {
//     for (var i = 0; i < productsSheet.length; i++){
//         var product = productsSheet[i];
//         let allPanels = document.querySelector('.items');

//         // insertion du lien de chaque canapés
//         var createLinkPanel = document.createElement('a');
//         createLinkPanel.setAttribute('href', "./product.html?id=" + product._id);
//         allPanels.appendChild(createLinkPanel);

//         // insertion des articles
//         var createArticle = document.createElement('article');
//         createLinkPanel.appendChild(createArticle);

//         // insertion des images
//         var createPict = document.createElement('img');
//         createPict.setAttribute('src', product.imageUrl);
//         createPict.setAttribute('alt', product.altTxt);
//         createArticle.appendChild(createPict);
    
//         // insertion des noms dans h3
//         var createH3 = document.createElement('h3');
//         createH3.className = 'productName';
//         createH3.textContent = product.name;
//         createArticle.appendChild(createH3);

//         // insertion des descriptions dans p
//         var createP = document.createElement('p');
//         createP.className = 'productDescription';
//         createP.textContent = product.description;
//         createArticle.appendChild(createP);
//     }
// }





// function displayArticle(array) {
//   for (let i = 0; i < array.length; i++) {
//     console.log(data[0].name)
//   }
// }
// displayArticle(products)

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