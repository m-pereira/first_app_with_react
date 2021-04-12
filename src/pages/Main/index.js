import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Form, Input, SubmitButton, List } from './styles';
import api from '../../services/api';
import Container from '../../components/Container';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRepo: '',
      repositories: [],
      loading: false,
      formError: false,
    };
  }

  // carregar os dados que estão no localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // salvar o estado repositories novamente no localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChage = (e) => {
    this.setState({ newRepo: e.target.value, formError: false });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    if (!newRepo) {
      this.setState({ formError: true, loading: false });
      return;
    }

    try {
      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
        // link: `github.com${response.config.url}`,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
      });
    } catch (error) {
      this.setState({ formError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newRepo, loading, repositories, formError } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <Input
            type='text'
            placeholder='Adicionar Repositório'
            value={newRepo}
            onChange={this.handleInputChage}
            error={formError}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color='#fff' size={14} />
            ) : (
              <FaPlus color='#fff' size={14} />
            )}
          </SubmitButton>
        </Form>
        {formError && (
          <span style={{ color: 'red' }}>Repositório inválido</span>
        )}

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
  }
}

export default Main;
