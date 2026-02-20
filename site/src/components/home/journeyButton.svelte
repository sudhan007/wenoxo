<script>
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

<button
	on:click={() => {
		handleContactNavigation();
	}}
	class="rounded-full bg-blue-600 px-12 py-5 text-sm font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-blue-200"
	>Start Your Digital Journey &rarr;</button
>
