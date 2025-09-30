document.addEventListener('DOMContentLoaded', function() {
  // Effet typing
  const text = "Taïse De thèse NGANGA YABIE";
  let index = 0;
  function typeEffect() {
    if (index < text.length) {
      document.getElementById("typing").textContent += text.charAt(index);
      index++;
      setTimeout(typeEffect, 120);
    }
  }
  typeEffect();

  // Initialisation du carousel
  const carouselElement = document.querySelector('#projectsCarousel');
  const carousel = bootstrap.Carousel.getOrCreateInstance(carouselElement, { interval: 3000 });
  
  // Apparition des projets au scroll
  const cards = document.querySelectorAll(".project-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.2 });
  cards.forEach(card => observer.observe(card));

  // Gestion des vidéos
  document.querySelectorAll('.video-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const videoId = btn.dataset.video;

      const modal = document.createElement('div');
      modal.style.cssText = `
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background-color: rgba(0,0,0,0.8); display: flex;
          justify-content: center; align-items: center; z-index: 1000;
      `;

      const videoContainer = document.createElement('div');
      videoContainer.style.cssText = "position: relative; width: 80%; max-width: 800px;";

      const iframe = document.createElement('iframe');
      iframe.width = "100%";
      iframe.height = "450";
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      iframe.frameBorder = "0";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;

      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = "<i class=\"bi bi-x-circle\" style=\"color:red;\" fs-1 title=\"fermer la fenetre\"></i>";
      closeBtn.style.cssText = "position:absolute; top:10px; right:10px; font-size:20px; background:none; color:white; border:none; cursor:pointer;";
      closeBtn.addEventListener('click', () => {
          modal.remove();
          carousel.cycle();
      });

      videoContainer.appendChild(iframe);
      videoContainer.appendChild(closeBtn);
      modal.appendChild(videoContainer);
      document.body.appendChild(modal);

      carousel.pause(); // stop le carousel pendant la vidéo
    });
  });
});


document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

const toggleBtn = document.querySelector('#themeToggle');

toggleBtn.addEventListener('click', () => {
  if (document.body.classList.contains('light-mode')) {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    document.querySelectorAll(".github-btn").forEach(e=>{
    e.classList.remove("btn-outline-light");
    e.classList.add("btn-outline-secondary");
    });
  } else {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    document.querySelectorAll(".github-btn").forEach(e=>{
    e.classList.remove("btn-outline-light")
    e.classList.add("btn-outline-secondary")


    })
    document.querySelectorAll(".list-group-item").forEach(e=>{
    e.classList.remove("text-light");
    e.classList.add("text-dart");
     
    });
  }
});

document.addEventListener('click', function (event) {
  const navbar = document.querySelector('.navbar-collapse');
  const isOpen = navbar.classList.contains('show');
  const isClickInsideNavbar = event.target.closest('.navbar');

  if (isOpen && !isClickInsideNavbar) {
    const bsCollapse = new bootstrap.Collapse(navbar, {
      toggle: false
    });
    bsCollapse.hide();
  }
});


