/* ================================================================
   MAIN.JS — Premium Landing Page Template
   ================================================================
   TABLE OF CONTENTS:
   1.  Utility Helpers
   2.  Navbar — Scroll & Active Link Behavior
   3.  Scroll Reveal Animations (IntersectionObserver)
   4.  Staggered Children Animations
   5.  FAQ Accordion
   6.  Footer Year Auto-Update
   ================================================================

   QUICK CUSTOMIZATION GUIDE:
   - Animation threshold (when element triggers): search THRESHOLD
   - Animation stagger delay between children: search STAGGER
   - Navbar scroll trigger point: search SCROLL_TRIGGER
   - To disable a feature entirely: comment out its init call
     at the bottom of this file (search "INIT")
   ================================================================ */


/* ================================================================
   1. UTILITY HELPERS
   ================================================================ */

/**
 * Runs a callback once the DOM is fully parsed.
 * Wraps everything so we never touch elements before they exist.
 */
function onReady(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

/**
 * Shorthand querySelectorAll that returns a real Array.
 * Usage: $all('.faq-item') instead of document.querySelectorAll(...)
 */
function $all(selector, context) {
    return Array.from((context || document).querySelectorAll(selector));
}


/* ================================================================
   2. NAVBAR — SCROLL & ACTIVE LINK BEHAVIOR
   ================================================================
   Two effects:
   A) .scrolled class → frosted glass + gold underline (see CSS)
   B) Active link highlight → marks the nav link whose section
      is currently in view
   ================================================================ */

function initNavbar() {
    const nav      = document.getElementById('main-nav');
    const navLinks = $all('.nav-links a[href^="#"]');

    if (!nav) return;

    /* ----------------------------------------------------------
       A) SCROLL CLASS
       Adds .scrolled to <nav> when page scrolls past SCROLL_TRIGGER px.
       CSS handles the visual change (backdrop-filter, border, etc.)

       To change the trigger point: edit the number below.
    ---------------------------------------------------------- */
    const SCROLL_TRIGGER = 60; // px from top before navbar "locks in"

    function updateNavScroll() {
        if (window.scrollY > SCROLL_TRIGGER) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    /* ----------------------------------------------------------
       B) ACTIVE LINK HIGHLIGHT
       Watches each section. When a section is in the middle third
       of the viewport, the matching nav link gets the .active class.

       To disable: comment out the activeObserver block below.
    ---------------------------------------------------------- */

    // Build a map: section element → its nav link
    const sectionMap = new Map();
    navLinks.forEach(link => {
        const id = link.getAttribute('href').slice(1); // strip the #
        const section = document.getElementById(id);
        if (section) sectionMap.set(section, link);
    });

    function clearActiveLinks() {
        navLinks.forEach(l => l.classList.remove('active'));
    }

    const activeObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    clearActiveLinks();
                    const matchingLink = sectionMap.get(entry.target);
                    if (matchingLink) matchingLink.classList.add('active');
                }
            });
        },
        {
            // Fires when section center crosses the middle third of the screen
            rootMargin: '-30% 0px -60% 0px',
            threshold: 0
        }
    );

    sectionMap.forEach((link, section) => activeObserver.observe(section));

    /* ----------------------------------------------------------
       Close mobile menu when any nav link is clicked
    ---------------------------------------------------------- */
    const mobileCheckbox = document.getElementById('nav-checkbox');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileCheckbox) mobileCheckbox.checked = false;
        });
    });

    // Attach scroll listener (passive = never blocks scrolling)
    window.addEventListener('scroll', updateNavScroll, { passive: true });
    updateNavScroll(); // run once on load in case page reloads mid-scroll
}


/* ================================================================
   3. SCROLL REVEAL ANIMATIONS
   ================================================================
   Watches every [data-animate] element.
   When it enters the viewport, .is-visible is added.
   CSS transitions handle the actual movement (see style.css §19).

   THRESHOLD: fraction of the element visible before it triggers.
   0.0 = fires as soon as 1px enters the screen (earlier)
   0.2 = fires when 20% of the element is visible (later/cleaner)
   ================================================================ */

function initScrollReveal() {

    const THRESHOLD = 0.12; // ← tune this: lower = triggers sooner

    const animatedEls = $all('[data-animate]');
    if (!animatedEls.length) return;

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Stop watching after first reveal — animation plays once only
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: THRESHOLD,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    animatedEls.forEach(el => revealObserver.observe(el));

    // Elements already visible on page load (e.g. hero) won't receive
    // a scroll event — trigger them after a short delay so the entrance
    // animation still plays visibly on first load.
    setTimeout(() => {
        animatedEls.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('is-visible');
                revealObserver.unobserve(el);
            }
        });
    }, 120);
}


/* ================================================================
   4. STAGGERED CHILDREN ANIMATIONS
   ================================================================
   For groups of sibling elements (cards, list items, proof cards),
   each child animates in one-by-one with a cascading delay.

   How it works:
   1. Finds each container from STAGGERED_GROUPS
   2. Tags each child with data-animate and a transition-delay
   3. Observes the parent — when it enters view, all children
      get .is-visible in a timed cascade

   STAGGER: ms between each child animating in.
   Increase for a slower, more dramatic cascade.
   Decrease for a snappier feel.

   To add a new staggered group: add its CSS selector to the
   STAGGERED_GROUPS array below.
   ================================================================ */

function initStaggeredAnimations() {

    const STAGGER = 100; // ms between each child's animation start

    /* Add any container selector whose children should stagger in */
    const STAGGERED_GROUPS = [
        '.agitation-cards',         // Pain-point cards (agitation section)
        '.proof-grid',              // Testimonial cards (social proof section)
        '.audience-grid',           // For / not-for columns
        '.features-section ul',     // Feature list items
        '.trust-badges',            // Hero trust badge chips
        '.footer-links',            // Footer nav links
    ];

    STAGGERED_GROUPS.forEach(selector => {
        $all(selector).forEach(parent => {
            const children = Array.from(parent.children);

            // Give each child an animate attribute + its staggered delay
            children.forEach((child, i) => {
                // Inherit any existing data-animate value, or default to fade-up
                if (!child.hasAttribute('data-animate')) {
                    child.setAttribute('data-animate', 'fade-up');
                }
                child.style.transitionDelay = `${i * STAGGER}ms`;
            });

            // Watch the parent container
            const staggerObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Small leading pause lets the parent's own animation
                            // start before children cascade in
                            setTimeout(() => {
                                children.forEach(child => {
                                    child.classList.add('is-visible');
                                });
                            }, 60);
                            staggerObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.08 }
            );

            staggerObserver.observe(parent);
        });
    });
}


/* ================================================================
   5. FAQ ACCORDION
   ================================================================
   Clicking a question smoothly opens its answer.
   Only one answer is open at a time — clicking a new one
   closes the previous before opening the new one.

   Accessibility:
   - aria-expanded reflects open/closed state for screen readers
   - Answers use the [hidden] HTML attribute (not just CSS)
   - Fully keyboard navigable (Enter / Space on button elements)

   To allow multiple answers open simultaneously:
   Remove the "close all others" forEach block inside the handler.
   ================================================================ */

function initFaqAccordion() {
    const faqItems = $all('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer   = item.querySelector('.faq-answer');

        if (!question || !answer) return;

        question.addEventListener('click', () => {
            const isOpen = question.getAttribute('aria-expanded') === 'true';

            /* Close all other open FAQ items */
            faqItems.forEach(otherItem => {
                const otherQ = otherItem.querySelector('.faq-question');
                const otherA = otherItem.querySelector('.faq-answer');
                if (otherQ && otherA && otherQ !== question) {
                    otherQ.setAttribute('aria-expanded', 'false');
                    collapseAnswer(otherA);
                }
            });

            /* Toggle this item */
            if (isOpen) {
                question.setAttribute('aria-expanded', 'false');
                collapseAnswer(answer);
            } else {
                question.setAttribute('aria-expanded', 'true');
                expandAnswer(answer);
            }
        });
    });
}

/**
 * Smoothly expands an FAQ answer with a max-height animation.
 * @param {HTMLElement} el - the .faq-answer div
 */
function expandAnswer(el) {
    el.hidden = false;

    // Read the full natural height so we can animate to it
    const fullHeight = el.scrollHeight + 'px';

    el.style.maxHeight  = '0';
    el.style.overflow   = 'hidden';
    el.style.transition = 'max-height 0.36s ease';

    // Force a reflow so the browser registers the 0 height before animating
    el.getBoundingClientRect();

    el.style.maxHeight = fullHeight;

    // Once the animation completes, remove inline styles so
    // the element can resize naturally (e.g. on window resize)
    el.addEventListener('transitionend', () => {
        el.style.maxHeight  = '';
        el.style.overflow   = '';
        el.style.transition = '';
    }, { once: true });
}

/**
 * Smoothly collapses an FAQ answer with a max-height animation.
 * @param {HTMLElement} el - the .faq-answer div
 */
function collapseAnswer(el) {
    if (el.hidden) return; // already closed, nothing to do

    // Lock the current height before animating down
    el.style.maxHeight  = el.scrollHeight + 'px';
    el.style.overflow   = 'hidden';
    el.style.transition = 'max-height 0.28s ease';

    // Force reflow
    el.getBoundingClientRect();

    el.style.maxHeight = '0';

    el.addEventListener('transitionend', () => {
        el.hidden = true;
        el.style.maxHeight  = '';
        el.style.overflow   = '';
        el.style.transition = '';
    }, { once: true });
}


/* ================================================================
   6. FOOTER YEAR AUTO-UPDATE
   ================================================================
   Keeps the © year in the footer current automatically.
   Targets <span id="footer-year"> in the HTML footer.

   No configuration needed — just ensure the span exists in HTML.
   ================================================================ */

function initFooterYear() {
    const yearEl = document.getElementById('footer-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}


/* ================================================================
   INIT — Bootstrap everything
   ================================================================
   Comment out any line to disable that feature completely.
   ================================================================ */

onReady(() => {
    initNavbar();               // Frosted navbar on scroll + active link highlight
    initScrollReveal();         // Fade/slide elements into view on scroll
    initStaggeredAnimations();  // Cascading child animations for card groups
    initFaqAccordion();         // Smooth open/close FAQ answers
    initFooterYear();           // Auto-update copyright year
});