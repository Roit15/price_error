// Settings
const UPI_ID = "8569977977@ybl";
const WHATSAPP_NUMBER = "918569977977";

// Subscription Data — each has a `category` for filtering
const products = [
    {
        id: "gemini-pro-18m",
        name: "Gemini AI Pro + VEO3 + 5TB",
        desc: "18 Months access with Gemini 2.5 Pro, VEO3, Flow AI, NotebookLM, Workspace AI, 1000 AI credits/month, and 5TB storage.",
        originalPrice: 35100,
        price: 2999,
        icon: "assets/icons/gemini-official.svg",
        category: "ai"
    },
    {
        id: "chatgpt-plus-1m",
        name: "ChatGPT Plus (1 Month)",
        desc: "1 Month Plus personal account access on your email. Official price ₹1,999/month. Full warranty available after activation.",
        originalPrice: 1999,
        price: 549,
        icon: "assets/icons/chatgpt-official.svg",
        category: "ai"
    },
    {
        id: "notion-business-ai-3m",
        name: "Notion Business + AI (3M)",
        desc: "3 Months Business Plan + AI via customer email invite. Private access, no sharing, unlimited pages, AI writing, team workspaces, permissions, and project tools.",
        originalPrice: 12500,
        price: 999,
        icon: "assets/icons/notion-official.svg",
        category: "ai"
    },
    {
        id: "ms-office-365-pro-plus-1y",
        name: "MS Office 365 Pro Plus",
        desc: "1 Year subscription for Windows, Mac, and Android. Up to 5 devices, 100GB OneDrive, private login, and 1-year warranty.",
        originalPrice: 6899,
        price: 1999,
        icon: "assets/icons/microsoft-office-official.svg",
        category: "productivity"
    },
    {
        id: "granola-business-10-seats-12m",
        name: "Granola Business (10 Seats)",
        desc: "12 Months access for 10 business seats. AI meeting notes, summaries, action items, workspace search, Google Meet, Zoom, Teams, and shared team knowledge base.",
        originalPrice: 50000,
        price: 2999,
        icon: "assets/icons/granola-official.svg",
        category: "productivity"
    },
    {
        id: "coursera-plus-1y",
        name: "Coursera Plus (1 Year)",
        desc: "12 Months premium access activated directly on your email. Includes 10,000+ courses, unlimited certificates, professional certificates, guided projects, specializations, AI learning coach, and mobile/PC learning.",
        price: 2999,
        icon: "assets/icons/coursera-official.svg",
        category: "learning"
    },
    {
        id: "linkedin-career-premium",
        name: "LinkedIn Career Premium",
        desc: "See who viewed your profile, InMail & message anyone, job search & apply, interview prep, and salary insights.",
        originalPrice: 996,
        price: 249,
        unit: "/mo",
        icon: "assets/icons/linkedin-official.svg",
        category: "linkedin",
        termsNote: "* ₹1,499 voucher cost gives 75% off monthly billing. Pay that voucher cost directly to LinkedIn."
    },
    {
        id: "linkedin-business-premium",
        name: "LinkedIn Business Premium",
        desc: "Lead generation, advanced search filters, company insights, Sales Navigator features, and insights & analytics.",
        originalPrice: 1996,
        price: 499,
        unit: "/mo",
        icon: "assets/icons/linkedin-official.svg",
        category: "linkedin",
        termsNote: "* ₹1,499 voucher cost gives 75% off monthly billing. Pay that voucher cost directly to LinkedIn."
    },
    {
        id: "linkedin-sales-navigator-core",
        name: "LinkedIn Sales Navigator Core",
        desc: "Advanced lead search, lead & account insights, smart filters, real-time updates, and Sales Navigator Core.",
        originalPrice: 8920,
        price: 2230,
        unit: "/mo",
        icon: "assets/icons/linkedin-official.svg",
        category: "linkedin",
        termsNote: "* ₹1,499 voucher cost gives 75% off monthly billing. Pay that voucher cost directly to LinkedIn."
    },
    {
        id: "canva-1y",
        name: "Canva Pro (1 Year)",
        desc: "Design like a professional with premium templates, brand kit access, and AI tools.",
        originalPrice: 3999,
        price: 1499,
        icon: "assets/icons/canva-official.svg",
        category: "design"
    },
    {
        id: "cult-elite-1m",
        name: "Cult Elite (1 Month)",
        desc: "Achieve fitness goals with unlimited access to premium workouts and elite gym centers.",
        originalPrice: 3000,
        price: 1999,
        icon: "assets/icons/cultfit-official.svg",
        category: "fitness"
    },
    {
        id: "thyrocare-aarogyam-basic-2",
        name: "Thyrocare Aarogyam Basic 2",
        desc: "Full body health checkup at home with 90+ tests. Includes CBC, diabetes, thyroid, liver & kidney, lipid profile, iron deficiency, urine analysis, and digital reports.",
        originalPrice: 1999,
        price: 499,
        icon: "assets/icons/thyrocare-official.svg",
        category: "health"
    },
    {
        id: "sonyliv-1y",
        name: "Sony Liv (1 Year)",
        desc: "1 Year Premium Subscription. Enjoy exclusive movies, web series, and live sports ad-free.",
        originalPrice: 999,
        price: 499,
        icon: "assets/icons/sonyliv-official.svg",
        category: "entertainment"
    },
    {
        id: "prime-video-6m",
        name: "Amazon Prime Video (6M)",
        desc: "6 Months Prime Video access without ads. Watch movies, shows, and Amazon Originals.",
        originalPrice: 2000,
        price: 499,
        icon: "assets/icons/prime-video-official.svg",
        category: "entertainment"
    },
    {
        id: "zee5-1y",
        name: "Zee5 HD Premium (1 Year)",
        desc: "1 Year Premium Subscription. Stream HD movies, TV shows, and original web series.",
        originalPrice: 1999,
        price: 1499,
        icon: "assets/icons/zee5-official.svg",
        category: "entertainment"
    }
];

function getProductUrl(productId) {
    return `/deals/${productId}/`;
}

// DOM Elements
const productGrid = document.getElementById('productGrid');
const modalOverlay = document.getElementById('paymentModal');
const closeModalBtn = document.getElementById('closeModal');
const modalProductName = document.getElementById('modalProductName');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalPricePeriod = document.getElementById('modalPricePeriod');
const modalQrCode = document.getElementById('modalQrCode');
const upiIdText = document.getElementById('upiIdText');
const copyUpiBtn = document.getElementById('copyUpiBtn');
const whatsappShareBtn = document.getElementById('whatsappShareBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const categoryFilters = document.getElementById('categoryFilters');
const productSearch = document.getElementById('productSearch');
const mobileStickyBar = document.querySelector('.mobile-sticky-bar');

let selectedProduct = null;
let previouslyFocusedElement = null;
let currentCategory = 'all';
let currentSearch = '';

// ==========================================
// Intersection Observer for scroll animations
// ==========================================
const fadeOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
};

const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, fadeOptions);

// ==========================================
// Animated Number Counter
// ==========================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 1600;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            counter.textContent = current + (target >= 100 ? '+' : '');
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        requestAnimationFrame(updateCounter);
    });
}

// ==========================================
// Category Filtering
// ==========================================
if (categoryFilters) {
    categoryFilters.addEventListener('click', (e) => {
        const pill = e.target.closest('.category-pill');
        if (!pill) return;

        // Update active state
        categoryFilters.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        currentCategory = pill.getAttribute('data-category');
        filterProducts();
    });
}

if (productSearch) {
    productSearch.addEventListener('input', () => {
        currentSearch = productSearch.value.trim().toLowerCase();
        filterProducts();
    });
}

function filterProducts() {
    const cards = productGrid.querySelectorAll('.product-card');
    cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const text = card.textContent.toLowerCase();
        const matchesCategory = currentCategory === 'all' || cat === currentCategory;
        const matchesSearch = !currentSearch || text.includes(currentSearch);
        if (matchesCategory && matchesSearch) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// ==========================================
// Render Products
// ==========================================
function renderProducts() {
    productGrid.innerHTML = '';

    products.forEach((product, index) => {
        const hasOriginalPrice = Number.isFinite(product.originalPrice) && product.originalPrice > product.price;
        const discount = hasOriginalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

        // Badges
        let badgesHtml = '';
        // Urgency badges on select products
        const urgencyMap = {
            'gemini-pro-18m': 'AI Deal',
            'chatgpt-plus-1m': 'Popular',
            'notion-business-ai-3m': 'Limited',
            'ms-office-365-pro-plus-1y': '1 Year',
            'granola-business-10-seats-12m': '10 Seats',
            'coursera-plus-1y': '1 Year',
            'canva-1y': '3 Left',
            'linkedin-career-premium': 'Popular',
            'cult-elite-1m': '5 Left',
            'thyrocare-aarogyam-basic-2': '90+ Tests',
            'sonyliv-1y': 'Hot Deal',
            'prime-video-6m': 'New'
        };
        if (urgencyMap[product.id]) {
            badgesHtml += `<div class="urgency-badge">${urgencyMap[product.id]}</div>`;
        }
        if (discount > 0) {
            badgesHtml += `<div class="discount-badge">${discount}% OFF</div>`;
        }

        const card = document.createElement('article');
        card.className = 'product-card fade-up-element';
        card.setAttribute('data-category', product.category);
        card.style.transitionDelay = `${(index % 4) * 0.1}s`;

        const termsHtml = product.termsNote ? `<p class="terms-note">${product.termsNote}</p>` : '';
        const originalPriceHtml = hasOriginalPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString()}</span>` : '';

        card.innerHTML = `
      <div class="card-badges">${badgesHtml}</div>
      <div class="product-icon"><img src="${product.icon}?v=20260605-coursera" alt="${product.name} official icon" loading="lazy"></div>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-desc">${product.desc}</p>
      ${termsHtml}
      <div class="product-price-box">
        ${originalPriceHtml}
        <span class="current-price">₹${product.price.toLocaleString()}${product.unit ? `<span class="price-unit">${product.unit}</span>` : ''}</span>
      </div>
      <div class="card-actions">
        <a class="details-link" href="${getProductUrl(product.id)}">View details</a>
        <button class="buy-btn" data-id="${product.id}">Buy Now</button>
      </div>
    `;

        productGrid.appendChild(card);
        fadeObserver.observe(card);
    });

    // Buy button listeners
    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.closest('.buy-btn').getAttribute('data-id');
            openModal(productId);
        });
    });

    // Observe step cards
    document.querySelectorAll('.step-card').forEach((step, index) => {
        step.classList.add('fade-up-element');
        step.style.transitionDelay = `${index * 0.15}s`;
        fadeObserver.observe(step);
    });

    // Observe testimonials
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.12}s`;
        fadeObserver.observe(card);
    });
}

// ==========================================
// Card Tilt Effect on Mouse Move
// ==========================================
function initCardTilt() {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ==========================================
// Modal Logic
// ==========================================
function openModal(productId) {
    selectedProduct = products.find(p => p.id === productId);
    if (!selectedProduct) return;

    previouslyFocusedElement = document.activeElement;

    modalProductName.textContent = selectedProduct.name;
    modalProductPrice.textContent = selectedProduct.price.toLocaleString();
    if (modalPricePeriod) modalPricePeriod.textContent = selectedProduct.unit ? ' /month' : '';
    upiIdText.textContent = UPI_ID;

    modalQrCode.src = `assets/payment-qr.jpg?v=20260601-qr-clean`;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => closeModalBtn.focus(), 100);
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    selectedProduct = null;
    if (previouslyFocusedElement) previouslyFocusedElement.focus();
}

// ==========================================
// Event Listeners
// ==========================================
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }

    // Focus trapping
    if (e.key === 'Tab' && modalOverlay.classList.contains('active')) {
        const focusable = modalOverlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === first) {
                last.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === last) {
                first.focus();
                e.preventDefault();
            }
        }
    }
});

copyUpiBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(UPI_ID).then(() => {
        const original = copyUpiBtn.textContent;
        copyUpiBtn.textContent = 'Copied!';
        setTimeout(() => { copyUpiBtn.textContent = original; }, 2000);
    });
});

whatsappShareBtn.addEventListener('click', () => {
    if (!selectedProduct) return;

    const btnText = whatsappShareBtn.querySelector('.btn-text');
    const original = btnText.textContent;
    btnText.textContent = "Opening WhatsApp...";
    whatsappShareBtn.style.opacity = '0.8';

    setTimeout(() => {
        const text = `Hi Price Error team! I have just paid ₹${selectedProduct.price} for *${selectedProduct.name}*. Here is my payment screenshot for verification.`;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');

        btnText.textContent = original;
        whatsappShareBtn.style.opacity = '1';
        closeModal();
    }, 600);
});

// Mobile menu toggle
if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

// Scroll to top
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
        scrollTopBtn.removeAttribute('hidden');
    } else {
        scrollTopBtn.classList.remove('visible');
        scrollTopBtn.setAttribute('hidden', 'true');
    }

    if (mobileStickyBar) {
        mobileStickyBar.classList.toggle('visible', window.scrollY > 420);
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const el = document.querySelector(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
});

// ==========================================
// Init
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initCardTilt();

    // Start counter animation once hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const statsRow = document.querySelector('.stats-row');
    if (statsRow) heroObserver.observe(statsRow);

    // Observe FAQ items for scroll animation
    document.querySelectorAll('.faq-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.08}s`;
        fadeObserver.observe(item);
    });

    // Social proof toast notifications
    initSocialProof();
});

// ==========================================
// Social Proof Toast Notifications
// ==========================================
function initSocialProof() {
    const toast = document.getElementById('socialProofToast');
    const toastText = document.getElementById('toastText');
    if (!toast || !toastText) return;

    const messages = [
        'Someone in Mumbai bought LinkedIn Career Premium',
        'Rahul from Delhi just got Canva Pro',
        'Sneha from Bangalore purchased Cult Elite',
        'Ayush from Pune bought LinkedIn Business',
        'Someone in Hyderabad got Sony Liv Premium',
        'Priya from Chennai bought Zee5 HD Premium',
        'Arjun from Jaipur got LinkedIn Sales Navigator Core',
        'Someone in Kolkata purchased Canva Pro'
    ];

    const timeAgo = ['2 mins ago', '5 mins ago', '8 mins ago', '12 mins ago', '15 mins ago'];

    let index = 0;

    function showToast() {
        const msg = messages[index % messages.length];
        const time = timeAgo[Math.floor(Math.random() * timeAgo.length)];
        toastText.textContent = `${msg} \u2022 ${time}`;
        toast.classList.add('visible');

        setTimeout(() => {
            toast.classList.remove('visible');
        }, 4000);

        index++;
    }

    // First toast after 8 seconds, then every 15 seconds
    setTimeout(() => {
        showToast();
        setInterval(showToast, 15000);
    }, 8000);
}
