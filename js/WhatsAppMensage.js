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

  // Recupera os dados do localStorage
  const userData = JSON.parse(localStorage.getItem("cadastroUsuario") || "{}");
  const userName = userData.nome || "Cliente";

  let productsList = cart
    .map(item => `- ${item.name} (${item.size || "Tamanho não selecionado"})`)
    .join('\n');
  let total = cart.reduce((sum, item) => sum + item.price, 0);
  let paymentText = selectedPayment ? selectedPayment.toUpperCase() : "Não selecionada";

  // Monta a parte do endereço se existir no localStorage
  let addressInfo = "";
  if (userData.rua) {
    addressInfo = `\n\n--- DADOS PARA ENTREGA ---\n` +
                 `Nome: ${userName}\n` +
                 `Endereço: ${userData.rua}\n` +
                 `Bairro: ${userData.bairro}\n` +
                 `Cidade: ${userData.cidade}/${userData.estado}\n` +
                 `CEP: ${userData.cep}`;
  }

  const message =
    `${greeting}, me chamo ${userName}. Vim direcionado do site e preciso finalizar o meu pedido\n\n` +
    `PRODUTOS SELECIONADOS:\n${productsList}\n\n` +
    `VALOR TOTAL: R$ ${total.toFixed(2)}\n\n` +
    `FORMA DE PAGAMENTO: ${paymentText}` +
    `${addressInfo}`;

  return message;
}