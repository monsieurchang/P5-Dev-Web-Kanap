/* 6. INSÉRER UN PRODUIT ET SES DÉTAILS DANS LA PAGE PRODUIT */

let str = window.location.href
let url = new URL(str)
let productId = url.searchParams.get('id')

/* Récupération des produits depuis l'API */
fetch('http://localhost:3000/api/products/' + productId)
  .then((response) => response.json())
  .then((product) => {
    displayArticle(product)
  })

/* Affichage des produits et de leurs caractéristiques
sous forme de "fiches" via le HTML */
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

  //cart
  let button = document.querySelector('#addToCart') //html button call
  button.addEventListener('click', buttonClicked) //when clicked = buttonClicked()

  /* Le bouton va ajouter les caractéristiques choisies
  au local storage (LS) pour permettre une validation du panier sous
  certaines conditions. */
  function buttonClicked() {
    let colorSelected = document.querySelector('#colors')
    let quantitySelected = document.querySelector('#quantity')
    let kanapName = product.name
    let kanapPrice = product.price
    let kanapDescription = product.description
    let kanapImage = product.imageUrl
    addToCart(productId, quantitySelected.value, colorSelected.value, kanapName, kanapPrice, kanapDescription, kanapImage)
  }

  /* Fait le lien entre le LS et le panier pour organiser
  le panier : regrouper articles similaires, limiter à
  une quantité max. par article, etc.  */
  function addToCart(id, qty, color, name, price, description, image) {
    let cart = localStorage.getItem('products')
    cart = JSON.parse(cart)

    let productFeatures = {
      idSelected: id,
      quantitySelected: qty,
      colorSelected: color,
      kanapName: name,
      kanapPrice: price,
      kanapDescription: description,
      kanapImage: image,
    }
    /* Force la sélection d'un coloris */
    if ((color == null) || (color == "")) { //alert if color isn't selected
      alert('Veuillez choisir une couleur.')
      return
    }
    /* Force la sélection d'une quantité */
    if ((qty == null) || (qty == "") || (qty == 0) || (qty > 100)) { //qty alert
      alert("Veuillez choisir un nombre d'articles compris entre 1 et 100.")
      return
    }
    /* Si le panier n'est pas vide, ET QUE la quantité
    totale d'un même produit n'excèdera pas 100, alors
    l'incrémentation de la quantité de de produit est
    possible (stocké sur le LS) */
    if (cart != null) { //if cart contains smth...
      for (i = 0; i < cart.length; i++) {
        if ((cart[i].idSelected === productFeatures.idSelected) && (cart[i].colorSelected === productFeatures.colorSelected)) {
          (cart[i].quantitySelected = (+cart[i].quantitySelected) + (+productFeatures.quantitySelected))
          if ((cart[i].quantitySelected) <= 100) {
            localStorage.setItem('products', JSON.stringify(cart))
            alert('Produit(s) bien ajouté(s) au panier.')
          } else {
            alert('La quantité maximale par produit est limitée à 100.')
          }
          return
        }
      }
      cart.push(productFeatures)
      localStorage.setItem('products', JSON.stringify(cart))
    } else {
      let updatedCart = []
      alert('Produit(s) bien ajouté(s) au panier.')
      updatedCart.push(productFeatures)
      localStorage.setItem('products', JSON.stringify(updatedCart))
    }
  }
}