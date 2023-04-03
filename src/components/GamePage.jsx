import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateScore } from '../redux/actions';

class GamePage extends Component {
  state = {
    results: [],
    isLoading: true,
    correct: [],
    border: '',
    borderRed: '',
    timer: 30,
    isDisabled: false,
    questionNum: 0,
    showNext: false,
    totalScore: 0,
    data: [],
    assertions: 0,
  };

  componentDidMount() {
    this.requestQuestions(); this.handleTimer();
  }

  updateAnswers = (data) => {
    const { questionNum } = this.state; const magicNumber = 0.5;
    this.setState({
      results: data.results,
      isLoading: false,
      correct: data.results[questionNum + 1].correct_answer,
      answers: [...data.results[questionNum + 1].incorrect_answers.map((inc) => inc),
        data.results[questionNum + 1].correct_answer]
        .sort(() => Math.random() - magicNumber),
    });
  };

  requestQuestions = async () => {
    const { questionNum } = this.state; const { history } = this.props;
    const token = localStorage.getItem('token'); const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    this.setState({
      data,
    });
    if (data.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      const magicNumber = 0.5;
      this.setState({
        results: data.results,
        isLoading: false,
        correct: data.results[questionNum].correct_answer,
        answers: [...data.results[questionNum].incorrect_answers.map((inc) => inc),
          data.results[questionNum].correct_answer]
          .sort(() => Math.random() - magicNumber),
      });
    }
  };

  handleClick = ({ target }) => {
    let { value } = target; const { dispatch } = this.props; const { timer } = this.state;
    let { totalScore, assertions } = this.state;
    const medium = 2; const hard = 3; const easy = 1;
    clearInterval(this.timerInterval);
    switch (value) {
    case 'easy':
      value = easy;
      break;
    case 'medium':
      value = medium;
      break;
    case 'hard':
      value = hard;
      break;
    default:
      break;
    }
    this.setState({
      borderRed: '3px solid red',
      border: '3px solid rgb(6, 240, 15)',
      showNext: true,
    });
    const fixedValue = 10;
    if (value === 'wrong' || value === false) {
      this.setState({
        totalScore,
      });
      return;
    }
    totalScore += (fixedValue + (timer * value));
    if (target.id === 'correct') {
      this.setState({
        assertions: assertions += 1,
      });
    }
    const dispatchObj = {
      totalScore,
      assertions,
    };
    dispatch(updateScore(dispatchObj));
    this.setState({
      totalScore,
    });
  };

  saveRanking = () => {
    const { token } = this.state;
    const { name, score, assertions, gravatarEmail } = this.props;
    const users = JSON.parse(localStorage.getItem('users'));
    const gravatar = {
      name,
      score,
      assertions,
      gravatarEmail,
      token,
    };
    if (users) {
      users.push(gravatar);
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      localStorage.setItem('users', JSON.stringify([gravatar]));
    }
  };

  handleNext = async () => {
    const { questionNum, data } = this.state;
    const { history } = this.props;
    const questionLimit = 4;
    this.setState({
      questionNum: questionNum + 1,
      timer: 30,
      border: '',
      borderRed: '',
    });
    this.handleTimer();
    if (questionNum === questionLimit) {
      this.saveRanking();
      history.push('/feedback');
      return;
    }
    this.updateAnswers(data);
  };

  handleTimer = () => {
    const intervalTimer = 1000;
    const limit = 30;
    let tim = limit;
    this.timerInterval = setInterval(() => {
      tim -= 1;
      this.setState({
        timer: tim,
      });
      if (tim === 0) {
        clearInterval(this.timerInterval);
        this.setState({
          isDisabled: true,
        });
      }
    }, intervalTimer);
  };

  render() {
    const { results, isLoading, correct, border, borderRed,
      answers, timer, isDisabled, questionNum, showNext } = this.state;
    return (
      <div>
        {isLoading === true ? <p>Loading...</p> : (
          <div>
            <h1 data-testid="question-category">
              {results[questionNum].category}
            </h1>
            <h2 data-testid="question-text">
              {results[questionNum].question}
            </h2>
            <h2>
              Timer:
              {timer}
            </h2>
            <div data-testid="answer-options">
              { answers.map((answer, index) => (
                answer === correct ? (
                  <button
                    key={ index }
                    type="button"
                    value={ results[questionNum].difficulty }
                    data-testid="correct-answer"
                    id="correct"
                    style={ { border } }
                    disabled={ isDisabled }
                    onClick={ this.handleClick }
                  >
                    {answer}
                  </button>
                )
                  : (
                    <button
                      data-testid={ `wrong-answer-${index}` }
                      type="button"
                      key={ index }
                      value="wrong"
                      style={ { border: borderRed } }
                      disabled={ isDisabled }
                      onClick={ this.handleClick }
                    >
                      {answer}
                    </button>
                  )
              ))}
              <div>
                { showNext && (
                  <button
                    type="button"
                    data-testid="btn-next"
                    onClick={ this.handleNext }
                  >
                    next
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
GamePage.defaultProps = {
  history: {},
};
GamePage.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  totalScore: PropTypes.number,
  userImage: PropTypes.string,
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.userEmail,
});
export default connect(mapStateToProps)(GamePage);
