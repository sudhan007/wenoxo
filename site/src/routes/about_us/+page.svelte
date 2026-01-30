<script>
	import Milestones from '@/components/home/Milestones.svelte';
	import { Globe, Target } from 'lucide-svelte';
</script>

<div id="about" class="pt-10">
	<!-- <Milestones /> -->
	<main id="about-page" class="page-content active">
		<!-- Hero Section -->
		<section class="relative overflow-hidden bg-white py-20 lg:py-32">
			<div class="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
				<div>
					<h1 class="mb-8 text-5xl font-extrabold leading-[1.1] text-slate-900 lg:text-7xl">
						Empowering Businesses Through <span class="text-blue-600">Digital Innovation</span>
					</h1>
					<p class="mb-8 text-lg leading-relaxed text-slate-600">
						Wenoxo is a technology-driven company delivering high-quality websites, mobile
						applications, and end-to-end digital solutions that help businesses grow and compete in
						an evolving digital landscape. With a strong focus on innovation, performance,
						scalability, and user experience, Wenoxo transforms ideas into secure, reliable, and
						impactful digital products.
					</p>
					<div class="rounded-r-xl border-l-4 border-blue-600 bg-slate-50 p-6">
						<p class="font-medium italic text-slate-700">
							"By combining deep technology expertise with strategic thinking, Wenoxo enables
							businesses to enhance operational efficiency, strengthen their digital presence, and
							achieve long-term success."
						</p>
					</div>
				</div>
				<div class="relative">
					<img
						src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
						alt="Team Innovation"
						class="relative z-10 rounded-[2rem] shadow-2xl"
					/>
					<div
						class="absolute -bottom-6 -left-6 z-20 rounded-2xl border border-gray-100 bg-white p-8 shadow-xl"
					>
						<div class="flex items-center space-x-4">
							<div class="rounded-full bg-blue-100 p-3 text-blue-600">
								<Globe />
							</div>
							<div>
								<p class="text-sm font-bold uppercase text-gray-500">Partners Worldwide</p>
								<p class="text-xl font-extrabold">Global Reach</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Stats Section -->
		<section class="bg-slate-900 py-16">
			<div class="mx-auto grid max-w-7xl grid-cols-2 gap-12 px-6 text-center md:grid-cols-4">
				<div>
					<h3 class="mb-2 text-4xl font-extrabold text-white">100+</h3>
					<p class="text-sm font-bold uppercase tracking-widest text-blue-400">
						Projects Completed
					</p>
				</div>
				<div>
					<h3 class="mb-2 text-4xl font-extrabold text-white">10+ Years</h3>
					<p class="text-sm font-bold uppercase tracking-widest text-blue-400">Team Experience</p>
				</div>
				<div>
					<h3 class="mb-2 text-4xl font-extrabold text-white">25+</h3>
					<p class="text-sm font-bold uppercase tracking-widest text-blue-400">Industries Served</p>
				</div>
				<div>
					<h3 class="mb-2 text-4xl font-extrabold text-white">40+</h3>
					<p class="text-sm font-bold uppercase tracking-widest text-blue-400">Global Clients</p>
				</div>
			</div>
		</section>

		<!-- Company Overview -->
		<section class="bg-gray-50 py-24">
			<div class="mx-auto max-w-7xl px-6">
				<div class="grid gap-20 lg:grid-cols-2">
					<div>
						<h2 class="mb-6 text-3xl font-extrabold">Company Overview</h2>
						<div class="space-y-6 leading-relaxed text-slate-600">
							<p>
								Wenoxo is a professional technology solutions company specializing in website
								development, mobile application development, e-commerce platforms, digital
								marketing, and IT staffing solutions. We work closely with our clients to understand
								their business objectives, technical requirements, and long-term vision, ensuring
								every solution we deliver aligns with their goals.
							</p>
							<p>
								Our team consists of skilled designers, developers, strategists, and project
								managers who collaborate to build scalable, secure, and high-performing digital
								products. We are committed to quality, transparency, timely delivery, and long-term
								partnerships that support continuous growth and innovation.
							</p>
						</div>
					</div>
					<div class="space-y-8">
						<div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
							<div class="mb-4 flex items-center space-x-4">
								<Target class="h-8 w-8 text-blue-600" />
								<h3 class="text-xl font-bold">Our Mission</h3>
							</div>
							<p class="text-slate-600">
								To design and deliver innovative, reliable, and user-centric digital solutions that
								help businesses grow, streamline operations, and achieve sustainable success through
								technology.
							</p>
						</div>
						<div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
							<div class="mb-4 flex items-center space-x-4">
								<Target class="h-8 w-8 text-blue-600" />
								<h3 class="text-xl font-bold">Our Vision</h3>
							</div>
							<p class="text-slate-600">
								To establish Wenoxo as a trusted global technology partner known for delivering
								powerful digital experiences, enabling business transformation, and shaping the
								future of digital innovation.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
</div>
