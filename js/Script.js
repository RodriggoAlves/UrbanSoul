const products = [
  { id: 1,  name: 'Moletom Oversized', price: 299.90, image: '/img/CamisaOversize.png' },
  { id: 2,  name: 'T-shirt Graphic',  price: 149.90, image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d' },
  { id: 3,  name: 'Calça Cargo',      price: 399.90, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80' },
  { id: 4,  name: 'Tênis Retro',       price: 599.90, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772' },
  { id: 5,  name: 'Moletom Oversized', price: 299.90, image: '/img/CamisaOversize.png' },
  { id: 6,  name: 'T-shirt Graphic',  price: 149.90, image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d' },
  { id: 7,  name: 'Calça Cargo',      price: 399.90, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80' },
  { id: 8,  name: 'Tênis Retro',       price: 599.90, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772' }
];

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

// Exibe o modal de seleção de pagamento e preenche itens + total
function showPaymentModal() {
  const modal = document.getElementById('payment-modal');
  const itemsList = document.getElementById('payment-items');
  const totalAmount = document.getElementById('payment-total');

  itemsList.innerHTML = cart
    .map(item => `<li>${item.name} ${item.size ? `(${item.size})` : ''}</li>`)
    .join('');
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalAmount.textContent = `R$ ${total.toFixed(2)}`;

  selectedPayment = null;
  document.querySelectorAll('.payment-option').forEach(btn => btn.classList.remove('selected'));

  modal.style.display = 'flex';
}

// Marca qual opção de pagamento foi clicada
function selectPayment(method) {
  selectedPayment = method;
  document.querySelectorAll('.payment-option').forEach(btn => btn.classList.remove('selected'));
  document.getElementById(`payment-${method}`).classList.add('selected');
}

// Gera a mensagem completa para o WhatsApp
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

  let productsList = cart
    .map(item => `- ${item.name} (${item.size || "Tamanho não selecionado"})`)
    .join('\n');
  let total = cart.reduce((sum, item) => sum + item.price, 0);
  let paymentText = selectedPayment ? selectedPayment.toUpperCase() : "Não selecionada";

  const message =
    `${greeting}, vim direcionado do site e preciso finalizar o meu pedido\n\n` +
    `Produtos selecionados:\n${productsList}\n\n` +
    `Valor do pedido: R$ ${total.toFixed(2)}\n\n` +
    `Forma de pagamento: ${paymentText}`;

  return message;
}

// Fecha o modal de pagamento ao clicar no “X”
function closePaymentModal() {
  document.getElementById('payment-modal').style.display = 'none';
}

// Confirma o pagamento, gera a mensagem e redireciona para o WhatsApp
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
  closePaymentModal();
  toggleCart();

  window.location.href = `https://wa.me/5562981917921?text=${encodedMessage}`;
}

// Salva o carrinho no localStorage
function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

document.addEventListener('DOMContentLoaded', () => {
  initProducts();
  updateCart();
});
