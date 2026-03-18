let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

document.addEventListener("DOMContentLoaded", () => {

    // DARK MODE
    document.getElementById("modoNoturno").addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });

    atualizarCarrinho();

    document.getElementById("fecharCarrinho").addEventListener("click", () => {
        document.getElementById("carrinhoPreview").classList.remove("ativo");
    });
});

// CARRINHO
function toggleCarrinho() {
    document.getElementById("carrinhoPreview").classList.toggle("ativo");
}

// NOTIFICAÇÃO
function mostrarNotificacao(texto) {
    const n = document.getElementById("notificacao");
    n.innerText = texto;
    n.classList.add("mostrar");

    setTimeout(() => n.classList.remove("mostrar"), 2000);
}

// ADD
function adicionarCarrinho(nome, preco) {
    const existente = carrinho.find(p => p.nome === nome);

    if (existente) {
        existente.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }

    atualizarCarrinho();
    mostrarNotificacao(nome + " adicionado");
}

// UPDATE
function atualizarCarrinho() {
    const lista = document.getElementById("listaCarrinho");
    const contador = document.getElementById("contadorCarrinho");
    const total = document.getElementById("totalCarrinho");

    lista.innerHTML = "";

    let soma = 0;

    carrinho.forEach((p, i) => {
        soma += p.preco * p.quantidade;

        const item = document.createElement("div");
        item.innerHTML = `
            ${p.nome} - R$ ${p.preco.toFixed(2)} x ${p.quantidade}
            <button onclick="removerItem(${i})">❌</button>
        `;

        lista.appendChild(item);
    });

    contador.innerText = carrinho.reduce((a, p) => a + p.quantidade, 0);
    total.innerText = "Total: R$ " + soma.toFixed(2);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// REMOVE
function removerItem(i) {
    if (carrinho[i].quantidade > 1) {
        carrinho[i].quantidade--;
    } else {
        carrinho.splice(i, 1);
    }
    atualizarCarrinho();
}

// FINALIZAR
function finalizarCompra() {
    if (carrinho.length === 0) return alert("Carrinho vazio");

    let msg = "Olá! Quero comprar:%0A%0A";

    carrinho.forEach(p => {
        msg += `- ${p.nome} x${p.quantidade} R$ ${p.preco}%0A`;
    });

    window.open("https://wa.me/5562999230895?text=" + msg);
}


// FILTRO
function filtrar(cat){

    const acessorios = document.querySelector('.acessorios');
    const bolsas = document.querySelector('.bolsas');
    const botoes = document.querySelectorAll('.filtros button');

    botoes.forEach(b => b.classList.remove("ativo"));
    event.target.classList.add("ativo");

    if(cat === "todos"){
        acessorios.style.display = "block";
        bolsas.style.display = "block";
    }

    if(cat === "acessorios"){
        acessorios.style.display = "block";
        bolsas.style.display = "none";
    }

    if(cat === "bolsas"){
        acessorios.style.display = "none";
        bolsas.style.display = "block";
    }
}