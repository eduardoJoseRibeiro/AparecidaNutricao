let filtroTabela = document.querySelector("#filtro");

filtroTabela.addEventListener("input", function(e){
    let pesquisa = e.target.value;
    let pacientes = document.querySelectorAll(".paciente");

    if(pesquisa.length > 0){
        pacientes.forEach(function(paciente){
            let expressao = RegExp(pesquisa, "i");
            let nome = paciente.querySelector(".info-nome");
            if(!expressao.test(nome.textContent)){
                paciente.classList.add("invisivel");
            }else{
                paciente.classList.remove("invisivel");
            }
        });
    }else{
        pacientes.forEach(function(paciente){
            paciente.classList.remove("invisivel");
        });
    }
    
});