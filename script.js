let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

/* ================= FILTRO ================= */
function filtrar(cat, event) {
  const secoes = document.querySelectorAll(".secao");
  const botoes = document.querySelectorAll(".filtros button");

  botoes.forEach((b) => b.classList.remove("ativo"));
  if (event && event.target) event.target.classList.add("ativo");

  secoes.forEach((secao) => {
    if (cat === "todos") {
      secao.style.display = "block";
    } else {
      secao.style.display = secao.classList.contains(cat) ? "block" : "none";
    }
  });
}

/* ================= CARRINHO ================= */
function adicionarCarrinho(nome, preco) {
  const item = carrinho.find((p) => p.nome === nome);

  if (item) {
    item.quantidade++;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }

  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  const contador = document.getElementById("contadorCarrinho");
  const total = document.getElementById("totalCarrinho");

  if (!lista || !contador || !total) return;

  lista.innerHTML = "";
  let soma = 0;

  carrinho.forEach((p, i) => {
    soma += p.preco * p.quantidade;

    lista.innerHTML += `
      <div class="item-carrinho">
        <span>${p.nome} - R$ ${p.preco} x ${p.quantidade}</span>
        <button onclick="removerItem(${i})">✖</button>
      </div>
    `;
  });

  contador.innerText = carrinho.reduce((a, p) => a + p.quantidade, 0);
  total.innerText = "Total: R$ " + soma.toFixed(2);

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function removerItem(i) {
  if (carrinho[i].quantidade > 1) {
    carrinho[i].quantidade--;
  } else {
    carrinho.splice(i, 1);
  }

  atualizarCarrinho();
}

/* ================= CARRINHO UI ================= */
function toggleCarrinho() {
  const carrinhoBox = document.getElementById("carrinhoPreview");
  if (carrinhoBox) carrinhoBox.classList.toggle("ativo");
}

/* ================= FINALIZAR ================= */
function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Carrinho vazio");
    return;
  }

  let msg = "Olá! Quero comprar:%0A%0A";

  carrinho.forEach((p) => {
    msg += `- ${p.nome} x${p.quantidade} - R$ ${p.preco}%0A`;
  });

  window.open("https://wa.me/5562999230895?text=" + msg, "_blank");
}

/* ================= ZOOM IMAGEM ================= */
function abrirImagem(src) {
  const modal = document.getElementById("imgModal");
  const img = document.getElementById("imgExpandida");

  img.src = src;
  modal.classList.add("ativo");
}

function fecharImagem() {
  document.getElementById("imgModal").classList.remove("ativo");
}

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  const fechar = document.getElementById("fecharCarrinho");
  const darkBtn = document.getElementById("modoNoturno");
  const imagens = document.querySelectorAll(".produto img");
  const modal = document.getElementById("imgModal");

  if (fechar) {
    fechar.onclick = () => {
      document.getElementById("carrinhoPreview").classList.remove("ativo");
    };
  }

  if (darkBtn) {
    darkBtn.onclick = () => {
      document.body.classList.toggle("dark");
    };
  }

  imagens.forEach((img) => {
    img.addEventListener("click", () => abrirImagem(img.src));
  });

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target.id === "imgModal") fecharImagem();
    });
  }

  atualizarCarrinho();
});