import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

class Repository extends Component {
  // outra forma de declarar os propTypes, porem nessa versão o ESLint, nao gostou mto
  // static propTypes = {
  //   match: PropTypes.shape({
  //     params: PropTypes.shape({
  //       repository: PropTypes.string,
  //     }),
  //   }).isRequired,
  // };

  constructor(props) {
    super(props);
    this.state = {
      repository: {},
      issues: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`),
      {
        params: {
          state: 'open',
          per_page: 5,
        },
      },
      // foi usado uma função do axios onde os params da url podem ser passados como js
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;

    console.log(repository);
    console.log(issues);
    console.log(loading);

    return <h1 style={{ color: 'white' }}>Repository</h1>;
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};

export default Repository;
