<!-- <script>
    import { fade, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
  
    let formData = {
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      resume: null,
      coverLetter: null
    };
  
    let activeTab = 'all';
    let selectedFile = null;
  
    const jobOpenings = [
      {
        id: 1,
        title: "Senior UI/UX Designer",
        department: "Design",
        type: "Full-time",
        location: "Remote",
        description: "Lead our design team in creating stunning interfaces that delight users."
      },
      {
        id: 2,
        title: "Frontend Developer",
        department: "Engineering",
        type: "Full-time",
        location: "San Francisco",
        description: "Build beautiful, responsive web applications with modern frameworks."
      },
      {
        id: 3,
        title: "Product Manager",
        department: "Product",
        type: "Contract",
        location: "New York",
        description: "Guide product strategy and work with our design-focused teams."
      }
    ];
  
    $: filteredJobs = activeTab === 'all' 
      ? jobOpenings 
      : jobOpenings.filter(job => job.department.toLowerCase() === activeTab);
  
    function handleChange(e) {
      formData = {
        ...formData,
        [e.target.name]: e.target.value
      };
    }
  
    function handleFileChange(e) {
      const file = e.target.files[0];
      formData = {
        ...formData,
        [e.target.name]: file
      };
      if (e.target.name === 'resume') {
        selectedFile = file;
      }
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      // Form submission logic here
      console.log(formData);
    }
  
    function scrollToForm() {
      const form = document.getElementById('application-form');
      form?.scrollIntoView({ behavior: 'smooth' });
    }
  </script>
  
  <div class=" text-gray-800 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" >
   
    <section class="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-24 gap-8">
      <div class="max-w-2xl" in:fly={{ y: 20, duration: 800 }}>
        <h1 class="text-4xl sm:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent leading-tight">
          Design Your Future With Us
        </h1>
        <p class="text-xl text-gray-600 mb-8 leading-relaxed">
          Join our team of creative innovators building visually stunning experiences.
        </p>
        <button 
          on:click={scrollToForm}
          class="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          Apply Now
        </button>
      </div>
      
      <div class="relative w-full max-w-lg h-80 lg:h-96" in:fade={{ delay: 200 }}>
        <div class="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl overflow-hidden">
          <div class="absolute -inset-20 bg-[radial-gradient(circle,white,transparent_70%)] animate-spin-slow" />
        </div>
      </div>
    </section>
  
    <section class="py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Current Openings</h2>
        <div class="flex flex-wrap justify-center gap-2">
          {#each ['all', 'design', 'engineering', 'product'] as tab}
            <button
              on:click={() => activeTab = tab}
              class={`px-6 py-2 rounded-full font-semibold transition-colors ${
                activeTab === tab 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          {/each}
        </div>
      </div>
  
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {#each filteredJobs as job (job.id)}
          <div 
            transition:fly={{ y: 20, duration: 300 }}
            class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border border-gray-100 transition-all hover:-translate-y-1"
          >
            <h3 class="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
            <div class="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4">
              <span class="px-2 py-1 bg-blue-50 text-blue-600 rounded-full">{job.department}</span>
              <span>•</span>
              <span>{job.type}</span>
              <span>•</span>
              <span>{job.location}</span>
            </div>
            <p class="text-gray-600 mb-6">{job.description}</p>
            <a 
              href="#application-form" 
              class="text-blue-500 font-semibold inline-flex items-center gap-1 hover:text-blue-600 transition-colors group"
            >
              Apply for this position
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        {/each}
      </div>
    </section>
  
    <section id="application-form" class="bg-gray-50 rounded-2xl p-8 sm:p-12 my-16">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Application Form</h2>
        <p class="text-lg text-gray-600">We're excited you're interested in joining our team!</p>
      </div>
      
      <form on:submit={handleSubmit} class="max-w-3xl mx-auto">
        <div class="grid gap-6 md:grid-cols-2 mb-8">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              bind:value={formData.name}
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              bind:value={formData.email}
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              bind:value={formData.phone}
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          
          <div>
            <label for="position" class="block text-sm font-medium text-gray-700 mb-1">Position *</label>
            <select
              id="position"
              name="position"
              bind:value={formData.position}
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-no-repeat bg-[right_1rem_center] bg-[length:1em]"
            >
              <option value="">Select a position</option>
              {#each jobOpenings as job (job.id)}
                <option value={job.title}>{job.title}</option>
              {/each}
            </select>
          </div>
          
          <div>
            <label for="experience" class="block text-sm font-medium text-gray-700 mb-1">Years of Experience *</label>
            <select
              id="experience"
              name="experience"
              bind:value={formData.experience}
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')] bg-no-repeat bg-[right_1rem_center] bg-[length:1em]"
            >
              <option value="">Select experience</option>
              <option value="0-2">0-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>
          
          <div>
            <label for="resume" class="block text-sm font-medium text-gray-700 mb-1">Resume *</label>
            <div class="flex">
              <label class="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg truncate">
                {selectedFile ? selectedFile.name : 'Choose file'}
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  on:change={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                  class="hidden"
                />
              </label>
              <button 
                type="button" 
                on:click={() => document.getElementById('resume').click()}
                class="px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-r-lg hover:bg-gray-300 transition-colors"
              >
                Browse
              </button>
            </div>
          </div>
          
          <div>
            <label for="coverLetter" class="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
            <div class="flex">
              <label class="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg truncate">
                {formData.coverLetter ? formData.coverLetter.name : 'Choose file'}
                <input
                  type="file"
                  id="coverLetter"
                  name="coverLetter"
                  on:change={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  class="hidden"
                />
              </label>
              <button 
                type="button" 
                on:click={() => document.getElementById('coverLetter').click()}
                class="px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-r-lg hover:bg-gray-300 transition-colors"
              >
                Browse
              </button>
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          class="w-full max-w-xs mx-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all hover:scale-102 active:scale-98 block"
        >
          Submit Application
        </button>
      </form>
    </section>
    
    <section class="py-16 text-center">
      <h2 class="text-3xl font-bold text-gray-900 mb-12">Why Join Our Team?</h2>
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {#each [
          {
            icon: '💎',
            title: 'Competitive Compensation',
            description: 'We offer salaries and benefits that match your skills and experience.'
          },
          {
            icon: '🎨',
            title: 'Creative Freedom',
            description: 'Work on exciting projects with the latest design tools and technologies.'
          },
          {
            icon: '🌎',
            title: 'Remote Options',
            description: 'Flexible work arrangements to suit your lifestyle.'
          },
          {
            icon: '📈',
            title: 'Growth Opportunities',
            description: 'Continuous learning and career advancement programs.'
          }
        ] as benefit, index (index)}
          <div 
            transition:fly={{ y: 20, duration: 300, delay: index * 100 }}
            class="bg-white rounded-xl p-8 shadow-sm hover:shadow-md border border-gray-100 transition-all hover:-translate-y-1"
          >
            <div class="text-4xl mb-4">{benefit.icon}</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
            <p class="text-gray-600">{benefit.description}</p>
          </div>
        {/each}
      </div>
    </section>
  </div>
  
  <style global>
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin-slow {
      animation: spin-slow 20s linear infinite;
    }
  </style> -->