import { getPosts } from './db.js';

async function init() {
    console.log("FAZNET System Initializing...");
    
    // Load Posts
    const postsContainer = document.getElementById('blog-posts');
    if (postsContainer) {
        const posts = await getPosts();
        renderPosts(posts, postsContainer);
    }

    // Add glitch sound effect placeholder (logic for future)
    document.querySelectorAll('.glitch').forEach(el => {
        el.addEventListener('mouseover', () => {
            // Play static sound?
        });
    });
}

function renderPosts(posts, container) {
    container.innerHTML = '';
    posts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'post-card';
        article.innerHTML = `
            <div class="post-image" style="background-image: url('${post.image || 'assets/placeholder.png'}');"></div>
            <div class="post-content">
                <span class="post-category">${post.category}</span>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <a href="post.html?id=${post.id}" class="read-more">Decrypt Full Report</a>
            </div>
        `;
        container.appendChild(article);
    });
}

// Global Glitch Text Effect
function applyTextGlitch() {
    const titles = document.querySelectorAll('.glitch');
    titles.forEach(title => {
        const originalText = title.innerText;
        title.setAttribute('data-text', originalText);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    applyTextGlitch();
});
