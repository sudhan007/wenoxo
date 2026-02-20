<!-- <script lang="ts">
	import { Star } from 'lucide-svelte';
	import { writable } from 'svelte/store';

	const isSubmitting = writable(false);
	const submitStatus = writable({ type: '', message: '' });

	let formData = {
		role: '',
		name: '',
		email: ''
	};
	let cvFile: any = null;

	function handleFileChange(event: any) {
		const file = event.target.files[0];
		if (file) {
			// Check file size (max 5MB)
			if (file.size > 5 * 1024 * 1024) {
				submitStatus.set({ type: 'error', message: 'File size must be less than 5MB' });
				event.target.value = '';
				return;
			}
			cvFile = file;
			submitStatus.set({ type: '', message: '' });
		}
	}

	async function handleSubmit(event: any) {
		event.preventDefault();

		if (!cvFile) {
			submitStatus.set({ type: 'error', message: 'Please upload your CV' });
			return;
		}

		isSubmitting.set(true);
		submitStatus.set({ type: '', message: '' });
		try {
			const formDataToSend = new FormData();
			formDataToSend.append('role', formData.role);
			formDataToSend.append('name', formData.name);
			formDataToSend.append('email', formData.email);
			formDataToSend.append('cv', cvFile);
			console.log(formDataToSend);
			const response = await fetch('/api/send-resume', {
				method: 'POST',
				body: formDataToSend
			});

			const result = await response.json();

			if (response.ok && result.success) {
				submitStatus.set({
					type: 'success',
					message: 'Application submitted successfully! We will contact you soon.'
				});

				// Reset form
				formData = { role: '', name: '', email: '' };
				cvFile = null;
				event.target.reset();
			} else {
				throw new Error(result.error || 'Failed to submit application');
			}
		} catch (error: any) {
			console.error('Submission error:', error);
			submitStatus.set({
				type: 'error',
				message: error.message || 'Failed to submit application. Please try again.'
			});
		} finally {
			isSubmitting.set(false);
		}
	}
</script>

<main id="careers-page" class="page-content pt-10 md:pt-20">
	<section class="py-20">
		<div class="mx-auto max-w-5xl px-3 px-6">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-extrabold">Join Our Team & Build Your Future With Us</h2>
				<p class="text-slate-600">
					We’re always looking for passionate, skilled, and growth-driven professionals to join our
					team. If you’re ready to work on exciting projects and grow your career in a dynamic
					environment, explore our current openings below.
				</p>
			</div>

			<div class="mb-16 grid gap-8 md:grid-cols-3">
				<div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
					<h3 class="mb-4 text-xl font-bold">Flutter Developer</h3>
					<p class="mb-4 text-sm text-slate-500">
						We are looking for a skilled Flutter Developer to build high-quality, scalable mobile
						applications for Android and iOS platforms.
					</p>
					<p class="text-xs font-bold text-blue-600">Full Time • Remote/In-office</p>
				</div>
				<div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
					<h3 class="mb-4 text-xl font-bold">MERN Stack Developer</h3>
					<p class="mb-4 text-sm text-slate-500">
						We are seeking a talented MERN Stack Developer to build modern, high-performance web
						applications.
					</p>
					<p class="text-xs font-bold text-blue-600">Full Time • In-office</p>
				</div>
				<div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
					<h3 class="mb-4 text-xl font-bold">BDE</h3>
					<p class="mb-4 text-sm text-slate-500">
						We are hiring a motivated Business Development Executive to help expand our client base
						and grow business opportunities.
					</p>
					<p class="text-xs font-bold text-blue-600">Full Time • Hybrid</p>
				</div>
			</div>

			<div class="relative overflow-hidden rounded-[3rem] bg-slate-900 p-5 text-white md:p-12">
				<div class="relative z-10 grid items-center gap-12 lg:grid-cols-2">
					<div>
						<h3 class="mb-6 text-3xl font-bold">Why Join Us?</h3>
						<ul class="space-y-4">
							<li class="flex items-start">
								<Star class="mr-3 mt-1 h-5 w-5 text-blue-400" />
								<span>Growth-oriented work culture</span>
							</li>
							<li class="flex items-start">
								<Star class="mr-3 mt-1 h-5 w-5 text-blue-400" />
								<span>Opportunity to work on global projects</span>
							</li>
							<li class="flex items-start">
								<Star class="mr-3 mt-1 h-5 w-5 text-blue-400" />
								<span>Learning and skill development support</span>
							</li>
							<li class="flex items-start">
								<Star class="mr-3 mt-1 h-5 w-5 text-blue-400" />
								<span>Supportive, collaborative team environment</span>
							</li>
						</ul>
					</div>
					<div class="rounded-3xl bg-white/5 p-3 backdrop-blur-md md:p-8">
						<h4 class="mb-6 text-center text-2xl font-bold">Apply Now</h4>

						{#if $submitStatus.message}
							<div
								class="mb-4 rounded-lg p-3 {$submitStatus.type === 'success'
									? 'bg-green-500/20 text-green-300'
									: 'bg-red-500/20 text-red-300'}"
							>
								{$submitStatus.message}
							</div>
						{/if}

						<form on:submit={handleSubmit} class="space-y-4">
							<div>
								<label for="role" class="mb-2 block text-sm font-medium text-slate-300">
									Select Role *
								</label>
								<select
									id="role"
									bind:value={formData.role}
									required
									class="w-full rounded-xl border border-white/20 bg-black/50 p-4 text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50"
								>
									<option value="" class="!text-white" disabled>Choose a position</option>
									<option value="Flutter Developer">Flutter Developer</option>
									<option value="MERN Stack Developer">MERN Stack Developer</option>
									<option value="BDE">BDE</option>
								</select>
							</div>

							<div>
								<label for="name" class="mb-2 block text-sm font-medium text-slate-300">
									Full Name *
								</label>
								<input
									id="name"
									type="text"
									bind:value={formData.name}
									required
									placeholder="Enter your full name"
									class="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
								/>
							</div>

							<div>
								<label for="email" class="mb-2 block text-sm font-medium text-slate-300">
									Email Address *
								</label>
								<input
									id="email"
									type="email"
									bind:value={formData.email}
									required
									placeholder="your.email@example.com"
									class="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
								/>
							</div>

							<div>
								<label for="cv" class="mb-2 block text-sm font-medium text-slate-300">
									Upload CV * (PDF, DOC, DOCX - Max 5MB)
								</label>
								<input
									id="cv"
									type="file"
									on:change={handleFileChange}
									accept=".pdf,.doc,.docx"
									required
									class="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white file:mr-4 file:rounded-full file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
								/>
							</div>

							<button
								type="submit"
								disabled={$isSubmitting}
								class="w-full rounded-full bg-blue-600 px-8 py-3 font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{$isSubmitting ? 'Submitting...' : 'Submit Application'}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
</main> -->

<script lang="ts">
	import { Star } from 'lucide-svelte';
	import { writable } from 'svelte/store';

	const isSubmitting = writable(false);
	const submitStatus = writable({ type: '', message: '' });

	let formData = {
		role: '',
		name: '',
		email: ''
	};
	let cvFile: File | null = null;

	// ────────────────────────────────────────────────
	// Scroll to form + prefill role
	// ────────────────────────────────────────────────
	function applyForRole(roleTitle: string) {
		formData.role = roleTitle;

		const formSection = document.getElementById('apply-form-section');
		if (formSection) {
			formSection.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	}

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				submitStatus.set({ type: 'error', message: 'File size must be less than 5MB' });
				target.value = '';
				return;
			}
			cvFile = file;
			submitStatus.set({ type: '', message: '' });
		}
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();

		if (!cvFile) {
			submitStatus.set({ type: 'error', message: 'Please upload your CV' });
			return;
		}

		isSubmitting.set(true);
		submitStatus.set({ type: '', message: '' });

		try {
			const formDataToSend = new FormData();
			formDataToSend.append('role', formData.role);
			formDataToSend.append('name', formData.name);
			formDataToSend.append('email', formData.email);
			if (cvFile) formDataToSend.append('cv', cvFile);

			const response = await fetch('/api/send-resume', {
				method: 'POST',
				body: formDataToSend
			});

			const result = await response.json();

			if (response.ok && result.success) {
				submitStatus.set({
					type: 'success',
					message: 'Application submitted successfully! We will contact you soon.'
				});

				formData = { role: '', name: '', email: '' };
				cvFile = null;
				(event.target as HTMLFormElement).reset();
			} else {
				throw new Error(result.error || 'Failed to submit application');
			}
		} catch (error: any) {
			console.error('Submission error:', error);
			submitStatus.set({
				type: 'error',
				message: error.message || 'Failed to submit application. Please try again.'
			});
		} finally {
			isSubmitting.set(false);
		}
	}

	// Job data
	const jobs = [
		{
			title: 'Flutter Developer',
			exp: '2–3 Years',
			type: 'Full Time ',
			short: 'Build high-quality, scalable mobile apps for Android & iOS using Flutter.',
			responsibilities: [
				'Develop responsive, performant mobile apps for Android & iOS using the Flutter framework',
				'Collaborate with the design team to implement user interfaces with a focus on usability',
				'Integrate third-party APIs and services into mobile applications',
				'Debug and optimize mobile applications to ensure high performance and responsiveness',
				'Collaborate with cross-functional teams to define, design, and ship new features',
				'Stay updated with the latest trends and technologies in mobile development and Flutter',
				'Write clean, maintainable, and efficient code. Troubleshoot, debug, and fix issues',
				'Work closely with QA teams to identify and fix bugs and improve application performance',
				'Participate in code and design reviews to maintain code quality standards'
			],
			skills: ['Flutter', 'Dart', 'Android', 'iOS', 'REST APIs', 'Firebase', 'State Management']
		},
		{
			title: 'MERN Stack Developer',
			exp: '3+ Years',
			type: 'Full Time ',
			short:
				'Build modern, scalable full-stack web applications using MongoDB, Express, React & Node.js.',
			responsibilities: [
				'Develop robust, scalable web applications using modern full-stack frameworks',
				'Collaborate with UI/UX designers, product managers, and backend engineers',
				'Write clean, maintainable, and efficient code across frontend and backend',
				'Integrate APIs and third-party services',
				'Participate in code reviews, unit testing, and CI/CD processes',
				'Troubleshoot and debug applications across the full stack',
				'Optimize applications for speed, responsiveness, and scalability'
			],
			skills: [
				'React.js',
				'Node.js',
				'Express.js',
				'MongoDB',
				'TypeScript',
				'REST APIs',
				'JWT / OAuth',
				'Tailwind CSS',
				'Git',
				'AWS / Vercel'
			]
		},
		{
			title: 'Business Development Executive (BDE)',
			exp: 'Experienced',
			type: 'Full Time',
			short:
				'Drive sales growth, build strong client relationships, and identify new business opportunities.',
			responsibilities: [
				'Identify and develop new business opportunities and strategic partnerships',
				'Generate leads through market research, networking, and cold/warm outreach',
				'Build and maintain long-term relationships with clients and stakeholders',
				'Understand client requirements and propose suitable solutions',
				'Prepare proposals, presentations, and business pitches',
				'Negotiate contracts and close deals to achieve revenue targets',
				'Collaborate with internal teams to ensure smooth project delivery',
				'Track sales performance and prepare regular reports',
				'Analyze market trends, competitors, and customer feedback'
			],
			skills: [
				'Business Development',
				'Lead Generation',
				'Negotiation',
				'Client Relationship Management',
				'Market Research',
				'Presentation Skills',
				'CRM Tools'
			]
		},
		{
			title: 'Digital Marketing Executive',
			exp: 'Relevant Experience',
			type: 'Full Time',
			short: 'Execute digital marketing campaigns, content creation, SEO, email marketing & ASO.',
			responsibilities: [
				'Develop and implement digital marketing campaigns across social media & Google Ads',
				'Create engaging content for website and social media channels',
				'Support SEO strategies through keyword research and on-page optimization',
				'Manage email marketing campaigns and subscriber lists',
				'Monitor and analyze digital marketing metrics and prepare performance reports',
				'Collaborate with team members to refine marketing strategies',
				'Stay updated with the latest trends and tools in digital marketing',
				'Perform App Store Optimization (ASO) for mobile apps'
			],
			skills: [
				'Social Media Marketing',
				'Google Ads',
				'SEO / ASO',
				'Content Creation',
				'Email Marketing',
				'Google Analytics',
				'Meta Business Suite',
				'Copywriting'
			]
		}
	];
</script>

<main id="careers-page" class="page-content pb-20 pt-10 md:pt-20">
	<section class="py-16 md:py-20">
		<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
			<!-- Header -->
			<div class="mb-16 text-center">
				<h2 class="mb-5 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
					Join Our Team & Build Your Future With Us
				</h2>
				<p class="mx-auto max-w-3xl text-lg text-slate-600">
					We’re looking for passionate, talented people who want to grow with us. If you're excited
					about challenging projects and a supportive environment, explore our open roles below.
				</p>
			</div>

			<!-- Job Cards -->
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:gap-8">
				{#each jobs as job}
					<div
						class="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200/70 hover:shadow-lg"
					>
						<!-- Title & Meta -->
						<div class="mb-4">
							<h3
								class="text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-700 md:text-2xl"
							>
								{job.title}
							</h3>
							<div class="mt-2 flex flex-wrap items-center gap-3 text-sm">
								<span class="font-medium text-blue-600">{job.exp}</span>
								<span class="text-gray-400">•</span>
								<span class="text-gray-600">{job.type}</span>
							</div>
						</div>

						<!-- Short description -->
						<p class="mb-6 leading-relaxed text-gray-600">
							{job.short}
						</p>

						<!-- Responsibilities -->
						<div class="mb-7">
							<h4 class="mb-4 flex items-center gap-2.5 text-lg font-semibold text-gray-800">
								<span class="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
								Key Responsibilities
							</h4>
							<ul class="space-y-2.5 text-[15px] text-gray-700">
								{#each job.responsibilities as item}
									<li class="flex items-start gap-3 leading-relaxed">
										<span class="mt-1.5 flex-shrink-0 text-blue-500">•</span>
										<span>{item}</span>
									</li>
								{/each}
							</ul>
						</div>

						<!-- Skills -->
						<div class="mb-6">
							<h4 class="mb-4 flex items-center gap-2.5 text-lg font-semibold text-gray-800">
								<span class="h-2.5 w-2.5 rounded-full bg-indigo-500"></span>
								Required Skills
							</h4>
							<div class="flex flex-wrap gap-2.5">
								{#each job.skills as skill}
									<span
										class="inline-flex items-center rounded-full bg-indigo-50 px-3.5 py-1.5 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200/60 transition-colors hover:bg-indigo-100"
									>
										{skill}
									</span>
								{/each}
							</div>
						</div>

						<div class="mt-auto">
							<button
								on:click={() => applyForRole(job.title)}
								class="w-full rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
							>
								Apply for this Role
							</button>
						</div>
					</div>
				{/each}
			</div>

			<!-- Why Join Us + Apply Form -->
			<div
				id="apply-form-section"
				class="relative mt-20 scroll-mt-20 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-2xl md:p-12"
			>
				<div class="relative z-10 grid items-center gap-12 lg:grid-cols-2">
					<div>
						<h3 class="mb-8 text-3xl font-bold md:text-4xl">Why Join Us?</h3>
						<ul class="space-y-5 text-lg">
							<li class="flex items-start">
								<Star class="mr-4 mt-1 h-6 w-6 flex-shrink-0 text-blue-400" />
								<span>Growth-oriented & supportive culture</span>
							</li>
							<li class="flex items-start">
								<Star class="mr-4 mt-1 h-6 w-6 flex-shrink-0 text-blue-400" />
								<span>Work on real-world, global-scale projects</span>
							</li>
							<li class="flex items-start">
								<Star class="mr-4 mt-1 h-6 w-6 flex-shrink-0 text-blue-400" />
								<span>Continuous learning & skill development</span>
							</li>
							<li class="flex items-start">
								<Star class="mr-4 mt-1 h-6 w-6 flex-shrink-0 text-blue-400" />
								<span>Collaborative, friendly team environment</span>
							</li>
						</ul>
					</div>

					<div class="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg md:p-10">
						<h4 class="mb-6 text-center text-2xl font-bold md:text-3xl">Apply Now</h4>

						{#if $submitStatus.message}
							<div
								class="mb-6 rounded-xl p-4 {$submitStatus.type === 'success'
									? 'bg-green-600/30 text-green-100'
									: 'bg-red-600/30 text-red-100'}"
							>
								{$submitStatus.message}
							</div>
						{/if}

						<form on:submit|preventDefault={handleSubmit} class="space-y-5">
							<div>
								<label for="role" class="mb-2 block text-sm font-medium text-slate-200">
									Select Role *
								</label>
								<select
									id="role"
									bind:value={formData.role}
									required
									class="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
								>
									<option value="" disabled>Choose a position</option>
									{#each jobs as job}
										<option value={job.title}>{job.title}</option>
									{/each}
								</select>
							</div>

							<div>
								<label for="name" class="mb-2 block text-sm font-medium text-slate-200">
									Full Name *
								</label>
								<input
									id="name"
									type="text"
									bind:value={formData.name}
									required
									placeholder="Enter your full name"
									class="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
								/>
							</div>

							<div>
								<label for="email" class="mb-2 block text-sm font-medium text-slate-200">
									Email Address *
								</label>
								<input
									id="email"
									type="email"
									bind:value={formData.email}
									required
									placeholder="your.email@example.com"
									class="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
								/>
							</div>

							<div>
								<label for="cv" class="mb-2 block text-sm font-medium text-slate-200">
									Upload CV * (PDF, DOC, DOCX – Max 5MB)
								</label>
								<input
									id="cv"
									type="file"
									on:change={handleFileChange}
									accept=".pdf,.doc,.docx"
									required
									class="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-5 file:py-2.5 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
								/>
							</div>

							<button
								type="submit"
								disabled={$isSubmitting}
								class="w-full rounded-full bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
							>
								{$isSubmitting ? 'Submitting...' : 'Submit Application'}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<style>
	.group:hover {
		background: linear-gradient(to bottom right, white, rgb(249 250 251 / 0.6));
	}
</style>
