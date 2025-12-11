// Shared Sidebar Functions
// This file provides toggle functionality for the sidebar categories

// Toggle category visibility
function toggleCategory(categoryId) {
    const list = document.getElementById(`cat-${categoryId}`);
    const icon = document.getElementById(`icon-${categoryId}`);
    
    if (!list || !icon) return;
    
    if (list.style.maxHeight === '0px' || list.style.maxHeight === '') {
        list.style.maxHeight = list.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    } else {
        list.style.maxHeight = '0px';
        icon.style.transform = 'rotate(0deg)';
    }
}

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        lucide.createIcons();
    }
});
