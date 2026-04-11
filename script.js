// ════════════════════════════════════════════
//  НАВИГАЦИЯ ПОРТФОЛИО (стрелки + точки)
// ════════════════════════════════════════════
const projectsTrack = document.getElementById('projectsTrack');
const projectsDots  = document.getElementById('projectsDots');
const projectsPrev  = document.getElementById('projectsPrev');
const projectsNext  = document.getElementById('projectsNext');

if (projectsTrack) {
  const cards = Array.from(projectsTrack.querySelectorAll('.project-card'));

  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel__dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Проект ' + (i + 1));
    dot.addEventListener('click', () => {
      projectsTrack.scrollTo({ left: cards[i].offsetLeft, behavior: 'smooth' });
    });
    projectsDots.appendChild(dot);
  });

  function updateProjectDots() {
    const scrollLeft = projectsTrack.scrollLeft;
    const cardWidth  = cards[0] ? cards[0].offsetWidth + 24 : 1;
    const active     = Math.round(scrollLeft / cardWidth);
    projectsDots.querySelectorAll('.carousel__dot').forEach((d, i) => {
      d.classList.toggle('active', i === active);
    });
  }

  projectsTrack.addEventListener('scroll', updateProjectDots, { passive: true });

  projectsPrev.addEventListener('click', () => {
    projectsTrack.scrollBy({ left: -(cards[0].offsetWidth + 24), behavior: 'smooth' });
  });
  projectsNext.addEventListener('click', () => {
    projectsTrack.scrollBy({ left: cards[0].offsetWidth + 24, behavior: 'smooth' });
  });
}


// ════════════════════════════════════════════
// КАРУСЕЛЬ «ФРАГМЕНТЫ РЕАЛИЗАЦИИ»
// ════════════════════════════════════════════
const carouselTrack = document.getElementById('carouselTrack');
const carouselDots = document.getElementById('carouselDots');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');

if (carouselTrack) {
  const slides = Array.from(carouselTrack.querySelectorAll('.carousel__slide'));
  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    if (!img) return;

    function setOrientation() {
      if (!img.naturalWidth || !img.naturalHeight) return;

      slide.classList.remove('is-landscape', 'is-portrait', 'is-square');

      const ratio = img.naturalWidth / img.naturalHeight;

      if (ratio > 1.2) {
        slide.classList.add('is-landscape');
      } else if (ratio < 0.9) {
        slide.classList.add('is-portrait');
      } else {
        slide.classList.add('is-square');
      }
    }

    if (img.complete) {
      setOrientation();
    } else {
      img.addEventListener('load', setOrientation, { once: true });
    }
  });

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel__dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
    dot.addEventListener('click', () => scrollToSlide(i));
    carouselDots.appendChild(dot);
  });

  function getSlideLeft(index) {
    const slide = slides[index];
    if (!slide) return 0;

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      const trackStyles = getComputedStyle(carouselTrack);
      const paddingLeft = parseFloat(trackStyles.paddingLeft) || 0;
      const targetLeft = slide.offsetLeft - paddingLeft - (carouselTrack.clientWidth - slide.offsetWidth) / 2;
      return Math.max(0, targetLeft);
    }

    return slide.offsetLeft;
  }

  function scrollToSlide(index) {
    carouselTrack.scrollTo({
      left: getSlideLeft(index),
      behavior: 'smooth'
    });
  }

  function getActiveSlideIndex() {
    const trackCenter = carouselTrack.scrollLeft + carouselTrack.clientWidth / 2;

    let activeIndex = 0;
    let minDistance = Infinity;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(trackCenter - slideCenter);

      if (distance < minDistance) {
        minDistance = distance;
        activeIndex = index;
      }
    });

    return activeIndex;
  }

  function updateDots() {
    const active = getActiveSlideIndex();
    carouselDots.querySelectorAll('.carousel__dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === active);
    });
  }

  function scrollByOne(direction) {
    carouselTrack.scrollBy({ 
      left: direction * carouselTrack.clientWidth * 0.6, 
      behavior: 'smooth' 
    });
  }

  carouselTrack.addEventListener('scroll', updateDots, { passive: true });

  if (carouselPrev) {
    carouselPrev.addEventListener('click', () => scrollByOne(-1));
  }

  if (carouselNext) {
    carouselNext.addEventListener('click', () => scrollByOne(1));
  }

  window.addEventListener('resize', updateDots);
  updateDots();
}


// ════════════════════════════════════════════
//  ДАННЫЕ ПРОЕКТОВ
//  Фото лежат в images/project1/, images/project2/ и т.д.
//  Имена файлов: 1_1.jpg, 1_2.jpg ... для проекта 1,
//                2_1.jpg, 2_2.jpg ... для проекта 2, и т.д.
//  Добавь или убери строки в photos[] если фото больше/меньше.
// ════════════════════════════════════════════
const PROJECTS = [
  {
    project: 'project1',
    desc: 'Проект спальни 22,8 м² в загородном доме для девушки Визуализатор: Бойко Анастасия',
    photos: [
      'images/project1/1_1.jpg',
      'images/project1/1_2.jpg',
      'images/project1/1_3.jpg',
      'images/project1/1_4.jpg',
      'images/project1/1_5.jpg'
    ]
  },
  {
    project: 'project2',
    desc: 'Проект кухни-гостиной 42 м² в двухуровневой квартире для семьи с тремя детьми Визуализатор: Бойко Анастасия',
    photos: [
      'images/project2/2_1.jpg',
      'images/project2/2_2.jpg',
      'images/project2/2_3.jpg',
      'images/project2/2_4.jpg',
      'images/project2/2_5.jpg'
    ]
  },
  {
    project: 'project3',
    desc: 'Проект спальни 22,8 м² в загородном доме для деловой женщины Визуализатор: Бойко Анастасия',
    photos: [
      'images/project3/3_1.jpg',
      'images/project3/3_2.jpg',
      'images/project3/3_3.jpg',
      'images/project3/3_4.jpg'
    ]
  },
  {
    project: 'project4',
    desc: 'Проект спальни 15,5 м² в квартире для молодой пары Визуализатор: Бойко Анастасия',
    photos: [
      'images/project4/4_1.jpg',
      'images/project4/4_2.jpg',
      'images/project4/4_3.jpg',
      'images/project4/4_4.jpg'
    ]
  },
  {
    project: 'project5',
    desc: 'Проект ванной комнаты 4,8 м² в таунхаусе для девочек Визуализатор: Бойко Анастасия',
    photos: [
      'images/project5/5_1.jpg',
      'images/project5/5_2.jpg',
      'images/project5/5_3.jpg',
      'images/project5/5_4.jpg',
      'images/project5/5_5.jpg'
    ]
  },
  {
    project: 'project6',
    desc: 'Проект гостевой комнаты 13,7 м² в таунхаусе Визуализатор: Бойко Анастасия',
    photos: [
      'images/project6/6_1.jpg',
      'images/project6/6_2.jpg',
      'images/project6/6_3.jpg',
      'images/project6/6_4.jpg',
      'images/project6/6_5.jpg',
      'images/project6/6_6.jpg'
    ]
  },
  {
    project: 'project7',
    desc: 'Проект детской комнаты с «сырной» гардеробной 16,7 м² в таунхаусе для маленькой девочки Визуализатор: Бойко Анастасия',
    photos: [
      'images/project7/7_1.jpg',
      'images/project7/7_3.jpg',
      'images/project7/7_5.jpg',
      'images/project7/7_6.jpg',
      'images/project7/7_7.jpg',
      'images/project7/7_8.jpg',
      'images/project7/7_10.jpg',
    ]
  },
  {
    project: 'project8',
    desc: 'Проект детской комнаты с гардеробной 19,1 м² в таунхаусе для девочки в нескольких вариантах Визуализатор: Бойко Анастасия',
    photos: [
      'images/project8/8_1.jpg',
      'images/project8/8_2.jpg',
      'images/project8/8_3.jpg',
      'images/project8/8_4.jpg',
      'images/project8/8_5.jpg',
      'images/project8/8_6.jpg',
    ]
  },
  {
    project: 'project9',
    desc: 'Проект комнаты для подростка 14,3 м² в таунхаусе со своим собственным выходом на улицу Визуализатор: Бойко Анастасия',
    photos: [
      'images/project9/9_1.jpg', 'images/project9/9_2.jpg', 'images/project9/9_3.jpg', 'images/project9/9_4.jpg', 'images/project9/9_5.jpg', 'images/project9/9_6.jpg'
    ]
  },
  {
    project: 'project10',
    desc: 'Проект гостевого санузла 3,8 м² в таунхаусе с выходом в душевую и технические зоны Визуализатор: Бойко Анастасия',
    photos: [
      'images/project10/10_1.jpg', 'images/project10/10_2.jpg', 'images/project10/10_3.jpg'
    ]
  },
  {
    project: 'project11',
    desc: 'Проект мастер-спальни 22,2 м² в таунхаусе, предложены разные цветовые решения Визуализатор: Бойко Анастасия',
    photos: [
      'images/project11/11_1.jpg', 'images/project11/11_2.jpg', 'images/project11/11_3.jpg', 'images/project11/11_4.jpg', 'images/project11/11_5.jpg', 'images/project11/11_6.jpg', 'images/project11/11_7.jpg', 'images/project11/11_8.jpg', 'images/project11/11_9.jpg'
    ]
  },
  {
    project: 'project12',
    desc: 'Проект невероятной гардеробной комнаты, соединяющего спальню и санузел, 11,6 м² Визуализатор: Бойко Анастасия',
    photos: [
      'images/project12/12_1.jpg', 'images/project12/12_2.jpg', 'images/project12/12_3.jpg', 'images/project12/12_4.jpg'
    ]
  },
  {
    project: 'project13',
    desc: 'Проект мастер-санузла 8,6 м² в разных цветовых гаммах Визуализатор: Бойко Анастасия',
    photos: [
      'images/project13/13_1.jpg', 'images/project13/13_2.jpg', 'images/project13/13_3.jpg', 'images/project13/13_4.jpg', 'images/project13/13_5.jpg', 'images/project13/13_6.jpg'
    ]
  },
  {
    project: 'project14',
    desc: 'Проект кухни-гостиной 43,1 м² в таунхаусе для семейной пары с маленькими детьми Визуализатор: Бойко Анастасия',
    photos: [
      'images/project14/14_1.jpg', 'images/project14/14_2.jpg', 'images/project14/14_3.jpg', 'images/project14/14_4.jpg', 'images/project14/14_5.jpg', 'images/project14/14_6.jpg'
    ]
  },
  {
    project: 'project15',
    desc: 'Проект комнаты для мальчика-подростка 12,5 м² в квартире с собственным санузлом 3,6 м² Визуализатор: Бойко Анастасия',
    photos: [
      'images/project15/15_1.jpg', 'images/project15/15_2.jpg', 'images/project15/15_3.jpg', 'images/project15/15_4.jpg', 'images/project15/15_5.jpg', 'images/project15/15_6.jpg', 'images/project15/15_7.jpg', 'images/project15/15_8.jpg'
    ]
  },
  {
    project: 'project16',
    desc: 'Проект ванной комнаты 4,9 м² в квартире с акцентным декором Визуализатор: Бойко Анастасия',
    photos: [
      'images/project16/16_1.jpg', 'images/project16/16_2.jpg', 'images/project16/16_3.jpg', 'images/project16/16_4.jpg', 'images/project16/16_5.jpg'
    ]
  },
  {
    project: 'project17',
    desc: 'Проект прихожей, кухни-столовой и гостиной 4,9 м² в квартире для семьи Визуализатор: Бойко Анастасия',
    photos: [
      'images/project17/17_1.jpg', 'images/project17/17_2.jpg', 'images/project17/17_3.jpg', 'images/project17/17_4.jpg', 'images/project17/17_5.jpg', 'images/project17/17_6.jpg', 'images/project17/17_7.jpg', 'images/project17/17_8.jpg', 'images/project17/17_9.jpg', 'images/project17/17_10.jpg', 'images/project17/17_11.jpg'
    ]
  }
];


// ════════════════════════════════════════════
//  ЛАЙТБОКС
// ════════════════════════════════════════════
const lightbox   = document.getElementById('lightbox');
const lbImg      = document.getElementById('lightboxImg');
const lbClose    = document.getElementById('lightboxClose');
const lbPrev     = document.getElementById('lightboxPrev');
const lbNext     = document.getElementById('lightboxNext');
const lbBackdrop = document.getElementById('lightboxBackdrop');
const lbThumbs   = document.getElementById('lightboxThumbs');

let currentPhotos = [];
let currentIndex  = 0;

function openLightbox(projectId, startIndex) {
  const project = PROJECTS.find(p => p.project === projectId);
  if (!project || !project.photos.length) return;
  currentPhotos = project.photos;
  currentIndex  = startIndex || 0;
  // Показываем описание проекта
  const desc = document.getElementById('lightboxDesc');
  if (desc) {
    const text = project.desc || '';
    desc.innerHTML = text.replace(/ Визуализатор:/, '<br>Визуализатор:');
  }
  renderThumbs();
  showPhoto(currentIndex);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lbImg.src = '';
}

function showPhoto(index) {
  currentIndex = (index + currentPhotos.length) % currentPhotos.length;
  lbImg.src = currentPhotos[currentIndex];
  const thumbs = lbThumbs.querySelectorAll('.lightbox__thumb');
  thumbs.forEach((t, i) => t.classList.toggle('active', i === currentIndex));
  if (thumbs[currentIndex]) {
    thumbs[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

function renderThumbs() {
  lbThumbs.innerHTML = '';
  currentPhotos.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.className = 'lightbox__thumb';
    img.addEventListener('click', (e) => { e.stopPropagation(); showPhoto(i); });
    lbThumbs.appendChild(img);
  });
}

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => openLightbox(card.dataset.project, 0));
});

lbClose.addEventListener('click', closeLightbox);
lbBackdrop.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', (e) => { e.stopPropagation(); showPhoto(currentIndex - 1); });
lbNext.addEventListener('click', (e) => { e.stopPropagation(); showPhoto(currentIndex + 1); });

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'ArrowLeft')  showPhoto(currentIndex - 1);
  if (e.key === 'ArrowRight') showPhoto(currentIndex + 1);
  if (e.key === 'Escape')     closeLightbox();
});

// Drag-скролл мышью
const scroll = document.querySelector('.projects-scroll');
if (scroll) {
  let isDown = false, startX, scrollLeft;
  scroll.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - scroll.offsetLeft; scrollLeft = scroll.scrollLeft; });
  scroll.addEventListener('mouseleave', () => isDown = false);
  scroll.addEventListener('mouseup',    () => isDown = false);
  scroll.addEventListener('mousemove',  e => {
    if (!isDown) return;
    e.preventDefault();
    scroll.scrollLeft = scrollLeft - (e.pageX - scroll.offsetLeft - startX) * 1.5;
  });
}


// ════════════════════════════════════════════
//  ПЛАВНОЕ ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ
// ════════════════════════════════════════════
document.querySelectorAll(
  '.section-header, .project-card, .about__img, .about__stats li, .form__field'
).forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ════════════════════════════════════════════
//  МАСКА ДЛЯ ТЕЛЕФОНА
// ════════════════════════════════════════════
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', function (e) {
    let input = e.target;
    let numbersValue = input.value.replace(/\D/g, '');
    let formattedValue = '';

    if (!numbersValue) {
      input.value = '';
      return;
    }

    // Обработка российских номеров
    if (['7', '8', '9'].includes(numbersValue[0])) {
      if (numbersValue[0] === '9') numbersValue = '7' + numbersValue;
      if (numbersValue[0] === '8') numbersValue = '7' + numbersValue.substring(1);
      
      let firstSymbols = '+7';
      formattedValue = firstSymbols + ' ';

      if (numbersValue.length > 1) {
        formattedValue += '(' + numbersValue.substring(1, 4);
      }
      if (numbersValue.length >= 5) {
        formattedValue += ') ' + numbersValue.substring(4, 7);
      }
      if (numbersValue.length >= 8) {
        formattedValue += '-' + numbersValue.substring(7, 9);
      }
      if (numbersValue.length >= 10) {
        formattedValue += '-' + numbersValue.substring(9, 11);
      }
    } else {
      // Для номеров других стран
      formattedValue = '+' + numbersValue.substring(0, 15);
    }

    input.value = formattedValue;
  });

  phoneInput.addEventListener('keydown', function (e) {
    // Если пользователь стирает и осталась только 7, очистить поле, чтобы плейсхолдер не мешал
    if (e.key === 'Backspace' && e.target.value.replace(/\D/g, '').length === 1) {
      e.target.value = '';
    }
  });

  phoneInput.addEventListener('focus', function () {
    if (!this.value) {
      this.value = '+7 ';
    }
  });

  phoneInput.addEventListener('blur', function () {
    if (this.value === '+7 ') {
      this.value = '';
    }
  });
}


// ════════════════════════════════════════════
//  ФОРМА + ОТПРАВКА В TELEGRAM
// ════════════════════════════════════════════
const TG_TOKEN    = '8779917970:AAFPIYwCVH838oujMZgvWutjLIEMcP_gTG0';
const TG_CHAT_IDS = [
  '180258351',  // Igor (itramb)
  '295375009',
  // Добавь сюда chat_id других получателей:
  // '123456789',
];

async function sendToTelegram(name, phone, contactWay) {
  const way  = contactWay || 'не указан';
  const text =
      `📩 Новая заявка с сайта La Mounine\n\n` +
      `👤 Имя: ${name}\n` +
      `📞 Телефон: ${phone}\n` +
      `💬 Способ связи: ${way}`;

  for (const chatId of TG_CHAT_IDS) {
    await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    });
  }
}

const form    = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
const errorMsg = document.getElementById('formError');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    form.classList.add('form--submitted');
    
    if (!form.checkValidity()) {
      if(errorMsg) errorMsg.classList.add('visible');
      if(success) success.classList.remove('visible');
      return;
    }
    
    if(errorMsg) errorMsg.classList.remove('visible');

    const name       = form.querySelector('[name="name"]').value.trim();
    const phone      = form.querySelector('[name="phone"]').value.trim();
    const wayEl      = form.querySelector('[name="contact_way"]:checked');
    const contactWay = wayEl ? wayEl.value : 'не указан';

    await sendToTelegram(name, phone, contactWay);

    form.reset();
    form.classList.remove('form--submitted');
    if(success) success.classList.add('visible');
    setTimeout(() => { if(success) success.classList.remove('visible'); }, 5000);
  });
}


// ════════════════════════════════════════════
//  НАВ — подсветка активной секции
// ════════════════════════════════════════════
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === '#' + id ? 'var(--accent)' : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach(sec => sectionObserver.observe(sec));

// ════════════════════════════════════════════
//  ABOUT — галерея
// ════════════════════════════════════════════

const aboutGallery = document.getElementById('aboutGallery');
const aboutGalleryDots = document.getElementById('aboutGalleryDots');
const aboutPrev = document.querySelector('.about-gallery__btn--prev');
const aboutNext = document.querySelector('.about-gallery__btn--next');

if (aboutGallery && aboutGalleryDots) {
  const slides = Array.from(aboutGallery.querySelectorAll('.about-gallery__slide'));

  function scrollToAboutSlide(index) {
    const slide = slides[index];
    if (!slide) return;
    aboutGallery.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
  }

  function getAboutActiveIndex() {
    return Math.round(aboutGallery.scrollLeft / aboutGallery.clientWidth);
  }

  function updateAboutDots() {
    const active = getAboutActiveIndex();
    aboutGalleryDots.querySelectorAll('.about-gallery__dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === active);
    });
  }

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'about-gallery__dot' + (i === 0 ? ' active' : '');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Фото ${i + 1}`);
    dot.addEventListener('click', () => scrollToAboutSlide(i));
    aboutGalleryDots.appendChild(dot);
  });

  if (aboutPrev) {
  aboutPrev.addEventListener('click', () => {
      const active = getAboutActiveIndex();
      scrollToAboutSlide(Math.max(0, active - 1));
    });
  }

  if (aboutNext) {
    aboutNext.addEventListener('click', () => {
      const active = getAboutActiveIndex();
      scrollToAboutSlide(Math.min(slides.length - 1, active + 1));
    });
  }

  aboutGallery.addEventListener('scroll', updateAboutDots, { passive: true });
  window.addEventListener('resize', updateAboutDots);
  updateAboutDots();
  
  // Drag-to-scroll для тестирования мышью (перетаскивание)
  let isDown = false, startX, scrollLeft;
  aboutGallery.addEventListener('mousedown', (e) => {
    isDown = true;
    aboutGallery.style.scrollBehavior = 'auto'; // Отключаем smooth snap на время драга
    startX = e.pageX - aboutGallery.offsetLeft;
    scrollLeft = aboutGallery.scrollLeft;
  });
  aboutGallery.addEventListener('mouseleave', () => {
    isDown = false;
    aboutGallery.style.scrollBehavior = 'smooth';
  });
  aboutGallery.addEventListener('mouseup', () => {
    isDown = false;
    aboutGallery.style.scrollBehavior = 'smooth';
  });
  aboutGallery.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - aboutGallery.offsetLeft;
    const walk = (x - startX) * 2; 
    aboutGallery.scrollLeft = scrollLeft - walk;
  });
}

// ════════════════════════════════════════════
//  МОБИЛЬНОЕ МЕНЮ
// ════════════════════════════════════════════
const burger = document.querySelector('.nav__burger');
const mobileNavLinks = document.querySelector('.nav__links');
const navItems = document.querySelectorAll('.nav__links a');

if (burger && mobileNavLinks) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-active');
    mobileNavLinks.classList.toggle('is-open');
    document.body.style.overflow = mobileNavLinks.classList.contains('is-open') ? 'hidden' : '';
  });

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      burger.classList.remove('is-active');
      mobileNavLinks.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // Предотвращение мерцания анимаций при изменении размера окна
  let resizeTimer;
  window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.body.classList.remove('resize-animation-stopper');
    }, 400);

    // Авто-закрытие меню при переходе на десктопный размер
    if (window.innerWidth > 1024) {
      burger.classList.remove('is-active');
      mobileNavLinks.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
}



/* ════════════════════════════════════════════
   PROCESS SLIDER
════════════════════════════════════════════ */
(function   () {
  const processStage = document.getElementById('processStage');
  const processDotsArray = document.querySelectorAll('.process__dot');
  const processPrev = document.getElementById('processPrev');
  const processNext = document.getElementById('processNext');

  if (processStage) {
    const pCards = Array.from(processStage.querySelectorAll('.process__card'));
    if (!pCards.length) return;
    
    function updateProcessDots() {
      const scrollLeft = processStage.scrollLeft;
      const cardWidth  = pCards[0].offsetWidth; 
      const active     = Math.round(scrollLeft / cardWidth);
      processDotsArray.forEach((d, i) => {
        d.classList.toggle('process__dot--active', i === active);
      });
      if(processPrev) processPrev.disabled = active === 0;
      if(processNext) processNext.disabled = active === pCards.length - 1;
    }
    
    processStage.addEventListener('scroll', updateProcessDots, { passive: true });
    window.addEventListener('resize', updateProcessDots);

    processDotsArray.forEach(function (d, i) {
      d.addEventListener('click', function () {
        processStage.scrollTo({ left: pCards[i].offsetLeft, behavior: 'smooth' });
      });
    });

    if(processPrev) {
      processPrev.addEventListener('click', function() {
        processStage.scrollBy({ left: -(pCards[0].offsetWidth), behavior: 'smooth' });
      });
    }
    if(processNext) {
      processNext.addEventListener('click', function() {
        processStage.scrollBy({ left: pCards[0].offsetWidth, behavior: 'smooth' });
      });
    }
    
    // Drag-to-scroll для тестирования мышью
    let isDown = false, startX, scrollLeftVal;
    processStage.addEventListener('mousedown', (e) => {
      isDown = true;
      processStage.style.scrollBehavior = 'auto'; 
      processStage.style.scrollSnapType = 'none'; // Отключаем примагничивание во время перетаскивания
      startX = e.pageX - processStage.offsetLeft;
      scrollLeftVal = processStage.scrollLeft;
    });
    processStage.addEventListener('mouseleave', () => {
      isDown = false;
      processStage.style.scrollBehavior = 'smooth';
      processStage.style.scrollSnapType = 'x mandatory';
    });
    processStage.addEventListener('mouseup', () => {
      isDown = false;
      processStage.style.scrollBehavior = 'smooth';
      processStage.style.scrollSnapType = 'x mandatory';
    });
    processStage.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - processStage.offsetLeft;
      const walk = (x - startX) * 2; 
      processStage.scrollLeft = scrollLeftVal - walk;
    });

    updateProcessDots();
  }
}());

/* ════════════════════════════════════════════
   PRICING DROPDOWNS SYNC
════════════════════════════════════════════ */
(function() {
  const details = document.querySelectorAll('.pricing__details');
  const summaries = document.querySelectorAll('.pricing__details summary');
  
  summaries.forEach(summary => {
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = summary.parentElement;
      const willOpen = !parent.hasAttribute('open');
      
      details.forEach(d => {
        if (willOpen) {
          d.setAttribute('open', '');
        } else {
          d.removeAttribute('open');
        }
      });
    });
  });
}());
