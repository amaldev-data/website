// Initialize Feather Icons
feather.replace();

// ==========================================
// AI / Data Science Preloader Sequence
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Force page to start from the hero section on refresh
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const preloader = document.getElementById('preloader');
    const stepDb = document.getElementById('step-db');
    const stepStats = document.getElementById('step-stats');
    const stepNn = document.getElementById('step-nn');
    const percentText = document.getElementById('loading-percentage');

    if (preloader && stepDb && stepStats && stepNn) {
        // Global loading percentage (0 to 100 over 5.0 seconds)
        let percent = 0;
        const percentInterval = setInterval(() => {
            percent += 1;
            if (percentText) {
                percentText.textContent = `${percent}%`;
            }
            if (percent >= 100) {
                clearInterval(percentInterval);
            }
        }, 50); // 100 steps * 50ms = 5000ms

        // T = 0s: Step 1 (Database) active
        stepDb.classList.add('active');

        // T = 1.5s: Step 2 (Stats) active
        setTimeout(() => {
            stepDb.classList.remove('active');
            stepStats.classList.add('active');
        }, 1500);

        // T = 2.8s: Step 3 (CNN Feature Extraction) active
        setTimeout(() => {
            stepStats.classList.remove('active');
            stepNn.classList.add('active');
        }, 2800);

        // T = 5.0s: Hide Preloader smoothly
        setTimeout(() => {
            stepNn.classList.remove('active');
            preloader.classList.add('fade-out-smooth');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800); // Wait for CSS transition
        }, 5000);
    }
});

// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
} else {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Animate icon transition
    themeToggle.style.transform = 'rotate(360deg)';
    
    setTimeout(() => {
        updateThemeIcon(newTheme);
        themeToggle.style.transform = 'rotate(0deg)';
    }, 150);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeToggle.innerHTML = '<i data-feather="sun" class="theme-icon" style="transition: all 0.3s ease;"></i>';
    } else {
        themeToggle.innerHTML = '<i data-feather="moon" class="theme-icon" style="transition: all 0.3s ease;"></i>';
    }
    feather.replace();
}

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileMenu.classList.contains('active') ? 'x' : 'menu';
    hamburger.innerHTML = `<i data-feather="${icon}"></i>`;
    feather.replace();
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.innerHTML = '<i data-feather="menu"></i>';
        feather.replace();
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 5%';
        navbar.style.boxShadow = 'var(--shadow)';
    } else {
        navbar.style.padding = '1rem 5%';
        navbar.style.boxShadow = 'none';
    }
});

// Typewriter Effect
const typewriterTexts = ["BI Analyst","Data Analyst", "Data Scientist","Research Analyst","Data Consultant","Business Analyst"];
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter-text");

function typeWriter() {
    if (!typewriterElement) return;
    
    const currentText = typewriterTexts[currentTextIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && currentCharIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

setTimeout(typeWriter, 1000);

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    });
}, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Modals
const projectModal = document.getElementById('project-modal');
const certModal = document.getElementById('cert-modal');
const closeBtns = document.querySelectorAll('.close-modal');

// Close modals when clicking outside or on close button
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        projectModal.classList.remove('active');
        certModal.classList.remove('active');
    });
});

window.addEventListener('click', (e) => {
    if (e.target === projectModal) projectModal.classList.remove('active');
    if (e.target === certModal) certModal.classList.remove('active');
});

// Project Data
const projectData = {
    1: {
        title: "Customer Churn Prediction",
        desc: "An end-to-end machine learning pipeline to predict customer churn in a telecommunications company. The model analyzes user behavior, demographic data, and account information to identify high-risk customers.",
        tech: ["Python", "Scikit-learn", "Pandas", "XGBoost", "Flask"],
        features: [
            "Data preprocessing and feature engineering",
            "Model training and hyperparameter tuning",
            "REST API deployment",
            "Interactive dashboard for business stakeholders"
        ]
    },
    2: {
        title: "Sales Performance Dashboard",
        desc: "A comprehensive Power BI dashboard designed for regional managers to track sales performance, identify trends, and forecast future revenue based on historical data.",
        tech: ["Power BI", "SQL", "Excel", "DAX"],
        features: [
            "Real-time data integration from SQL Server",
            "Advanced DAX measures for YTD and YoY calculations",
            "Interactive drill-through reports",
            "Automated weekly PDF report generation"
        ]
    },
    3: {
        title: "RAG AI Assistant",
        desc: "A custom Retrieval-Augmented Generation (RAG) assistant built to help employees quickly find answers within the company's vast internal documentation.",
        tech: ["Python", "FastAPI", "LangChain", "OpenAI", "Pinecone"],
        features: [
            "Vector database integration for fast semantic search",
            "Context-aware response generation",
            "Streaming responses via WebSocket",
            "Admin interface for document management"
        ]
    },
    4: {
        title: "Stock Price Forecasting",
        desc: "A deep learning model using LSTM networks to forecast short-term stock price movements based on historical price data and technical indicators.",
        tech: ["TensorFlow", "Keras", "Python", "yfinance"],
        features: [
            "Time series data normalization and sequencing",
            "LSTM neural network architecture",
            "Performance evaluation using RMSE and MAE",
            "Automated daily data fetching and prediction"
        ]
    },
    5: {
        title: "Healthcare Data Analytics",
        desc: "Statistical analysis project focusing on patient outcomes and treatment efficiency across multiple hospitals, highlighting areas for operational improvement.",
        tech: ["SQL", "Python", "Seaborn", "Statsmodels"],
        features: [
            "Complex SQL queries for data aggregation",
            "Hypothesis testing (A/B testing)",
            "Visual storytelling through Seaborn charts",
            "Actionable insights report for management"
        ]
    },
    6: {
        title: "Portfolio Website",
        desc: "A modern, fully responsive personal portfolio website built without frameworks to showcase projects, skills, and professional experience.",
        tech: ["HTML5", "CSS3", "JavaScript"],
        features: [
            "Custom CSS theme system (Light/Dark mode)",
            "Intersection Observer for scroll animations",
            "Responsive layout using CSS Grid and Flexbox",
            "No dependencies (except Feather icons)"
        ]
    }
};

// Open Project Modal
const projectBtns = document.querySelectorAll('.view-project-btn');
const projectModalBody = document.getElementById('project-modal-body');

projectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const projectId = e.target.getAttribute('data-project');
        const data = projectData[projectId];
        
        if (data) {
            let techHtml = data.tech.map(t => `<span class="skill-pill" style="font-size: 0.8rem; padding: 0.2rem 0.6rem;">${t}</span>`).join('');
            let featuresHtml = data.features.map(f => `<li>${f}</li>`).join('');
            
            projectModalBody.innerHTML = `
                <div class="project-modal-header">
                    <h2>${data.title}</h2>
                    <div class="project-modal-tech">
                        ${techHtml}
                    </div>
                </div>
                <p class="project-modal-desc">${data.desc}</p>
                <div class="project-modal-features">
                    <h3>Key Features</h3>
                    <ul style="margin-top: 1rem; list-style: none;">
                        ${featuresHtml}
                    </ul>
                </div>
                <div class="modal-actions">
                    <a href="#" class="btn btn-primary"><i data-feather="github"></i> View Repository</a>
                </div>
            `;
            
            feather.replace();
            projectModal.classList.add('active');
        }
    });
});

// Certificates Data extraction
const certCards = Array.from(document.querySelectorAll('.cert-card'));
const certData = certCards.map(card => {
    return {
        src: card.querySelector('img').src,
        title: card.querySelector('h4').innerText,
        issuer: card.querySelector('p').innerText
    };
});

// Carousel Logic
const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');
const navDots = document.querySelector('.carousel-nav');

let currentIndex = 0;
let slidesVisible = getSlidesVisible();

function getSlidesVisible() {
    if (window.innerWidth <= 576) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
}

// Create dots
function createDots() {
    if (!navDots) return;
    navDots.innerHTML = '';
    const maxIndex = Math.max(0, slides.length - slidesVisible);
    for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        dot.addEventListener('click', () => moveToSlide(i));
        navDots.appendChild(dot);
    }
}

function updateDots() {
    if (!navDots) return;
    const dots = Array.from(navDots.children);
    dots.forEach(dot => dot.classList.remove('active'));
    if(dots[currentIndex]) {
        dots[currentIndex].classList.add('active');
    }
}

function moveToSlide(index) {
    if (!track) return;
    const maxIndex = Math.max(0, slides.length - slidesVisible);
    if (index < 0) index = 0;
    if (index > maxIndex) index = maxIndex;
    
    currentIndex = index;
    const amountToMove = -currentIndex * (100 / slidesVisible);
    track.style.transform = `translateX(${amountToMove}%)`;
    updateDots();
}

if (nextButton && prevButton) {
    nextButton.addEventListener('click', () => {
        const maxIndex = Math.max(0, slides.length - slidesVisible);
        if (currentIndex < maxIndex) moveToSlide(currentIndex + 1);
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) moveToSlide(currentIndex - 1);
    });
}

window.addEventListener('resize', () => {
    const newSlidesVisible = getSlidesVisible();
    if (newSlidesVisible !== slidesVisible) {
        slidesVisible = newSlidesVisible;
        createDots();
        moveToSlide(currentIndex);
    }
});
createDots();

// Certificate Modal Logic
const certModalBody = document.getElementById('cert-modal-body');
const modalPrev = document.querySelector('.modal-prev');
const modalNext = document.querySelector('.modal-next');
let currentModalIndex = 0;

function openCertModal(index) {
    currentModalIndex = index;
    updateModalContent();
    if (certModal) certModal.classList.add('active');
}

function updateModalContent() {
    if (!certModalBody || certData.length === 0) return;
    
    certModalBody.style.opacity = 0;
    certModalBody.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        const data = certData[currentModalIndex];
        certModalBody.innerHTML = `
            <div class="cert-modal-body-content">
                <img src="${data.src}" alt="${data.title}" class="cert-modal-image">
                <h2 class="cert-modal-title">${data.title}</h2>
                <p class="cert-modal-issuer">${data.issuer}</p>
            </div>
        `;
        
        if (modalPrev) modalPrev.style.display = currentModalIndex === 0 ? 'none' : 'flex';
        if (modalNext) modalNext.style.display = currentModalIndex === certData.length - 1 ? 'none' : 'flex';
        
        certModalBody.style.opacity = 1;
        certModalBody.style.transform = 'scale(1)';
    }, 250);
}

certCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        openCertModal(index);
    });
});

if (modalPrev && modalNext) {
    modalPrev.addEventListener('click', () => {
        if (currentModalIndex > 0) {
            currentModalIndex--;
            updateModalContent();
        }
    });

    modalNext.addEventListener('click', () => {
        if (currentModalIndex < certData.length - 1) {
            currentModalIndex++;
            updateModalContent();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (certModal && certModal.classList.contains('active')) {
        if (e.key === 'ArrowLeft' && currentModalIndex > 0) {
            currentModalIndex--;
            updateModalContent();
        } else if (e.key === 'ArrowRight' && currentModalIndex < certData.length - 1) {
            currentModalIndex++;
            updateModalContent();
        } else if (e.key === 'Escape') {
            certModal.classList.remove('active');
        }
    }
});

// Background Data Flow Parallax Animation
const dataElements = document.querySelectorAll('.data-element');
if (dataElements.length > 0) {
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                dataElements.forEach(el => {
                    const speed = parseFloat(el.getAttribute('data-speed')) || 0.1;
                    const yPos = -(scrolled * speed);
                    el.style.transform = `translateY(${yPos}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Background Opacity Scroll Logic
document.addEventListener('DOMContentLoaded', () => {
    const dataFlowBg = document.getElementById('data-flow-bg');
    const sections = document.querySelectorAll('.section:not(#hero):not(#contact)');
    const heroSection = document.getElementById('hero');
    const contactSection = document.getElementById('contact');
    
    window.addEventListener('scroll', () => {
        if (!dataFlowBg) return;
        
        const scrollY = window.scrollY;
        const viewportCenter = scrollY + window.innerHeight / 2;
        
        let state = 'default';
        
        if (heroSection && viewportCenter < heroSection.offsetTop + heroSection.offsetHeight) {
            state = 'default';
        } else if (contactSection && viewportCenter >= contactSection.offsetTop && viewportCenter <= contactSection.offsetTop + contactSection.offsetHeight) {
            state = 'default';
        } else {
            let inTextContent = false;
            sections.forEach(sec => {
                const secTop = sec.offsetTop;
                const secBottom = secTop + sec.offsetHeight;
                if (viewportCenter >= secTop + 100 && viewportCenter <= secBottom - 100) {
                    inTextContent = true;
                }
            });
            
            if (inTextContent) {
                state = 'dimmed';
            } else {
                state = 'bright';
            }
        }
        
        if (state === 'dimmed') {
            dataFlowBg.classList.add('dimmed');
            dataFlowBg.classList.remove('bright');
        } else if (state === 'bright') {
            dataFlowBg.classList.add('bright');
            dataFlowBg.classList.remove('dimmed');
        } else {
            dataFlowBg.classList.remove('dimmed', 'bright');
        }
    });
});
