<script lang="ts">
	import { onMount } from 'svelte';
	import { Motion } from 'svelte-motion';
	import { writable } from 'svelte/store';
  
	// References to DOM elements
	let sectionElement: HTMLElement | null = null;
	let firstRowElement: HTMLElement | null = null;
	let thirdRowElement: HTMLElement | null = null;
  
	// Reactive scroll position
	const scrollY = writable(0);
  
	// Reactive variables for row positions
	let firstRowTop = 0;
	let firstRowBottom = 0;
	let thirdRowTop = 0;
	let windowHeight = 0;
  
	// Debounce utility
	function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
	  let timeout: number | undefined;
	  return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	  };
	}
  
	onMount(() => {
	  const updatePositions = () => {
		if (!firstRowElement || !thirdRowElement || !sectionElement) return;
  
		const firstRowRect = firstRowElement.getBoundingClientRect();
		const thirdRowRect = thirdRowElement.getBoundingClientRect();
		const scrollPosition = window.scrollY;
  
		firstRowTop = firstRowRect.top + scrollPosition - 220;
		firstRowBottom = firstRowRect.bottom + scrollPosition;
		thirdRowTop = thirdRowRect.top - 130 + scrollPosition;
		windowHeight = window.innerHeight;
	  };
  
	  // Initial update
	  updatePositions();
  
	  // Handle scroll with requestAnimationFrame
	  let rafId: number;
	  const handleScroll = () => {
		cancelAnimationFrame(rafId);
		rafId = requestAnimationFrame(() => {
		  scrollY.set(window.scrollY);
		});
	  };
  
	  // Debounced scroll and resize handlers
	  const debouncedScroll = debounce(handleScroll, 10);
	  const debouncedResize = debounce(updatePositions, 100);
  
	  // Event listeners
	  window.addEventListener('scroll', debouncedScroll);
	  window.addEventListener('resize', debouncedResize);
  
	  return () => {
		window.removeEventListener('scroll', debouncedScroll);
		window.removeEventListener('resize', debouncedResize);
		cancelAnimationFrame(rafId);
	  };
	});
  
	// Calculate hand position and style
	$: handPosition = $scrollY < firstRowTop
	  ? 90
	  : $scrollY >= thirdRowTop - windowHeight
	  ? thirdRowTop - firstRowTop
	  : windowHeight - 940; // Adjust based on hand height
  
	$: positionStyle = $scrollY >= firstRowTop && $scrollY < thirdRowTop - windowHeight
	  ? { position: 'fixed', bottom: '0px', top: 'auto' }
	  : { position: 'absolute', bottom: 'auto', top: `${handPosition}px` };
  
	// Smooth pulse effect
	$: pulseEffect = $scrollY >= thirdRowTop - windowHeight ? { scale: 1.05 } : { scale: 1 };
  </script>
  
  <section
	bind:this={sectionElement}
	class="relative min-h-screen overflow-hidden pt-24 pb-24"
  >
	<!-- Hand and Video Overlay -->
	<div class="absolute inset-0 flex flex-col z-10 hand-wrapper">
	  <Motion
		let:motion
		animate={{ top: positionStyle.top, bottom: positionStyle.bottom, ...pulseEffect }}
		transition={{ duration: 0.1, ease: 'easeOut' }}
	  >
		<div
		  use:motion
		  class="mx-auto w-full flex items-center justify-center h-[940px] 2xl:h-[840px] xl:h-[740px] lg:h-[600px] md:h-[500px] sm:h-[380px] xs:h-[350px] overflow-hidden pointer-events-none hand-container"
		  style="position: {positionStyle.position}; will-change: transform, position, top, bottom;"
		>
		  <img
			alt="hand holding phone"
			src="/hand.png"
			class="flex-shrink-0 w-[1870px] 2xl:w-[1670px] xl:w-[1589.5px] lg:w-[1300px] md:w-[1028.5px] sm:w-[770px] xs:w-[700px] h-auto object-cover object-center-top relative hand-image"
		  />
		  <div class="absolute z-[2] w-[348px] 2xl:w-[320px] xl:w-[297px] lg:w-[240px] md:w-[193px] sm:w-[145px] xs:w-[130px] h-[741px] 2xl:h-[675px] xl:h-[630px] lg:h-[510px] md:h-[405px] sm:h-[305px] xs:h-[275px] top-8 2xl:top-8 xl:top-[48px] lg:top-[40px] md:top-[31px] sm:top-[23px] xs:top-[20px] rounded-[42px] 2xl:rounded-[42px] xl:rounded-[35px] lg:rounded-[30px] md:rounded-[22px] sm:rounded-[18px] xs:rounded-[16px] video-container">
			<video
			  src="/phone.mp4"
			  playsinline
			  autoplay
			  muted
			  loop
			  class="w-full h-full object-cover object-center rounded-[inherit]"
			></video>
		  </div>
		</div>
	  </Motion>
	</div>
  
	<!-- Grid Layout -->
	<div class="relative z-[1] mt-0 w-full screens-container">
	  <div class="max-w-full overflow-hidden flex flex-col justify-center">
		<!-- First Row -->
		<div
		  bind:this={firstRowElement}
		  class="flex justify-center gap-3.2 px-2.5"
		>
		  <div class="m-3.2 flex-shrink-0 relative rounded-[44px] overflow-hidden">
			<img src="/screen1.png" alt="Health Overview" class="rounded-[inherit] object-cover object-center w-[365px] 2xl:w-[365px] xl:w-[310.25px] lg:w-[260px] md:w-[200.75px] sm:w-[150px] xs:w-[130px] h-[770px] 2xl:h-[770px] xl:h-[654.5px] lg:h-[550px] md:h-[423.5px] sm:h-[310px] xs:h-[275px] screen-image" />
		  </div>
		  <div class="m-3.2 flex-shrink-0 relative rounded-[44px] overflow-hidden">
			<img src="/screen2.png" alt="Smart Hub" class="rounded-[inherit] object-cover object-center w-[365px] 2xl:w-[365px] xl:w-[310.25px] lg:w-[260px] md:w-[200.75px] sm:w-[150px] xs:w-[130px] h-[770px] 2xl:h-[770px] xl:h-[654.5px] lg:h-[550px] md:h-[423.5px] sm:h-[310px] xs:h-[275px] screen-image" />
		  </div>
		  <div class="m-3.2 flex-shrink-0 relative min-h-[770px] 2xl:min-h-[770px] xl:min-h-[654.5px] lg:min-h-[550px] md:min-h-[423.5px] sm:min-h-[310px] xs:min-h-[275px] w-[365px] 2xl:w-[365px] xl:w-[310.25px] lg:w-[260px] md:w-[200.75px] sm:w-[150px] xs:w-[130px] z-0 hand-alignment"></div>
		  <div class="m-3.2 flex-shrink-0 relative rounded-[44px] overflow-hidden">
			<img src="/screen1.png" alt="Screen 1" class="rounded-[inherit] object-cover object-center w-[365px] 2xl:w-[365px] xl:w-[310.25px] lg:w-[260px] md:w-[200.75px] sm:w-[150px] xs:w-[130px] h-[770px] 2xl:h-[770px] xl:h-[654.5px] lg:h-[550px] md:h-[423.5px] sm:h-[310px] xs:h-[275px] screen-image" />
		  </div>
		  <div class="m-3.2 flex-shrink-0 relative rounded-[44px] overflow-hidden">
			<img src="/screen2.png" alt="Screen 2" class="rounded-[inherit] object-cover object-center w-[365px] 2xl:w-[365px] xl:w-[310.25px] lg:w-[260px] md:w-[200.75px] sm:w-[150px] xs:w-[130px] h-[770px] 2xl:h-[770px] xl:h-[654.5px] lg:h-[550px] md:h-[423.5px] sm:h-[310px] xs:h-[275px] screen-image" />
		  </div>
		</div>
  
		<!-- Second Row -->
		<div class="flex justify-center gap-3.2 px-2.5">
		  <div class="m-3.2 flex-shrink-0 relative rounded-[44px] overflow-hidden">
			<img src="/screen1.png" alt="Screen 3" class="rounded-[inherit] object-cover object-center w-[365px] 2xl:w-[365px] xl:w-[310.25px] lg:w-[260px] md:w-[200.75px] sm:w-[150px] xs:w-[130px] h-[770px] 2xl:h-[770px] xl:h-[654.5px] lg:h-[550px] md:h-[423.5px] sm:h-[310px] xs:h-[275px] screen-image" />
		  </div>
		  <div class="m-3.2 flex-shrink-0 relative rounded-[44px] overflow-hidden">
			<img src="/screen2.png" alt="Screen 4" class="rounded-[inherit] object-cover object-center w-[365px] 2xl:w-[365px] xl:w-[310.25px] lg:w-[260px] md:w-[200.75px] sm:w-[150px] xs:w-[130px] h-[770px] 2xl:h-[770px] xl:h-[654.5px] lg:h-[550px] md:h-[423.5px] sm:h-[310px] xs:h-[275px] screen-image" />
		  </div>
		  <div class="m-3.2 flex-shrink-0 relative min-h-[770px] 2xl:min-h-[770px] xl:min-h-[654.5px] lg:min-h-[550px] md:min-h-[423.5px] sm:min-h-[310px] xs:min-h-[275px] w-[365px] 2xl:w-[365px] xl:w-[310.25px] lg:w-[260px] md:w-[200.75px] sm:w-[150px] xs:w-[130px] z-0 hand-alignment"></div>
		  <div class="m-3.2 flex-shrink-0 relative rounded-[44px] overflow-hidden">
			<img src="/screen1.png" alt="Screen 5" class="rounded-[inherit] object-cover object-center w-[365px] 2xl:w-[365px] xl:w-[310.25px] lg:w-[260px] md:w-[200.75px] sm:w-[150px] xs:w-[130px] h-[770px] 2xl:h-[770px] xl:h-[654.5px] lg:h-[550px] md:h-[423.5px] sm:h-[310px] xs:h-[275px] screen-image" />
		  </div>
		  <div class="m-3.2 flex-shrink-0 relative rounded-[44px] overflow-hidden">
			<img src="/screen2.png" alt="Screen 6" class="rounded-[inherit] object-cover object-center w-[365px] 2xl:w-[365px] xl:w-[310.25px] lg:w-[260px] md:w-[200.75px] sm:w-[150px] xs:w-[130px] h-[770px] 2xl:h-[770px] xl:h-[654.5px] lg:h-[550px] md:h-[423.5px] sm:h-[310px] xs:h-[275px] screen-image" />
		  </div>
		</div>
  
		<!-- Third Row -->
		<div
		  bind:this={thirdRowElement}
		  class="flex justify-center gap-3.2 px-2.5"
		>
		  <div class="m-3.2 flex-shrink-0 relative rounded-[44px] overflow-hidden">
			<img src="/screen1.png" alt="Screen 7" class="rounded-[inherit] object-cover object-center w-[365px] 2xl:w-[365px] xl:w-[310.25px] lg:w-[260px] md:w-[200.75px] sm:w-[150px] xs:w-[130px] h-[770px] 2xl:h-[770px] xl:h-[654.5px] lg:h-[550px] md:h-[423.5px] sm:h-[310px] xs:h-[275px] screen-image" />
		  </div>
		  <div class="m-3.2 flex-shrink-0 relative rounded-[44px] overflow-hidden">
			<img src="/screen2.png" alt="Screen 8" class="rounded-[inherit] object-cover object-center w-[365px] 2xl:w-[365px] xl:w-[310.25px] lg:w-[260px] md:w-[200.75px] sm:w-[150px] xs:w-[130px] h-[770px] 2xl:h-[770px] xl:h-[654.5px] lg:h-[550px] md:h-[423.5px] sm:h-[310px] xs:h-[275px] screen-image" />
		  </div>
		  <div class="m-3.2 flex-shrink-0 relative min-h-[770px] 2xl:min-h-[770px] xl:min-h-[654.5px] lg:min-h-[550px] md:min-h-[423.5px] sm:min-h-[310px] xs:min-h-[275px] w-[365px] 2xl:w-[365px] xl:w-[310.25px] lg:w-[260px] md:w-[200.75px] sm:w-[150px] xs:w-[130px] z-0 hand-alignment"></div>
		  <div class="m-3.2 flex-shrink-0 relative rounded-[44px] overflow-hidden">
			<img src="/screen1.png" alt="Screen 9" class="rounded-[inherit] object-cover object-center w-[365px] 2xl:w-[365px] xl:w-[310.25px] lg:w-[260px] md:w-[200.75px] sm:w-[150px] xs:w-[130px] h-[770px] 2xl:h-[770px] xl:h-[654.5px] lg:h-[550px] md:h-[423.5px] sm:h-[310px] xs:h-[275px] screen-image" />
		  </div>
		  <div class="m-3.2 flex-shrink-0 relative rounded-[44px] overflow-hidden">
			<img src="/screen2.png" alt="Screen 10" class="rounded-[inherit] object-cover object-center w-[365px] 2xl:w-[365px] xl:w-[310.25px] lg:w-[260px] md:w-[200.75px] sm:w-[150px] xs:w-[130px] h-[770px] 2xl:h-[770px] xl:h-[654.5px] lg:h-[550px] md:h-[423.5px] sm:h-[310px] xs:h-[275px] screen-image" />
		  </div>
		</div>
	  </div>
	</div>
  
	<!-- Content Beyond -->
	<div class="p-5 bg-transparent"></div>
  </section>
  
  <style>
	:global(body) {
	  margin: 0;
	  padding: 0;
	  overflow-x: hidden;
	}
  
	/* Custom spacing for Tailwind's gap-3.2 */
	.gap-3\.2 {
	  gap: 12.8px;
	}
  
	.m-3\.2 {
	  margin: 12.8px;
	}
  
	.px-2\.5 {
	  padding-left: 10px;
	  padding-right: 10px;
	}
  
	/* Responsive overrides for precise pixel values */
	@media (max-width: 1536px) {
	  .hand-container {
		height: 840px !important;
	  }
	  .hand-image {
		width: 1670px !important;
	  }
	  .video-container {
		width: 320px !important;
		height: 675px !important;
		top: 8px !important;
		border-radius: 42px !important;
	  }
	  .screen-image {
		width: 365px !important;
		height: 770px !important;
	  }
	  .hand-alignment {
		min-height: 770px !important;
		width: 365px !important;
	  }
	}
  
	@media (max-width: 1280px) {
	  .hand-container {
		height: 740px !important;
	  }
	  .hand-image {
		width: 1589.5px !important;
	  }
	  .video-container {
		width: 297px !important;
		height: 630px !important;
		top: 48px !important;
		border-radius: 35px !important;
	  }
	  .screen-image {
		width: 310.25px !important;
		height: 654.5px !important;
	  }
	  .hand-alignment {
		min-height: 654.5px !important;
		width: 310.25px !important;
	  }
	}
  
	@media (max-width: 1024px) {
	  .hand-container {
		height: 600px !important;
	  }
	  .hand-image {
		width: 1300px !important;
	  }
	  .video-container {
		width: 240px !important;
		height: 510px !important;
		top: 40px !important;
		border-radius: 30px !important;
	  }
	  .screen-image {
		width: 260px !important;
		height: 550px !important;
	  }
	  .hand-alignment {
		min-height: 550px !important;
		width: 260px !important;
	  }
	}
  
	@media (max-width: 768px) {
	  .hand-container {
		height: 500px !important;
	  }
	  .hand-wrapper {
		top: -15px !important;
		height: calc(100% + 15px) !important;
	  }
	  .hand-image {
		width: 1028.5px !important;
	  }
	  .video-container {
		width: 193px !important;
		height: 405px !important;
		top: 31px !important;
		border-radius: 22px !important;
	  }
	  .screen-image {
		width: 200.75px !important;
		height: 423.5px !important;
	  }
	  .hand-alignment {
		min-height: 423.5px !important;
		width: 200.75px !important;
	  }
	  .screens-container {
		margin-top: 150px !important;
	  }
	}
  
	@media (max-width: 640px) {
	  .hand-container {
		height: 380px !important;
	  }
	  .hand-image {
		width: 770px !important;
	  }
	  .video-container {
		width: 145px !important;
		height: 305px !important;
		top: 23px !important;
		border-radius: 18px !important;
	  }
	  .screen-image {
		width: 150px !important;
		height: 310px !important;
	  }
	  .hand-alignment {
		min-height: 310px !important;
		width: 150px !important;
	  }
	}
  
	@media (max-width: 360px) {
	  .hand-container {
		height: 350px !important;
	  }
	  .hand-image {
		width: 700px !important;
	  }
	  .video-container {
		width: 130px !important;
		height: 275px !important;
		top: 20px !important;
		border-radius: 16px !important;
	  }
	  .screen-image {
		width: 130px !important;
		height: 275px !important;
	  }
	  .hand-alignment {
		min-height: 275px !important;
		width: 130px !important;
	  }
	}
  </style>