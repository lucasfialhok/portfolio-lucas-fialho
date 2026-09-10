// controla o menu ativo e a abertura dos projetos (só um por vez)

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('#site-nav a');
const nowPlaying = document.getElementById('now-playing');

const labels = {
  inicio: '01 · INÍCIO',
  faixas: '02 · FAIXAS',
  especificacoes: '03 · ESPECIFICAÇÕES',
  sobre: '04 · SOBRE',
  contato: '05 · CONTATO'
};

// vai trocando o link ativo e o texto do "visor" conforme rola a página
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('ativo', link.getAttribute('href') === '#' + id);
      });
      if (labels[id]) nowPlaying.textContent = labels[id];
    }
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

sections.forEach(section => observer.observe(section));

// só uma faixa aberta de cada vez — abrir uma fecha as outras
const tracks = document.querySelectorAll('.faixa details');

tracks.forEach(detail => {
  detail.addEventListener('toggle', () => {
    if (detail.open) {
      tracks.forEach(other => {
        if (other !== detail) other.open = false;
      });
    }
  });
});
