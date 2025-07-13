const slider = document.getElementById('slider');
const slides = slider.children;
const dotsContainer = document.getElementById('dots');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;
const totalSlides = slides.length;

let autoplayDelay = 4000;
let autoplayTimer;

function scrollToSlide(index) {
  if (slides[index]) {
    const targetSlide = slides[index];
    const slideOffset = targetSlide.offsetLeft - slider.offsetLeft;
    slider.scrollTo({ left: slideOffset - 15, behavior: 'smooth' });

    currentIndex = index;
    updateDots();
  }
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  scrollToSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  scrollToSlide(currentIndex);
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentIndex);
  });
}

// Start/reset autoplay timer
function startAutoplay() {
  clearTimeout(autoplayTimer);
  autoplayTimer = setTimeout(() => {
    nextSlide();
    startAutoplay(); // schedule next
  }, autoplayDelay);
}

// Dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === currentIndex) dot.classList.add('active');
  dot.addEventListener('click', () => {
    scrollToSlide(i);
    startAutoplay(); // reset on click
  });
  dotsContainer.appendChild(dot);
}

// Modal image open
Array.from(slides).forEach(slide => {
  slide.addEventListener('click', () => {
    const img = slide.querySelector('img');
    modalImg.src = img.src;
    modal.style.display = 'flex';
  });
});

// Modal close
function closeModal(e) {
  if (e.target === modal || e.key === 'Escape') {
    modal.style.display = 'none';
  }
}
window.addEventListener('keydown', closeModal);

// Arrow buttons
prevBtn.addEventListener('click', () => {
  prevSlide();
  startAutoplay();
});
nextBtn.addEventListener('click', () => {
  nextSlide();
  startAutoplay();
});

// Start autoplay and scroll to first slide
scrollToSlide(currentIndex);
startAutoplay();
