<script>
	import Icon from '@iconify/svelte';

	const year = new Date().getFullYear();
</script>

<footer class="bg-[#1A1A1A]">
	<main
		class=" grid grid-cols-1 gap-y-6 px-4 pt-8 text-start text-white md:grid-cols-3 md:gap-x-20 md:px-14 md:py-10 lg:grid-cols-5"
	>
		<div>
			<div class="flex flex-col justify-start gap-y-8 md:gap-y-10">
				<div>
					<img src="/footerlogo.png" class="h-auto w-full" alt="Footer Logo" />
				</div>
				<div class="flex items-center gap-4">
					<Icon icon={'line-md:instagram'} class="cursor-pointer text-4xl" />
					<Icon icon={'line-md:twitter-x'} class="cursor-pointer text-4xl" />
					<Icon
						icon={'simple-line-icons:social-linkedin'}
						class="cursor-pointer text-2xl md:text-4xl"
					/>
					<Icon icon={'icon-park-outline:facebook'} class="cursor-pointer text-4xl" />
				</div>
				<div class="font-sharpmedium flex items-center gap-2">
					<p>&copy;</p>
					<p class="text-wrap">wenoxo{year}.copyrights</p>
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
					</ul>
				</div>
			</div>
		</div>
	</main>
	<div
		style="color: rgba(255, 255, 255, 0.12);"
		class="font-sharpbold mt-3 flex justify-center text-[60px] uppercase md:mt-10 md:py-5 md:text-[150px]"
	>
		<h1>wenoxo</h1>
	</div>
</footer>
