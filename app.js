let listaDeNumeroSorteado = [];
let numeroMaximo = 10;
let tentativas = 1;
let numeroSecreto = gerarNumeroAleatorio();

exibirMensagemInicial();
function exibirMensagemInicial() {
     exibirTextoNaTela('h1', 'Jogo do número secreto');
     exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}`);
}
function exibirTextoNaTela(tag, texto) {
     let campo = document.querySelector(tag);
     campo.innerHTML = texto;
     responsiveVoice.speak(texto,'Brazilian Portuguese Female', {rate:1.2});
}
function gerarNumeroAleatorio() {
     let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
     let quantidadeDeElementosNaLista = listaDeNumeroSorteado.length;
     if (quantidadeDeElementosNaLista == numeroMaximo) {
          listaDeNumeroSorteado = [];
     }

     if (listaDeNumeroSorteado.includes(numeroEscolhido)) {
          return gerarNumeroAleatorio();
     } else {
          listaDeNumeroSorteado.push(numeroEscolhido);
          return numeroEscolhido;
     }
}
function verificarChute() {
     let chute = document.querySelector('input').value;
     if (chute == numeroSecreto) {
          exibirTextoNaTela('h1', 'Acertou!');
          let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
          let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
          exibirTextoNaTela('p', mensagemTentativas);
          document.getElementById('reiniciar').removeAttribute('disabled');
     } else {

          if (chute > numeroSecreto) {
               exibirTextoNaTela('p', 'O número secreto é menor!');
          } else {
               exibirTextoNaTela('p', 'O número secreto é maior!');
          }
          tentativas++;
          limparCampo();
     }
}
function limparCampo() {
     chute = document.querySelector('input');
     chute.value = '';
}
function reiniciarJogo() {
     numeroSecreto = gerarNumeroAleatorio();
     limparCampo();
     tentativas = 1;
     exibirMensagemInicial();
     document.getElementById('reiniciar').setAttribute('disabled', true);
}