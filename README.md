# UrbanVerse - Streetwear Moderno

Projeto de site estático desenvolvido com HTML, CSS e JavaScript, com foco em uma loja de roupas streetwear. A aplicação simula um catálogo de produtos com carrinho de compras funcional.

---

## 🗂️ Estrutura de Pastas

```
ProjectFaculdade/
├── css/
│   ├── Cards.css
│   ├── Cart.css
│   ├── Footer.css
│   ├── Header.css
│   └── Styles.css
├── img/
│   ├── Backgorund.png
│   └── CamisaOversize.png
├── js/
│   └── Script.js
└── src/
    └── index.html
```

---

## 📄 index.html

Arquivo principal do site. Estrutura a interface do usuário com:

- `<header>` com logo e botão do carrinho
- `<div class="hero">` para banner principal
- `<div id="products-container">` onde os produtos são carregados via JS
- Modal do carrinho de compras
- `<footer>` com navegação e informações de contato

As folhas de estilo e o script são incluídos com links externos e internos.

---

## 🎨 CSS

O CSS está separado por responsabilidades para facilitar a manutenção:

- **Styles.css**: estilo global da página
- **Header.css**: estilização do cabeçalho e logo
- **Cart.css**: aparência do carrinho de compras
- **Cards.css**: layout dos cards de produtos
- **Footer.css**: estilo do rodapé

Cada arquivo usa classes específicas para modularizar os estilos de acordo com a seção do site.

---

## 🧠 Script.js

Controla a lógica do carrinho:

- Renderiza produtos dinamicamente
- Adiciona e remove itens do carrinho
- Atualiza o total de produtos e valores
- Controla a exibição do modal do carrinho
- Função `handleCheckout()` apenas simula o fechamento da compra

Este arquivo interage com elementos do DOM usando `getElementById`, `querySelector`, e adiciona eventos `click`.

---

## ▶️ Como Rodar o Projeto Localmente

1. Faça o clone ou download do projeto
2. Abra o arquivo `src/index.html` no seu navegador

Certifique-se de que as pastas `css/`, `js/`, e `img/` estejam no mesmo nível que `src/`.

--

## 💡 Melhorias Futuras

- Adicionar integração real de pagamento (ex: Stripe)
- Filtro por categoria e busca de produtos
- Internacionalização para múltiplos idiomas

---

## 📸 Créditos

Ícones por [Font Awesome](https://fontawesome.com/)  
Design e implementação: Rodriggo Areba
