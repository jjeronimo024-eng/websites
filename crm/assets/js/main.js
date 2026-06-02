// CRM Admin Main JavaScript
// Cyberpunk Matrix Theme

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Mobile Menu
    initializeMobileMenu();
    
    // Initialize Navbar Effects
    initializeNavbarEffects();
    
    // Initialize Admin Dashboard
    initializeAdminDashboard();
    
    // Initialize Real-time Updates
    initializeRealTimeUpdates();
    
    // Initialize Data Tables
    initializeDataTables();
    
    // Initialize Notifications
    initializeNotifications();
    
    // Initialize System Monitoring
    initializeSystemMonitoring();
    
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

// Enhanced Navbar Effects
function initializeNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    // Add notification badges
    updateNavigationBadges();
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

function updateNavigationBadges() {
    // Update customer count badge
    const customerLink = document.querySelector('a[href*="customers"]');
    if (customerLink) {
        customerLink.setAttribute('data-count', '1,234');
    }
    
    // Update support urgent badge
    const supportLink = document.querySelector('a[href*="support"]');
    if (supportLink) {
        supportLink.setAttribute('data-urgent', '5');
    }
}

// Admin Dashboard Initialization
function initializeAdminDashboard() {
    // Initialize metric animations
    animateMetrics();
    
    // Initialize progress bars
    animateProgressBars();
    
    // Initialize data refresh
    setupDataRefresh();
    
    // Initialize quick actions
    setupQuickActions();
}

function animateMetrics() {
    const metricNumbers = document.querySelectorAll('.metric-number');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                // Extract number and format
                const numericValue = parseFloat(finalValue.replace(/[^0-9.-]+/g, ''));
                const prefix = finalValue.replace(/[0-9.-]+/g, '');
                
                animateCounter(target, 0, numericValue, prefix, 2000);
            }
        });
    }, { threshold: 0.5 });
    
    metricNumbers.forEach(element => {
        observer.observe(element);
    });
}

function animateCounter(element, start, end, prefix, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * easeOutCubic(progress);
        
        if (end >= 1000) {
            element.textContent = prefix + formatNumber(Math.floor(current));
        } else {
            element.textContent = prefix + current.toFixed(1);
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill, .mini-progress-fill');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.dataset.width || progressBar.style.width;
                
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 300);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Real-time Updates
function initializeRealTimeUpdates() {
    // Simulate real-time data updates
    setInterval(updateSystemMetrics, 5000);
    setInterval(checkUrgentTickets, 10000);
    setInterval(updateOrderStatus, 15000);
}

function updateSystemMetrics() {
    const performanceItems = document.querySelectorAll('.performance-item');
    
    performanceItems.forEach(item => {
        const progressFill = item.querySelector('.mini-progress-fill');
        const valueElement = item.querySelector('.value');
        
        if (progressFill && valueElement) {
            // Simulate random fluctuation
            const currentValue = parseInt(valueElement.textContent);
            const variation = Math.random() * 10 - 5; // ±5%
            const newValue = Math.max(0, Math.min(100, currentValue + variation));
            
            valueElement.textContent = Math.round(newValue) + '%';
            progressFill.style.width = newValue + '%';
            
            // Update color based on value
            if (newValue > 80) {
                progressFill.classList.add('warning');
            } else {
                progressFill.classList.remove('warning');
            }
        }
    });
}

function checkUrgentTickets() {
    // Simulate checking for new urgent tickets
    const urgentCount = Math.floor(Math.random() * 10);
    const supportLink = document.querySelector('a[href*="support"]');
    
    if (supportLink) {
        supportLink.setAttribute('data-urgent', urgentCount.toString());
        
        if (urgentCount > 5) {
            showSystemAlert('High number of urgent tickets detected!', 'warning');
        }
    }
}

function updateOrderStatus() {
    const orderRows = document.querySelectorAll('.cyber-table tbody tr');
    
    orderRows.forEach(row => {
        const statusBadge = row.querySelector('.status-badge');
        
        if (statusBadge && statusBadge.textContent === 'PROCESSING') {
            // Randomly complete some processing orders
            if (Math.random() < 0.3) {
                statusBadge.textContent = 'COMPLETED';
                statusBadge.className = 'status-badge completed';
            }
        }
    });
}

// Data Tables Enhancement
function initializeDataTables() {
    const tables = document.querySelectorAll('.cyber-table');
    
    tables.forEach(table => {
        // Add sorting functionality
        const headers = table.querySelectorAll('th');
        headers.forEach(header => {
            header.addEventListener('click', function() {
                sortTable(table, Array.from(headers).indexOf(header));
            });
            header.style.cursor = 'pointer';
        });
        
        // Add row hover effects
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(255, 20, 147, 0.1)';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.background = '';
            });
        });
    });
}

function sortTable(table, columnIndex) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    const sortedRows = rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();
        
        // Try to parse as numbers
        const aNum = parseFloat(aValue.replace(/[^0-9.-]/g, ''));
        const bNum = parseFloat(bValue.replace(/[^0-9.-]/g, ''));
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return aNum - bNum;
        }
        
        return aValue.localeCompare(bValue);
    });
    
    // Clear tbody and append sorted rows
    tbody.innerHTML = '';
    sortedRows.forEach(row => tbody.appendChild(row));
}

// Notifications System
function initializeNotifications() {
    // Check for system alerts on load
    setTimeout(() => {
        showSystemAlert('Welcome to HiveNest CRM Admin Panel', 'info', 3000);
    }, 1000);
}

function showSystemAlert(message, type = 'info', duration = 5000) {
    const alert = document.createElement('div');
    alert.className = `system-alert alert-${type}`;
    
    alert.innerHTML = `
        <i class="fas fa-${getAlertIcon(type)}"></i>
        <span>${message}</span>
        <button class="alert-close">&times;</button>
    `;
    
    document.body.appendChild(alert);
    
    // Close button functionality
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.addEventListener('click', () => {
        alert.remove();
    });
    
    // Auto-remove after duration
    if (duration > 0) {
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, duration);
    }
}

function getAlertIcon(type) {
    switch(type) {
        case 'warning': return 'exclamation-triangle';
        case 'error': return 'times-circle';
        case 'success': return 'check-circle';
        default: return 'info-circle';
    }
}

// System Monitoring
function initializeSystemMonitoring() {
    // Monitor system performance
    monitorPagePerformance();
    
    // Check connection status
    monitorConnectionStatus();
    
    // Track user activity
    trackUserActivity();
}

function monitorPagePerformance() {
    // Monitor page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        if (loadTime > 3000) {
            showSystemAlert('Slow page load detected. Consider optimizing.', 'warning');
        }
    });
}

function monitorConnectionStatus() {
    window.addEventListener('online', function() {
        updateSystemStatus('online');
    });
    
    window.addEventListener('offline', function() {
        updateSystemStatus('offline');
        showSystemAlert('Connection lost. Working in offline mode.', 'warning');
    });
}

function updateSystemStatus(status) {
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.system-status');
    
    if (statusIndicator && statusText) {
        statusIndicator.className = `status-indicator ${status}`;
        
        if (status === 'online') {
            statusText.textContent = 'System Status: Operational';
        } else {
            statusText.textContent = 'System Status: Offline';
        }
    }
}

function trackUserActivity() {
    let lastActivity = Date.now();
    
    document.addEventListener('mousemove', () => {
        lastActivity = Date.now();
    });
    
    document.addEventListener('keypress', () => {
        lastActivity = Date.now();
    });
    
    // Check for inactivity every minute
    setInterval(() => {
        const inactiveTime = Date.now() - lastActivity;
        
        if (inactiveTime > 30 * 60 * 1000) { // 30 minutes
            showSystemAlert('Session will expire due to inactivity.', 'warning');
        }
    }, 60000);
}

// Tooltip System
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            showTooltip(e, this.dataset.tooltip);
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
        
        element.addEventListener('mousemove', function(e) {
            updateTooltipPosition(e);
        });
    });
}

function showTooltip(event, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'cyber-tooltip';
    tooltip.textContent = text;
    
    document.body.appendChild(tooltip);
    
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    window.activeTooltip = tooltip;
}

function updateTooltipPosition(event) {
    if (window.activeTooltip) {
        const tooltip = window.activeTooltip;
        const rect = event.target.getBoundingClientRect();
        
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    }
}

function hideTooltip() {
    if (window.activeTooltip) {
        window.activeTooltip.remove();
        window.activeTooltip = null;
    }
}

// Quick Actions Setup
function setupQuickActions() {
    const actionItems = document.querySelectorAll('.action-item');
    
    actionItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const actionType = this.href.split('/').pop().replace('.html', '');
            handleQuickAction(actionType);
        });
    });
}

function handleQuickAction(actionType) {
    switch(actionType) {
        case 'add':
            showSystemAlert('Opening customer creation form...', 'info', 2000);
            break;
        case 'process':
            showSystemAlert('Processing pending orders...', 'info', 2000);
            break;
        case 'provision':
            showSystemAlert('Service provisioning initiated...', 'info', 2000);
            break;
        case 'assign':
            showSystemAlert('Ticket assignment panel opened...', 'info', 2000);
            break;
        case 'generate':
            showSystemAlert('Generating reports...', 'info', 2000);
            break;
        case 'system':
            showSystemAlert('Opening system settings...', 'info', 2000);
            break;
        default:
            showSystemAlert(`Action: ${actionType}`, 'info', 2000);
    }
}

// Data Refresh Setup
function setupDataRefresh() {
    const refreshButtons = document.querySelectorAll('[data-refresh]');
    
    refreshButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.dataset.refresh;
            refreshData(target);
        });
    });
}

function refreshData(target) {
    const targetElement = document.querySelector(`[data-widget="${target}"]`) || 
                         document.querySelector(`.${target}-widget`);
    
    if (targetElement) {
        targetElement.classList.add('refreshing');
        
        setTimeout(() => {
            targetElement.classList.remove('refreshing');
            showSystemAlert(`${target} data refreshed successfully`, 'success', 2000);
        }, 1500);
    }
}

// Utility Functions
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
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('CRM Admin Error:', e.error);
    showSystemAlert('System error detected. Please refresh if issues persist.', 'error');
});

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + R for refresh
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        refreshData('dashboard');
    }
    
    // Ctrl/Cmd + F for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        showSystemAlert('Search functionality coming soon...', 'info', 2000);
    }
});