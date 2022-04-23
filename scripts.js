function novoQuizz(){
    let telaCriacao = document.querySelector(".telaInicialQuizz");
    telaCriacao.classList.remove("hide");
    let telaInicial = document.querySelector(".telaHome");
    telaInicial.classList.add("hide");
}

function criarQuizz(){
    let quizz = {};
    quizz.title=document.getElementById("tituloQuizz").value;
    console.log(quizz);
    quizz.image=document.getElementById("imgQuizz").value;
    let qtdPerguntas=document.getElementById("qtdPerguntasQuizz").value;
    qtdPerguntas = Number(qtdPerguntas);
    let qtdNiveis=document.getElementById("qtdNiveisQuizz").value;
    qtdNiveis = Number(qtdNiveis);
    let verificador1 = quizz.title.length>=21 && quizz.title.length<=65;
    let verificador2 = isUrl(quizz.image);
    let verificador3 = qtdPerguntas>=3;
    let verificador4 = qtdNiveis>=2;
    if (verificador1===false || verificador2===false || verificador3===false || verificador4===false){
        alert("Preencha os dados corretamente!");
    } else {
        montarPerguntas(qtdPerguntas);   
    }
}

function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

function montarPerguntas(qtd){
    let pagina = document.querySelector(".telaInicialQuizz");
        pagina.classList.add("hide");

    let proxima = document.querySelector(".perguntasQuizz");
    proxima.classList.remove("hide");

    for (i=1;i<=qtd;i++){
        let container = document.querySelector(".containerPerguntas");
        container.innerHTML += `<div class="pergunta">
            <p>Pergunta ${i}</p>
            <ion-icon name="create-outline" onclick="editar('pergunta${i}')"></ion-icon>
            <div class="pergunta${i} hide">
                <input type="text" placeholder="Texto da pergunta">
                <input type="text" placeholder="Cor de fundo da pergunta">
                <p>Resposta correta</p>
                <input type="text" placeholder="Resposta correta">
                <input type="text" placeholder="URL da imagem">
                <p>Respostas incorretas</p>
                <input type="text" placeholder="Resposta incorreta 1">
                <input type="text" placeholder="URL da imagem 1">
                <input type="text" placeholder="Resposta incorreta 2">
                <input type="text" placeholder="URL da imagem 2">
                <input type="text" placeholder="Resposta incorreta 3">
                <input type="text" placeholder="URL da imagem 3">
            </div>
        </div>`
    }

}

function editar(classe){
    let pergunta = document.querySelector("."+classe);
    pergunta.classList.toggle("hide");
}

/*function criarNiveis(){
    let arrayPerguntas;

}*/


