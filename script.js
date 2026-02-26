// Settings
const UPI_ID = "8569977977-2@ybl";
const WHATSAPP_NUMBER = "918569977977";

// Subscription Data
const products = [
    {
        id: "linkedin-carrier-12m",
        name: "LinkedIn Career (12M)",
        desc: "12 Months Career Premium. Unlock InMails, see who viewed your profile, and gain premium insights.",
        originalPrice: 15000,
        price: 3499,
        icon: "💼"
    },
    {
        id: "linkedin-carrier-3m",
        name: "LinkedIn Career (3M)",
        desc: "3 Months Career Premium. Short-term boost for your job search network.",
        originalPrice: 4500,
        price: 1499,
        icon: "💼"
    },
    {
        id: "linkedin-business-2m",
        name: "LinkedIn Business (2M)",
        desc: "2 Months Business Premium. Enhance your business presence and networking capabilities.",
        originalPrice: 6000,
        price: 1599,
        icon: "🏢"
    },
    {
        id: "linkedin-sales-nav-2m",
        name: "LinkedIn Sales Navigator",
        desc: "2 Months Core access. Powerful tools for sales professionals. (New users only)",
        originalPrice: 12000,
        price: 1599,
        icon: "🧭"
    },
    {
        id: "canva-1y",
        name: "Canva Pro (1 Year)",
        desc: "Design like a professional with premium templates, brand kit access, and AI tools.",
        originalPrice: 3999,
        price: 6000,
        icon: "✨"
    },
    {
        id: "cult-elite-1m",
        name: "Cult Elite (1 Month)",
        desc: "Achieve fitness goals with unlimited access to premium workouts and elite gym centers.",
        originalPrice: 3000,
        price: 1999,
        icon: "🏋️‍♂️"
    },
    {
        id: "sonyliv-1y",
        name: "Sony Liv (1 Year)",
        desc: "1 Year Premium Subscription. Enjoy exclusive movies, web series, and live sports ad-free.",
        originalPrice: 999,
        price: 499,
        icon: "🎬"
    },
    {
        id: "zee5-1y",
        name: "Zee5 HD Premium (1 Year)",
        desc: "1 Year Premium Subscription. Stream HD movies, TV shows, and original web series.",
        originalPrice: 1999,
        price: 1499,
        icon: "🍿"
    }
];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const modalOverlay = document.getElementById('paymentModal');
const closeModalBtn = document.getElementById('closeModal');
const modalProductName = document.getElementById('modalProductName');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalQrCode = document.getElementById('modalQrCode');
const upiIdText = document.getElementById('upiIdText');
const copyUpiBtn = document.getElementById('copyUpiBtn');
const whatsappShareBtn = document.getElementById('whatsappShareBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const scrollTopBtn = document.getElementById('scrollTopBtn');

let selectedProduct = null;
let previouslyFocusedElement = null;

// Initialize Products
function renderProducts() {
    productGrid.innerHTML = '';

    products.forEach((product, index) => {
        // Add simple staggered animation delay to cards
        const delay = index * 0.1;
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        const badgeHtml = discount > 0 ? `<div style="position:absolute; top:15px; right:15px; background:var(--accent-primary); color:#0a0a0b; padding:4px 10px; border-radius:20px; font-weight:800; font-size:0.8rem;">${discount}% OFF</div>` : '';

        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animation = `fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s backwards`;

        card.innerHTML = `
      ${badgeHtml}
      <div class="product-icon" role="img" aria-label="${product.name} icon">${product.icon}</div>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-desc">${product.desc}</p>
      <div class="product-price-box">
        <span class="original-price">₹${product.originalPrice.toLocaleString()}</span>
        <span class="current-price">₹${product.price.toLocaleString()}</span>
      </div>
      <button class="buy-btn" data-id="${product.id}">Buy Now</button>
    `;

        productGrid.appendChild(card);
    });

    // Attach event listeners to buy buttons
    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            openModal(productId);
        });
    });
}

// Modal Logic
function openModal(productId) {
    selectedProduct = products.find(p => p.id === productId);
    if (!selectedProduct) return;

    previouslyFocusedElement = document.activeElement;

    // Populate Details
    modalProductName.textContent = selectedProduct.name;
    modalProductPrice.textContent = selectedProduct.price.toLocaleString();
    upiIdText.textContent = UPI_ID;

    // Construct UPI URL string (in case it's needed elsewhere or for deep linking on mobile later)
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=Price%20Error&am=${selectedProduct.price}&cu=INR`;
    modalQrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scrolling

    // Set focus to the first interactive element in modal
    setTimeout(() => closeModalBtn.focus(), 100);
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    selectedProduct = null;
    if (previouslyFocusedElement) previouslyFocusedElement.focus();
}

// Event Listeners
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }

    // Focus trapping
    if (e.key === 'Tab' && modalOverlay.classList.contains('active')) {
        const focusableElements = modalOverlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else { // Tab
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});

copyUpiBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(UPI_ID).then(() => {
        const originalText = copyUpiBtn.textContent;
        copyUpiBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyUpiBtn.textContent = originalText;
        }, 2000);
    });
});

whatsappShareBtn.addEventListener('click', () => {
    if (!selectedProduct) return;

    const btnTextSpan = whatsappShareBtn.querySelector('.btn-text');
    const originalText = btnTextSpan.textContent;
    btnTextSpan.textContent = "Opening WhatsApp...";
    whatsappShareBtn.style.opacity = '0.8';

    setTimeout(() => {
        const text = `Hi Price Error team! I have just paid ₹${selectedProduct.price} for *${selectedProduct.name}*. Here is my payment screenshot for verification.`;
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');

        btnTextSpan.textContent = originalText;
        whatsappShareBtn.style.opacity = '1';
        closeModal();
    }, 800);
});

// Mobile menu toggle
if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true' || false;
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('open');
    });

    // Close menu when clicking a link
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
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
