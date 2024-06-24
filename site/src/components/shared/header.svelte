<script>
	import ModeToggle from '../ModeToggle.svelte';
	import Icon from '@iconify/svelte';
</script>

<header
	class="sticky top-0 z-50 w-full border-b-[1px] border-gray-300 bg-white p-4 dark:border-gray-700"
>
	<nav class="m-auto flex w-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
		<!-- <div class="flex items-center gap-8">
			<Icon
				icon={'bitcoin-icons:menu-outline'}
				class="cursor-pointer text-4xl text-[#414141] dark:text-white"
			/>
			<ModeToggle />
		</div> -->

		<a href="/" class="flex items-center">
			<img width={200} height={200} src={'/logo.png'} alt="Logo" />
		</a>

		<div class="flex items-center justify-between"></div>
	</nav>
</header>
