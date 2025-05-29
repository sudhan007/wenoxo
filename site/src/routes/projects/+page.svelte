<script lang="ts">
    import { onMount, tick } from 'svelte';
    import { goto } from '$app/navigation';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger);
  
    // Interface for project data
    interface Project {
      id: string;
      name: string;
      image: string;
      overview: string;
      description: string;
      gallery: string[];
    }
  
    // Fetch project data
    let projects: Project[] = [];
    onMount(async () => {
      try {
        const response = await fetch('/projects.json');
        projects = await response.json();
  
        // Animate cards after data is loaded
        await tick();
        animateCards();
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    });
  
    // Function to animate cards on scroll
    function animateCards() {
      gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1, // Stagger the animation for each card
          }
        );
      });
    }
  
    // Navigate to project detail page
    function navigateToProject(id: string) {
      goto(`/projects/${id}`);
    }
  </script>
  
  <section class=" ">
    <img
    src="/images/glassmorphism.png"
    class="absolute object-cover py-10 md:py-0"
    alt=""
    loading="lazy"
>
    <div class="container mx-auto max-w-5xl px-10 py-32">
      <h2 class="text-4xl font-bold text-center text-gray-800 mb-12">Our Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        {#each projects as project (project.id)}
        <div
        class=" group project-card shadow-2xl bg-white  rounded-lg  overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
        on:click={() => navigateToProject(project.id)}
      >
        <div class="relative h-72 ">
          <!-- Project Image -->
          <img
            src={project.image}
            alt={project.name}
            class="w-full h-full object-contain  py-3"
            on:error={(e) => (e.currentTarget.src = '/images/placeholder.jpg')}
          />
          
          <!-- Overlay Container -->
          <div class="absolute inset-0  flex items-center justify-center">
            <!-- Dark Overlay - opacity changes on hover -->
            <div class="absolute inset-0  bg-black opacity-0 h-72 group-hover:opacity-60 transition-opacity duration-300"></div>
            
            <!-- Text Content - always fully visible -->
            <p class="relative  z-10 opacity-0 group-hover:opacity-100 text-white text-lg font-semibold p-3 text-center">
              {project.overview}
            </p>
          </div>
        </div>
        
        <!-- Project Info -->
        <div class="p-6 border-t">
          <h3 class="text-xl text-center font-semibold text-gray-800 mb-2">{project.name}</h3>
        </div>
      </div>
        {/each}
      </div>
    </div>
  </section>
  
  <style>
    .project-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
  
    .project-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }
  
    .project-card img {
      transition: transform 0.3s ease;
    }
  
    .project-card:hover img {
      transform: scale(1.05);
    }
  
    .project-card .absolute {
      transition: opacity 0.3s ease;
    }
  </style>
  