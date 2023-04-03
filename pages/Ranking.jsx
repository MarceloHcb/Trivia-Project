import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetState } from '../redux/actions';

class Ranking extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    const negative = -1;
    const users = JSON.parse(localStorage.getItem('users'));
    users.sort((a, b) => {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return negative;
      return 0;
    });
    this.setState({ users });
  }

  reset = () => {
    const { history, dispatch } = this.props;
    localStorage.removeItem('token');
    history.push('/');
    dispatch(resetState());
  };

  render() {
    const { users } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          {users.map((avatar, index) => (
            <li
              key={ avatar.token }
            >
              <p data-testid={ `player-name-${index}` }>{avatar.name}</p>
              <p data-testid={ `player-score-${index}` }>{avatar.score}</p>
              <img src={ avatar.gravatarImage } alt={ avatar.token } />
            </li>))}
        </ol>
        <button
          type="button"
          onClick={ this.reset }
          data-testid="btn-go-home"
        >
          VOLTAR PARA O INICIO
        </button>
      </div>
    );
  }
}

Ranking.defaultProps = {
  history: {},
};

Ranking.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Ranking);
