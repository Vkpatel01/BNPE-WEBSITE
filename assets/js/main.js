/**
 * BN POWER ENTERPRISES (BNPE) - CORPORATE PORTAL INTERACTIVE ENGINE
 * Features: 7-Slide Hero Carousel, Stat Counting, Dynamic Modals,
 * Category Filters, Live Ticker, Toast Notifications & Mobile Nav
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initStatsCounter();
  initBusinessFilters();
  initBusinessModals();
  initRfpModal();
  initInvestorDownloads();
  initStockTicker();
  initMobileNav();
  initBackToTop();
  initNewsletterForm();
  initCareersModal();
});

/* ==========================================================================
   1. HERO CAROUSEL ENGINE (7 SLIDES WITH AUTO-PROGRESS)
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');
  const pauseBtn = document.getElementById('heroPauseBtn');
  const currentNumEl = document.getElementById('currentSlideNum');
  const totalNumEl = document.getElementById('totalSlideNum');

  if (!slides.length) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  let slideInterval = null;
  let isPlaying = true;
  const slideDuration = 6000; // 6 seconds

  if (totalNumEl) {
    totalNumEl.textContent = String(totalSlides).padStart(2, '0');
  }

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide]?.classList.remove('active');

    currentSlide = (index + totalSlides) % totalSlides;

    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('active');
    }

    if (currentNumEl) {
      currentNumEl.textContent = String(currentSlide + 1).padStart(2, '0');
    }
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    slideInterval = setInterval(nextSlide, slideDuration);
    isPlaying = true;
    if (pauseBtn) {
      pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      pauseBtn.setAttribute('title', 'Pause slideshow');
    }
  }

  function stopAutoplay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
    isPlaying = false;
    if (pauseBtn) {
      pauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      pauseBtn.setAttribute('title', 'Play slideshow');
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      if (isPlaying) startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      if (isPlaying) startAutoplay();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
      if (isPlaying) startAutoplay();
    });
  });

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      if (isPlaying) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;
  const sliderSection = document.querySelector('.hero-slider-section');

  if (sliderSection) {
    sliderSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
      prevSlide();
    }
  }

  // Start initial autoplay
  startAutoplay();
}

/* ==========================================================================
   2. ANIMATED STATS COUNTER WITH INTERSECTION OBSERVER
   ========================================================================== */
function initStatsCounter() {
  const statElements = document.querySelectorAll('.stat-count');
  if (!statElements.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statElements.forEach(el => animateCount(el));
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-banner');
  if (statsSection) {
    observer.observe(statsSection);
  }

  function animateCount(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2200; // 2.2 seconds
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      // easeOutExpo formula
      const progress = 1 - Math.pow(2, -10 * (frame / totalFrames));
      const currentVal = Math.round(target * progress);

      el.textContent = currentVal.toLocaleString();

      if (frame >= totalFrames) {
        el.textContent = target.toLocaleString();
        clearInterval(counter);
      }
    }, frameRate);
  }
}

/* ==========================================================================
   3. BUSINESS VERTICALS FILTERING
   ========================================================================== */
function initBusinessFilters() {
  const filterBtns = document.querySelectorAll('.business-filter-nav .filter-btn');
  const serviceCards = document.querySelectorAll('.services-grid .service-card');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   4. BUSINESS VERTICAL DETAILED MODAL DATA & HANDLER
   ========================================================================== */
const BUSINESS_DATA = {
  'industrial-construction': {
    title: 'Industrial Construction & EPC',
    badge: 'Core Business Vertical',
    image: 'assets/images/hero-power-plant.jpg',
    lead: 'Comprehensive Engineering, Procurement, and Construction (EPC) execution for super-critical thermal, nuclear, gas, and renewable power utilities.',
    keyStats: [
      { label: 'Erection & Commissioning', val: '55,000+ MW' },
      { label: 'Boiler / Turbine Heavy Sets', val: '140+ Units' },
      { label: 'Highest Unit Commissioned', val: '800 MW Supercritical' }
    ],
    capabilities: [
      'Complete Erection, Testing & Commissioning of Boilers, Turbines & Generators (BTG)',
      'Balance of Plant (BOP) including coal handling, ash handling, and water systems',
      'Heavy structural fabrication, high-pressure piping & tankage erection',
      'Flue Gas Desulphurisation (FGD) and Selective Catalytic Reduction (SCR) retrofit installations',
      'Combined Cycle Gas Turbines (CCGT) and nuclear island auxiliary installations'
    ],
    featuredProjects: [
      'NTPC Khargone 2x660 MW Supercritical Thermal Power Project',
      'Adani Mundra 4,000 MW Ultra Mega Power Plant BTG Package',
      'BHEL Suratgarh 2x660 MW Supercritical Boiler & ESP Package'
    ]
  },
  'industrial-services': {
    title: 'Industrial Services (O&M & Modernization)',
    badge: 'Lifecycle Asset Excellence',
    image: 'assets/images/hero-turbines-om.jpg',
    lead: 'End-to-end Operation & Maintenance, Overhauling, and Renovation & Modernization (R&M) services ensuring optimal uptime across critical power and industrial assets.',
    keyStats: [
      { label: 'Capacity Under Active O&M', val: '50,000+ MW' },
      { label: 'Turnaround Overhauls', val: '650+ Outages' },
      { label: 'Plant Availability Track Record', val: '99.4%' }
    ],
    capabilities: [
      'Comprehensive Annual Maintenance Contracts (AMC) and long-term O&M contracts',
      'Major turbine-generator overhauling and rotor dynamic balancing',
      'Boiler pressure parts health assessment, rehabilitation and tube replacement',
      'Condition monitoring, vibration analysis and residual life assessment (RLA)',
      'Renovation and modernization of auxiliary machinery and control systems'
    ],
    featuredProjects: [
      'JSW Energy 4x300 MW Toranagallu Comprehensive O&M',
      'Tata Power Trombay 500 MW Unit Major Turbine Overhaul',
      'NTPC Ramagundam 2,600 MW Plant Maintenance Support'
    ]
  },
  'civil-construction': {
    title: 'Civil Construction & Heavy Infrastructure',
    badge: 'Monumental Engineering',
    image: 'assets/images/hero-civil-infra.jpg',
    lead: 'Civil engineering mastery spanning super-heavy industrial foundations, elevated expressways, metro viaducts, natural draft cooling towers, and monumental chimneys.',
    keyStats: [
      { label: 'Concrete Poured to Date', val: '4.8M+ Cu.M' },
      { label: 'Chimneys & Cooling Towers', val: '45+ Tall Structures' },
      { label: 'Infrastructure Highways/Metros', val: '120+ Kms' }
    ],
    capabilities: [
      'Slip-form construction of twin-flue RCC chimneys up to 275m height',
      'Natural Draft and Induced Draft Cooling Towers (NDCT / IDCT)',
      'Heavy equipment foundation and turbo-generator vibration-isolated decks',
      'Elevated viaducts, bridges, flyovers and dedicated freight corridor packages',
      'Industrial townships, administrative complexes and high-capacity switchyards'
    ],
    featuredProjects: [
      'High-Speed Elevated Rail Viaduct Civil Infrastructure Package',
      '275m Multi-Flue RCC Chimney Package at Singrauli Super Thermal',
      'Metro Rail Underground & Elevated Station Structure'
    ]
  },
  'electrical-transmission': {
    title: 'Electrical & EHV Transmission Systems',
    badge: 'Grid Modernization',
    image: 'assets/images/hero-electrical-substation.jpg',
    lead: 'Turnkey execution of Extra High Voltage (EHV) substations up to 765 kV, Gas Insulated Switchgear (GIS), cross-country transmission lines, and industrial electrical packages.',
    keyStats: [
      { label: 'Substations Built', val: '40+ EHV Substations' },
      { label: 'Transmission Line Length', val: '1,800+ Circuit Kms' },
      { label: 'Voltage Class Handled', val: 'Up to 765 kV' }
    ],
    capabilities: [
      'Turnkey EPC of 400 kV and 765 kV Air Insulated (AIS) & Gas Insulated (GIS) Substations',
      'Tower foundation, erection, and stringing for high-voltage transmission corridors',
      'Plant electrification, HT/LT switchboards, cabling, and busduct installation',
      'Transformer oil filtration, testing, relay protection, and SCADA automation',
      'Renewable evacuation systems connecting mega solar and wind parks to the national grid'
    ],
    featuredProjects: [
      'PGCIL 765/400 kV GIS Substation Package',
      '400 kV Double Circuit Quad Transmission Line Corridor',
      'Complete Electrification of 2x660 MW Supercritical Power Complex'
    ]
  },
  'water-infrastructure': {
    title: 'Water Infrastructure & Lift Irrigation',
    badge: 'Water Security & EPC',
    image: 'assets/images/hero-water-infra.jpg',
    lead: 'Executing high-capacity lift irrigation projects, river intake pumphouses, large-diameter cross-country bulk water supply pipelines, and industrial water treatment facilities.',
    keyStats: [
      { label: 'Pumping Capacity Installed', val: '12,000+ Cusecs' },
      { label: 'Pipeline Networks Laid', val: '650+ Kilometers' },
      { label: 'Beneficiary Population', val: '15+ Million' }
    ],
    capabilities: [
      'High-head mega pumping stations with vertical turbine and centrifugal pumps',
      'Bulk water transmission pipelines in MS, DI, and HDPE up to 3,000 mm diameter',
      'Surge control vessels, manifold piping, substations, and automated PLC control systems',
      'Water Treatment Plants (WTP) and industrial effluent recycling facilities',
      'Intake wells, barrages, and canal distribution networks'
    ],
    featuredProjects: [
      'Kaleshwaram Lift Irrigation Pumping Station EPC',
      'Jal Jeevan Mission Bulk Rural Water Supply Pipeline (Madhya Pradesh)',
      'Industrial Intake & Desalination Water Line Project'
    ]
  },
  'mining-solutions': {
    title: 'Mining Solutions & Material Handling',
    badge: 'Resource Extraction & MDO',
    image: 'assets/images/hero-mining-solutions.jpg',
    lead: 'Integrated Mine Developer and Operator (MDO) solutions, overburden removal, surface mining, and bulk material handling systems for large-scale energy security.',
    keyStats: [
      { label: 'Long-term MDO Contracts', val: '₹9,500+ Cr Value' },
      { label: 'Material Excavated Annually', val: '25+ Million Cu.M' },
      { label: 'Conveyor Networks Handled', val: '45+ Kilometers' }
    ],
    capabilities: [
      'Full lifecycle Mine Developer and Operator (MDO) services for major coal blocks',
      'Heavy earth moving machinery (HEMM) fleet operation and overburden removal',
      'Coal handling plants (CHP), crushing, screening, and rapid loading silos',
      'Overland long-distance conveyor systems and stacker-reclaimer installation',
      'Environmental rehabilitation, dust suppression, and mine closure stewardship'
    ],
    featuredProjects: [
      'Tasra Coal Block 25-Year MDO Contract (SAIL)',
      'Kotre Basantpur Pachmo Coal Block MDO Package',
      'Overland Curved Conveyor & Silo Rapid Loading System'
    ]
  },
  'international-operations': {
    title: 'International Operations & Global Reach',
    badge: 'Global Footprint',
    image: 'assets/images/hero-turbines-om.jpg',
    lead: 'Delivering world-class EPC and industrial services across the Middle East, North Africa, South Asia, and the Mediterranean with localized excellence and global compliance.',
    keyStats: [
      { label: 'Countries with Active Footprint', val: '12+ Nations' },
      { label: 'International Projects Executed', val: '45+ Projects' },
      { label: 'Global Expatriate Workforce', val: '5,000+ Professionals' }
    ],
    capabilities: [
      'Established operating subsidiaries in UAE (Dubai, Sharjah), Saudi Arabia, and Oman',
      'Turnkey turbine-generator erection and commissioning for international EPC contractors',
      'Cross-border shutdown maintenance and fast-track outage management',
      'Strict adherence to OSHA, ASME, and British Standard quality frameworks',
      'Multinational procurement and logistics management'
    ],
    featuredProjects: [
      'Maitree 1,320 MW Super Thermal Power Project (Bangladesh)',
      'Combined Cycle Power Plant Erection Package (Oman)',
      'Industrial Turbine Overhauling Package (Kingdom of Saudi Arabia)'
    ]
  },
  'spare-parts-workshop': {
    title: 'Spare Parts Management & Heavy Engineering Workshop',
    badge: 'Precision Engineering & Overhaul',
    image: 'assets/images/hero-turbines-om.jpg',
    lead: 'Advanced engineering workshop facility dedicated to manufacturing precision turbine spares, reverse engineering, heavy component reconditioning, and CNC machining.',
    keyStats: [
      { label: 'Workshop Facility Area', val: '150,000+ Sq.Ft.' },
      { label: 'Precision Spares Catalog', val: '10,000+ Components' },
      { label: 'Emergency Lead Time Reduction', val: 'Up to 60%' }
    ],
    capabilities: [
      'Reverse engineering and precision manufacturing of critical turbine and boiler spares',
      'Dynamic balancing of rotors up to 100 metric tons on state-of-the-art test benches',
      'Turbine blade manufacturing, white metal bearing re-babbitting, and seal ring fabrication',
      'Metallurgical testing, non-destructive testing (NDT), and stress relieving furnaces',
      'Rapid turnaround emergency spares dispatch for unplanned industrial outages'
    ],
    featuredProjects: [
      'Noida & Hyderabad Central Heavy Engineering Workshop Complex',
      'Re-engineering of Supercritical Turbine HP/IP Rotor Blades',
      'Large Diameter Generator Rotor Re-babbitting & Alignment'
    ]
  }
};

function initBusinessModals() {
  const modalBackdrop = document.getElementById('businessDetailModal');
  const modalTitle = document.getElementById('bizModalTitle');
  const modalBadge = document.getElementById('bizModalBadge');
  const modalLead = document.getElementById('bizModalLead');
  const modalStats = document.getElementById('bizModalStats');
  const modalCapabilities = document.getElementById('bizModalCapabilities');
  const modalProjects = document.getElementById('bizModalProjects');
  const modalImage = document.getElementById('bizModalImage');
  const closeBtn = document.getElementById('bizModalClose');
  const rfpTriggerBtn = document.getElementById('bizModalRfpBtn');

  if (!modalBackdrop) return;

  document.querySelectorAll('.btn-service-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const unitKey = btn.getAttribute('data-unit');
      const data = BUSINESS_DATA[unitKey];

      if (!data) return;

      modalTitle.textContent = data.title;
      modalBadge.textContent = data.badge;
      modalLead.textContent = data.lead;
      if (modalImage) modalImage.src = data.image;

      // Stats
      modalStats.innerHTML = data.keyStats.map(s => `
        <div class="stock-stat-item">
          <div class="stock-stat-label">${s.label}</div>
          <div class="stock-stat-val" style="color: var(--color-secondary-hover);">${s.val}</div>
        </div>
      `).join('');

      // Capabilities
      modalCapabilities.innerHTML = data.capabilities.map(c => `
        <li style="display:flex; align-items:flex-start; gap:0.5rem; margin-bottom:0.5rem; font-size:0.88rem;">
          <i class="fa-solid fa-circle-check" style="color:var(--color-secondary); margin-top:0.25rem;"></i>
          <span>${c}</span>
        </li>
      `).join('');

      // Projects
      modalProjects.innerHTML = data.featuredProjects.map(p => `
        <li style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.4rem; font-size:0.86rem; color:var(--color-text-muted);">
          <i class="fa-solid fa-angle-right" style="color:var(--color-secondary);"></i>
          <span>${p}</span>
        </li>
      `).join('');

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  if (rfpTriggerBtn) {
    rfpTriggerBtn.addEventListener('click', () => {
      closeModal();
      openRfpModal();
    });
  }
}

/* ==========================================================================
   5. TECHNICAL RFP / TENDER ENQUIRY MODAL ENGINE
   ========================================================================== */
function initRfpModal() {
  const rfpModal = document.getElementById('rfpModal');
  const rfpClose = document.getElementById('rfpCloseBtn');
  const rfpForm = document.getElementById('rfpForm');
  const triggers = document.querySelectorAll('.trigger-rfp-modal');

  if (!rfpModal) return;

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openRfpModal();
    });
  });

  window.openRfpModal = function() {
    rfpModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeRfp() {
    rfpModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (rfpClose) rfpClose.addEventListener('click', closeRfp);

  rfpModal.addEventListener('click', (e) => {
    if (e.target === rfpModal) closeRfp();
  });

  if (rfpForm) {
    rfpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = rfpForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting RFP...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        closeRfp();
        rfpForm.reset();
        showToast('Tender Enquiry / RFP successfully submitted. Our Commercial Engineering team will respond within 24 hours.', 'success');
      }, 1200);
    });
  }
}

/* ==========================================================================
   6. INVESTOR DOCUMENT DOWNLOAD SIMULATOR
   ========================================================================== */
function initInvestorDownloads() {
  const downloadBtns = document.querySelectorAll('.btn-download-pdf');

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const docName = btn.getAttribute('data-doc') || 'Financial Disclosure';
      const originalHtml = btn.innerHTML;

      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Downloading...';

      setTimeout(() => {
        btn.innerHTML = originalHtml;
        showToast(`Document downloaded: "${docName}" (Official Filing)`, 'success');
      }, 900);
    });
  });
}

/* ==========================================================================
   7. LIVE STOCK TICKER SIMULATOR (REALISTIC FLUCTUATIONS)
   ========================================================================== */
function initStockTicker() {
  const priceElements = document.querySelectorAll('.live-stock-price');
  let currentPrice = 4892.40;

  setInterval(() => {
    // Small realistic random fluctuation (-3.0 to +4.5)
    const change = (Math.random() * 7.5 - 3.0);
    currentPrice = Math.max(4800, currentPrice + change);

    priceElements.forEach(el => {
      el.textContent = '₹' + currentPrice.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      // Brief flash animation
      el.style.transition = 'color 0.3s ease';
      el.style.color = change >= 0 ? '#10b981' : '#f59e0b';
      setTimeout(() => {
        el.style.color = '';
      }, 600);
    });
  }, 5000);
}

/* ==========================================================================
   8. MOBILE NAVIGATION & ACCORDION
   ========================================================================== */
function initMobileNav() {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
  });

  // Mobile accordion for dropdowns
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown-menu, .dropdown-mega');

    if (dropdown && link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    }
  });

  // Close nav on clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 992) {
      if (!mainNav.contains(e.target) && !menuToggle.contains(e.target) && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    }
  });
}

/* ==========================================================================
   9. BACK TO TOP BUTTON & HEADER SCROLL SHADOW
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  const siteHeader = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header shadow
    if (siteHeader) {
      if (scrollPos > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollPos > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ==========================================================================
   10. NEWSLETTER & INVESTOR ALERTS FORM
   ========================================================================== */
function initNewsletterForm() {
  const newsletterForm = document.getElementById('newsletterForm');
  if (!newsletterForm) return;

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input[type="email"]');
    if (input && input.value) {
      showToast(`Thank you! Investor alerts and regulatory filings will be sent to: ${input.value}`, 'success');
      newsletterForm.reset();
    }
  });
}

/* ==========================================================================
   11. CAREERS QUICK APPLICATION MODAL
   ========================================================================== */
function initCareersModal() {
  const careersModal = document.getElementById('careersModal');
  const careersClose = document.getElementById('careersCloseBtn');
  const careersForm = document.getElementById('careersForm');
  const triggers = document.querySelectorAll('.trigger-careers-modal');

  if (!careersModal) return;

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      careersModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeCareers() {
    careersModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (careersClose) careersClose.addEventListener('click', closeCareers);

  careersModal.addEventListener('click', (e) => {
    if (e.target === careersModal) closeCareers();
  });

  if (careersForm) {
    careersForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = careersForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting Profile...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        closeCareers();
        careersForm.reset();
        showToast('Application submitted successfully! Our Talent Acquisition team will review your profile.', 'success');
      }, 1200);
    });
  }
}

/* ==========================================================================
   12. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = 'info') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-info'}" style="color:${type === 'success' ? '#10b981' : '#f59e0b'};"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}
