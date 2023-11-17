var listaBaleias = []; // Array de baleias
var baleias = 0;

// Funcao para adicionar uma nova baleia
function addBaleia(nome, idade) {
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth();
    const ano = dataAtual.getFullYear();
    var novaBaleia = { id: baleias++, data: dia + "/" + mes + "/" + ano, nome: nome, idade: idade };
    listaBaleias.push(novaBaleia);
    localStorage.setItem('listaBaleias', JSON.stringify(listaBaleias));
    carregaListaBaleias();
}

// Funcao para remover uma baleia
function delBaleia(baleiaId) {
    var listaBaleiaAtualizada = listaBaleias.filter(function (baleia) {
        return baleia.id !== baleiaId;
    });

    if (listaBaleiaAtualizada.length < listaBaleias.length) {
        listaBaleias = listaBaleiaAtualizada;
        localStorage.setItem('listaBaleias', JSON.stringify(listaBaleias));
        carregaListaBaleias();
    } else {
        alert('Baleia nao encontrada.');
    }
}

// Funcao para chamar a lista de baleias do LocalStorage
function getListaBaleias() {
    var storedList = JSON.parse(localStorage.getItem('listaBaleias'));
    listaBaleias = storedList || []; // Ou recebe a listaBaleias, caso contrario recebo nulo (se vazio)
}

// Funcao para renderizar a lista de pacientes no HTML
function carregaListaBaleias() {
    var baleiaElemento = document.getElementById('listaBaleias');
    baleiaElemento.innerHTML = '';

    listaBaleias.forEach(function (baleia) {
        var itemLista = document.createElement('li');
        //renderiza a lista de pacientes. Itera sobre cada paciente na lista encontrada e cria um <li> para cada paciente
        itemLista.innerHTML = 'Adicionado em <b>' + baleia.data + "</b> | Idade: <b>" + baleia.idade + ' ano(s)</b> | Nome: <b>' + baleia.nome + '</b> <span class="close" onclick="delBaleia(' + baleia.id + ')">\u00D7</span>';
        baleiaElemento.appendChild(itemLista);
    });
}

// Chamar a lista de baleia e carrega-las
getListaBaleias();
carregaListaBaleias();


// Funcao para adicionar item pelo botao
function addElemento() {
    let nome = document.getElementById("nome").value;
    let idade = document.getElementById("idade").value;

    if (nome === '' || !idade) {
        if (nome === '')
            alert("Você precisa descrever o nome da baleia");
        else if (!idade)
            alert("Você precisa descrever a idade da baleia");
    } else {
        addBaleia(nome, parseInt(idade));
        limparCampos();
    }

}

// Funcao para limpar a lista pelo botao
function limparLista() {
    listaBaleias.forEach((function (baleia) {
        delBaleia(baleia.id);
    }));
}

// Funcao para limpar campos
function limparCampos(){
    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
}