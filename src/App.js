import React,{useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [projects, setProjects] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response =>{
      setProjects(response.data); 
    })
  },[]);

  async function handleAddRepository(event) {
    event.preventDefault();
    const response = await api.post('repositories',{
      title: 'Gostack FrontEnd',
      url: 'https://github.com/Heverson/desafio-conceitos-reactjs',
      techs: ['ReactJS', 'NodeJs']
    });
    const project = response.data;
    setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if(response.status === 204)
      setProjects(projects.filter((item) => item.id !== id));
    else 
      alert('Ocorreu um erro ao deletar o projeto \nPor favor, tente novamente mais tarde.') 
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {projects.map((item) => (
            <li key={item.id}>
              <span>{item.title}</span>
              <button onClick={()=>handleRemoveRepository(item.id)}>Remover</button></li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
