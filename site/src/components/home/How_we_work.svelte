<script>
	import { goto } from '$app/navigation';

	/**
	 * @type {number | null}
	 */
	let hoverIndex = null;

	const steps = [
		{
			id: 1,
			title: 'Mobile Development',
			href: '/our_services/mobile-app',
			image: '/assets/home/Mobile app development.png',
			description:
				'Building scalable, high-performance apps that enhance engagement and optimize user experience'
		},
		{
			id: 2,
			title: 'Website Development',
			image: '/assets/home/webdev.png',
			href: '/our_services/web-development',
			description:
				'Developing adaptive websites that optimize user interaction and ensure performance.'
		},
		{
			id: 3,
			title: 'E-Commerce',
			image: '/assets/service/ecommerce.png',
			href: '/our_services/e-commerce',
			description:
				'We build secure, high-performing, and conversion-focused e-commerce platforms that help brands succeed in competitive digital marketplaces.'
		},
		{
			id: 4,
			title: 'IT Staffing',
			href: '/our_services/it-staffing',
			image: '/assets/service/itstaffing.jpeg',
			description:
				'We specialize in providing end-to-end IT staffing solutions that connect companies with skilled professionals who drive innovation and deliver results.'
		},
		{
			id: 5,
			title: 'Digital Marketing',
			image: '/assets/service/digital.jpeg',
			href: '/our_services/social-meadia-marketing',
			description:
				'We help businesses grow their online presence through strategic, creative, and data-driven social media marketing.'
		}
	];
	const handleSubItemNavigation = (href) => {
		goto(href);
	};
</script>

<div class="container mt-16 flex items-center justify-center md:mt-24 lg:mt-32">
	<!-- Mobile/Medium Screen Layout (hidden on lg and above) -->
	<div class="w-full rounded-3xl bg-gray-50 p-5 lg:hidden">
		<div class="flex flex-col gap-4 sm:gap-5">
			<h2 class=" text-4xl font-semibold text-[#3F3F3F] md:text-5xl lg:text-6xl">Our Services</h2>
			<p
				class="w-full text-base font-light leading-relaxed text-gray-500 sm:w-3/4 sm:text-lg md:w-1/2"
			>
				Focused on delivering innovative digital solutions that streamline operations, enhance user
				experience, and drive measurable business growth.
			</p>
		</div>

		<div class="mt-8 sm:mt-12 md:mt-16">
			<div class="flex flex-col sm:gap-6 md:gap-8">
				{#each steps as step, index}
					<div
						role="button"
						tabindex="0"
						class="group flex flex-col items-start gap-4 rounded-xl px-4 py-4 transition-all duration-300 hover:bg-gray-100 sm:flex-row sm:items-center sm:gap-6 sm:rounded-2xl sm:px-6 sm:py-6 md:gap-8"
						on:mouseenter={() => (hoverIndex = index)}
						on:mouseleave={() => (hoverIndex = null)}
						on:click|preventDefault={() => handleSubItemNavigation(step.href)}
						aria-label={`Step ${step.id}: ${step.title}`}
					>
						<div class="w-12 text-base font-light text-gray-600 sm:w-16 sm:text-lg">
							{step.id < 10 ? `0${step.id}` : step.id}/
						</div>
						<div
							class="relative flex hidden h-24 w-full justify-center sm:block sm:h-28 sm:w-32 md:h-32 md:w-40"
						>
							<img
								src={step.image}
								class="{hoverIndex === index
									? 'opacity-100'
									: 'opacity-0 sm:opacity-100'} h-full w-full rounded-lg object-cover transition-opacity duration-300"
								alt={step.title}
							/>
						</div>
						<div class="w-full text-xl font-medium text-gray-900 sm:w-1/4 sm:text-2xl">
							{step.title}
						</div>
						<div class="text-base font-light text-gray-600 sm:text-lg">
							{step.description}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Large Screen Layout (hidden below lg) -->
	<div class="hidden w-full rounded-3xl bg-gray-50 py-12 lg:block">
		<div class="flex flex-col gap-5 px-12">
			<h2 class="font-fontspring text-5xl font-medium text-gray-900">Our Services</h2>
			<p class="w-5/6 text-lg font-light leading-loose text-gray-500 md:w-3/4 lg:w-2/3">
				Focuseds on delivering innovative digital solutions that streamline operations, enhance user
				experience, and drive measurable business growth.
			</p>
		</div>

		<div class="lg:mt-12">
			<table class="w-full border-collapse">
				<tbody class="">
					{#each steps as step, index}
						<tr
							role="button"
							tabindex="0"
							class="group relative transition-all duration-300 group-hover:ml-20"
							on:mouseenter={() => (hoverIndex = index)}
							on:mouseleave={() => (hoverIndex = null)}
							on:click|preventDefault={() => handleSubItemNavigation(step.href)}
							aria-label={`Step ${step.id}: ${step.title}`}
						>
							<td class="step p-12 text-lg font-light text-gray-600">
								{step.id < 10 ? `0${step.id}` : step.id}/
							</td>
							<td class="relative">
								<div
									class="absolute left-1/2 top-3/4 flex h-48 min-w-40 -translate-x-1/2 -translate-y-1/2 transform justify-center"
								>
									{#if hoverIndex === index}
										<img
											src={step.image}
											class="h-32 min-w-40 rounded-xl object-cover opacity-100 transition-opacity duration-300"
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
		.group:hover {
			transform: translateX(0.9rem);
			transition: transform 0.3s ease-in-out;
		}
	}
</style>
