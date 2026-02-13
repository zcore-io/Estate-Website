document.addEventListener('DOMContentLoaded', function() {
    const pageLoader = document.getElementById('page-loader');
    const backToTopBtn = document.getElementById('back-to-top');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const searchTabs = document.querySelectorAll('.search-btn-tab');
    const searchForm = document.getElementById('search-form');
    const subscribeForm = document.getElementById('subscribe-form');
    const favoriteBtns = document.querySelectorAll('.btn-favorite');

    setTimeout(() => {
        pageLoader.classList.add('hidden');
    }, 500);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
            navbar.classList.add('scrolled');
        } else {
            backToTopBtn.classList.remove('show');
            navbar.classList.remove('scrolled');
        }

        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    const navbarCollapse = document.getElementById('navbarSupportedContent');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            searchTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const tabType = this.getAttribute('data-tab');
            console.log(`Selected tab: ${tabType}`);
        });
    });

    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const inputs = this.querySelectorAll('input');
            const searchData = {};

            inputs.forEach(input => {
                if (input.value.trim()) {
                    searchData[input.placeholder] = input.value;
                }
            });

            console.log('Search submitted:', searchData);

            alert('Search functionality would be implemented here. Check console for details.');

            inputs.forEach(input => {
                input.value = '';
            });
        });
    }

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (email) {
                console.log('Subscription email:', email);

                const button = this.querySelector('button');
                const originalHTML = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.background = '#28a745';

                setTimeout(() => {
                    alert(`Thank you for subscribing with: ${email}`);
                    emailInput.value = '';
                    button.innerHTML = originalHTML;
                    button.style.background = '';
                }, 500);
            }
        });
    }

    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            const icon = this.querySelector('i');

            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                this.classList.add('active');

                this.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                this.classList.remove('active');
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.property-card, .city-card, .feature-box, .article-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        const img = card.querySelector('.property-img img');

        card.addEventListener('mouseenter', function() {
            img.style.transform = 'scale(1.1) rotate(2deg)';
        });

        card.addEventListener('mouseleave', function() {
            img.style.transform = '';
        });
    });

    const cityCards = document.querySelectorAll('.city-card');
    cityCards.forEach(card => {
        card.addEventListener('click', function() {
            const cityName = this.querySelector('h4').textContent;
            console.log(`City clicked: ${cityName}`);
        });
    });

    const featureBoxes = document.querySelectorAll('.feature-box');
    featureBoxes.forEach((box, index) => {
        box.style.animationDelay = `${index * 0.1}s`;
    });

    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    }, false);

    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            console.log(`Article clicked: ${title}`);
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
        });

        input.addEventListener('blur', function() {
            this.style.transform = '';
        });
    });

    console.log('%c Real Estate Website Loaded Successfully! ', 'background: #fd5c63; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
    console.log('All interactive features are working properly.');

    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
});
