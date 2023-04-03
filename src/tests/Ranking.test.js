import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  }  
};

const player = [
  {
    "name": "teste2",
    "score": 0
},
  {
      "name": "leo",
      "score": 80
  },
  {
    "name": "teste",
    "score": 100
  }
]

describe('Ranking', () => {

  it('deve exibir o ranking dos usuários', () => {
    localStorage.setItem('users', JSON.stringify(player))
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking')

    const title = screen.getByTestId('ranking-title');
    expect(title).toBeInTheDocument();

    const Button = screen.getByTestId('btn-go-home');
    expect(Button).toBeInTheDocument();
    const name = screen.getByText('leo')
    expect(name).toBeInTheDocument();
    const name2 = screen.getByText('teste')
    expect(name2).toBeInTheDocument();
    const name3 = screen.getByText('teste2')
    expect(name3).toBeInTheDocument();
    
    userEvent.click(Button);
    const { pathname } = history.location;
    expect(pathname).toBe('/');


  });
});
