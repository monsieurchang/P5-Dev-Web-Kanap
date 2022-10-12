let str = window.location.href
let url = new URL(str)
let productId = url.searchParams.get("id")

function displayArticle(product) {
  //item img
  let itemImg = document.querySelector('.item__img')
  let image = document.createElement('img')
  itemImg.appendChild(image)
  image.setAttribute('src', product.imageUrl)
  image.setAttribute('alt', product.altTxt)

  //item titlePrice
  let itemTitle = document.getElementById('title')
  itemTitle.textContent = product.name
  let itemPrice = document.getElementById('price')
  itemPrice.textContent = product.price

  //item description
  let itemDescription = document.getElementById('description')
  itemDescription.textContent = product.description
  document.title = product.name

  //item colors
  let itemColors = document.getElementById('colors')

  for (let i = 0; i < product.colors.length; i++) {
    let colors = document.createElement('option')
    colors.setAttribute('value', product.colors[i])
    colors.textContent = product.colors[i]
    itemColors.appendChild(colors)
  }
}

//fetch
fetch("http://localhost:3000/api/products/" + productId)
  .then((response) => response.json())
  .then((product) => {
    displayArticle(product)
  })

//cart
let button = document.querySelector('#addToCart') //html button call
button.addEventListener('click', buttonClicked) //when clicked = buttonClicked()

function buttonClicked() {
  let colorSelected = document.querySelector('#colors')
  let quantitySelected = document.querySelector('#quantity')

  addToCart(productId, quantitySelected.value, colorSelected.value)
}

function addToCart(id, qty, color) {
  let cart = localStorage.getItem('products')
  cart = JSON.parse(cart)
  let cartIsEmpty = true

  let productFeatures = {
    idSelected: id,
    quantitySelected: qty,
    colorSelected: color,
  }

  if (color == null || color == "" || qty == null || qty == "") { //alert if color/qty aren't selected
    alert("Veuillez choisir une couleur et un nombre d'articles.")
    return
  }

  if (cart) { //if cart contains smth...
    for (i = 0; i < cart.length; i++) {
      if ((cart[i].idSelected === productFeatures.idSelected) && (cart[i].colorSelected === productFeatures.colorSelected)) {
        (cart[i].quantitySelected = (+cart[i].quantitySelected) + (+productFeatures.quantitySelected))
        cartIsEmpty = false
      }
    }
    if (cartIsEmpty) {
      cart.push(productFeatures)
    }
    localStorage.setItem('products', JSON.stringify(cart))
  } else { //cart update
    let updatedCart = []
    updatedCart.push(productFeatures)
    localStorage.setItem('products', JSON.stringify(updatedCart))
  }
}