/**
 * Elementos
 */
let container = document.getElementById('container')
let nome = document.getElementById('cronosName')
let descricao = document.getElementById('cronosDes')
let nomeED = document.getElementById('cronosNameED')
let cronosImg = document.getElementById('cronosImg')
let descricaoED = document.getElementById('cronosDesED')
let tbody = document.getElementById('tbody')

// Estanciando um Array e um objeto do tipo localStorage e convertendo ele para um JSON
let itens = new Array()
if (localStorage.hasOwnProperty('itens')) {
  itens = JSON.parse(localStorage.getItem('itens'))
}

// Função que exclui os cursos
function excluir(key) {
  let ob = JSON.parse(localStorage.getItem(localStorage.key(0)))
  // console.log(ob)
  let obJeto = []
  for (let i = 0; i < ob.length; i++) {
    if (key === ob[i].name) {
      // console.log(ob[i])
      delete ob[i]
      // console.log(ob[i])
    } else {
      obJeto.push(ob[i])
    }
  }
  localStorage.setItem('itens', JSON.stringify(obJeto))

  listarTabela()
}

// Variavel global para verificar o nome do curso (key = chave)
let key = ''
// Função que recebe o nome do curso
function setNameEdicao(key) {
  this.key = ''
}
// Função que pega a o nome do curso
function getNameEdicao() {
  //alert('Chamou o get' + this.key)
  return this.key
}

// Está função é a que salva os novos curso e salva as edições de cada curso
function salvar() {
  let ob = JSON.parse(localStorage.getItem(localStorage.key(0)))

  let novoOb = []
  alert(nomeED.value)
  if (localStorage.length > 0 && getNameEdicao() !== undefined) {
    if (nomeED.value !== '' && descricaoED.value !== '') {
      //alert("vai editar com sucesso")
      // Coloque aqui a sua logica
      for (var i = 0; i < ob.length; i++) {
        if (getNameEdicao() === ob[i].name) {
          ob[i].name = nomeED.value
          ob[i].descricao = descricaoED.value
          break
        }
      }
    } else {
      alert('Prencha os campos!')
    }
    for (let i = 0; i < ob.length; i++) {
      if (ob[i] !== undefined) {
        novoOb.push(ob[i])
      }
    }
    localStorage.setItem('itens', JSON.stringify(novoOb))
    nomeED.value = ''
    descricaoED.value = ''
  } else {
    for (let i = 0; i < ob.length; i++) {
      if (ob[i] !== undefined) {
        novoOb.push(ob[i])
      }
    }
    if (nome.value !== '' && descricao.value !== '') {
      novoOb.push({
        name: nome.value,
        image: cronosImg.value,
        descricao: descricao.value
      })
    } else {
      alert('Prencha os campos!')
    }

    localStorage.setItem('itens', JSON.stringify(novoOb))
  }

  listarTabela()
}

function editar(key) {
  // alert(key)
  setNameEdicao(key)
  $('#edicao').modal('show')
}
// Função que vai mostra todas os cursos
function listarTabela() {
  // Listas de images
  let listaImg = [
    'imagens/ilustra-web.png',
    'imagens/ilustra-marketing.png',
    'imagens/ilustra-ux.png'
  ]
  tbody.innerHTML = ''
  if (itens.length === 0) {
    itens.push({
      name: 'Desenvolvimento Web',
      descricao: 'Consequatur debitis ipsa numquam illum placeat quod deleniti.'
    })
    itens.push({
      name: 'Marketing Digital',
      descricao: 'Consequatur debitis ipsa numquam illum placeat quod deleniti.'
    })

    itens.push({
      name: 'Consultoria UX',
      descricao: 'Consequatur debitis ipsa numquam illum placeat quod deleniti.'
    })
    localStorage.setItem('itens', JSON.stringify(itens))
  }

  let lista = []
  if (localStorage.length > 0) {
    for (var i = 0; i < localStorage.length; i++) {
      lista.push(localStorage.getItem(localStorage.key(i)))
    }
    // console.log(lista)
    let ob = JSON.parse(lista)
    let contImg = 0

    for (let i = 0; i < ob.length; i++) {
      if (contImg === listaImg.length) {
        contImg = 0
      }

      let tr = tbody.insertRow()

      let tdNome = tr.insertCell()
      let tdImg = tr.insertCell()
      let tdDesc = tr.insertCell()
      let tdBotoes = tr.insertCell()

      tdNome.innerText = ob[i].name

      let addImage = document.createElement('img')
      addImage.src = listaImg[i]

      tdImg.appendChild(addImage)

      tdDesc.innerText = ob[i].descricao

      let botaEdicao = document.createElement('BUTTON')
      botaEdicao.appendChild(document.createTextNode('editar'))
      botaEdicao.classList.add('btn')
      botaEdicao.classList.add('btn-secondary')
      botaEdicao.classList.add('m-1')

      botaEdicao.setAttribute('onclick', `editar('${ob[i].name}')`)

      tdBotoes.appendChild(botaEdicao)

      let botaExcluir = document.createElement('BUTTON')
      botaExcluir.appendChild(document.createTextNode('Excluir'))
      botaExcluir.classList.add('btn')
      botaExcluir.classList.add('btn-danger')
      botaExcluir.classList.add('m-1')
      botaExcluir.setAttribute('onclick', `excluir('${ob[i].name}')`)

      tdBotoes.appendChild(botaExcluir)

      contImg += 1
    }
  } else {
    alert('Erro!')
  }
}
