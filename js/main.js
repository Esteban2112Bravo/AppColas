class Nodo
{
	constructor(v)
	{
		this.valor=v;
		this.siguiente=null;
	}
	setSiguiente(s)
	{
 		this.siguiente=s;
	}
}

class Cola
{
	constructor()
	{
		this.frente=null;
		this.tamanio=0;
		this.limite=null;
	}
	insertar(nodo){

		if (this.tamanio<this.limite || this.limite===null) 
		{
			if (!this.frente)
			{
				this.frente = nodo;
				this.tamanio=this.tamanio+1;
			}
			else
			{
				let nodoActual = this.frente;
				while(nodoActual.siguiente)
				{
					nodoActual= nodoActual.siguiente;
				}
				nodoActual.siguiente= nodo;
				this.tamanio=this.tamanio+1;
			}
		}
		else
		{
			alert("No se pueden agregar mas elementos");
		}	
	}
	extraer()
	{
		let nodoActual = this.frente;
		if (this.frente) 
		{
			this.frente=nodoActual.siguiente;
			this.tamanio=this.tamanio-1;
			return `Valor Extraido: ${nodoActual.valor}`;
		}
		else
		{
			return "La cola esta vacia";
		}
	}
	mostrar()
	{
		let colas = new Array();
		let nodoActual=this.frente;
		while(nodoActual)
		{
			colas.push(nodoActual);
			nodoActual= nodoActual.siguiente;
		}
		return colas;
	}
	buscar(elemento)
	{
		let encontrado=false;
		let nodoActual=this.frente;
		if (nodoActual) 
		{
			while(nodoActual)
			{
				if (nodoActual.valor===elemento) 
				{
					encontrado=true;
				}
				nodoActual=nodoActual.siguiente;
			}
			if (encontrado===true) 
			{
				return "Valor encontrado";
			}
			else
			{
				return "Valor no encontrado";
			}
		}
		else
		{
			return "La cola esta vacia";
		}
	}
	vaciar()
	{
		this.frente=null;
		this.tamanio=0;
	}
	contar()
	{
		return this.tamanio;
	}
	limitar(valor)
	{
		this.limite=valor;
	}	
}

(function(){
	const cola = new Cola();
	const lista = document.getElementById("lista");
	const valorText = document.getElementById("valorText");
	const btnAgregar = document.getElementById("btn-agregar");
	const btnBuscar = document.getElementById("btn-buscar");
	const btnExtraer = document.getElementById("btn-extraer");
	const btnContar = document.getElementById("btn-contar");
	const btnVaciar = document.getElementById("btn-vaciar");
	const btnLimitar = document.getElementById("btn-limitar");

	const agregar = function(){
		cola.insertar(new Nodo(valorText.value));
		cola.mostrar();
		valorText.value='';
		mostrar();	
	}
	const mostrar = function(){
		lista.innerHTML='';
		const nodos = cola.mostrar();
		nodos.forEach((nodo) => {
			const liItem = document.createElement('li');
			const valor = document.createTextNode(nodo.valor);
			liItem.appendChild(valor);

			lista.appendChild(liItem);
		});
	}

	const buscar = function(){
		const texto=cola.buscar(valorText.value);
		mensajes(texto,'info');
	}
	const extraer = function(){
		console.log(cola.frente);
		const texto=cola.extraer();
		mostrar();
		mensajes(texto,'info')
	}
	const contar = function(){
		const valor=cola.contar();
		mensajes(`El tamaño es de ${valor} Elementos`,'info');
	}
	const vaciar = function(){
		cola.vaciar();
		mostrar();
	}
	const limitar = function(){
		cola.limitar(valorText.value);
		valorText.value='';
	}

	const mensajes = function(mensaje, cssClass){
		const div = document.createElement('div');
		div.className = `alert alert-${cssClass} mt-2`;
		div.appendChild(document.createTextNode(mensaje));
		const secundario= document.querySelector('.secundario');
		const tareas = document.querySelector('.tareas');
		secundario.insertBefore(div, tareas);
		setTimeout(function(){
			document.querySelector('.alert').remove();
		}, 2300);
	}
	btnAgregar.addEventListener('click', agregar);
	btnBuscar.addEventListener('click', buscar);
	btnExtraer.addEventListener('click',extraer);
	btnVaciar.addEventListener('click', vaciar);
	btnLimitar.addEventListener('click',limitar);
	btnContar.addEventListener('click', contar);

}());