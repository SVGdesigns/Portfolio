/**
 * Senn van Gulik — Portfolio Script
 * "giving a new direction to what already exists"
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initBackToTop();
  initWordInteractions();
  initCursorArrow();

  if (document.getElementById('projectDetailContainer')) {
    initProjectDetail();
    window.addEventListener('hashchange', initProjectDetail);
  }

  if (document.getElementById('contactForm')) {
    initContactForm();
  }
});

/**
 * Unexpected directional interaction on hero words
 */
function initWordInteractions() {
  const words = document.querySelectorAll('.interactive-word');
  const randomAngles = [-6, 6, -10, 8, -4, 5, 180];

  words.forEach(word => {
    word.addEventListener('mouseenter', () => {
      // Pick an unexpected directional shift
      const randomAngle = randomAngles[Math.floor(Math.random() * randomAngles.length)];
      if (randomAngle === 180) {
        word.style.transform = `scale(-1, 1)`;
      } else {
        word.style.transform = `rotate(${randomAngle}deg) translateY(-6px)`;
      }
    });

    word.addEventListener('mouseleave', () => {
      word.style.transform = '';
    });
  });
}

/**
 * Mobile Navigation & Header Scroll
 */
function initNavigation() {
  const toggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-item');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
}

/**
 * Smooth Back to Top
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * Single Project Detail Page Rendering
 */
function initProjectDetail() {
  const container = document.getElementById('projectDetailContainer');

  if (!container || !window.PORTFOLIO_PROJECTS) {
    return;
  }

  // Haal het project-ID uit de HTML
  const projectId = document.body.dataset.projectId;

  // Zoek het juiste project
  const project = getProjectById(projectId);

  // Project bestaat niet
  if (!project) {
    container.innerHTML = `
      <div style="padding: 4rem 0;">
        <h1>Project niet gevonden</h1>
        <p>Er kon geen project worden gevonden met ID: <strong>${projectId}</strong></p>

        <br>

        <a href="index.html#werk" class="btn-arrow-shape btn-arrow-orange">
          ← Terug naar werk
        </a>
      </div>
    `;

    return;
  }

  // Pagina titel aanpassen
  document.title = `${project.title} — Senn van Gulik`;

  // Terug naar boven
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  container.innerHTML = `

    <!-- Back to Overview -->
    <a href="index.html#werk" class="back-to-home-link">
      <span>←</span> Terug naar werk
    </a>


    <!-- Detail Header -->
    <header style="margin-bottom: 2.5rem;">

      <span class="project-section-tag">
        ${project.category}
      </span>

      <h1 
        class="project-display-title" 
        style="font-size: clamp(2.4rem, 5vw, 4.2rem); margin-bottom: 1rem;"
      >
        ${project.title}
      </h1>

      <p 
        style="
          font-size: clamp(1.15rem, 2vw, 1.45rem);
          line-height: 1.5;
          color: var(--color-dark);
          max-width: 800px;
          margin-bottom: 2.5rem;
        "
      >
        ${project.tagline}
      </p>


      <!-- Specs Matrix -->
      <div class="detail-specs-grid">

        <div class="detail-spec-cell">
          <span class="label">Jaar</span>
          <span class="val">${project.year}</span>
        </div>

        <div class="detail-spec-cell">
          <span class="label">Discipline</span>
          <span class="val">${project.category}</span>
        </div>

        <div class="detail-spec-cell">
          <span class="label">Opdrachtgever</span>
          <span class="val">${project.role}</span>
        </div>

        <div class="detail-spec-cell">
          <span class="label">Tools</span>
          <span class="val">${project.tools.join(', ')}</span>
        </div>

      </div>

    </header>


    <!-- Main Visual -->
    <div class="detail-main-media">
      <img 
        src="${project.heroImage}" 
        alt="${project.title}"
      >
    </div>


    <!-- Case Narrative -->
    <section class="detail-story-grid">

      <div class="story-card">
        <h2>Het Idee en Concept</h2>
        <p>${project.concept}</p>
      </div>

      <div class="story-card">
        <h2>Het Resultaat</h2>
        <p>${project.result}</p>
      </div>

    </section>


    <!-- Gallery -->
    <section style="margin-bottom: 4.5rem;">

      <div style="margin-bottom: 2rem;">

        <span class="project-section-tag">
          Proces en details
        </span>

        <h2 
          class="project-display-title" 
          style="font-size: 2.2rem;"
        >
          Ontwikkeling
        </h2>

      </div>


      <div class="process-gallery-grid">

        ${project.gallery.map(item => `

          <div class="gallery-card">

            <img 
              src="${item.src}" 
              alt="${project.title}"
              loading="lazy"
            >

            <p>${item.caption}</p>

          </div>

        `).join('')}

      </div>

    </section>
  `;
}
/**
 * Contact Form Interaction
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = form?.querySelector('button[type="submit"]');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Verzenden... <span class="btn-arrow-icon">→</span>`;
      }

      setTimeout(() => {
        alert("Bedankt voor je bericht! Ik neem zo snel mogelijk contact met je op.");
        form.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Bericht verzonden <span class="btn-arrow-icon">✓</span>`;
        }
      }, 500);
    });
  }
}

/**
 * Custom Cursor Arrow
 * Arrow follows the mouse and always points towards it
 */
function initCursorArrow() {
  // Only enable on devices with a mouse
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) {
    return;
  }

  const arrow = document.createElement('div');
  arrow.className = 'cursor-arrow';

  const arrowImage = document.createElement('img');
  arrowImage.src = 'Images/Shapes/Following Arrow.png';
  arrowImage.alt = '';

  arrow.appendChild(arrowImage);
  document.body.appendChild(arrow);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let arrowX = mouseX;
  let arrowY = mouseY;

  let previousX = mouseX;
  let previousY = mouseY;

  // Remember the last direction of the arrow
  let lastAngle = 180;

  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function animateCursorArrow() {
    // Smoothly follow the mouse
    arrowX += (mouseX - arrowX) * 0.12;
    arrowY += (mouseY - arrowY) * 0.12;

    // Calculate movement direction
    const deltaX = mouseX - previousX;
    const deltaY = mouseY - previousY;

    // Only change rotation when the mouse is actually moving
    if (Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1) {
      lastAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 180;
    }

    // Keep the last rotation even when the mouse stops
    arrow.style.transform = `
      translate3d(
        ${arrowX - arrow.offsetWidth / 20}px,
        ${arrowY - arrow.offsetHeight / 20}px,
        0
      )
      rotate(${lastAngle}deg)
    `;

    previousX += (mouseX - previousX) * 0.2;
    previousY += (mouseY - previousY) * 0.2;

    requestAnimationFrame(animateCursorArrow);
  }

  animateCursorArrow();
}