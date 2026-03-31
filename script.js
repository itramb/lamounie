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
//  КАРУСЕЛЬ «ФРАГМЕНТЫ РЕАЛИЗАЦИИ»
// ════════════════════════════════════════════
const carouselTrack = document.getElementById('carouselTrack');
const carouselDots  = document.getElementById('carouselDots');
const carouselPrev  = document.getElementById('carouselPrev');
const carouselNext  = document.getElementById('carouselNext');

if (carouselTrack) {
  const slides = Array.from(carouselTrack.querySelectorAll('.carousel__slide'));

  // Создаём точки
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel__dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
    dot.addEventListener('click', () => scrollToSlide(i));
    carouselDots.appendChild(dot);
  });

  function scrollToSlide(index) {
    const slide = slides[index];
    if (!slide) return;
    carouselTrack.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
  }

  function updateDots() {
    const scrollLeft = carouselTrack.scrollLeft;
    const slideWidth = slides[0] ? slides[0].offsetWidth + 24 : 1; // 24 = gap
    const active = Math.round(scrollLeft / slideWidth);
    carouselDots.querySelectorAll('.carousel__dot').forEach((d, i) => {
      d.classList.toggle('active', i === active);
    });
  }

  carouselTrack.addEventListener('scroll', updateDots, { passive: true });

  carouselPrev.addEventListener('click', () => {
    carouselTrack.scrollBy({ left: -(slides[0].offsetWidth + 24), behavior: 'smooth' });
  });
  carouselNext.addEventListener('click', () => {
    carouselTrack.scrollBy({ left: slides[0].offsetWidth + 24, behavior: 'smooth' });
  });
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
    desc: 'Проект спальни 22,8 м² в загородном доме для девушки. Визуализатор: Бойко Анастасия',
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
    desc: 'Проект кухни-гостиной 42 м² в двухуровневой квартире для семьи с тремя детьми. Визуализатор: Бойко Анастасия',
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
    desc: 'Проект гостевого санузла 4 м² в двухуровневой квартире. Визуализатор: Бойко Анастасия',
    photos: [
      'images/project3/3_1.jpg',
      'images/project3/3_2.jpg',
      'images/project3/3_3.jpg',
      'images/project3/3_4.jpg'
    ]
  },
  {
    project: 'project4',
    desc: 'Проект спальни 15,5 м² в квартире для молодой пары. Визуализатор: Бойко Анастасия',
    photos: [
      'images/project4/4_1.jpg',
      'images/project4/4_2.jpg',
      'images/project4/4_3.jpg',
      'images/project4/4_4.jpg'
    ]
  },
  {
    project: 'project5',
    desc: 'Проект ванной комнаты 4,8 м² в загородном доме для девочек. Визуализатор: Бойко Анастасия',
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
    desc: 'Проект гостевой комнаты 13,7 м² в загородном доме. Визуализатор: Бойко Анастасия',
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
    desc: 'Проект детской комнаты 16,7 м² в загородном доме для маленькой девочки. Визуализатор: Бойко Анастасия',
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
    desc: 'Проект детской комнаты 19 м² в загородном доме для девочки. Визуализатор: Бойко Анастасия',
    photos: [
      'images/project8/8_1.jpg',
      'images/project8/8_2.jpg',
      'images/project8/8_3.jpg',
      'images/project8/8_4.jpg',
      'images/project8/8_5.jpg',
      'images/project8/8_6.jpg',
    ]
  },
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
  if (desc) desc.textContent = project.desc || '';
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
//  ФОРМА + ОТПРАВКА В TELEGRAM
// ════════════════════════════════════════════
const TG_TOKEN    = '8779917970:AAFPIYwCVH838oujMZgvWutjLIEMcP_gTG0';
const TG_CHAT_IDS = [
  '180258351',  // Igor (itramb)
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
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name       = form.querySelector('[name="name"]').value.trim();
    const phone      = form.querySelector('[name="phone"]').value.trim();
    const wayEl      = form.querySelector('[name="contact_way"]:checked');
    const contactWay = wayEl ? wayEl.value : 'не указан';

    await sendToTelegram(name, phone, contactWay);

    form.reset();
    success.classList.add('visible');
    setTimeout(() => success.classList.remove('visible'), 5000);
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
