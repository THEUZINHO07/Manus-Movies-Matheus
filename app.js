const API_KEY = 'e78985681ded43f58dd592cee3266bf7'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const searchForm = document.getElementById('searchForm'); 
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');


searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const query = searchInput.value.trim();
  if (query) fetchMovies(query) ;
  console.log(query);
});

async function fetchMovies(query) {
  hideError();
  resultsDiv.innerHTML = '';
  loadingDiv.classList.remove('hidden');

  try {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`);
    if (!response.ok) throw new Error('Falha na comunicação.');
    
    const data = await response.json();
    if (data.results.length === 0) {
      showError('Nenhum resultado encontrado.');
      return;
    }
    
    renderResults(data.results);
  } catch (error) {
    showError('Ops! Tivemos um problema ao conectar.');
  } finally {
    loadingDiv.classList.add('hidden');
  }
}


function renderResults(items) {

  const fragment = document.createDocumentFragment(); 

  items.forEach(item => {
    if ((item.media_type !== 'movie' && item.media_type !== 'tv') || !item.poster_path) return;

    const title = item.title || item.name;
    const card = document.createElement('div');
    card.classList.add('movie-card');
    

    card.innerHTML = `
      <img src="${IMAGE_URL}${item.poster_path}" alt="${title}" loading="lazy">
      <h3>${title}</h3>
    `;
    
    fragment.appendChild(card); 
  });


  resultsDiv.appendChild(fragment); 
}

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
}

function hideError() {
  errorDiv.classList.add('hidden');
}