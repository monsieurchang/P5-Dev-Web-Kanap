/* AJOUTER DES PRODUITS DANS LE PANIER */

/* Récupération des données depuis l'API */
fetch('http://localhost:3000/api/products/') //fetch
    .then((response) => response.json())
    .then((product) => {
        displayCartArray(product)
    })

/* Sonde le LS pour voir si des données s'y trouvent.
Si oui, on les affiche sous la forme d'un panier
d'achat. Si non, message d'alerte "Panier vide" */
function displayCartArray() { //récupération LS
    let str = localStorage.getItem('products')
    let products = []
    if (str != null) {
        products = JSON.parse(str)
    }
    if (products === null || products.length === 0) {
        alert('Votre panier est vide.')
        return
    } else {
        displayArticlesInCart(products)
        cartTotalPrice(products)
        editItemQuantity(products)
        removeItemFromCart(products)
    }
}

/* Affiche les produits choisis par l'utilisateur sous
forme de fiches produits */
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

/* Affiche la quantité de produits choisis ainsi que
le prix total du panier */
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

/* Permet de modifier la quantité d'un produit déjà
présent dans le panier. Les limites min et max sont
effectives */
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

            if (((productFeatures.quantitySelected) <= 100) && ((productFeatures.quantitySelected) > 0)) {
                localStorage.setItem('products', JSON.stringify(products))
                cartTotalPrice(products)
            } else {
                alert("Veuillez choisir un nombre d'articles compris entre 1 et 100.")
            }
        })
    })
}

/* Permet de supprimer un article présent dans le
panier + Rafraichit automatiquement la page panier */
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
            window.location.reload() // utiliser une autre méthode : refresh le DOM ?
            displayArticlesInCart(products)
        })
    })
}

let firstNameField = document.getElementById('firstName')
let firstNameRegex = /^[a-zA-ZàáâäãåąčćฬԹƙԹՌԺԹęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]+$/u
firstNameField.addEventListener('input', function () {
    let errorMsg = document.getElementById('firstNameErrorMsg')
    if (firstNameField.value.match(firstNameRegex)) {
        errorMsg.textContent = null
    } else {
        errorMsg.textContent = 'Invalide'
    }
})

/* Permet de valider ou non un contenu en fonction du
format attendu imposé par les expressions régulières
(Regex) + Affichage d'un message d'erreur si le format
n'est pas respecté. Ex: pas de chiffre dans un nom */
let lastNameField = document.getElementById('lastName')
let lastNameRegex = /^[a-zA-ZàáâäãåąčćԲԾՐȝעȝՐęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]+$/u
lastNameField.addEventListener('input', function () {
    let errorMsg = document.getElementById('lastNameErrorMsg')
    if (lastNameField.value.match(lastNameRegex)) {
        errorMsg.textContent = null
    } else {
        errorMsg.textContent = 'Invalide'
    }
})

let addressField = document.getElementById('address')
let addressRegex = /^([1-9][0-9]*(?:-[1-9][0-9]*)*)[\s,-]+(?:(bis|ter|qua)[\s,-]+)?([\w]+[\-\w]*)[\s,]+([-\w].+\d{5})$/gmiu
addressField.addEventListener('input', function () {
    let errorMsg = document.getElementById('addressErrorMsg')
    if (addressField.value.match(addressRegex)) {
        errorMsg.textContent = null
    } else {
        errorMsg.textContent = 'Invalide. (ex : 2 rue du Kanap 75000)'
    }
})

let cityField = document.getElementById('city')
let cityRegex = /^[a-zA-ZàáâäãåąčćʍԾՌֆɿȝՄՐՇɧԹՌԳęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]+$/u
cityField.addEventListener('input', function () {
    let errorMsg = document.getElementById('cityErrorMsg')
    if (cityField.value.match(cityRegex)) {
        errorMsg.textContent = null
    } else {
        errorMsg.textContent = 'Invalide'
    }
})

let emailField = document.getElementById('email')
let emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
emailField.addEventListener('input', function () {
    let errorMsg = document.getElementById('emailErrorMsg')
    if (emailField.value.match(emailRegex)) {
        errorMsg.textContent = null
    } else {
        errorMsg.textContent = 'Invalide. (ex : bernard@kanap.fr)'
    }
})

/* Écoute du bouton "commander" sous conditions de
conformité du contenu (Regex, trim, etc.) */
let orderForm = document.querySelector('.cart__order__form')
orderForm.addEventListener('submit', (event) => {
    event.preventDefault()

    let contact = {
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        address: addressField.value,
        city: cityField.value,
        email: emailField.value,
    }

    if (
        firstNameField.value === "" ||
        lastNameField.value === "" ||
        addressField.value === "" ||
        cityField.value === "" ||
        emailField.value === ""
    ) {
        alert('Merci de renseigner vos coordonnées pour passer la commande.')
    }

    else if (
        !firstNameRegex.test(firstNameField.value) ||
        !lastNameRegex.test(lastNameField.value) ||
        !addressRegex.test(addressField.value) ||
        !cityRegex.test(cityField.value) ||
        !emailRegex.test(emailField.value)
    ) {
        alert('Merci de renseigner correctement vos coordonnées.')
    }

    else {
        let products = []
        products.forEach((productFeatures) => {
            products.push(productFeatures.idSelected)
        })
        let order = {
            contact,
            products,
        }

        /* Requête 'POST' sur l’API pour récupérer
        le numéro de commande + Redirriger l'utilisateur
        vers la page "Confirmation" */
        fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(order),
        })
            .then((response) => {
                return response.json()
            })
            .then((confirm) => {
                window.location.href = './confirmation.html?orderId=' + confirm.orderId
                localStorage.clear()
            })
    }
})