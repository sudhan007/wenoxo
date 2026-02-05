<script>
	import { onMount } from 'svelte';

	// State variables
	let showWelcome = true;
	let isGeneratingPDF = false;
	let showLoadingPopup = false;
	let loadingProgress = 0;

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
		previousJobs: [
			{ company: 'CNC', position: 'Manager', startYear: '1999', endYear: '2004' }
		],
		spouse: 'Sujatha jini',
		children: 'MS shiona',
		animals: '----',
		hobbies: ['Playing cricket', 'kabadi'],
		activities: ['Two Wheeler Long Drive'],
		howLong: '40 Years',
		burningDesire: 'Process High value loans (above 10 crores)',
		secretThing: 'District level player in Kabadi',
		successKey: 'decision making , understanding the requirement, punctuality',
		photo: null,
		companyLogo: null
	};

	// File preview URLs
	let photoPreview = null;
	let logoPreview = null;

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

	// Previous Jobs Management
	function addPreviousJob() {
		formData.previousJobs = [...formData.previousJobs, { company: '', position: '', startYear: '', endYear: '' }];
	}

	function removePreviousJob(index) {
		formData.previousJobs = formData.previousJobs.filter((_, i) => i !== index);
	}

	// Hobbies Management
	function addHobby() {
		formData.hobbies = [...formData.hobbies, ''];
	}

	function removeHobby(index) {
		formData.hobbies = formData.hobbies.filter((_, i) => i !== index);
	}

	// Activities Management
	function addActivity() {
		formData.activities = [...formData.activities, ''];
	}

	function removeActivity(index) {
		formData.activities = formData.activities.filter((_, i) => i !== index);
	}

	// File Upload Handlers
	function handlePhotoUpload(event) {
		const file = event.target.files[0];
		if (file) {
			formData.photo = file;
			const reader = new FileReader();
			reader.onload = (e) => {
				photoPreview = e.target.result;
			};
			reader.readAsDataURL(file);
		}
	}

	function handleLogoUpload(event) {
		const file = event.target.files[0];
		if (file) {
			formData.companyLogo = file;
			const reader = new FileReader();
			reader.onload = (e) => {
				logoPreview = e.target.result;
			};
			reader.readAsDataURL(file);
		}
	}

	function removePhoto() {
		formData.photo = null;
		photoPreview = null;
	}

	function removeLogo() {
		formData.companyLogo = null;
		logoPreview = null;
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

	function goBack() {
		showWelcome = true;
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

	function formatPreviousJobs() {
		return formData.previousJobs
			.filter(job => job.company && job.position)
			.map(job => `${job.position} at ${job.company} - ${job.startYear} - ${job.endYear}`)
			.join(', ');
	}

	// MongoDB API Call (replace with your actual endpoint)
	async function saveBioToDatabase(bioData) {
		try {
			const response = await fetch('YOUR_MONGODB_API_ENDPOINT', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(bioData)
			});

			if (!response.ok) {
				throw new Error('Failed to save to database');
			}

			const result = await response.json();
			console.log('Saved to database:', result);
			return result;
		} catch (error) {
			console.error('Database save error:', error);
			// Continue with download even if database save fails
		}
	}

	async function downloadPDF() {
		if (!previewElement || !html2canvasLoaded || !jsPdfLoaded) {
			alert('Libraries not loaded yet. Please wait a moment and try again.');
			return;
		}

		// Show loading popup
		showLoadingPopup = true;
		loadingProgress = 0;

		// Simulate loading progress
		const progressInterval = setInterval(() => {
			loadingProgress += 2;
			if (loadingProgress >= 100) {
				clearInterval(progressInterval);
			}
		}, 100);

		// Wait for 5 seconds
		await new Promise(resolve => setTimeout(resolve, 5000));

		try {
			// Prepare data for MongoDB
			const bioData = {
				...formData,
				previousJobsFormatted: formatPreviousJobs(),
				createdAt: new Date().toISOString()
			};

			// Save to MongoDB
			await saveBioToDatabase(bioData);

			// Generate PDF
			isGeneratingPDF = true;
			const filename = `BNI_Bio_Sheet_${formData.speaker.replace(/\s+/g, '_')}.pdf`;

			const jsPDF = window.jspdf.jsPDF;
			const pdf = new jsPDF({
				orientation: 'portrait',
				unit: 'mm',
				format: 'a4',
				compress: true
			});

			const canvas = await window.html2canvas(previewElement, {
				scale: 2,
				useCORS: true,
				backgroundColor: '#ffffff',
				logging: false,
				allowTaint: true,
				windowHeight: previewElement.scrollHeight,
				windowWidth: previewElement.scrollWidth,
				ignoreElements: (element) => {
					return element.tagName === 'BUTTON' || element.classList?.contains('no-print');
				}
			});

			const a4Width = 210;
			const a4Height = 297;
			const margin = 5;
			const contentWidth = a4Width - 2 * margin;

			const imgData = canvas.toDataURL('image/jpeg', 0.95);
			const imgHeight = (canvas.height * contentWidth) / canvas.width;

			let finalHeight = imgHeight;
			let finalWidth = contentWidth;

			if (imgHeight > a4Height - 2 * margin) {
				const scaleFactor = (a4Height - 2 * margin) / imgHeight;
				finalHeight = imgHeight * scaleFactor;
				finalWidth = contentWidth * scaleFactor;
			}

			const xPosition = margin + (contentWidth - finalWidth) / 2;
			const yPosition = margin;

			pdf.addImage(imgData, 'JPEG', xPosition, yPosition, finalWidth, finalHeight);
			pdf.save(filename);

			isGeneratingPDF = false;
			showLoadingPopup = false;
		} catch (error) {
			console.error('PDF Generation Error:', error);
			alert('Error generating PDF: ' + error.message);
			isGeneratingPDF = false;
			showLoadingPopup = false;
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

			<div class="flex items-center justify-center mb-5">
				<img width="150" height="150" src="/logo.webp" alt="Logo" />
			</div>

			<div class="features">
				<div class="feature-item">
					<span class="emoji">✏️</span>
					<div>
						<h3>Easy Editing</h3>
						<p>Simple form interface</p>
					</div>
				</div>

				<div class="feature-item">
					<span class="emoji">👀</span>
					<div>
						<h3>Live Preview</h3>
						<p>See changes instantly</p>
					</div>
				</div>

				<div class="feature-item">
					<span class="emoji">📄</span>
					<div>
						<h3>PDF Export</h3>
						<p>Professional output</p>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="container">
		<!-- Form Section -->
		<div class="form-section">
			<button class="back-btn" on:click={goBack}>
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12.5 15L7.5 10L12.5 5"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<span>Back</span>
			</button>

			<h1>BNI Member Bio Sheet</h1>
			<p class="subtitle">Fill in your details to generate your bio sheet</p>

			<form id="bioForm">
				<!-- CARD 01: PHOTO & LOGO UPLOADS -->
				<div class="section-title-wrapper">
					<div class="section-title">Upload Images</div>
				</div>

				<div class="form-card upload-card">
					<div class="upload-group">
						<label class="upload-label">Your Photo (Passport Size)</label>
						<div class="upload-container">
							{#if photoPreview}
								<div class="image-preview-wrapper">
									<img src={photoPreview} alt="Photo preview" class="image-preview passport-size" />
									<button type="button" class="remove-image-btn" on:click={removePhoto}>×</button>
								</div>
							{:else}
								<label class="upload-box">
									<input
										type="file"
										accept="image/*"
										on:change={handlePhotoUpload}
										style="display: none;"
									/>
									<div class="upload-placeholder">
										<span class="upload-icon">📷</span>
										<span>Click to upload photo</span>
									</div>
								</label>
							{/if}
						</div>
					</div>

					<div class="upload-group">
						<label class="upload-label">Company Logo</label>
						<div class="upload-container">
							{#if logoPreview}
								<div class="image-preview-wrapper">
									<img src={logoPreview} alt="Logo preview" class="image-preview logo-size" />
									<button type="button" class="remove-image-btn" on:click={removeLogo}>×</button>
								</div>
							{:else}
								<label class="upload-box">
									<input
										type="file"
										accept="image/*"
										on:change={handleLogoUpload}
										style="display: none;"
									/>
									<div class="upload-placeholder">
										<span class="upload-icon">🏢</span>
										<span>Click to upload logo</span>
									</div>
								</label>
							{/if}
						</div>
					</div>
				</div>

				<!-- CARD 02: SPEAKER & DATE -->
				<div class="form-card">
					<div class="form-group">
						<label for="speaker">Our Speaker:</label>
						<input type="text" id="speaker" bind:value={formData.speaker} />
					</div>

					<div class="form-group">
						<label for="date">Date:</label>
						<input type="date" id="date" bind:value={formData.date} />
					</div>
				</div>

				<!-- CARD 03: BUSINESS INFORMATION -->
				<div class="section-title-wrapper">
					<div class="section-title">Business Information</div>
				</div>

				<div class="form-card">
					<div class="form-group">
						<label for="businessName">Business Name:</label>
						<input type="text" id="businessName" bind:value={formData.businessName} />
					</div>

					<div class="form-group">
						<label for="profession">Profession:</label>
						<input type="text" id="profession" bind:value={formData.profession} />
					</div>
				</div>

				<!-- CARD 04: LOCATION DETAILS -->
				<div class="section-title-wrapper">
					<div class="section-title">Location Details</div>
				</div>

				<div class="form-card">
					<div class="form-group">
						<label for="doorStreet">Door No / Street:</label>
						<input
							type="text"
							id="doorStreet"
							bind:value={formData.doorStreet}
							placeholder="e.g., 10/35 Kanimadam"
						/>
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

					<!-- PREVIOUS JOBS - MULTIPLE INPUTS -->
					<div class="form-group full-width">
						<label>Previous Types of Jobs:</label>
						{#each formData.previousJobs as job, index}
							<div class="job-entry">
								<div class="job-inputs">
									<input
										type="text"
										bind:value={job.position}
										placeholder="Position"
										class="job-input"
									/>
									<span class="job-at">at</span>
									<input
										type="text"
										bind:value={job.company}
										placeholder="Company"
										class="job-input"
									/>
									<input
										type="text"
										bind:value={job.startYear}
										placeholder="Start Year"
										class="job-year"
									/>
									<span class="job-dash">-</span>
									<input
										type="text"
										bind:value={job.endYear}
										placeholder="End Year"
										class="job-year"
									/>
								</div>
								{#if formData.previousJobs.length > 1}
									<button
										type="button"
										class="remove-item-btn"
										on:click={() => removePreviousJob(index)}
									>
										×
									</button>
								{/if}
							</div>
						{/each}
						<button type="button" class="add-item-btn" on:click={addPreviousJob}>
							+ Add Another Job
						</button>
					</div>
				</div>

				<!-- CARD 05: PERSONAL INFORMATION -->
				<div class="section-title-wrapper">
					<div class="section-title">Personal Information</div>
				</div>

				<div class="form-card">
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

					<!-- HOBBIES - MULTIPLE INPUTS -->
					<div class="form-group full-width">
						<label>Hobbies:</label>
						{#each formData.hobbies as hobby, index}
							<div class="multi-input-entry">
								<input type="text" bind:value={formData.hobbies[index]} placeholder="Enter hobby" />
								{#if formData.hobbies.length > 1}
									<button type="button" class="remove-item-btn" on:click={() => removeHobby(index)}>
										×
									</button>
								{/if}
							</div>
						{/each}
						<button type="button" class="add-item-btn" on:click={addHobby}>+ Add Hobby</button>
					</div>

					<!-- ACTIVITIES - MULTIPLE INPUTS -->
					<div class="form-group full-width">
						<label>Activities of Interest:</label>
						{#each formData.activities as activity, index}
							<div class="multi-input-entry">
								<input type="text" bind:value={formData.activities[index]} placeholder="Enter activity" />
								{#if formData.activities.length > 1}
									<button type="button" class="remove-item-btn" on:click={() => removeActivity(index)}>
										×
									</button>
								{/if}
							</div>
						{/each}
						<button type="button" class="add-item-btn" on:click={addActivity}>
							+ Add Activity
						</button>
					</div>

					<div class="row">
						<div class="form-group">
							<label for="howLong">How Long (in area):</label>
							<input type="text" id="howLong" bind:value={formData.howLong} />
						</div>
					</div>
				</div>

				<!-- CARD 06: MISCELLANEOUS - MULTILINE -->
				<div class="section-title-wrapper">
					<div class="section-title">Miscellaneous</div>
				</div>

				<div class="form-card">
					<div class="form-group full-width">
						<label for="burningDesire">My burning desire is to:</label>
						<textarea id="burningDesire" bind:value={formData.burningDesire} rows="3"></textarea>
					</div>

					<div class="form-group full-width">
						<label for="secretThing">Something no one knows about me is:</label>
						<textarea id="secretThing" bind:value={formData.secretThing} rows="3"></textarea>
					</div>

					<div class="form-group full-width">
						<label for="successKey">My key to success is:</label>
						<textarea id="successKey" bind:value={formData.successKey} rows="4"></textarea>
					</div>
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
			</form>
		</div>

		<!-- Preview Section -->
		<div class="preview-section">
			<h2 class="preview-title">📄 Live Preview</h2>

			{#if classic}
				<div class="preview-wrapper">
					<div class="classic-container" bind:this={previewElement}>
						<!-- Header with Photo and Logo -->
						<div class="classic-header-with-images">
							{#if photoPreview}
								<img src={photoPreview} alt="Member Photo" class="preview-photo" />
							{:else}
								<div class="photo-placeholder"></div>
							{/if}
							<div class="classic-header">
								<h2>BNI Member Bio Sheet</h2>
							</div>
							{#if logoPreview}
								<img src={logoPreview} alt="Company Logo" class="preview-logo" />
							{:else}
								<div class="logo-placeholder"></div>
							{/if}
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
							<span class="classic-underline">{formatPreviousJobs()}</span>
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
							<span class="classic-underline">{formData.hobbies.filter(h => h).join(', ')}</span>
						</div>
						<div class="classic-row">
							<span>Activities of Interest:</span>
							<span class="classic-underline">{formData.activities.filter(a => a).join(', ')}</span>
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
						<!-- Header with Photo and Logo -->
						<div class="preview-header-with-images">
							{#if photoPreview}
								<img src={photoPreview} alt="Member Photo" class="preview-photo" />
							{:else}
								<div class="photo-placeholder"></div>
							{/if}
							<div class="preview-header">
								<h2>BNI Member Bio Sheet</h2>
							</div>
							{#if logoPreview}
								<img src={logoPreview} alt="Company Logo" class="preview-logo" />
							{:else}
								<div class="logo-placeholder"></div>
							{/if}
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
							{formatPreviousJobs()}
						</div>

						<div class="preview-section-header">Personal Information</div>
						<div class="preview-field">Family Information:</div>
						<div class="preview-field preview-indent">A. Spouse: {formData.spouse}</div>
						<div class="preview-field preview-indent">B. Children: {formData.children}</div>
						<div class="preview-field preview-indent">C. Animals: {formData.animals}</div>
						<div class="preview-field">
							<strong>Hobbies:</strong>
							{formData.hobbies.filter((h) => h).join(', ')}
						</div>
						<div class="preview-field">
							<strong>Activities of Interest:</strong>
							{formData.activities.filter((a) => a).join(', ')}
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

		<!-- Floating Download Button -->
		<button
			class="floating-download-btn"
			on:click={downloadPDF}
			disabled={isGeneratingPDF || !html2canvasLoaded || !jsPdfLoaded}
			title="Download PDF"
		>
			{#if !html2canvasLoaded || !jsPdfLoaded}
				<span class="btn-icon">Download PDF ⏳</span>
			{:else if isGeneratingPDF}
				<span class="btn-icon spinning">Download PDF ⏳</span>
			{:else}
				<span class="btn-icon">Download PDF 📄</span>
			{/if}
		</button>
	</div>
{/if}

<!-- Loading Popup -->
{#if showLoadingPopup}
	<div class="loading-popup-overlay">
		<div class="loading-popup">
			<div class="loading-logo">
				<img src="/logo.webp" alt="BNI Logo" width="100" height="100" />
			</div>
			<h3 class="loading-title">Generating Your Bio Sheet</h3>
			<p class="loading-text">Please wait while we prepare your professional document...</p>
			<div class="loading-bar-container">
				<div class="loading-bar" style="width: {loadingProgress}%"></div>
			</div>
			<div class="loading-percentage">{loadingProgress}%</div>
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
		--green-primary: #3fc231;
		--green-dark: #2d9e2a;
	}

	:global(body) {
		font-family: 'DM Sans', sans-serif;
		background: linear-gradient(135deg, #f8f7f4 0%, #ede9e3 100%);
		min-height: 100vh;
	}

	/* ============================================
	   WELCOME SCREEN STYLES
	   ============================================ */
	.welcome-screen {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		animation: fadeIn 0.8s ease-out;
	}

	.features {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	@media (min-width: 768px) {
		.features {
			flex-direction: row;
			gap: 40px;
		}
	}

	.feature-item {
		display: flex;
		gap: 12px;
		align-items: center;
	}

	.emoji {
		font-size: 16px;
	}

	.feature-item h3 {
		margin: 0;
		font-size: 16px;
		font-weight: 600;
	}

	.feature-item p {
		margin: 4px 0 0;
		font-size: 13px;
		color: #6b6b6b;
	}

	.welcome-content {
		max-width: 700px;
		width: 100%;
		text-align: center;
		background: var(--white);
		padding: 40px;
		border-radius: 20px;
		box-shadow: 0 20px 60px rgba(26, 26, 46, 0.12);
	}

	.welcome-icon {
		margin-bottom: 20px;
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
		font-size: 2rem;
		font-weight: 700;
		color: var(--primary-dark);
		margin-bottom: 16px;
		line-height: 1.2;
		letter-spacing: -0.5px;
	}

	.welcome-description {
		font-size: 0.95rem;
		color: var(--text-medium);
		line-height: 1.6;
		margin-bottom: 28px;
	}

	.start-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 14px 32px;
		background: linear-gradient(135deg, var(--green-primary) 0%, #3d5621 100%);
		color: var(--white);
		border: none;
		border-radius: 12px;
		font-family: 'DM Sans', sans-serif;
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 8px 24px rgba(63, 194, 49, 0.3);
		margin-bottom: 24px;
		width: 100%;
		max-width: 400px;
	}

	.start-btn:hover {
		transform: translateY(-3px);
		box-shadow: 0 12px 32px rgba(63, 194, 49, 0.4);
	}

	.start-btn:active {
		transform: translateY(-1px);
	}

	.start-btn svg {
		transition: transform 0.3s ease;
		width: 16px;
		height: 16px;
	}

	.start-btn:hover svg {
		transform: translateX(4px);
	}

	/* ============================================
	   MAIN CONTAINER STYLES
	   ============================================ */
	.container {
		max-width: 900px;
		margin: 0 auto;
		animation: fadeIn 0.8s ease-out;
		padding: 16px;
		position: relative;
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

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.back-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 16px;
		background: var(--white);
		color: var(--primary-dark);
		border: 2px solid var(--green-primary);
		border-radius: 10px;
		font-family: 'DM Sans', sans-serif;
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-bottom: 24px;
	}

	.back-btn:hover {
		background: var(--accent-gold);
		color: var(--white);
		transform: translateY(-2px);
	}

	.back-btn svg {
		width: 20px;
		height: 20px;
		transition: transform 0.3s ease;
	}

	.back-btn:hover svg {
		transform: translateX(-4px);
	}

	/* ============================================
	   FORM SECTION STYLES
	   ============================================ */
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
		margin-bottom: 80px;
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
		background: var(--green-primary);
	}

	/* ============================================
	   UPLOAD CARD STYLES
	   ============================================ */
	.upload-card {
		display: flex;
		gap: 30px;
		align-items: flex-start;
		justify-content: center;
	}

	.upload-group {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.upload-label {
		display: block;
		font-weight: 700;
		color: var(--primary-dark);
		margin-bottom: 12px;
		font-size: 0.85rem;
		letter-spacing: 0.5px;
		text-transform: uppercase;
		font-family: 'Playfair Display', serif;
		text-align: center;
	}

	.upload-container {
		width: 100%;
		max-width: 200px;
	}

	.upload-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 180px;
		border: 3px dashed #e5e5e5;
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.3s ease;
		background: #fafafa;
	}

	.upload-box:hover {
		border-color: var(--green-primary);
		background: #f0f9ef;
	}

	.upload-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		color: var(--text-medium);
		font-size: 0.85rem;
	}

	.upload-icon {
		font-size: 2rem;
	}

	.image-preview-wrapper {
		position: relative;
		width: 100%;
	}

	.image-preview {
		width: 100%;
		height: 180px;
		object-fit: cover;
		border-radius: 12px;
		border: 2px solid var(--green-primary);
	}

	.passport-size {
		object-fit: cover;
	}

	.logo-size {
		object-fit: contain;
		background: #f5f5f5;
	}

	.remove-image-btn {
		position: absolute;
		top: -10px;
		right: -10px;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background: #ff4444;
		color: white;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
		transition: all 0.3s ease;
	}

	.remove-image-btn:hover {
		background: #cc0000;
		transform: scale(1.1);
	}

	/* ============================================
	   FORM CARD STYLES
	   ============================================ */
	.form-card {
		background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
		border: 2px solid #e8e8e8;
		border-radius: 14px;
		padding: 22px;
		margin-bottom: 20px;
		transition: all 0.3s ease;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}

	.form-card:hover {
		box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
		border-color: var(--green-primary);
	}

	.form-card .form-group {
		margin-bottom: 0;
	}

	.form-card .row {
		grid-column: 1 / -1;
	}

	.form-card .full-width {
		grid-column: 1 / -1;
	}

	.form-group {
		margin-bottom: 28px;
		animation: fadeInUp 0.5s ease-out;
		animation-fill-mode: backwards;
	}

	.full-width {
		grid-column: 1 / -1;
	}

	label {
		display: block;
		font-weight: 700;
		color: var(--primary-dark);
		margin-bottom: 8px;
		font-size: 0.85rem;
		letter-spacing: 0.5px;
		text-transform: uppercase;
		font-family: 'Playfair Display', serif;
	}

	input[type='text'],
	input[type='date'],
	input[type='number'],
	textarea {
		width: 100%;
		padding: 12px 14px;
		border: 2px solid #e5e5e5;
		border-radius: 8px;
		font-family: 'DM Sans', sans-serif;
		font-size: 0.9rem;
		transition: all 0.3s ease;
		background: var(--white);
		color: var(--text-dark);
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--green-primary);
		box-shadow: 0 0 0 4px rgba(63, 194, 49, 0.1);
		transform: translateY(-1px);
	}

	textarea {
		resize: vertical;
		min-height: 70px;
	}

	/* ============================================
	   MULTI-INPUT STYLES (Jobs, Hobbies, Activities)
	   ============================================ */
	.job-entry {
		display: flex;
		gap: 10px;
		margin-bottom: 10px;
		align-items: center;
	}

	.job-inputs {
		display: flex;
		gap: 8px;
		align-items: center;
		flex: 1;
		flex-wrap: wrap;
	}

	.job-input {
		flex: 1;
		min-width: 120px;
	}

	.job-year {
		width: 80px;
	}

	.job-at,
	.job-dash {
		font-weight: 600;
		color: var(--text-medium);
	}

	.multi-input-entry {
		display: flex;
		gap: 10px;
		margin-bottom: 10px;
		align-items: center;
	}

	.multi-input-entry input {
		flex: 1;
	}

	.remove-item-btn {
		width: 32px;
		height: 32px;
		min-width: 32px;
		border-radius: 50%;
		background: #ff4444;
		color: white;
		border: none;
		font-size: 1.3rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
		transition: all 0.3s ease;
	}

	.remove-item-btn:hover {
		background: #cc0000;
		transform: scale(1.1);
	}

	.add-item-btn {
		padding: 10px 16px;
		background: var(--green-primary);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-top: 8px;
	}

	.add-item-btn:hover {
		background: var(--green-dark);
		transform: translateY(-2px);
	}

	/* ============================================
	   SECTION TITLE STYLES
	   ============================================ */
	.section-title-wrapper {
		margin-top: 20px;
		margin-bottom: -8px;
	}

	.section-title {
		font-family: 'Playfair Display', serif;
		font-size: 1.3rem;
		font-weight: 700;
		color: var(--white);
		padding: 14px 22px;
		background: linear-gradient(135deg, var(--green-primary) 0%, var(--green-dark) 100%);
		border-radius: 14px 14px 0 0;
		position: relative;
		box-shadow: 0 4px 12px rgba(63, 194, 49, 0.2);
		margin: 0;
	}

	.row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}

	/* ============================================
	   COUNTRY SEARCH STYLES
	   ============================================ */
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
		padding: 12px 40px 12px 14px;
		border: 2px solid #e5e5e5;
		border-radius: 8px;
		font-family: 'DM Sans', sans-serif;
		font-size: 0.9rem;
		transition: all 0.3s ease;
		background: var(--white);
		color: var(--text-dark);
	}

	.country-input-container input:focus {
		outline: none;
		border-color: var(--green-primary);
		box-shadow: 0 0 0 4px rgba(63, 194, 49, 0.1);
		transform: translateY(-1px);
	}

	.search-icon {
		position: absolute;
		right: 12px;
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
		border: 2px solid var(--green-primary);
		border-top: none;
		border-radius: 0 0 8px 8px;
		max-height: 250px;
		overflow-y: auto;
		z-index: 1000;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.country-option {
		padding: 10px 14px;
		cursor: pointer;
		transition: all 0.2s ease;
		border-bottom: 1px solid #f0f0f0;
		font-size: 0.9rem;
		color: var(--text-dark);
	}

	.country-option:hover {
		background-color: #f5f5f5;
		padding-left: 20px;
		font-weight: 500;
	}

	.country-option:last-child {
		border-bottom: none;
	}

	/* ============================================
	   BUTTON STYLES
	   ============================================ */
	.download-btn {
		width: 100%;
		padding: 12px 22px;
		background: linear-gradient(135deg, var(--green-primary) 0%, #3d5621 100%);
		color: var(--white);
		border: none;
		border-radius: 12px;
		font-family: 'DM Sans', sans-serif;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-top: 32px;
		box-shadow: 0 4px 16px rgba(63, 194, 49, 0.3);
	}

	.download-btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(63, 194, 49, 0.4);
	}

	.download-btn:active:not(:disabled) {
		transform: translateY(0);
	}

	.download-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.floating-download-btn {
		position: fixed;
		bottom: 30px;
		right: 30px;
		width: auto;
		height: auto;
		border-radius: 15px;
		background: linear-gradient(135deg, var(--green-primary) 0%, #3d5621 100%);
		color: var(--white);
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 8px 24px rgba(63, 194, 49, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;
		font-size: 28px;
		padding: 10px;
	}

	.floating-download-btn:hover:not(:disabled) {
		transform: scale(1.1);
		box-shadow: 0 12px 32px rgba(63, 194, 49, 0.5);
	}

	.floating-download-btn:active:not(:disabled) {
		transform: scale(0.95);
	}

	.floating-download-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.btn-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.btn-icon.spinning {
		animation: spin 1s linear infinite;
	}

	/* ============================================
	   PREVIEW SECTION STYLES
	   ============================================ */
	.preview-wrapper {
		background: #ffffff;
		padding: 0;
		border-radius: 8px;
		overflow: hidden;
	}

	/* Header with images */
	.classic-header-with-images,
	.preview-header-with-images {
		display: grid;
		grid-template-columns: 100px 1fr 100px;
		align-items: center;
		gap: 15px;
		margin-bottom: 16px;
	}

	.preview-photo {
		width: 100px;
		height: 120px;
		object-fit: cover;
		border: 2px solid #000000;
		border-radius: 4px;
		justify-self: center;
	}

	.preview-logo {
		width: 100px;
		height: 100px;
		object-fit: contain;
		justify-self: center;
	}

	.photo-placeholder,
	.logo-placeholder {
		width: 100px;
		height: 100px;
	}

	/* CLASSIC DESIGN STYLES */
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
		background: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
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
		text-decoration: none;
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
		text-decoration: none;
	}

	.classic-indent {
		padding-left: 30px;
	}

	/* MODERN DESIGN STYLES */
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
		background: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
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
		padding: 6px 8px;
		font-family: 'Crimson Pro', serif;
		font-size: 1rem;
		font-weight: 700;
		margin: 10px 0 8px;
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

	/* ============================================
	   LOADING POPUP STYLES
	   ============================================ */
	.loading-popup-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10000;
		animation: fadeIn 0.3s ease-out;
	}

	.loading-popup {
		background: white;
		padding: 40px;
		border-radius: 20px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		max-width: 400px;
		width: 90%;
		text-align: center;
		animation: slideIn 0.4s ease-out;
	}

	.loading-logo {
		margin-bottom: 20px;
		animation: float 3s ease-in-out infinite;
	}

	.loading-title {
		font-family: 'Crimson Pro', serif;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary-dark);
		margin-bottom: 12px;
	}

	.loading-text {
		color: var(--text-medium);
		margin-bottom: 24px;
		font-size: 0.95rem;
	}

	.loading-bar-container {
		width: 100%;
		height: 8px;
		background: #e5e5e5;
		border-radius: 10px;
		overflow: hidden;
		margin-bottom: 12px;
	}

	.loading-bar {
		height: 100%;
		background: linear-gradient(90deg, var(--green-primary), var(--green-dark));
		border-radius: 10px;
		transition: width 0.1s linear;
	}

	.loading-percentage {
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--green-primary);
	}

	/* ============================================
	   RESPONSIVE STYLES
	   ============================================ */
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

		.welcome-content {
			padding: 32px 24px;
		}

		.welcome-title {
			font-size: 1.5rem;
		}

		.welcome-description {
			font-size: 0.9rem;
		}

		.floating-download-btn {
			bottom: 20px;
			right: 20px;
			font-size: 24px;
		}

		.classic-row-double {
			grid-template-columns: 1fr;
		}

		.country-dropdown {
			max-height: 250px;
		}

		.form-card {
			grid-template-columns: 1fr;
		}

		.upload-card {
			flex-direction: column;
			align-items: center;
		}

		.job-inputs {
			flex-direction: column;
			align-items: stretch;
		}

		.job-input,
		.job-year {
			width: 100%;
		}

		.classic-header-with-images,
		.preview-header-with-images {
			grid-template-columns: 80px 1fr 80px;
			gap: 10px;
		}

		.preview-photo {
			width: 80px;
			height: 100px;
		}

		.preview-logo {
			width: 80px;
			height: 80px;
		}
	}

	@media (max-width: 480px) {
		h1 {
			font-size: 1.5rem;
		}

		.section-title {
			font-size: 1.1rem;
		}

		.form-section,
		.preview-section {
			padding: 20px 16px;
		}

		.welcome-content {
			padding: 24px 16px;
		}

		.welcome-title {
			font-size: 1.3rem;
		}

		.welcome-description {
			font-size: 0.85rem;
			margin-bottom: 20px;
		}

		.start-btn {
			padding: 12px 24px;
			font-size: 0.9rem;
			margin-bottom: 20px;
		}

		.welcome-screen {
			padding: 16px;
			min-height: auto;
		}

		.floating-download-btn {
			bottom: 16px;
			right: 16px;
			font-size: 22px;
		}

		.country-dropdown {
			max-height: 200px;
		}

		.loading-popup {
			padding: 30px 20px;
		}

		.loading-title {
			font-size: 1.2rem;
		}

		.loading-text {
			font-size: 0.85rem;
		}
	}
</style>