/**
 * Main JavaScript file for Hot Topics website
 * Handles dynamic content loading via AJAX
 */

// Wait for DOM to be fully loaded before executing script
document.addEventListener('DOMContentLoaded', function() {
    // GET THE REFERENCES TO DOM ELEMENTS
    const container = document.getElementById('content'); // Main content container
    const links = document.querySelectorAll('.nav-link'); // All navigation links
    let url = './partials/home.html'; // Default URL to load
    
    /**
     * Function to load content from a URL and insert it into the container
     * @param {string} urlFeed - The URL of the content to load
     */
    const loadContent = (urlFeed) => {
        // Show loading state
        container.innerHTML = '<div class="loading">Loading content...</div>';
        
        // Fetch the content from the provided URL
        fetch(urlFeed)
            .then(response => {
                // Check if response is successful
                if (response.ok) {
                    return response.text(); // Parse response as text
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Insert the loaded content into the container
                container.innerHTML = data;
                // Update the current URL
                url = urlFeed;
                
                // Add fade-in animation
                container.style.opacity = 0;
                setTimeout(() => {
                    container.style.transition = 'opacity 0.3s ease';
                    container.style.opacity = 1;
                }, 50);
            })
            .catch(error => {
                // Handle errors
                console.error('Error fetching the content: ', error);
                container.innerHTML = `
                    <div class="error">
                        <p>Failed to load content. Please try again later.</p>
                        <button onclick="location.reload()">Reload Page</button>
                    </div>
                `;
            });
    };
    
    /**
     * Function to handle navigation link clicks
     * @param {Event} ev - The click event
     */
    const selectContent = (ev) => {
        // Prevent default link behavior
        ev.preventDefault();
        
        // Get the href attribute of the clicked link
        let urlFeed = ev.target.getAttribute('href');
        
        // Update active link styling
        links.forEach(link => {
            link.classList.remove('active');
        });
        ev.target.classList.add('active');
        
        // Load the requested content
        loadContent(urlFeed);
    };
    
    // Initially load the default content
    loadContent(url);
    
    // Add click event listeners to all navigation links
    links.forEach(link => {
        link.addEventListener('click', selectContent);
    });
    
    // Add styling for loading and error states
    const style = document.createElement('style');
    style.textContent = `
        .loading, .error {
            text-align: center;
            padding: 2rem;
            font-size: 1.2rem;
        }
        .error button {
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background: var(--medium-color);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .error button:hover {
            background: var(--light-color);
        }
        .nav-link.active {
            color: var(--light-color) !important;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
});
