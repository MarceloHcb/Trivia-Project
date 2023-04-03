import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    const avatar = md5(email).toString();
    return (
      <header>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${avatar}` } alt="Avatar" />
        <h2 data-testid="header-player-name">{name}</h2>
        <h2 data-testid="header-score">{score}</h2>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  name: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,

});

export default connect(mapStateToProps)(Header);
