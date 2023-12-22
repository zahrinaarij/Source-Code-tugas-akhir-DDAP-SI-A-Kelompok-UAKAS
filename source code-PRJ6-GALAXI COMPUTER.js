let currentIndex = 0;
const totalSlides = document.querySelectorAll('.slide').length;
const slider = document.querySelector('.slider');
const dotsContainer = document.querySelector('.dots');

setInterval(() => {
    nextSlide();
}, 3000);

for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.setAttribute('data-target', i);
    dot.addEventListener('click', navigateToSlide);
    dotsContainer.appendChild(dot);
}

function updateSlider() {
    slider.style.transform = `translateX(${-currentIndex * 100}%)`;

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function navigateToSlide(event) {
    const targetIndex = parseInt(event.target.getAttribute('data-target'));
    currentIndex = targetIndex;
    updateSlider();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
}

window.addEventListener('resize', updateSlider);



class CpPostSlider {
  constructor(options) {
    this.defaultOptions = {
      containerSelector: '.cpPostSlide-slider',
      slideSelector: '.cpPostSlide-slide',
      dotsContainerSelector: '.cpPostSlide-dots',
      autoSlide: true,
      autoSlideInterval: 3000,
    };

    this.options = Object.assign({}, this.defaultOptions, options);

    this.currentSlide = 0;
    this.slider = document.querySelector(this.options.containerSelector);
    this.slides = this.slider.querySelectorAll(this.options.slideSelector);
    this.totalSlides = this.slides.length;
    this.slideWidth = this.slides[0].offsetWidth + 10;
    this.interval;
    this.dotsContainer = document.querySelector(this.options.dotsContainerSelector);

    if (!this.slider || !this.dotsContainer) {
      console.error('Slider or dots container not found. Check your selectors.');
      return;
    }

    this.init();
  }

  init() {
    this.updateSlider();
    this.createDots();
    this.setupEventListeners();
    if (this.options.autoSlide) {
      this.startAutoSlide();
    }
  }

  updateSlider() {
    this.slideWidth = this.slides[0].offsetWidth + 0;
    this.slider.style.transform = `translateX(${-this.currentSlide * this.slideWidth}px)`;
    this.updateDots();
  }

  createDots() {
    this.dotsContainer.innerHTML = '';

    for (let i = 0; i < this.totalSlides; i++) {
      let dot = document.createElement('div');
      dot.classList.add('cpPostSlide-dot');
      if (i === this.currentSlide) {
        dot.classList.add('active');
      }
      dot.onclick = () => this.goToSlide(i);
      this.dotsContainer.appendChild(dot);
    }
  }

  updateDots() {
    const dots = this.dotsContainer.querySelectorAll('.cpPostSlide-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentSlide);
    });
  }

  goToSlide(slideIndex) {
    this.currentSlide = slideIndex;
    this.updateSlider();
  }

  handleSliderClick(event) {
    if (event.target.classList.contains('cpPostSlide-post-card')) {
      this.goToSlide((this.currentSlide + 1) % this.totalSlides);
    }
  }

  nextSlide() {
    this.goToSlide((this.currentSlide + 1) % this.totalSlides);
  }

  prevSlide() {
    this.goToSlide((this.currentSlide - 1 + this.totalSlides) % this.totalSlides);
  }

  startAutoSlide() {
    this.interval = setInterval(() => this.nextSlide(), this.options.autoSlideInterval);
  }

  stopAutoSlide() {
    clearInterval(this.interval);
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.updateSlider());
    this.slider.addEventListener('click', (event) => this.handleSliderClick(event));
  }
}
const cpPostSlider = new CpPostSlider({
  containerSelector: '.cpPostSlide-slider',
  slideSelector: '.cpPostSlide-slide',
  dotsContainerSelector: '.cpPostSlide-dots',
  autoSlide: true,
  autoSlideInterval: 3000,
});

let cncp07CurrentIndex = 0;
let cncp07SlideWidth = document.querySelector('.cncp07-slider-container').clientWidth;
const cncp07TotalSlides = document.querySelectorAll('.cncp07-slide').length;
const cncp07Slider = document.querySelector('.cncp07-slider');

function cncp07UpdateSlider() {
    cncp07Slider.style.transform = `translateX(${-cncp07CurrentIndex * cncp07SlideWidth}px)`;
}

function cncp07NextSlide() {
    cncp07CurrentIndex = (cncp07CurrentIndex + 1) % cncp07TotalSlides;
    cncp07UpdateSlider();
}

function cncp07PrevSlide() {
    cncp07CurrentIndex = (cncp07CurrentIndex - 1 + cncp07TotalSlides) % cncp07TotalSlides;
    cncp07UpdateSlider();
}

window.addEventListener('resize', () => {
    cncp07SlideWidth = document.querySelector('.cncp07-slider-container').clientWidth;
    cncp07UpdateSlider();
});