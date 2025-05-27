document.getElementById('form-produto').addEventListener('submit', function (e) {
      e.preventDefault();
      const nome = document.getElementById('nome').value;
      const quantidade = document.getElementById('quantidade').value;
      const valor = document.getElementById('valor').value;
      const categoria = document.getElementById('categoria').value;

      const tamanhosSelecionados = Array.from(document.querySelectorAll('input[name="tamanhos"]:checked')).map(el => el.value);

      console.log("Produto cadastrado:");
      console.log({ nome, quantidade, valor, categoria, tamanhos: tamanhosSelecionados });

      alert("Produto cadastrado com sucesso!");
      this.reset();
    });