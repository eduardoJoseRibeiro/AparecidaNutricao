let botao = document.querySelector("#buscar-paciente");

botao.addEventListener("click", function(e){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://api-pacientes.herokuapp.com/pacientes");
    xhr.addEventListener("load",function(){
        let erroAjax = document.querySelector("#erro-ajax");
        if(xhr.status == 200){
            if(!erroAjax.classList.contains("invisivel")){
                erroAjax.classList.add("invisivel");    
            }
            let respostas = JSON.parse(xhr.responseText);
            respostas.forEach(element => { 
                adicionarPacienteNaTabela(element); 
            }); 
        }else{
            erroAjax.classList.remove("invisivel");
            console.log(xhr.status);
            console.log(xhr.responseText);
        }
    });
    xhr.send();

});