import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canGuess: true,
      result: 'Попробуйте отгадать число',
      attempts: 0,
      compNumber: this.getNumber(),
      userNumber: '',
    };
  }

  getNumber = () =>
    Math.floor(Math.random() * this.props.max - this.props.min) +
    this.props.min;

  handleSubmit = (e) => {
    console.log(this.state);
    e.preventDefault();

    this.setState((prevState) => {
      if (!prevState.userNumber) {
        return prevState;
      }

      const newState = {...prevState};
      newState.attempts += 1;

      const userNumber = +this.state.userNumber;
      if (userNumber === this.state.compNumber) {
        newState.result = `Правильно! Всего попыток: ${this.state.attempts}`;
        newState.canGuess = false;
      } else if (userNumber < this.state.compNumber) {
        newState.result = `Больше`;
      } else {
        newState.result = `Меньше`;
      }

      return newState;
    });
  };

  handleChange = (e) => {
    this.setState((prevState) => {
      const newState = {...prevState};
      newState.userNumber = e.target.value;
      return newState;
    });
  };

  handleRestart = (e) => {
    console.log(e);
    this.setState({
      canGuess: true,
      result: 'Попробуйте отгадать число',
      attempts: 0,
      compNumber: this.getNumber(),
      userNumber: '',
    });
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor="user_number">
            Угадай число
          </label>
          <input
            className={style.input}
            onChange={this.handleChange}
            value={this.state.userNumber}
            type="number"
            id="user_number"
          />
          <button className={style.btn} disabled={!this.state.canGuess}>
            Угадать
          </button>
          <button className={style.btn} onClick={this.handleRestart}>
            Начать сначала
          </button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  result: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  attempts: PropTypes.number,
};
