let participantes = [
  {
    nome: "Andrey Sabino",
    email: "andrey@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 4, 30, 22, 0)
  },
  {
    nome: "Afonso Junior",
    email: "afonso@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 15, 20),
    dataCheckIn: new Date(2024, 3, 5, 20, 0)
  },
  {
    nome: "Caio Rafael",
    email: "caio@gmail.com",
    dataInscricao: new Date(2024, 2, 21, 12, 30),
    dataCheckIn: null
  },
  {
    nome: "Neílla Sousa",
    email: "neilla@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 9, 0),
    dataCheckIn: new Date(2024, 2, 27, 10, 30)
  },
  {
    nome: "Enzo Melo",
    email: "enzo@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 16, 45),
    dataCheckIn: new Date(2024, 2, 26, 19, 15)
  },
  {
    nome: "Paulo Vitor",
    email: "paulo@gmail.com",
    dataInscricao: new Date(2024, 2, 20, 14, 10),
    dataCheckIn: null
  },
  {
    nome: "Fernando Dultra",
    email: "fernando@gmail.com",
    dataInscricao: new Date(2024, 2, 19, 11, 20),
    dataCheckIn: new Date(2024, 2, 22, 14, 45)
  },
  {
    nome: "João Felype",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 8, 30),
    dataCheckIn: new Date(2024, 2, 28, 12, 0)
  },
  {
    nome: "Mikael Vidal",
    email: "mikael@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 17, 50),
    dataCheckIn: new Date(2024, 2, 25, 21, 30)
  },
  {
    nome: "Edgle Santana",
    email: "edgle@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 13, 15),
    dataCheckIn: new Date(2024, 2, 27, 16, 40)
  },
  {
    nome: "Eriky A",
    email: "eriky@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 13, 15),
    dataCheckIn: null
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)
  
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null  
  }

  // verificar se o particpante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?' 

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email  
  )
  
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}