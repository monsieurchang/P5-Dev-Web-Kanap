/* 11. AFFICHER LE NUMÉRO DE COMMANDE */

/* Récupération du numéro de commande (n.d.c.) */
let urlParams = new URLSearchParams(document.location.search)
let orderNumber = urlParams.get('orderId')

/* Attribution du n.d.c. dans le message de confirmation */
document.getElementById('orderId').textContent = orderNumber