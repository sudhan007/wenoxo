<script>
	import { ArrowRight } from 'lucide-svelte';
	import volchek from '$lib/video/volchek-color.mp4';
	import ball from '$lib/video/ball-color.mp4';
	import spring from '$lib/video/pruzina-color.mp4';
	import clock from '$lib/video/time-color.mp4';
	import Chart from '../shared/Chart.svelte';
	import { goto } from '$app/navigation';
</script>

<main class="mt-16 md:mt-24 lg:mt-32  container">
	<div class="flex flex-col md:flex-row md:items-end md:justify-between pb-6">
		<h2 class="lg:text-5xl text-3xl font-fontspring font-medium text-gray-900">The Way We Work</h2>
		<!-- Button with hover effect -->
		<p
			class="group relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-gray-100 px-6 py-2 text-lg mt-5 md:mt-0 w-fit"
		>
			<span
			onclick={()=>{goto('/#contact')}}
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
			<p class="lg:w-2/3 md:w-3/4 w-full lg:text-lg md:text-base text-base font-light text-gray-500 leading-loose">
				We focus on delivering high-quality, tailored solutions that align with your business goals and vision.
			  </p>
			<div class="flex flex-col lg:flex-row items-center">
				<div class="mt-10 w-full lg:w-1/2">
					<p class="text-lg md:text-xl lg:text-2xl font-semibold text-neutral-400">Some Numbers About Us</p>
					<div class="grid grid-cols-1 md:grid-cols-2 justify-center md:items-center items-start  gap-6 mt-5 md:mt-10 mx-auto max-w-[800px]">
						{#each [
							{ number: "Discover", text: "Understanding goals through research, analysis, and identifying user-driven needs.", video: volchek },
							{ number: "Design", text: "Crafting intuitive interfaces with focus on experience, usability, and clarity.", video: spring },
							{ number: "Build", text: "Develop scalable, high-performance solutions using modern, secure development technologies.", video: clock },
							{ number: "Launch", text: "Deploying optimized solutions with testing, support, and performance monitoring strategies.", video: ball }
						] as item}
							<div class="rounded-[50px] relative max-h-[250px] max-w-[400px] w-full bg-[#f2f0f0] p-10 pb-20 overflow-hidden mx-auto">
								<!-- Higher z-index for text -->
								<p class="text-2xl md:text-3xl lg:text-4xl font-semibold relative z-10">{item.number}</p>
								<p class="text-neutral-500 w-5/6 text-base relative z-10 mt-2">{item.text}</p>

								<!-- Lower z-index for the video -->
								<div class="absolute -bottom-8 -right-6 z-0">
									<video class="w-32 rounded-[50px]" playsinline autoplay loop muted>
										<source src={item.video} type="video/mp4">
									</video>
								</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="w-[90%]  lg:w-1/2 mt-10 md:mt-20 hidden md:flex justify-center items-center">
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