let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedProduct = null;
let selectedPayment = null;

// Inicializa a listagem de produtos na página
function initProducts() {
  const container = document.getElementById('products-container');
  container.innerHTML = '';
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

// Ao clicar em "Adicionar ao Carrinho", abre modal de tamanho
function addToCart(productId) {
  selectedProduct = products.find(p => p.id === productId);
  document.getElementById('modal-product-image').src = selectedProduct.image;
  document.getElementById('modal-product-name').textContent = selectedProduct.name;
  document.getElementById('size-modal').style.display = 'flex';
}

// Usuário seleciona um tamanho
function selectSize(size) {
  if (selectedProduct) {
    const productWithSize = { ...selectedProduct, size: size };
    cart.push(productWithSize);
    updateCart();
    saveToLocalStorage();
    closeSizeModal();
  }
}

// Fecha o modal de tamanho
function closeSizeModal() {
  document.getElementById('size-modal').style.display = 'none';
  selectedProduct = null;
}

// Remove item do carrinho
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  saveToLocalStorage();
}

// Atualiza quantidade no ícone e conteúdo do modal de carrinho
function updateCart() {
  updateCartIcon();
  updateCartModal();
}

// Atualiza contador de itens no ícone do carrinho
function updateCartIcon() {
  document.querySelector('.cart-count').textContent = cart.length;
}

// Preenche o conteúdo do modal de carrinho
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

// Abre/fecha o modal do carrinho
function toggleCart() {
  document.getElementById('cart-modal').classList.toggle('show');
}

// Inicia o fluxo de checkout
function handleCheckout() {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  showPaymentModal();
}

// Salva o carrinho no localStorage
function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

document.addEventListener('DOMContentLoaded', () => {
  initProducts();
  updateCart();
});