let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

document.addEventListener("DOMContentLoaded", () => {
    // Modo noturno
    const botao = document.getElementById("modoNoturno");
    botao.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });

    // Atualiza o carrinho ao carregar a página
    atualizarCarrinho();

    // Fechar carrinho
    document.getElementById("fecharCarrinho").addEventListener("click", () => {
        document.getElementById("carrinhoPreview").classList.remove("ativo");
    });
});

// Função para abrir/fechar carrinho
function toggleCarrinho() {
    const carrinhoBox = document.getElementById("carrinhoPreview");
    carrinhoBox.classList.toggle("ativo");
}

// Função de notificação
function mostrarNotificacao(texto) {
    const notificacao = document.getElementById("notificacao");
    notificacao.innerText = texto;
    notificacao.classList.add("mostrar");

    setTimeout(() => {
        notificacao.classList.remove("mostrar");
    }, 2000);
}

// Adiciona produto ao carrinho com controle de quantidade
function adicionarCarrinho(nome, preco) {
    const produtoExistente = carrinho.find(p => p.nome === nome);

    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }

    atualizarCarrinho();
    mostrarNotificacao(nome + " adicionado ao carrinho");
}

// Atualiza o carrinho
function atualizarCarrinho() {
    const lista = document.getElementById("listaCarrinho");
    const contador = document.getElementById("contadorCarrinho");
    const total = document.getElementById("totalCarrinho");

    lista.innerHTML = "";

    let soma = 0;

    carrinho.forEach((produto, index) => {
        soma += produto.preco * produto.quantidade;

        const item = document.createElement("div");
        item.innerHTML = `
            ${produto.nome} - R$ ${produto.preco.toFixed(2)} x ${produto.quantidade}
            <button onclick="removerItem(${index})">❌</button>
        `;

        lista.appendChild(item);
    });

    // Contador total de produtos
    contador.innerText = carrinho.reduce((acc, p) => acc + p.quantidade, 0);
    total.innerText = "Total: R$ " + soma.toFixed(2);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Remove 1 unidade do produto ou remove do carrinho se quantidade = 1
function removerItem(index) {
    if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade -= 1;
    } else {
        carrinho.splice(index, 1);
    }
    atualizarCarrinho();
}

// Finaliza compra via WhatsApp
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Carrinho vazio");
        return;
    }

    let mensagem = "Olá! Gostaria de comprar:%0A%0A";

    carrinho.forEach(produto => {
        mensagem += `- ${produto.nome} x ${produto.quantidade} R$ ${produto.preco.toFixed(2)}%0A`;
    });

    const url = "https://wa.me/5562999230895?text=" + mensagem;
    window.open(url, "_blank");
}