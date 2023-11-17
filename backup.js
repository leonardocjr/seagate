// Nesse bloco e gerado a lista de elementos da nossa lista
let myNodelist = document.getElementsByTagName("li");
for (let i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7"); //caracter x
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Nesse bloco é definido a operacao do botao close, que funciona com o X
let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        let div = this.parentElement;
        div.style.display = "none";
    }
}

// Nessa funcao e disponibilizado a funcao que excluira todos elementos percorrendo por eles
function closeAll() {
    let item = document.querySelectorAll("#lista li");
    item.forEach((function (div) {
        div.style.display = "none";
    }));

}

// Nessa funcao ira adicionar um novo elemento a lista 
function addElemento() {
    let li = document.createElement("li");
    let inputValue = document.getElementById("nome").value.toUpperCase();
    let inputValue2 = document.getElementById("idade").value;
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth();
    const ano = dataAtual.getFullYear();

    let text = `Adicionado em ${dia}/${mes}/${ano} | Idade: ` + inputValue2 + " | Nome da baleia: " + inputValue;
    let t = document.createTextNode(text);
    li.appendChild(t);
    if (inputValue === '' || !inputValue2){
        if (inputValue === '')
            alert("Você precisa descrever o nome da baleia");
        else if (!inputValue2)
            alert("Você precisa descrever a idade da baleia");
    }else
        document.getElementById("lista").appendChild(li);
    
    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement;
            div.style.display = "none";
        }
    }
}
