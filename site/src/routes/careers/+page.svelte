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
</main>
