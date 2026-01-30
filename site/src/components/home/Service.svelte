<script>
	import { ArrowRight } from 'lucide-svelte';
	import volchek from '$lib/video/volchek-color.mp4';
	import ball from '$lib/video/ball-color.mp4';
	import spring from '$lib/video/pruzina-color.mp4';
	import clock from '$lib/video/time-color.mp4';
	import Chart from '../shared/Chart.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	const handleContactNavigation = async () => {
		if ($page.url.pathname !== '/') {
			await goto('/');
			await new Promise((resolve) => setTimeout(resolve, 100));

			const scrollToContact = () => {
				const contactElement = document.getElementById('contact');
				if (contactElement) {
					contactElement.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
					return true;
				}
				return false;
			};

			if (!scrollToContact()) {
				setTimeout(() => {
					if (!scrollToContact()) {
						setTimeout(scrollToContact, 500);
					}
				}, 200);
			}
		} else {
			const contactElement = document.getElementById('contact');
			if (contactElement) {
				contactElement.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		}
	};
</script>

<main class="container mt-16 md:mt-24 lg:mt-32">
	<div class="flex flex-col pb-6 md:flex-row md:items-end md:justify-between">
		<h2 class="font-fontspring text-3xl font-medium text-gray-900 lg:text-5xl">The Way We Work</h2>
		<!-- Button with hover effect -->
		<p
			class="group relative mt-5 flex w-fit cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-gray-100 px-6 py-2 text-lg md:mt-0"
		>
			<span
				on:click={() => {
					handleContactNavigation();
				}}
				class="group-hover:animate-fallIn relative z-10 transition-all duration-500 group-hover:text-white"
			>
				Become a client
			</span>
			<span
				class="group-hover:animate-fallIn relative z-10 transition-all duration-500 group-hover:text-white"
			>
				<ArrowRight size={20} />
			</span>

			<!-- Flow effect -->
			<span
				class="absolute inset-0 origin-right scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100"
			></span>
		</p>
	</div>
	<section class="">
		<p
			class="w-full text-base font-light leading-loose text-gray-500 md:w-3/4 md:text-base lg:w-2/3 lg:text-lg"
		>
			We focus on delivering high-quality, tailored solutions that align with your business goals
			and vision.
		</p>
		<div class="flex flex-col items-center justify-between lg:flex-row">
			<div class="mt-10 w-full lg:w-1/2">
				<p class="text-lg font-semibold text-neutral-400 md:text-xl lg:text-2xl">
					Some Numbers About Us
				</p>
				<div
					class="mx-auto mt-5 grid max-w-[800px] grid-cols-1 items-start justify-center gap-6 md:mt-10 md:grid-cols-2 md:items-center"
				>
					{#each [{ number: 'Discover', text: 'Understanding goals through research, analysis, and identifying user-driven needs.', video: volchek }, { number: 'Design', text: 'Crafting intuitive interfaces with focus on experience, usability, and clarity.', video: spring }, { number: 'Build', text: 'Develop scalable, high-performance solutions using modern, secure development technologies.', video: clock }, { number: 'Launch', text: 'Deploying optimized solutions with testing, support, and performance monitoring strategies.', video: ball }] as item}
						<div
							class="relative mx-auto max-h-[250px] w-full max-w-[400px] overflow-hidden rounded-[50px] bg-[#f2f0f0] p-10 pb-20"
						>
							<!-- Higher z-index for text -->
							<p class="relative z-10 text-2xl font-semibold md:text-3xl lg:text-4xl">
								{item.number}
							</p>
							<p class="relative z-10 mt-2 w-5/6 text-base text-neutral-500">{item.text}</p>

							<!-- Lower z-index for the video -->
							<div class="absolute -bottom-8 -right-6 z-0">
								<video class="w-32 rounded-[50px]" playsinline autoplay loop muted>
									<source src={item.video} type="video/mp4" />
								</video>
							</div>
						</div>
					{/each}
				</div>
			</div>
			<div
				class="mt-10 hidden w-[90%] items-center justify-center md:mt-28 md:flex lg:w-1/2 lg:justify-end"
			>
				<Chart />
			</div>
		</div>
		<hr class="mt-10 md:mt-20" />
	</section>
</main>

<style>
	@keyframes fallIn {
		0% {
			transform: translateY(-10px);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.group-hover\:animate-fallIn {
		animation: fallIn 0.3s ease-out forwards;
	}
</style>
