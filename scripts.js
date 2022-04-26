
// INICIO PUXANDO QUIZZ TODOS DO AXIOS 

const API = "https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes";

let qtdPerg = 0;
let qtdResp = 0;

carregarDados()

function carregarDados() {
    const promise = axios.get(API);
    promise.then(renderizarAllQuizzes);
    promise.catch(error);
}

function renderizarAllQuizzes(resposta){
    const containerAllQuizz = document.querySelector(".allQuizzes");
    containerAllQuizz.innerHTML = "";

    for (let i=0; i < resposta.data.length; i++){        
        const quizz = resposta.data[i];
        containerAllQuizz.innerHTML += `
            <div class="boxQuizz" onclick="fazerQuizz(this)" id="${quizz.id}">                    
                <p>${quizz.title}</p>
                <img src="${quizz.image}">                  
            </div>
        `
    }
}

function error(){
    console.log("deu ruim");
}

function reiniciarHome(){
    window.location.reload();
}

// FIM PUXANDO QUIZZ TODOS DO AXIOS 

// INICIO PUXANDO QUIZZ ESPECIFICO



function fazerQuizz(elemento){
    let telaHome = document.querySelector(".telaHome");
    telaHome.classList.add("hide");
    let telaQuizz = document.querySelector(".telaQuizz");
    telaQuizz.classList.remove("hide");

    const idQuizz = elemento.id;    

    const promise = axios.get(`${API}/${idQuizz}`);
    promise.then(renderizarQuizz);
    promise.catch(error);

}

function renderizarQuizz(resposta){
    const containerQuizz = document.querySelector(".telaQuizz");
    
    const quizz = resposta.data;
    console.log(quizz);
    
    containerQuizz.innerHTML = `    
        <div class="capaQuizz">
            <img src="${quizz.image}">
            <p>${quizz.title}</p>
        </div>
        `
    
    const quizzQuestions = (resposta.data.questions);
    console.log(quizzQuestions)   
    
    const quizzLevels = (resposta.data.levels);
    console.log(quizzLevels);
  
    qtdPerg = quizzQuestions.length;
    sorteioAlternativas = [];
    
    for (let i=0; i < quizzQuestions.length; i++){
        
        const alternativas = quizzQuestions[i].answers.sort(comparador);        
        
        let box = "";
            
        for (let i=0; i < alternativas.length; i++){           

            box +=
                    `
                    <div class="alternativaBox" id="${i}" validacao="${alternativas[i].isCorrectAnswer}" onclick="marcarAlternativa(this)">
                        <img src="${alternativas[i].image}">
                        <p>${alternativas[i].text}</p>
                    </div>
                    `
        }     

        containerQuizz.innerHTML += 
            `   
            <div class="boxPerguntas">
                <div class="tituloBox" style="background-color: ${quizzQuestions[i].color};">
                    <p>${quizzQuestions[i].title}</p> 
                </div>
                <div class="opcoesBox" id="${i}">
            ` + box +
            `
                </div>
            </div>
            `   
           
    }   
    
    console.log(quizzLevels);
    containerQuizz.innerHTML += 
            
            `            
            <div class="resultadoQuizzBom hide">
                <div class="boxResultado">
                    <div class="tituloBoxResultado">
                        <p>70% de acerto: Você é quase um expert!</p> 
                    </div>
                    <div class="resultadoBox">                        
                            <img src="img/image-quizz.png">
                            <p>Testando para ver o comportamento da disposição desse comentario no texto asism </p>                                                
                    </div>
                </div>
                <div class="botoesFinalizarQuizz">
                    <div class="btnReiniciarQuizz">Reiniciar Quizz</div>
                    <p onclick="reiniciarHome()">Voltar pra home</p>
                </div>
            </div>
            
                       
            <div class="resultadoQuizzRuim hide">
                <div class="boxResultado">
                    <div class="tituloBoxResultado">
                        <p>70% de acerto: Você é quase um expert!</p> 
                    </div>
                    <div class="resultadoBox">                        
                            <img src="img/image-quizz.png">
                            <p>Testando para ver o comportamento da disposição desse comentario no texto asism </p>                                                
                    </div>
                </div>
                <div class="botoesFinalizarQuizz">
                    <div class="btnReiniciarQuizz">Reiniciar Quizz</div>
                    <p onclick="reiniciarHome()">Voltar pra home</p>
                </div>
            </div>
            `

            




}

// FIM PUXANDO QUIZZ ESPECIFICO

function marcarAlternativa(elemento){
    console.log(elemento)
    console.log(elemento.parentNode)
    
    let paiAlternativas = elemento.parentNode;
    
    let listaAlternativas = paiAlternativas.querySelectorAll(".alternativaBox");
    console.log(listaAlternativas)

    for (let i=0; i < listaAlternativas.length; i++) {
        listaAlternativas[i].classList.add("naoSelecionado");        
        listaAlternativas[i].removeAttribute("onclick");
        elemento.classList.remove("naoSelecionado");
        
        let validacao = listaAlternativas[i].getAttribute("validacao")
        
        if (validacao !== "false"){
            listaAlternativas[i].classList.add("textoVerde");
            console.log(listaAlternativas[i])
        }else{
            listaAlternativas[i].classList.add("textoVermelho");
        }
        
    }    

    qtdResp += 1;

        if (qtdResp === qtdPerg){
            
            
            let telaResultado = document.querySelector(".resultadoQuizzBom");
            telaResultado.classList.remove("hide");            
        }

        
    

}


function novoQuizz(){
    let telaCriacao = document.querySelector(".telaInicialQuizz");
    telaCriacao.classList.remove("hide");
    let telaInicial = document.querySelector(".telaHome");
    telaInicial.classList.add("hide");
}

let quizz;
let qtdPerguntas;
let qtdNiveis;

function criarQuizz(){
    quizz = {};
    quizz.title=document.getElementById("tituloQuizz").value;
    quizz.image=document.getElementById("imgQuizz").value;
    qtdPerguntas=document.getElementById("qtdPerguntasQuizz").value;
    qtdPerguntas = Number(qtdPerguntas);
    qtdNiveis=document.getElementById("qtdNiveisQuizz").value;
    qtdNiveis = Number(qtdNiveis);
    let verificador1 = quizz.title.length>=21 && quizz.title.length<=65;
    let verificador2 = isUrl(quizz.image);
    let verificador3 = qtdPerguntas>=3;
    let verificador4 = qtdNiveis>=2;
    if (verificador1===false || verificador2===false || verificador3===false || verificador4===false){
        alert("Preencha os dados corretamente!");
    } else {
        montarPerguntas();   
    }
}

function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

function montarPerguntas(){
    let pagina = document.querySelector(".telaInicialQuizz");
        pagina.classList.add("hide");

    let proxima = document.querySelector(".perguntasQuizz");
    proxima.classList.remove("hide");

    for (i=1;i<=qtdPerguntas;i++){
        let container = document.querySelector(".containerPerguntas");
        container.innerHTML += `<div class="pergunta">
            <p>Pergunta ${i}</p>
            <ion-icon name="create-outline" onclick="editar('pergunta${i}')"></ion-icon>
            <div class="pergunta${i} hide">
                <input type="text" id="txtPergunta${i}" placeholder="Texto da pergunta">
                <input type="text" id="corPergunta${i}" placeholder="Cor de fundo da pergunta">
                <p>Resposta correta</p>
                <input type="text" id="resposta${i}" placeholder="Resposta correta">
                <input type="text" id="imgResposta${i}" placeholder="URL da imagem">
                <p>Respostas incorretas</p>
                <input type="text" id="respostaErrada1${i}" placeholder="Resposta incorreta 1">
                <input type="text" id="imgErrada1${i}" placeholder="URL da imagem 1">
                <input type="text" id="respostaErrada2${i}" placeholder="Resposta incorreta 2">
                <input type="text" id="imgErrada2${i}" placeholder="URL da imagem 2">
                <input type="text" id="respostaErrada3${i}" placeholder="Resposta incorreta 3">
                <input type="text" id="imgErrada3${i}" placeholder="URL da imagem 3">
            </div>
        </div>`
    }

}

function editar(classe){
    let pergunta = document.querySelector("."+classe);
    pergunta.classList.toggle("hide");
}



function criarNiveis(){
    atualizarObjeto()    
    let teste = conferirPerguntas();
    if (teste === false){
        alert("Preencha os dados corretamente!");
    } else disporNiveis(); 
}

function atualizarObjeto(){
    quizz.questions = [];
    for (i=1;i<=qtdPerguntas;i++){
        quizz.questions[i-1] = {
        title: document.getElementById("txtPergunta"+i).value,
        color: document.getElementById("corPergunta"+i).value, 
        }
        quizz.questions[i-1].answers = [];
        if (document.getElementById("resposta"+i).value != ""){
            quizz.questions[i-1].answers[0] = {
                text: document.getElementById("resposta"+i).value,
                image: document.getElementById("imgResposta"+i).value,
                isCorrectAnswer: true
            }
        }
        for (j=1;j<=3;j++){
            let num = String(j)+ String(i);
            if (document.getElementById("respostaErrada"+num).value != ""){
                quizz.questions[i-1].answers[j] = {
                    text: document.getElementById("respostaErrada"+num).value,
                    image: document.getElementById("imgErrada"+num).value,
                    isCorrectAnswer: false
                }
            }  
        }

        quizz.questions[i-1].answers.sort(comparador);
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}

function conferirPerguntas(){
    for (i=0;i<quizz.questions.length;i++){
        if (quizz.questions[i].title.length < 20){
            return false;
        }
        if (conferirHexDec(quizz.questions[i].color) == false || quizz.questions[i].color[0] != "#"){
            return false;
        }
        let contTrue=0;
        for (j=0;j<quizz.questions[i].answers.length;j++){
            if (quizz.questions[i].answers[j].isCorrectAnswer == true){
                contTrue++;
            }
            if (isUrl(quizz.questions[i].answers[j].image) == false){
                return false;
            }
        }
        if (contTrue == 0){
            return false;
        }
        if (quizz.questions[i].answers.length<2){
            return false;
        }
    }
}

function conferirHexDec(str){
    let re = /[0-9A-Fa-f]{6}/g;
    if(re.test(str)) {
        return true;
    } else {
        return false;
    }
}


function disporNiveis(){
    let pageNiveis = document.querySelector(".niveisQuizz");
    pageNiveis.classList.remove("hide");

    let anterior = document.querySelector(".perguntasQuizz");
    anterior.classList.add("hide");

    for (i=1;i<=qtdNiveis;i++){
        let container = document.querySelector(".containerNiveis");
        container.innerHTML += `<div class="nivel">
        <p>Nível ${i}</p>
        <ion-icon name="create-outline" onclick="editar('nivel${i}')"></ion-icon>
        <div class="nivel${i} hide">
            <input type="text" id="tituloNivel${i}" placeholder="Título do nível">
            <input type="text" id="porcNivel${i}" placeholder="% de acerto mínima">
            <input type="text" id="imgNivel${i}" placeholder="URL da imagem do nível">
            <input type="text" id="descNivel${i}" placeholder="Descrição do nível">
        </div>
    </div>`
    }
}

function finalizarQuizz(){
    atualizarObjetoNiveis()    
    let teste = conferirNiveis();
    if (teste === false){
        alert("Preencha os dados corretamente!");
    } else finalizar();
    //console.log(quizz);
}


function atualizarObjetoNiveis(){
    quizz.levels = [];
    for (i=1;i<=qtdNiveis;i++){
        quizz.levels[i-1] = {
            title: document.getElementById("tituloNivel"+i).value,
			image: document.getElementById("imgNivel"+i).value,
			text: document.getElementById("descNivel"+i).value,
			minValue: document.getElementById("porcNivel"+i).value,
        }
    }
}

function conferirNiveis(){
    let contZero = 0;
    for (i=0;i<quizz.levels.length;i++){
        if (quizz.levels[i].title.length < 10){
            return false;
        }
        if (isUrl(quizz.levels[i].image) == false){
            return false;
        }
        if (quizz.levels[i].text.length < 30){
            return false;
        }
        if (quizz.levels[i].minValue == ""){
            return false;
        }
        if (isNaN(quizz.levels[i].minValue) || quizz.levels[i].minValue < 0 || quizz.levels[i].minValue > 100) {
            return false;
        }
        if (quizz.levels[i].minValue == 0){
            contZero ++;
        }
    }
    if (contZero != 1){
        return false;
    } 
}

function finalizar(){
    let loader = document.querySelector(".loader");
    loader.classList.remove("hide");
    let ultimaPagina = document.querySelector(".finalizacaoQuizz");
    ultimaPagina.innerHTML = `<p>Seu quizz está pronto!</p>
    <div>
        <img src="img/image-quizz.png" alt="imagem do quizz criado">
        <p>nome do quizz</p>
    </div>
    <button class="meuQuizz">Acessar Quizz</button>
    <button class="voltarHome" onclick="window.location.reload()"> <p>Voltar pra home</p></button>` 
}

function tratarSucesso(retorno){
    let loader = document.querySelector(".loader");
    loader.classList.add("hide");

    let ultimaPagina = document.querySelector(".finalizacaoQuizz");
    ultimaPagina.classList.remove("hide");

    let pageNiveis = document.querySelector(".niveisQuizz");
    pageNiveis.classList.add("hide");

    /*let tituloSalvo = retorno.title;
    let idSalvo = retorno.id;
    localStorage.setItem(tituloSalvo, idSalvo);*/
    console.log(retorno);
}

function tratarErro(){
    alert("Seu quizz não foi enviado :(");
}