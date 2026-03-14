function trocarBolsa(novaImagem){
    document.getElementById("bolsa").src = novaImagem;
}

/* ===== MODO NOTURNO ===== */

const botao = document.getElementById("modoNoturno");

botao.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

/* ===== CARRINHO ===== */

let carrinho = [];

/* ===== ABRIR / FECHAR CARRINHO ===== */

function toggleCarrinho(){

    const carrinhoBox = document.getElementById("carrinhoPreview");

    carrinhoBox.classList.toggle("ativo");

}

/* ===== NOTIFICAÇÃO ===== */

function mostrarNotificacao(texto){

    const notificacao = document.getElementById("notificacao");

    notificacao.innerText = texto;
    notificacao.classList.add("mostrar");

    setTimeout(() => {
        notificacao.classList.remove("mostrar");
    }, 2500);
}

/* ===== ATUALIZAR LISTA DO CARRINHO ===== */

function atualizarCarrinho(){

    const lista = document.getElementById("listaCarrinho");
    const contador = document.getElementById("contadorCarrinho");
    const total = document.getElementById("totalCarrinho");

    lista.innerHTML = "";

    let soma = 0;

    carrinho.forEach((produto, index) => {

        soma += produto.preco;

        const item = document.createElement("div");

        item.classList.add("itemCarrinho");

        item.innerHTML = `
            ${produto.nome} - R$ ${produto.preco}
            <button class="remover" onclick="removerItem(${index})">❌</button>
        `;

        lista.appendChild(item);
    });

    contador.innerText = carrinho.length;

    total.innerText = "Total: R$ " + soma;

} // ← FALTAVA ESTA CHAVE

/* ===== ADICIONAR PRODUTO ===== */

function adicionarCarrinho(nome, preco){

    carrinho.push({nome, preco});

    mostrarNotificacao(nome + " adicionado ao carrinho!");

    atualizarCarrinho();
}

/* ===== REMOVER PRODUTO ===== */

function removerItem(index){

    const produtoRemovido = carrinho[index].nome;

    carrinho.splice(index, 1);

    mostrarNotificacao(produtoRemovido + " removido!");

    atualizarCarrinho();
}

/* ===== FINALIZAR COMPRA ===== */

function finalizarCompra(){

    if(carrinho.length === 0){
        mostrarNotificacao("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá! Gostaria de comprar:%0A";

    carrinho.forEach(produto => {
        mensagem += `- ${produto.nome} R$ ${produto.preco}%0A`;
    });

    let url = "https://wa.me/5562999230895?text=" + mensagem;

    window.open(url, "_blank");
}