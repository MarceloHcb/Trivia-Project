import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const mockToken = {
    response_code: 0
}

describe('Testes da tela de Login', () => {

    test('Testa se a tela de login possui inputs para nome e email do usuário:', () => {
        renderWithRouterAndRedux(<App />);
        const name = screen.getByTestId('input-player-name');
        const email = screen.getByTestId('input-gravatar-email');

        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
    });

    test('Testa se a tela de login possui o botão de play e se ele é está desativado:', () => {
        renderWithRouterAndRedux(<App />);
        const playBtn = screen.getByRole('button', {
            name: /play/i
          });

        expect(playBtn).toBeInTheDocument();
        expect(playBtn).toBeDisabled();
    });

    test('Testa se o botão play é ativado ao preencher os inputs', () => {
      renderWithRouterAndRedux(<App />);
      const name = screen.getByTestId('input-player-name');
      const email = screen.getByTestId('input-gravatar-email'); 
      const playBtn = screen.getByRole('button', {
        name: /play/i
      });

      userEvent.type(email, 'test@test.com');
      expect(playBtn).toBeDisabled();

      userEvent.type(name, 'Test');
      userEvent.clear(email);
      expect(playBtn).toBeDisabled();

      userEvent.type(email, 'test@test.com')
      expect(playBtn).toBeEnabled();
    })

    test('Testa se o botão play redireciona para a página "/game" e chama a função fetch', () => {
      jest.spyOn(global, 'fetch')
      global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockToken)
      })
      const { history } = renderWithRouterAndRedux(<App />);
      const name = screen.getByTestId('input-player-name');
      const email = screen.getByTestId('input-gravatar-email'); 
      const playBtn = screen.getByRole('button', {
        name: /play/i
      });

      userEvent.type(name, 'Test');
      userEvent.type(email, 'test@test.com');
      userEvent.click(playBtn);
      expect(global.fetch).toHaveBeenCalled();
      waitFor(() => {
        expect(history.location.pathname).toBe('/game');
      });
    })

    test('Testa se é renderizado o botão de settings e se ele redireciona para a página "/settings"', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      const settingsBtn = screen.getByRole('button', {
        name: /settings/i
      }); 

      expect(settingsBtn).toBeInTheDocument();
      userEvent.click(settingsBtn);
      expect(history.location.pathname).toBe('/settings');
    })
});