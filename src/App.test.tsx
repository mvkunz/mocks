// App.test.tsx

import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

describe('Testando fetch', () => {
  afterEach(() => vi.clearAllMocks()); // Ela existe para garantir que, após cada teste, o mock seja limpo. Isso serve para que não exista interferência entre um teste e outro, caso sejam criados novos testes dentro do escopo do mesmo describe. Outros métodos bastante utilizados são resetAllMocks e restoreAllMocks

  it('fetch a joke', async () => {
    // O objeto MOCK_JOKE recebe um valor similar aos dados retornados pela API;
    const MOCK_JOKE = { 
      id: '7h3oGtrOfxc',
      joke: 'Thanks for explaining the word "many" to me. It means a lot.',
    };
    // O objeto MOCK_RESPONSE recebe um valor similar aos dados retornados pela função fetch. Note que aqui indicamos que esse objeto é do tipo Response. Dessa forma, o TypeScript vai entender que esse objeto possui os mesmos valores que o retorno de uma requisição;
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => MOCK_JOKE,
    } as Response;
    // O vi.spyOn espiona as chamadas da função fetch do objeto global. É por meio deste objeto que conseguimos usar qualquer função do sistema. A partir da versão 18 do node, fetch também está definida em global;
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
    //Utilizando o método mockResolvedValue conseguimos definir que, quando o fetch for executado, o seu retorno será aquele definido em MOCK_RESPONSE.

    render(<App />); // O teste vai renderizar o componente App;
    // O comportamento esperado ao renderizar o App é que ele faça uma requisição à API e renderize a piada retornada. Porém, como criamos um mock, o fetch não fará a requisição à API, mas executará o mock criado;
    const renderedJoke = await screen.findByText('Thanks for explaining the word "many" to me. It means a lot.');
  
    expect(renderedJoke).toBeInTheDocument(); // Já definimos o retorno do mock, portanto a aplicação deverá renderizar a piada que definimos em MOCK_JOKE.
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } });
  });
})

// O objeto MOCK_JOKE recebe um valor similar aos dados retornados pela API;

// O objeto MOCK_RESPONSE recebe um valor similar aos dados retornados pela função fetch. Note que aqui indicamos que esse objeto é do tipo Response. Dessa forma, o TypeScript vai entender que esse objeto possui os mesmos valores que o retorno de uma requisição;

// O vi.spyOn espiona as chamadas da função fetch do objeto global. É por meio deste objeto que conseguimos usar qualquer função do sistema. A partir da versão 18 do node, fetch também está definida em global;

// Utilizando o método mockResolvedValue conseguimos definir que, quando o fetch for executado, o seu retorno será aquele definido em MOCK_RESPONSE.

// O teste vai renderizar o componente App;

// O comportamento esperado ao renderizar o App é que ele faça uma requisição à API e renderize a piada retornada. Porém, como criamos um mock, o fetch não fará a requisição à API, mas executará o mock criado;

// Já definimos o retorno do mock, portanto a aplicação deverá renderizar a piada que definimos em MOCK_JOKE.


//MOCK DO FETCH COM FN:
// describe('Testando fetch', () => {
//   // ...
//   it('fetches a joke', async () => {
//     const joke = {
//       id: '7h3oGtrOfxc',
//       joke: 'Thanks for explaining the word "many" to me. It means a lot.',
//       status: 200,
//     };

//     global.fetch = vi.fn(() => Promise.resolve({
//       json: () => Promise.resolve(joke),
//     } as Response));

//     render(<App />);
//     const renderedJoke = await screen.findByText('Thanks for explaining the word "many" to me. It means a lot.');
//     expect(renderedJoke).toBeInTheDocument();
//     expect(global.fetch).toHaveBeenCalledTimes(1);
//     expect(global.fetch).toHaveBeenCalledWith('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } });
//   });
// });