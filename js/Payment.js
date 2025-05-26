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