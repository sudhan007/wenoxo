<script>
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';

	const year = new Date().getFullYear();
</script>

<!-- <footer class="bg-[#1A1A1A]">
	<main
		class=" grid grid-cols-1 items-stretch gap-y-6 px-4 pt-8 text-start text-white md:grid-cols-3 md:gap-x-10 md:px-6 md:py-10 lg:grid-cols-4"
	>
		<div>
			<div class="flex flex-col justify-start gap-y-8 md:gap-y-10">
				<div>
					<img src="/footerlogo.png" class="h-auto w-full" alt="Footer Logo" />
				</div>

				<div class="">
					<div class="text-xl">Let’s <span class="text-[#28A84E]">Connect</span> with Us</div>
					<div class="mt-5 grid grid-cols-2 items-stretch gap-5">
						<div>
							<h2>India</h2>
							<h2>+91 - 63800 58663</h2>

							<div>No.398A, 2nd Floor, MS Rd, Kattayanvilai, Nagercoil, Tamil Nadu 629003</div>
						</div>
						<div>
							<h2>India</h2>
							<h2>+91 - 63800 58663</h2>

							<div>No.398A, 2nd Floor, MS Rd, Kattayanvilai, Nagercoil, Tamil Nadu 629003</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<div class="flex flex-col items-start">
				<h1 class="font-sharpbold mb-4 text-2xl text-[#EEEEEE]">Services</h1>
				<div>
					<ul
						class="font-sharpmedium cursor-pointer space-y-3 text-base leading-loose text-[#BBBBBB] md:text-xl"
					>
						<li class="cursor-pointer text-[#BBBBBB] hover:text-[#EEEEEE]">Design</li>
						<li class="cursor-pointer text-[#BBBBBB] hover:text-[#EEEEEE]">Technology</li>
						<li class="cursor-pointer text-[#BBBBBB] hover:text-[#EEEEEE]">Marketing Strategy</li>
						<li class="cursor-pointer text-[#BBBBBB] hover:text-[#EEEEEE]">Front End</li>
					</ul>
				</div>
			</div>
		</div>
		<div>
			<div class="flex flex-col items-start">
				<h1 class="font-sharpbold mb-4 text-2xl text-[#EEEEEE]">About</h1>
				<div>
					<ul
						class="font-sharpmedium cursor-pointer space-y-3 text-base leading-loose text-[#BBBBBB] md:text-xl"
					>
						<li class="cursor-pointer text-[#BBBBBB] hover:text-[#EEEEEE]">About us</li>
						<li class="cursor-pointer text-[#BBBBBB] hover:text-[#EEEEEE]">Careers</li>
						<li class="cursor-pointer text-[#BBBBBB] hover:text-[#EEEEEE]">Clients</li>
						<li class="cursor-pointer text-[#BBBBBB] hover:text-[#EEEEEE]">Team</li>
					</ul>
				</div>
			</div>
		</div>
		<div>
			<div class="flex flex-col items-start">
				<h1 class="font-sharpbold mb-4 text-2xl text-[#EEEEEE]">Quicklinks</h1>
				<div>
					<ul
						class="font-sharpmedium cursor-pointer space-y-3 text-base leading-loose text-[#BBBBBB] md:text-xl"
					>
						<li class="cursor-pointer text-[#BBBBBB] hover:text-[#EEEEEE]">Work</li>
						<li class="cursor-pointer text-[#BBBBBB] hover:text-[#EEEEEE]">Blog</li>
						<li class="cursor-pointer text-[#BBBBBB] hover:text-[#EEEEEE]">Clients</li>
						<li class="cursor-pointer text-[#BBBBBB] hover:text-[#EEEEEE]">Reach us</li>
					</ul>
				</div>
			</div>
		</div>
		<div>
			<div class="flex flex-col items-start">
				<h1 class="font-sharpbold mb-4 text-2xl text-[#EEEEEE]">Contact us</h1>
				<div>
					<ul
						class="font-sharpmedium cursor-pointer space-y-3 text-base leading-loose text-[#BBBBBB] md:text-xl"
					>
						<li class="cursor-pointer text-[#BBBBBB] hover:text-[#EEEEEE]">+91 - 63800 58663</li>
						<li class="cursor-pointer text-[#BBBBBB] hover:text-[#EEEEEE]">info@wenoxo.in</li>
						<a
							href="site/src/components/privacypolicy.html"
							class="cursor-pointer text-[#BBBBBB] hover:text-[#EEEEEE]">Privacy Policy</a
						>
					</ul>
				</div>
			</div>
		</div>
	</main>
	<div
		class="font-sharpbold mt-3 flex justify-center text-[60px] uppercase text-[#FFFFFF]/20 transition-all duration-1000 hover:text-[#FFFFFF] md:mt-10 md:py-5 md:text-[150px]"
	>
		<h1>wenoxo</h1>
	</div>
</footer> -->

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
								<p>+91 - 63800 58663</p>
								<p class="text-sm">
									No.398A, 2nd Floor, MS Rd, Kattayanvilai, Nagercoil, Tamil Nadu 629003
								</p>
							</div>
							<div class="flex flex-col gap-2">
								<h3 class="font-semibold">Oman</h3>
								<p>+968 95661601</p>
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
				<div class="flex gap-4">
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
<!-- <div class="flex items-center gap-4">
					<a
						target="_blank"
						href="https://www.instagram.com/wenoxo_technologies?igsh=MW9jZmUxNG84cDk4eg=="
					>
						<Icon icon={'line-md:instagram'} class="cursor-pointer text-4xl" /></a
					>
					<a href="https://x.com/WenoxoTech?t=FL6Yut-IF4bkWhCC77cgEA&s=09"
						><Icon icon={'line-md:twitter-x'} class="cursor-pointer text-4xl" /></a
					>
					<a href="https://www.linkedin.com/company/wenoxotechnologies-private-limited/">
						<Icon
							icon={'simple-line-icons:social-linkedin'}
							class="cursor-pointer text-2xl md:text-4xl"
						/></a
					>
					<a href="https://www.facebook.com/share/iUPDGPgNgDpQKdwH/?mibextid=qi2Omg">
						<Icon icon={'icon-park-outline:facebook'} class="cursor-pointer text-4xl" />
					</a>
				</div>
				<div class="font-sharpmedium flex items-center gap-2">
					<p>&copy;</p>
					<p class="text-wrap">wenoxo{year}.copyrights</p>
				</div> -->
