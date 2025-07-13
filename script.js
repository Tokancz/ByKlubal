const slider = document.getElementById('slider');
const slides = slider.children;
const dotsContainer = document.getElementById('dots');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');

let currentIndex = 0;
const totalSlides = slides.length;

function updateSlider() {
slider.style.transform = `translateX(-${currentIndex * 100}%)`;
document.querySelectorAll('.dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentIndex);
});
}

function nextSlide() {
currentIndex = (currentIndex + 1) % totalSlides;
updateSlider();
}

function prevSlide() {
currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
updateSlider();
}

// Create dots
for (let i = 0; i < totalSlides; i++) {
const dot = document.createElement('span');
dot.classList.add('dot');
if (i === currentIndex) dot.classList.add('active');
dot.addEventListener('click', () => {
    currentIndex = i;
    updateSlider();
});
dotsContainer.appendChild(dot);
}

// Modal logic
Array.from(slides).forEach(slide => {
slide.addEventListener('click', () => {
    const img = slide.querySelector('img');
    modalImg.src = img.src;
    modal.style.display = 'flex';
});
});

function closeModal(e) {
if (e.target === modal || e.key === 'Escape') {
    modal.style.display = 'none';
}
}

window.addEventListener('keydown', (e) => {
if (e.key === 'Escape') {
    closeModal(e);
}
});

updateSlider();