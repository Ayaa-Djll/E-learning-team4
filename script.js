document.addEventListener('DOMContentLoaded', () => {
  // ---------- NAVBAR ----------
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  const buttons = document.querySelector('.buttons');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('active');
      buttons.classList.toggle('active');
    });
  }

  // ---------- SLIDER ----------
  const slidesRow = document.querySelector('.slides');
  const cards = Array.from(document.querySelectorAll('.lesson-card'));
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const dotsContainer = document.querySelector('.dots');

  let currentIndex = 0;
  let cardsPerView = getCardsPerView();
  let total = cards.length;

  function createDots() {
    dotsContainer.innerHTML = '';
    const pages = Math.max(1, total - cardsPerView + 1);
    for (let i = 0; i < pages; i++) {
      const btn = document.createElement('button');
      btn.dataset.index = i;
      if (i === 0) btn.classList.add('active');
      btn.addEventListener('click', () => {
        currentIndex = i;
        updateSlider();
      });
      dotsContainer.appendChild(btn);
    }
  }

  function getGapPx() {
    const cs = getComputedStyle(slidesRow);
    const gap = cs.gap || cs.columnGap || '20px';
    return parseInt(gap) || 20;
  }

  function getCardsPerView() {
    const w = window.innerWidth;
    if (w < 600) return 1;
    if (w < 900) return 2;
    return 3;
  }

  function updateSlider() {
    cardsPerView = getCardsPerView();
    const gap = getGapPx();
    const cardWidth = cards[0].offsetWidth;
    const moveX = (cardWidth + gap) * currentIndex;
    slidesRow.style.transform = `translateX(-${moveX}px)`;
    updateButtons();
    updateDots();
  }

  function updateButtons() {
    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= (total - cardsPerView);
    prevBtn.style.opacity = prevBtn.disabled ? '0.45' : '1';
    nextBtn.style.opacity = nextBtn.disabled ? '0.45' : '1';
  }

  function updateDots() {
    const dots = Array.from(dotsContainer.children);
    dots.forEach(d => d.classList.remove('active'));
    const idx = Math.min(currentIndex, Math.max(0, dots.length - 1));
    if (dots[idx]) dots[idx].classList.add('active');
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < total - cardsPerView) {
      currentIndex++;
      updateSlider();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  window.addEventListener('resize', () => {
    cardsPerView = getCardsPerView();
    if (currentIndex > total - cardsPerView) {
      currentIndex = Math.max(0, total - cardsPerView);
    }
    createDots();
    updateSlider();
  });

  createDots();
  updateSlider();
});
