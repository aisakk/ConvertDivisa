
let result = document.querySelector('#container-result')
let boton = document.querySelector('#boton')
let valor;
let currency = document.querySelector('#valorcurrency')
let img = document.querySelector('#img')
let select= document.querySelector('#select')
let input = document.querySelector('#input')
const borrar = () =>{
	result.innerHTML= result.innerHTML= `<div class="spinner-border text-info"></div>`;
}

const formular = () =>{
	let selected = document.querySelector('#select').value
	let input = document.querySelector('#input').value
    fetch('https://s3.amazonaws.com/dolartoday/data.json')
    .then(res=>res.json())
    .then(data=>{
    	if(selected == 'dolar'){
    		borrar()
    		valor = [data.USD.dolartoday, data.USD.efectivo_real, data.USD.promedio_real];
    		let total = {
    			resultado: Math.floor(input * valor[0]),
    			resultado2: Math.floor(input * valor[1]),
    			resultado3: Math.floor(input * valor[2])
    		}
    		result.innerHTML = `
				<div class="caja"><h5>Precio al Dolar Today:</h5><p> ${total.resultado} BsF</p></div>
				<div class="caja"><h5>Precio a Efectivo Real:</h5><p> ${total.resultado2} BsF</p></div>
				<div class="caja"><h5>Precio a Promedio Real:</h5><p> ${total.resultado3} BsF</p></div>
    		`;
    	}else if(selected == 'euro'){
    		borrar()
    		valor = [data.EUR.dolartoday, data.EUR.efectivo_real, data.EUR.efectivo_real];
    		let total = {
    			resultado: Math.floor(input * valor[0]),
    			resultado2: Math.floor(input * valor[1]),
    			resultado3: Math.floor(input * valor[2])
    		}
    		result.innerHTML = `
				<div class="caja"><h5>Precio al Dolar Today:</h5><p> ${total.resultado} BsF</p></div>
				<div class="caja"><h5>Precio a Efectivo Real:</h5><p> ${total.resultado2} BsF </p></div>
				<div class="caja"><h5>Precio a Promedio Real:</h5><p> ${total.resultado3} BsF</p></div>
    		`;
    	}
    })
    .catch(error=>{
    	alert('No se pudo completar la Operación Intentelo de nuevo')
    })
    borrar()
   
}

let http = fetch('https://s3.amazonaws.com/dolartoday/data.json')
			.then(res=>res.json())
			.then(data=>{
				valor = [data.USD.dolartoday, data.USD.efectivo_real, data.USD.promedio_real];
				let valor2 = [data.EUR.dolartoday, data.EUR.efectivo_real, data.EUR.efectivo_real];
				currency.innerHTML= `
				<div class="caja1"><h5>Precio del dolar:</h5><p> ${valor[0]}</p>
				<h5>Precio del Euro:</h5><p> ${valor2[0]} </p></div>
    		`;
			})
			.catch(error=>{
				alert('Error no se pudo traer el Archivo: '+ error.message + '\n Se refrescara la pagina en 2sg')
				setTimeout(()=>{
					location.reload()
				}, 1000)
			})


boton.addEventListener('click', ()=>{
	formular()
})
input.addEventListener('keyup',(e)=>{
	if(e.keyCode === 13){
		e.preventDefault();
		formular()
	}
})



select.addEventListener('click', ()=>{
	let selected = document.querySelector('#select').value
	if(selected == 'dolar'){
		img.src="img/002-money.svg"
	}else if(selected == 'euro'){
		img.src="img/003-euro.svg";
	}
})
/*
	data.USD.dolartoday or data.EUR
	.dolartoday
	.efectivo_cucuta
	.efectivo_real
	.promedio
*/