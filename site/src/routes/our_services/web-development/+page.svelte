<script>
	import { goto } from '$app/navigation';
	import {
		Banknote,
		Building,
		Eye,
		GraduationCap,
		Heart,
		Plane,
		Shield,
		ShoppingBag,
		Truck
	} from 'lucide-svelte';
</script>

<main id="s-web" class="view-pane mb-4 pt-36 md:pt-40">
	<header class="mx-auto mb-10 max-w-7xl px-6 md:mb-20">
		<div class="grid items-center gap-5 md:gap-20 lg:grid-cols-2">
			<div>
				<h1 class="mb-8 text-4xl font-black leading-tight md:text-6xl">
					Transforming Ideas into <br /><span class="italic text-blue-600">Digital Experiences</span
					>
				</h1>
				<p class="mb-8 text-lg leading-relaxed text-slate-500">
					At Wenoxo, we do more than build websites—we create meaningful digital experiences that
					inspire, engage, and convert users. Our websites are designed to reflect your brand
					identity while delivering high performance, security, and scalability. Serving clients
					globally, we follow international quality standards and modern design principles.
				</p>
			</div>
			<img
				alt="test"
				src="/assets/service/website.png?auto=format&fit=crop&w=1000&q=80"
				class=" "
			/>
		</div>
	</header>
	<!-- <section class="section-padding bg-white py-6">
		<div class="mx-auto max-w-7xl px-6 lg:px-12">
			<div class="grid items-center gap-20 lg:grid-cols-2">
				<div class="relative">
					<img
						src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80"
						class="relative z-10 rounded-[3rem] shadow-2xl"
						alt="App Preview"
					/>
					<div
						class="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-blue-100 opacity-50 blur-[100px]"
					></div>
				</div>
				<div>
					<h2 class="mb-8 text-4xl font-extrabold leading-tight">
						Performance, Usability, and <br /><span class="text-blue-600">Scalability</span>
					</h2>
					<p class="mb-8 text-lg leading-relaxed text-slate-500">
						Every mobile solution is built with a focus on long-term scalability to support business
						growth. Our multidisciplinary team works closely with clients to understand business
						objectives, technical requirements, and long-term vision, ensuring that every solution
						aligns with defined goals.
					</p>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="rounded-2xl border border-slate-100 bg-slate-50 p-6">
							<h4 class="mb-2 font-bold italic text-blue-600">Future-Ready</h4>
							<p class="text-xs text-slate-400">Architectures built for long-term evolution.</p>
						</div>
						<div class="rounded-2xl border border-slate-100 bg-slate-50 p-6">
							<h4 class="mb-2 font-bold italic text-blue-600">User-Centric</h4>
							<p class="text-xs text-slate-400">Designed for engagement and revenue goals.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section> -->
	<section class="section-padding border-y border-slate-100 bg-slate-50/50 py-5">
		<div class="mx-auto max-w-7xl px-6 lg:px-12">
			<div class="mb-20 text-center">
				<h2 class="mb-4 text-4xl font-black">Strategic Framework</h2>
				<p class="text-xs font-bold uppercase tracking-widest text-slate-400">Why Work With Us?</p>
			</div>
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				<!-- Strategy Cards -->
				<div
					class="group rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-sm transition-all hover:shadow-xl"
				>
					<div
						class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white"
					>
						<Shield />
					</div>
					<h3 class="mb-4 text-xl font-bold">Quality Standards</h3>
					<p class="text-sm italic leading-relaxed text-slate-500">
						Websites developed to meet international benchmarks for performance, security, and
						usability.
					</p>
				</div>
				<div
					class="group rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-sm transition-all hover:shadow-xl"
				>
					<div
						class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white"
					>
						<Eye />
					</div>
					<h3 class="mb-4 text-xl font-bold">Transparency</h3>
					<p class="text-sm italic leading-relaxed text-slate-500">
						Clear communication, milestone-based progress, and accountability at every stage.
					</p>
				</div>
				<div class="rounded-[2.5rem] bg-slate-900 p-10 text-white shadow-xl lg:col-span-1">
					<h3 class="mb-6 text-xl font-bold uppercase tracking-tighter text-blue-400">
						Core Expertise
					</h3>
					<ul class="space-y-3 text-sm text-slate-400">
						<li>• Custom Website Development</li>
						<li>• E-commerce Website Development</li>
						<li>• Web Applications & Business Portals</li>
						<li>• UI/UX Design & Prototyping</li>
						<li>• CMS Platforms (WordPress, Shopify, Magento)</li>
						<li>• Website Maintenance, Security & Performance Optimization</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
	<section class="section-padding bg-white">
		<div class="mx-auto max-w-7xl px-6 pt-4 lg:px-12">
			<h3
				class="mb-16 text-center text-[11px] font-black uppercase tracking-[0.5em] text-slate-300"
			>
				Technology Arsenal
			</h3>
			<div class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
				<!-- Tech Stack Color Codes -->
				<div class="tech-card">
					<div class="h-2 w-2 rounded-full" style="background:#02569B"></div>
					<p class="text-xs font-bold uppercase tracking-widest">HTML5</p>
				</div>
				<div class="tech-card">
					<div class="h-2 w-2 rounded-full" style="background:#61DAFB"></div>
					<p class="text-xs font-bold uppercase tracking-widest">CSS3</p>
				</div>
				<div class="tech-card">
					<div class="h-2 w-2 rounded-full" style="background:#F05138"></div>
					<p class="text-xs font-bold uppercase tracking-widest">JavaScript</p>
				</div>
				<div class="tech-card">
					<div class="h-2 w-2 rounded-full" style="background:#7F52FF"></div>
					<p class="text-xs font-bold uppercase tracking-widest">React</p>
				</div>
				<div class="tech-card">
					<div class="h-2 w-2 rounded-full" style="background:#FFCA28"></div>
					<p class="text-xs font-bold uppercase tracking-widest">Angular</p>
				</div>
				<div class="tech-card">
					<div class="h-2 w-2 rounded-full" style="background:#FF9900"></div>
					<p class="text-xs font-bold uppercase tracking-widest">Vue.js</p>
				</div>
				<div class="tech-card">
					<div class="h-2 w-2 rounded-full" style="background:#FF9900"></div>
					<p class="text-xs font-bold uppercase tracking-widest">Node.js</p>
				</div>
				<div class="tech-card">
					<div class="h-2 w-2 rounded-full" style="background:#FF9900"></div>
					<p class="text-xs font-bold uppercase tracking-widest">PHP</p>
				</div>
				<div class="tech-card">
					<div class="h-2 w-2 rounded-full" style="background:#FF9900"></div>
					<p class="text-xs font-bold uppercase tracking-widest">Django</p>
				</div>
				<div class="tech-card">
					<div class="h-2 w-2 rounded-full" style="background:#FF9900"></div>
					<p class="text-xs font-bold uppercase tracking-widest">Laravel</p>
				</div>
				<div class="tech-card">
					<div class="h-2 w-2 rounded-full" style="background:#FF9900"></div>
					<p class="text-xs font-bold uppercase tracking-widest">API Integrations</p>
				</div>
				<div class="tech-card">
					<div class="h-2 w-2 rounded-full" style="background:#61DAFB"></div>
					<p class="text-xs font-bold uppercase tracking-widest">Cloud Hosting</p>
				</div>
				<div class="tech-card">
					<div class="h-2 w-2 rounded-full" style="background:#7F52FF"></div>
					<p class="text-xs font-bold uppercase tracking-widest">SEO Optimization</p>
				</div>
			</div>
		</div>
	</section>
	<section class="section-padding my-6 bg-slate-900 py-6 text-white">
		<div class="mx-auto max-w-7xl px-6 lg:px-12">
			<h2 class="mb-20 text-center text-4xl font-black uppercase tracking-widest">
				Development Lifecycle
			</h2>
			<div class="relative">
				<!-- Process line positioned correctly -->
				<div class="process-line hidden lg:block"></div>

				<div class="grid gap-12 text-center lg:grid-cols-5 lg:gap-8">
					<!-- Step 1 -->
					<div class="relative z-10">
						<div class="process-dot-wrapper">
							<div class="process-dot"></div>
						</div>
						<h4 class="mb-2 mt-6 text-lg font-bold">01. Discovery</h4>
						<p class="text-sm text-slate-400">Requirements Analysis</p>
					</div>

					<!-- Step 2 -->
					<div class="relative z-10">
						<div class="process-dot-wrapper">
							<div class="process-dot"></div>
						</div>
						<h4 class="mb-2 mt-6 text-lg font-bold">02. Design</h4>
						<p class="text-sm text-slate-400">UI/UX Prototyping</p>
					</div>

					<!-- Step 3 -->
					<div class="relative z-10">
						<div class="process-dot-wrapper">
							<div class="process-dot"></div>
						</div>
						<h4 class="mb-2 mt-6 text-lg font-bold">03. Development</h4>
						<p class="text-sm text-slate-400">Iterative Engineering</p>
					</div>

					<!-- Step 4 -->
					<div class="relative z-10">
						<div class="process-dot-wrapper">
							<div class="process-dot"></div>
						</div>
						<h4 class="mb-2 mt-6 text-lg font-bold">04. Testing</h4>
						<p class="text-sm text-slate-400">QA & Bug Verification</p>
					</div>

					<!-- Step 5 -->
					<div class="relative z-10">
						<div class="process-dot-wrapper">
							<div class="process-dot"></div>
						</div>
						<h4 class="mb-2 mt-6 text-lg font-bold">05. Launch</h4>
						<p class="text-sm text-slate-400">Deployment</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="section-padding bg-white">
		<div class="mx-auto max-w-7xl px-6 text-center lg:px-12">
			<h2 class="mb-16 text-4xl font-black italic">
				Industries We <span class="text-blue-600">Accelerate.</span>
			</h2>
			<div class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-7">
				<div class="space-y-3">
					<div
						class="flex items-center justify-center rounded-2xl bg-slate-50 p-6 text-blue-600 shadow-sm"
					>
						<Heart />
					</div>
					<p class="text-[10px] font-black uppercase">Healthcare</p>
				</div>
				<div class="space-y-3">
					<div
						class="flex items-center justify-center rounded-2xl bg-slate-50 p-6 text-blue-600 shadow-sm"
					>
						<ShoppingBag />
					</div>
					<p class="text-[10px] font-black uppercase">Online Retail</p>
				</div>
				<div class="space-y-3">
					<div
						class="flex items-center justify-center rounded-2xl bg-slate-50 p-6 text-blue-600 shadow-sm"
					>
						<GraduationCap />
					</div>
					<p class="text-[10px] font-black uppercase">Education</p>
				</div>
				<div class="space-y-3">
					<div
						class="flex items-center justify-center rounded-2xl bg-slate-50 p-6 text-blue-600 shadow-sm"
					>
						<Banknote />
					</div>
					<p class="text-[10px] font-black uppercase">Finance</p>
				</div>
				<div class="space-y-3">
					<div
						class="flex items-center justify-center rounded-2xl bg-slate-50 p-6 text-blue-600 shadow-sm"
					>
						<Building />
					</div>
					<p class="text-[10px] font-black uppercase">Real Estate</p>
				</div>
				<div class="space-y-3">
					<div
						class="flex items-center justify-center rounded-2xl bg-slate-50 p-6 text-blue-600 shadow-sm"
					>
						<Plane />
					</div>
					<p class="text-[10px] font-black uppercase">Tourism</p>
				</div>
				<div class="space-y-3">
					<div
						class="flex items-center justify-center rounded-2xl bg-slate-50 p-6 text-blue-600 shadow-sm"
					>
						<Truck />
					</div>
					<p class="text-[10px] font-black uppercase">Logistics</p>
				</div>
			</div>
		</div>
	</section>
	<section class="section-padding bg-slate-50">
		<div class="mx-auto max-w-7xl px-6 lg:px-12">
			<h2 class="mb-16 text-center text-4xl font-black uppercase tracking-tighter">
				Success Stories
			</h2>
			<div class="grid gap-12 md:grid-cols-2">
				<div class="group cursor-pointer">
					<div
						class="relative mb-8 aspect-video overflow-hidden rounded-[3rem] bg-white shadow-2xl"
					>
						<img
							alt="Bible"
							src="/service/web-development/bible.jpeg?auto=format&fit=crop&w=1200&q=80"
							class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
						/>
						<!-- <div class="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent"></div> -->
					</div>
					<div class="px-6">
						<h3 class="mb-2 text-3xl font-extrabold uppercase tracking-tighter">Bible Website</h3>
						<!-- <p class="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
							Biodegradable Bag Distribution Management
						</p>
						<div class="flex gap-4">
							<span
								class="rounded-lg border border-slate-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400"
								>Flutter</span
							>
							<span
								class="rounded-lg border border-slate-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400"
								>Firebase</span
							>
						</div> -->
					</div>
				</div>
				<div class="group cursor-pointer pt-12 lg:pt-24">
					<div
						class="relative mb-8 aspect-video overflow-hidden rounded-[3rem] bg-white shadow-2xl"
					>
						<img
							alt="Mahilchi"
							src="/service/web-development/mahilchi.png?auto=format&fit=crop&w=1200&q=80"
							class="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
						/>
						<!-- <div class="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent"></div> -->
					</div>
					<div class="px-6">
						<h3 class="mb-2 text-3xl font-extrabold uppercase tracking-tighter">
							Mahilchi Construction
						</h3>
						<!-- <p class="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
							Custom Food Delivery Application
						</p>
						<div class="flex gap-4">
							<span
								class="rounded-lg border border-slate-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400"
								>Elysia JS</span
							>
							<span
								class="rounded-lg border border-slate-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400"
								>Flutter</span
							>
						</div> -->
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="section-padding bg-white text-center">
		<div class="mx-auto max-w-4xl px-6">
			<h2 class="mb-8 text-5xl font-black italic leading-tight tracking-tighter lg:text-7xl">
				Let’s build something <br /><span class="text-blue-600">extraordinary.</span>
			</h2>
			<p class="mb-12 text-lg text-slate-500">
				Partner with Wenoxo to build mobile apps that strengthen brands and accelerate digital
				growth.
			</p>
			<button
				class="rounded-full bg-blue-600 px-12 py-5 text-sm font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-blue-200"
				>Start Your Digital Journey &rarr;</button
			>
		</div>
	</section>
</main>

<style>
	.tech-card {
		@apply flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl;
	}

	.process-dot-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.process-dot {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #2563eb;
		position: relative;
		z-index: 10;
		box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2);
	}

	.process-line {
		position: absolute;
		top: 10px; /* Half of dot height to center it */
		left: 10%; /* Start from first dot */
		width: 80%; /* End at last dot */
		height: 2px;
		background: linear-gradient(to right, #475569 0%, #475569 100%);
		z-index: 5;
	}

	.section-padding {
		@apply py-10 lg:py-16;
	}

	/* Mobile responsiveness */
	@media (max-width: 1023px) {
		.process-dot {
			width: 16px;
			height: 16px;
		}
	}
</style>
