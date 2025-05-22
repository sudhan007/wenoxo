<script lang="ts">
  import { onMount } from 'svelte';
  import { activeSection } from '$lib/stores';
	import Milestones from '@/components/home/Milestones.svelte';
	import Service from '@/components/home/Service.svelte';
	import HowWeWork from '@/components/home/How_we_work.svelte';
	import Contact from '@/components/home/contact.svelte';
	import Demo from '@/components/home/demo.svelte';
	import Header from '@/components/shared/Header.svelte';
	import Cursor from '@/components/shared/Cursor.svelte';
	import Footer from '@/components/shared/Footer.svelte';

  let isHomeSectionInView = true;
  let isContactSectionInView = false;
  let isFooterInView = false;
  let lastScrollY = 0;
  let scrollDirection = 'down';

  onMount(() => {
    if (typeof IntersectionObserver !== 'undefined') {
      // Track scroll direction
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;
      };
      window.addEventListener('scroll', handleScroll, { passive: true });

      const observer = new IntersectionObserver(
        (entries) => {
          let mostVisibleSection = null;
          let maxVisibility = 0;
          let headerActionTaken = false;

          entries.forEach((entry) => {
            const visibility = entry.intersectionRatio;
            const sectionId = entry.target.id;

            // Update header visibility
            if (!headerActionTaken) {
              if (sectionId === 'home') {
                isHomeSectionInView = entry.isIntersecting;
              } else if (sectionId === 'contact') {
                isContactSectionInView = entry.isIntersecting;
              } else if (sectionId === 'footer') {
                isFooterInView = entry.isIntersecting;
              }

              // const header = document.querySelector('.header');
              // if (header) {
              //   if (isContactSectionInView || isFooterInView) {
              //     header.classList.add('hidden');
              //   } else {
              //     header.classList.remove('hidden');
              //   }
              // }
              headerActionTaken = true;
            }

            // Special handling for home section when scrolling up
            if (scrollDirection === 'up' && sectionId === 'home' && visibility > 0.1) {
              mostVisibleSection = 'home';
              maxVisibility = 1; // Force home section to be selected
            }
            // For other sections, require at least 50% visibility
            else if (visibility > 0.5 && visibility > maxVisibility) {
              maxVisibility = visibility;
              mostVisibleSection = sectionId;
            }
          });

          if (mostVisibleSection) {
            activeSection.set(mostVisibleSection);
            console.log('Active section:', mostVisibleSection, 'Direction:', scrollDirection);
          }
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          rootMargin: '-100px 0px -20% 0px'
        }
      );

      const sections = [
        document.getElementById('home'),
        document.getElementById('about'),
        document.getElementById('service'),
        document.getElementById('howWeWork'),
        document.getElementById('contact'),
        document.getElementById('footer')
      ];

      sections.forEach((section) => {
        if (section) observer.observe(section);
      });

      return () => {
        sections.forEach((section) => {
          if (section) observer.unobserve(section);
        });
        window.removeEventListener('scroll', handleScroll);
      };
    }
  });
</script>

<style>
  .header {
    transition: opacity 0.9s ease, transform 0.9s ease, padding-top 0.9s ease;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
  }

  .header.hidden {
    opacity: 0;
    transform: translateY(-100%);
    pointer-events: none;
  }


  @media (max-width: 639px) {
    .header {
      padding-top: 0.5rem;
    }
    .header.lg\:pt-8 {
      padding-top: 1rem;
    }
  }
</style>

<main class="relative pt-16 sm:pt-20">
  <div class="hidden lg:block">
    <Cursor />
  </div>

  <div class={`header ${$activeSection==='home' ? 'lg:pt-8' : 'pt-0'} ${$activeSection==='contact'|| $activeSection === 'footer'?'hidden transition-all duration-900':'block transition-all duration-900'} transition-all duration-900`}>
    <Header />
  </div>

  <div id="home">
    <Demo />
  </div>

  <div id="about" class="mt-0">
    <Milestones />
  </div>

  <div id="service" class="mt-0">
    <HowWeWork />
  </div>

  <div id="howWeWork" class="mt-0">
    <Service />
  </div>

  <div id="contact" class="mt-0">
    <Contact />
  </div>

  <div id="footer" class="mt-0">
    <Footer />
  </div>
</main>