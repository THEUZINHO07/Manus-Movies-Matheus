
global.fetch = jest.fn();


async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('API Error');
  }
  return response.json();
}

describe('Testes da API do TMDB', () => {

  beforeEach(() => {
    fetch.mockClear();
  });

  it('Deve retornar dados de filmes em caso de sucesso', async () => {

    const mockData = {
      results: [{ title: 'Inception', media_type: 'movie', poster_path: '/poster.jpg' }]
    };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await fetchData('https://fake-url.com');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(data.results[0].title).toBe('Inception');
  });

  it('Deve disparar um erro se a resposta não for OK (ex: 404)', async () => {

    fetch.mockResolvedValueOnce({
      ok: false,
    });

 
    await expect(fetchData('https://fake-url.com')).rejects.toThrow('API Error');
  });
});