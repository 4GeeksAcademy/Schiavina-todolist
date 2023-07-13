import React, {useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [todo, setTodo] = useState("");
	const [listaDatos, setListaDatos] = useState([]);

	useEffect(() => {
		obtenerTareas();
		
	}, []);
	console.log(listaDatos);
	
	//FUNCION PARA TRAER LAS TAREAS DE LA BBDD

	function obtenerTareas() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/maxischiavina")
			.then(response => response.json())
			.then(data => setListaDatos([...data]))
			.catch(err => console.log(err));
	}
		// FUNCION PARA SUMAR LA TAREA A LA BASE DE DATOS
		function agregarTarea() {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/maxischiavina", {
				method: "PUT",
				body: JSON.stringify(
					listaDatos
				),
				headers: { "Content-type": "application/json" }
			})
				.then(response => response.json())
				.then(json => console.log(json))
				.catch(err => console.log(err));
		}


	//FUNCION PARA GENERAR EL NRO DE TAREAS PENDIENTES
	function pendiente(){
		if (listaDatos.length >= 1) return (listaDatos.length + " Tareas pendientes")
		else return ("No hay tareas pendientes, agregar tarea")
	}
	

	function handleChange(event){
	setTodo(event.target.value)
	};
	
	function handleSubmit(event){
		event.preventDefault();
		setListaDatos([...listaDatos, {label: todo, done: false}]);
		setTodo("");
		// agregarTarea();
	}
	
	function borrarDato(nombre){
	const nuevaLista = listaDatos.filter((item)=> item !== nombre);
	setListaDatos(nuevaLista);
	}

	function handleClick() {
		agregarTarea();
	}

	function handleEliminar() {
		setListaDatos([]);
		agregarTarea();
	}





	return (
		<div className="bg-dark d-flex align-items center justify-content-center " style={{ height: 500 }}>
		<div className="bg-white w-50 align-items center m-2" style={{ height: 450 }}>
			<h1 className="text-center justify-content-center fs-1">Todos</h1>


			<form onSubmit={handleSubmit}>
  <div className="m-0"  style={{ height: 250 }}>
    
    <input type="text" className="form-control p-0 m-0" id="datos" aria-describedby="emailHelp" onChange={handleChange} value={todo} />
  
	<ul className="p-0 m-0" style={{ listStyle: "none" }}>
  {listaDatos.map((item, index)=> (
    <li className="border-top border-bottom m-0 p-0" key={index}>
      <div className="d-flex justify-content-between align-items-center">
        <span>{item.label}</span>
        <button type="button" className="btn " onClick={() => borrarDato(item)}>x</button>
      </div>
    </li>
  ))}
</ul>
  <p className="p-0 m-0 border">{pendiente()}</p>
  </div>

  <div className="text center d-flex justify-content-between">
	<div>
	<button className="btn btn-sm btn-success ms-5" onClick={handleClick}>Actualizar tareas</button>
	</div>
  <div className="text center d-flex justify-content-center">
	<button className="btn btn-sm btn-danger me-5" onClick={handleEliminar}>Eliminar tareas</button>
	</div>
	</div>
</form>
</div>
		</div>
	);
};

export default Home;
