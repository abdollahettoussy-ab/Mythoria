
const panier = document.querySelector('#shop');
const totalSpan = document.querySelector('#total');

let produits = [];
let total = 0;
let nombreProduits = 0;

// 1. Créer la liste du panier
let listePanier = document.querySelector('#liste-panier');

if (!listePanier) {
    listePanier = document.createElement('ul');
    listePanier.id = 'liste-panier';

    if (totalSpan && totalSpan.parentElement) {
        totalSpan.parentElement.before(listePanier);
    }
}

// 2. Sauvegarder le panier avec JSON
function sauvegarderPanier() {
    localStorage.setItem('panier', JSON.stringify(produits));
}

// 3. Afficher le panier et calculer le total
function afficherPanier() {
    listePanier.innerHTML = '';

    total = 0;
    nombreProduits = produits.length;

    produits.forEach((produit, index) => {
        const li = document.createElement('li');

        const texte = document.createElement('span');
        texte.textContent = `${produit.titre} - ${produit.prix} DH`;

        const btn = document.createElement('button');
        btn.textContent = 'Supprimer';
        btn.type = 'button';
        btn.className = 'supprimer';
        btn.dataset.index = index;
        btn.style.marginLeft = '10px';

        li.append(texte, btn);
        listePanier.appendChild(li);

        total += produit.prix;
    });

    if (panier) {
        panier.textContent = nombreProduits;
    }

    if (totalSpan) {
        totalSpan.textContent = total;
    }
}

// 4. Ajouter un produit
function ajouterProduit(titre, prix, image) {
    produits.push({
        titre: titre,
        prix: prix,
        image: image
    });

    sauvegarderPanier();
    afficherPanier();
}

// 5. Relier les boutons Ajouter
document.querySelectorAll('button').forEach(bouton => {
    if (bouton.textContent.trim() !== 'Ajouter') {
        return;
    }

    if (bouton.dataset.panierLie === 'oui') {
        return;
    }

    bouton.dataset.panierLie = 'oui';

    bouton.addEventListener('click', function () {
        const bloc = bouton.closest('.mb-3');

        if (!bloc) {
            console.error('Le bloc du produit est introuvable');
            return;
        }

        const img = bloc.querySelector('img');

        if (!img) {
            console.error('Image du produit introuvable');
            return;
        }

        const image = img.getAttribute('src');

        const prixProduits = {
            'beginner.png': ['Beginner', 400],
            'summoning.png': ['Summoning', 430],
            'dark.png': ['Dark', 450],
            'lucky.png': ['Lucky', 500]
        };

        const nomImage = image.split('/').pop().split('?')[0];
        const produit = prixProduits[nomImage];

        if (!produit) {
            console.error('Produit non reconnu :', nomImage);
            return;
        }

        ajouterProduit(produit[0], produit[1], image);
    });
});

// 6. Supprimer un produit
listePanier.addEventListener('click', function (e) {
    const bouton = e.target.closest('.supprimer');

    if (!bouton || !listePanier.contains(bouton)) {
        return;
    }

    const index = Number(bouton.dataset.index);

    if (!Number.isInteger(index) || index < 0 || index >= produits.length) {
        return;
    }

    produits.splice(index, 1);

    sauvegarderPanier();
    afficherPanier();
});

// 7. Charger les produits sauvegardés avec JSON
function chargerPanier() {
    const texte = localStorage.getItem('panier');

    if (texte) {
        try {
            const donnees = JSON.parse(texte);

            if (Array.isArray(donnees)) {
                produits = donnees.filter(produit =>
                    produit &&
                    typeof produit.titre === 'string' &&
                    Number.isFinite(produit.prix)
                );
            }
        } catch (erreur) {
            console.error('Erreur de lecture du panier :', erreur);
            produits = [];
        }
    }

    afficherPanier();
}

chargerPanier();
