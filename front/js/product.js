// console.log('coucou')
let couches = ""

var str = window.location.href
var url = new URL(str)
var productId = url.searchParams.get("id")
// console.log(id)

fetch("http://localhost:3000/api/products/" + productId)
  .then((response) => response.json())
  .then((product) => {
    function displayArticle() {

      // item img
      let itemImg = document.querySelector('.item__img')
      let image = document.createElement('img')
      itemImg.appendChild(image)
      image.setAttribute('src', product.imageUrl)
      image.setAttribute('alt', product.altTxt)

      // item titlePrice
      let itemTitle = document.getElementById('title')
      itemTitle.textContent = product.name
      let itemPrice = document.getElementById('price')
      itemPrice.textContent = product.price

      // item description
      let itemDescription = document.getElementById('description')
      itemDescription.textContent = product.description
      document.title = product.name

      // item colors
      let itemColors = document.getElementById('colors')

      for (let i = 0; i < product.colors.length; i++) {
        let colors = document.createElement('option')
        colors.setAttribute('value', product.colors[i])
        colors.textContent = product.colors[i]
        itemColors.appendChild(colors)
      }
    }

    displayArticle(couches)
  })

