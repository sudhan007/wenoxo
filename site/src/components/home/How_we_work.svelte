<script>
  /**
   * @type {number | null}
   */
  let hoverIndex = null;

  const steps = [
    { id: 1, title: 'Mobile Development', image: '/assets/home/Mobile app development.png', description: 'Building scalable, high-performance apps that enhance engagement and optimize user experience' },
    { id: 2, title: 'Website Development', image: '/assets/home/webdev.png', description: 'Developing adaptive websites that optimize user interaction and ensure performance.' },
    { id: 3, title: 'Cloud Application', image: '/assets/home/Cloud application.png', description: 'Creating secure, scalable cloud applications that streamline business operations seamlessly.' },
    { id: 4, title: 'ERP Software & CMS Development', image: '/assets/home/ERP.png', description: 'Tailoring systems to automate processes and optimize business workflow efficiently.' },
    { id: 5, title: 'UI/UX Design', image: '/assets/home/Design.jpg', description: 'Designing visually appealing, user-focused interfaces to ensure optimal user experience.' }
  ];
</script>
<div class="mt-16 container  md:mt-24 lg:mt-32 flex justify-center items-center ">
  <!-- Mobile/Medium Screen Layout (hidden on lg and above) -->
  <div class="lg:hidden w-full p-5 bg-gray-50 rounded-3xl ">
    <div class="flex flex-col gap-4 sm:gap-5">
      <h2 class=" text-4xl md:text-5xl lg:text-6xl font-semibold text-[#3F3F3F]">Our Services</h2>
      <p class="w-full sm:w-3/4 md:w-1/2 text-base sm:text-lg font-light text-gray-500 leading-relaxed">
        Focused on delivering innovative digital solutions that streamline operations, enhance user experience, and drive measurable business growth.
    </div>

    <div class="mt-8 sm:mt-12 md:mt-16">
      <div class="flex flex-col sm:gap-6 md:gap-8">
        {#each steps as step, index}
          <div
            role="button"
            tabindex="0"
            class="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-8 transition-all duration-300 py-4 sm:py-6 px-4 sm:px-6 rounded-xl sm:rounded-2xl hover:bg-gray-100"
            on:mouseenter={() => hoverIndex = index}
            on:mouseleave={() => hoverIndex = null}
            on:click={() => (hoverIndex = hoverIndex === index ? null : index)}
            aria-label={`Step ${step.id}: ${step.title}`}
          >
            <div class="text-base sm:text-lg font-light text-gray-600 w-12 sm:w-16">
              {step.id < 10 ? `0${step.id}` : step.id}/
            </div>
            <div class="hidden sm:block relative w-full sm:w-32 md:w-40 h-24 sm:h-28 md:h-32 flex justify-center">
              <img
                src={step.image}
                class="{hoverIndex === index ? 'opacity-100' : 'opacity-0 sm:opacity-100'} rounded-lg object-cover w-full h-full transition-opacity duration-300"
                alt={step.title}
              />
            </div>
            <div class="text-xl sm:text-2xl font-medium text-gray-900 w-full sm:w-1/4">
              {step.title}
            </div>
            <div class="text-base sm:text-lg font-light text-gray-600">
              {step.description}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Large Screen Layout (hidden below lg) -->
  <div class="hidden lg:block w-full  bg-gray-50 rounded-3xl py-12">
    <div class="flex flex-col gap-5 px-12">
      <h2 class="text-5xl font-fontspring font-medium text-gray-900">Our Services</h2>
      <p class="lg:w-2/3 md:w-3/4 w-5/6 text-lg font-light text-gray-500 leading-loose">
        Focused on delivering innovative digital solutions that streamline operations, enhance user experience, and drive measurable business growth.
      </p>
    </div>

    <div class="lg:mt-12 ">
      <table class="w-full border-collapse ">
        <tbody class="">
          {#each steps as step, index}
            <tr
              role="button"
              tabindex="0"
              class="group group-hover:ml-20 transition-all duration-300 relative"
              on:mouseenter={() => hoverIndex = index}
              on:mouseleave={() => hoverIndex = null}
              aria-label={`Step ${step.id}: ${step.title}`}
            >
              <td class="step p-12 text-lg font-light text-gray-600">
                {step.id < 10 ? `0${step.id}` : step.id}/
              </td>
              <td class="relative">
                <div class="absolute top-3/4 left-1/2 transform h-48 min-w-40 -translate-x-1/2 -translate-y-1/2 flex justify-center">
                  {#if hoverIndex === index}
                    <img
                      src={step.image}
                      class="rounded-xl object-cover h-32 min-w-40 opacity-100 transition-opacity duration-300"
                      alt={step.title}
                    />
                  {/if}
                </div>
              </td>
              <td class="p-12 pr-20 text-2xl font-medium text-gray-900">{step.title}</td>
              <td class="p-12 text-lg font-light text-gray-600">{step.description}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>


</div>
<style>
  .group {
    /* position: relative; */
    transition: left 0.9s ease-in-out;
  }


  td {
    padding: 50px;
  }

  @media (max-width: 1023px) {
    .group:hover {
      transform: translateX(0.5rem); /* Subtle shift for mobile */
    }
  }

  @media (min-width: 1024px) {
    .group:hover{
      transform: translateX(0.9rem);
      transition: transform 0.3s ease-in-out;
    }
  }
</style>
