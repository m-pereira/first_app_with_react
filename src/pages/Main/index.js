import React, { useState, useEffect } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Form, Input, SubmitButton, List } from './styles';
import api from '../../services/api';
import Container from '../../components/Container';

const Main = () => {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    const persistedRepositories = localStorage.getItem('repositories');

    if (persistedRepositories) {
      setRepositories(JSON.parse(persistedRepositories));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  const handleInputChange = (e) => {
    setNewRepo(e.target.value);
    setFormError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!newRepo) {
      setFormError(true);
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      setRepositories([...repositories, data]);
      setNewRepo('');
    } catch (error) {
      setFormError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder='Adicionar Repositório'
          value={newRepo}
          onChange={handleInputChange}
          error={formError}
        />

        <SubmitButton loading={loading ? 1 : undefined}>
          {loading ? (
            <FaSpinner color='#fff' size={14} />
          ) : (
            <FaPlus color='#fff' size={14} />
          )}
        </SubmitButton>
      </Form>
      {formError && <span style={{ color: 'red' }}>Repositório inválido</span>}

      <List>
        {repositories.map((repo) => (
          <li key={repo.name}>
            <span>{repo.name}</span>
            {/* o formato de link normal html (<a>) recarrega a pagina,
            por isso precisado de um que vem do nosso router
            <a href={repo.link}>Detalhes</a> */}
            <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
};

export default Main;
