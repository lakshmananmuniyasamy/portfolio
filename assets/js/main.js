/**
* Template Name: Personal
* Updated: Jan 29 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    const target = typeof el === 'string' ? document.querySelector(el) : el;
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * One-page navigation. The original template swapped sections in and out;
   * that conflicts with a continuous scrolling portfolio and could leave a
   * selected section hidden after its transition. Keep every section in the
   * document flow and navigate to it directly instead.
   */
  on('click', '#navbar .nav-link', function(e) {
    const section = select(this.hash);
    if (!section) return;
    e.preventDefault();
    const navbar = select('#navbar');
    const navlinks = select('#navbar .nav-link', true);
    navlinks.forEach(item => item.classList.remove('active'));
    this.classList.add('active');

    if (navbar.classList.contains('navbar-mobile')) {
      navbar.classList.remove('navbar-mobile');
      const navbarToggle = select('.mobile-nav-toggle');
      navbarToggle.classList.replace('bi-x', 'bi-list');
    }

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(initial_nav)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  // Scroll-based motion layer for the refreshed one-page layout.
  const progressBar = document.querySelector('.scroll-progress span');
  const updateProgress = () => { const max = document.documentElement.scrollHeight - window.innerHeight; if (progressBar) progressBar.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`; };
  window.addEventListener('scroll', updateProgress, { passive: true }); updateProgress();

  // Rotating expertise copy uses one word-window to keep layout perfectly still.
  const rotatorWord = document.querySelector('[data-rotator-word]');
  if (rotatorWord && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const rotatorWords = ['frontend experiences', 'backend systems', 'real-time products', 'useful interfaces'];
    let rotatorIndex = 0;
    window.setInterval(() => {
      rotatorWord.classList.add('is-leaving');
      window.setTimeout(() => {
        rotatorIndex = (rotatorIndex + 1) % rotatorWords.length;
        rotatorWord.textContent = rotatorWords[rotatorIndex];
        rotatorWord.classList.remove('is-leaving');
        rotatorWord.classList.add('is-entering');
        requestAnimationFrame(() => requestAnimationFrame(() => rotatorWord.classList.remove('is-entering')));
      }, 320);
    }, 2400);
  }

  // Scroll compass and section-local progress create a continuous visual story.
  const compass = document.querySelector('.scroll-compass');
  const compassIndex = document.querySelector('[data-compass-index]');
  const compassLabel = document.querySelector('[data-compass-label]');
  const storySections = [document.querySelector('#header'), ...document.querySelectorAll('section[id]')].filter(Boolean);
  const storyLabels = { header:'Home', about:'About', expertise:'Capabilities', resume:'Experience', journey:'Journey', portfolio:'Selected work', contact:'Contact' };
  storySections.filter(section => section.tagName === 'SECTION').forEach(section => {
    if (section.querySelector(':scope > .section-wordmark')) return;
    const wordmark = document.createElement('span');
    wordmark.className = 'section-wordmark';
    wordmark.setAttribute('aria-hidden', 'true');
    wordmark.textContent = storyLabels[section.id] || section.id;
    section.prepend(wordmark);
  });
  let storyFrame;
  const updateScrollStory = () => {
    storyFrame = undefined;
    const viewportAnchor = window.scrollY + window.innerHeight * .42;
    let activeIndex = 0;
    storySections.forEach((section, index) => {
      const top = section.offsetTop;
      const height = Math.max(section.offsetHeight, 1);
      const local = Math.max(0, Math.min(1, (window.scrollY + window.innerHeight - top) / (height + window.innerHeight)));
      section.style.setProperty('--section-progress', local.toFixed(3));
      section.style.setProperty('--word-shift', `${18 - local * 34}vw`);
      if (viewportAnchor >= top) activeIndex = index;
    });
    const active = storySections[activeIndex];
    const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const globalProgress = Math.max(0, Math.min(1, window.scrollY / total));
    compass?.style.setProperty('--compass-turn', `${globalProgress * 720}deg`);
    compass?.style.setProperty('--compass-progress', `${globalProgress}`);
    if (compassIndex) compassIndex.textContent = String(activeIndex).padStart(2, '0');
    if (compassLabel) compassLabel.textContent = storyLabels[active?.id] || active?.id || 'Home';
  };
  const queueScrollStory = () => { if (!storyFrame) storyFrame = requestAnimationFrame(updateScrollStory); };
  window.addEventListener('scroll', queueScrollStory, { passive:true });
  window.addEventListener('resize', queueScrollStory, { passive:true });
  updateScrollStory();

  // Cinematic portrait background: scroll drives depth without layout reflow.
  const portraitStage = document.querySelector('.portrait-stage');
  if (portraitStage) {
    let portraitFrame;
    let portraitPointerX = 0;
    let portraitPointerY = 0;
    const updatePortraitStage = () => {
      portraitFrame = undefined;
      const heroHeight = Math.max(window.innerHeight, 720);
      const scroll = window.scrollY;
      const heroProgress = Math.max(0, Math.min(1, scroll / heroHeight));
      const storyProgress = scroll / heroHeight;
      const wave = Math.sin(storyProgress * Math.PI * .82);
      const sectionPulse = (Math.cos(storyProgress * Math.PI * 2) + 1) / 2;
      const contentOpacity = .2 + sectionPulse * .08;
      const opacity = heroProgress < .92 ? 1 - heroProgress * .5 : contentOpacity;
      const direction = Math.max(-1, Math.min(1, wave * .4 + portraitPointerX * .8));
      portraitStage.style.setProperty('--face-light-x', `${50 + direction * 30}%`);
      portraitStage.style.setProperty('--face-light-y', `${38 + portraitPointerY * 12}%`);
      portraitStage.style.setProperty('--portrait-opacity', `${opacity}`);
      portraitStage.style.setProperty('--halo-turn', `${storyProgress * 34 + portraitPointerX * 8}deg`);
      portraitStage.style.setProperty('--portrait-focus', `${Math.max(0, Math.min(1, 1 - heroProgress * .45))}`);
      portraitStage.style.setProperty('--portrait-reveal', `${18 + sectionPulse * 70}%`);
    };
    const queuePortraitStage = () => {
      if (!portraitFrame) portraitFrame = requestAnimationFrame(updatePortraitStage);
    };
    window.addEventListener('scroll', queuePortraitStage, { passive: true });
    window.addEventListener('resize', queuePortraitStage, { passive: true });
    window.addEventListener('pointermove', event => {
      portraitPointerX = event.clientX / Math.max(1, window.innerWidth) - .5;
      portraitPointerY = event.clientY / Math.max(1, window.innerHeight) - .5;
      queuePortraitStage();
    }, { passive:true });
    updatePortraitStage();
  }

  // Live local time adds a useful, personal detail to the opening screen.
  const localTime = document.querySelector('[data-local-time]');
  if (localTime) {
    const updateLocalTime = () => {
      localTime.textContent = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false
      }).format(new Date());
    };
    updateLocalTime();
    window.setInterval(updateLocalTime, 30000);
  }

  // Recruiter-friendly command palette: fast navigation without losing context.
  const commandPalette = document.querySelector('[data-command-palette]');
  const commandBackdrop = document.querySelector('[data-command-backdrop]');
  const commandOpen = document.querySelector('[data-command-open]');
  const commandClose = document.querySelector('[data-command-close]');
  const commandNote = document.querySelector('[data-command-note]');
  let commandReturnFocus;
  const setCommandState = open => {
    if (!commandPalette || !commandBackdrop) return;
    if (open) {
      commandReturnFocus = document.activeElement;
      commandPalette.hidden = false;
      commandBackdrop.hidden = false;
      document.body.classList.add('command-is-open');
      requestAnimationFrame(() => {
        commandPalette.classList.add('is-open');
        commandBackdrop.classList.add('is-open');
        commandPalette.querySelector('a,button')?.focus();
      });
    } else {
      commandPalette.classList.remove('is-open');
      commandBackdrop.classList.remove('is-open');
      document.body.classList.remove('command-is-open');
      window.setTimeout(() => {
        commandPalette.hidden = true;
        commandBackdrop.hidden = true;
        commandReturnFocus?.focus();
      }, 220);
    }
  };
  commandOpen?.addEventListener('click', () => setCommandState(true));
  commandClose?.addEventListener('click', () => setCommandState(false));
  commandBackdrop?.addEventListener('click', () => setCommandState(false));
  commandPalette?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setCommandState(false)));
  document.addEventListener('keydown', event => {
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || '');
    if (event.key === '/' && !typing && commandPalette?.hidden) { event.preventDefault(); setCommandState(true); }
    if (event.key === 'Escape' && commandPalette && !commandPalette.hidden) setCommandState(false);
  });
  document.querySelector('[data-copy-email]')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('lakshmananm2580@gmail.com');
      if (commandNote) commandNote.textContent = 'Email copied to clipboard ✓';
    } catch (_) {
      if (commandNote) commandNote.textContent = 'Email: lakshmananm2580@gmail.com';
    }
  });

  // Capability cards have a deliberately restrained pointer parallax.
  document.querySelectorAll('[data-float-card]').forEach(card => {
    card.addEventListener('pointermove', event => {
      if (window.innerWidth < 901 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.setProperty('--card-rx', `${y * -5}deg`);
      card.style.setProperty('--card-ry', `${x * 7}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--card-rx');
      card.style.removeProperty('--card-ry');
    });
  });
  const revealTargets = document.querySelectorAll('.about-me, .counts, .interests, .resume .container, .portfolio .container, .contact .container');
  revealTargets.forEach(item => item.classList.add('reveal'));
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), { threshold: .01, rootMargin: '0px 0px -4% 0px' });
  revealTargets.forEach(item => revealObserver.observe(item));
  // Never leave content hidden if an older browser delays observer callbacks.
  window.setTimeout(() => revealTargets.forEach(item => item.classList.add('is-visible')), 800);
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => { const target = document.querySelector(link.getAttribute('href')); if (!target) return; event.preventDefault(); target.scrollIntoView({ behavior:'smooth', block:'start' }); }));
  const header = document.querySelector('#header');
  const pageNavLinks = document.querySelectorAll('.site-nav-links a');
  const setHeaderState = () => {
    document.body.classList.toggle('is-scrolled', window.scrollY > 100);
    header?.classList.toggle('header-top', window.scrollY > 90);
  };
  window.addEventListener('scroll', setHeaderState, { passive: true }); setHeaderState();

  const pageSections = document.querySelectorAll('section[id]');
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      pageNavLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-25% 0px -62% 0px', threshold: .01 });
  pageSections.forEach(section => navObserver.observe(section));

  const sectionTitles = document.querySelectorAll('.section-title');
  const titleObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  }), { threshold: .2 });
  sectionTitles.forEach(title => titleObserver.observe(title));

  // Character-level text reveals for major headings: modern kinetic typography
  // with real accessible labels preserved on the source element.
  const kineticTargets = document.querySelectorAll('#header h1 a, .section-title p, .about-me .content h3');
  kineticTargets.forEach(target => {
    const label = target.textContent.trim();
    if (!label || target.querySelector('.kinetic-char')) return;
    target.setAttribute('aria-label', label);
    target.classList.add('kinetic-word');
    target.textContent = '';
    [...label].forEach((character, index) => {
      const char = document.createElement('span');
      char.className = 'kinetic-char';
      if (target.matches('#header h1 a') && index >= label.length - 2) char.classList.add('name-initial');
      char.style.setProperty('--char-index', index);
      char.textContent = character === ' ' ? '\u00A0' : character;
      target.appendChild(char);
    });
  });
  const kineticObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('kinetic-ready');
  }), { threshold:.25 });
  kineticTargets.forEach(target => kineticObserver.observe(target));
  window.setTimeout(() => kineticTargets.forEach(target => target.classList.add('kinetic-ready')), 900);

  // Staggered entry motion for content cards. A short fallback guarantees that
  // every item is released even if an observer callback is delayed.
  const animatedItems = document.querySelectorAll('.count-box, .interests .icon-box, .resume-item, .portfolio-item, .contact .info-box');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('motion-enabled');
    animatedItems.forEach((item, index) => {
      item.classList.add('scroll-animate');
      if (index % 3 === 0) item.classList.add('from-left');
      if (index % 3 === 2) item.classList.add('from-right');
    });
    const motionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in-view'); });
    }, { threshold: .06, rootMargin: '0px 0px -5% 0px' });
    animatedItems.forEach(item => motionObserver.observe(item));
    window.setTimeout(() => animatedItems.forEach(item => item.classList.add('in-view')), 1000);
  }

  // Lightweight 3D depth: photo and hero move subtly with the scroll, while
  // work cards react to the pointer. It uses transforms only for smooth paint.
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const profilePhoto = document.querySelector('.profile-photo');
    const heroOrbit = document.querySelector('.hero-visual');
    if (heroOrbit) heroOrbit.classList.add('depth-orbit');
    let depthFrame;
    const updateDepth = () => {
      depthFrame = undefined;
      const y = window.scrollY;
      if (profilePhoto) {
        const rect = profilePhoto.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight));
        profilePhoto.style.setProperty('--photo-shift', `${progress * -16}px`);
        profilePhoto.style.setProperty('--photo-rotate', `${progress * 4}deg`);
      }
      if (heroOrbit) {
        heroOrbit.style.setProperty('--orbit-shift', `${Math.min(y * .08, 28)}px`);
        heroOrbit.style.setProperty('--orbit-turn', `${Math.min(y * .008, 3)}deg`);
      }
    };
    const queueDepth = () => { if (!depthFrame) depthFrame = requestAnimationFrame(updateDepth); };
    window.addEventListener('scroll', queueDepth, { passive: true });
    queueDepth();

    document.querySelectorAll('.portfolio .portfolio-wrap').forEach(card => {
      card.addEventListener('pointermove', event => {
        if (window.innerWidth < 768) return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(900px) rotateX(${y * -7}deg) rotateY(${x * 9}deg) translateY(-5px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });

    const heroTiltCard = document.querySelector('[data-hero-tilt]');
    const heroTiltArea = document.querySelector('.hero-visual');
    if (heroTiltCard && heroTiltArea) {
      heroTiltArea.addEventListener('pointermove', event => {
        if (window.innerWidth < 993) return;
        const rect = heroTiltArea.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        heroTiltCard.style.setProperty('--hero-x', `${y * -15}deg`);
        heroTiltCard.style.setProperty('--hero-y', `${x * 18}deg`);
        heroTiltCard.style.setProperty('--hero-glow-x', `${50 + x * 70}%`);
        heroTiltCard.style.setProperty('--hero-glow-y', `${35 + y * 70}%`);
      });
      heroTiltArea.addEventListener('pointerleave', () => {
        heroTiltCard.style.setProperty('--hero-x', '0deg');
        heroTiltCard.style.setProperty('--hero-y', '0deg');
        heroTiltCard.style.setProperty('--hero-glow-x', '50%');
        heroTiltCard.style.setProperty('--hero-glow-y', '30%');
      });
    }

    const cursor = document.querySelector('.cursor-orbit');
    if (cursor && window.matchMedia('(pointer: fine)').matches) {
      let cursorTimer;
      let sparkTime = 0;
      window.addEventListener('pointermove', event => {
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        cursor.classList.add('is-active');
        if (performance.now() - sparkTime > 85) {
          sparkTime = performance.now();
          const spark = document.createElement('span');
          spark.className = 'cursor-spark';
          spark.style.left = `${event.clientX}px`;
          spark.style.top = `${event.clientY}px`;
          spark.style.setProperty('--spark-x', `${(Math.random() - .5) * 26}px`);
          spark.style.setProperty('--spark-y', `${8 + Math.random() * 18}px`);
          document.body.appendChild(spark);
          window.setTimeout(() => spark.remove(), 560);
        }
      }, { passive: true });
      document.querySelectorAll('a, button, .portfolio-wrap, .live-project-card, .icon-box').forEach(element => {
        element.addEventListener('pointerenter', () => cursor.classList.add('is-hover'));
        element.addEventListener('pointerleave', () => cursor.classList.remove('is-hover'));
      });
      window.addEventListener('scroll', () => {
        cursor.classList.add('is-scrolling');
        window.clearTimeout(cursorTimer);
        cursorTimer = window.setTimeout(() => cursor.classList.remove('is-scrolling'), 140);
      }, { passive: true });

      document.querySelectorAll('.hero-scroll, .resume-download, .site-nav-cta, .portfolio-links a').forEach(element => {
        element.classList.add('magnetic');
        element.addEventListener('pointermove', event => {
          const rect = element.getBoundingClientRect();
          element.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .13}px, ${(event.clientY - rect.top - rect.height / 2) * .13}px)`;
        });
        element.addEventListener('pointerleave', () => { element.style.transform = ''; });
      });

      const scrollLight = document.querySelector('.scroll-light');
      window.addEventListener('scroll', () => {
        if (scrollLight) scrollLight.style.setProperty('--light-position', `${-window.scrollY * .26}px`);
      }, { passive:true });
    }

    const projectGrid = document.querySelector('.project-live-grid');
    const projectCards = [...document.querySelectorAll('[data-project-card]')];
    const reduceProjectMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    if (projectGrid && projectCards.length && !reduceProjectMotion) {
      projectGrid.classList.add('project-motion-ready');

      const projectObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const card = entry.target;
          const index = projectCards.indexOf(card);
          window.setTimeout(() => card.classList.add('is-project-visible'), Math.min(index * 110, 330));
          projectObserver.unobserve(card);
        });
      }, { threshold: .14 });
      projectCards.forEach(card => projectObserver.observe(card));

      const activeProjectObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.target.classList.toggle('is-project-active', entry.isIntersecting));
      }, { rootMargin: '-28% 0px -28% 0px', threshold: .15 });
      projectCards.forEach(card => activeProjectObserver.observe(card));

      if (finePointer) {
        projectCards.forEach(card => {
          card.addEventListener('pointermove', event => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            card.style.setProperty('--mx', `${x * 100}%`);
            card.style.setProperty('--my', `${y * 100}%`);
            card.style.setProperty('--rx', `${(y - .5) * -7}deg`);
            card.style.setProperty('--ry', `${(x - .5) * 9}deg`);
          });
          card.addEventListener('pointerleave', () => {
            card.style.setProperty('--rx', '0deg');
            card.style.setProperty('--ry', '0deg');
          });
        });
      }

      let projectParallaxFrame = 0;
      const updateProjectParallax = () => {
        projectParallaxFrame = 0;
        projectCards.forEach(card => {
          const rect = card.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > window.innerHeight) return;
          const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
          const image = card.querySelector('.live-project-browser > img');
          if (image) image.style.setProperty('--image-y', `${Math.max(-10, Math.min(10, progress * -18))}px`);
        });
      };
      window.addEventListener('scroll', () => {
        if (!projectParallaxFrame) projectParallaxFrame = requestAnimationFrame(updateProjectParallax);
      }, { passive: true });
      updateProjectParallax();
    }

    const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionPointer = window.matchMedia('(pointer: fine)').matches;
    if (!motionReduced) {
      let sceneFrame = 0;
      let targetSceneX = 0;
      let targetSceneY = 0;
      let sceneX = 0;
      let sceneY = 0;
      const renderScene = () => {
        sceneX += (targetSceneX - sceneX) * .075;
        sceneY += (targetSceneY - sceneY) * .075;
        document.documentElement.style.setProperty('--scene-x', `${sceneX}px`);
        document.documentElement.style.setProperty('--scene-y', `${sceneY}px`);
        if (Math.abs(targetSceneX - sceneX) > .1 || Math.abs(targetSceneY - sceneY) > .1) sceneFrame = requestAnimationFrame(renderScene);
        else sceneFrame = 0;
      };

      if (motionPointer) {
        window.addEventListener('pointermove', event => {
          targetSceneX = (event.clientX / window.innerWidth - .5) * 38;
          targetSceneY = (event.clientY / window.innerHeight - .5) * 28;
          document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
          document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
          if (!sceneFrame) sceneFrame = requestAnimationFrame(renderScene);
        }, { passive: true });

        document.querySelectorAll('.count-box, .interests .icon-box, .contact .info-box').forEach(card => {
          card.classList.add('depth-reactive');
          card.addEventListener('pointermove', event => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            card.style.setProperty('--depth-x', `${x * 100}%`);
            card.style.setProperty('--depth-y', `${y * 100}%`);
            card.style.setProperty('--depth-rx', `${(y - .5) * -5}deg`);
            card.style.setProperty('--depth-ry', `${(x - .5) * 7}deg`);
          });
          card.addEventListener('pointerleave', () => {
            card.style.setProperty('--depth-rx', '0deg');
            card.style.setProperty('--depth-ry', '0deg');
          });
        });
      }

      let lastScrollY = window.scrollY;
      let scrollMotionFrame = 0;
      window.addEventListener('scroll', () => {
        if (scrollMotionFrame) return;
        scrollMotionFrame = requestAnimationFrame(() => {
          const velocity = Math.max(-18, Math.min(18, (window.scrollY - lastScrollY) * .22));
          document.documentElement.style.setProperty('--scroll-drift', `${velocity}px`);
          lastScrollY = window.scrollY;
          scrollMotionFrame = 0;
        });
      }, { passive: true });
    }

    document.querySelectorAll('.site-nav-cta, .hero-actions a, .resume-download, .preview-play, .contact button[type="submit"]').forEach(control => {
      control.classList.add('motion-click');
      control.addEventListener('pointerdown', event => {
        const rect = control.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'motion-ripple';
        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;
        control.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
      });
    });

    const liveModal = document.querySelector('[data-live-modal]');
    if (liveModal) {
      const liveFrame = liveModal.querySelector('[data-live-frame]');
      const livePoster = liveModal.querySelector('[data-live-poster]');
      const liveTitle = liveModal.querySelector('#live-preview-title');
      const liveAddress = liveModal.querySelector('[data-live-address]');
      const liveExternal = liveModal.querySelector('[data-live-external]');
      let lastPreviewTrigger = null;

      const closeLivePreview = () => {
        liveModal.hidden = true;
        liveFrame.src = 'about:blank';
        document.body.classList.remove('has-live-modal');
        if (lastPreviewTrigger) lastPreviewTrigger.focus();
      };

      document.querySelectorAll('[data-live-preview]').forEach(trigger => {
        trigger.addEventListener('click', () => {
          const url = trigger.dataset.url;
          const title = trigger.dataset.title;
          lastPreviewTrigger = trigger;
          liveTitle.textContent = title;
          liveAddress.textContent = new URL(url).hostname;
          liveExternal.href = url;
          livePoster.src = trigger.dataset.image;
          livePoster.alt = `${title} website preview`;
          liveFrame.title = `${title} interactive website preview`;
          liveModal.hidden = false;
          document.body.classList.add('has-live-modal');
          requestAnimationFrame(() => { liveFrame.src = url; });
          liveModal.querySelector('button[data-live-close]').focus();
        });
      });

      liveModal.querySelectorAll('[data-live-close]').forEach(control => control.addEventListener('click', closeLivePreview));
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !liveModal.hidden) closeLivePreview();
      });
    }
  }

})()
