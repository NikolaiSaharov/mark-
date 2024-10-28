// Пример данных для игр и продавцов
const games = [
    { id: 1, title: "Игра 1", price: 19.99, seller: "Продавец 1", image: "images/game1.jpg" },
    { id: 2, title: "Игра 2", price: 29.99, seller: "Продавец 2", image: "images/game2.jpg" },
    { id: 3, title: "Игра 3", price: 39.99, seller: "Продавец 1", image: "images/game3.jpg" },
    { id: 4, title: "Игра 4", price: 49.99, seller: "Продавец 3", image: "images/game4.jpg" },
];

const sellers = [
    { id: 1, name: "Fromsoftware", image: "images/seller1.jpg" },
    { id: 2, name: "NaughtyDog", image: "images/seller2.jpg" },
    { id: 3, name: "Bandai Namco", image: "images/seller3.jpg" },
];

// Функция для отображения игр в каталоге
function displayGames(gamesList) {
    const gamesContainer = document.getElementById('games-container');
    gamesContainer.innerHTML = '';

    gamesList.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('col-md-4', 'mb-4');
        gameCard.innerHTML = `
            <div class="game-card">
                <img src="${game.image}" alt="${game.title}" class="img-fluid">
                <h3>${game.title}</h3>
                <p>Цена: $${game.price}</p>
                <button onclick="addToCart(${game.id})" class="btn btn-dark">Добавить в корзину</button>
            </div>
        `;
        gamesContainer.appendChild(gameCard);
    });
}

// Функция для отображения продавцов
function displaySellers() {
    const sellersContainer = document.getElementById('sellers-container');
    sellersContainer.innerHTML = '';

    sellers.forEach(seller => {
        const sellerCard = document.createElement('div');
        sellerCard.classList.add('col-md-4', 'mb-4');
        sellerCard.innerHTML = `
            <div class="seller-card">
                <img src="${seller.image}" alt="${seller.name}" class="img-fluid rounded-circle">
                <h3>${seller.name}</h3>
                <button onclick="showSellerGames('${seller.name}')" class="btn btn-dark">Показать игры</button>
            </div>
        `;
        sellersContainer.appendChild(sellerCard);
    });
}

// Функция для отображения игр конкретного продавца
function showSellerGames(sellerName) {
    const sellerGames = games.filter(game => game.seller === sellerName);
    displayGames(sellerGames);
}

// Функция для добавления игры в корзину
const cart = [];

function addToCart(gameId) {
    const game = games.find(g => g.id === gameId);
    if (game) {
        cart.push(game);
        updateCart();
        Swal.fire({
            icon: 'success',
            title: 'Успешно!',
            text: `Игра "${game.title}" была добавлена в корзину!`,
            confirmButtonText: 'OK'
        });
    }
}

// Функция для обновления корзины
function updateCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item', 'mb-3');
        cartItem.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${item.image}" alt="${item.title}" class="img-fluid me-3" style="max-width: 50px;">
                <div>
                    <h4>${item.title}</h4>
                    <p>Цена: $${item.price}</p>
                </div>
                <button onclick="removeFromCart(${item.id})" class="btn btn-danger ms-auto">Удалить</button>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });
}

// Функция для удаления игры из корзины
function removeFromCart(gameId) {
    const index = cart.findIndex(item => item.id === gameId);
    if (index !== -1) {
        const removedGame = cart.splice(index, 1)[0];
        updateCart();
        Swal.fire({
            icon: 'success',
            title: 'Успешно!',
            text: `Игра "${removedGame.title}" была удалена из корзины!`,
            confirmButtonText: 'OK'
        });
    }
}

// Функция для сортировки игр
function sortGames(sortBy) {
    let sortedGames = [...games];
    if (sortBy === 'price') {
        sortedGames.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'title') {
        sortedGames.sort((a, b) => a.title.localeCompare(b.title));
    }
    displayGames(sortedGames);
}

// Функция для поиска игр
function searchGames(query) {
    const filteredGames = games.filter(game => game.title.toLowerCase().includes(query.toLowerCase()));
    displayGames(filteredGames);
}

// Инициализация отображения игр и продавцов
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('catalog.html')) {
        displayGames(games);
        document.getElementById('sort-select').addEventListener('change', (e) => sortGames(e.target.value));
        document.getElementById('search-input').addEventListener('input', (e) => searchGames(e.target.value));
    } else if (window.location.pathname.includes('sellers.html')) {
        displaySellers();
    } else if (window.location.pathname.includes('cart.html')) {
        updateCart();
    }
});