const portfolioProjects = {
  manipulation: [
    {
      title: 'Autumn Reverie',
      category: 'Photoshop Manipulation',
      description: 'A dreamlike autumn composition blending architecture, atmospheric haze, and layered story-driven texture.',
      image: 'assets/placeholder-manipulation-1.svg'
    },
    {
      title: 'Cinder Crown',
      category: 'Photoshop Manipulation',
      description: 'An ornate composition built around sculptural form, weathered stone, and cinematic tonal contrast.',
      image: 'assets/placeholder-manipulation-2.svg'
    },
    {
      title: 'Velvet Archive',
      category: 'Editorial Artwork',
      description: 'A highly crafted image treatment exploring archival mood, texture, and surreal visual storytelling.',
      image: 'assets/placeholder-manipulation-3.svg'
    },
    {
      title: 'North Hall',
      category: 'Visual Identity',
      description: 'A broad visual statement with layered detail, dramatic light, and stylised environment direction.',
      image: 'assets/placeholder-manipulation-4.svg'
    }
  ],
  football: [
    {
      title: 'Matchday Poster',
      category: 'Football Artwork',
      description: 'A stadium-led concept using motion, drama, and typography for a premium club campaign reveal.',
      image: 'assets/placeholder-football-1.svg'
    },
    {
      title: 'Starting XI',
      category: 'Player Campaign',
      description: 'Graphic assets for match preparation, team energy, and visual storytelling around key players.',
      image: 'assets/placeholder-football-2.svg'
    },
    {
      title: 'Cup Day',
      category: 'Competition Poster',
      description: 'A bold visual identity for a decisive fixture built on tension, scale, and contrast.',
      image: 'assets/placeholder-football-3.svg'
    },
    {
      title: 'Tunnel Series',
      category: 'Player Announcements',
      description: 'A sequence of framed graphics designed to bring the tunnel atmosphere to life before kick-off.',
      image: 'assets/placeholder-football-1.svg'
    }
  ],
  stadium: [
    {
      title: 'Stadium Campaign',
      category: 'Matchday Graphic',
      description: 'Pitch-side artwork designed to feel ceremonial, dramatic, and built for a live crowd atmosphere.',
      image: 'assets/placeholder-stadium-1.svg'
    },
    {
      title: 'City Derby',
      category: 'Football Identity',
      description: 'A bold campaign concept using atmosphere, perspective, and stadium texture to drive identity.',
      image: 'assets/placeholder-stadium-1.svg'
    },
    {
      title: 'Final Whistle',
      category: 'Campaign Design',
      description: 'A reflection on the emotional arc of a fixture, from the tunnel to the concluding moment under lights.',
      image: 'assets/placeholder-stadium-1.svg'
    }
  ],
  video: [
    {
      title: 'Pulse of the Match',
      category: 'Sports Film',
      description: 'A rhythm-driven highlight edit using cinematic pacing and motion-led storytelling.',
      poster: 'assets/placeholder-video-poster.svg',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
    },
    {
      title: 'Night Shift',
      category: 'Cinematic Edit',
      description: 'A moody short-form piece balancing atmosphere, textural motion, and old-film-inspired transitions.',
      poster: 'assets/placeholder-video-poster.svg',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm'
    },
    {
      title: 'After the Whistle',
      category: 'Motion Story',
      description: 'A narrative edit covering the emotion and ritual that follows a major matchday moment.',
      poster: 'assets/placeholder-video-poster.svg',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
    }
  ]
};

const modal = document.getElementById('project-modal');
const modalMedia = document.getElementById('modal-media');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalDescription = document.getElementById('modal-description');
const modalClose = document.getElementById('modal-close');

function buildLeafField() {
  const field = document.querySelector('.leaf-field');
  if (!field) return;

  const totalLeaves = 18;
  for (let index = 0; index < totalLeaves; index += 1) {
    const leaf = document.createElement('span');
    leaf.className = 'leaf';
    leaf.style.left = `${Math.random() * 100}%`;
    leaf.style.top = `${Math.random() * 15}%`;
    leaf.style.setProperty('--duration', `${Math.random() * 8 + 10}s`);
    leaf.style.setProperty('--delay', `${Math.random() * -12}s`);
    leaf.style.setProperty('--travel-x', `${(Math.random() - 0.5) * 160}px`);
    field.appendChild(leaf);
  }
}

function renderGallery(targetId, items) {
  const target = document.getElementById(targetId);
  if (!target) return;

  target.innerHTML = items
    .map(
      (item, index) => `
        <button class="project-frame" type="button" data-index="${index}" aria-label="View ${item.title}">
          <img src="${item.image}" alt="${item.title}" />
          <span class="project-meta">
            <strong>${item.title}</strong>
            <small>${item.category}</small>
          </span>
        </button>
      `
    )
    .join('');

  target.querySelectorAll('.project-frame').forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.index);
      const item = items[index];
      openModal(item);
    });
  });
}

function renderVideoCards() {
  const target = document.getElementById('video-projects');
  if (!target) return;

  target.innerHTML = portfolioProjects.video
    .map(
      (item) => `
        <article class="video-card">
          <div class="video-shell">
            <video controls preload="metadata" poster="${item.poster}" aria-label="${item.title} preview">
              <source src="${item.video}" type="video/mp4" />
            </video>
          </div>
          <div class="video-meta">
            <h3>${item.title}</h3>
            <p>${item.category}</p>
          </div>
        </article>
      `
    )
    .join('');
}

function openModal(item) {
  if (!modal) return;

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  const isVideoItem = typeof item.video !== 'undefined';

  modalMedia.innerHTML = isVideoItem
    ? `
      <video controls preload="metadata" poster="${item.poster}" aria-label="${item.title} preview">
        <source src="${item.video}" type="video/mp4" />
      </video>
    `
    : `<img src="${item.image}" alt="${item.title}" />`;

  modalTitle.textContent = item.title;
  modalCategory.textContent = item.category;
  modalDescription.textContent = item.description;

  requestAnimationFrame(() => {
    modalClose.focus();
  });
}

function closeModal() {
  if (!modal) return;

  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

function updateSceneMotion() {
  const scenes = Array.from(document.querySelectorAll('.scene'));
  const viewportHeight = window.innerHeight || 1;

  scenes.forEach((scene) => {
    const rect = scene.getBoundingClientRect();
    const progress = Math.min(Math.max((viewportHeight - rect.top) / (viewportHeight + rect.height), 0), 1);
    const driftX = (0.5 - progress) * 90;
    const driftY = (0.5 - progress) * 40;
    const zoom = 1 + progress * 0.18;

    scene.style.setProperty('--camera-x', `${driftX}px`);
    scene.style.setProperty('--camera-y', `${driftY}px`);
    scene.style.setProperty('--camera-scale', zoom.toFixed(3));

    const visual = scene.querySelector('.scene-visual');
    if (visual) {
      visual.style.transform = `translate3d(${driftX * 0.78}px, ${driftY * 0.86}px, 0) scale(${zoom})`;
    }
  });
}

function handleKeyboard() {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

function bindModalEvents() {
  if (!modalClose) return;
  modalClose.addEventListener('click', closeModal);

  const backdrop = document.querySelector('[data-close-modal="true"]');
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }
}

function initPortfolio() {
  buildLeafField();
  renderGallery('manipulation-gallery', portfolioProjects.manipulation);
  renderGallery('football-gallery', portfolioProjects.football);
  renderGallery('stadium-designs', portfolioProjects.stadium);
  renderVideoCards();
  bindModalEvents();
  handleKeyboard();

  updateSceneMotion();
  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateSceneMotion);
  }, { passive: true });
  window.addEventListener('resize', () => window.requestAnimationFrame(updateSceneMotion));
}

document.addEventListener('DOMContentLoaded', initPortfolio);
