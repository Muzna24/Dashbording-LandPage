// Navigation Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Modal Functionality
const modal = document.getElementById('articleModal');
const addArticleBtn = document.getElementById('addArticleBtn');
const closeModal = document.querySelector('.close-modal');
const articleForm = document.getElementById('articleForm');
const articlesGrid = document.getElementById('articlesGrid');

// Open Modal
addArticleBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Close Modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close Modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Handle Article Form Submission
articleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('articleTitle').value;
    const date = document.getElementById('articleDate').value;
    const excerpt = document.getElementById('articleExcerpt').value;
    const link = document.getElementById('articleLink').value || '#';
    const icon = document.getElementById('articleIcon').value || '📄';
    
    // Format date (Arabic when page is RTL)
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    const formattedDate = new Date(date).toLocaleDateString(isRTL ? 'ar' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Create new article card
    const articleCard = document.createElement('article');
    articleCard.className = 'article-card';
    articleCard.innerHTML = `
        <div class="article-image">
            <div class="article-image-placeholder">${icon}</div>
        </div>
        <div class="article-content">
            <span class="article-date">${formattedDate}</span>
            <h3 class="article-title">${title}</h3>
            <p class="article-excerpt">${excerpt}</p>
            <a href="${link}" class="article-link">Read More →</a>
        </div>
    `;
    
    // Add to grid (prepend to show newest first)
    articlesGrid.insertBefore(articleCard, articlesGrid.firstChild);
    
    // Reset form
    articleForm.reset();
    
    // Close modal
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Scroll to new article
    articleCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Add fade-in animation
    articleCard.style.opacity = '0';
    articleCard.style.transform = 'translateY(20px)';
    setTimeout(() => {
        articleCard.style.transition = 'all 0.5s ease';
        articleCard.style.opacity = '1';
        articleCard.style.transform = 'translateY(0)';
    }, 10);
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe dashboard cards and article cards
document.querySelectorAll('.dashboard-card, .article-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Handle Tableau Dashboard Responsiveness
function resizeTableauDashboards() {
    const iframes = document.querySelectorAll('.dashboard-embed iframe');
    iframes.forEach(iframe => {
        // Maintain aspect ratio or adjust as needed
        const container = iframe.parentElement;
        if (window.innerWidth < 768) {
            iframe.style.height = '400px';
        } else {
            iframe.style.height = '600px';
        }
    });
}

window.addEventListener('resize', resizeTableauDashboards);
resizeTableauDashboards();

// Add loading state for dashboards
document.querySelectorAll('.dashboard-embed iframe').forEach(iframe => {
    iframe.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    iframe.style.opacity = '0';
    iframe.style.transition = 'opacity 0.3s ease';
});

// Console welcome message
console.log('%cResearch Dashboard', 'color: #5A2D82; font-size: 24px; font-weight: bold;');
console.log('%cWelcome! This dashboard is ready for your Tableau visualizations and articles.', 'color: #0071BC; font-size: 14px;');


// team section

function openModal(btn) {
    const modal = document.getElementById("bioModal");
    const modalName = document.getElementById("modalName");
    const modalText = document.getElementById("modalFullText");
    
    // Find the name and bio inside the clicked card
    const card = btn.closest('.team-card');
    const name = card.querySelector('.member-name').innerText;
    const fullBio = card.querySelector('.member-desc').innerText;
    
    modalName.innerText = name;
    modalText.innerText = fullBio;
    modal.style.display = "block";
}

// Close the modal when clicking X or outside the box
window.onclick = function(event) {
    const modal = document.getElementById("bioModal");
    const closeBtn = document.querySelector(".close-modal");
    if (event.target == modal || event.target == closeBtn) {
        modal.style.display = "none";
    }
}