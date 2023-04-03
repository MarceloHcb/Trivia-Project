// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// const saveRanking = () => {
//   const { name, score, assertions, gravatarEmail } = this.props;
//   const token = localStorage.getItem('token');
//   const users = JSON.parse(localStorage.getItem('users'));
//   const gravatar = {
//     name,
//     score,
//     assertions,
//     gravatarEmail,
//     token,
//   };
//   if (users) {
//     users.push(gravatar);
//     localStorage.setItem('users', JSON.stringify(users));
//   } else {
//     localStorage.setItem('users', JSON.stringify([gravatar]));
//   }
// };

// saveRanking.propTypes = {
//   name: PropTypes.string,
//   score: PropTypes.number,
// }.isRequired;

// const mapStateToProps = (state) => ({
//   name: state.player.name,
//   score: state.player.score,
//   gravatarEmail: state.player.userEmail,
// });

// export default connect(mapStateToProps)(saveRanking)
