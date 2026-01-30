<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { activeSection } from '$lib/stores';
	import { page } from '$app/stores';

	let isMenuOpen = false;
	let isServicesDropdownOpen = false;
	/**
	 * @type {HTMLDivElement}
	 */
	let menuRef;
	/**
	 * @type {HTMLDivElement}
	 */
	let hamburgerRef;

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	const closeMenu = () => {
		isMenuOpen = false;
		isServicesDropdownOpen = false;
	};

	const toggleServicesDropdown = () => {
		isServicesDropdownOpen = !isServicesDropdownOpen;
	};

	const handleContactNavigation = async () => {
		closeMenu();

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

	onMount(() => {
		const handleClickOutside = (event) => {
			if (
				isMenuOpen &&
				menuRef &&
				!menuRef.contains(event.target) &&
				hamburgerRef &&
				!hamburgerRef.contains(event.target)
			) {
				isMenuOpen = false;
				isServicesDropdownOpen = false;
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	});

	const navItems = [
		{ id: 'home', label: 'Home', icon: 'mdi:home' },
		{ id: 'about', label: 'About Us', icon: 'mdi:information' },
		{
			id: 'service',
			label: 'Services',
			icon: 'mdi:folder',
			hasDropdown: true,
			subItems: [
				{
					id: 'web-development',
					label: 'Web Development',
					icon: 'mdi:web',
					href: '/our_services/web-development'
				},
				{
					id: 'mobile-app',
					label: 'Mobile Application',
					icon: 'mdi:cellphone',
					href: '/our_services/mobile-app'
				},
				{ id: 'ecommerce', label: 'Ecommerce', icon: 'mdi:cart', href: '/our_services/e-commerce' },
				{
					id: 'it-staffing',
					label: 'IT Staffing',
					icon: 'mdi:account',
					href: '/our_services/it-staffing'
				},

				{
					id: 'digital-marketing',
					label: 'Digital Marketing',
					icon: 'mdi:bullhorn',
					href: '/our_services/social-meadia-marketing'
				}
			]
		},
		{ id: 'projects', label: 'Our Projects', icon: 'material-symbols:web-stories' },
		{ id: 'careers', label: 'Careers', icon: 'material-symbols:web-stories' }
	];

	const isActive = (/** @type {string} */ itemId) => {
		if ($page.url.pathname === '/projects' || $page.url.pathname.startsWith('/projects/')) {
			return itemId === 'projects';
		} else if ($page.url.pathname === '/about_us' || $page.url.pathname.startsWith('/about_us/')) {
			return itemId === 'about';
		} else if (
			$page.url.pathname === '/our_services' ||
			$page.url.pathname.startsWith('/our_services/')
		) {
			return itemId === 'service';
		} else if ($page.url.pathname === '/careers' || $page.url.pathname.startsWith('/careers/')) {
			return itemId === 'careers';
		}
		return $activeSection === itemId;
	};

	const handleNavigation = (/** @type {string} */ itemId) => {
		if (itemId === 'projects') {
			goto('/projects');
		} else if (itemId === 'careers') {
			goto('/careers');
		} else if (itemId === 'about') {
			goto('/about_us');
		} else if (itemId === 'service') {
			goto('/our_services');
		} else if (itemId === 'howWeWork') {
			goto('/how_we_work');
		} else {
			goto(`/#${itemId}`);
		}
		closeMenu();
	};

	const handleSubItemNavigation = (href) => {
		goto(href);
		closeMenu();
	};
</script>

<svelte:head>
	<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
</svelte:head>

<header class="z-50 !m-0 flex items-center justify-center !p-0">
	<section
		class="flex h-16 !w-screen items-center justify-center border-b bg-white px-4 shadow-sm shadow-[#061C3D0D] lg:container md:px-10 lg:max-w-6xl lg:rounded-xl"
	>
		<nav class="flex h-full w-full items-center justify-between">
			<!-- Logo -->
			<div>
				<a href="/">
					<img width={150} height={150} src={'/logo.webp'} alt="Logo" />
				</a>
			</div>

			<!-- Desktop Menu -->
			<div class="relative hidden md:block">
				<ul class="flex gap-4 lg:gap-8">
					{#each navItems as item}
						<li class="group relative">
							<a
								href={`${item.id === 'projects' ? '/projects' : item.id === 'careers' ? '/careers' : item.id === 'service' ? '/our_services' : `/#${item.id}`}`}
								on:click|preventDefault={() => {
									if (item.id === 'service') {
										return;
									}
									handleNavigation(item.id);
								}}
								class="relative flex items-center gap-1 px-2 py-1 text-sm font-medium text-[#838E9E] transition-colors duration-300 hover:text-[#0B63E5] group-hover:text-[#0B63E5] md:text-base lg:text-lg"
								class:active={isActive(item.id)}
							>
								{item.label}
								{#if item.hasDropdown}
									<iconify-icon
										icon="mdi:chevron-down"
										width="16"
										height="16"
										class="transition-transform duration-300 group-hover:rotate-180"
									/>
								{/if}
								{#if isActive(item.id)}
									<span
										class="absolute bottom-0 left-0 -mb-1 h-0.5 w-full rounded-full bg-[#0B63E5] transition-all duration-300"
									></span>
								{/if}
							</a>

							<!-- Services Dropdown -->
							{#if item.id === 'service' && item.hasDropdown}
								<div
									class="invisible absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-gray-200 bg-white opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:opacity-100"
									style="min-height: 200px;"
								>
									<div class="border-b border-gray-100 p-4">
										<h3 class="mb-2 text-sm font-semibold text-gray-800">Our Services</h3>
									</div>
									<div class="space-y-2 p-4">
										{#each item.subItems as subItem}
											<a
												href={subItem.href}
												on:click|preventDefault={() => handleSubItemNavigation(subItem.href)}
												class="group/subitem flex items-center gap-3 rounded-lg p-3 transition-all duration-300 hover:bg-[#0B63E5]/5 hover:text-[#0B63E5]"
											>
												<div
													class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0B63E5]/10 to-[#0950c1]/10 shadow-sm transition-all duration-300 group-hover/subitem:shadow-md"
												>
													<iconify-icon
														icon={subItem.icon}
														width="20"
														height="20"
														class="text-[#0B63E5] transition-transform duration-300 group-hover/subitem:scale-110"
													/>
												</div>
												<div>
													<p class="text-sm font-medium">{subItem.label}</p>
													<p class="mt-0.5 text-xs text-gray-500">Professional Solutions</p>
												</div>
											</a>
										{/each}
									</div>
								</div>
							{/if}
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact Us Button - Desktop -->
			<div class="hidden md:block">
				<button
					on:click={() => {
						handleContactNavigation();
						closeMenu();
					}}
					class="whitespace-nowrap rounded-lg bg-[#0B63E5] px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#0950c1] lg:px-6 lg:py-3 lg:text-base"
				>
					Contact Us
				</button>
			</div>

			<!-- Hamburger Menu - Mobile -->
			<div bind:this={hamburgerRef} class="cursor-pointer md:hidden" on:click={toggleMenu}>
				<iconify-icon
					icon={isMenuOpen
						? 'line-md:menu-to-close-transition'
						: 'line-md:close-to-menu-transition'}
					width="28"
					height="28"
					class="z-50 text-[#0B63E5]"
				></iconify-icon>
			</div>
		</nav>
	</section>

	<!-- Mobile Menu Drawer -->
	{#if isMenuOpen}
		<div
			bind:this={menuRef}
			class="fixed right-0 top-0 z-40 h-[calc(100vh)] w-80 bg-white shadow-2xl transition-transform duration-300 md:hidden"
		>
			<div class="mt-[3rem] p-6">
				<!-- Close Icon -->
				<div class="absolute right-4 top-4 z-50">
					<iconify-icon
						icon="line-md:close"
						width="24"
						height="24"
						class="cursor-pointer text-[#0B63E5]"
						on:click={closeMenu}
					></iconify-icon>
				</div>

				<ul class="flex flex-col gap-6">
					{#each navItems as item}
						<li>
							{#if item.hasDropdown && item.id === 'service'}
								<!-- Services with Dropdown in Mobile -->
								<div class="relative">
									<button
										on:click={toggleServicesDropdown}
										class="relative flex w-full items-center gap-3 pr-8 text-base font-medium text-[#838E9E] transition-colors duration-300 hover:text-[#0B63E5]"
										class:active={isActive(item.id)}
									>
										<iconify-icon icon={item.icon} width="20" height="20"></iconify-icon>
										<p>{item.label}</p>
										<iconify-icon
											icon="mdi:chevron-down"
											width="20"
											height="20"
											class="absolute right-0 transition-transform duration-300"
											class:rotate-180={isServicesDropdownOpen}
										/>
										{#if isActive(item.id)}
											<span class="h-0.1 absolute bottom-0 left-0 w-full rounded-full bg-[#0B63E5]"
											></span>
										{/if}
									</button>

									{#if isServicesDropdownOpen}
										<div class="ml-8 mt-4 space-y-3 border-l-2 border-[#0B63E5]/20 pb-4 pl-4">
											{#each item.subItems as subItem}
												<a
													href={subItem.href}
													on:click|preventDefault={() => handleSubItemNavigation(subItem.href)}
													class="flex items-center gap-3 rounded-lg bg-[#0B63E5]/5 p-3 text-black transition-all duration-300"
												>
													<iconify-icon
														icon={subItem.icon}
														width="20"
														height="20"
														class="flex-shrink-0 text-[#0B63E5]"
													/>
													<div class="text-base font-medium">{subItem.label}</div>
												</a>
											{/each}
										</div>
									{/if}
								</div>
							{:else}
								<a
									href={`${item.id === 'projects' ? '/projects' : item.id === 'careers' ? '/careers' : `/#${item.id}`}`}
									on:click|preventDefault={() => handleNavigation(item.id)}
									class="relative flex items-center gap-3 text-base font-medium text-[#838E9E] transition-colors duration-300 hover:text-[#0B63E5]"
									class:active={isActive(item.id)}
								>
									<iconify-icon icon={item.icon} width="20" height="20"></iconify-icon>
									<p>{item.label}</p>
									{#if isActive(item.id)}
										<span class="h-0.1 absolute bottom-0 left-0 w-full rounded-full bg-[#0B63E5]"
										></span>
									{/if}
								</a>
							{/if}
						</li>
					{/each}
				</ul>
				<div class="mt-8">
					<button
						on:click={() => {
							goto('/#contact');
							closeMenu();
						}}
						class="w-full rounded-lg bg-[#0B63E5] py-3 text-base font-semibold text-white transition-colors duration-300 hover:bg-[#0950c1]"
					>
						Contact Us
					</button>
				</div>
			</div>
		</div>
		<div
			class="fixed inset-0 z-30 h-screen bg-black bg-opacity-50 md:hidden"
			on:click={closeMenu}
		></div>
	{/if}
</header>

<style>
	.active {
		color: #0b63e5;
	}

	.active span {
		transform: scaleX(1);
	}

	a span {
		transform: scaleX(0);
		transition: transform 0.3s ease;
	}

	.rotate-180 {
		transform: rotate(180deg);
	}

	@media (max-width: 639px) {
		header {
			padding: 0.5rem 1rem;
		}

		nav {
			height: 3.5rem;
		}

		.active span {
			height: 0.3rem;
			margin-bottom: -0.3rem;
		}
	}

	/* Mobile Services Dropdown Toggle */
	:global(.mobile-services-item) {
		cursor: pointer;
	}

	.mobile-services-item:has(+ div[open]) {
		background-color: #f8f9ff;
	}
</style>
