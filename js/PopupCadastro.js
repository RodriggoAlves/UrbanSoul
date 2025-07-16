window.addEventListener("load", () => {
  const popup = document.getElementById("popup-cadastro");
  const enderecoInfo = document.getElementById("endereco-info");
  const buscarCepBtn = document.getElementById("buscar-cep");
  const confirmarBtn = document.getElementById("confirmar-cadastro");

  const nomeInput = document.getElementById("nome");
  const cepInput = document.getElementById("cep");
  const ruaInput = document.getElementById("rua");
  const bairroInput = document.getElementById("bairro");
  const cidadeInput = document.getElementById("cidade");
  const estadoInput = document.getElementById("estado");

  // Verifica se tem dados no localStorage para pular cadastro
  function checkStorage() {
    const dadosSalvos = localStorage.getItem("cadastroUsuario");
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      if (dados.nome && dados.rua) {
        popup.style.display = "none";
        console.log("Dados do usuário salvos:", dados);
        return true;
      }
    }
    return false;
  }

  if (!checkStorage()) {
    popup.style.display = "flex";
  }

  buscarCepBtn.addEventListener("click", async () => {
    const cep = cepInput.value.replace(/\D/g, "");

    if (!cep || cep.length !== 8) return alert("Digite um CEP válido com 8 dígitos");

    try {
      const resposta = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
      if (!resposta.ok) throw new Error("Erro na resposta da API");

      const dados = await resposta.json();

      if (!dados.cep) return alert("CEP não encontrado!");

      enderecoInfo.style.display = "block";
      ruaInput.value = dados.street || "";
      bairroInput.value = dados.neighborhood || "";
      cidadeInput.value = dados.city || "";
      estadoInput.value = dados.state || "";

      confirmarBtn.style.display = "block";
    } catch (err) {
      console.error("Erro ao buscar CEP:", err);
      alert("Erro ao buscar o CEP. Tente novamente.");
    }
  });

  confirmarBtn.addEventListener("click", () => {
    const nome = nomeInput.value.trim();
    const rua = ruaInput.value;

    if (!nome || !rua) return alert("Preencha todos os campos.");

    const dadosParaSalvar = {
      nome,
      cep: cepInput.value,
      rua: ruaInput.value,
      bairro: bairroInput.value,
      cidade: cidadeInput.value,
      estado: estadoInput.value,
    };

    localStorage.setItem("cadastroUsuario", JSON.stringify(dadosParaSalvar));
    popup.style.display = "none";
  });
});
