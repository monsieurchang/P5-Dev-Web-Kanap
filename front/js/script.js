/* 3. INSÉRER LES PRODUITS DANS LA PAGE D'ACCUEIL */

/* Récupération des données depuis l'API */
let url = "http://localhost:3000/api/products/"
let couches = []

async function main() {
  const API = await fetch(url)
  const json = await API.json()
  displayArticles(json)
}
main()

console.log(couches)

/* Création d'un <article>-type par canapé. Cette "fiche"
accueillera les différentes caractéristiques propres à
chaque produit : nom, illustration, etc. */
function displayArticles(array) {
  for (let i = 0; i < array.length; i++) {
    let product = array[i];
    let section = document.querySelector('.items')
    let aLink = document.createElement('a')
    aLink.setAttribute('href', "./product.html?id=" + product._id)

    let article = document.createElement('article')

    let image = document.createElement('img')
    image.setAttribute('src', product.imageUrl)
    image.setAttribute("class", "item__img")

    let titleH3 = document.createElement('h3')
    titleH3.setAttribute("class", "productName")

    let para = document.createElement('p')
    para.setAttribute("class", "productDescription")

    titleH3.textContent = product.name
    para.textContent = product.description

    section.appendChild(aLink)
    aLink.appendChild(article)
    article.appendChild(image)
    article.appendChild(titleH3)
    article.appendChild(para)
  }
}