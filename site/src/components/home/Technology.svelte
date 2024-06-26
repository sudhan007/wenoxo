<script lang="ts">
	type TOOLS = {
		image: string;
		name: string;
		alt: string;
	};

	const TOOLS: TOOLS[] = [
		{
			image: '/assets/home/bunjs.png',
			name: 'Bun Js',
			alt: 'Bun js'
		},
		{
			image: '/assets/home/elysia.jpeg',
			name: 'Elysia Js',
			alt: 'Elysia Js'
		},
		{
			image: '/assets/home/react.svg',
			name: 'React Js',
			alt: 'React Js'
		},
		{
			image: '/assets/home/svelte.svg',
			name: 'Svelte ',
			alt: 'Svelte'
		},
		{
			image: '/assets/home/mongodb.svg',
			name: 'Mongo DB',
			alt: 'Mongo DB'
		},
		{
			image: '/assets/home/nextjs.svg',
			name: 'Next Js',
			alt: 'Next Js'
		},
		{
			image: '/assets/home/angular.svg',
			name: 'Angular',
			alt: 'Angular'
		},
		{
			image: '/assets/home/typescript.svg',
			name: 'Type Script',
			alt: 'Type Script'
		}
	];
</script>

<main class="flex min-h-[70vh] w-full items-center">
	<section
		class="container mx-auto flex flex-col items-center justify-between px-4 sm:px-6 lg:flex-row lg:px-8"
	>
		<div class="order-1 text-center text-[#000000] lg:order-1 lg:text-left dark:text-white">
			<div class="font-sharpbold text-[2rem] font-bold leading-relaxed md:text-[3rem]">
				<h1>Technology</h1>
			</div>
			<p class="font-sharpsemibold mb-2 mt-4 text-sm md:text-lg dark:text-gray-300">
				Revolutionizing industries with cutting-edge
			</p>
			<p class="font-sharpsemibold text-sm md:text-lg dark:text-gray-300">technology solutions</p>
		</div>

		<img
			class="order-2 mt-8 w-full max-w-md lg:order-2 lg:mt-0 lg:max-w-lg"
			src="/assets/home/brain.png"
			alt="Greeting that contains a greeting message and a logo"
		/>
	</section>
</main>

<section class="min-h-[60vh] w-full py-5">
	<article class="container mx-auto px-2">
		<div class=" font-sharpbold text-center text-2xl text-[#6D31B9] md:text-start md:text-3xl">
			<h1>Tools we used</h1>
		</div>
		<aside class="mt-6 md:mt-14">
			<div class="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-10">
				{#each TOOLS as tool}
					<div
						class="flex w-full flex-col items-center justify-center gap-y-5 bg-[#F9F9F9] p-5 transition-all duration-150 hover:scale-90"
					>
						<div>
							<img src={tool.image} class="h-24 w-24" alt={tool.alt} />
						</div>
						<div class="font-sharpsemibold text-sm text-[#212121] md:text-lg">
							<h1>{tool.name}</h1>
						</div>
					</div>
				{/each}
			</div>
		</aside>
	</article>
</section>

<article class="flex min-h-[50vh] w-full items-center justify-center py-5 md:py-10">
	<div class="flex flex-col gap-y-6">
		<div class="">
			<div
				class="font-sharpbold text-center text-2xl leading-normal text-[#000000] md:text-start md:text-6xl md:leading-snug dark:text-white"
			>
				Let’s create a measurable <br />
				impact on your business.
			</div>
		</div>
		<div class=" mt-5 flex justify-center md:mt-20">
			<div>
				<h1
					class="font-sharpbold rounded-full border border-[#000000] px-10 py-5 text-xl text-[#212121] transition-all duration-150 hover:scale-110 md:text-2xl dark:border-[#FFFFFF] dark:text-white"
				>
					Design a Quote
				</h1>
			</div>
		</div>
	</div>
</article>
