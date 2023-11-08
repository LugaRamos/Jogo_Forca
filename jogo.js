 //Definição dos elementos da interface do jogo

 const elementos = {
    telaInicial: document.getElementById('inicial'),
    telaCadastro: document.getElementById('cadastro'),
    telaJogo: document.getElementById('jogo'), 
    telaMensagens: document.querySelector('mensagem'),
    textoMensagem: document.querySelector('mensagem .texto'),
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
        reinicicar: document.querySelector('.reinicicar'),
    },

    campos: {
        dificuldade: {
            facil: document.getElementById('facil'), //RadioButton de dificuldade "Facil"
            medio: document.getElementById('medio'), //RadioButton de dificuldade "Medio"
            dificil: document.getElementById('dificil'), //RadioButton de dificuldade "Dificil"
        },

        palavra: document.getElementById('palavra'), //Campo de texto para entrada da palavra
        dica: document.getElementById('dica'), //Campo de texto para entrada da dica
    },

    boneco: [ //Representação visual do enforcado
        document.querySelector('.boneco-cabeca'),
        document.querySelector('.boneco-corpo'),
        document.querySelector('.boneco-braço-esquerdo'),
        document.querySelector('.boneco-braço-direito'),
        document.querySelector('.boneco-perna-esquerda'),
        document.querySelector('.boneco-perna-direito'),
    ],
};

//Definição das palavras do jogo, agrupados por dificuldades

const palvaras = {
    facil: [{
            palavra: 'serie',
            dica: 'Game of Thrones é a melhor...'
        },
        {
            palavra: 'ímpar',
            dica: 'Se não é par é...'
        },
    ],
};

function criarTeclado(){

}

function mostrarErro(){

}

function monstarMensagem(vitoria){

}

function abrirTelaCadastro(){

}

function voltarInicio(){
    
}