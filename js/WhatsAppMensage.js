/* 15 */ 
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
