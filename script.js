// ============================================
// EQUILIBRIO FEM - JAVASCRIPT
// Proyecto: Universidad Santa María - Diagramación
// Integrantes: Jenny Aldana, Marianella Angarita, Mariangela Velasco
// Docente: Edgar Cárdenas | 5to Semestre - Sección A
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== MENÚ MÓVIL =====
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // ===== NAVEGACIÓN ACTIVA AL SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ===== CHAT WIDGET =====
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const chatBadge = document.querySelector('.chat-badge');
    
    if (chatToggle && chatWindow) {
        // Abrir/cerrar chat
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
            if (chatWindow.classList.contains('active') && chatBadge) {
                chatBadge.style.display = 'none';
            }
        });
    }
    
    if (chatClose) {
        chatClose.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });
    }
    
    // Respuestas automáticas del bot
    const botResponses = {
        'hola': '¡Hola! 💕 ¿Cómo te sientes hoy?',
        'ansiedad': 'Entiendo. La ansiedad es más común de lo que crees. Te recomiendo visitar nuestra sección "Explora tu mente" para aprender técnicas de respiración. 🌸',
        'triste': 'Lamento que te sientas así. Recuerda que está bien no estar bien. ¿Quieres que te comparta algunas líneas de ayuda? 💚',
        'ayuda': '¡Claro! En "Aquí te ayudamos" encontrarás recursos descargables y contactos de profesionales. 🤝',
        'gracias': '¡De nada! Estamos aquí para ti siempre. 💕',
        'default': 'Gracias por escribirnos. Una de nosotras te responderá pronto. Mientras tanto, explora nuestras secciones. 🌸'
    };
    
    function getBotResponse(message) {
        const lowerMsg = message.toLowerCase();
        for (let key in botResponses) {
            if (key !== 'default' && lowerMsg.includes(key)) {
                return botResponses[key];
            }
        }
        return botResponses['default'];
    }
    
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (message) {
                addMessage(message, 'user');
                chatInput.value = '';
                
                // Simular respuesta del bot
                setTimeout(() => {
                    const response = getBotResponse(message);
                    addMessage(response, 'bot');
                }, 1000);
            }
        });
    }
    
    // ===== FORMULARIO DE HISTORIAS =====
    const storyForm = document.getElementById('storyForm');
    
    if (storyForm) {
        storyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por compartir tu historia! 💕 Será revisada y publicada pronto.');
            storyForm.reset();
        });
    }
    
    // ===== BOTONES DE DESCARGA =====
    document.querySelectorAll('.btn-download, .btn-download-sm, .btn-download-big').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('🌸 La descarga comenzará pronto. ¡Gracias por tu interés!');
        });
    });
    
    // ===== BOTONES "LEER MÁS" =====
    document.querySelectorAll('.btn-read').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const cardTitle = e.target.parentElement.querySelector('h3').textContent;
            alert(`📖 Artículo completo sobre "${cardTitle}" - Próximamente disponible`);
        });
    });
    
    // ===== CARRUSEL PUBLICITARIO =====
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselDots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let carouselInterval;
    
    function showSlide(index) {
        carouselSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (carouselDots[i]) {
                carouselDots[i].classList.remove('active');
            }
        });
        
        if (carouselSlides[index]) {
            carouselSlides[index].classList.add('active');
        }
        if (carouselDots[index]) {
            carouselDots[index].classList.add('active');
        }
        currentSlide = index;
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % carouselSlides.length;
        showSlide(nextIndex);
    }
    
    function startCarousel() {
        carouselInterval = setInterval(nextSlide, 4000); // Cambia cada 4 segundos
    }
    
    function resetCarousel() {
        clearInterval(carouselInterval);
        startCarousel();
    }
    
    // Click en los dots
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetCarousel();
        });
    });
    
    // Iniciar carrusel automáticamente
    if (carouselSlides.length > 0) {
        startCarousel();
    }
    
    // ===== ANIMACIÓN AL SCROLL =====
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
    
    document.querySelectorAll('.content-card, .wellness-card, .story-card, .resource-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // ===== EFECTO PARALLAX SUAVE EN HERO =====
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        if (hero && scrolled < 600) {
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });
    
    console.log('🌸 Equilibrio Fem - Sitio cargado correctamente');
    console.log('💕 Proyecto de Diagramación - Universidad Santa María');
    console.log('👩‍🎓 Jenny Aldana, Marianella Angarita, Mariangela Velasco');
    console.log('👨‍🏫 Docente: Edgar Cárdenas | 5to Semestre - Sección A');
});
