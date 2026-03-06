// ============================================
// Navigation & Mobile Menu
// ============================================

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  
  // Animate hamburger icon
  const spans = navToggle.querySelectorAll('span');
  if (navMenu.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translateY(10px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// ============================================
// Smooth Scroll Spy
// ============================================

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// ============================================
// Progress Bar Animation on Scroll
// ============================================

function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillsSection = entry.target.closest('#skills');
        if (skillsSection) {
          const bars = skillsSection.querySelectorAll('.progress-bar-fill');
          bars.forEach(bar => {
            const width = bar.style.getPropertyValue('--skill-width');
            bar.style.width = '0';
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          });
          observer.unobserve(entry.target);
        }
      }
    });
  }, { threshold: 0.5 });
  
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    observer.observe(skillsSection);
  }
}

animateProgressBars();

// ============================================
// EmailJS Integration
// ============================================

// Initialize EmailJS
emailjs.init('7c4DjU8ZXzk2P9eeJ');

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Handle form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const templateParams = {
    from_name: document.getElementById('from_name').value,
    from_email: document.getElementById('from_email').value,
    reply_to: document.getElementById('from_email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };
  
  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  emailjs.send('service_yr5bx8r', 'template_9axjm08', templateParams)
    .then(function(response) {
      console.log('Message sent successfully!', response);
      alert('Message sent successfully! I\'ll get back to you soon.');
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    })
    .catch(function(error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again or contact me directly.');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
});

// ============================================
// Intersection Observer for Fade-in Animations
// ============================================

function setupFadeInAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe project cards and highlight cards
  const cards = document.querySelectorAll('.project-card, .highlight-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
  });
}

setupFadeInAnimations();

// ============================================
// Smooth Scroll Behavior Enhancement
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ============================================
// Parallax Effect on Hero Section
// ============================================

window.addEventListener('scroll', () => {
  const hero = document.getElementById('home');
  const heroContent = document.querySelector('.hero-content');
  
  if (window.scrollY < window.innerHeight) {
    const scrollPercent = window.scrollY / window.innerHeight;
    heroContent.style.transform = `translateY(${scrollPercent * 50}px)`;
    heroContent.style.opacity = 1 - scrollPercent * 0.3;
  }
});

// ============================================
// Lazy Loading for Images
// ============================================

function setupLazyLoading() {
  const images = document.querySelectorAll('img');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '1';
        observer.unobserve(img);
      }
    });
  }, { threshold: 0.1 });
  
  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    imageObserver.observe(img);
  });
}

setupLazyLoading();

// ============================================
// Keyboard Navigation
// ============================================

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close mobile menu on Escape
    if (navMenu.classList.contains('active')) {
      navToggle.click();
    }
  }
});

// ============================================
// Accessibility: Focus Management
// ============================================

document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// ============================================
// Performance: Debounce Scroll Events
// ============================================

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

const debouncedScroll = debounce(() => {
  updateActiveLink();
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ============================================
// Page Load Animation
// ============================================

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ============================================
// Prevent Multiple Form Submissions
// ============================================

let isFormSubmitting = false;

contactForm.addEventListener('submit', function(e) {
  if (isFormSubmitting) {
    e.preventDefault();
    return;
  }
  isFormSubmitting = true;
  
  setTimeout(() => {
    isFormSubmitting = false;
  }, 3000);
});
