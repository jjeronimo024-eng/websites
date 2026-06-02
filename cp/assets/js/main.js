// Client Portal Main JavaScript
// Cyberpunk Matrix Theme

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Mobile Menu
    initializeMobileMenu();
    
    // Initialize Navbar Scroll Effect
    initializeNavbarScroll();
    
    // Initialize Card Animations
    initializeCardAnimations();
    
    // Initialize Progress Bars
    initializeProgressBars();
    
    // Initialize Status Checks
    initializeStatusChecks();
    
    // Initialize Tooltips
    initializeTooltips();
    
});

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileClose = document.querySelector('.mobile-menu-close');
    
    if (mobileToggle && mobileOverlay) {
        mobileToggle.addEventListener('click', function() {
            mobileToggle.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        });
        
        if (mobileClose) {
            mobileClose.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Close menu when clicking outside
        mobileOverlay.addEventListener('click', function(e) {
            if (e.target === mobileOverlay) {
                mobileToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Navbar Scroll Effect
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Card Hover Animations
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.cyber-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Progress Bars Animation
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.dataset.width || '0%';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Status Checks and Updates
function initializeStatusChecks() {
    // Simulate real-time status updates
    const statusElements = document.querySelectorAll('[data-status-check]');
    
    statusElements.forEach(element => {
        const service = element.dataset.statusCheck;
        checkServiceStatus(service, element);
        
        // Check every 30 seconds
        setInterval(() => {
            checkServiceStatus(service, element);
        }, 30000);
    });
}

function checkServiceStatus(service, element) {
    // Simulate API call to check service status
    setTimeout(() => {
        const statuses = ['active', 'warning', 'error'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        // In real implementation, this would be an actual API call
        updateStatusDisplay(element, randomStatus);
    }, Math.random() * 2000);
}

function updateStatusDisplay(element, status) {
    element.className = element.className.replace(/\b(active|warning|error)\b/g, '');
    element.classList.add(status);
    
    // Update status text if needed
    const statusText = element.querySelector('.status-text');
    if (statusText) {
        switch(status) {
            case 'active':
                statusText.textContent = 'OPERATIONAL';
                break;
            case 'warning':
                statusText.textContent = 'WARNING';
                break;
            case 'error':
                statusText.textContent = 'ERROR';
                break;
        }
    }
}

// Tooltip Functionality
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            showTooltip(e, this.dataset.tooltip);
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

function showTooltip(event, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'cyber-tooltip';
    tooltip.textContent = text;
    
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(10, 10, 10, 0.95);
        color: var(--cyber-neon-cyan);
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.8rem;
        border: 1px solid rgba(0, 255, 255, 0.3);
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
        z-index: 10000;
        pointer-events: none;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    // Store reference for cleanup
    window.activeTooltip = tooltip;
}

function hideTooltip() {
    if (window.activeTooltip) {
        window.activeTooltip.remove();
        window.activeTooltip = null;
    }
}

// Utility Functions
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Service Management Functions
function refreshServiceStatus(serviceId) {
    const serviceCard = document.querySelector(`[data-service-id="${serviceId}"]`);
    if (serviceCard) {
        serviceCard.classList.add('loading');
        
        // Simulate API call
        setTimeout(() => {
            serviceCard.classList.remove('loading');
            // Update service data here
        }, 1500);
    }
}

function toggleAutoRenew(serviceId, enabled) {
    const toggle = document.querySelector(`[data-auto-renew="${serviceId}"]`);
    if (toggle) {
        toggle.textContent = enabled ? 'Enabled' : 'Disabled';
        toggle.className = enabled ? 'detail-value enabled' : 'detail-value disabled';
    }
}

// Quick Actions
function openSupportTicket() {
    window.location.href = 'support/create-ticket.html';
}

function makePayment() {
    window.location.href = 'billing/pay-invoice.html';
}

function registerDomain() {
    window.location.href = 'domains/register.html';
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Client Portal Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Service Worker Registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}