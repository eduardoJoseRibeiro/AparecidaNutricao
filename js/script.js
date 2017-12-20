let titulo = document.querySelector("#titulo");
titulo.textContent = "Aparecida Nutricionista";

let tabelaPacientes = document.querySelector("#tabela-pacientes");
let adicionaPaciente = document.querySelector("#adicionar-paciente");
let formAdiciona = document.querySelector("#form-adiciona");
let formErro = document.querySelector("#form__erro");

function calculaImc(peso, altura) {
	let IMC = peso / (altura * altura);
	return IMC.toFixed(2);
}

function verificaIMC(){
	let pacientes = document.querySelectorAll('.paciente');

	for (let i = 0; i < pacientes.length; i++) {
		let paciente = pacientes[i];
		
		let peso = paciente.querySelector('.info-peso').textContent;
		let altura = paciente.querySelector('.info-altura').textContent;
		
		let imc = calculaImc(peso, altura);
		
		let flag = 0;
		
		let pesoValido = validaPeso(peso);
		let alturaValida = validaAltura(altura);

		if (!pesoValido) {
			paciente.querySelector(".info-imc").textContent = "Peso Inválido!";
			flag = 1
		} else if (!alturaValida) {
			paciente.querySelector(".info-imc").textContent = "Altura Inválida!";
			flag = 1
		} else {
			paciente.querySelector(".info-imc").textContent = imc;
		}

		if (flag == 1) {
			paciente.classList.add("paciente-invalido")
		}
	}
}
function validaPeso(peso){
	if(peso > 0 && peso < 1000){
		return true;
	}else{
		return false;
	}
}

function validaAltura(altura){
	if(altura > 0 && altura < 3.00){
		return true;
	}else{
		return false;
	}
}

function validaPaciente(peso, altura){
	let erros = [];

	if(!validaPeso(peso)){
		erros.push("Peso Inválido");
	}
	if(!validaAltura(altura)){
		erros.push("Altura Inválida");
	}
	return erros;
}

function adicionarPacienteNaTabela(paciente){

	let pacienteTr = montaTr(paciente);
	
	let erros = validaPaciente(paciente.peso, paciente.altura);
	formErro.innerHTML = "";
	if(erros.length > 0){
		let inserir = "";
		for(let i = 0; i < erros.length; i++){
			inserir += "<li class='form__erro--elemento'>";
			inserir += erros[i];
			inserir += "</li>"
		}

		formErro.innerHTML += inserir;
		return;
	}
	tabelaPacientes.appendChild(pacienteTr);
	verificaIMC();
}

function adicionarPaciente() {
	let paciente = obtemDadosPaciente(formAdiciona);	
	console.log(paciente);
	
	adicionarPacienteNaTabela(paciente);

	formErro.innerHTML = "";
	formAdiciona.reset();
}

adicionaPaciente.addEventListener("click", function(event){
	event.preventDefault();
	adicionarPaciente();
});

function obtemDadosPaciente(form){
	let paciente = {
		nome : form.nome.value,
		peso : form.peso.value,
		altura : form.altura.value,
		gordura : form.gordura.value,
		imc : calculaImc(form.peso.value, form.altura.value)
	}
	return paciente;
}

function montaTr(paciente){
	let pacienteTr = document.createElement("tr");
	
	pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
	pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
	pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
	pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
	pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));
	
	return pacienteTr;
}

function montaTd(dado, classe){
	let td = document.createElement('td');
	td.textContent = dado;
	td.classList.add(classe);

	return td;
}

verificaIMC();

let tabela = document.querySelector("table");

tabela.addEventListener("dblclick", function(e){
	e.target.parentNode.classList.add("fade-out");
	
	setTimeout(function(){	
		e.target.parentNode.remove();
	}, 750);
});