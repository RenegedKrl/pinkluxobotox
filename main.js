// Pink Luxo — Harmonização Facial | Lógica de Interatividade & UX Premium

const resultsData = [
  {
    title: 'Caso Clínico 01 — Harmonização Global & Sustentação',
    desc: 'Atenuação notável de sulcos e linhas de expressão com suporte malar e rejuvenescimento harmônico da face.'
  },
  {
    title: 'Caso Clínico 02 — Terço Superior & Periocular',
    desc: 'Suavização equilibrada das rugas na testa e contorno dos olhos, mantendo a vivacidade e o brilho espontâneo do olhar.'
  },
  {
    title: 'Caso Clínico 03 — Glabela & Músculos Corrugadores',
    desc: 'Alívio perceptível da tensão entre as sobrancelhas (marcas de bravo), devolvendo serenidade e descanso ao rosto.'
  },
  {
    title: 'Caso Clínico 04 — Evolução e Acompanhamento Clínico',
    desc: 'Acompanhamento fotográfico de sustentação tecidual e uniformização da textura da pele com protocolo sob medida.'
  },
  {
    title: 'Caso Clínico 05 — Suavização Notável em Sessão Única',
    desc: 'Atenuação expressiva de linhas dinâmicas profundas preservando integralmente a mímica facial da paciente.'
  },
  {
    title: 'Caso Clínico 06 — Área dos Olhos & Têmporas',
    desc: 'Atenuação das marcas perioculares ao sorrir com contorno leve, sem sensação de rigidez.'
  },
  {
    title: 'Caso Clínico 07 — Linhas Frontais & Testa',
    desc: 'Relaxamento muscular preciso das linhas horizontais proporcionando um visual descansado e rejuvenescido.'
  },
  {
    title: 'Caso Clínico 08 — Rejuvenescimento e Textura Cutânea',
    desc: 'Harmonização global com melhora evidente da qualidade da pele e alinhamento dos traços faciais.'
  }
];

let currentLightboxIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initScrollSpy();
  initSmoothScroll();
  initResultsCarousel();
  initLightbox();
  initFaqAccordion();
  initRegionsAccordion();
  initTransformationVideo();
  initMediaProtection();
});

// Header Scroll — Fundo translúcido no topo e sólido elegante com sombra suave ao rolar
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function updateHeader() {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

// Menu Mobile
function initMobileMenu() {
  const header = document.querySelector('.site-header');
  const menuToggle = document.getElementById('menuToggle');
  const navMobile = document.getElementById('navMobile');
  const menuIcon = document.getElementById('menuIcon');

  if (!menuToggle || !navMobile) return;

  function closeMenu() {
    navMobile.classList.remove('open');
    header?.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
  }

  function openMenu() {
    navMobile.classList.add('open');
    header?.classList.add('menu-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
  }

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (navMobile.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  const mobileLinks = navMobile.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (navMobile.classList.contains('open') && !navMobile.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Fechar com tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMobile.classList.contains('open')) {
      closeMenu();
    }
  });
}

// Navegação Suave com Offset para Header Fixo
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#' || targetId === '#top') {
        if (targetId === '#top') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 75;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ScrollSpy — Destaque do link ativo no menu
function initScrollSpy() {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const desktopLinks = Array.from(document.querySelectorAll('.nav-desktop .nav-link'));

  if (sections.length === 0 || desktopLinks.length === 0) return;

  function onScroll() {
    const scrollPos = window.scrollY + 120;

    let currentSectionId = '';
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section.offsetTop <= scrollPos) {
        currentSectionId = section.getAttribute('id');
        break;
      }
    }

    desktopLinks.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('active', href === currentSectionId);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Carrossel de Casos Clínicos (Swipe / Drag / Dots)
function initResultsCarousel() {
  const track = document.getElementById('resultsTrack');
  const dots = Array.from(document.querySelectorAll('.result-dot'));
  const cards = Array.from(document.querySelectorAll('.result-slide-card'));

  if (!track || cards.length === 0) return;

  function updateActiveDot() {
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const dist = Math.abs(trackCenter - cardCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === closestIdx);
    });
  }

  let isTicking = false;
  track.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        updateActiveDot();
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      if (cards[idx]) {
        cards[idx].scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    });
  });

  // Arraste com o mouse no desktop
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('is-dragging');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove('is-dragging');
  });

  track.addEventListener('mouseleave', () => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove('is-dragging');
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
  });

  updateActiveDot();
}

// Lightbox Modal para Inspeção de Resultados
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImage');
  const modalTitle = document.getElementById('lightboxTitle');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const resultCards = Array.from(document.querySelectorAll('.result-slide-card'));

  if (!modal || !modalImg) return;

  function updateLightbox(index) {
    currentLightboxIndex = (index + resultCards.length) % resultCards.length;
    const card = resultCards[currentLightboxIndex];
    const cardImg = card?.querySelector('img');
    const data = resultsData[currentLightboxIndex] || {};

    if (cardImg) {
      modalImg.src = cardImg.src;
      modalImg.alt = cardImg.alt || data.title || 'Resultado Clínico Harmonização Facial';
    }
    if (modalTitle) {
      modalTitle.textContent = `${data.title || ''} — ${data.desc || ''}`;
    }
  }

  function openLightbox(index) {
    updateLightbox(index);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  resultCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      openLightbox(idx);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  closeBtn?.addEventListener('click', closeLightbox);

  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateLightbox(currentLightboxIndex - 1);
  });

  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateLightbox(currentLightboxIndex + 1);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-image-wrapper')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLightbox(currentLightboxIndex - 1);
    if (e.key === 'ArrowRight') updateLightbox(currentLightboxIndex + 1);
  });
}

// Accordion de FAQ
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Fecha os demais para manter leitura limpa
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('open')) {
          other.classList.remove('open');
          const otherTrigger = other.querySelector('.faq-trigger');
          const otherContent = other.querySelector('.faq-content');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Alterna o atual
      if (isOpen) {
        item.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = `${content.scrollHeight + 32}px`;
      }
    });
  });
}

// Accordion Interativo das Regiões Faciais com Sincronização Dinâmica da Fotografia Clínica
function initRegionsAccordion() {
  const accordion = document.getElementById('regionsAccordion');
  const dynamicImg = document.getElementById('regionsDynamicImg');
  const badgeText = document.getElementById('regionsBadgeText');
  if (!accordion || !dynamicImg) return;

  const items = Array.from(accordion.querySelectorAll('.region-item'));

  const regionNames = {
    '1': 'Foco: Testa, Glabela & Olhos',
    '2': 'Foco: Maçãs & Bigode Chinês',
    '3': 'Foco: Mandíbula & Contorno',
    '4': 'Foco: Lábios & Região da Boca'
  };

  function activateRegion(regionId, shouldOpen = true) {
    items.forEach(item => {
      const isTarget = item.getAttribute('data-region') === String(regionId);
      const btn = item.querySelector('.region-item-header');
      if (isTarget) {
        if (shouldOpen) {
          item.classList.add('active');
          if (btn) btn.setAttribute('aria-expanded', 'true');
        }
      } else {
        item.classList.remove('active');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });

    dynamicImg.className = `regions-visual-img focus-region-${regionId}`;
    if (badgeText && regionNames[regionId]) {
      badgeText.textContent = regionNames[regionId];
    }
  }

  // Interação ao clicar na abinha
  items.forEach(item => {
    const header = item.querySelector('.region-item-header');
    const regionId = item.getAttribute('data-region');

    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        if (isOpen) {
          item.classList.remove('active');
          header.setAttribute('aria-expanded', 'false');
        } else {
          activateRegion(regionId, true);
        }
      });
    }

    // No desktop, hover leve atualiza o foco dinamicamente
    item.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 1024) {
        activateRegion(regionId, true);
      }
    });
  });

  // No mobile, enquanto rola a página, abre abinha por abinha e atualiza o foco
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (window.innerWidth >= 1024) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const regionId = entry.target.getAttribute('data-region');
          if (regionId) {
            activateRegion(regionId, true);
          }
        }
      });
    }, {
      rootMargin: '-25% 0px -45% 0px',
      threshold: 0.1
    });

    items.forEach(item => observer.observe(item));
  }
}

// Vídeo de Antes e Depois em Movimento com Player Seguro sem Opção de Download
function initTransformationVideo() {
  const container = document.getElementById('videoContainer') || document.querySelector('.video-player-wrapper');
  const video = document.getElementById('transformationVideo');
  const playToggle = document.getElementById('videoPlayToggle');
  const playBadge = document.getElementById('videoPlayBadge');
  const soundToggle = document.getElementById('videoSoundToggle');
  const soundText = document.getElementById('soundBtnText');
  const progressBar = document.getElementById('videoProgressBar');

  if (!video) return;

  // Inicia silenciado por padrão para permitir autoplay sem bloqueios do navegador
  video.muted = true;
  video.play().catch(() => {});

  // Função para alternar reprodução / pausa
  function togglePlayback() {
    if (video.paused) {
      video.play().then(() => {
        container?.classList.remove('is-paused');
        if (playBadge) {
          playBadge.classList.add('pulse');
          setTimeout(() => playBadge.classList.remove('pulse'), 500);
        }
      }).catch(() => {});
    } else {
      video.pause();
      container?.classList.add('is-paused');
    }
  }

  // Toque / clique em qualquer ponto do vídeo alterna Play / Pause
  if (playToggle) {
    playToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlayback();
    });
  }

  // Toque direto no elemento de vídeo
  video.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePlayback();
  });

  // Controle de Som Customizado (Mudo / Ativo)
  if (soundToggle) {
    soundToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      if (video.muted) {
        container?.classList.remove('is-unmuted');
        if (soundText) soundText.textContent = 'Ativar som';
        soundToggle.setAttribute('aria-label', 'Ativar som do vídeo');
        soundToggle.setAttribute('title', 'Ativar som');
      } else {
        container?.classList.add('is-unmuted');
        if (soundText) soundText.textContent = 'Silenciar';
        soundToggle.setAttribute('aria-label', 'Silenciar vídeo');
        soundToggle.setAttribute('title', 'Silenciar vídeo');
        if (video.paused) {
          video.play().then(() => container?.classList.remove('is-paused')).catch(() => {});
        }
      }
    });
  }

  // Atualiza barra de progresso customizada
  video.addEventListener('timeupdate', () => {
    if (progressBar && video.duration) {
      const percentage = (video.currentTime / video.duration) * 100;
      progressBar.style.width = `${percentage}%`;
    }
  });

  // Sincroniza estado de classes
  video.addEventListener('play', () => {
    container?.classList.remove('is-paused');
  });

  video.addEventListener('pause', () => {
    container?.classList.add('is-paused');
  });

  // Otimização: pausa o vídeo quando sai da tela e retoma quando visível
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          if (!video.paused) {
            video.pause();
            video.dataset.pausedByScroll = 'true';
          }
        } else {
          if (video.paused && video.dataset.pausedByScroll === 'true') {
            video.play().catch(() => {});
            delete video.dataset.pausedByScroll;
          }
        }
      });
    }, { threshold: 0.25 });
    videoObserver.observe(video);
  }
}

// Sistema de Proteção Anti-Download para Imagens e Vídeos
function initMediaProtection() {
  // 1. Bloqueia menu de contexto com botão direito em qualquer mídia ou área de apresentação
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }
    e.preventDefault();
    return false;
  }, { passive: false });

  // 2. Bloqueia arrastar imagens, vídeos ou cartões para fora
  document.addEventListener('dragstart', (e) => {
    const target = e.target;
    if (
      target.tagName === 'IMG' ||
      target.tagName === 'VIDEO' ||
      target.tagName === 'PICTURE' ||
      target.closest('img, video, picture, .video-player-wrapper, .result-slide-card, .lightbox-image')
    ) {
      e.preventDefault();
      return false;
    }
  }, { passive: false });

  // 3. Bloqueia atalhos de salvar página/mídia (Ctrl+S, Cmd+S, Ctrl+U, Cmd+U)
  window.addEventListener('keydown', (e) => {
    const isCtrlOrCmd = e.ctrlKey || e.metaKey;
    const key = (e.key || '').toLowerCase();
    if (isCtrlOrCmd && (key === 's' || key === 'u')) {
      e.preventDefault();
      return false;
    }
  });
}
