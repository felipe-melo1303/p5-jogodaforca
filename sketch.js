let palavra;
let choice;
let categorias;
let categoriaNome;
let letrasCertas = [];
let letrasErradas = [];
let carinha;
let gameOver = false;
let botaoReiniciar;
let musica;
let somPerdeu;
let somGanhou;
let telaInicial
let telaAtual = "inicio";
let botaoComecar;

// Carregar a fonte e os sons do jogo
function preload() {
  fontRegular = loadFont("Comic Sans MS.ttf");
  musica = loadSound("musica.mp3")
  somPerdeu = loadSound("perdeu.mp3")
  somGanhou = loadSound("ganhou.mp3")
  telaInicial = loadImage("telainicial.png")
}


function setup() {

  
  categorias = [  // Item das palavras e das categorias
    { nome: "Animal", lista: ["elefante", "cachorro", "gato", "pato"] },
    { nome: "Fruta", lista: ["melancia", "banana", "laranja", "uva"] },
    { nome: "País", lista: ["brasil", "egito", "mexico", "canada"] },
    { nome: "Super-herói", lista: ["batman", "superman", "thor", "flash"] },
    { nome: "Objeto", lista: ["cadeira", "tesoura", "garrafa", "espelho"] },
    { nome: "Cor", lista: ["vermelho", "azul", "amarelo", "roxo"] },
    { nome: "Instrumento Musical", lista: ["violino", "guitarra", "piano", "flauta"] },
    { nome: "Profissão", lista: ["professor", "bombeiro", "médico", "advogado"] },
    { nome: "Comida", lista: ["lasanha", "hamburguer", "pizza", "sushi"] },
    { nome: "Personagem Famoso", lista: ["shrek", "mario", "elsa", "gandalf"] },
    { nome: "Planeta", lista: ["terra", "marte", "venus", "jupiter"] },
    { nome: "Filme", lista: ["avatar", "titanic", "frozen", "matrix"] }
  ];

  // Array das carinhas aleatórias (Dps vou adicionar mais)
  carinha = random(["🤓", "😀", "😎", "😛", "🤠", "😈", "👽", "😮"]);
  
  // Sorteador da categoria e da palavra secreta
  let sorteada = random(categorias);
  categoriaNome = sorteada.nome;
  choice = random(sorteada.lista);
  
  // Converter o tanto de letras da palavra escolhida em underlines
  for (let i = 0; i < choice.length; i++) {
    letrasCertas[i] = "_";
  }

  createCanvas(500, 400);
  textAlign(LEFT);
}


function draw() {
  background("black");

  textFont(fontRegular);

 if (telaAtual === "inicio") {
   mostrarTelaInicial()
  image(telaInicial, 0, 0);
  return;
 }

// Desenho da forca
  stroke("white");
  strokeWeight(5);
  fill("black");
  triangle(300, 310, 370, 310, 335, 250);
  line(335, 250, 335, 75);
  line(240, 75, 335, 75);
  line(240, 75, 240, 100);

// Mostra as letras erradas e o nome da categoria
  noStroke();
  fill("white");
  textSize(25);
  text(`Categoria: ${categoriaNome}`, 5, 30);
  text("Letras Erradas:", 5, 80);
  text(letrasErradas, 5, 120);

// Alinha a palavra secreta no meio do canva dependendo do tamanho
  stroke("white");
  strokeWeight(5);
  textSize(50);
  let espaco = 45;
  let totalLargura = espaco * choice.length;
  let inicioX = (width - totalLargura) / 2;
  
  // Array das cores das linhas
  let cores = ["red", "orange", "yellow", "lime", "blue", "indigo", "purple"];
  
  // Muda os underlines pelas letras caso estejam certas
  for (let i = 0; i < choice.length; i++) {
    fill(cores[i % cores.length]);
    text(letrasCertas[i], inicioX + i * espaco, 350);
  }

  textFont("Arial");
  
  // Monta o bonequinho de acordo com os erros

  if (letrasErradas.length >= 1) {
    // Cara
    text(carinha, 210, 130);
  }
  if (letrasErradas.length >= 2) {
    // Corpo
    line(240, 140, 240, 200);
  }
  if (letrasErradas.length >= 3) {
    // Braço Esquerdo
    line(240, 140, 215, 155);
  }
  if (letrasErradas.length >= 4) {
    // Braço Direito
    line(240, 140, 265, 155);
  }
  if (letrasErradas.length >= 5) {
    // Perna Esquerda
    line(240, 200, 215, 220);
  }
  if (letrasErradas.length >= 6) {
    // Perna direita
    line(240, 200, 265, 220);
    
    // reinicia o jogo se perdeer

    if (!gameOver) {
      gameOver = true;
      textSize(35)
      text(`A palavra era: ${choice}`,70, 200)
      noLoop();
      mostrarTelaGameOver();
      somPerdeu.play()
    }
  }
   // reinicia se ganhar
  if (!gameOver && letrasCertas.join("") === choice) {
    gameOver = true;
    noLoop();
    mostrarTelaGameOver();
    text("Acertou!!",150, 200)
    somGanhou.play()
  }

  //controle dos arrays e da posição do mouse
  if (mouseIsPressed) {
    console.log(mouseX, mouseY);
    console.log(letrasErradas);
  }
}

// detecta a letra pressionada (apenas letras, sem simbolos nem números)

function keyPressed() {
  let letra = key.toLowerCase();
  if (letra.length !== 1 || letra < "a" || letra > "z") return;
  if (letrasCertas.includes(letra) || letrasErradas.includes(letra)) return;

  let acertou = false;
  for (let i = 0; i < choice.length; i++) {
    if (choice[i] === letra) {
      letrasCertas[i] = letra;
      acertou = true;
    }
  }

  if (!acertou) {
    letrasErradas.push(letra);
  }
}

//Botão de tentar novamente 

function mostrarTelaGameOver() {
  botaoReiniciar = createButton("Tentar Novamente");
  botaoReiniciar.position(width / 2 - 75, height - 50 );
  botaoReiniciar.class("botao-bonito");
  botaoReiniciar.mousePressed(reiniciarJogo);
}

function mostrarTelaInicial() {
  if (!botaoComecar) {
    botaoComecar = createButton("Começar");
    botaoComecar.position(width / 2 - 75, height - 50);
    botaoComecar.class("botao-bonito");
    botaoComecar.mousePressed(reiniciarJogo);
  }
}

function reiniciarJogo() {
  letrasCertas = [];
  letrasErradas = [];
  telaAtual = "jogo"
  gameOver = false;
  if (botaoComecar) {
    botaoComecar.remove();
    botaoComecar = null;
    musica.loop() // Começa a musica de fundo
  }

  if (botaoReiniciar) {
    botaoReiniciar.remove();
    botaoReiniciar = null;
  }
  carinha = random(["🤓", "😀", "😎", "😛", "🤠", "😈", "👽", "😮"]);
  let sorteada = random(categorias);
  categoriaNome = sorteada.nome;
  choice = random(sorteada.lista);
  for (let i = 0; i < choice.length; i++) {
    letrasCertas[i] = "_";
  }

  loop(); 
}


// Observações importantes: caso for colocar uma categoria nova é só mudar o item
// pra mudar o botão tem q mexer com o css
// lembrar de colocar a musiquinha do fundo dps
// a musica é livre de direitos autorais =)
