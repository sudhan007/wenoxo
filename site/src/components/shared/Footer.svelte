<script>
let isHovered = $state(false);
  </script>
  
  <footer class="bg-black  px-4 text-white pt-10 md:pt-24 lg:pt-32 pb-8 lg:pb-10">
	<div class="w-[100%] md:w-[90%] mx-auto  container ">
	  <!-- Top navigation and email -->
	  <div class="flex flex-col md:flex-row justify-between items-start md:items-center md:pb-4 md:mb-4 gap-6">
		<nav class="flex flex-wrap gap-4 md:gap-6">
		  <a href="/#home" class="text-sm md:text-base text-white/60 hover:text-white transition-colors">Home</a>
		  <a href="/#about" class="text-sm md:text-base text-white/60 hover:text-white transition-colors">About Us</a>
		  <a href="/#service" class="text-sm md:text-base text-white/60 hover:text-white transition-colors">Services</a>
		  <a href="/#howWeWork" class="text-sm md:text-base text-white/60 hover:text-white transition-colors">How we work</a>

		</nav>
		<div class="text-2xl md:text-3xl xl:text-4xl lg:text-5xl font-thin font-ct w-full md:w-auto text-left md:text-right">
			<a 
			  href="mailto:info@wenoxo.in" 
			  class="break-words inline-block hover:scale-105 transition-transform duration-300"
			>
			  info@wenoxo.in
			</a>
		  </div>
		  
	  </div>
  
	  <!-- Divider -->
	  <div class=" md:py-5">
		<hr class="bg-white/20"/>
	  </div>
  
	  <!-- Address and social links -->
	  <div class="flex flex-col md:flex-row justify-between  items-center my-4 mt-6 md:mt-8 gap-8">
		<!-- Addresses -->
		<div class="flex justify-center md:justify-start gap-4 md:gap-8 w-full lg:w-auto">
		  <div>
			<p class="font-bold text-base text-center md:text-left mb-3 md:mb-4">India</p>
			<p class="text-white/50 text-center md:text-left text-xs md:text-sm">
				<a href="tel:+916380058663" class="hover:underline">+91 63800 58663</a><br>
				No.398A, 2nd Floor,<br>
				MS Rd, Kattayanvilai,<br>
				Nagercoil,<br>
			     Tamil Nadu 629003
			</p>
		  </div>
		  <div>
			<p class="font-bold text-center md:text-left text-base mb-3 md:mb-4">Oman</p>
			<p class="text-white/50 text-center md:text-left text-xs md:text-sm">
				<a href="tel:+96895661601" class="hover:underline">+968 95661601</a><br>
			P.O No 684,<br>
			  Postal Code 114,<br>
			  Al Misfa, Bousher, Muscat,<br>
			  Sultanate of Oman
			</p>
		  </div>
		</div>
  
		<!-- Social links -->
		<div class="flex flex-row md:flex-col  gap-4 md:gap-6 lg:gap-4">
		  <a href="https://www.linkedin.com/company/93224526/admin/dashboard/" target="_blank" class="text-lg md:text-xl text-white/80 hover:text-white transition-colors">Linkedin</a>
		  <a href="https://www.instagram.com/wenoxo_technologies/" target="_blank" class="text-lg md:text-xl text-white/80 hover:text-white transition-colors">Instagram</a>
		  <a href="https://www.facebook.com/WenoxoTechnologies" target="_blank" class="text-lg md:text-xl text-white/80 hover:text-white transition-colors">Facebook</a>
		</div>
	  </div>
  
	  <!-- Bottom section with logo, policies and QR -->
	  <div class="flex flex-col lg:flex-row justify-between items-center gap-8 pt-8 lg:pt-10">
		<!-- Logo -->
		<div class="text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-bold relative">
		  <p>WENOXO
			<!-- <sup class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-thin absolute top-0">®</sup> -->
		</p>
		</div>
  
		<!-- Policy links -->
		<div class="flex  gap-2 md:gap-4 text-center items-center md:text-left">
		  <a href="/privacypolicy" class="text-sm md:text-lg text-white/60 hover:text-white transition-colors hover:underline">Privacy policy</a>
		  <a href="#" class="text-sm md:text-lg text-white/60 hover:text-white transition-colors hover:underline">License agreement</a>
		</div>
  
		<!-- QR Code -->
		<div
		class="flex items-center bg-white p-3 md:p-4 rounded-lg order-first lg:order-last relative"
		on:mouseenter={() => (isHovered = true)}
		on:mouseleave={() => (isHovered = false)}
	  >
		<img
		  src="/qr.png"
		  alt="QR Code"
		  class="w-16 h-16 md:w-20 md:h-20 cursor-pointer"
		/>
		{#if isHovered}
		  <a
			href="https://online.fliphtml5.com/wenoxo/gwks/"
			target="_blank"
			rel="noopener noreferrer"
			class="absolute inset-0 flex items-center justify-center text-blue-600 hover:underline text-sm md:text-base transition-all duration-200"
		  >
<p class="bg-white py-1 px-2 rounded-lg text-xs truncate max-w-[120px] md:max-w-[150px]">
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
