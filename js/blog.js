// Blog Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Article Filtering
    const categoryTabs = document.querySelectorAll('.category-tab');
    const articleCards = document.querySelectorAll('.article-card');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter article cards
            articleCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Search Functionality
    const searchForm = document.getElementById('blog-search');
    const searchInput = document.querySelector('.search-input');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // Show all articles if search is empty
                articleCards.forEach(card => {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
                return;
            }
            
            // Search through articles
            let foundResults = false;
            
            articleCards.forEach(card => {
                const title = card.querySelector('.article-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.article-excerpt')?.textContent.toLowerCase() || '';
                const tags = card.getAttribute('data-tags')?.toLowerCase() || '';
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm) || tags.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    foundResults = true;
                    
                    // Highlight search term
                    highlightSearchTerm(card, searchTerm);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Show no results message
            showSearchResultsMessage(foundResults, searchTerm);
        });
    }
    
    function highlightSearchTerm(card, term) {
        const elements = card.querySelectorAll('.article-title, .article-excerpt');
        
        elements.forEach(element => {
            const originalText = element.textContent;
            const regex = new RegExp(`(${term})`, 'gi');
            const highlightedText = originalText.replace(regex, '<mark>$1</mark>');
            element.innerHTML = highlightedText;
        });
    }
    
    function showSearchResultsMessage(foundResults, searchTerm) {
        let messageContainer = document.querySelector('.search-results-message');
        
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.className = 'search-results-message';
            document.querySelector('.articles-container').parentNode.insertBefore(messageContainer, document.querySelector('.articles-container'));
        }
        
        if (!foundResults) {
            messageContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No results found for "${searchTerm}"</h3>
                    <p>Try searching with different keywords or browse our categories.</p>
                    <button class="btn btn-outline" id="clear-search">Clear Search</button>
                </div>
            `;
            
            // Add clear search functionality
            document.getElementById('clear-search').addEventListener('click', function() {
                searchInput.value = '';
                messageContainer.remove();
                articleCards.forEach(card => {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    
                    // Remove highlighting
                    const elements = card.querySelectorAll('.article-title, .article-excerpt');
                    elements.forEach(element => {
                        element.innerHTML = element.textContent;
                    });
                });
            });
        } else {
            messageContainer.innerHTML = `
                <div class="results-found">
                    <p>Showing results for: <strong>"${searchTerm}"</strong></p>
                    <button class="btn-text" id="clear-search">Clear search</button>
                </div>
            `;
            
            document.getElementById('clear-search').addEventListener('click', function() {
                searchInput.value = '';
                messageContainer.remove();
                articleCards.forEach(card => {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    
                    // Remove highlighting
                    const elements = card.querySelectorAll('.article-title, .article-excerpt');
                    elements.forEach(element => {
                        element.innerHTML = element.textContent;
                    });
                });
            });
        }
    }
    
    // Sort Articles
    const sortSelect = document.getElementById('sort-by');
    const articlesContainer = document.querySelector('.articles-container');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            const articles = Array.from(articlesContainer.querySelectorAll('.article-card'));
            
            // Sort articles based on selected option
            articles.sort((a, b) => {
                switch(sortBy) {
                    case 'latest':
                        // Sort by date (newest first)
                        const dateA = new Date(a.querySelector('.date').textContent);
                        const dateB = new Date(b.querySelector('.date').textContent);
                        return dateB - dateA;
                        
                    case 'oldest':
                        // Sort by date (oldest first)
                        const dateAOld = new Date(a.querySelector('.date').textContent);
                        const dateBOld = new Date(b.querySelector('.date').textContent);
                        return dateAOld - dateBOld;
                        
                    case 'popular':
                        // Sort by views (highest first)
                        const viewsA = parseInt(a.querySelector('.stat:nth-child(1)')?.textContent?.replace(/[^0-9]/g, '') || '0');
                        const viewsB = parseInt(b.querySelector('.stat:nth-child(1)')?.textContent?.replace(/[^0-9]/g, '') || '0');
                        return viewsB - viewsA;
                        
                    case 'trending':
                        // Sort by combination of views and recency
                        const dateATrend = new Date(a.querySelector('.date').textContent);
                        const dateBTrend = new Date(b.querySelector('.date').textContent);
                        const daysDiff = Math.abs(dateATrend - dateBTrend) / (1000 * 60 * 60 * 24);
                        const viewsATrend = parseInt(a.querySelector('.stat:nth-child(1)')?.textContent?.replace(/[^0-9]/g, '') || '0');
                        const viewsBTrend = parseInt(b.querySelector('.stat:nth-child(1)')?.textContent?.replace(/[^0-9]/g, '') || '0');
                        
                        // Simple trending score (views per day since publication)
                        const scoreA = viewsATrend / Math.max(1, daysDiff);
                        const scoreB = viewsBTrend / Math.max(1, daysDiff);
                        return scoreB - scoreA;
                        
                    default:
                        return 0;
                }
            });
            
            // Reorder articles in container
            articles.forEach(article => {
                articlesContainer.appendChild(article);
            });
        });
    }
    
    // Save Article Functionality
    const saveButtons = document.querySelectorAll('.save-article');
    
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const articleCard = this.closest('.article-card');
            const articleTitle = articleCard.querySelector('.article-title').textContent;
            const articleLink = articleCard.querySelector('.read-link').getAttribute('href');
            
            this.classList.toggle('saved');
            this.innerHTML = this.classList.contains('saved') 
                ? '<i class="fas fa-bookmark"></i>' 
                : '<i class="far fa-bookmark"></i>';
            
            // Show notification
            showNotification(
                this.classList.contains('saved') 
                    ? `"${articleTitle}" saved for later` 
                    : `"${articleTitle}" removed from saved`,
                this.classList.contains('saved') ? 'success' : 'info'
            );
            
            // Store in localStorage
            const savedArticles = JSON.parse(localStorage.getItem('kvbSavedArticles') || '[]');
            
            if (this.classList.contains('saved')) {
                // Add to saved
                if (!savedArticles.some(article => article.link === articleLink)) {
                    savedArticles.push({
                        title: articleTitle,
                        link: articleLink,
                        date: new Date().toISOString()
                    });
                    localStorage.setItem('kvbSavedArticles', JSON.stringify(savedArticles));
                }
            } else {
                // Remove from saved
                const filteredArticles = savedArticles.filter(article => article.link !== articleLink);
                localStorage.setItem('kvbSavedArticles', JSON.stringify(filteredArticles));
            }
        });
        
        // Check if article is already saved
        const articleCard = button.closest('.article-card');
        const articleLink = articleCard.querySelector('.read-link').getAttribute('href');
        const savedArticles = JSON.parse(localStorage.getItem('kvbSavedArticles') || '[]');
        
        if (savedArticles.some(article => article.link === articleLink)) {
            button.classList.add('saved');
            button.innerHTML = '<i class="fas fa-bookmark"></i>';
        }
    });
    
    function showNotification(message, type) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification-toast');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification-toast ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
    
    // Load More Articles
    const loadMoreBtn = document.getElementById('loadMoreArticles');
    const allArticleCards = Array.from(document.querySelectorAll('.article-card'));
    let visibleArticles = 6; // Initial number of visible articles
    
    if (loadMoreBtn) {
        // Initially hide extra articles
        allArticleCards.forEach((article, index) => {
            if (index >= visibleArticles) {
                article.style.display = 'none';
            }
        });
        
        loadMoreBtn.addEventListener('click', function() {
            // Show next set of articles
            const nextArticles = allArticleCards.slice(visibleArticles, visibleArticles + 3);
            
            nextArticles.forEach(article => {
                article.style.display = 'block';
                setTimeout(() => {
                    article.style.opacity = '1';
                    article.style.transform = 'translateY(0)';
                }, 10);
            });
            
            visibleArticles += 3;
            
            // Hide button if all articles are visible
            if (visibleArticles >= allArticleCards.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
    
    // Newsletter Subscription
    const newsletterForm = document.getElementById('knowledge-newsletter');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                if (key === 'interests') {
                    if (!formObject[key]) formObject[key] = [];
                    formObject[key].push(value);
                } else {
                    formObject[key] = value;
                }
            });
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Success message
                const successMessage = document.createElement('div');
                successMessage.className = 'newsletter-success';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h4>Successfully Subscribed!</h4>
                        <p>Thank you for subscribing to the KVB Knowledge Center newsletter. You'll receive our next update in your inbox.</p>
                        <p>A confirmation email has been sent to <strong>${formObject.email}</strong></p>
                    </div>
                `;
                
                // Insert success message
                newsletterForm.parentNode.insertBefore(successMessage, newsletterForm);
                newsletterForm.style.display = 'none';
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Store subscription in localStorage
                const subscriptions = JSON.parse(localStorage.getItem('kvbNewsletterSubscriptions') || '[]');
                subscriptions.push({
                    email: formObject.email,
                    name: formObject.name,
                    interests: formObject.interests || [],
                    date: new Date().toISOString()
                });
                localStorage.setItem('kvbNewsletterSubscriptions', JSON.stringify(subscriptions));
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1500);
        });
    }
    
    // Download Tracking
    const downloadLinks = document.querySelectorAll('.resource-link, .download-link');
    
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const resourceName = this.textContent.trim();
            console.log(`Resource downloaded: ${resourceName}`);
            // Here you can send analytics data
            
            // Show download notification
            showNotification(`Downloading: ${resourceName}`, 'info');
        });
    });
    
    // Add page-specific styles
    if (!document.querySelector('#blog-styles')) {
        const styles = document.createElement('style');
        styles.id = 'blog-styles';
        styles.textContent = `
            /* Blog page specific styles */
            .blog-hero {
                padding: 120px 0 80px;
                background: linear-gradient(135deg, var(--deep-blue) 0%, var(--eco-green) 100%);
                color: white;
                text-align: center;
            }
            
            .blog-hero .hero-subtitle {
                font-size: 1.5rem;
                margin-bottom: 20px;
                opacity: 0.9;
            }
            
            .blog-hero .hero-description {
                max-width: 800px;
                margin: 0 auto 40px;
                font-size: 1.1rem;
                line-height: 1.6;
                opacity: 0.8;
            }
            
            .hero-search {
                max-width: 700px;
                margin: 40px auto 0;
            }
            
            .search-form {
                display: flex;
                margin-bottom: 20px;
            }
            
            .search-input {
                flex: 1;
                padding: 15px 20px;
                border: none;
                border-radius: 10px 0 0 10px;
                font-size: 1rem;
                font-family: var(--body-font);
            }
            
            .search-input:focus {
                outline: none;
            }
            
            .search-btn {
                background: var(--solar-yellow);
                color: var(--dark-charcoal);
                border: none;
                padding: 0 30px;
                border-radius: 0 10px 10px 0;
                cursor: pointer;
                font-size: 1.2rem;
                transition: background 0.3s ease;
            }
            
            .search-btn:hover {
                background: var(--accent-orange);
                color: white;
            }
            
            .search-tags {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                gap: 10px;
                justify-content: center;
            }
            
            .search-tags span {
                color: rgba(255, 255, 255, 0.8);
                font-size: 0.9rem;
            }
            
            .search-tags a {
                color: white;
                text-decoration: none;
                padding: 5px 15px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            }
            
            .search-tags a:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-2px);
            }
            
            .blog-categories {
                padding: 40px 0;
                background: white;
                border-bottom: 1px solid var(--light-gray);
                position: sticky;
                top: 80px;
                z-index: 90;
            }
            
            .category-tabs {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                justify-content: center;
            }
            
            .category-tab {
                padding: 10px 20px;
                background: var(--light-gray);
                border: 2px solid var(--light-gray);
                border-radius: 50px;
                font-family: var(--heading-font);
                font-weight: 600;
                color: var(--medium-gray);
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9rem;
            }
            
            .category-tab:hover {
                border-color: var(--solar-yellow);
                color: var(--dark-charcoal);
            }
            
            .category-tab.active {
                background: var(--solar-yellow);
                border-color: var(--solar-yellow);
                color: var(--dark-charcoal);
            }
            
            .featured-articles {
                padding: 80px 0 40px;
                background: var(--light-gray);
            }
            
            .featured-grid {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 40px;
                margin-top: 40px;
            }
            
            .main-featured {
                background: white;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: var(--shadow-medium);
            }
            
            .main-featured .article-image {
                height: 300px;
                position: relative;
                overflow: hidden;
            }
            
            .main-featured img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.5s ease;
            }
            
            .main-featured:hover img {
                transform: scale(1.05);
            }
            
            .article-badge {
                position: absolute;
                top: 20px;
                left: 20px;
                padding: 8px 20px;
                color: var(--dark-charcoal);
                border-radius: 20px;
                font-weight: 600;
                font-size: 0.85rem;
            }
            
            .article-badge.featured {
                background: var(--solar-yellow);
            }
            
            .article-badge.guide {
                background: var(--eco-green);
                color: white;
            }
            
            .article-badge.tutorial {
                background: var(--deep-blue);
                color: white;
            }
            
            .article-badge.innovation {
                background: var(--accent-orange);
                color: white;
            }
            
            .main-featured .article-content {
                padding: 30px;
            }
            
            .article-meta {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                gap: 15px;
                margin-bottom: 15px;
                font-size: 0.9rem;
            }
            
            .article-meta .category {
                padding: 5px 15px;
                background: var(--light-gray);
                border-radius: 20px;
                font-weight: 600;
            }
            
            .article-meta .category.solar-cooking {
                background: rgba(253, 184, 19, 0.2);
                color: var(--dark-charcoal);
            }
            
            .article-meta .category.solar-drying {
                background: rgba(58, 125, 68, 0.2);
                color: var(--eco-green);
            }
            
            .article-meta .category.energy-storage {
                background: rgba(11, 61, 145, 0.2);
                color: var(--deep-blue);
            }
            
            .article-meta .category.smart-agri {
                background: rgba(255, 111, 0, 0.2);
                color: var(--accent-orange);
            }
            
            .article-meta .category.farmer-education {
                background: rgba(28, 28, 28, 0.1);
                color: var(--dark-charcoal);
            }
            
            .article-meta .category.technical {
                background: rgba(0, 0, 0, 0.1);
                color: var(--dark-charcoal);
            }
            
            .article-meta .category.policy {
                background: rgba(128, 0, 128, 0.1);
                color: purple;
            }
            
            .article-meta .date,
            .article-meta .read-time {
                color: var(--medium-gray);
                display: flex;
                align-items: center;
                gap: 5px;
            }
            
            .article-title {
                font-size: 1.8rem;
                color: var(--deep-blue);
                margin-bottom: 15px;
                line-height: 1.3;
            }
            
            .main-featured .article-title {
                font-size: 2rem;
            }
            
            .article-excerpt {
                color: var(--medium-gray);
                line-height: 1.6;
                margin-bottom: 20px;
            }
            
            .article-stats {
                display: flex;
                gap: 20px;
                margin: 25px 0;
                color: var(--medium-gray);
                font-size: 0.9rem;
            }
            
            .article-stats .stat {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            
            .featured-sidebar {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            
            .sidebar-card {
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: var(--shadow-light);
                transition: all 0.3s ease;
            }
            
            .sidebar-card:hover {
                transform: translateY(-5px);
                box-shadow: var(--shadow-medium);
            }
            
            .sidebar-card .article-image {
                height: 150px;
                overflow: hidden;
            }
            
            .sidebar-card img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .sidebar-card .article-content {
                padding: 20px;
            }
            
            .sidebar-card .article-title {
                font-size: 1.1rem;
                margin-bottom: 10px;
            }
            
            .article-link {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                color: var(--solar-yellow);
                text-decoration: none;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .article-link:hover {
                color: var(--accent-orange);
                gap: 12px;
            }
            
            .articles-grid {
                padding: 80px 0;
                background: white;
            }
            
            .grid-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 40px;
                flex-wrap: wrap;
                gap: 20px;
            }
            
            .sort-options {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .sort-select {
                padding: 8px 15px;
                border: 1px solid var(--light-gray);
                border-radius: 5px;
                font-family: var(--body-font);
                font-size: 0.9rem;
                color: var(--dark-charcoal);
                background: white;
            }
            
            .articles-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 30px;
            }
            
            .article-card {
                background: white;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: var(--shadow-light);
                transition: all 0.3s ease;
                opacity: 1;
                transform: translateY(0);
            }
            
            .article-card:hover {
                transform: translateY(-10px);
                box-shadow: var(--shadow-medium);
            }
            
            .article-card .article-image {
                height: 200px;
                position: relative;
                overflow: hidden;
            }
            
            .article-card img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.5s ease;
            }
            
            .article-card:hover img {
                transform: scale(1.05);
            }
            
            .article-card .article-content {
                padding: 25px;
            }
            
            .article-card .article-title {
                font-size: 1.3rem;
                margin-bottom: 15px;
            }
            
            .article-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin: 15px 0;
            }
            
            .tag {
                padding: 5px 12px;
                background: var(--light-gray);
                color: var(--medium-gray);
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 500;
            }
            
            .resources {
                margin: 20px 0;
                padding: 15px;
                background: var(--light-gray);
                border-radius: 10px;
            }
            
            .resources h4 {
                color: var(--deep-blue);
                margin-bottom: 10px;
                font-size: 1rem;
            }
            
            .resource-links {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .resource-link {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 15px;
                background: white;
                border-radius: 8px;
                color: var(--dark-charcoal);
                text-decoration: none;
                transition: all 0.3s ease;
            }
            
            .resource-link:hover {
                background: rgba(253, 184, 19, 0.1);
                transform: translateX(5px);
            }
            
            .resource-link i.fa-file-pdf {
                color: #e63946;
            }
            
            .resource-link i.fa-file-excel {
                color: #2a7533;
            }
            
            .download-info {
                padding: 10px 15px;
                background: rgba(253, 184, 19, 0.1);
                border-radius: 8px;
                margin: 15px 0;
                border-left: 3px solid var(--solar-yellow);
            }
            
            .download-info p {
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
                color: var(--dark-charcoal);
                font-size: 0.9rem;
            }
            
            .video-preview {
                margin: 15px 0;
            }
            
            .video-link {
                display: inline-flex;
                align-items: center;
                gap: 10px;
                padding: 10px 20px;
                background: rgba(255, 0, 0, 0.1);
                color: #ff0000;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .video-link:hover {
                background: rgba(255, 0, 0, 0.2);
                transform: translateY(-2px);
            }
            
            .case-study-link {
                margin: 15px 0;
            }
            
            .case-link {
                display: inline-flex;
                align-items: center;
                gap: 10px;
                padding: 10px 20px;
                background: rgba(58, 125, 68, 0.1);
                color: var(--eco-green);
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .case-link:hover {
                background: rgba(58, 125, 68, 0.2);
                transform: translateY(-2px);
            }
            
            .article-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid var(--light-gray);
            }
            
            .author {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .author-avatar {
                width: 40px;
                height: 40px;
                background: var(--deep-blue);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1rem;
            }
            
            .author-info {
                display: flex;
                flex-direction: column;
            }
            
            .author-name {
                font-weight: 600;
                color: var(--dark-charcoal);
                font-size: 0.9rem;
            }
            
            .author-role {
                font-size: 0.8rem;
                color: var(--medium-gray);
            }
            
            .article-actions {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .read-link {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                color: var(--solar-yellow);
                text-decoration: none;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .read-link:hover {
                color: var(--accent-orange);
                gap: 12px;
            }
            
            .download-link {
                display: inline-flex;
                align-items: center;
                gap: 5px;
                color: var(--medium-gray);
                text-decoration: none;
                font-size: 0.9rem;
                transition: color 0.3s ease;
            }
            
            .download-link:hover {
                color: var(--solar-yellow);
            }
            
            .save-article {
                background: none;
                border: none;
                color: var(--medium-gray);
                cursor: pointer;
                font-size: 1.2rem;
                transition: all 0.3s ease;
                padding: 5px;
            }
            
            .save-article:hover {
                color: var(--solar-yellow);
            }
            
            .save-article.saved {
                color: var(--solar-yellow);
            }
            
            .load-more-articles {
                text-align: center;
                margin-top: 50px;
            }
            
            .search-results-message {
                margin-bottom: 30px;
                animation: fadeIn 0.5s ease;
            }
            
            .no-results {
                text-align: center;
                padding: 40px;
                background: white;
                border-radius: 15px;
                box-shadow: var(--shadow-light);
            }
            
            .no-results i {
                font-size: 3rem;
                color: var(--medium-gray);
                margin-bottom: 20px;
                display: block;
            }
            
            .no-results h3 {
                color: var(--deep-blue);
                margin-bottom: 10px;
            }
            
            .no-results p {
                color: var(--medium-gray);
                margin-bottom: 20px;
            }
            
            .results-found {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                background: rgba(253, 184, 19, 0.1);
                border-radius: 10px;
                border-left: 4px solid var(--solar-yellow);
            }
            
            .results-found p {
                margin: 0;
                color: var(--dark-charcoal);
            }
            
            .btn-text {
                background: none;
                border: none;
                color: var(--solar-yellow);
                cursor: pointer;
                font-weight: 600;
                transition: color 0.3s ease;
            }
            
            .btn-text:hover {
                color: var(--accent-orange);
            }
            
            mark {
                background: rgba(253, 184, 19, 0.3);
                padding: 0 2px;
                border-radius: 2px;
            }
            
            .notification-toast {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                border-radius: 10px;
                box-shadow: var(--shadow-heavy);
                padding: 15px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
                min-width: 300px;
                max-width: 400px;
                z-index: 9999;
                transform: translateX(120%);
                transition: transform 0.3s ease;
            }
            
            .notification-toast.show {
                transform: translateX(0);
            }
            
            .notification-toast.success {
                border-left: 4px solid var(--eco-green);
            }
            
            .notification-toast.info {
                border-left: 4px solid var(--deep-blue);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                flex: 1;
            }
            
            .notification-content i {
                font-size: 1.2rem;
            }
            
            .notification-toast.success .notification-content i {
                color: var(--eco-green);
            }
            
            .notification-toast.info .notification-content i {
                color: var(--deep-blue);
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--medium-gray);
                cursor: pointer;
                font-size: 1rem;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .resource-library {
                padding: 80px 0;
                background: var(--light-gray);
            }
            
            .resource-categories {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 40px;
                margin-top: 50px;
            }
            
            .resource-category h3 {
                color: var(--deep-blue);
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .resource-category i {
                color: var(--solar-yellow);
            }
            
            .resource-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .resource-list li {
                margin-bottom: 15px;
            }
            
            .resource-list a {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 15px;
                background: white;
                border-radius: 10px;
                text-decoration: none;
                color: var(--dark-charcoal);
                transition: all 0.3s ease;
            }
            
            .resource-list a:hover {
                background: rgba(253, 184, 19, 0.1);
                transform: translateX(5px);
            }
            
            .resource-list i.fa-download {
                color: var(--solar-yellow);
                font-size: 1.2rem;
            }
            
            .resource-info {
                flex: 1;
            }
            
            .resource-title {
                display: block;
                font-weight: 600;
                margin-bottom: 5px;
            }
            
            .resource-meta {
                display: block;
                font-size: 0.85rem;
                color: var(--medium-gray);
            }
            
            .download-all {
                text-align: center;
                margin-top: 50px;
            }
            
            .newsletter-section {
                padding: 80px 0;
                background: white;
            }
            
            .newsletter-content {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 60px;
                align-items: center;
            }
            
            .newsletter-info h2 {
                color: var(--deep-blue);
                margin-bottom: 20px;
            }
            
            .newsletter-info p {
                color: var(--medium-gray);
                margin-bottom: 30px;
                line-height: 1.6;
            }
            
            .newsletter-benefits {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
            }
            
            .benefit {
                display: flex;
                align-items: center;
                gap: 10px;
                color: var(--dark-charcoal);
            }
            
            .benefit i {
                color: var(--eco-green);
            }
            
            .newsletter-form {
                background: var(--light-gray);
                padding: 40px;
                border-radius: 15px;
                box-shadow: var(--shadow-light);
            }
            
            .newsletter-form h3 {
                color: var(--deep-blue);
                margin-bottom: 30px;
                text-align: center;
            }
            
            .newsletter-form .form-group {
                margin-bottom: 20px;
            }
            
            .newsletter-form label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                color: var(--dark-charcoal);
            }
            
            .newsletter-form input,
            .newsletter-form select {
                width: 100%;
                padding: 12px 15px;
                border: 1px solid #ddd;
                border-radius: 8px;
                font-family: var(--body-font);
                font-size: 1rem;
                transition: all 0.3s ease;
            }
            
            .newsletter-form input:focus,
            .newsletter-form select:focus {
                outline: none;
                border-color: var(--solar-yellow);
                box-shadow: 0 0 0 3px rgba(253, 184, 19, 0.2);
            }
            
            .interest-checkboxes {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
            }
            
            .checkbox-label {
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
                font-size: 0.9rem;
                color: var(--dark-charcoal);
            }
            
            .checkbox-label input[type="checkbox"] {
                width: auto;
                margin: 0;
            }
            
            .privacy-note {
                display: flex;
                align-items: flex-start;
                gap: 10px;
                margin: 20px 0;
                font-size: 0.9rem;
                color: var(--medium-gray);
            }
            
            .privacy-note input[type="checkbox"] {
                margin-top: 3px;
            }
            
            .privacy-note a {
                color: var(--solar-yellow);
                text-decoration: none;
            }
            
            .privacy-note a:hover {
                text-decoration: underline;
            }
            
            .newsletter-success {
                background: rgba(58, 125, 68, 0.1);
                padding: 30px;
                border-radius: 15px;
                border-left: 4px solid var(--eco-green);
                display: flex;
                gap: 20px;
                align-items: flex-start;
                animation: fadeIn 0.5s ease;
            }
            
            .newsletter-success i {
                color: var(--eco-green);
                font-size: 2rem;
                margin-top: 5px;
            }
            
            .newsletter-success h4 {
                color: var(--eco-green);
                margin-bottom: 10px;
            }
            
            .newsletter-success p {
                margin: 0 0 10px;
                color: var(--dark-charcoal);
            }
            
            .newsletter-success p:last-child {
                margin-bottom: 0;
            }
            
            .expert-contributors {
                padding: 80px 0;
                background: var(--light-gray);
            }
            
            .contributors-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 30px;
                margin-top: 50px;
            }
            
            .contributor-card {
                background: white;
                padding: 30px;
                border-radius: 15px;
                text-align: center;
                box-shadow: var(--shadow-light);
                transition: all 0.3s ease;
            }
            
            .contributor-card:hover {
                transform: translateY(-10px);
                box-shadow: var(--shadow-medium);
            }
            
            .contributor-avatar {
                width: 80px;
                height: 80px;
                background: var(--deep-blue);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
                font-size: 2rem;
            }
            
            .contributor-info h3 {
                color: var(--deep-blue);
                margin-bottom: 5px;
            }
            
            .contributor-role {
                color: var(--solar-yellow);
                font-weight: 600;
                margin-bottom: 10px;
                font-size: 0.9rem;
            }
            
            .contributor-expertise {
                color: var(--medium-gray);
                font-size: 0.9rem;
                margin-bottom: 15px;
                line-height: 1.4;
            }
            
            .contributor-stats {
                display: flex;
                justify-content: center;
                gap: 15px;
                flex-wrap: wrap;
            }
            
            .contributor-stats .stat {
                padding: 5px 12px;
                background: var(--light-gray);
                color: var(--medium-gray);
                border-radius: 15px;
                font-size: 0.8rem;
            }
            
            .knowledge-cta {
                padding: 100px 0;
                background: linear-gradient(135deg, var(--eco-green) 0%, var(--deep-blue) 100%);
                color: white;
                text-align: center;
            }
            
            .knowledge-cta h2 {
                color: white;
                margin-bottom: 20px;
            }
            
            .knowledge-cta p {
                max-width: 700px;
                margin: 0 auto 40px;
                font-size: 1.1rem;
                opacity: 0.9;
            }
            
            .cta-actions {
                display: flex;
                justify-content: center;
                gap: 20px;
                flex-wrap: wrap;
            }
            
            .btn-outline-light {
                background: transparent;
                color: white;
                border-color: white;
            }
            
            .btn-outline-light:hover {
                background: white;
                color: var(--deep-blue);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            /* Responsive styles */
            @media (max-width: 991px) {
                .featured-grid {
                    grid-template-columns: 1fr;
                }
                
                .newsletter-content {
                    grid-template-columns: 1fr;
                    gap: 40px;
                }
                
                .articles-container {
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                }
            }
            
            @media (max-width: 767px) {
                .grid-header {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .sort-options {
                    justify-content: flex-end;
                }
                
                .category-tabs {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .category-tab {
                    text-align: center;
                }
                
                .articles-container {
                    grid-template-columns: 1fr;
                }
                
                .newsletter-benefits {
                    grid-template-columns: 1fr;
                }
                
                .interest-checkboxes {
                    grid-template-columns: 1fr;
                }
                
                .contributors-grid {
                    grid-template-columns: 1fr;
                }
                
                .cta-actions {
                    flex-direction: column;
                    align-items: center;
                }
                
                .cta-actions .btn {
                    width: 100%;
                    max-width: 300px;
                }
                
                .resource-categories {
                    grid-template-columns: 1fr;
                }
            }
            
            @media (max-width: 575px) {
                .article-meta {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 10px;
                }
                
                .article-stats {
                    flex-direction: column;
                    gap: 10px;
                }
                
                .article-footer {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 15px;
                }
                
                .article-actions {
                    width: 100%;
                    justify-content: space-between;
                }
                
                .notification-toast {
                    left: 20px;
                    right: 20px;
                    min-width: auto;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }
});