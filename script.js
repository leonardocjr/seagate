var listaBaleias = [] // Array de baleias
var baleias = 0

// Funcao para adicionar uma nova baleia
function addBaleia(nome, idade) {
  const dataAtual = new Date()
  const dia = dataAtual.getDate()
  const mes = dataAtual.getMonth()
  const ano = dataAtual.getFullYear()
  baleias = listaBaleias.length
  var novaBaleia = {
    id: baleias++,
    data: dia + '/' + mes + '/' + ano,
    nome: nome,
    idade: idade
  }
  listaBaleias.push(novaBaleia)
  localStorage.setItem('listaBaleias', JSON.stringify(listaBaleias))
  carregaListaBaleias()
}

// Funcao para remover uma baleia
function delBaleia(baleiaId) {
  var listaBaleiaAtualizada = listaBaleias.filter(function (baleia) {
    return baleia.id !== baleiaId
  })

  if (listaBaleiaAtualizada.length < listaBaleias.length) {
    listaBaleias = listaBaleiaAtualizada
    var aux = 0;
    listaBaleias.forEach(function (baleia) {
      baleia.id = aux++;
    })
    localStorage.setItem('listaBaleias', JSON.stringify(listaBaleias))
    carregaListaBaleias()
  } else {
    alert('Baleia nao encontrada.')
  }
}

// Funcao para chamar a lista de baleias do LocalStorage
function getListaBaleias() {
  var storedList = JSON.parse(localStorage.getItem('listaBaleias'))
  listaBaleias = storedList || [] // Ou recebe a listaBaleias, caso contrario recebo nulo (se vazio)
}

// Funcao para renderizar a lista de pacientes no HTML
function carregaListaBaleias() {
  var baleiaElemento = document.getElementById('listaBaleias')
  baleiaElemento.innerHTML = ''

  listaBaleias.forEach(function (baleia) {
    var itemLista = document.createElement('li')
    //renderiza a lista de pacientes. Itera sobre cada paciente na lista encontrada e cria um <li> para cada paciente
    itemLista.innerHTML =
      'Adicionado em <b>' +
      baleia.data +
      '</b> | Idade: <b>' +
      baleia.idade +
      ' ano(s)</b> | Nome: <b>' +
      baleia.nome +
      '</b> <span class="close" onclick="delBaleia(' +
      baleia.id +
      ')">\u00D7</span>'
    baleiaElemento.appendChild(itemLista)
  })
}

// Chamar a lista de baleia e carrega-las
getListaBaleias()
carregaListaBaleias()
baleias = listaBaleias.length

// Funcao para adicionar item pelo botao
function addElemento() {
  let nome = document.getElementById('nomebaleia').value
  let idade = document.getElementById('idade').value

  if (nome === '' || !idade) {
    if (nome === '') alert('Você precisa descrever o nome da baleia')
    else if (!idade) alert('Você precisa descrever a idade da baleia')
  } else {
    addBaleia(nome, parseInt(idade))
    limparCampos()
  }
}

// Funcao para limpar a lista pelo botao
function limparLista() {
  listaBaleias.forEach(function (baleia) {
    delBaleia(baleia.id)
  })
}

// Funcao para limpar campos
function limparCampos() {
  document.getElementById('nomebaleia').value = ''
  document.getElementById('idade').value = ''
}

//Funcao de busca
function search() {
  var nome = document.getElementById('nomebaleia').value
  var idade = document.getElementById('idade').value
  nome = nome.toLowerCase()

  if (nome || idade) {
    if (nome && idade) {
      var resultado = listaBaleias.filter(function (baleia) {
        var nomeBaleia = baleia.nome.toLowerCase()
        var idadeBaleia = baleia.idade.toString()

        return (nomeBaleia.includes(nome) && idadeBaleia.includes(idade))
      })
    } else if (nome) {
      var resultado = listaBaleias.filter(function (baleia) {
        var nomeBaleia = baleia.nome.toLowerCase()

        return nomeBaleia.includes(nome)
      })
    } else if (idade) {
      var resultado = listaBaleias.filter(function (baleia) {
        var idadeBaleia = baleia.idade.toString()

        return idadeBaleia.includes(idade)
      })
    }

    if (resultado.length > 0) {
      var baleiaElemento = document.getElementById('listaBaleias')
      baleiaElemento.innerHTML = ''

      resultado.forEach(function (baleia) {
        var itemLista = document.createElement('li')
        itemLista.innerHTML =
          'Adicionado em <b>' +
          baleia.data +
          '</b> | Idade: <b>' +
          baleia.idade +
          ' ano(s)</b> | Nome: <b>' +
          baleia.nome +
          '</b> <span class="close" onclick="delBaleia(' +
          baleia.id +
          ')">\u00D7</span>'
        baleiaElemento.appendChild(itemLista)
      })
    } else {
      alert('Nenhuma baleia encontrada com o critério de busca.')
      limparCampos()
      getListaBaleias()
      carregaListaBaleias()
    }
  } else {
    alert('Digite um termo para buscar.')
    getListaBaleias()
    carregaListaBaleias()
  }
}
