<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { activeSection } from '$lib/stores';
  
	let isMenuOpen = false;
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
		}
	  };
  
	  document.addEventListener('mousedown', handleClickOutside);
	  return () => document.removeEventListener('mousedown', handleClickOutside);
	});
  
	const navItems = [
	  { id: 'home', label: 'Home', icon: 'mdi:home' },
	  { id: 'about', label: 'About Us', icon: 'mdi:information' },
	  { id: 'service', label: 'Services', icon: 'mdi:folder' },
	  { id: 'howWeWork', label: 'How We Work', icon: 'mdi:cog' },
	  { id: 'contact', label: 'Contact', icon: 'mdi:email' },
	];
  </script>
  
  <svelte:head>
	<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
  </svelte:head>
  
  <header class="flex !p-0  justify-center items-center">
	<section class="lg:rounded-xl lg:max-w-5xl w-screen lg:container border-b flex  shadow-sm shadow-[#061C3D0D] bg-white px-4 md:px-10 h-16 ">
	  <nav class="flex w-full items-center justify-between h-full">
		<!-- Logo -->
		<div>
		  <a href="/">
			<img width={150} height={150} src={'/logo.png'} alt="Logo" />
		  </a>
		</div>
  
		<!-- Desktop Menu -->
		<div class="hidden md:block">
		  <ul class="flex gap-4 lg:gap-8">
			{#each navItems as item}
			  <li>
				<a
				  href={`/#${item.id}`}
				  on:click={() => { goto(`/#${item.id}`); closeMenu(); }}
				  class="relative text-sm md:text-base lg:text-lg font-medium text-[#838E9E] hover:text-[#0B63E5] transition-colors duration-300 cursor-pointer px-2 py-1"
				  class:active={$activeSection === item.id}
				>
				  {item.label}
				  {#if $activeSection === item.id}
					<span class="absolute bottom-0 left-0 w-full h-0.5 bg-[#0B63E5] rounded-full -mb-1 transition-all duration-300"></span>
				  {/if}
				</a>
			  </li>
			{/each}
		  </ul>
		</div>
  
		<!-- Contact Us Button - Desktop -->
		<div class="hidden md:block">
		  <button
			on:click={() => { goto('/#contact'); closeMenu(); }}
			class="bg-[#0B63E5] whitespace-nowrap py-2 lg:py-3 rounded-lg px-4 lg:px-6 text-sm lg:text-base font-semibold text-white hover:bg-[#0950c1] transition-colors duration-300"
		  >
			Contact Us
		  </button>
		</div>
  
		<!-- Hamburger Menu - Mobile -->
		<div bind:this={hamburgerRef} class="md:hidden cursor-pointer" on:click={toggleMenu}>
		  <iconify-icon
			icon={isMenuOpen ? 'line-md:menu-to-close-transition' : 'line-md:close-to-menu-transition'}
			width="28"
			height="28"
			class="text-[#0B63E5]"
		  ></iconify-icon>
		</div>
	  </nav>
	</section>
  
	<!-- Mobile Menu Drawer -->
	{#if isMenuOpen}
	  <div
		bind:this={menuRef}
		class="fixed top-16 right-0 w-64 bg-white shadow-lg h-[calc(100vh-4rem)] z-50 transition-transform duration-300 md:hidden"
	  >
		<div class="p-6">
		  <ul class="flex flex-col gap-6">
			{#each navItems as item}
			  <li>
				<a
				  href={`/#${item.id}`}
				  on:click={() => { goto(`/#${item.id}`); closeMenu(); }}
				  class="relative text-base font-medium text-[#838E9E] hover:text-[#0B63E5] transition-colors duration-300 flex items-center gap-3"
				  class:active={$activeSection === item.id}
				>
				  <iconify-icon icon={item.icon} width="20" height="20"></iconify-icon>
				  <span>{item.label}</span>
				  {#if $activeSection === item.id}
					<span class="absolute bottom-0 left-0 w-full h-0.3 bg-[#0B63E5] rounded-full -mb-1"></span>
				  {/if}
				</a>
			  </li>
			{/each}
		  </ul>
		  <div class="mt-8">
			<button
			  on:click={() => { goto('/#contact'); closeMenu(); }}
			  class="bg-[#0B63E5] py-3 rounded-lg w-full text-base font-semibold text-white hover:bg-[#0950c1] transition-colors duration-300"
			>
			  Contact Us
			</button>
		  </div>
		</div>
	  </div>
	  <div
		class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
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
  </style>