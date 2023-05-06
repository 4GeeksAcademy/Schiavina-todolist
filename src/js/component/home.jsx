import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [dato, setDato] = useState("");
	const [listaDatos, setListaDatos] = useState([]);


	// const pendiente = listaDatos.length

	function pendiente(){
		if (listaDatos.length >= 1) return (listaDatos.length + " Tareas pendientes")
		else return ("No hay tareas pendientes, agregar tarea")
	}
	
	function handleChange(event){
	setDato(event.target.value)
	};
	
	function handleSubmit(event){
		event.preventDefault();
		setListaDatos([...listaDatos, dato]);
		setDato("");
	}
	
	function borrarDato(nombre){
	const nuevaLista = listaDatos.filter((item)=> item !== nombre);
	setListaDatos(nuevaLista);
	}


	return (
		<div className="bg-dark d-flex align-items center justify-content-center " style={{ height: 500 }}>
		<div className="bg-white w-50 align-items center m-2" style={{ height: 450 }}>
			<h1 className="text-center justify-content-center fs-1">Todos</h1>


			<form onSubmit={handleSubmit}>
  <div className="m-0"  style={{ height: 250 }}>
    
    <input type="text" className="form-control p-0 m-0" id="datos" aria-describedby="emailHelp" onChange={handleChange} value={dato} required />
  
	<ul className="p-0 m-0" style={{ listStyle: "none" }}>
  {listaDatos.map((item, index)=> (
    <li className="border-top border-bottom m-0 p-0" key={index}>
      <div className="d-flex justify-content-between align-items-center">
        <span>{item}</span>
        <button type="button" className="btn " onClick={() => borrarDato(item)}>x</button>
      </div>
    </li>
  ))}
</ul>
  <p className="p-0 m-0 border">{pendiente()}</p>
  </div>
</form>
</div>
		</div>
	);
};

export default Home;
