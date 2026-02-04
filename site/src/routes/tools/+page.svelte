<script>
	import { onMount } from 'svelte';

	// State variables
	let showWelcome = true;
	let isGeneratingPDF = false;

	let classic = true;

	// Form data
	let formData = {
		speaker: 'Merin Paramanantham',
		date: '2024-05-21',
		businessName: 'All Loan Credit',
		profession: 'Financial Service',
		doorStreet: '10/35 Kanimadam',
		area: 'anjugramam post',
		city: 'Kanyakumari',
		state: 'Tamil Nadu',
		country: 'India',
		yearsInBusiness: 8,
		previousJobs: 'CNC',
		spouse: 'Sujatha jini',
		children: 'MS shiona',
		animals: '----',
		hobbies: 'Playing cricket and kabadi',
		activities: 'Two Wheeler Long Drive',
		howLong: '40 Years',
		burningDesire: 'Process High value loans (above 10 crores)',
		secretThing: 'District level player in Kabadi',
		successKey: 'decision making , understanding the requirement, punctuality'
	};

	// Countries list
	let countries = [
		'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia',
		'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium',
		'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei',
		'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic',
		'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus',
		'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador',
		'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
		'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
		'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
		'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
		'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar',
		'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia',
		'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal',
		'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan',
		'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar',
		'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
		'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia',
		'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden',
		'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago',
		'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
		'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
	];

	let filteredCountries = countries;
	let showCountryDropdown = false;
	let countrySearchInput = '';

	function filterCountries(event) {
		countrySearchInput = event.target.value;
		const value = event.target.value.toLowerCase();
		if (value.length === 0) {
			filteredCountries = countries;
			showCountryDropdown = false;
		} else {
			filteredCountries = countries.filter(c => c.toLowerCase().includes(value));
			showCountryDropdown = true;
		}
	}

	function selectCountry(country) {
		formData.country = country;
		countrySearchInput = country;
		showCountryDropdown = false;
		filteredCountries = countries;
	}

	function toggleCountryDropdown() {
		showCountryDropdown = !showCountryDropdown;
		if (showCountryDropdown) {
			filteredCountries = countries;
		}
	}

	let previewElement;
	let html2canvasLoaded = false;
	let jsPdfLoaded = false;

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
		if (!previewElement || !html2canvasLoaded || !jsPdfLoaded) {
			alert('Libraries not loaded yet. Please wait a moment and try again.');
			return;
		}

		isGeneratingPDF = true;

		try {
			const filename = `BNI_Bio_Sheet_${formData.speaker.replace(/\s+/g, '_')}.pdf`;

			// Use jsPDF to create a properly formatted single-page PDF
			const jsPDF = window.jspdf.jsPDF;
			const pdf = new jsPDF({
				orientation: 'portrait',
				unit: 'mm',
				format: 'a4',
				compress: true
			});

			// Get canvas from html2canvas with optimized settings
			const canvas = await window.html2canvas(previewElement, {
				scale: 2,
				useCORS: true,
				backgroundColor: '#ffffff',
				logging: false,
				allowTaint: true,
				windowHeight: previewElement.scrollHeight,
				windowWidth: previewElement.scrollWidth,
				ignoreElements: (element) => {
					// Ignore buttons and other non-printable elements
					return element.tagName === 'BUTTON' || element.classList?.contains('no-print');
				}
			});

			// A4 dimensions in mm (with margins)
			const a4Width = 210;
			const a4Height = 297;
			const margin = 5; // 5mm margins
			const contentWidth = a4Width - 2 * margin;

			// Calculate height to fit on one page
			const imgData = canvas.toDataURL('image/jpeg', 0.95);
			const imgHeight = (canvas.height * contentWidth) / canvas.width;

			// Scale down if content exceeds one page
			let finalHeight = imgHeight;
			let finalWidth = contentWidth;

			if (imgHeight > a4Height - 2 * margin) {
				// Scale proportionally to fit one page
				const scaleFactor = (a4Height - 2 * margin) / imgHeight;
				finalHeight = imgHeight * scaleFactor;
				finalWidth = contentWidth * scaleFactor;
			}

			// Add image centered on page
			const xPosition = margin + (contentWidth - finalWidth) / 2;
			const yPosition = margin;

			pdf.addImage(imgData, 'JPEG', xPosition, yPosition, finalWidth, finalHeight);

			// Save the PDF
			pdf.save(filename);
			isGeneratingPDF = false;
		} catch (error) {
			console.error('PDF Generation Error:', error);
			alert('Error generating PDF: ' + error.message);
			isGeneratingPDF = false;
		}
	}

	onMount(() => {
		// Load html2canvas library
		const html2canvasScript = document.createElement('script');
		html2canvasScript.src =
			'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
		html2canvasScript.onload = () => {
			html2canvasLoaded = true;
			console.log('html2canvas loaded successfully');
		};
		html2canvasScript.onerror = () => {
			console.error('Failed to load html2canvas library');
		};
		document.head.appendChild(html2canvasScript);

		// Load jsPDF library
		const jsPdfScript = document.createElement('script');
		jsPdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
		jsPdfScript.onload = () => {
			jsPdfLoaded = true;
			console.log('jsPDF loaded successfully');
		};
		jsPdfScript.onerror = () => {
			console.error('Failed to load jsPDF library');
		};
		document.head.appendChild(jsPdfScript);

		// Preload fonts
		if (document.fonts) {
			document.fonts.ready.then(() => {
				console.log('Fonts loaded');
			});
		}
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

				<div class="section-title" style="margin-top: 28px; font-size: 1.2rem;">Location Details</div>

				<div class="form-group">
					<label for="doorStreet">Door No / Street:</label>
					<input type="text" id="doorStreet" bind:value={formData.doorStreet} placeholder="e.g., 10/35 Kanimadam" />
				</div>

				<div class="form-group">
					<label for="area">Area:</label>
					<input type="text" id="area" bind:value={formData.area} placeholder="e.g., anjugramam post" />
				</div>

				<div class="row">
					<div class="form-group">
						<label for="city">City:</label>
						<input type="text" id="city" bind:value={formData.city} placeholder="e.g., Kanyakumari" />
					</div>
					<div class="form-group">
						<label for="state">State / Province:</label>
						<input type="text" id="state" bind:value={formData.state} placeholder="e.g., Tamil Nadu" />
					</div>
				</div>

				<div class="form-group">
					<label for="country">Country:</label>
					<div class="country-search-wrapper">
						<div class="country-input-container">
							<input
								type="text"
								id="country"
								bind:value={countrySearchInput}
								on:input={filterCountries}
								on:focus={toggleCountryDropdown}
								placeholder="Search or select country..."
								autocomplete="off"
							/>
							<span class="search-icon">🔍</span>
						</div>
						{#if showCountryDropdown && filteredCountries.length > 0}
							<div class="country-dropdown">
								{#each filteredCountries as country (country)}
									<div 
										class="country-option"
										on:click={() => selectCountry(country)}
										role="button"
										tabindex="0"
										on:keydown={(e) => e.key === 'Enter' && selectCountry(country)}
									>
										{country}
									</div>
								{/each}
							</div>
						{/if}
					</div>
				</div>

				<div class="form-group">
					<label for="yearsInBusiness">Years in Business:</label>
					<input type="number" id="yearsInBusiness" bind:value={formData.yearsInBusiness} />
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
						<label for="howLong">How Long (in area):</label>
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

				<div style="display: flex; gap: 10px;">
					<button
						type="button"
						class="download-btn"
						on:click={() => {
							classic = true;
						}}
					>
						Classic View
					</button>

					<button
						type="button"
						class="download-btn"
						on:click={() => {
							classic = false;
						}}
					>
						Modern View
					</button>
				</div>

				<button
					type="button"
					class="download-btn"
					on:click={downloadPDF}
					disabled={isGeneratingPDF || !html2canvasLoaded || !jsPdfLoaded}
				>
					{#if !html2canvasLoaded || !jsPdfLoaded}
						⏳ Loading PDF Libraries...
					{:else if isGeneratingPDF}
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

			{#if classic}
				<div class="preview-wrapper">
					<div class="classic-container" bind:this={previewElement}>
						<div class="classic-header">
							<h2>BNI Member Bio Sheet</h2>
						</div>

						<div class="classic-top">
							<div>
								Our <u>Speaker</u>: <strong>{formData.speaker}</strong>
							</div>
							<div style="text-align: right;">
								Date: <u>{formatDate(formData.date)}</u>
							</div>
						</div>

						<div class="classic-section-header">Business Information</div>
						<div class="classic-row">
							<span>Business Name:</span>
							<span class="classic-underline">{formData.businessName}</span>
						</div>
						<div class="classic-row">
							<span>Profession:</span>
							<span class="classic-underline">{formData.profession}</span>
						</div>

						<div class="classic-section-header">Location</div>
						<div class="classic-row">
							<span>Door No / Street:</span>
							<span class="classic-underline">{formData.doorStreet}</span>
						</div>
						<div class="classic-row">
							<span>Area:</span>
							<span class="classic-underline">{formData.area}</span>
						</div>
						<div class="classic-row-double">
							<div>
								<span>City:</span>
								<span class="classic-underline">{formData.city}</span>
							</div>
							<div>
								<span>State:</span>
								<span class="classic-underline">{formData.state}</span>
							</div>
						</div>
						<div class="classic-row">
							<span>Country:</span>
							<span class="classic-underline">{formData.country}</span>
						</div>

						<div class="classic-row">
							<span>Years in Business:</span>
							<span class="classic-underline">{formData.yearsInBusiness}</span>
						</div>
						<div class="classic-row">
							<span>Previous Types of Jobs:</span>
							<span class="classic-underline">{formData.previousJobs}</span>
						</div>

						<div class="classic-section-header">Personal Information</div>
						<div class="classic-row">
							<span>Family Information:</span>
						</div>
						<div class="classic-row classic-indent">
							<span>A. Spouse:</span>
							<span class="classic-underline">{formData.spouse}</span>
						</div>
						<div class="classic-row classic-indent">
							<span>B. Children:</span>
							<span class="classic-underline">{formData.children}</span>
						</div>
						<div class="classic-row classic-indent">
							<span>C. Animals:</span>
							<span class="classic-underline">{formData.animals}</span>
						</div>
						<div class="classic-row">
							<span>Hobbies:</span>
							<span class="classic-underline">{formData.hobbies}</span>
						</div>
						<div class="classic-row">
							<span>Activities of Interest:</span>
							<span class="classic-underline">{formData.activities}</span>
						</div>
						<div class="classic-row">
							<span>How Long?</span>
							<span class="classic-underline">{formData.howLong}</span>
						</div>

						<div class="classic-section-header">Miscellaneous</div>
						<div class="classic-row">
							<span>My burning desire is to . . .</span>
							<span class="classic-underline">{formData.burningDesire}</span>
						</div>
						<div class="classic-row">
							<span>Something no one knows about me is:</span>
							<span class="classic-underline">{formData.secretThing}</span>
						</div>
						<div class="classic-row">
							<span>My key to success is . . .</span>
							<span class="classic-underline">{formData.successKey}</span>
						</div>
					</div>
				</div>
			{:else}
				<div class="preview-wrapper">
					<div class="preview-container" bind:this={previewElement}>
						<div class="preview-header">
							<h2>BNI Member Bio Sheet</h2>
						</div>

						<div class="preview-top">
							<div><strong>Our Speakers:</strong> {formData.speaker}</div>
							<div><strong>Date:</strong> {formatDate(formData.date)}</div>
						</div>

						<div class="preview-section-header">Business Information</div>
						<div class="preview-field"><strong>Business Name:</strong> {formData.businessName}</div>
						<div class="preview-field"><strong>Profession:</strong> {formData.profession}</div>

						<div class="preview-section-header">Location</div>
						<div class="preview-field"><strong>Door No / Street:</strong> {formData.doorStreet}</div>
						<div class="preview-field"><strong>Area:</strong> {formData.area}</div>
						<div class="preview-field"><strong>City:</strong> {formData.city}</div>
						<div class="preview-field"><strong>State:</strong> {formData.state}</div>
						<div class="preview-field"><strong>Country:</strong> {formData.country}</div>

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
							<strong>How Long?</strong>
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
			{/if}
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

	/* Country Dropdown Styles */
	.country-search-wrapper {
		position: relative;
		width: 100%;
	}

	.country-input-container {
		position: relative;
		width: 100%;
	}

	.country-input-container input {
		width: 100%;
		padding: 14px 40px 14px 16px;
		border: 2px solid #e5e5e5;
		border-radius: 10px;
		font-family: 'DM Sans', sans-serif;
		font-size: 0.95rem;
		transition: all 0.3s ease;
		background: var(--white);
		color: var(--text-dark);
	}

	.country-input-container input:focus {
		outline: none;
		border-color: var(--accent-gold);
		box-shadow: 0 0 0 4px rgba(212, 165, 116, 0.1);
		transform: translateY(-1px);
	}

	.search-icon {
		position: absolute;
		right: 14px;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		font-size: 0.9rem;
		opacity: 0.5;
	}

	.country-dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: var(--white);
		border: 2px solid var(--accent-gold);
		border-top: none;
		border-radius: 0 0 10px 10px;
		max-height: 300px;
		overflow-y: auto;
		z-index: 1000;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.country-option {
		padding: 12px 16px;
		cursor: pointer;
		transition: all 0.2s ease;
		border-bottom: 1px solid #f0f0f0;
		font-size: 0.95rem;
		color: var(--text-dark);
	}

	.country-option:hover {
		background-color: var(--bg-light);
		padding-left: 20px;
		font-weight: 500;
	}

	.country-option:last-child {
		border-bottom: none;
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

	.preview-wrapper {
		background: #ffffff;
		padding: 0;
		border-radius: 8px;
		overflow: hidden;
	}

	/* CLASSIC DESIGN STYLES - OPTIMIZED FOR SINGLE PAGE */
	.classic-container {
		background: #ffffff;
		padding: 20px;
		width: 100%;
		margin: 0;
		border: 2px solid #000000;
		font-family: Arial, sans-serif;
		font-size: 11px;
		line-height: 1.4;
	}

	.classic-header {
		text-align: center;
		border: 2px solid #000000;
		padding: 10px;
		margin-bottom: 12px;
		background: #ffffff;
	}

	.classic-header h2 {
		font-family: Arial, sans-serif;
		font-size: 18px;
		font-weight: bold;
		color: #000000;
		margin: 0;
		padding: 0;
		letter-spacing: 0px;
	}

	.classic-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
		font-size: 11px;
		color: #000000;
		padding: 0 8px;
	}

	.classic-top u {
		text-decoration: underline;
	}

	.classic-top strong {
		font-weight: bold;
	}

	.classic-section-header {
		background: #000000;
		color: #ffffff;
		padding: 6px 8px;
		font-family: Arial, sans-serif;
		font-size: 11px;
		font-weight: bold;
		margin: 10px 0 8px;
	}

	.classic-row {
		margin-bottom: 6px;
		font-size: 11px;
		line-height: 1.4;
		color: #000000;
		padding: 0 8px;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.classic-row span {
		display: inline;
	}

	.classic-row-double {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		margin-bottom: 6px;
		padding: 0 8px;
	}

	.classic-row-double div {
		display: flex;
		gap: 6px;
		font-size: 11px;
		line-height: 1.4;
		color: #000000;
		flex-wrap: wrap;
	}

	.classic-row-double span {
		display: inline;
	}

	.classic-underline {
		border-bottom: 1px solid #000000;
		padding-bottom: 1px;
		display: inline-block;
		min-width: 80px;
		text-decoration: underline;
	}

	.classic-indent {
		padding-left: 30px;
	}

	/* MODERN DESIGN STYLES - OPTIMIZED FOR SINGLE PAGE */
	.preview-container {
		background: #ffffff;
		padding: 25px;
		width: 100%;
		margin: 0;
		border: 2px solid var(--primary-dark);
	}

	.preview-header {
		text-align: center;
		border: 3px solid var(--primary-dark);
		padding: 12px;
		margin-bottom: 16px;
		background: #ffffff;
	}

	.preview-header h2 {
		font-family: 'Crimson Pro', serif;
		font-size: 1.6rem;
		font-weight: 700;
		color: var(--primary-dark);
		letter-spacing: 1px;
		margin: 0;
		padding: 0;
	}

	.preview-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 14px;
		font-size: 0.85rem;
		color: var(--text-dark);
		padding: 0 8px;
	}

	.preview-section-header {
		background: var(--primary-dark);
		color: var(--white);
		padding: 8px 12px;
		font-family: 'Crimson Pro', serif;
		font-size: 1rem;
		font-weight: 700;
		margin: 12px 0 8px;
	}

	.preview-field {
		margin-bottom: 6px;
		font-size: 0.85rem;
		line-height: 1.5;
		color: var(--text-dark);
		padding: 0 8px;
	}

	.preview-field strong {
		font-weight: 600;
		color: var(--primary-dark);
	}

	.preview-indent {
		padding-left: 35px;
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

		.classic-row-double {
			grid-template-columns: 1fr;
		}

		.country-dropdown {
			max-height: 250px;
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

		.country-dropdown {
			max-height: 200px;
		}
	}
</style>