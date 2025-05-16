const products = [
    {id: 1, name: 'Moletom Oversized', price: 299.90, image: '/img/CamisaOversize.png'},
    {id: 2, name: 'T-shirt Graphic', price: 149.90, image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d'},
    {id: 3, name: 'Calça Cargo', price: 399.90, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80'},
    {id: 4, name: 'Tênis Retro', price: 599.90, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772'},
    {id: 5, name: 'Moletom Oversized', price: 299.90, image: '/img/CamisaOversize.png'},
    {id: 6, name: 'T-shirt Graphic', price: 149.90, image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d'},
    {id: 7, name: 'Calça Cargo', price: 399.90, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80'},
    {id: 8, name: 'Tênis Retro', price: 599.90, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772'}
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function initProducts() {
    const container = document.getElementById('products-container');
    
    products.forEach(product => {
    
        const productHTML = `
        
    <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            
            <div class="product-info">
            
            <h3>${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                🛍️ Adicionar ao Carrinho
                </button>
            
                </div>
        </div>`;

    container.innerHTML += productHTML;
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
    saveToLocalStorage();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    saveToLocalStorage();
}

function updateCart() {
    updateCartIcon();
    updateCartModal();
}

function updateCartIcon() {
    document.querySelector('.cart-count').textContent = cart.length;
}

function updateCartModal() {
    const itemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    itemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
    total += item.price;
    itemsContainer.innerHTML += `

        <div class="cart-item">
            
            <span>${item.name}</span>
            
            <div class="item-controls">
                <span>R$ ${item.price.toFixed(2)}</span>
                <span class="remove-item" onclick="removeFromCart(${index})">✕</span>
            </div>

        </div>`;
    });
    
    totalElement.textContent = total.toFixed(2);
}

function toggleCart() {
    document.getElementById('cart-modal').classList.toggle('show');
}

function handleCheckout() {
    if(cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    // Se o cliente confirmar ele sera redirecionado para o Whatsapp

    if(confirm('Deseja finalizar a compra?')) {
        cart = [];
        updateCart();
        saveToLocalStorage();
        toggleCart();
        window.location.href = "https://wa.me/5562981917921"
    }
}

function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.addEventListener('DOMContentLoaded', () => {
    initProducts();
    updateCart();
});