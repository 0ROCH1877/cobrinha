const canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext('2d');

let snake = [{ x: 10, y: 10 }];
let tamanho = 5;
let direcao = 'direita';
let comida = { x: 0, y: 0 };
let pontuacao = 0; // variável para armazenar a pontuação

function desenha() {
  // Limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Desenha a cobrinha
  ctx.fillStyle = 'black';
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }
  
  // Desenha a comida
  ctx.fillStyle = 'red';
  ctx.fillRect(comida.x, comida.y, 10, 10);

  // Desenha a pontuação
  ctx.fillStyle = 'black';
  ctx.font = '24px Arial';
  ctx.fillText(`Pontuação: ${pontuacao}`, 10, 30);
}

function colisao(cobra, objeto) {
  return cobra.x >= objeto.x - 10 && cobra.x <= objeto.x + 10 &&
         cobra.y >= objeto.y - 10 && cobra.y <= objeto.y + 10;
}

function move() {
  // Move a cobrinha na direção atual
  let novaCabeca = { x: snake[0].x, y: snake[0].y };
  switch (direcao) {
    case 'cima':
      novaCabeca.y--;
      break;
    case 'baixo':
      novaCabeca.y++;
      break;
    case 'esquerda':
      novaCabeca.x--;
      break;
    case 'direita':
      novaCabeca.x++;
      break;
  }

  // Verifica se a cobrinha comeu a comida
  if (colisao(novaCabeca, comida)) {
    tamanho++;
    comida.x = Math.floor(Math.random() * (canvas.width - 10));
    comida.y = Math.floor(Math.random() * (canvas.height - 10));
    pontuacao++; // incrementa a pontuação
  }

  // Remove a cauda da cobrinha se ela estiver muito grande
  if (snake.length === tamanho) {
    snake.pop();
  }

  // Verifica se a cobrinha colidiu com a parede
  if (novaCabeca.x < 0 || novaCabeca.x >= canvas.width ||
    novaCabeca.y < 0 || novaCabeca.y >= canvas.height) {
  tamanho = 5;
  snake = [{ x: 10, y: 10 }];
  comida = { x: Math.floor(Math.random() * (canvas.width - 10)), y: Math.floor(Math.random() * (canvas.height - 10)) };
  direcao = 'direita';
  pontuacao = 0; // reinicia a pontuação
  return;
}


  // Adiciona a nova cabeça da cobrinha
  snake.unshift(novaCabeca);
}

let pausado = false;
let timeoutID;

window.addEventListener('keydown', function(event) {
  if (event.key === 'p' || event.key === 'P') {
    pausado = !pausado;
    if (pausado) {
      clearTimeout(timeoutID);
    } else {
      loopJogo();
    }
    
  }
});

window.addEventListener('keydown', function(event) {
    switch (event.key) {
      case 'ArrowUp':
        direcao = 'cima';
        break;
      case 'ArrowDown':
        direcao = 'baixo';
        break;
      case 'ArrowLeft':
        direcao = 'esquerda';
        break;
      case 'ArrowRight':
        direcao = 'direita';
        break;
    }
  });

function loopJogo() {
  if (!pausado) {
    desenha();
    move();
    timeoutID = setTimeout(loopJogo, 5);
  }
}
loopJogo();

  
 

