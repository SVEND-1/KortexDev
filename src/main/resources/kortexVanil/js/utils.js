// ===== UTILITY FUNCTIONS =====

// Debounce
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Throttle
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format date
function formatDate(date, locale = 'ru-RU') {
    return new Date(date).toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

// Get image URL
function getImageUrl(path) {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.startsWith('data:')) return path;
    return path;
}

// Get project type from name
function getProjectType(name) {
    const lower = name.toLowerCase();
    if (lower.includes('лендинг') || lower.includes('landing')) return 'landing';
    if (lower.includes('платформ') || lower.includes('platform')) return 'platform';
    if (lower.includes('мобильн') || lower.includes('mobile')) return 'mobile';
    return 'landing';
}

// Get project type icon
function getProjectTypeIcon(name) {
    const type = getProjectType(name);
    const icons = { landing: '📄', platform: '⚙️', mobile: '📱' };
    return icons[type] || '🌐';
}

// Get project type label
function getProjectTypeLabel(name) {
    const type = getProjectType(name);
    const labels = { landing: 'Лендинг', platform: 'Платформа', mobile: 'Мобильное' };
    return labels[type] || 'Проект';
}

// Get project type badge class
function getProjectTypeBadge(name) {
    const type = getProjectType(name);
    const badges = { landing: 'landing-badge', platform: 'platform-badge', mobile: 'mobile-badge' };
    return badges[type] || 'landing-badge';
}

// Generate gradient color from string
function getGradientColor(str) {
    const colors = [
        'linear-gradient(135deg, #3d2fa0, #5a45cc)',
        'linear-gradient(135deg, #1a3a5c, #2e6fad)',
        'linear-gradient(135deg, #1a4a2e, #2d8a50)',
        'linear-gradient(135deg, #4a1a3a, #8a2d6f)'
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return colors[Math.abs(hash) % colors.length];
}