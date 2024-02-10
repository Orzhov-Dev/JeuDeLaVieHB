const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Taille de la grille
const rows = 50;
const cols = 50;
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
    ctx.fillStyle = "black";
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 1) {
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            }
        }
    }
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


let gameInterval
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

// Fonction pour ajouter le motif Glider à la grille
function addGliderGunPattern() {
    let gliderGun = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];

    // Position de départ du Glider Gun
    let startX = 5;
    let startY = 5;

    // Ajouter le motif Glider Gun à la grille à la position actuelle
    for (let i = 0; i < gliderGun.length; i++) {
        for (let j = 0; j < gliderGun[i].length; j++) {
            grid[startY + i][startX + j] = gliderGun[i][j];
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
    
    // Ajouter le motif de la fleur à la grille
    let startX = Math.floor(Math.random() * (cols - 10)); // Position de départ aléatoire en x
    let startY = Math.floor(Math.random() * (rows - 10)); // Position de départ aléatoire en y

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if ((i + j) % 2 === 0) { // Alterner les cellules vivantes pour créer le motif de la fleur
                grid[startY + i][startX + j] = 1;
            }
        }
    }

    // Redessiner la grille avec le nouveau motif ajouté
    drawGrid();
}

// Gestionnaires d'événements pour les boutons
document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("stopBtn").addEventListener("click", stopGame);
document.getElementById("resetBtn").addEventListener("click", resetGame);
document.getElementById("gliderBtn").addEventListener("click", addGliderGunPattern);
document.getElementById("explosionBtn").addEventListener("click", addExplosionPattern);
document.getElementById("flowerBtn").addEventListener("click", addFlowerPattern);

// Initialisation du jeu
drawGrid();