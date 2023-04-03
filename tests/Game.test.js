import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Game from '../pages/Game';

describe('Testa página Feedback', () => {

  it('Será validado se exibir a imagem do Gravatar', () => {
    renderWithRouterAndRedux(<Game />);
    const image = screen.getByTestId('header-profile-picture');
    expect(image).toBeInTheDocument();
  });

  it('Será validado se exibir o e-mail', () => {
    renderWithRouterAndRedux(<Game />);
    const email = screen.getByTestId('header-player-name');
    expect(email).toBeInTheDocument();
  });

  it('Testa se a pontuação é renderizada', () => {
    const { history } = renderWithRouterAndRedux(<Game />);
    history.push('/game');
    const score = screen.getByTestId('header-score');;

    expect(score).toBeInTheDocument();
  });
});