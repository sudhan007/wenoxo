<script lang="ts">
  import { onMount } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import AnimatedCards from './AnimatedCards.svelte';

  let text = "Solving business challenges with innovative digital solutions that drive sustainable growth across industries.";
  let letters: { char: string; color: string }[] = [];
  let sectionElement: HTMLElement;

  onMount(() => {
      letters = text.split('').map((char, index) => ({
          char,
          color: index < 0 ? 'rgb(0, 0, 0)' : 'rgba(0, 0, 0, 0)'
      }));

      const handleScroll = () => {
          if (!sectionElement) return;

          const rect = sectionElement.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionHeight = rect.height;
          const windowHeight = window.innerHeight;

          let visibilityPercentage = (windowHeight - sectionTop) / (windowHeight + sectionHeight);
          visibilityPercentage = Math.max(0, Math.min(1, visibilityPercentage));

          const totalLetters = letters.length;
          const blackLetters = Math.floor(totalLetters * (visibilityPercentage * 2.2));

          letters = letters.map((letter, index) => ({
              ...letter,
              color: index < blackLetters ? 'rgb(0, 0, 0)' : 'rgba(0, 0, 0, 0)'
          }));
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  });

  let cardsContainer: HTMLElement;
  let cardElements: HTMLElement[] = [];

  onMount(() => {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('scroll-translate');
                  entry.target.classList.add('show');
                  observer.unobserve(entry.target);
              }
          });
      }, { threshold: 0.1 });

      cardElements.forEach((card) => observer.observe(card));

      if (cardsContainer) {
          observer.observe(cardsContainer);
      }

      return () => observer.disconnect();
  });
</script>

<section bind:this={sectionElement} class="flex flex-col items-center justify-center bg-white lg:pt-20 pt-10">
  <div class="container px-4 md:max-w-6xl w-full md:mx-auto">
      <h1 class="lg:w-3/4 lg:mx-auto text-center font-fontspring lg:text-5xl md:text-3xl text-2xl !leading-normal font-bold">
          {#each letters as letter}
              <span style="color: {letter.color}; transition: color 0.5s ease;">{letter.char}</span>
          {/each}
      </h1>
  </div>
</section>
<AnimatedCards />

<style>
  section {
      transition: all 0.1s ease;
  }

  @keyframes rotate {
      100% {
          transform: rotate(1turn);
      }
  }
</style>