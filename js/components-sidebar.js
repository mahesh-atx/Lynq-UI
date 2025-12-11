// Components Sidebar Data and Functionality
const componentsData = {
    "Core Components": [
        "Button", "Input", "Textarea", "Checkbox", "Radio", "Switch", 
        "Card", "Container", "Divider", "Typography", "Aspect Ratio"
    ],
    "Navigation": [
        "Navbar", "Sidebar", "Tabs", "Accordion", "Breadcrumbs", 
        "Pagination", "Step Wizard"
    ],
    "Modern UI": [
        "Bento Grid", "Spotlight Card", "Hover Card", "Glass Panel", 
        "Grid Pattern", "Mesh Background", "Badge", "Avatar", 
        "Skeleton Loader", "Scroll Area", "Text Gradient", 
        "Parallax Container", "Magnetic Button"
    ],
    "Data Display": [
        "Table", "Data List", "Progress Bar", "Progress Circle", 
        "Timeline", "Statistics Card", "Code Block"
    ],
    "Complex Inputs": [
        "Select", "Combobox", "Date Picker", "Time Picker", "Slider", 
        "Range Slider", "Rating Input", "OTP Input", "Rich Text Editor", 
        "File Upload", "Image Cropper", "Color Picker"
    ],
    "Landing Page": [
        "Hero Section", "Feature Grid", "Pricing Table", "Testimonials", 
        "Logo Cloud", "Marquee", "Particle Background"
    ],
    "Utility": [
        "Toast", "Alert", "Clipboard Helper", "Error Boundary", 
        "Command Palette", "Search Bar", "Theme Switcher", 
        "Global Styles", "RTL Support"
    ],
    "AI Components": [
        "Chat Bubble", "Message List", "AI Prompt", "Markdown Renderer", 
        "Typing Indicator", "Voice Input"
    ],
    "Layout Utilities": [
        "Grid Layout", "Flex Layout", "Stack", "Section Wrapper", "Page Wrapper"
    ]
};

// Generate sidebar HTML
function generateComponentsSidebar(basePath = '') {
    let html = '';
    
    for (const [category, items] of Object.entries(componentsData)) {
        const categoryId = category.toLowerCase().replace(/\s+/g, '-');
        html += `
        <div class="sidebar-category mb-4">
            <button onclick="toggleCategory('${categoryId}')" 
                class="flex items-center justify-between w-full py-2 pl-6 pr-2 text-sm text-gray-700 hover:text-black transition-colors">
                <span class="font-medium">${category}</span>
                <i data-lucide="chevron-down" class="w-3.5 h-3.5 transition-transform category-icon" id="icon-${categoryId}"></i>
            </button>
            <ul id="cat-${categoryId}" class="category-items space-y-0.5 pl-4 overflow-hidden" style="max-height: 0; transition: max-height 0.3s ease-out;">
                ${items.map(item => {
                    const slug = item.toLowerCase().replace(/\s+/g, '-');
                    return `<li class="sidebar-item relative">
                        <a href="${basePath}components/${slug}.html" class="sidebar-link block py-1.5 pl-6 text-xs text-gray-500 hover:text-black transition-colors">${item}</a>
                    </li>`;
                }).join('')}
            </ul>
        </div>`;
    }
    
    return html;
}

// Toggle category visibility
function toggleCategory(categoryId) {
    const list = document.getElementById(`cat-${categoryId}`);
    const icon = document.getElementById(`icon-${categoryId}`);
    
    if (list.style.maxHeight === '0px' || list.style.maxHeight === '') {
        list.style.maxHeight = list.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    } else {
        list.style.maxHeight = '0px';
        icon.style.transform = 'rotate(0deg)';
    }
}

// Initialize sidebar if container exists
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('components-sidebar-container');
    if (container) {
        const basePath = container.dataset.basePath || '';
        container.innerHTML = generateComponentsSidebar(basePath);
        
        // Reinitialize Lucide icons for dynamically added content
        if (window.lucide) {
            lucide.createIcons();
        }
    }
});
