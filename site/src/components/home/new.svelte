<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { animate, scroll, inView } from '@motionone/dom';
	import { goto } from '$app/navigation';
	import { ArrowRight } from 'lucide-svelte';
    
    // export let onComplete: () => void;
    const imageSources = [
        '/pictures/d1.png',
        '/pictures/d2.png',
        '/pictures/d3.png',
        '/pictures/d4.png',
        '/pictures/d5.png',
        '/pictures/d6.png'
    ];

    // Text items for the text carousel
    const textItems = [
        'E-commerce',
        'Healthcare',
        'Finance',
        'Education',
        'Real Estate',
        'Logistics'
    ];

    const images = [
      { id: 1, src: '/pictures/d5.png', title: 'Image 1' },
      { id: 2, src: '/pictures/d1.png', title: 'Image 2' },
      { id: 3, src: '/pictures/d3.png', title: 'Image 3' },
      { id: 4, src: '/pictures/d2.png', title: 'Image 4' },
      { id: 5, src: '/pictures/d4.png', title: 'Image 5' },
    ];
    
    let container: HTMLElement;
    let progressBar: HTMLElement;
    let currentIndex = 0;
    let isAtEnd = false;
    let scrollY = 0;
    let touchStartY = 0;
    
    onMount(() => {
      // Scroll progress animation
      scroll(
        animate(progressBar, { scaleX: [0, 1] }),
        { target: container, axis: 'y', offset: ['start start', 'end start'] }
      );
      
      // Handle scroll events
      container.addEventListener('scroll', handleScroll);
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      
      // Initial animation
      animateFirstImage();
    });
    
    onDestroy(() => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    });
    
    function animateFirstImage() {
      const firstImage = document.querySelector('#image-0');
      if (firstImage) {
        animate(firstImage, { opacity: [0, 1], y: [50, 0] }, { duration: 0.5 });
      }
    }
    
    function handleScroll() {
      const scrollTop = container.scrollTop;
      const maxScroll = container.scrollHeight - container.clientHeight;
      const threshold = maxScroll - 10; // 10px buffer
      
      // Update current index based on scroll position
      currentIndex = Math.floor((scrollTop / maxScroll) * (images.length - 1));
      
      // Check if reached end
      if (scrollTop >= threshold && !isAtEnd) {
        isAtEnd = true;
        // setTimeout(() => onComplete(), 500); // Small delay before transition
      }
    }
    
    function handleTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }
    
    function handleTouchMove(e: TouchEvent) {
      if (!isAtEnd) return;
      
      // Prevent scrolling down when at end
      const touchY = e.touches[0].clientY;
      if (touchY < touchStartY) {
        e.preventDefault();
      }
    }
</script>

<div class="relative h-[calc(h-screen - 100px)] overflow-hidden container">

  <!-- Scroll Container -->
  <div bind:this={container} 
       class="h-[calc(h-screen - 100px)] bg-blue-900 overflow-y-auto flex gap-10 snap-y snap-mandatory">
       <div class="w-1/2 sticky top-0">
        <div class="flex flex-col items-center lg:items-start">
            <h1 class="xl:text-6xl font-sharp-semibold lg:text-5xl text-4xl font-bold my-10 text-center lg:text-left !leading-tight">Shape Your Ideas into Boundless Digital Experiences</h1>
           <p class="md:text-lg px-5 font-sharp-semibold lg:px-0 text-center lg:text-left   text-base pb-10">
            We specialize in building dynamic, high-performing websites and mobile applications that are not only responsive but also user-friendly and strategically aligned with your business goals. We focus on creating digital platforms that enhance user engagement, streamline operations, and support your long-term business objectives.
           </p>
            <p
            onclick={()=>{goto('/#howWeWork')}}
			class="group relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-indigo-200 px-6 py-2 text-lg mt-5 md:mt-0 w-fit"
		>
			<span
				class="group-hover:animate-fallIn relative z-10 transition-all duration-300 group-hover:text-white"
			>
				Explore
			</span>
			<span
				class="group-hover:animate-fallIn relative z-10 transition-all duration-300 group-hover:text-white"
			>
				<ArrowRight size={20} />
			</span>

			<!-- Flow effect -->
			<span
				class="absolute inset-0 origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100"
			></span>
		</p>
        </div>
        <div class="flex flex-col gap-10 lg:pb-56 py-20">
            <div class="flex flex-col gap-10 lg:hidden">
                <!-- Image carousel inside bordered wrapper -->
                <div class="wrapper lg:hidden">
                    {#each imageSources as src, index}
                        <div class="img-item" style="--i: {index + 1}">
                            <img  loading="eager" src={src} alt={`Image ${index + 1}`} class="h-full w-full object-contain" />
                        </div>
                    {/each}
            
                </div>
            </div>

            <!-- Text carousel with CSS animation -->
            <div class="text-wrapper">
                {#each textItems as text, index}
                    <div class="text-item" style="--i: {index + 1}">
                        <p class="md:text-3xl font-josefin text-xl">{text}</p>
                    </div>
                {/each}
                {#each textItems as text, index}
                <div class="text-item" style="--i: {index + 1}">
                    <p class="md:text-3xl font-josefin text-xl">{text}</p>
                </div>
            {/each}
            {#each textItems as text, index}
            <div class="text-item" style="--i: {index + 1}">
                <p class="md:text-3xl font-josefin text-xl">{text}</p>
            </div>
        {/each}
            </div>
        </div>
       </div>
    <div class="h-full z-50">
      {#each images as image, index}
        <div id={`image-${index}`} 
             class="h-screen w-full flex items-center justify-center snap-start">
          <div class="flex flex-col items-center">
            <img src={image.src} alt={image.title}
                 class="max-h-[70vh] max-w-full object-contain">
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  /* Snap scrolling */
  .snap-y {
    scroll-snap-type: y mandatory;
  }
  .snap-start {
    scroll-snap-align: start;
  }
  
  /* Disable overscroll behavior */
  body {
    overscroll-behavior-y: none;
    margin: 0;
    overflow-x: hidden;
  }
  :root {
    --duration: 10s; /* Duration for image animation */
    --totalitems: 5; /* Number of unique image items */
    --text-duration: 8s; /* Duration for text animation */
    --totaltextitems: 6; /* Number of unique text items */
    --image-width: 250px; /* Fixed width for images */
}

.wrapper {
    position: relative;
    display: flex;
    height: 10vw; /* Fixed height */
    width: 50vw; /* Fixed width */
    overflow: hidden;
    margin: 0 auto; /* Center the wrapper */
}

.img-item {
    position: absolute;
    height: inherit;
    width: var(--image-width); /* Fixed width */
    left: 100%; /* Start off-screen to the right */
    animation: scrollX var(--duration) linear infinite;
    animation-delay: calc(var(--duration) / var(--totalitems) * var(--i));
}

@keyframes scrollX {
    to {
        left: calc(-100% - var(--image-width)); /* Move to off-screen left */
    }
}

.img-item img {
    height: 100%;
    left: 0;
    width: 100%; /* Fill the fixed width */
    object-fit: cover; /* Ensure image fills the area */
}

.text-wrapper {
    position: relative;
    display: flex;
    height: 3rem; /* Fixed height for text */
    width: 50vw; /* Match wrapper width */
    overflow: hidden;
    margin: 0 auto; /* Center the text wrapper */
}

.text-item {
    position: absolute;
    height: inherit;
    width: 200px; /* Fixed width for text items */
    left: calc(-1 * 200px * var(--totaltextitems)); /* Start off-screen to the left */
    display: flex;
    align-items: center;
    animation: scrollText var(--text-duration) linear infinite;
    animation-delay: calc(var(--text-duration) / var(--totaltextitems) * var(--i));
}

@keyframes scrollText {
    to {
        left: 100%; /* Move to off-screen right */
    }
}

.scroll-container {
    scroll-snap-type: y mandatory;
}

.left-section {
    position: sticky;
    top: 0;
    height: 100vh;
    flex-shrink: 0;
}

.right-section {
    flex-grow: 1;
}

.right-images img {
    transform-origin: center;
}

.image-background {
    width: 100%;
    height: 100%;
}

@media (max-width: 1023px) {
    .scroll-container {
        min-height: auto;
        max-height: none;
        overflow-y: auto;
        flex-direction: column;
    }

    .left-section {
        position: relative;
        height: auto;
        width: 100%;
    }

    .right-section {
        display: none;
    }

    .wrapper {
        width: 100vw;
        height: 150px;
        overflow: hidden;
        position: relative;
    }

    .img-item {
        width: var(--image-width);
        height: 100%;
        position: absolute;

        will-change: transform; /* Optimize for animation */
    }

    .img-item img {
        width: 100%;
        height: 100%;
        object-fit: contain; /* Ensure images maintain aspect ratio */
        display: block;
    }

    @keyframes scrollX {
        to {
            left: calc(-100% - var(--image-width)); /* Move to off-screen left */
        }
    }

    .text-wrapper {
        width: 90vw; /* Wider on mobile */
        height: 2.5rem; /* Slightly smaller for mobile */
    }

    .text-item {
        left: calc(-1 * 200px * var(--totaltextitems)); /* Start off-screen to the left */
    }

    @keyframes scrollText {
        to {
            left: 100%; /* Move to off-screen right */
        }
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    .wrapper {
        width: 80vw; /* Slightly narrower for medium screens */
        height: 120px; /* Adjusted height for medium screens */
    }

    .text-wrapper {
        width: 80vw; /* Match wrapper width */
    }
}
</style>