<script>
	import { onMount } from 'svelte';

	// State variables
	let showWelcome = true;
	let isGeneratingPDF = false;

	// Form data
	let formData = {
		speaker: 'Merin Paramanantham',
		date: '2024-05-21',
		businessName: 'All Loan Credit',
		profession: 'Financial Service',
		location: '10/35 Kanimadam, anjugramam post, Kanyakumari',
		yearsInBusiness: 8,
		previousJobs: 'CNC',
		spouse: 'Sujatha jini',
		children: 'MS shiona',
		animals: '----',
		hobbies: 'Playing cricket and kabadi',
		activities: 'Two Wheeler Long Drive',
		city: 'Kanyakumari',
		howLong: '40 Years',
		burningDesire: 'Process High value loans (above 10 crores)',
		secretThing: 'District level player in Kabadi',
		successKey: 'decision making , understanding the requirement, punctuality'
	};

	let previewElement;

	function startBuilder() {
		showWelcome = false;
		setTimeout(() => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}, 100);
	}

	function formatDate(dateString) {
		const date = new Date(dateString);
		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];
		const day = date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear().toString().substr(-2);
		return `${day}-${month}-${year}`;
	}

	async function downloadPDF() {
		if (!previewElement) return;

		isGeneratingPDF = true;
		const filename = `BNI_Bio_Sheet_${formData.speaker.replace(/\s+/g, '_')}.pdf`;

		const pdfWidth = 180;
		const pdfHeight = 270;

		const opt = {
			margin: [10, 10, 10, 10],
			filename: filename,
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: {
				scale: 2,
				useCORS: true,
				letterRendering: true,
				logging: false
			},
			jsPDF: {
				unit: 'mm',
				format: [pdfWidth, pdfHeight],
				orientation: 'portrait',
				compress: true
			},
			pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
		};

		try {
			await window.html2pdf().set(opt).from(previewElement).save();
			setTimeout(() => {
				isGeneratingPDF = false;
			}, 2000);
		} catch (error) {
			console.error('PDF generation error:', error);
			isGeneratingPDF = false;
		}
	}

	onMount(() => {
		// Load html2pdf library
		const script = document.createElement('script');
		script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
		document.head.appendChild(script);
	});
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{#if showWelcome}
	<div class="welcome-screen">
		<div class="welcome-content">
			<div class="welcome-icon">
				<svg
					width="80"
					height="80"
					viewBox="0 0 80 80"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect
						x="10"
						y="15"
						width="60"
						height="50"
						rx="4"
						stroke="#d4a574"
						stroke-width="3"
						fill="none"
					/>
					<line
						x1="20"
						y1="28"
						x2="50"
						y2="28"
						stroke="#1a1a2e"
						stroke-width="2.5"
						stroke-linecap="round"
					/>
					<line
						x1="20"
						y1="38"
						x2="60"
						y2="38"
						stroke="#1a1a2e"
						stroke-width="2"
						stroke-linecap="round"
					/>
					<line
						x1="20"
						y1="45"
						x2="55"
						y2="45"
						stroke="#1a1a2e"
						stroke-width="2"
						stroke-linecap="round"
					/>
					<line
						x1="20"
						y1="52"
						x2="48"
						y2="52"
						stroke="#1a1a2e"
						stroke-width="2"
						stroke-linecap="round"
					/>
					<circle cx="65" cy="20" r="8" fill="#d4a574" />
					<path
						d="M62 20L64 22L68 18"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<h1 class="welcome-title">Welcome to BNI Member Bio Builder</h1>
			<p class="welcome-description">
				Create your professional BNI member bio sheet in minutes. Fill in your details, preview in
				real-time, and download as PDF.
			</p>

			<button class="start-btn" on:click={startBuilder}>
				<span>Start Building Your Bio Sheet</span>
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M7.5 5L12.5 10L7.5 15"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>

			<div class="powered-by">
				<span>Powered by</span>
				<strong>Wenoxo</strong>
			</div>

			<div class="features-grid">
				<div class="feature-item">
					<div class="feature-icon">✏️</div>
					<h3>Easy Editing</h3>
					<p>Simple form interface</p>
				</div>
				<div class="feature-item">
					<div class="feature-icon">👁️</div>
					<h3>Live Preview</h3>
					<p>See changes instantly</p>
				</div>
				<div class="feature-item">
					<div class="feature-icon">📄</div>
					<h3>PDF Export</h3>
					<p>Professional output</p>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="container">
		<!-- Form Section -->
		<div class="form-section">
			<h1>BNI Member Bio Sheet</h1>
			<p class="subtitle">Fill in your details to generate your bio sheet</p>

			<form id="bioForm">
				<div class="form-group">
					<label for="speaker">Our Speaker:</label>
					<input type="text" id="speaker" bind:value={formData.speaker} />
				</div>

				<div class="form-group">
					<label for="date">Date:</label>
					<input type="date" id="date" bind:value={formData.date} />
				</div>

				<div class="section-title">Business Information</div>

				<div class="form-group">
					<label for="businessName">Business Name:</label>
					<input type="text" id="businessName" bind:value={formData.businessName} />
				</div>

				<div class="form-group">
					<label for="profession">Profession:</label>
					<input type="text" id="profession" bind:value={formData.profession} />
				</div>

				<div class="row">
					<div class="form-group">
						<label for="location">Location:</label>
						<input type="text" id="location" bind:value={formData.location} />
					</div>
					<div class="form-group">
						<label for="yearsInBusiness">Years in Business:</label>
						<input type="number" id="yearsInBusiness" bind:value={formData.yearsInBusiness} />
					</div>
				</div>

				<div class="form-group">
					<label for="previousJobs">Previous Types of Jobs:</label>
					<input type="text" id="previousJobs" bind:value={formData.previousJobs} />
				</div>

				<div class="section-title">Personal Information</div>

				<div class="form-group">
					<label for="spouse">Spouse:</label>
					<input type="text" id="spouse" bind:value={formData.spouse} />
				</div>

				<div class="form-group">
					<label for="children">Children:</label>
					<input type="text" id="children" bind:value={formData.children} />
				</div>

				<div class="form-group">
					<label for="animals">Animals:</label>
					<input type="text" id="animals" bind:value={formData.animals} />
				</div>

				<div class="form-group">
					<label for="hobbies">Hobbies:</label>
					<input type="text" id="hobbies" bind:value={formData.hobbies} />
				</div>

				<div class="form-group">
					<label for="activities">Activities of Interest:</label>
					<input type="text" id="activities" bind:value={formData.activities} />
				</div>

				<div class="row">
					<div class="form-group">
						<label for="city">City of Residence:</label>
						<input type="text" id="city" bind:value={formData.city} />
					</div>
					<div class="form-group">
						<label for="howLong">How Long:</label>
						<input type="text" id="howLong" bind:value={formData.howLong} />
					</div>
				</div>

				<div class="section-title">Miscellaneous</div>

				<div class="form-group">
					<label for="burningDesire">My burning desire is to:</label>
					<input type="text" id="burningDesire" bind:value={formData.burningDesire} />
				</div>

				<div class="form-group">
					<label for="secretThing">Something no one knows about me is:</label>
					<input type="text" id="secretThing" bind:value={formData.secretThing} />
				</div>

				<div class="form-group">
					<label for="successKey">My key to success is:</label>
					<textarea id="successKey" bind:value={formData.successKey}></textarea>
				</div>

				<button
					type="button"
					class="download-btn"
					on:click={downloadPDF}
					disabled={isGeneratingPDF}
				>
					{#if isGeneratingPDF}
						⏳ Generating PDF...
					{:else}
						📄 Download as PDF
					{/if}
				</button>
			</form>
		</div>

		<!-- Preview Section -->
		<div class="preview-section">
			<h2 class="preview-title">📄 Live Preview</h2>
			<div class="preview-container" bind:this={previewElement}>
				<div class="preview-header">
					<h2>BNI Member Bio Sheet</h2>
				</div>

				<div class="preview-top">
					<div><strong>Our Speaker:</strong> {formData.speaker}</div>
					<div><strong>Date:</strong> {formatDate(formData.date)}</div>
				</div>

				<div class="preview-section-header">Business Information</div>
				<div class="preview-field"><strong>Business Name:</strong> {formData.businessName}</div>
				<div class="preview-field"><strong>Profession:</strong> {formData.profession}</div>
				<div class="preview-field"><strong>Location:</strong> {formData.location}</div>
				<div class="preview-field">
					<strong>Years in Business:</strong>
					{formData.yearsInBusiness}
				</div>
				<div class="preview-field">
					<strong>Previous Types of Jobs:</strong>
					{formData.previousJobs}
				</div>

				<div class="preview-section-header">Personal Information</div>
				<div class="preview-field">Family Information:</div>
				<div class="preview-field preview-indent">A. Spouse: {formData.spouse}</div>
				<div class="preview-field preview-indent">B. Children: {formData.children}</div>
				<div class="preview-field preview-indent">C. Animals: {formData.animals}</div>
				<div class="preview-field"><strong>Hobbies:</strong> {formData.hobbies}</div>
				<div class="preview-field">
					<strong>Activities of Interest:</strong>
					{formData.activities}
				</div>
				<div class="preview-field">
					<strong>City of Residence:</strong>
					{formData.city} &nbsp;&nbsp;&nbsp; <strong>How Long?</strong>
					{formData.howLong}
				</div>

				<div class="preview-section-header">Miscellaneous</div>
				<div class="preview-field">
					<strong>My burning desire is to:</strong>
					{formData.burningDesire}
				</div>
				<div class="preview-field">
					<strong>Something no one knows about me is:</strong>
					{formData.secretThing}
				</div>
				<div class="preview-field">
					<strong>My key to success is:</strong>
					{formData.successKey}
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(:root) {
		--primary-dark: #1a1a2e;
		--accent-gold: #d4a574;
		--accent-gold-dark: #b8895d;
		--bg-light: #f8f7f4;
		--border-color: #2a2a3e;
		--text-dark: #1a1a2e;
		--text-medium: #4a4a5e;
		--white: #ffffff;
	}

	:global(body) {
		font-family: 'DM Sans', sans-serif;
		background: linear-gradient(135deg, #f8f7f4 0%, #ede9e3 100%);
		min-height: 100vh;
		padding: 40px 20px;
	}

	.welcome-screen {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40px 20px;
		animation: fadeIn 0.8s ease-out;
	}

	.welcome-content {
		max-width: 700px;
		text-align: center;
		background: var(--white);
		padding: 60px 50px;
		border-radius: 20px;
		box-shadow: 0 20px 60px rgba(26, 26, 46, 0.12);
	}

	.welcome-icon {
		margin-bottom: 32px;
		animation: float 3s ease-in-out infinite;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.welcome-title {
		font-family: 'Crimson Pro', serif;
		font-size: 2.8rem;
		font-weight: 700;
		color: var(--primary-dark);
		margin-bottom: 20px;
		line-height: 1.2;
		letter-spacing: -0.5px;
	}

	.welcome-description {
		font-size: 1.15rem;
		color: var(--text-medium);
		line-height: 1.7;
		margin-bottom: 40px;
	}

	.start-btn {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		padding: 18px 40px;
		background: linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-dark) 100%);
		color: var(--white);
		border: none;
		border-radius: 12px;
		font-family: 'DM Sans', sans-serif;
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 8px 24px rgba(212, 165, 116, 0.3);
		margin-bottom: 32px;
	}

	.start-btn:hover {
		transform: translateY(-3px);
		box-shadow: 0 12px 32px rgba(212, 165, 116, 0.4);
	}

	.start-btn:active {
		transform: translateY(-1px);
	}

	.start-btn svg {
		transition: transform 0.3s ease;
	}

	.start-btn:hover svg {
		transform: translateX(4px);
	}

	.powered-by {
		font-size: 0.95rem;
		color: var(--text-medium);
		margin-bottom: 48px;
		padding-top: 24px;
		border-top: 1px solid #e5e5e5;
	}

	.powered-by strong {
		color: var(--accent-gold-dark);
		font-weight: 700;
		font-size: 1.1rem;
		margin-left: 6px;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 30px;
		margin-top: 40px;
	}

	.feature-item {
		text-align: center;
	}

	.feature-icon {
		font-size: 2.5rem;
		margin-bottom: 12px;
		animation: fadeInUp 0.6s ease-out;
		animation-fill-mode: backwards;
	}

	.feature-item:nth-child(1) .feature-icon {
		animation-delay: 0.2s;
	}
	.feature-item:nth-child(2) .feature-icon {
		animation-delay: 0.3s;
	}
	.feature-item:nth-child(3) .feature-icon {
		animation-delay: 0.4s;
	}

	.feature-item h3 {
		font-family: 'Crimson Pro', serif;
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--primary-dark);
		margin-bottom: 8px;
	}

	.feature-item p {
		font-size: 0.9rem;
		color: var(--text-medium);
	}

	.container {
		max-width: 900px;
		margin: 0 auto;
		animation: fadeIn 0.8s ease-out;
		padding: 70px 0px;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.form-section {
		background: var(--white);
		border-radius: 16px;
		box-shadow: 0 8px 32px rgba(26, 26, 46, 0.08);
		padding: 50px 60px;
		margin-bottom: 40px;
		animation: slideIn 0.6s ease-out;
	}

	.preview-section {
		background: var(--white);
		border-radius: 16px;
		box-shadow: 0 8px 32px rgba(26, 26, 46, 0.08);
		padding: 50px 60px;
		animation: slideIn 0.6s ease-out 0.2s backwards;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	h1 {
		font-family: 'Crimson Pro', serif;
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--primary-dark);
		margin-bottom: 12px;
		letter-spacing: -0.5px;
		text-align: center;
	}

	.subtitle {
		color: var(--text-medium);
		font-size: 1rem;
		margin-bottom: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.subtitle::before {
		content: '';
		width: 40px;
		height: 2px;
		background: var(--accent-gold);
	}

	.form-group {
		margin-bottom: 28px;
		animation: fadeInUp 0.5s ease-out;
		animation-fill-mode: backwards;
	}

	label {
		display: block;
		font-weight: 600;
		color: var(--primary-dark);
		margin-bottom: 8px;
		font-size: 0.95rem;
		letter-spacing: 0.2px;
	}

	input[type='text'],
	input[type='date'],
	input[type='number'],
	textarea {
		width: 100%;
		padding: 14px 16px;
		border: 2px solid #e5e5e5;
		border-radius: 10px;
		font-family: 'DM Sans', sans-serif;
		font-size: 0.95rem;
		transition: all 0.3s ease;
		background: var(--white);
		color: var(--text-dark);
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--accent-gold);
		box-shadow: 0 0 0 4px rgba(212, 165, 116, 0.1);
		transform: translateY(-1px);
	}

	textarea {
		resize: vertical;
		min-height: 80px;
	}

	.section-title {
		font-family: 'Crimson Pro', serif;
		font-size: 1.6rem;
		font-weight: 700;
		color: var(--primary-dark);
		margin: 32px 0 20px;
		padding-bottom: 12px;
		border-bottom: 3px solid var(--accent-gold);
		position: relative;
	}

	.section-title::after {
		content: '';
		position: absolute;
		bottom: -3px;
		left: 0;
		width: 60px;
		height: 3px;
		background: var(--primary-dark);
	}

	.row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}

	.download-btn {
		width: 100%;
		padding: 16px 32px;
		background: linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-dark) 100%);
		color: var(--white);
		border: none;
		border-radius: 12px;
		font-family: 'DM Sans', sans-serif;
		font-size: 1.05rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-top: 32px;
		box-shadow: 0 4px 16px rgba(212, 165, 116, 0.3);
	}

	.download-btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(212, 165, 116, 0.4);
	}

	.download-btn:active:not(:disabled) {
		transform: translateY(0);
	}

	.download-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.preview-container {
		border: 3px solid var(--primary-dark);
		padding: 40px;
		background: var(--white);
		border-radius: 8px;
	}

	.preview-header {
		text-align: center;
		border: 3px solid var(--primary-dark);
		padding: 20px;
		margin-bottom: 30px;
		background: linear-gradient(135deg, #f8f7f4 0%, #ffffff 100%);
	}

	.preview-header h2 {
		font-family: 'Crimson Pro', serif;
		font-size: 2rem;
		font-weight: 700;
		color: var(--primary-dark);
		letter-spacing: 1px;
	}

	.preview-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
		font-size: 0.95rem;
	}

	.preview-section-header {
		background: var(--primary-dark);
		color: var(--white);
		padding: 12px 20px;
		font-family: 'Crimson Pro', serif;
		font-size: 1.2rem;
		font-weight: 700;
		margin: 24px 0 16px;
	}

	.preview-field {
		margin-bottom: 12px;
		font-size: 0.9rem;
		line-height: 1.8;
	}

	.preview-field strong {
		font-weight: 600;
		color: var(--primary-dark);
	}

	.preview-indent {
		padding-left: 40px;
	}

	.preview-title {
		text-align: center;
		font-family: 'Crimson Pro', serif;
		font-size: 1.8rem;
		font-weight: 700;
		color: var(--primary-dark);
		margin-bottom: 32px;
		position: relative;
		padding-bottom: 16px;
	}

	.preview-title::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100px;
		height: 3px;
		background: var(--accent-gold);
	}

	@media (max-width: 768px) {
		.row {
			grid-template-columns: 1fr;
		}

		h1 {
			font-size: 2rem;
		}

		.form-section,
		.preview-section {
			padding: 30px 24px;
		}

		:global(body) {
			padding: 20px 16px;
		}

		.welcome-content {
			padding: 40px 30px;
		}

		.welcome-title {
			font-size: 2.2rem;
		}

		.welcome-description {
			font-size: 1rem;
		}

		.features-grid {
			grid-template-columns: 1fr;
			gap: 24px;
		}
	}

	@media (max-width: 480px) {
		h1 {
			font-size: 1.75rem;
		}

		.section-title {
			font-size: 1.3rem;
		}

		.form-section,
		.preview-section {
			padding: 24px 20px;
		}

		.welcome-content {
			padding: 32px 24px;
		}

		.welcome-title {
			font-size: 1.8rem;
		}

		.start-btn {
			padding: 16px 32px;
			font-size: 1rem;
		}

		.welcome-screen {
			padding: 20px 16px;
		}
	}
</style>
