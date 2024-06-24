<script lang="ts">
	type ROLES = {
		name: string;
		color: string;
	};
	type WORKS = {
		workname: string;
		img: string;
		alt: string;
	};
	const ROLES: ROLES[] = [
		{
			name: 'Graphic Designer',
			color: '#FFED8F'
		},
		{
			name: 'UI/UX Designer',
			color: '#FFED8F'
		},
		{
			name: 'Business Analysts',
			color: '#C5FCAB'
		},
		{
			name: 'Product Designer',
			color: '#C7C7C7'
		},
		{
			name: 'App Developers',
			color: '#C7C7C7'
		},
		{
			name: 'Web Developers',
			color: '#FFED8F'
		},
		{
			name: 'Product Designer',
			color: '#C5FCAB'
		},
		{
			name: 'Brand Designer',
			color: '#C5FCAB'
		},
		{
			name: 'Data Analysts',
			color: '#C7C7C7'
		},
		{
			name: 'Co Founder',
			color: '#C7C7C7'
		}
	];

	const WORKS: WORKS[] = [
		{
			workname: 'E-commerce',
			img: '/assets/home/ecommerce.svg',
			alt: 'E-commerce'
		},
		{
			workname: 'Ship',
			img: '/assets/home/ship.svg',
			alt: 'Ship'
		},
		{
			workname: 'Industries',
			img: '/assets/home/industry.svg',
			alt: 'Industries'
		},
		{
			workname: 'Events',
			img: '/assets/home/events.svg',
			alt: 'E-commerce'
		},
		{
			workname: 'Hardware',
			img: '/assets/home/hardware.svg',
			alt: 'Hardware'
		},
		{
			workname: 'Automobile',
			img: '/assets/home/automobiles.svg',
			alt: 'Automobile'
		},
		{
			workname: 'Health',
			img: '/assets/home/health.svg',
			alt: 'Health'
		},
		{
			workname: 'Education',
			img: '/assets/home/education.svg',
			alt: 'Education'
		},
		{
			workname: 'Real  Estates',
			img: '/assets/home/realestate.svg',
			alt: 'Real  Estates'
		},
		{
			workname: 'Travel',
			img: '/assets/home/travel.svg',
			alt: 'Travel'
		},
		{
			workname: 'Hospital',
			img: '/assets/home/hospital.svg',
			alt: 'Hospital'
		},
		{
			workname: 'Capital',
			img: '/assets/home/capital.svg',
			alt: 'Capital'
		}
	];
</script>

<main class=" flex min-h-[90vh] w-full items-center">
	<section
		class="container mx-auto flex flex-col items-center justify-between px-4 sm:px-6 lg:flex-row lg:px-8"
	>
		<div class="order-1 text-center lg:order-1 lg:text-left">
			<div class="font-sharpbold text-[2rem] font-bold leading-loose text-[#000000] md:text-[3rem]">
				<div class="flex items-center gap-5">
					<span class=" h-6 w-6 rounded-full bg-[#E8505B] md:h-10 md:w-10"> </span>
					<h1>Security</h1>
				</div>
				<div class="flex items-center gap-5">
					<span class=" h-6 w-6 rounded-full bg-[#7F81FF] md:h-10 md:w-10"> </span>
					<h1>Scalability</h1>
				</div>
				<div class="flex items-center gap-5">
					<span class=" h-6 w-6 rounded-full bg-[#F55DCB] md:h-10 md:w-10"> </span>
					<h1>Performace</h1>
				</div>
			</div>
		</div>

		<!-- svelte-ignore a11y-img-redundant-alt -->
		<img
			class="order-2 mt-8 w-full max-w-md lg:order-2 lg:mt-0 lg:max-w-lg"
			src="/assets/home/performance.svg"
			alt="performance image"
		/>
	</section>
</main>
<div class="container mx-auto mt-8 min-h-[100vh] w-full px-2 md:mt-0">
	<div class="rounded-3xl border p-1 py-5 shadow-sm md:px-10 md:py-10">
		<div>
			<img src="/assets/home/departments.svg" class="h-full w-full" alt="" />
		</div>
		<div
			class="font-sharpsemibold mt-10 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-5 lg:grid-cols-5"
		>
			{#each ROLES as role}
				<span
					style="background-color: {role.color};"
					class="{`whitespace-nowrap rounded-full border-[1px] border-[#000000] px-2.5 py-2 text-center text-xs transition-all duration-150 hover:scale-110 md:text-base lg:text-lg `}}"
				>
					{role.name}
				</span>
			{/each}
		</div>
	</div>

	<div class="font-sharpbold mt-5 text-center md:mt-20">
		<div class="my-4 text-2xl text-[#6D31B9] md:my-8 md:text-3xl">
			<h1>Expertise</h1>
		</div>
		<div class="text-lg leading-normal md:text-4xl">
			<h1>Industries where our expertise has <br /> been applied.</h1>
		</div>
	</div>

	<div class="my-6 md:my-10">
		<div
			class="grid grid-cols-2 items-center justify-center gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
		>
			{#each WORKS as work}
				<div class="flex flex-col items-center justify-center gap-y-5">
					<img src={work.img} class="h-16 w-16" style="object-fit: contain;" alt={work.alt} />
					<h1 class="font-sharpbold text-center text-sm text-[#000000] md:text-lg">
						{work.workname}
					</h1>
				</div>
			{/each}
		</div>
	</div>
</div>
