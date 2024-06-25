<script>
	import { Motion } from 'svelte-motion';
	import Service from '../components/home/Service.svelte';
	import Header from '../components/shared/header.svelte';
	import Footer from '../components/shared/Footer.svelte';
	import Technology from '../components/home/Technology.svelte';
	import Performance from '../components/home/performance.svelte';
</script>

<Header />
<main class="flex h-[90vh] w-full flex-col items-center justify-evenly">
	<section
		class="container mx-auto flex flex-col-reverse items-center justify-between px-4 sm:px-6 lg:flex-row lg:px-8"
	>
		<Motion let:motion animate={{}}>
			<div use:motion class="text-center lg:text-left">
				<div
					class="font-sharpbold text-[2rem] font-bold leading-relaxed text-[#222222] md:text-[4rem] dark:text-white"
				>
					<h1>Creative</h1>
					<h1>Design</h1>
					<h1>Technology</h1>
				</div>
				<p class="font-sharpmedium my-4 text-base text-[#222222] md:text-lg dark:text-gray-300">
					Transforming the user experience is at the core of our mission, <br /> leveraging the principles
					of behavioral science to innovate.
				</p>
			</div>
		</Motion>

		<img
			class="mt-8 w-full max-w-md lg:mt-0 lg:max-w-lg"
			src="/assets/home/greet-image.svg"
			alt="Greeting that contains a greeting message and a logo"
		/>
	</section>
	<div class="container mx-auto my-5 flex items-center justify-between gap-5">
		<div>
			<img src="/assets/home/figgy.png" alt="" />
		</div>
		<div>
			<img src="/assets/home/sundar.png" alt="" />
		</div>
		<div>
			<img src="/assets/home/prathap.png" alt="" />
		</div>
		<div>
			<img src="/assets/home/starex.png" alt="" />
		</div>
		<div>
			<img src="/assets/home/kpjwels.png" alt="" />
		</div>
	</div>
</main>
<Service />
<Performance />
<Technology />
<Footer />
