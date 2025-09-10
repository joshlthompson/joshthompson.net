// Archive data - in production, this would come from a CMS or API
const archiveData = [
    { title: "Digital Twin", url: "/content/digital-twin/digital-twin.html", date: "Apr 2024", category: "work" },
    { title: "Semifreddo", url: "/recipes/project1", date: "Nov 2024", category: "recipes" },
    { title: "Greens and Beans", url: "/notes/note1", date: "Nov 2024", category: "recipes" },
    { title: "XR Research", url: "/blog/post2", date: "Oct 2024", category: "work" },
];

// DOM elements
const archiveList = document.getElementById('archiveList');
const filterButtons = document.querySelectorAll('.filter-link');
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');

// State
let currentFilter = 'all';
let searchTerm = '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderArchiveItems();
    setupFilters();
    setupSearch();
    setupClock();
});

// Render archive items
function renderArchiveItems() {
    const filteredItems = archiveData.filter(item => {
        const matchesFilter = currentFilter === 'all' || item.category === currentFilter;
        const matchesSearch = searchTerm === '' || 
            item.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    archiveList.innerHTML = filteredItems.map(item => `
        <div class="archive-item" data-category="${item.category}">
            <a href="${item.url}">${item.title}</a>
            <span class="date">${item.date}</span>
        </div>
    `).join('');
}

// Setup filter functionality
function setupFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update filter and re-render
            currentFilter = button.dataset.category;
            renderArchiveItems();
        });
    });
}

// Setup search functionality
function setupSearch() {
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchTerm = e.target.value;
            renderArchiveItems();
        }, 300); // Debounce for 300ms
    });
    
    // Prevent form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });
}

// Clock functionality
function setupClock() {
    function updateClock() {
        const now = new Date();
        document.getElementById('hours').textContent = now.getHours().toString().padStart(2, '0');
        document.getElementById('minutes').textContent = now.getMinutes().toString().padStart(2, '0');
        document.getElementById('seconds').textContent = now.getSeconds().toString().padStart(2, '0');
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}
