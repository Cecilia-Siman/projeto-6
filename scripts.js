function novoQuizz(){
    let telaCriacao = document.querySelector(".telaInicialQuizz");
    telaCriacao.classList.remove("hide");
    let telaInicial = document.querySelector(".telaHome");
    telaInicial.classList.add("hide");
}

function criarQuizz(){
    let tituloQuizz=document.getElementById("tituloQuizz").value;
    let imagemQuizz=document.getElementById("imgQuizz").value;
    let qtdPerguntas=document.getElementById("qtdPerguntasQuizz").value;
    qtdPerguntas = Number(qtdPerguntas);
    let qtdNiveis=document.getElementById("qtdNiveisQuizz").value;
    qtdNiveis = Number(qtdNiveis);
    let verificador1 = tituloQuizz.length>=21 && tituloQuizz.length<=65;
    let verificador2 = isUrl(imagemQuizz);
    let verificador3 = qtdPerguntas>=3;
    let verificador4 = qtdNiveis>=2;
    if (verificador1===false || verificador2===false || verificador3===false || verificador4===false){
        alert("Preencha os dados corretamente!");
    } else {
        //alert("bora!");
        let pagina = document.querySelector(".telaInicialQuizz");
        pagina.classList.add("hide");

        let proxima = document.querySelector(".perguntasQuizz");
        proxima.classList.remove("hide");
    }
}

function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
 }
