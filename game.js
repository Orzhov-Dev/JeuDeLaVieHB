const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Taille de la grille
const rows = 80;
const cols = 80;
const cellSize = 10; // Taille d'une cellule en pixels

// Création de la grille
let grid = [];
for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
        grid[i][j] = 0;
    }
}

// Fonction pour dessiner la grille
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            ctx.fillStyle = grid[i][j] === 1 ? '#4CAF50' : '#fff';
            ctx.beginPath();
            ctx.rect(j * cellSize, i * cellSize, cellSize, cellSize);
            ctx.fill();
            if (grid[i][j] === 1) {
                ctx.shadowColor = '#45a049';
                ctx.shadowBlur = 10;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.fillStyle = randomColor(); // Utiliser une couleur aléatoire pour les cellules vivantes
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
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
    let newGrid = [];
    for (let i = 0; i < rows; i++) {
        newGrid[i] = [];
        for (let j = 0; j < cols; j++) {
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
            if (newX >= 0 && newX < rows && newY >= 0 && newY < cols && !(i === 0 && j === 0)) {
                count += grid[newX][newY];
            }
        }
    }
    return count;
}

let gameInterval;
// Fonction pour démarrer le jeu
function startGame() {
    // Mettre en place une boucle de rafraîchissement
    gameInterval = setInterval(updateGrid, 100); // Mettre à jour la grille toutes les 100 millisecondes (ajustable selon le besoin)
}

// Fonction pour arrêter le jeu
function stopGame() {
    // Arrêter la boucle de rafraîchissement
    clearInterval(gameInterval);
}

// Fonction pour réinitialiser le jeu
function resetGame() {
    // Réinitialiser la grille en remettant toutes les cellules à 0
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = 0;
        }
    }
    // Redessiner la grille
    drawGrid();
}

// Fonction pour ajouter le motif Life à la grille
function addLifePattern() {
    let gosperGliderGun = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];

    // Position de départ du Gosper Glider Gun 
    let startX = 1;
    let startY = 1;

    // Ajouter le motif Gosper Glider Gun à la grille à la position actuelle
    for (let i = 0; i < gosperGliderGun.length; i++) {
        for (let j = 0; j < gosperGliderGun[i].length; j++) {
            grid[startY + i][startX + j] = gosperGliderGun[i][j];
        }
    }

    // Redessiner la grille avec le nouveau motif ajouté
    drawGrid();
}

// Fonction pour ajouter le motif d'explosion à la grille
function addExplosionPattern() {
    // Ajouter le motif d'explosion (feu d'artifice chaotique) à la grille
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (Math.random() < 0.3) { // Changer 0.3 pour ajuster la densité d'explosions
                grid[i][j] = 1;
            }
        }
    }
    // Redessiner la grille avec le nouveau motif ajouté
    drawGrid();
}

// Fonction pour ajouter le motif de la fleur à la grille
function addFlowerPattern() {
     let tenCellsPufferTrain = [
        [0, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 1, 0, 0, 0, 0],
    ];

    // Position de départ du 10-cells puffer train 
    let startX = 1;
    let startY = 1;

    // Ajouter le motif 10-cells puffer train à la grille à la position actuelle
    for (let i = 0; i < tenCellsPufferTrain.length; i++) {
        for (let j = 0; j < tenCellsPufferTrain[i].length; j++) {
            grid[startY + i][startX + j] = tenCellsPufferTrain[i][j];
        }
    }

    // Redessiner la grille avec le nouveau motif ajouté
    drawGrid();
}

// Gestionnaires d'événements pour les boutons
document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("stopBtn").addEventListener("click", stopGame);
document.getElementById("resetBtn").addEventListener("click", resetGame);
document.getElementById("lifeBtn").addEventListener("click", addLifePattern);
document.getElementById("explosionBtn").addEventListener("click", addExplosionPattern);
document.getElementById("flowerBtn").addEventListener("click", addFlowerPattern);

// Initialisation du jeu
drawGrid();

