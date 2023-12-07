const elementos = {
    telaInicial: document.getElementById('inicial'),
    telaCadastro: document.getElementById('cadastro'),
    telaJogo: document.getElementById('jogo'),
    telaMensagem: document.querySelector('.mensagem'),
    textoMensagem: document.querySelector('.mensagem .texto'),
    teclado: document.querySelector('.teclado'),
    palavra: document.querySelector('.palavra'),
    dica: document.querySelector('.dica'),
    botoes: {
      facil: document.querySelector('.botao-facil'),
      medio: document.querySelector('.botao-medio'),
      dificil: document.querySelector('.botao-dificil'),
      cadastrar: document.querySelector('.botao-cadastrar'),
      realizarCadastro: document.querySelector('.botao-realizar-cadastro'),
      voltar: document.querySelector('.botao-voltar'),
      reiniciar: document.querySelector('.reiniciar'),
    },
    campos: {
      dificuldade: {
        facil: document.getElementById('facil'),
        medio: document.getElementById('medio'),
        dificil: document.getElementById('dificil')
      },
      palavra: document.getElementById('palavra'),
      dica: document.getElementById('dica')
    },
    boneco: [
      document.querySelector('.boneco-cabeca'),
      document.querySelector('.boneco-corpo'),
      document.querySelector('.boneco-braco-esquerdo'),
      document.querySelector('.boneco-braco-direito'),
      document.querySelector('.boneco-perna-esquerda'),
      document.querySelector('.boneco-perna-direita'),
    ],
  };

// Inicialmente, a constante palavras será vazia
let palavras = {
    facil: [],
    medio: [],
    dificil: [],
  };

  function novoJogo() {
    jogo = {
      dificuldade: undefined,
      palavra: {
        original: undefined,
        semAcentos: undefined,
        tamanho: undefined,
        dica: undefined,
      },
      acertos: undefined,
      jogadas: [],
      chances: 6,
      definirPalavra: function (palavra, dica) {

        this.palavra.original = palavra;
        this.palavra.tamanho = palavra.length;
        this.acertos = '';

        this.palavra.semAcentos = this.palavra.original.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        this.palavra.dica = dica;

        for (let i = 0; i < this.palavra.tamanho; i++) {
          this.acertos += ' ';
        }
      },
  
  
      jogar: function (letraJogada) {
        let acertou = false;
        for (let i = 0; i < this.palavra.tamanho; i++) {
          const letra = this.palavra.semAcentos[i].toLowerCase();
          if (letra === letraJogada.toLowerCase()) {
            acertou = true;

            this.acertos = substituirCaractere(this.acertos, i, this.palavra.original[i]);
          }
        }

        if (!acertou) {
          this.chances--;
        }
        return acertou;
      },
      ganhou: function () {
        return !this.acertos.includes(' ');
      },
      perdeu: function () {
        return this.chances <= 0;
      },
      acabou: function () {
        return this.ganhou() || this.perdeu();
      },
      emAndamento: false, // Indica se o jogo está em andamento ou não
    };

    elementos.telaInicial.style.display = 'flex';
    elementos.telaCadastro.style.display = 'none';
    elementos.telaJogo.style.display = 'none';
    elementos.telaMensagem.style.display = 'none';
    elementos.telaMensagem.classList.remove('mensagem-vitoria');
    elementos.telaMensagem.classList.remove('mensagem-derrota');

    for (const parte of elementos.boneco) {
      parte.classList.remove('escondido');
      parte.classList.add('escondido');
    }

    criarTeclado();
  }
  
  novoJogo();
  
  
  
  function selecionarLetra(letra) {

    if (!jogo.jogadas.includes(letra) && !jogo.acabou()) {

      const acertou = jogo.jogar(letra);
      jogo.jogadas.push(letra);

      const button = document.querySelector(`.botao-${letra}`);
      button.classList.add(acertou ? 'certo' : 'errado');

      mostrarPalavra();

      if (!acertou) {
        mostrarErro();
      }

      if (jogo.ganhou()) {
        mostrarMensagem(true);
      } else if (jogo.perdeu()) {
        mostrarMensagem(false);
      }
    }
  }
  
  function criarTeclado() {

    const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    elementos.teclado.textContent = '';

    for (const letra of letras) {

      const button = document.createElement('button');

      button.appendChild(document.createTextNode(letra.toUpperCase()));
      button.classList.add(`botao-${letra}`);

      elementos.teclado.appendChild(button);

      button.addEventListener('click', () => {
        selecionarLetra(letra);
      });
    }
  }
  
  //MOSTRAR BONECO
  function mostrarErro() {

    const parte = elementos.boneco[5 - jogo.chances];

    parte.classList.remove('escondido');
  };

  function mostrarMensagem(vitoria) {

    const mensagem = vitoria ? '<p>Parabéns!</p><p>Você GANHOU!</p>' : '<p>Que pena!</p><p>Você PERDEU!</p>';

    elementos.textoMensagem.innerHTML = mensagem;
    elementos.telaMensagem.style.display = 'flex';
    elementos.telaMensagem.classList.add(`mensagem-${vitoria ? 'vitoria' : 'derrota'}`);

    jogo.emAndamento = false;
  };
  
  function sortearPalavra() {

    const i = Math.floor(Math.random() * palavras[jogo.dificuldade].length);
    const palavra = palavras[jogo.dificuldade][i].palavra;
    const dica = palavras[jogo.dificuldade][i].dica;


    jogo.definirPalavra(palavra, dica);

    console.log(jogo.palavra.original);
    console.log(jogo.palavra.dica);
  
    return jogo.palavra.original;
  }
  
  function mostrarPalavra() {

    elementos.dica.textContent = jogo.palavra.dica;
    elementos.palavra.textContent = '';

    for (let i = 0; i < jogo.acertos.length; i++) {
      const letra = jogo.acertos[i].toUpperCase();

      elementos.palavra.innerHTML += `<div class="letra-${i}">${letra}</div>`;
    }
  }
  
  function iniciarJogo(dificuldade) {
    if (palavras[dificuldade] && palavras[dificuldade].length > 0) {
      jogo.dificuldade = dificuldade;
  
      elementos.telaInicial.style.display = 'none';
      elementos.telaJogo.style.display = 'flex';
  
      jogo.emAndamento = true;
  
      sortearPalavra();
      mostrarPalavra();
    } else {
      
      exibirMensagemErro('Não há palavras cadastradas para a dificuldade escolhida. Cadastre palavras antes de iniciar o jogo.');
    }
  }
  
function substituirCaractere(str, indice, novoCaractere) {
    
    const parteAntes = str.substring(0, indice);
    const parteDepois = str.substring(indice + 1);
    const novaString = parteAntes + novoCaractere + parteDepois;
  
    return novaString;
  }
  
  elementos.botoes.reiniciar.addEventListener('click', () => novoJogo());
  elementos.botoes.voltar.addEventListener('click', () => voltarInicio());
  elementos.botoes.facil.addEventListener('click', () => iniciarJogo('facil'));

  elementos.botoes.medio.addEventListener('click', () => iniciarJogo('medio'));
  elementos.botoes.dificil.addEventListener('click', () => iniciarJogo('dificil'));
  
  elementos.botoes.cadastrar.addEventListener('click', () => abrirTelaCadastroPalavra());
  elementos.botoes.realizarCadastro.addEventListener('click', () => cadastrarPalavra());
  
function voltarInicio() {
    elementos.telaInicial.style.display = 'flex';
    elementos.telaCadastro.style.display = 'none';
}

function abrirTelaCadastroPalavra() {
    elementos.telaInicial.style.display = 'none';
    elementos.telaCadastro.style.display = 'flex';
  }
  
  function cadastrarPalavra() {
    const palavraInput = document.querySelector('#palavra');
    const dicaInput = document.querySelector('#dica');
    const dificuldadeRadio = document.querySelector('input[name="dificuldade"]:checked');
  
    const palavra = palavraInput.value.trim().toLowerCase();
    const dica = dicaInput.value.trim();
    const dificuldade = dificuldadeRadio ? dificuldadeRadio.value : '';
  
    if (palavra && dica && dificuldade && palavras[dificuldade]) {
      cadastrarNovaPalavra(palavra, dica, dificuldade);
      limparCamposCadastro();
  
      const continuarCadastro = confirm('Palavra cadastrada com sucesso! Deseja cadastrar mais uma palavra?');
      if (!continuarCadastro) {
        voltarInicio();
      }
    } else {
      exibirMensagemErro('Por favor, preencha todos os campos corretamente.');
    }
  }
  
  function cadastrarNovaPalavra(palavra, dica, dificuldade) {
    palavras[dificuldade].push({
      palavra: palavra,
      dica: dica,
    });
  }
  
  function limparCamposCadastro() {
    document.querySelector('#palavra').value = '';
    document.querySelector('#dica').value = '';
    document.querySelector('input[name="dificuldade"][value="facil"]').checked = true;
  }
  
  function exibirMensagemErro(mensagem) {
    // Adapte essa função para exibir a mensagem de erro na interface do usuário.
    console.error('Erro:', mensagem);
  }
  
  elementos.botoes.cadastrar.addEventListener('click', abrirTelaCadastroPalavra);
  elementos.botoes.realizarCadastro.addEventListener('click', cadastrarPalavra);
  elementos.botoes.voltar.addEventListener('click', voltarInicio);
  
  

  