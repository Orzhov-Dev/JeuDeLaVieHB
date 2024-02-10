// Récupération du canvas et du contexte 2D
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Définition de la taille de la grille et de la taille des cellules
const rows = 100;
const cols = 100;
const cellSize = 8; // Taille d'une cellule en pixels

// Initialisation de la grille
let grid = [];
for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
        grid[i][j] = 0;
    }
}

// Fonction pour dessiner la grille
function drawGrid() {
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Remplir le canvas avec la couleur de fond
    ctx.fillStyle = '#202020';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Parcourir la grille et dessiner les cellules
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // Définir la couleur de la cellule en fonction de son état
            // Si la cellule est vivante (1), la couleur est verte, sinon la couleur est la couleur de fond
            ctx.fillStyle = grid[i][j] === 1 ? '#4CAF50' : '#202020';

            // Dessiner la cellule sous forme de cercle
            // Le cercle est centré sur le coin supérieur gauche de chaque cellule
            // Le rayon du cercle est la moitié de la taille d'une cellule
            ctx.beginPath();
            ctx.arc((j + 0.5) * cellSize, (i + 0.5) * cellSize, cellSize / 2, 0, Math.PI * 2);
            ctx.fill();

            // Ajouter un effet de couleur et d'ombre pour les cellules vivantes
            // Si la cellule est vivante, ajouter un effet de couleur et d'ombre
            if (grid[i][j] === 1) {
                // Ajouter une ombre verte autour des cellules vivantes
                ctx.shadowColor = '#45a049';
                ctx.shadowBlur = 10;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                // Utiliser une couleur aléatoire pour les cellules vivantes
                ctx.fillStyle = randomColor();
                ctx.fill();
                // Réinitialiser l'ombre pour éviter qu'elle ne soit appliquée à d'autres éléments
                ctx.shadowColor = 'transparent';
            }
        }
    }
}


// Fonction pour générer une couleur aléatoire entre le vert et le bleu cyan
function randomColor() {
    const green = Math.floor(Math.random() * 156) + 100; // Composante verte aléatoire (entre 100 et 255)
    const blue = Math.floor(Math.random() * 156) + 100; // Composante bleue aléatoire (entre 100 et 255)
    return `rgb(0, ${green}, ${blue})`; // Retourner une couleur entre le vert et le bleu cyan
}

// Fonction pour mettre à jour la grille selon les règles du jeu de la vie
function updateGrid() {
    // Création d'une nouvelle grille pour stocker les modifications
    let newGrid = [];
    for (let i = 0; i < rows; i++) {
        newGrid[i] = [];
        for (let j = 0; j < cols; j++) {
            // Compter le nombre de voisins vivants
            let neighbors = countNeighbors(i, j);

            // Appliquer les règles du jeu de la vie
            if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
                newGrid[i][j] = 0; // Une cellule vivante avec moins de 2 ou plus de 3 voisins meurt
            } else if (grid[i][j] === 0 && neighbors === 3) {
                newGrid[i][j] = 1; // Une cellule morte avec exactement 3 voisins devient vivante
            } else {
                newGrid[i][j] = grid[i][j]; // Sinon, la cellule reste dans son état actuel
            }
        }
    }
    grid = newGrid; // Mettre à jour la grille avec la nouvelle grille
    drawGrid(); // Redessiner la grille mise à jour
}

// Fonction pour compter le nombre de voisins vivants d'une cellule
function countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let newX = x + i;
            let newY = y + j;
            // Vérifier les limites de la grille et éviter de compter la cellule elle-même
            if (newX >= 0 && newX < rows && newY >= 0 && newY < cols && !(i === 0 && j === 0)) {
                count += grid[newX][newY];
            }
        }
    }
    return count;
}

// Fonction pour démarrer le jeu de la vie
function startGame() {
    setInterval(updateGrid, 100); // Appeler la fonction updateGrid toutes les 100 millisecondes
}

// Appel de la fonction startGame pour démarrer le jeu
startGame();
