//fetch
fetch('http://localhost:3000/api/products/')
    .then((response) => response.json())
    .then((product) => {
        displayCartArray(product)
    })

// récupération LS
function displayCartArray() {
    let str = localStorage.getItem('products')
    let products = []
    if (str != null) {
        products = JSON.parse(str)
    }
    if (products === null || products.length === 0) {
        alert('Votre panier est vide.')
        return //(peut être pertinent mais à confirmer plus tard)
    } else {
        displayArticlesInCart(products)
        cartTotalPrice(products)
        editItemQuantity(products)
        removeItemFromCart(products)
    }
}

function displayArticlesInCart(products) {
    let selectedItems = document.querySelector('#cart__items')
    let elements = ""
    products.forEach((productFeatures) => {
        elements += `
        <article class="cart__item" data-id="${productFeatures.idSelected}" data-color="${productFeatures.colorSelected}">
        <div class="cart__item__img">
        <img src="${productFeatures.kanapImage}" alt="${productFeatures.alt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>Nom du produit : ${productFeatures.kanapName}</h2>
        <p>Couleur : ${productFeatures.colorSelected}</p>
        <p>Prix : ${productFeatures.kanapPrice} €</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productFeatures.quantitySelected}">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem" data-id="${productFeatures.idSelected}" data-color="${productFeatures.colorSelected}">Supprimer</p>
        </div>
        </div>
        </div>
        </article >`
    })
    selectedItems.innerHTML = elements
    cartTotalPrice(products)
}

function cartTotalPrice(products) {
    let totalPrice = products.reduce(
        (sum, productFeatures) =>
            sum + productFeatures.kanapPrice * productFeatures.quantitySelected, 0)
    let totalQuantity = products.reduce(
        (sum, productFeatures) =>
            sum + +productFeatures.quantitySelected, 0)

    document.querySelector('#totalPrice').textContent = totalPrice
    document.querySelector('#totalQuantity').textContent = totalQuantity
}

function editItemQuantity(products) {
    let cardItems = document.querySelectorAll('.cart__item')
    cardItems.forEach((items) => {
        items.addEventListener('change', (event) => {
            let productFeatures = products.find(
                (productFeatures) =>
                    productFeatures.idSelected === items.dataset.id &&
                    productFeatures.colorSelected === items.dataset.color
            )
            productFeatures.quantitySelected = +(event.target.value)
            localStorage.setItem('cart', JSON.stringify(products))
            cartTotalPrice(products)
        })
    })
}

function removeItemFromCart(products) {
    let deleteItem = document.querySelectorAll('.deleteItem')
    deleteItem.forEach((items) => {
        items.addEventListener('click', () => {
            let productFeatures = products.findIndex(
                (productFeatures) =>
                    productFeatures.idSelected === items.dataset.id &&
                    productFeatures.colorSelected === items.dataset.color
            )
            products.splice(productFeatures, 1)
            localStorage.setItem('products', JSON.stringify(products))
            window.location.reload()
            displayArticlesInCart(products)
        })
    })
}

// bug : alerte "page panier vide" empêche rechargement de la page panier