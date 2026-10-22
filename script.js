const panier = document.querySelector('#shop');
const totalSpan = document.querySelector('#total');

let total = 0;
let nombreProduits = 0;

// Fonction pour ajouter un produit
function ajouterProduit(titre, prix) {
    const li = document.createElement('li');

    const texte = document.createElement('span');
    texte.textContent = `${titre} _ ${prix} DH`;

    const btn = document.createElement('button');
    btn.textContent = 'supprimer';
    btn.className = 'supprimer';
    btn.style.marginLeft = '10px';

    li.appendChild(texte);
    li.appendChild(btn);

    // Créer la liste du panier
    let listePanier = document.querySelector('#liste-panier');

    if (!listePanier) {
        listePanier = document.createElement('ul');
        listePanier.id = 'liste-panier';
        listePanier.style.marginTop = '15px';

        const totalElement = document.querySelector('#total');

        totalElement.parentElement.before(listePanier);
    }

    listePanier.appendChild(li);

    total += prix;
    nombreProduits++;

    panier.textContent = nombreProduits;
    totalSpan.textContent = total;
}

// Récupérer tous les boutons Ajouter
const boutons = document.querySelectorAll('button');

boutons.forEach((bouton) => {
    if (bouton.textContent.trim() === 'Ajouter') {

        bouton.addEventListener('click', () => {
            const bloc = bouton.closest('.mb-3');
            const image = bloc.querySelector('img').getAttribute('src');

            let titre = '';
            let prix = 0;

            if (image === 'beginner.png') {
                titre = 'Beginner';
                prix = 400;
            } else if (image === 'summoning.png') {
                titre = 'Summoning';
                prix = 430;
            } else if (image === 'dark.png') {
                titre = 'Dark';
                prix = 450;
            } else if (image === 'lucky.png') {
                titre = 'Lucky';
                prix = 500;
            }

            if (prix > 0) {
                ajouterProduit(titre, prix);
            }
        });
    }
});

// Supprimer un produit
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('supprimer')) {

        const li = e.target.closest('li');
        const texte = li.querySelector('span').textContent;

        const prixTexte = texte.split('_')[1]
            .replace('DH', '')
            .trim();

        const prix = parseInt(prixTexte, 10);

        if (!isNaN(prix)) {
            total -= prix;
            nombreProduits--;

            totalSpan.textContent = total;
            panier.textContent = nombreProduits;
        }

        li.remove();
    }
});