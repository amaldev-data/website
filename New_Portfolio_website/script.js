// Initialize Feather Icons
feather.replace();

// ==========================================
// Preloader
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const equations = document.querySelectorAll('.math-equations .eq');
    let eqIndex = 0;

    if (preloader && equations.length > 0) {
        // Cycle equations
        const eqInterval = setInterval(() => {
            equations.forEach(eq => eq.classList.remove('active'));
            eqIndex = (eqIndex + 1) % equations.length;
            equations[eqIndex].classList.add('active');
        }, 1200); // Change equation every 1200ms

        // Hide preloader after 5s
        setTimeout(() => {
            clearInterval(eqInterval);
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500); // Wait for transition
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
const typewriterTexts = ["Data Scientist", "Business Intelligence", "Data Analyst"];
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

// Certificate Modal
const certBtns = document.querySelectorAll('.view-cert-btn');
const certModalBody = document.getElementById('cert-modal-body');

certBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.currentTarget;
        const title = card.querySelector('h4').innerText;
        const issuer = card.querySelector('p').innerText;
        
        certModalBody.innerHTML = `
            <div style="text-align: center;">
                <div style="width: 100px; height: 100px; margin: 0 auto 2rem; border-radius: 50%; border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center;">
                    <i data-feather="award" style="width: 50px; height: 50px;"></i>
                </div>
                <h2>${title}</h2>
                <p style="color: var(--text-secondary); margin-top: 0.5rem; font-size: 1.1rem;">${issuer}</p>
                <div style="margin-top: 2rem; padding: 2rem; border: 1px dashed var(--border-color); border-radius: 8px;">
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">Certificate preview placeholder.</p>
                </div>
            </div>
        `;
        
        feather.replace();
        certModal.classList.add('active');
    });
});


