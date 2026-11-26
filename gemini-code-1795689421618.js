// Banco de perguntas do Quiz
const perguntas = [
    {
        pergunta: "Qual tag HTML5 é utilizada para definir o conteúdo principal e único de uma página?",
        opcoes: ["<section>", "<main>", "<header>", "<article>"],
        correta: 1
    },
    {
        pergunta: "Qual propriedade CSS é usada para ativar o layout Flexbox em um contêiner?",
        opcoes: ["display: grid;", "position: flex;", "display: flex;", "align-items: center;"],
        correta: 2
    },
    {
        pergunta: "Qual regra CSS permite aplicar estilos diferentes dependendo do tamanho da tela?",
        opcoes: ["@keyframes", "@import", "@media", "@viewport"],
        correta: 2
    },
    {
        pergunta: "Em JavaScript, qual método seleciona um elemento HTML pelo seu atributo 'id'?",
        opcoes: [
            "document.querySelectorAll()",
            "document.getElementById()",
            "document.getElementsByClassName()",
            "document.createElement()"
        ],
        correta: 1
    },
    {
        pergunta: "Qual atributo HTML melhora a acessibilidade ao descrever o conteúdo de uma imagem?",
        opcoes: ["title", "src", "href", "alt"],
        correta: 3
    }
];

// Seleção de elementos do DOM
const telaInicial = document.getElementById("tela-inicial");
const telaQuiz = document.getElementById("tela-quiz");
const telaResultado = document.getElementById("tela-resultado");

const btnIniciar = document.getElementById("btn-iniciar");
const btnProxima = document.getElementById("btn-proxima");
const btnReiniciar = document.getElementById("btn-reiniciar");

const textoProgresso = document.getElementById("progresso");
const textoPlacar = document.getElementById("placar-atual");
const textoPergunta = document.getElementById("texto-pergunta");
const opcoesContainer = document.getElementById("opcoes-container");
const feedbackElemento = document.getElementById("feedback");

const mensagemFinal = document.getElementById("mensagem-final");
const pontuacaoFinal = document.getElementById("pontuacao-final");

// Variáveis de estado
let indiceAtual = 0;
let pontuacao = 0;
let acertos = 0;

// Eventos
btnIniciar.addEventListener("click", iniciarQuiz);
btnProxima.addEventListener("click", avancarPergunta);
btnReiniciar.addEventListener("click", iniciarQuiz);

function iniciarQuiz() {
    indiceAtual = 0;
    pontuacao = 0;
    acertos = 0;

    telaInicial.classList.add("oculto");
    telaResultado.classList.add("oculto");
    telaQuiz.classList.remove("oculto");

    atualizarPlacar();
    carregarPergunta();
}

function carregarPergunta() {
    // Limpa estado anterior
    opcoesContainer.innerHTML = "";
    feedbackElemento.classList.add("oculto");
    feedbackElemento.className = "feedback oculto";
    btnProxima.classList.add("oculto");

    const questaoAtual = perguntas[indiceAtual];
    textoProgresso.textContent = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;
    textoPergunta.textContent = questaoAtual.pergunta;

    // Cria botões para cada alternativa
    questaoAtual.opcoes.forEach((opcao, index) => {
        const botao = document.createElement("button");
        botao.textContent = opcao;
        botao.classList.add("btn-opcao");
        botao.addEventListener("click", () => verificarResposta(index, botao));
        opcoesContainer.appendChild(botao);
    });
}

function verificarResposta(indiceEscolhido, botaoClicado) {
    const questaoAtual = perguntas[indiceAtual];
    const todosBotoes = opcoesContainer.querySelectorAll(".btn-opcao");

    // Desabilita todos os botões após a escolha
    todosBotoes.forEach(btn => btn.disabled = true);

    if (indiceEscolhido === questaoAtual.correta) {
        botaoClicado.classList.add("correta");
        pontuacao += 10;
        acertos++;
        feedbackElemento.textContent = "Resposta correta! +10 pontos.";
        feedbackElemento.classList.add("acerto");
    } else {
        botaoClicado.classList.add("errada");
        // Destaca a resposta correta
        todosBotoes[questaoAtual.correta].classList.add("correta");
        feedbackElemento.textContent = "Resposta incorreta!";
        feedbackElemento.classList.add("erro");
    }

    feedbackElemento.classList.remove("oculto");
    atualizarPlacar();
    btnProxima.classList.remove("oculto");
}

function atualizarPlacar() {
    textoPlacar.textContent = `Pontos: ${pontuacao}`;
}

function avancarPergunta() {
    indiceAtual++;
    if (indiceAtual < perguntas.length) {
        carregarPergunta();
    } else {
        exibirResultado();
    }
}

function exibirResultado() {
    telaQuiz.classList.add("oculto");
    telaResultado.classList.remove("oculto");

    mensagemFinal.textContent = `Você acertou ${acertos} de ${perguntas.length} perguntas.`;
    pontuacaoFinal.textContent = pontuacao;
}