<script>
	let isHovered = $state(false);
</script>

<footer class="bg-black px-4 pb-8 pt-10 text-white md:pt-24 lg:pb-10 lg:pt-32">
	<div class="container mx-auto w-[100%] md:w-[90%]">
		<!-- Top navigation and email -->
		<div
			class="flex flex-col items-start justify-between gap-6 md:mb-4 md:flex-row md:items-center md:pb-4"
		>
			<nav class="flex flex-wrap gap-4 md:gap-6">
				<a
					href="/#home"
					class="text-sm text-white/60 transition-colors hover:text-white md:text-base">Home</a
				>
				<a
					href="/about_us"
					class="text-sm text-white/60 transition-colors hover:text-white md:text-base">About Us</a
				>
				<a
					href="/our_services"
					class="text-sm text-white/60 transition-colors hover:text-white md:text-base">Services</a
				>
				<a
					href="/privacypolicy"
					target="_blank"
					class="text-sm text-white/60 transition-colors hover:text-white md:text-base"
					>Privacy policy</a
				>
			</nav>
			<div
				class="font-ct w-full text-left text-2xl font-thin md:w-auto md:text-right md:text-3xl lg:text-5xl xl:text-4xl"
			>
				<a
					href="mailto:info@wenoxo.in"
					class="inline-block break-words transition-transform duration-300 hover:scale-105"
				>
					info@wenoxo.in
				</a>
			</div>
		</div>

		<!-- Divider -->
		<div class=" md:py-5">
			<hr class="bg-white/20" />
		</div>

		<!-- Address and social links -->
		<div class="my-4 mt-6 flex flex-col items-center justify-between gap-8 md:mt-8 md:flex-row">
			<!-- Addresses -->
			<div class="flex w-full justify-center gap-4 md:justify-start md:gap-8 lg:w-auto">
				<div>
					<p class="mb-3 text-center text-base font-bold md:mb-4 md:text-left">India</p>
					<p class="text-center text-xs text-white/50 md:text-left md:text-sm">
						<a href="tel:+916380058663" class="hover:underline">+91 63800 58663</a><br />
						No.398A, 2nd Floor,<br />
						MS Rd, Kattayanvilai,<br />
						Nagercoil,<br />
						Tamil Nadu 629003
					</p>
				</div>
				<div>
					<p class="mb-3 text-center text-base font-bold md:mb-4 md:text-left">Oman</p>
					<p class="text-center text-xs text-white/50 md:text-left md:text-sm">
						<a href="tel:+96895661601" class="hover:underline">+968 95661601</a><br />
						P.O No 684,<br />
						Postal Code 114,<br />
						Al Misfa, Bousher, Muscat,<br />
						Sultanate of Oman
					</p>
				</div>
			</div>

			<!-- Social links -->
			<div class="flex flex-row gap-4 md:flex-col md:gap-6 lg:gap-4">
				<a
					href="https://www.linkedin.com/company/93224526/admin/dashboard/"
					target="_blank"
					class="text-lg text-white/80 transition-colors hover:text-white md:text-xl">Linkedin</a
				>
				<a
					href="https://www.instagram.com/wenoxo_technologies/"
					target="_blank"
					class="text-lg text-white/80 transition-colors hover:text-white md:text-xl">Instagram</a
				>
				<a
					href="https://www.facebook.com/WenoxoTechnologies"
					target="_blank"
					class="text-lg text-white/80 transition-colors hover:text-white md:text-xl">Facebook</a
				>
			</div>
		</div>

		<!-- Bottom section with logo, policies and QR -->
		<div class="flex flex-col items-center justify-between gap-8 pt-8 lg:flex-row lg:pt-10">
			<!-- Logo -->
			<div class="relative text-5xl font-bold md:text-6xl lg:text-7xl xl:text-9xl">
				<p>
					WENOXO
					<!-- <sup class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-thin absolute top-0">®</sup> -->
				</p>
			</div>

			<!-- Policy links -->
			<!-- <div class="flex items-center gap-2 text-center md:gap-4 md:text-left">
				
				<a
					href="#"
					class="text-sm text-white/60 transition-colors hover:text-white hover:underline md:text-lg"
					>License agreement</a
				>
			</div> -->

			<!-- QR Code -->
			<div
				class="relative order-first flex items-center rounded-lg bg-white p-3 md:p-4 lg:order-last"
				on:mouseenter={() => (isHovered = true)}
				on:mouseleave={() => (isHovered = false)}
			>
				<img src="/qr.png" alt="QR Code" class="h-16 w-16 cursor-pointer md:h-20 md:w-20" />
				{#if isHovered}
					<a
						href="https://online.fliphtml5.com/wenoxo/gwks/"
						target="_blank"
						rel="noopener noreferrer"
						class="absolute inset-0 flex items-center justify-center text-sm text-blue-600 transition-all duration-200 hover:underline md:text-base"
					>
						<p
							class="max-w-[120px] truncate rounded-lg bg-white px-2 py-1 text-xs md:max-w-[150px]"
						>
							https://online.fliphtml5.com/wenoxo/gwks
						</p>
					</a>
				{/if}
			</div>
		</div>
	</div>
</footer>

<style>
	/* Any additional custom styles can go here */
	@media (max-width: 640px) {
		footer .font-ct {
			font-size: 1.5rem; /* Further reduce on very small screens */
		}
	}
	img {
		pointer-events: none;
	}

	/* Style the container to position the hover text */
	.relative {
		position: relative;
	}

	/* Optional: Add a subtle overlay effect on hover */
</style>
