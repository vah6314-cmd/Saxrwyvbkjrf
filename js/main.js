// Portfolio Data Structure
const portfolioData = {
  'business-websites': [
    {
      id: 1,
      title: 'Tech Consulting Firm',
      category: 'business-websites',
      image: './assets/portfolio/business-websites/default-1.jpg',
      description: 'Modern consulting website with appointment booking and client testimonials.',
      client: 'Innovation Consulting',
      technologies: ['React', 'Node.js', 'MongoDB'],
      liveUrl: '#',
      detailsUrl: '#'
    },
    {
      id: 2,
      title: 'Restaurant Chain',
      category: 'business-websites',
      image: './assets/portfolio/business-websites/default-2.jpg',
      description: 'Multi-location restaurant website with online ordering system.',
      client: 'Gourmet Bistro',
      technologies: ['Vue.js', 'Express', 'PostgreSQL'],
      liveUrl: '#',
      detailsUrl: '#'
    },
    {
      id: 3,
      title: 'Law Firm Website',
      category: 'business-websites',
      image: './assets/portfolio/business-websites/default-3.jpg',
      description: 'Professional law firm with case studies and consultation booking.',
      client: 'Legal Partners',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      liveUrl: '#',
      detailsUrl: '#'
    }
  ],
  'ecommerce-sites': [
    {
      id: 4,
      title: 'Fashion Boutique',
      category: 'ecommerce-sites',
      image: './assets/portfolio/ecommerce-sites/default-1.jpg',
      description: 'Elegant fashion store with size guides and virtual try-on features.',
      client: 'Style Haven',
      technologies: ['Shopify', 'Liquid', 'JavaScript'],
      liveUrl: '#',
      detailsUrl: '#'
    },
    {
      id: 5,
      title: 'Electronics Store',
      category: 'ecommerce-sites',
      image: './assets/portfolio/ecommerce-sites/default-2.jpg',
      description: 'Tech electronics store with product comparison and reviews.',
      client: 'TechWorld Electronics',
      technologies: ['Magento', 'PHP', 'MySQL'],
      liveUrl: '#',
      detailsUrl: '#'
    },
    {
      id: 6,
      title: 'Art Gallery Shop',
      category: 'ecommerce-sites',
      image: './assets/portfolio/ecommerce-sites/default-3.jpg',
      description: 'Online art gallery with artist profiles and secure transactions.',
      client: 'Modern Art Gallery',
      technologies: ['WooCommerce', 'WordPress', 'PHP'],
      liveUrl: '#',
      detailsUrl: '#'
    }
  ],
  'portfolio-sites': [
    {
      id: 7,
      title: 'Photographer Portfolio',
      category: 'portfolio-sites',
      image: './assets/portfolio/portfolio-sites/default-1.jpg',
      description: 'Stunning photography portfolio with client galleries and booking.',
      client: 'Alex Johnson Photography',
      technologies: ['React', 'GSAP', 'Cloudinary'],
      liveUrl: '#',
      detailsUrl: '#'
    },
    {
      id: 8,
      title: 'Designer Portfolio',
      category: 'portfolio-sites',
      image: './assets/portfolio/portfolio-sites/default-2.jpg',
      description: 'Creative portfolio showcasing design work and process.',
      client: 'Sarah Creative Studio',
      technologies: ['Vue.js', 'Framer Motion', 'Contentful'],
      liveUrl: '#',
      detailsUrl: '#'
    },
    {
      id: 9,
      title: 'Artist Portfolio',
      category: 'portfolio-sites',
      image: './assets/portfolio/portfolio-sites/default-3.jpg',
      description: 'Visual artist portfolio with exhibition calendar and shop.',
      client: 'Modern Art Studio',
      technologies: ['Next.js', 'Vercel', 'Stripe'],
      liveUrl: '#',
      detailsUrl: '#'
    }
  ],
  'service-websites': [
    {
      id: 10,
      title: 'Cleaning Service',
      category: 'service-websites',
      image: './assets/portfolio/service-websites/default-1.jpg',
      description: 'Professional cleaning service with online booking and quotes.',
      client: 'Sparkle Clean',
      technologies: ['WordPress', 'Elementor', 'Calendly'],
      liveUrl: '#',
      detailsUrl: '#'
    },
    {
      id: 11,
      title: 'Fitness Training',
      category: 'service-websites',
      image: './assets/portfolio/service-websites/default-2.jpg',
      description: 'Personal training website with program customization and tracking.',
      client: 'FitLife Training',
      technologies: ['React Native', 'Firebase', 'Stripe'],
      liveUrl: '#',
      detailsUrl: '#'
    },
    {
      id: 12,
      title: 'Consulting Agency',
      category: 'service-websites',
      image: './assets/portfolio/service-websites/default-3.jpg',
      description: 'Business consulting with resource library and client portal.',
      client: 'Strategic Growth Partners',
      technologies: ['Angular', 'Node.js', 'AWS'],
      liveUrl: '#',
      detailsUrl: '#'
    }
  ]
};

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const carouselTrack = document.getElementById('carousel-track');
const carouselDots = document.getElementById('carousel-dots');
const carouselPrev = document.getElementById('carousel-prev');
const carouselNext = document.getElementById('carousel-next');
const contactForm = document.getElementById('contact-form');

// State Management
let currentFilter = 'all';
let currentIndex = 0;
let filteredProjects = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializePortfolio();
  initializeCarousel();
  initializeContactForm();
  initializeScrollAnimations();
  loadHeroBackground();
});

// Navigation
function initializeNavigation() {
  // Mobile menu toggle
  navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');

      // Update active state
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Portfolio Filter
function initializePortfolio() {
  // Set initial filter
  updateFilter('all');

  // Filter button clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      updateFilter(filter);
    });
  });
}

function updateFilter(filter) {
  currentFilter = filter;
  currentIndex = 0;

  // Update button states
  filterBtns.forEach(btn => {
    if (btn.getAttribute('data-filter') === filter) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Filter projects
  if (filter === 'all') {
    filteredProjects = Object.values(portfolioData).flat();
  } else {
    filteredProjects = portfolioData[filter] || [];
  }

  // Update carousel
  updateCarousel();
}

// Carousel
function initializeCarousel() {
  // Previous button
  carouselPrev?.addEventListener('click', () => {
    navigateCarousel(-1);
  });

  // Next button
  carouselNext?.addEventListener('click', () => {
    navigateCarousel(1);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') navigateCarousel(-1);
    if (e.key === 'ArrowRight') navigateCarousel(1);
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  carouselTrack?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carouselTrack?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) navigateCarousel(1);
    if (touchEndX > touchStartX + 50) navigateCarousel(-1);
  }

  // Auto-play (pause on hover)
  let autoPlayInterval;

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => navigateCarousel(1), 5000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  carouselTrack?.addEventListener('mouseenter', stopAutoPlay);
  carouselTrack?.addEventListener('mouseleave', startAutoPlay);

  // Start auto-play
  startAutoPlay();
}

function navigateCarousel(direction) {
  if (filteredProjects.length === 0) return;

  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = filteredProjects.length - 1;
  } else if (currentIndex >= filteredProjects.length) {
    currentIndex = 0;
  }

  updateCarousel();
}

function updateCarousel() {
  if (filteredProjects.length === 0) {
    carouselTrack.innerHTML = '<div class="carousel-slide"><div class="carousel-content"><h3>No projects found</h3></div></div>';
    carouselDots.innerHTML = '';
    return;
  }

  // Create carousel slides
  carouselTrack.innerHTML = filteredProjects.map((project, index) => `
    <div class="carousel-slide" style="${index !== currentIndex ? 'display: none;' : ''}">
      <img src="${project.image}" alt="${project.title}" loading="lazy">
      <div class="carousel-content">
        <h3 class="carousel-title">${project.title}</h3>
        <p class="carousel-client">Client: ${project.client}</p>
        <p class="carousel-description">${project.description}</p>
        <div class="carousel-tech">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="carousel-buttons">
          <a href="${project.liveUrl}" class="btn btn-primary" target="_blank">View Live Site</a>
          <a href="${project.detailsUrl}" class="btn btn-secondary">Project Details</a>
        </div>
      </div>
    </div>
  `).join('');

  // Update dots
  carouselDots.innerHTML = filteredProjects.map((_, index) => `
    <button class="carousel-dot ${index === currentIndex ? 'active' : ''}"
            onclick="goToSlide(${index})"
            aria-label="Go to slide ${index + 1}">
    </button>
  `).join('');
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

// Contact Form
function initializeContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Validate form
    if (!validateForm(data)) {
      return;
    }

    // Create email content
    const emailSubject = encodeURIComponent('Website Design Inquiry from Rayline Web Development');
    const emailBody = encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Project Type: ${data['project-type']}
Budget Range: ${data.budget}

Message:
${data.message}
    `.trim());

    // Open email client
    const mailtoUrl = `mailto:raylinewebdev@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailtoUrl;

    // Show success message
    showFormMessage('Thank you for your inquiry! We\'ll get back to you soon.', 'success');

    // Reset form
    contactForm.reset();
  });
}

function validateForm(data) {
  const required = ['name', 'email', 'message'];

  for (const field of required) {
    if (!data[field] || data[field].trim() === '') {
      showFormMessage(`Please fill in the ${field.replace('-', ' ')} field.`, 'error');
      return false;
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showFormMessage('Please enter a valid email address.', 'error');
    return false;
  }

  // Phone validation (optional)
  if (data.phone && !/^[\d\s\-\+\(\)]+$/.test(data.phone)) {
    showFormMessage('Please enter a valid phone number.', 'error');
    return false;
  }

  return true;
}

function showFormMessage(message, type) {
  // Remove existing messages
  const existingMessage = contactForm.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create new message
  const messageElement = document.createElement('div');
  messageElement.className = `form-message form-message-${type}`;
  messageElement.textContent = message;
  messageElement.style.cssText = `
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    font-weight: 500;
    ${type === 'error'
      ? 'background-color: #fef2f2; color: #dc2626; border: 1px solid #fecaca;'
      : 'background-color: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0;'
    }
  `;

  // Insert at the top of the form
  contactForm.insertBefore(messageElement, contactForm.firstChild);

  // Remove after 5 seconds
  setTimeout(() => {
    if (messageElement.parentNode) {
      messageElement.remove();
    }
  }, 5000);
}

// Scroll Animations
function initializeScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // Trigger Motion animations if available
        if (window.animate && entry.target.classList.contains('animate-on-scroll')) {
          window.animate(
            entry.target,
            { opacity: [0, 1], y: [30, 0] },
            { duration: 0.6, ease: 'easeOut' }
          );
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Hero Background
function loadHeroBackground() {
  const heroBackground = document.querySelector('.hero-background');
  if (!heroBackground) return;

  // Try to load background image
  const img = new Image();
  img.onload = () => {
    heroBackground.style.backgroundImage = `url('${img.src}')`;
  };
  img.onerror = () => {
    // Keep gradient background if image fails to load
    console.log('Using gradient fallback for hero background');
  };
  img.src = './assets/images/hero-bg.jpg';
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (!header) return;

  if (window.scrollY > 100) {
    header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    header.style.boxShadow = '0 1px 10px rgba(0, 0, 0, 0.05)';
  }
});

// Active Navigation on Scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Performance Optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smooth reveal for hero animations
document.addEventListener('DOMContentLoaded', () => {
  const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons');
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

// Mobile viewport height fix
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', debounce(setViewportHeight, 100));
setViewportHeight();