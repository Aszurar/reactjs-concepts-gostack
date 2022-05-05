import React, { useState } from "react";
import api from "./services/api";
import { useEffect } from "react";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  async function handleAddRepository() {
    // TODO
    const response = await api.post("repositories", {
      title: `Novo repositório: ${Date.now()}`,
      url: "ReactJS",
      techs: ["ReactJS", "NodeJS", "MongoDB"],
    })
    
    const newRepository = response.data;
    setRepositories([...repositories, newRepository]);

}

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`);

    const repositoriesFiltred = repositories.filter(repositories => repositories.id !== id);
    setRepositories(repositoriesFiltred);

  }

  useEffect(() => {
    async function loadRepositories(){
      const response = await api.get("/repositories");
      const repositories =  response.data
      setRepositories(repositories);
    }
    loadRepositories();
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
        <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
