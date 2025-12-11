// Shared Sidebar Component
// This file generates the sidebar HTML dynamically to avoid duplication across pages

function generateSidebar(activePage = '') {
    const basePath = window.location.pathname.includes('/guide/') ? '' : 'guide/';
    const rootPath = window.location.pathname.includes('/guide/') ? '../' : '';
    
    return `
        <div class="space-y-8">
            <!-- Guide Section -->
            <div class="sidebar-group">
                <div class="flex items-center gap-2 mb-4">
                    <i data-lucide="book-open" class="w-4 h-4 text-gray-500"></i>
                    <span class="text-xs text-gray-500 font-medium">Guide</span>
                </div>
                <ul class="space-y-0.5">
                    <li class="sidebar-item ${activePage === 'introduction' ? 'active' : 'relative'}">
                        <a href="${basePath}introduction.html" class="sidebar-link ${activePage === 'introduction' ? 'active font-medium' : ''} block py-2 pl-6 text-sm">Introduction</a>
                    </li>
                    <li class="sidebar-item ${activePage === 'installation' ? 'active' : 'relative'}">
                        <a href="${basePath}installation.html" class="sidebar-link ${activePage === 'installation' ? 'active font-medium' : ''} block py-2 pl-6 text-sm">Installation</a>
                    </li>
                    <li class="sidebar-item ${activePage === 'roadmap' ? 'active' : 'relative'}">
                        <a href="${basePath}roadmap.html" class="sidebar-link ${activePage === 'roadmap' ? 'active font-medium' : ''} block py-2 pl-6 text-sm">Roadmap</a>
                    </li>
                </ul>
            </div>

            <!-- Components Section -->
            <div class="sidebar-group">
                <div class="flex items-center gap-2 mb-4">
                    <i data-lucide="layout-grid" class="w-4 h-4 text-gray-500"></i>
                    <span class="text-xs text-gray-500 font-medium">Components</span>
                </div>
                
                ${generateComponentCategories()}
            </div>
        </div>
    `;
}

function generateComponentCategories() {
    const categories = [
        {
            id: 'core',
            name: 'Core Components',
            items: ['Button', 'Input', 'Textarea', 'Checkbox', 'Radio', 'Switch', 'Card', 'Container', 'Divider', 'Typography', 'Aspect Ratio']
        },
        {
            id: 'navigation',
            name: 'Navigation',
            items: ['Navbar', 'Sidebar', 'Tabs', 'Accordion', 'Breadcrumbs', 'Pagination', 'Step Wizard']
        },
        {
            id: 'modern-ui',
            name: 'Modern UI',
            items: ['Bento Grid', 'Spotlight Card', 'Hover Card', 'Glass Panel', 'Grid Pattern', 'Mesh Background', 'Badge', 'Avatar', 'Skeleton Loader', 'Scroll Area', 'Text Gradient', 'Parallax Container', 'Magnetic Button']
        },
        {
            id: 'data-display',
            name: 'Data Display',
            items: ['Table', 'Data List', 'Progress Bar', 'Progress Circle', 'Timeline', 'Statistics Card', 'Code Block']
        },
        {
            id: 'complex-inputs',
            name: 'Complex Inputs',
            items: ['Select', 'Combobox', 'Date Picker', 'Time Picker', 'Slider', 'Range Slider', 'Rating Input', 'OTP Input', 'Rich Text Editor', 'File Upload', 'Image Cropper', 'Color Picker']
        },
        {
            id: 'landing-page',
            name: 'Landing Page',
            items: ['Hero Section', 'Feature Grid', 'Pricing Table', 'Testimonials', 'Logo Cloud', 'Marquee', 'Particle Background']
        },
        {
            id: 'utility',
            name: 'Utility',
            items: ['Toast', 'Alert', 'Clipboard Helper', 'Error Boundary', 'Command Palette', 'Search Bar', 'Theme Switcher', 'Global Styles', 'RTL Support']
        },
        {
            id: 'ai-components',
            name: 'AI Components',
            items: ['Chat Bubble', 'Message List', 'AI Prompt', 'Markdown Renderer', 'Typing Indicator', 'Voice Input']
        },
        {
            id: 'layout-utilities',
            name: 'Layout Utilities',
            items: ['Grid Layout', 'Flex Layout', 'Stack', 'Section Wrapper', 'Page Wrapper']
        }
    ];

    return categories.map(cat => `
        <div class="sidebar-category mb-3">
            <button onclick="toggleCategory('${cat.id}')" class="flex items-center justify-between w-full py-1.5 pl-6 pr-2 text-sm text-gray-700 hover:text-black transition-colors">
                <span class="font-medium">${cat.name}</span>
                <i data-lucide="chevron-down" class="w-3.5 h-3.5 transition-transform duration-200" id="icon-${cat.id}"></i>
            </button>
            <ul id="cat-${cat.id}" class="space-y-0.5 pl-4 overflow-hidden transition-all duration-300" style="max-height: 0;">
                ${cat.items.map(item => `
                    <li class="sidebar-item relative">
                        <a href="#" class="sidebar-link block py-1 pl-6 text-xs">${item}</a>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

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

// Initialize sidebar
function initSidebar(activePage = '') {
    const container = document.getElementById('sidebar-container');
    if (container) {
        container.innerHTML = generateSidebar(activePage);
        
        // Reinitialize Lucide icons for dynamically added content
        if (window.lucide) {
            lucide.createIcons();
        }
    }
}

// Auto-detect active page from URL
function getActivePageFromURL() {
    const path = window.location.pathname;
    if (path.includes('introduction')) return 'introduction';
    if (path.includes('installation')) return 'installation';
    if (path.includes('roadmap')) return 'roadmap';
    if (path.includes('get-started')) return 'installation';
    return '';
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const activePage = getActivePageFromURL();
    initSidebar(activePage);
});
