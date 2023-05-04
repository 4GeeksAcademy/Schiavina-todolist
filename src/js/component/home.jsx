import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

const [dato, setDato] = useState("");
const [listaDatos, setListaDatos] = useState([]);
const pendiente = listaDatos.length

function handleChange(event){
setDato(event.target.value)
};

function handleSubmit(event){
	event.preventDefault();
	setListaDatos([...listaDatos, dato]);
	setDato("");
}

function borrarDato(event){
const nuevaLista = listaDatos.filter((item)=> item.id !== id);
setListaDatos(nuevaLista);
}
	return (
		<div className="bg-dark d-flex align-items center justify-content-center">
		<div className="bg-white w-50 align-items center" >
			<h1 className="text-center justify-content-center fs-1">Todos</h1>


			<form onSubmit={handleSubmit}>
  <div className="m-0"  style={{ height: 300 }}>
    <label htmlFor="datos" className="form-label"></label>
    <input type="text" className="form-control p-0 m-0" id="datos" aria-describedby="emailHelp" onChange={handleChange} value={dato} required />
  </div>
  <ul className="p-0" style={{ listStyle: "none" }}>{listaDatos.map((item, index)=> (<li className="border-top border-bottom m-0 p-0" key={item.id}>{item} <button className="border-0 bg-white" type="button" onClick={()=> borrarDato(item.id)}>X</button></li>))}</ul>
  <p className="p-0 m-0 border">{pendiente} Items Left</p>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
		</div>
	);
};

export default Home;
