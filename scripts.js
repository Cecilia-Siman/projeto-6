function criarQuizz(){
    let tituloQuizz=document.getElementById("tituloQuizz").value;
    let imagemQuizz=document.getElementById("imgQuizz").value;
    let qtdPerguntas=document.getElementById("qtdPerguntasQuizz").value;
    qtdPerguntas = Number(qtdPerguntas);
    let qtdNiveis=document.getElementById("qtdNiveisQuizz").value;
    qtdNiveis = Number(qtdNiveis);
    //console.log(tituloQuizz + imagemQuizz + qtdPerguntas + qtdNiveis);
    let verificador1 = tituloQuizz.length>=21 && tituloQuizz.length<=65;
    let verificador2 = "";
    let verificador3 = qtdPerguntas>=3;
    let verificador4 = qtdNiveis>=2;
    //console.log(verificador1+verificador2+verificador3+verificador4)
    if (verificador1==false || verificador2===false || verificador3===false || verificador4===false){
        alert("Preencha os dados corretamente!");
    } else {
        alert("bora!");
        let pagina = document.querySelector(".telaInicialQuizz");
        pagina.classList.add("hide");

        let proxima = document.querySelector(".montarQuizz");
        proxima.classList.remove("hide");
    }
}
