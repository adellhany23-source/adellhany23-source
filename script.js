// =============================================
// PORTOFOLIO HANY ADELILA MEICURY
// JAVASCRIPT - INTERAKSI & ANIMASI
// =============================================

document.addEventListener('DOMContentLoaded', function () {

    // --- HAMBURGER MENU TOGGLE ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Tutup menu saat link diklik
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Tutup menu saat klik di luar
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // --- ACTIVE LINK HIGHLIGHTING (SCROLL SPY) ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function updateActiveLink() {
        let scrollPosition = window.scrollY + 120; // offset for navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    // Set initial active on load
    updateActiveLink();

    // --- SMOOTH SCROLL FOR ANCHOR LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = 70;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- CONTACT FORM HANDLING ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Ambil data form
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validasi sederhana
            if (!name || !email || !subject || !message) {
                showFormAlert('Mohon isi semua field yang tersedia.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showFormAlert('Mohon masukkan alamat email yang valid.', 'error');
                return;
            }

            // Simulasi pengiriman berhasil
            showFormAlert('Pesan berhasil dikirim! Terima kasih telah menghubungi saya.', 'success');
            contactForm.reset();
        });

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function showFormAlert(message, type) {
            // Hapus alert yang sudah ada
            const existingAlert = document.querySelector('.form-alert');
            if (existingAlert) {
                existingAlert.remove();
            }

            const alert = document.createElement('div');
            alert.className = 'form-alert';
            alert.textContent = message;

            if (type === 'error') {
                alert.style.color = '#d32f2f';
                alert.style.background = '#fde8e8';
                alert.style.border = '1px solid #f5c6c6';
            } else {
                alert.style.color = '#0a66c2';
                alert.style.background = '#e8f0fe';
                alert.style.border = '1px solid #b8d4fe';
            }

            alert.style.padding = '12px 18px';
            alert.style.borderRadius = '8px';
            alert.style.fontSize = '0.9rem';
            alert.style.fontWeight = '500';
            alert.style.marginTop = '8px';

            contactForm.appendChild(alert);

            // Auto-hide setelah 4 detik
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.style.opacity = '0';
                    alert.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => alert.remove(), 500);
                }
            }, 4000);
        }
    }

    // --- ANIMASI SKILL BAR ON SCROLL ---
    const skillBars = document.querySelectorAll('.progress-fill');

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight - 50;

            if (barPosition < screenPosition) {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            }
        });
    }

    // Jalankan animasi saat scroll
    window.addEventListener('scroll', animateSkillBars);
    // Jalankan sekali saat load
    animateSkillBars();

    // --- STICKY NAVBAR SHADOW ON SCROLL ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

});
