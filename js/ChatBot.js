const chatbotBtn = document.getElementById("chatbot-button");
const chatbotBox = document.getElementById("chatbot-box");
const closeBtn = document.getElementById("close-chatbot");

chatbotBtn.addEventListener("click", () => {
  chatbotBox.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  chatbotBox.style.display = "none";
});

function responder(opcao) {
  const corpo = document.getElementById("chat-body");

  const pergunta = document.createElement("p");
  pergunta.innerHTML = `👉 <strong>${opcao}</strong>`;
  corpo.appendChild(pergunta);

  const resposta = document.createElement("p");
  resposta.style.color = "#555";

  switch (opcao) {
    case "Novidades":
      resposta.textContent = "Nossa nova coleção já está disponível na seção de produtos!";
      break;
    case "Status do pedido":
      resposta.innerHTML = "Você pode verificar o status do seu pedido entrando em contato pelo WhatsApp.";
      break;
    case "Contato humano":
      resposta.innerHTML = `Clique <a href="https://wa.me/5562981917921" target="_blank">aqui</a> para falar com um atendente agora!`;
      break;
    default:
      resposta.textContent = "Desculpe, não entendi.";
  }

  setTimeout(() => {
    corpo.appendChild(resposta);
    corpo.scrollTop = corpo.scrollHeight;
  }, 400);
}
