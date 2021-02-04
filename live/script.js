let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1rig');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let VotoBranco = true;
let votos = [];


function comecarEtapa(){
let etapa = etapas[etapaAtual];

let numerohtml = '';
numero = '';
VotoBranco = false;

for(let i=0;i<etapa.numeros;i++){
    if(i === 0){   
        numerohtml +=   '<div class="numero pisca"></div>';
}else {
    numerohtml +=   '<div class="numero"></div>';
}
}

seuVotoPara.style.display = 'none';
cargo.innerHTML= etapa.titulo;
descricao.innerHTML='';
lateral.innerHTML='';
aviso.style.display='none'
numeros.innerHTML= numerohtml;


}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidato.filter((item)=>{
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    });
if(candidato.length>0){
    candidato = candidato[0];
    seuVotoPara.style.display = 'block';
    aviso.style.display='block'
    descricao.innerHTML= `nome : ${candidato.nome}<br/> partido ${candidato.partido}`;

    let fotoshtml = '';

    for(let i in candidato.fotos){
        if(candidato.fotos[i].small){
            fotoshtml += `<div class="d-1-image small">  <img src="imagens/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda} </div>`
        } else {
        fotoshtml += `<div class="d-1-image">  <img src="imagens/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda} </div>`
        }
    }

    lateral.innerHTML = fotoshtml;

}else{
    seuVotoPara.style.display = 'block';
    aviso.style.display='block';
    descricao.innerHTML= '<div class="aviso-grande pisca">VOTO NULO</div>';
}



}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !==null){
        elNumero.nextElementSibling.classList.add('pisca');
    }else {
        atualizaInterface();
    }
    }
}
function branco(){
numero = '';
VotoBranco = true;
seuVotoPara.style.display = 'block';
aviso.style.display='block';
numeros.innerHTML= '';
descricao.innerHTML= '<div class="aviso-grande pisca">VOTO EM BRANCO </div>';
lateral.innerHTML = ''


}
function corrige(){
   comecarEtapa();
}
function confirma(){
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if (VotoBranco === true){
votoConfirmado = true;
votos.push({
    etapa: etapas[etapaAtual].titulo,
    voto: 'branco'
});


    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });

    }
    if(votoConfirmado){
etapaAtual++;
if(etapas[etapaAtual] !== undefined ){
comecarEtapa()
}else {
    document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca"> FIM </div>';
    console.log(votos);
}

    }
}

comecarEtapa();

//1:49:12












