let url = "http://localhost:3000/api/products/"
let couches = ""

fetch(url)
  .then(function (res) {
    if (res.ok) {
      return res.json()
    }
  })
  .then(async function (res) {
    let couches = await res;
    displayArticles(couches);
  })
  .catch(function (err) {
    // Une erreur est survenue
  })
  .then(function (value) {
    console.log(value)
  })

function displayArticles(array) {
  for (let i = 0; i < array.length; i++) {
    let product = array[i];

    let section = document.querySelector('.items')

    let aLink = document.createElement('a')
    aLink.setAttribute('href', "./product.html2id=" + product._id)

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
displayArticles(couches)