import React from 'react';
import PropTypes from 'prop-types';

function Repository({ match }) {
  return <h1>Repository: {decodeURIComponent(match.params.repository)}</h1>;
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Repository;
