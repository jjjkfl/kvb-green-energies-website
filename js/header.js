// ===== KVB GREEN ENERGIES – REUSABLE HEADER =====
// Include this script on every page. It injects all header styles, HTML, and behaviour.
(function() {
  // ------------------------------------------------------------------
  // 1. HEADER STYLES (CSS)
  // ------------------------------------------------------------------
  const style = document.createElement('style');
  style.textContent = `
    /* ----- GLOBAL VARIABLES & HEADER STYLES ----- */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --solar-yellow: #FDB813;
      --deep-blue: #0B3D91;
      --eco-green: #3A7D44;
      --dark-charcoal: #1C1C1C;
      --soft-white: #F9F9F9;
      --primary: var(--eco-green);
      --primary-dark: #2d5a33;
      --primary-light: #e6f3e6;
      --shadow-sm: 0 10px 30px rgba(28,28,28,0.04);
      --shadow-hover: 0 20px 40px rgba(58,125,68,0.08);
      --transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    body {
      font-family: 'Open Sans', sans-serif;
      padding-top: 80px; /* Prevent content from hiding under fixed header */
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* ----- HEADER ----- */
    .header {
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 1000;
      background: rgba(255,255,255,0.8);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(0,0,0,0.04);
      transition: var(--transition);
    }

    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;
    }

    .logo a {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
    }

    .logo img {
      height: 70px;
      width: auto;
      border-radius: 12px;
      background: var(--eco-green);
      padding: 4px;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--eco-green);
      letter-spacing: -0.03em;
    }

    .nav-menu {
      display: flex;
      list-style: none;
      align-items: center;
      gap: 24px;
      margin: 0;
      padding: 0;
    }

    .nav-menu a {
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--dark-charcoal);
      padding: 8px 0;
      border-bottom: 2px solid transparent;
      text-decoration: none;
      transition: var(--transition);
    }

    .nav-menu a:hover {
      color: var(--eco-green);
      border-bottom-color: var(--solar-yellow);
    }

    .nav-menu a.active {
      color: var(--eco-green);
      border-bottom-color: var(--solar-yellow);
    }

    /* Dropdown */
    .dropdown {
      position: relative;
    }

    .dropdown-content {
      position: absolute;
      top: 100%;
      left: -16px;
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(16px);
      min-width: 260px;
      border-radius: 20px;
      padding: 16px 8px;
      box-shadow: var(--shadow-sm);
      opacity: 0;
      visibility: hidden;
      transform: translateY(12px);
      transition: all 0.3s ease;
      border: 1px solid rgba(255,255,255,0.7);
    }

    .dropdown:hover .dropdown-content {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .dropdown-content a {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 14px;
      color: var(--dark-charcoal);
    }

    .dropdown-content a i {
      width: 20px;
      color: var(--eco-green);
    }

    .dropdown-content a:hover {
      background: var(--primary-light);
    }

    .cta-button {
      background: var(--eco-green);
      color: white !important;
      padding: 12px 24px !important;
      border-radius: 50px;
    }

    .cta-button:hover {
      background: var(--primary-dark);
      transform: scale(1.02);
    }

    /* Hamburger (mobile) */
    .hamburger {
      display: none;
      flex-direction: column;
      cursor: pointer;
    }

    .hamburger span {
      width: 28px;
      height: 3px;
      background: var(--eco-green);
      margin: 4px;
      border-radius: 10px;
      transition: 0.3s;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .nav-menu {
        position: fixed;
        top: 80px;
        left: -100%;
        flex-direction: column;
        background: rgba(255,255,255,0.98);
        backdrop-filter: blur(20px);
        width: 100%;
        padding: 40px;
        transition: 0.4s;
        z-index: 999;
      }
      .nav-menu.active {
        left: 0;
      }
      .hamburger {
        display: flex;
      }
    }
  `;
  document.head.appendChild(style);

  // ------------------------------------------------------------------
  // 2. HEADER HTML
  // ------------------------------------------------------------------
  const headerHTML = `
    <header class="header" id="header">
      <div class="container">
        <nav class="navbar">
          <div class="logo">
            <a href="index.html">
              <img src="images/products/kvb.jpeg" alt="KVB Green Energies">
              <span class="logo-text">KVB Green Energies</span>
            </a>
          </div>
          <ul class="nav-menu" id="navMenu">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <!-- Solutions dropdown -->
            <li class="dropdown">
              <a href="#">Solutions <i class="fas fa-chevron-down"></i></a>
              <div class="dropdown-content">
                <a href="solutions/solar-thermal-systems.html"><i class="fas fa-solar-panel"></i> Solar Thermal Systems</a>
                <a href="solutions/energy-storage.html"><i class="fas fa-battery-full"></i> Energy Storage</a>
                <a href="solutions/smart-agriculture.html"><i class="fas fa-seedling"></i> Smart Agriculture</a>
              </div>
            </li>
            <!-- Products dropdown -->
            <li class="dropdown">
              <a href="#">Products <i class="fas fa-chevron-down"></i></a>
              <div class="dropdown-content">
                <a href="products/solar-steam-cooking.html"><i class="fas fa-utensils"></i> Solar Steam Cooking</a>
                <a href="products/solar-tunnel-dryers.html"><i class="fas fa-wind"></i> Solar Tunnel Dryers</a>
                <a href="products/scheffler-concentrators.html"><i class="fas fa-satellite-dish"></i> Scheffler Concentrators</a>
                <a href="products/ai-crop-detection.html"><i class="fas fa-robot"></i> AI Crop Detection</a>
                <a href="thermal-storage.html"><i class="fas fa-thermometer-half"></i> Thermal Storage</a>
                <a href="microgreen-systems.html"><i class="fas fa-leaf"></i> Microgreen Systems</a>
              </div>
            </li>
            <li><a href="innovation-lab.html">Innovation Lab</a></li>
            <li><a href="clients-partnerships.html">Clients</a></li>
            <li><a href="case-studies.html">Case Studies</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="contact.html" class="cta-button">Contact</a></li>
          </ul>
          <div class="hamburger" id="hamburger">
            <span></span><span></span><span></span>
          </div>
        </nav>
      </div>
    </header>
  `;

  // Inject header at the very beginning of <body>
  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  // ------------------------------------------------------------------
  // 3. HEADER BEHAVIOUR (JavaScript)
  // ------------------------------------------------------------------
  function initHeader() {
    // ----- Active page highlighting -----
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      }
    });

    // ----- Mobile menu toggle -----
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger) {
      hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
      });

      // Close menu when a link is clicked
      document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
        });
      });
    }

    // ----- Sticky header effect -----
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(255,255,255,0.95)';
        header.style.boxShadow = '0 6px 20px rgba(0,20,10,0.05)';
      } else {
        header.style.background = 'rgba(255,255,255,0.8)';
        header.style.boxShadow = 'none';
      }
    });
  }

  // Run initialisation when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    initHeader();
  }
})();