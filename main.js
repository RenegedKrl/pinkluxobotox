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
  initScrollReveal();
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
    if (window.scrollY > 15) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', updateHeader, { passive: true });
  window.addEventListener('hashchange', updateHeader, { passive: true });
  updateHeader();
  setTimeout(updateHeader, 50);
  setTimeout(updateHeader, 250);
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

// Accordion Interativo das Regiões Faciais (Uma aba aberta por vez com foto compacta integrada)
function initRegionsAccordion() {
  const accordion = document.getElementById('regionsAccordion');
  if (!accordion) return;

  const items = Array.from(accordion.querySelectorAll('.region-item'));

  function closeAllExcept(targetItem) {
    items.forEach(item => {
      if (item !== targetItem) {
        item.classList.remove('active');
        const btn = item.querySelector('.region-item-header');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  items.forEach(item => {
    const header = item.querySelector('.region-item-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isCurrentlyOpen = item.classList.contains('active');

      // Fecha/recolhe todas as outras abas
      closeAllExcept(item);

      // Alterna o estado da aba clicada
      if (isCurrentlyOpen) {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// Vídeo de Antes e Depois em Movimento com Player Minimalista e Seguro
function initTransformationVideo() {
  const container = document.getElementById('videoContainer') || document.querySelector('.video-player-wrapper');
  const video = document.getElementById('transformationVideo');
  const soundToggle = document.getElementById('videoSoundToggle');

  if (!video) return;

  // Inicia silenciado por padrão para permitir autoplay sem bloqueios do navegador
  video.muted = true;
  video.play().catch(() => {});

  // Alterna Play/Pause com toque no próprio vídeo
  video.addEventListener('click', (e) => {
    e.stopPropagation();
    if (video.paused) {
      video.play().then(() => container?.classList.remove('is-paused')).catch(() => {});
    } else {
      video.pause();
      container?.classList.add('is-paused');
    }
  });

  // Botão sutil e minimalista no cantinho direito inferior para mutar/desmutar
  if (soundToggle) {
    soundToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      if (video.muted) {
        container?.classList.remove('is-unmuted');
        soundToggle.setAttribute('aria-label', 'Desmutar áudio do vídeo');
        soundToggle.setAttribute('title', 'Desmutar áudio');
      } else {
        container?.classList.add('is-unmuted');
        soundToggle.setAttribute('aria-label', 'Mutar áudio do vídeo');
        soundToggle.setAttribute('title', 'Mutar áudio');
        if (video.paused) {
          video.play().then(() => container?.classList.remove('is-paused')).catch(() => {});
        }
      }
    });
  }

  video.addEventListener('play', () => {
    container?.classList.remove('is-paused');
  });

  video.addEventListener('pause', () => {
    container?.classList.add('is-paused');
  });

  // Pausa ao sair de vista para economizar bateria e retoma ao voltar
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

// Animações Suaves de Revelação ao Rolar a Página (Scroll Reveal)
function initScrollReveal() {
  const revealElements = Array.from(document.querySelectorAll('.reveal-on-scroll, .reveal-stagger'));
  if (!revealElements.length) return;

  // Se o navegador não suportar IntersectionObserver ou o usuário preferir menos movimento
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.05
  });

  revealElements.forEach(el => {
    // Revela imediatamente se já estiver visível na janela
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 30) {
      el.classList.add('is-revealed');
    } else {
      observer.observe(el);
    }
  });
}
