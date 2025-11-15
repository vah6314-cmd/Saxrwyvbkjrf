// Enhanced Animations using Motion Library
class MotionAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.initScrollReveal();
    this.initHeroAnimations();
    this.initServiceCards();
    this.initPortfolioAnimations();
    this.initFloatingElements();
    this.initParallaxEffects();
    this.initMicroInteractions();
  }

  // Scroll Reveal Animations
  initScrollReveal() {
    const revealElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            this.revealElement(entry.target);
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
      observer.observe(element);
    });
  }

  async revealElement(element) {
    const animationType = this.getAnimationType(element);

    switch (animationType) {
      case 'fade-up':
        await this.animate(element, {
          opacity: [0, 1],
          y: [50, 0]
        }, { duration: 0.8, ease: 'easeOut' });
        break;

      case 'fade-left':
        await this.animate(element, {
          opacity: [0, 1],
          x: [-50, 0]
        }, { duration: 0.8, ease: 'easeOut' });
        break;

      case 'fade-right':
        await this.animate(element, {
          opacity: [0, 1],
          x: [50, 0]
        }, { duration: 0.8, ease: 'easeOut' });
        break;

      case 'scale':
        await this.animate(element, {
          opacity: [0, 1],
          scale: [0.8, 1]
        }, { duration: 0.6, ease: 'easeOut' });
        break;

      default:
        await this.animate(element, {
          opacity: [0, 1]
        }, { duration: 0.6, ease: 'easeOut' });
    }

    element.classList.add('is-visible');
  }

  getAnimationType(element) {
    // Check for data-animation attribute or use defaults based on element class
    if (element.dataset.animation) {
      return element.dataset.animation;
    }

    if (element.classList.contains('service-card')) return 'scale';
    if (element.classList.contains('section-title')) return 'fade-up';
    if (element.classList.contains('section-subtitle')) return 'fade-up';
    if (element.classList.contains('benefit-item')) return 'fade-up';
    if (element.classList.contains('contact-method')) return 'fade-left';
    if (element.classList.contains('contact-form')) return 'fade-right';

    return 'fade-up';
  }

  // Hero Section Animations
  async initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');

    if (heroTitle) {
      // Animate title with stagger effect
      const words = heroTitle.textContent.split(' ');
      heroTitle.innerHTML = words.map(word =>
        `<span style="display: inline-block; opacity: 0; transform: translateY(30px);">${word}&nbsp;</span>`
      ).join('');

      const spans = heroTitle.querySelectorAll('span');

      for (let i = 0; i < spans.length; i++) {
        await this.animate(spans[i], {
          opacity: [0, 1],
          y: [30, 0]
        }, { duration: 0.6, delay: i * 0.1, ease: 'easeOut' });
      }
    }

    if (heroSubtitle) {
      await this.animate(heroSubtitle, {
        opacity: [0, 1],
        y: [30, 0]
      }, { duration: 0.8, delay: 0.5, ease: 'easeOut' });
    }

    if (heroButtons) {
      const buttons = heroButtons.querySelectorAll('.btn');
      for (let i = 0; i < buttons.length; i++) {
        await this.animate(buttons[i], {
          opacity: [0, 1],
          y: [30, 0],
          scale: [0.9, 1]
        }, { duration: 0.6, delay: 0.8 + (i * 0.1), ease: 'easeOut' });
      }
    }

    // Hero particles animation
    this.initHeroParticles();
  }

  // Hero Particles
  initHeroParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;

    // Create floating particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;
      particlesContainer.appendChild(particle);

      // Animate particle
      this.animateParticle(particle);
    }
  }

  async animateParticle(particle) {
    const duration = Math.random() * 20 + 10;
    const startX = parseFloat(particle.style.left);
    const startY = parseFloat(particle.style.top);
    const endX = startX + (Math.random() - 0.5) * 30;
    const endY = startY + (Math.random() - 0.5) * 30;

    await this.animate(particle, {
      translateX: [0, endX - startX],
      translateY: [0, endY - startY],
      opacity: [parseFloat(particle.style.opacity), 0]
    }, { duration, ease: 'linear' });

    // Reset and continue
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.opacity = `${Math.random() * 0.3 + 0.1}`;

    this.animateParticle(particle);
  }

  // Service Cards
  initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
      // Hover entrance animation
      card.addEventListener('mouseenter', () => {
        this.animate(card, {
          scale: [1, 1.05],
          y: [0, -8]
        }, { duration: 0.3, ease: 'easeOut' });
      });

      card.addEventListener('mouseleave', () => {
        this.animate(card, {
          scale: [1.05, 1],
          y: [-8, 0]
        }, { duration: 0.3, ease: 'easeOut' });
      });

      // Icon animation on hover
      const icon = card.querySelector('.service-icon');
      if (icon) {
        card.addEventListener('mouseenter', () => {
          this.animate(icon, {
            rotate: [0, 360],
            scale: [1, 1.2]
          }, { duration: 0.6, ease: 'easeInOut' });
        });
      }
    });
  }

  // Portfolio Animations
  initPortfolioAnimations() {
    // Filter button animations
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Ripple effect
        this.createRipple(btn, event);
      });
    });

    // Carousel transitions
    this.initCarouselAnimations();
  }

  initCarouselAnimations() {
    const carouselTrack = document.getElementById('carousel-track');
    if (!carouselTrack) return;

    // Observe carousel for slide changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        const activeSlide = carouselTrack.querySelector('.carousel-slide:not([style*="display: none"])');
        if (activeSlide) {
          this.animateCarouselSlide(activeSlide);
        }
      });
    });

    observer.observe(carouselTrack, { childList: true });
  }

  async animateCarouselSlide(slide) {
    const img = slide.querySelector('img');
    const content = slide.querySelector('.carousel-content');

    if (img) {
      await this.animate(img, {
        scale: [1.1, 1],
        opacity: [0.8, 1]
      }, { duration: 0.8, ease: 'easeOut' });
    }

    if (content) {
      await this.animate(content, {
        opacity: [0, 1],
        y: [20, 0]
      }, { duration: 0.6, delay: 0.3, ease: 'easeOut' });
    }
  }

  // Floating Elements
  initFloatingElements() {
    // WhatsApp floating button
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
      this.animate(whatsappFloat, {
        y: [0, -10, 0]
      }, { duration: 3, repeat: Infinity, ease: 'easeInOut' });
    }

    // Benefit items floating
    const benefitIcons = document.querySelectorAll('.benefit-icon');
    benefitIcons.forEach((icon, index) => {
      this.animate(icon, {
        y: [0, -5, 0]
      }, { duration: 3 + index * 0.5, repeat: Infinity, ease: 'easeInOut' });
    });
  }

  // Parallax Effects
  initParallaxEffects() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      heroBackground.style.transform = `translateY(${rate}px)`;
    });
  }

  // Micro-interactions
  initMicroInteractions() {
    // Button interactions
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        this.animate(btn, {
          scale: [1, 1.05]
        }, { duration: 0.2, ease: 'easeOut' });
      });

      btn.addEventListener('mouseleave', () => {
        this.animate(btn, {
          scale: [1.05, 1]
        }, { duration: 0.2, ease: 'easeOut' });
      });
    });

    // Form input interactions
    const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        this.animate(input.parentElement, {
          scale: [1, 1.02]
        }, { duration: 0.2, ease: 'easeOut' });
      });

      input.addEventListener('blur', () => {
        this.animate(input.parentElement, {
          scale: [1.02, 1]
        }, { duration: 0.2, ease: 'easeOut' });
      });
    });

    // Carousel dot interactions
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('carousel-dot')) {
        this.createRipple(e.target, e);
      }
    });
  }

  // Ripple Effect
  createRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event ? event.clientX - rect.left - size / 2 : rect.width / 2 - size / 2;
    const y = event ? event.clientY - rect.top - size / 2 : rect.height / 2 - size / 2;

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      transform: scale(0);
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    this.animate(ripple, {
      scale: [0, 2],
      opacity: [1, 0]
    }, { duration: 0.6, ease: 'easeOut' }).then(() => {
      ripple.remove();
    });
  }

  // Loading animations
  async showLoading(element) {
    const dots = document.createElement('div');
    dots.style.cssText = `
      display: inline-flex;
      gap: 4px;
      margin-left: 8px;
    `;

    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('span');
      dot.style.cssText = `
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: currentColor;
        display: inline-block;
      `;
      dots.appendChild(dot);

      this.animate(dot, {
        scale: [1, 0.5, 1],
        opacity: [1, 0.5, 1]
      }, { duration: 1, repeat: Infinity, delay: i * 0.2 });
    }

    element.appendChild(dots);
    return dots;
  }

  hideLoading(element, dots) {
    if (dots && dots.parentNode) {
      dots.remove();
    }
  }

  // Utility animation wrapper
  async animate(element, keyframes, options = {}) {
    if (!window.animate || !element) {
      return Promise.resolve();
    }

    try {
      return await window.animate(element, keyframes, {
        duration: 0.6,
        ease: 'easeInOut',
        ...options
      }).finished;
    } catch (error) {
      console.warn('Animation failed:', error);
      return Promise.resolve();
    }
  }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MotionAnimations();
});

// Export for use in other modules
window.MotionAnimations = MotionAnimations;