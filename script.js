function trocarBolsa(novaImagem){
    document.getElementById("bolsa").src = novaImagem;
}

const botao = document.getElementById("modoNoturno");

botao.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});