const nomeFilme = document.getElementById('nome-filme');
const capa = document.getElementById('capa');
const descricao = document.getElementById('descricao');
const btn = document.getElementById('btn-gerarFilme');
const loader = document.getElementById('loader');
const errorBox = document.getElementById('error');
const movieCard = document.getElementById('movie-card');
const durationEl = document.getElementById('duration');
const categoryEl = document.getElementById('category');

const API = 'http://192.168.10.217:8081/listarFilmeAleatorio'; // ajuste caso necessário

function showLoader(show = true){
  loader.classList.toggle('hidden', !show);
  movieCard.setAttribute('aria-hidden', String(show));
  errorBox.classList.add('hidden');
}
function showError(message){
  errorBox.textContent = message;
  errorBox.classList.remove('hidden');
  loader.classList.add('hidden');
}

/* ripple visual no botão */
btn.addEventListener('click', (e) => {
  const r = document.createElement('span');
  r.style.position = 'absolute';
  r.style.left = `${e.offsetX}px`;
  r.style.top = `${e.offsetY}px`;
  r.style.width = r.style.height = '10px';
  r.style.background = 'rgba(255,255,255,0.2)';
  r.style.borderRadius = '50%';
  r.style.transform = 'translate(-50%,-50%) scale(0.8)';
  r.style.transition = 'width .5s ease, height .5s ease, opacity .6s ease';
  btn.appendChild(r);
  requestAnimationFrame(()=> {
    r.style.width = r.style.height = '250px';
    r.style.opacity = '0';
  });
  setTimeout(()=> r.remove(), 700);
});

/* Função principal */
async function filmeAleatorio(){
  try {
    showLoader(true);

    const res = await fetch(API, { method: 'GET' });

    if (!res.ok) {
      // tenta ler json se houver
      let msg = `Erro ${res.status}`;
      try {
        const j = await res.json();
        msg = j.error || JSON.stringify(j);
      } catch (e){ /* ignore */ }
      throw new Error(msg);
    }

    const data = await res.json();

    // Preenchendo os elementos
    const nome = data.title || 'Título indisponível';
    const descricaoTxt = data.description || 'Descrição não disponível.';
    const img = data.banner || '';
    const dur = data.duration || '';
    const category = (Array.isArray(data.category) && data.category.join(', ')) || '';

    // animação de atualização: esconder e reaparecer
    movieCard.style.opacity = 0;
    setTimeout(() => {
      nomeFilme.textContent = nome;
      descricao.textContent = descricaoTxt;
      capa.src = img;
      durationEl.textContent = dur;
      categoryEl.textContent = category;
      movieCard.style.opacity = 1;
      movieCard.focus();
    }, 180);

    showLoader(false);
  } catch (err) {
    console.error(err);
    showError('Não foi possível carregar o filme. Verifique o servidor (CORS/online).');
    showLoader(false);
  }
}

/* preload */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => filmeAleatorio(), 320);
});
