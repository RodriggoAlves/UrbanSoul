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
let selectedProduct = null;
let selectedPayment = null;

function initProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // limpar antes de adicionar
    products.forEach(product => {
        const productHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">🛍️ Adicionar ao Carrinho</button>
                </div>
            </div>`;
        container.innerHTML += productHTML;
    });
}

function addToCart(productId) {
    selectedProduct = products.find(p => p.id === productId);
    document.getElementById('modal-product-image').src = selectedProduct.image;
    document.getElementById('modal-product-name').textContent = selectedProduct.name;
    document.getElementById('size-modal').style.display = 'flex';
}

function selectSize(size) {
    if (selectedProduct) {
        const productWithSize = { ...selectedProduct, size: size };
        cart.push(productWithSize);
        updateCart();
        saveToLocalStorage();
        closeSizeModal();
    }
}

function closeSizeModal() {
    document.getElementById('size-modal').style.display = 'none';
    selectedProduct = null;
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
                <span>${item.name} ${item.size ? `(${item.size})` : ''}</span>
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
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    showPaymentModal();
}

function showPaymentModal() {
    const modal = document.getElementById('payment-modal');
    const itemsList = document.getElementById('payment-items');
    const totalAmount = document.getElementById('payment-total');

    itemsList.innerHTML = cart.map(item => `<li>${item.name} ${item.size ? `(${item.size})` : ''}</li>`).join('');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalAmount.textContent = `R$ ${total.toFixed(2)}`;

    selectedPayment = null;
    document.querySelectorAll('.payment-option').forEach(btn => btn.classList.remove('selected'));

    modal.style.display = 'flex';
}

function selectPayment(method) {
    selectedPayment = method;
    document.querySelectorAll('.payment-option').forEach(btn => btn.classList.remove('selected'));
    document.getElementById(`payment-${method}`).classList.add('selected');
}

function generateWhatsAppMessage() {
    const now = new Date();
    const hour = now.getHours();
    let greeting = "Boa tarde";

    if (hour >= 0 && hour < 6) {
        greeting = "Boa madrugada";
    } else if (hour >= 6 && hour < 12) {
        greeting = "Bom dia";
    } else if (hour >= 12 && hour < 18) {
        greeting = "Boa tarde";
    } else {
        greeting = "Boa noite";
    }

    let productsList = cart.map(item => `- ${item.name} (${item.size || "Tamanho não selecionado"})`).join('\n');
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    let paymentText = selectedPayment ? selectedPayment.toUpperCase() : "Não selecionada";

    const message = `${greeting}, vim direcionado do site e preciso finalizar o meu pedido\n\n` +
                    `Produtos selecionados:\n${productsList}\n\n` +
                    `Valor do pedido: R$ ${total.toFixed(2)}\n\n` +
                    `Forma de pagamento: ${paymentText}`;

    return message;
}

function confirmPayment() {
    if (!selectedPayment) {
        alert('Selecione uma forma de pagamento!');
        return;
    }

    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);

    cart = [];
    updateCart();
    saveToLocalStorage();
    document.getElementById('payment-modal').style.display = 'none';
    toggleCart();

    window.location.href = `https://wa.me/5562981917921?text=${encodedMessage}`;
}

function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.addEventListener('DOMContentLoaded', () => {
    initProducts();
    updateCart();
});
