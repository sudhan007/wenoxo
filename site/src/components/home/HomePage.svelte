<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  
  let scrollY = 0;
  let innerWidth = 0;
  let innerHeight = 0;
  let scaleElement: HTMLDivElement;
  let contentHeight: number = 0; // Default to 0, will be updated by ResizeObserver
  
  const initialWidth = 920;
  const initialHeight = 460; 
  const expandedHeight = 800;
  
  const scale = tweened(1, {
    duration: 500,
    easing: cubicOut
  });

  const scrollProgress = tweened(0, {
    duration: 500,
    easing: cubicOut
  });

  $: widthScale = innerWidth / initialWidth;
  $: heightScale = innerHeight / initialHeight;
  $: maxScale = Math.max(widthScale, heightScale, 1); // Ensure at least 1

  // Set scaledHeight to start larger and expand smoothly
  $: scaledHeight = initialHeight * (1 + Math.min(1, maxScale - 1));

  // Adjust totalHeight dynamically
  $: totalHeight = Math.max(contentHeight || innerHeight, innerHeight) + (scaledHeight - initialHeight);

  onMount(() => {
    const updateScroll = () => {
      if (!scaleElement || !innerHeight) return; // Guard clause

      const progress = Math.min(1, scrollY / (totalHeight - innerHeight));
      scrollProgress.set(progress);

      // More gradual scaling
      const newScale = 1 + progress * (maxScale - 1);
      scale.set(newScale > 1 ? newScale : 1); // Ensure scale doesn't go below 1
    };

    // Initial update to set correct dimensions
    updateScroll();

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target === scaleElement.parentElement?.parentElement) {
          contentHeight = entry.contentRect.height;
          updateScroll(); // Update immediately when content size changes
        }
      }
    });

    if (scaleElement?.parentElement?.parentElement) {
      resizeObserver.observe(scaleElement.parentElement.parentElement as HTMLElement);
    }

    let ticking = false;
    const throttledUpdateScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledUpdateScroll);
    window.addEventListener('resize', throttledUpdateScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledUpdateScroll);
      window.removeEventListener('resize', throttledUpdateScroll);
      resizeObserver.disconnect();
    };
  });

  // Smooth transition effect
  $: scaleStyle = `
    transform: scale(${$scale});
    transform-origin: center center;
    border-radius: 60px;
    transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  `;

  $: indicatorStyle = `
    width: ${$scrollProgress * 100}%;
  `;

  $: mainStyle = `
    min-height: ${totalHeight}px-100px;
    border-radius: 60px;
  `;

  $: isFullyScaled = $scale >= maxScale;
</script>

<svelte:window bind:scrollY bind:innerWidth bind:innerHeight />

<main class="flex mb-40 relative z-10 w-full flex-col items-center justify-between" style={mainStyle}>
<div class="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
  <div 
    class="h-full bg-blue-500 transition-all duration-300 ease-out" 
    style={indicatorStyle}
    role="progressbar"
    aria-valuenow={$scrollProgress * 100}
    aria-valuemin="0"
    aria-valuemax="100"
  ></div>
</div>

<section class="container mx-auto flex flex-col pt-[120px] items-center justify-center">
  <div class="w-5/6">
    <h1 class="text-[#061C3D] leading-normal text-center font-sans text-7xl font-semibold">
      Shape Your Ideas into Boundless Digital Experiences 
      <span class="text-[#0B63E5]">Wenoxo.</span>
    </h1>
    <div class="w-full flex justify-center pt-20 ">
      <p class="text-[#061C3D] text-2xl text-center w-3/4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam odio 
        vitae saepe illum debitis quis porro rem labore corporis voluptates 
        ratione totam, veniam assumenda libero, molestiae illo perspiciatis.
      </p>
    </div>
  </div>
</section>
<div class="w-full  flex sticky top-0 justify-center items-center overflow-hidden"
style={`height: ${scaledHeight}px; border-radius: 60px;`}>
  <div class="w-[50%] h-[50%] mx-20 rounded-lg flex justify-center items-center overflow-visible">
    <video
      bind:this={scaleElement}
      class="w-full h-full object-cover transition-transform duration-500 ease-out rounded-lg"
      style={scaleStyle}
      autoplay
      muted
      loop
      playsinline
    >
      <source src="/assets/video/intro-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</div>
</main>

<style>
:global(body) {
  border-radius: 60px;
  overflow-x: hidden;
}
</style>