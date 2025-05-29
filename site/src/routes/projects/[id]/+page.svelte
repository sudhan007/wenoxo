<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
  
    // Interface for project data
    interface Project {
      id: string;
      name: string;
      image: string;
      overview: string;
      description: string;
      gallery: string[];
    }
  
    // Extract project ID from URL
    $: projectId = $page.params.id;
    let project: Project | null = null;
    let error: string | null = null;
  
    onMount(async () => {
      try {
        const response = await fetch('/projects.json');
        const projects: Project[] = await response.json();
        project = projects.find((p) => p.id === projectId) || null;
        if (!project) {
          error = 'Project not found';
        }
      } catch (err) {
        error = 'Error loading project details';
        console.error(err);
      }
    });
  
    // Navigate back to portfolio
    function goBack() {
      goto('/projects');
    }
  </script>
  
  <section class="py-32 bg-gray-50 min-h-screen">
    {#if error}
      <div class="container mx-auto px-10  text-center">
        <h2 class="text-3xl font-bold text-red-600 mb-4">{error}</h2>
        <button
          on:click={goBack}
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    {:else if project}
      <div class="container mx-auto px-4">
        <!-- Back Button -->
        <button
          on:click={goBack}
          class="mb-6 flex items-center text-blue-600 hover:underline"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Go Back
        </button>
  
        <!-- Project Header -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 class="text-4xl font-bold text-gray-800 mb-4">{project.name}</h1>
          <p class="text-xl text-gray-600 mb-6">{project.overview}</p>
          <p class="text-gray-700 text-lg leading-relaxed">{project.description}</p>

          <!-- <img
            src={project.image}
            alt={project.name}
            class="w-full h-96 object-cover rounded-lg mb-6"
            on:error={(e) => (e.currentTarget.src = '/images/placeholder.jpg')}
          /> -->
        </div>
  
        <!-- Gallery -->
        <div class=" rounded-lg p-8">
          <!-- <h2 class="text-2xl font-semibold text-gray-800 mb-6">Project Gallery</h2> -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each project.gallery as image}
              <img
                src={image}
                alt={`${project.name} gallery`}
                class="w-full h-auto object-cover rounded-lg shadow-lg"
                on:error={(e) => (e.currentTarget.src = '/images/placeholder.jpg')}
              />
            {/each}
          </div>
        </div>
      </div>
    {:else}
      <div class="container mx-auto px-4 text-center">
        <p class="text-xl text-gray-600">Loading project details...</p>
      </div>
    {/if}
  </section>
  
  <style>
    /* Add some custom styles for better visual appeal */
    .container {
      max-width: 1200px;
    }
  
    .bg-white {
      background-color: #ffffff;
    }
  
    .rounded-lg {
      border-radius: 0.5rem;
    }
  
    .shadow-lg {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  
    .text-gray-800 {
      color: #2d3748;
    }
  
    .text-gray-600 {
      color: #718096;
    }
  
    .text-gray-700 {
      color: #4a5568;
    }
  
    .transition-colors {
      transition: color 0.3s ease;
    }
  

  
    /* Responsive adjustments */
    @media (max-width: 640px) {
      .text-4xl {
        font-size: 2rem;
      }
  
      .text-2xl {
        font-size: 1.5rem;
      }
  
      .text-lg {
        font-size: 1.125rem;
      }
  
      .h-96 {
        height: 24rem;
      }
  
      .h-64 {
        height: 16rem;
      }
    }
  </style>
  