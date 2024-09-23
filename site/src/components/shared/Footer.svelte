<script>
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';

	const year = new Date().getFullYear();
</script>

<footer class="bg-[#1A1A1A] text-white">
	<main class="container mx-auto px-4 py-8 md:py-12 lg:py-16">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
			<!-- Address Section -->
			<div class="lg:col-span-2">
				<div class="flex flex-col gap-6">
					<img src="/footerlogo.png" class="h-auto w-full max-w-[200px]" alt="Footer Logo" />
					<div>
						<h2 class="font-sharpbold mb-4 text-2xl sm:text-3xl">
							Let's <span class="text-[#28A84E]">Connect</span> with Us
						</h2>
						<div class="font-sharpnormal grid gap-6 sm:grid-cols-2">
							<div class="flex flex-col gap-2">
								<h3 class="font-semibold">India</h3>
								<a href="tel:+916380058663">+91 - 63800 58663</a>
								<p class="text-sm">
									No.398A, 2nd Floor, MS Rd, Kattayanvilai, Nagercoil, Tamil Nadu 629003
								</p>
							</div>
							<div class="flex flex-col gap-2">
								<h3 class="font-semibold">Oman</h3>
								<a href="tel:+968 95661601">+968 95661601</a>
								<p class="text-sm">
									P.O No 684, Postal Code 114, Al Misfa, Bousher, Muscat, Sultanate of Oman
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Services Section -->
			<div>
				<h2 class="font-sharpbold mb-4 text-xl text-[#EEEEEE]">Services</h2>
				<ul class="font-sharpmedium space-y-2 text-[#BBBBBB]">
					<li><a href="#" class="transition-colors hover:text-[#EEEEEE]">Design</a></li>
					<li><a href="#" class="transition-colors hover:text-[#EEEEEE]">Technology</a></li>
					<li><a href="#" class="transition-colors hover:text-[#EEEEEE]">Marketing Strategy</a></li>
					<li><a href="#" class="transition-colors hover:text-[#EEEEEE]">Front End</a></li>
				</ul>
			</div>

			<!-- About Section -->
			<div>
				<h2 class="font-sharpbold mb-4 text-xl text-[#EEEEEE]">About</h2>
				<ul class="font-sharpmedium space-y-2 text-[#BBBBBB]">
					<li><a href="#" class="transition-colors hover:text-[#EEEEEE]">About us</a></li>
					<li><a href="#" class="transition-colors hover:text-[#EEEEEE]">Careers</a></li>
					<li><a href="#" class="transition-colors hover:text-[#EEEEEE]">Clients</a></li>
					<li><a href="#" class="transition-colors hover:text-[#EEEEEE]">Team</a></li>
				</ul>
			</div>

			<!-- Quicklinks Section -->
			<div>
				<h2 class="font-sharpbold mb-4 text-xl text-[#EEEEEE]">Quicklinks</h2>
				<ul class="font-sharpmedium space-y-2 text-[#BBBBBB]">
					<li><a href="#" class="transition-colors hover:text-[#EEEEEE]">Work</a></li>
					<li><a href="#" class="transition-colors hover:text-[#EEEEEE]">Blog</a></li>
					<li><a href="#" class="transition-colors hover:text-[#EEEEEE]">Clients</a></li>
					<li>
						<a href="./privacypolicy" class="transition-colors hover:text-[#EEEEEE]"
							>Privacy Policy</a
						>
					</li>
				</ul>
			</div>

			<!-- Social Media Section -->
			<div>
				<h2 class="font-sharpbold mb-4 text-xl text-[#EEEEEE]">Social Media</h2>
				<div class="flex flex-col gap-3 md:gap-6">
					<div class="flex items-center gap-3">
						<a
							href="https://www.instagram.com/wenoxo_technologies?igsh=MW9jZmUxNG84cDk4eg=="
							target="_blank"
							rel="noopener noreferrer"
							class="text-3xl transition-colors hover:text-[#EEEEEE]"
						>
							<Icon icon="line-md:instagram" />
						</a>
						<a
							href="https://x.com/WenoxoTech?t=FL6Yut-IF4bkWhCC77cgEA&s=09"
							target="_blank"
							rel="noopener noreferrer"
							class="text-3xl transition-colors hover:text-[#EEEEEE]"
						>
							<Icon icon="line-md:twitter-x" />
						</a>
						<a
							href="https://www.linkedin.com/company/wenoxotechnologies-private-limited/"
							target="_blank"
							rel="noopener noreferrer"
							class="text-3xl transition-colors hover:text-[#EEEEEE]"
						>
							<Icon icon="simple-line-icons:social-linkedin" />
						</a>
						<a
							href="https://www.facebook.com/share/iUPDGPgNgDpQKdwH/?mibextid=qi2Omg"
							target="_blank"
							rel="noopener noreferrer"
							class="text-3xl transition-colors hover:text-[#EEEEEE]"
						>
							<Icon icon="icon-park-outline:facebook" />
						</a>
					</div>
					<div>
						<a
							class="group inline-block rounded-full bg-[#469736] p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
							href="mailto:info@wenoxo.in"
						>
							<span
								class="font-sharpsemibold block rounded-full px-8 py-3 text-sm font-medium group-hover:bg-transparent md:text-lg"
							>
								info@wenoxo.in
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</main>

	<!-- Brand Name -->
	<div class="font-sharpbold py-8 text-center">
		<h1
			class="text-4xl uppercase text-[#FFFFFF]/20 transition-all duration-1000 hover:text-[#FFFFFF] sm:text-6xl md:text-8xl lg:text-9xl"
		>
			wenoxo
		</h1>
	</div>

	<!-- Dynamic Year -->
	<div class="font-sharpmedium py-4 text-center text-sm">
		<p>&copy; wenoxo {year}. All rights reserved.</p>
	</div>
</footer>
