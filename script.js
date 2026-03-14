function trocarBolsa(novaImagem){
    document.getElementById("bolsa").src = novaImagem;
}

document.addEventListener("DOMContentLoaded", () => {

const botao = document.getElementById("modoNoturno");

botao.addEventListener("click", () => {
document.body.classList.toggle("dark");
});

});

let carrinho = [];

function toggleCarrinho(){
    const carrinhoBox = document.getElementById("carrinhoPreview");
    carrinhoBox.classList.toggle("ativo");
}

function mostrarNotificacao(texto){
    const notificacao = document.getElementById("notificacao");

    notificacao.innerText = texto;
    notificacao.classList.add("mostrar");

    setTimeout(()=>{
        notificacao.classList.remove("mostrar");
    },2500);
}

function atualizarCarrinho(){

    const lista = document.getElementById("listaCarrinho");
    const contador = document.getElementById("contadorCarrinho");
    const total = document.getElementById("totalCarrinho");

    lista.innerHTML="";

    let soma=0;

    carrinho.forEach((produto,index)=>{

        soma+=produto.preco;

        const item=document.createElement("div");

        item.innerHTML=`
        ${produto.nome} - R$ ${produto.preco}
        <button onclick="removerItem(${index})">❌</button>
        `;

        lista.appendChild(item);

    });

    contador.innerText=carrinho.length;
    total.innerText="Total: R$ "+soma;

}

function adicionarCarrinho(nome,preco){
    carrinho.push({nome,preco});
    atualizarCarrinho();
}

function removerItem(index){
    carrinho.splice(index,1);
    atualizarCarrinho();
}

function finalizarCompra(){

    if(carrinho.length===0){
        alert("Carrinho vazio");
        return;
    }

    let mensagem="Olá! Gostaria de comprar:%0A";

    carrinho.forEach(produto=>{
        mensagem+=`- ${produto.nome} R$ ${produto.preco}%0A`;
    });

    let url="https://wa.me/5562999230895?text="+mensagem;

    window.open(url,"_blank");
}