import React, {useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tarea, setTarea] = useState("");
	const [listaTareas, setListaTareas] = useState([]);

	useEffect(() => {
		obtenerTareas();
		console.log("Valor actualizado de tarea:", tarea);
	  }, []);
	
	function pendiente() {
		if (listaTareas.length >= 1) return (listaTareas.length + " Tareas pendientes")
		else return ("No hay tareas pendientes, agregar tarea")
	} 
	  
	function handleChange(event){
		setTarea(event.target.value)	
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (tarea.trim() !== "") { 
		  setListaTareas([...listaTareas, tarea]);
		  setTarea(""); 
		}
	}
	function borrarDato(nombre) {
		const nuevaLista = listaTareas.filter((item)=> item !== nombre);
		setListaTareas(nuevaLista);	
	}
	
	// ##################FETCH PARA AGREGAR UNA TAREA###########################
	function agregarTarea(){
	fetch("https://playground.4geeks.com/apis/fake/todos/user/maxischiavina", {
					method: 'PUT',
					body: JSON.stringify(listaTareas),
					headers:{ 'Content-Type':'application/json'
				}
				})
				  .then(response => response.json())
				  .then(data => console.log(data))
				  .catch((error) => console.log(error));
			}
			
				// ##################FETCH PARA TRAER TODAS LAS TAREAS###########################
				function obtenerTareas() {
					fetch("https://playground.4geeks.com/apis/fake/todos/user/maxischiavina")
						.then(response => response.json())
						.then(data => setListaTareas([...data]))
						.catch(err => console.log(err));
				}
				

	return (
		<div className="container p-0">
			<div className="bg-dark w-100 p-0 d-flex justify-content-center" style={{ minHeight: "600px", overflowY: "auto" }}>
			<form onSubmit={handleSubmit}>
  <div className="mb-3 bg-white mt-5">
    <label htmlFor="tareapendiente" style={{ minWidth: "700px", overflowY: "auto" }} className="form-label text-dark text-center"><h1>Tareas pendientes de hacer:</h1></label>
    <input type="text" className="form-control" onChange={handleChange} value={tarea} id="tareapendiente" aria-describedby="emailHelp" />
	<ul className="p-0 m-0" style={{ listStyle: "none" }}>
  {listaTareas.map((item, index)=> (
    <li className="border-top border-bottom m-0 p-0" key={index}>
      <div className="d-flex justify-content-between align-items-center">
        <span>{item}</span>
        <button type="button" className="btn " onClick={() => borrarDato(item)}>x</button>
      </div>
    </li>
  ))}
</ul>
    <div id="emailHelp" className="form-text text-dark mt-5">{pendiente()}</div>
  </div>

	<div className="text-center">
	<button type="submit" className="btn btn-primary" onClick={()=> agregarTarea()}>Confirmar cambios</button>
	</div>
  
</form>

			</div>






		</div>
	);
};

export default Home;
