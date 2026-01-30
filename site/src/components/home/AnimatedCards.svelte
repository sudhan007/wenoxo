<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	interface CardState {
		progress: number; // -1 to 1, based on scroll position
	}

	let cardStates = $state<CardState[]>(Array(4).fill({ progress: 0 }));
	let rafId: number | null = null;
	let isMobile = false;

	onMount(() => {
		if (!browser) return; // Skip during SSR

		const cards = document.querySelectorAll('.card');
		let windowHeight = window.innerHeight || 600; // Fallback for SSR
		let windowWidth = window.innerWidth || 1024; // Fallback for SSR

		// Set initial mobile state
		isMobile = windowWidth < 768;

		const updateCardStates = () => {
			const scrollY = window.scrollY;
			isMobile = windowWidth < 768;

			// Adjust these values for better mobile visibility
			const margin = isMobile ? windowHeight * 0.05 : windowHeight * 0.1;
			const startPoint = isMobile ? windowHeight * 1 : windowHeight * 0.9;
			const endPoint = isMobile ? windowHeight * 0.5 : windowHeight * 0.4;
			const animationRange = startPoint - endPoint;

			cardStates = Array.from(cards).map((card) => {
				const rect = card.getBoundingClientRect();
				const cardTop = rect.top;

				// Progress: -1 (above viewport), 0 (center), 1 (below viewport)
				let progress = 1 - (cardTop - endPoint) / animationRange;
				progress = Math.max(-1, Math.min(1, progress));

				return { progress };
			});

			rafId = null;
		};

		const handleScroll = () => {
			if (!rafId) {
				rafId = requestAnimationFrame(updateCardStates);
			}
		};

		const handleResize = () => {
			windowHeight = window.innerHeight || 600;
			windowWidth = window.innerWidth || 1024;
			isMobile = windowWidth < 768;
			updateCardStates();
		};

		// Initial calculation with a small delay to ensure DOM is ready
		setTimeout(updateCardStates, 100);

		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
			if (rafId) cancelAnimationFrame(rafId);
		};
	});

	function easeOutCubic(x: number): number {
		return 1 - Math.pow(1 - x, 3); // Slightly less aggressive easing for mobile
	}

	// Helper function to get transform based on device and card state
	function getCardTransform(progress: number, index: number): string {
		const isEven = index % 2 === 0;

		if (browser && isMobile) {
			// More subtle animation for mobile
			const translateX = (1 - Math.abs(progress)) * (isEven ? -4 : 4);
			const scale = 0.95 + easeOutCubic(Math.abs(progress)) * 0.05;
			const rotate = (1 - Math.abs(progress)) * (isEven ? -2 : 2);

			return `translateX(${translateX}rem) scale(${scale}) rotate(${rotate}deg)`;
		} else {
			// Regular animation for desktop
			const translateX = (1 - Math.abs(progress)) * (isEven ? -20 : 20);
			const scale = 0.9 + easeOutCubic(Math.abs(progress)) * 0.1;
			const rotate = (1 - Math.abs(progress)) * (isEven ? -8 : 8);

			return `translateX(${translateX}rem) scale(${scale}) rotate(${rotate}deg)`;
		}
	}
</script>

<section
	class="mx-auto mt-10 grid w-5/6 grid-cols-1 gap-y-1 px-4 sm:px-6 md:w-3/4 md:gap-y-10 md:px-8 lg:w-5/6 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-12 lg:px-16"
>
	{#each cardStates as state, i}
		<div
			class="card relative w-full rounded-3xl bg-white p-6 py-10 shadow-lg will-change-transform sm:p-8 sm:py-12 md:p-10 md:py-16 lg:p-12 lg:py-20"
			class:even={i % 2 === 0}
			class:odd={i % 2 !== 0}
			data-index={i}
			style="opacity: {easeOutCubic(Math.abs(state.progress))};
                   transform: {getCardTransform(state.progress, i)};"
		>
			<div class="card-content relative z-10">
				<div>
					{#if i === 0}
						<p
							class="border-gradient-to-r absolute -right-2 -top-10 w-fit rounded-full bg-blue-100 from-[#f8a5c2] to-[#f58b8c] p-2 text-sm sm:-right-3 sm:-top-12 sm:p-3 sm:text-base md:-right-5 md:-top-16 md:text-lg"
						>
							Projects Delivered
						</p>
					{:else if i === 1}
						<p
							class="border-gradient-to-r absolute -right-2 -top-10 w-fit rounded-full bg-orange-100 from-[#f8a5c2] to-[#f58b8c] p-2 text-sm sm:-right-3 sm:-top-12 sm:p-3 sm:text-base md:-right-5 md:-top-16 md:text-lg"
						>
							Years Experience
						</p>
					{:else if i === 2}
						<p
							class="absolute -right-2 -top-10 w-fit rounded-full bg-pink-100 p-2 text-sm sm:-right-3 sm:-top-12 sm:p-3 sm:text-base md:-right-5 md:-top-16 md:text-lg"
						>
							Industry Expertise
						</p>
					{:else}
						<p
							class="border-gradient-to-r absolute -right-2 -top-10 w-fit rounded-full bg-indigo-200 from-[#f8a5c2] to-[#f58b8c] p-2 text-sm sm:-right-3 sm:-top-12 sm:p-3 sm:text-base md:-right-5 md:-top-16 md:text-lg"
						>
							Satisfied Clients
						</p>
					{/if}
				</div>

				<p
					class="mt-6 text-3xl font-bold text-gray-900 sm:mt-8 sm:text-4xl md:text-5xl lg:text-6xl"
				>
					{i === 0 ? '100+' : i === 1 ? '10+' : i === 2 ? '25+' : '40+'}
				</p>
				<p class="pt-6 text-sm text-gray-600 sm:pt-8 sm:text-base md:pt-10 md:text-lg">
					{i === 0
						? 'Successful projects completed'
						: i === 1
							? 'Years of hands-on experience'
							: i === 2
								? 'Industries of Expertise'
								: 'Clients across diverse industries'}
				</p>
			</div>
		</div>
	{/each}
</section>

<style>
	section {
		scroll-behavior: smooth;
		perspective: 1000px;
	}

	.card {
		overflow: hidden;
		position: relative;
		backface-visibility: hidden;
		transition:
			opacity 0.3s ease-out,
			transform 0.3s ease-out;
	}

	.card.even {
		margin-bottom: 2rem;
	}

	.card.odd {
		margin-top: 2rem;
	}

	.card::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: conic-gradient(transparent, rgba(84, 84, 85, 0.4), transparent 30%);
		animation: rotate 2s linear infinite;
		pointer-events: none;
	}

	.card::after {
		content: '';
		position: absolute;
		inset: 1px;
		background: white;
		border-radius: 1.5rem;
		pointer-events: none;
	}

	@keyframes rotate {
		100% {
			transform: rotate(1turn);
		}
	}

	@media (max-width: 767px) {
		.card.even,
		.card.odd {
			margin-top: 1rem;
			margin-bottom: 1rem;
		}

		/* Add specific mobile optimizations */
		.card {
			transition:
				opacity 0.25s ease-out,
				transform 0.25s ease-out;
		}
	}
</style>
