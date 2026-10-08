// Pink Luxo Harmonização Facial - Interactivity & Logic

const resultsData = [
  {
    title: 'Caso Clínico 01 — Terço Superior & Linhas Perioculares',
    desc: 'Redução equilibrada das rugas na testa e contorno dos olhos mantendo a vivacidade e brilho do olhar.'
  },
  {
    title: 'Caso Clínico 02 — Glabela & Músculos Corrugadores',
    desc: 'Eliminação da tensão entre as sobrancelhas (linhas de bravo), devolvendo serenidade e descanso ao rosto.'
  },
  {
    title: 'Caso Clínico 03 — Pés de Galinha & Rugas Perioculares',
    desc: 'Suavização profunda das marcas de expressão no canto dos olhos e maçãs do rosto com sorriso leve e natural.'
  },
  {
    title: 'Caso Clínico 04 — Rejuvenescimento Facial Global',
    desc: 'Harmonização do terço superior e médio, atenuando linhas e devolvendo o viço e jovialidade da pele.'
  },
  {
    title: 'Caso Clínico 05 — Área dos Olhos & Têmporas',
    desc: 'Eliminação dos vincos dinâmicos laterais com contorno descansado e iluminado.'
  },
  {
    title: 'Caso Clínico 06 — Linhas Frontais & Testa (Masculino)',
    desc: 'Suavização natural das rugas dinâmicas da testa sem alterar a expressividade ou causar congelamento facial.'
  },
  {
    title: 'Caso Clínico 07 — Linhas de Expressão na Fronte',
    desc: 'Relaxamento muscular preciso das linhas horizontais proporcionando um visual mais jovem e sereno.'
  }
];

let currentLightboxIndex = 0;
let currentLeadOrigin = 'cta_geral';

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initResultsCarousel();
  initLightbox();
  initFaqAccordion();
  initWhatsappBadge();
  initLeadModal();
});

// Horizontal Results Carousel (Swipe / Drag - Imagem 1)
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

  // Smooth scroll sync with dots
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

  // Click on indicator dots
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

  // Desktop mouse drag to swipe
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

  // Initial call
  updateActiveDot();
}

// Mobile Navigation Menu
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMobile = document.getElementById('navMobile');
  const menuIcon = document.getElementById('menuIcon');

  if (!menuToggle || !navMobile) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuIcon.innerHTML = isOpen
      ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />'
      : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
  });

  const mobileLinks = navMobile.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
    });
  });
}

// Lightbox Modal for Before/After
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImage');
  const modalTitle = document.getElementById('lightboxTitle');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const resultCards = Array.from(document.querySelectorAll('.result-slide-card, .result-card'));

  if (!modal || !modalImg) return;

  function updateLightbox(index) {
    currentLightboxIndex = (index + resultCards.length) % resultCards.length;
    const card = resultCards[currentLightboxIndex];
    const cardImg = card?.querySelector('img');
    const data = resultsData[currentLightboxIndex] || {};

    if (cardImg) {
      modalImg.src = cardImg.src;
      modalImg.alt = cardImg.alt || data.title || 'Resultado Harmonização Facial';
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

// FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('open')) {
          other.classList.remove('open');
          const otherTrigger = other.querySelector('.faq-trigger');
          const otherContent = other.querySelector('.faq-content');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Toggle current item
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

// Floating WhatsApp Tooltip Delay
function initWhatsappBadge() {
  const tooltip = document.getElementById('wppTooltip');
  if (!tooltip) return;

  setTimeout(() => {
    tooltip.style.display = 'block';
  }, 3000);

  // If user clicks the tooltip, open the lead modal
  tooltip.addEventListener('click', (e) => {
    e.preventDefault();
    openLeadModal('floating_tooltip');
  });
}

// Lead Capture Pop-up Modal Interactivity
function initLeadModal() {
  const leadModal = document.getElementById('leadModal');
  const backdrop = document.getElementById('leadModalBackdrop');
  const closeBtn = document.getElementById('closeLeadModal');
  const leadForm = document.getElementById('leadForm');
  const leadName = document.getElementById('leadName');
  const leadPhone = document.getElementById('leadPhone');
  const leadError = document.getElementById('leadError');

  if (!leadModal || !leadForm) return;

  // Mask Phone Input: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
  leadPhone?.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);

    if (val.length <= 2) {
      e.target.value = val ? `(${val}` : '';
    } else if (val.length <= 6) {
      e.target.value = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    } else if (val.length <= 10) {
      e.target.value = `(${val.slice(0, 2)}) ${val.slice(2, 6)}-${val.slice(6)}`;
    } else {
      e.target.value = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7, 11)}`;
    }
  });

  // Attach click to all WhatsApp CTA triggers
  const ctaLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"], .btn-luxury, .btn-result-cta, .btn-wpp-flutuante, [data-open-modal="lead"]');
  ctaLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const origin = link.getAttribute('data-section') || 'whatsapp_cta';
      openLeadModal(origin);
    });
  });

  // Event delegation fallback to ensure any result CTA always opens the modal
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.btn-result-cta, [data-open-modal="lead"]');
    if (trigger) {
      e.preventDefault();
      const origin = trigger.getAttribute('data-section') || 'before_after';
      openLeadModal(origin);
    }
  });

  // Close handlers
  closeBtn?.addEventListener('click', closeLeadModal);
  backdrop?.addEventListener('click', closeLeadModal);

  document.addEventListener('keydown', (e) => {
    if (leadModal.classList.contains('active') && e.key === 'Escape') {
      closeLeadModal();
    }
  });

  // Form Submit Handler
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = leadName.value.trim();
    const phone = leadPhone.value.trim();
    const phoneDigits = phone.replace(/\D/g, '');

    // Validation
    if (name.length < 3) {
      showError('Por favor, informe seu nome completo.');
      leadName.focus();
      return;
    }

    if (phoneDigits.length < 10) {
      showError('Por favor, informe um WhatsApp válido com DDD (ex: 11 99999-9999).');
      leadPhone.focus();
      return;
    }

    hideError();

    // Visual confirmation on button
    const submitBtn = leadForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Enviando...
      `;
    }

    // Build personalized WhatsApp URL using direct api.whatsapp.com to skip wa.me redirect delay
    const customMessage = `Olá, vim do site de harmonização facial da Pink Luxo. Gostaria de agendar uma avaliação e saber mais sobre o procedimento`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5511951047970&text=${encodeURIComponent(customMessage)}`;

    // 1. Salvar Lead com segurança no navegador (localStorage)
    try {
      const storedLeads = JSON.parse(localStorage.getItem('pink_luxo_leads') || '[]');
      storedLeads.push({
        nome: name,
        telefone: phone,
        origem: currentLeadOrigin || 'cta',
        dataHora: new Date().toLocaleString('pt-BR'),
        timestamp: Date.now()
      });
      localStorage.setItem('pink_luxo_leads', JSON.stringify(storedLeads));
    } catch (err) {
      console.warn('Armazenamento local do lead:', err);
    }

    // 2. Disparar métricas/GTM em segundo plano (sem travar a navegação)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'LeadWhatsAppFinalizado',
      lead_name: name,
      lead_phone: phone,
      section_origin: currentLeadOrigin,
      dataHora: new Date().toISOString()
    });

    // Disparar conversão Google Ads assíncrona
    if (typeof window.gtag_report_conversion === 'function') {
      try {
        window.gtag_report_conversion();
      } catch (e) {
        console.warn('gtag conversion notice:', e);
      }
    }

    // 3. Redirecionamento INSTANTÂNEO para o WhatsApp
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // No celular, abre diretamente o aplicativo do WhatsApp
      window.location.href = whatsappUrl;
    } else {
      // No computador, abre a conversa no WhatsApp Web em nova aba mantendo a LP aberta
      const win = window.open(whatsappUrl, '_blank');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }
    }

    // Fecha o modal e restaura o botão caso o usuário retorne à página
    setTimeout(() => {
      closeLeadModal();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.52 3.48A11.86 11.86 0 0 0 12.02 0C5.4 0 .04 5.36.04 11.98a11.9 11.9 0 0 0 1.6 5.98L0 24l6.2-1.62a11.98 11.98 0 0 0 5.82 1.48h.01c6.62 0 11.98-5.36 11.98-11.98a11.9 11.9 0 0 0-3.49-8.4ZM12.03 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.22-3.68.96.98-3.58-.24-.37a9.86 9.86 0 0 1-1.5-5.23c0-5.46 4.44-9.9 9.9-9.9 2.65 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 7c0 5.46-4.44 9.9-9.95 9.9Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.48 1.69.62.71.22 1.35.19 1.86.12.57-.08 1.76-.72 2-1.42.24-.7.24-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z"/>
          </svg>
          Ir para o WhatsApp
        `;
      }
    }, 1200);
  });

  function showError(msg) {
    if (!leadError) return;
    leadError.textContent = msg;
    leadError.style.display = 'block';
  }

  function hideError() {
    if (!leadError) return;
    leadError.textContent = '';
    leadError.style.display = 'none';
  }
}

function openLeadModal(origin) {
  const leadModal = document.getElementById('leadModal');
  const leadName = document.getElementById('leadName');
  if (!leadModal) return;

  currentLeadOrigin = origin || 'cta';
  leadModal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Push event for lead modal opening
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'OpenLeadModal',
    section: currentLeadOrigin
  });

  setTimeout(() => {
    leadName?.focus();
  }, 100);
}

function closeLeadModal() {
  const leadModal = document.getElementById('leadModal');
  if (!leadModal) return;

  leadModal.classList.remove('active');
  document.body.style.overflow = '';
}

// Utilitário para consultar os leads salvos localmente pelo console do navegador
window.verLeadsPinkLuxo = function() {
  try {
    const leads = JSON.parse(localStorage.getItem('pink_luxo_leads') || '[]');
    console.log(`📋 Total de leads cadastrados: ${leads.length}`);
    console.table(leads);
    return leads;
  } catch (e) {
    console.error('Erro ao ler leads:', e);
    return [];
  }
};

