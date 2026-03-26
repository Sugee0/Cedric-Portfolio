// EmailJS initialization
emailjs.init({
  publicKey: '7c4DjU8ZXzk2P9eeJ',
});

// Verify EmailJS setup
console.log('EmailJS initialized. Version:', emailjs.version || 'Unknown');
console.log('EmailJS public key set:', !!emailjs);

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.nav-toggle');
const navbarMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navbarMenu.classList.toggle('active');
  });
}

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    navbarMenu.classList.remove('active');

    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Scrollspy - update active nav link based on scroll position
window.addEventListener('scroll', () => {
  document.querySelectorAll('section[id]').forEach(sec => {
    const top = sec.offsetTop - 120;
    if (scrollY >= top) {
      navLinks.forEach(l => l.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : 'Send Message';
    if (submitBtn) {
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
    }
    
    const templateParams = {
      from_name: document.getElementById('from_name') ? document.getElementById('from_name').value : '',
      from_email: document.getElementById('from_email') ? document.getElementById('from_email').value : '',
      reply_to: document.getElementById('from_email') ? document.getElementById('from_email').value : '',
      subject: document.getElementById('subject') ? document.getElementById('subject').value : '',
      message: document.getElementById('message') ? document.getElementById('message').value : ''
    };
    
    console.log('Sending email with params:', templateParams);
    
    // Send email via EmailJS
    emailjs.send('service_yr5bx8r', 'template_9axjm08', templateParams)
      .then(function(response) {
        console.log('EmailJS success:', response);
        alert('Message sent successfully!');
        if (contactForm) contactForm.reset();
      })
      .catch(function(error) {
        console.error('EmailJS error:', error);
        var errMsg = (error && error.text) ? error.text : (error && error.status ? 'Status: ' + error.status : 'Unknown error');
        if (String(errMsg).toLowerCase().includes('public key is invalid') || String(errMsg).toLowerCase().includes('invalid public key')) {
          alert('Failed to send message: Invalid EmailJS Public Key. Please check your EmailJS dashboard and update the key in script.js.');
        } else if (String(errMsg).toLowerCase().includes('service') || String(errMsg).toLowerCase().includes('template')) {
          alert('Failed to send message: Invalid Service or Template ID. Please verify your EmailJS configuration.');
        } else {
          alert('Failed to send message. Check console for details. Error: ' + errMsg);
        }
      })
      .finally(function() {
        // Reset button state
        if (submitBtn) {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      });
  });
}
