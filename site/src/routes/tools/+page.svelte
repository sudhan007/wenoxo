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
		speaker: '',
		date: '',
		businessName: '',
		profession: '',
		doorStreet: '',
		area: '',
		city: '',
		state: '',
		country: '',
		yearsInBusiness: 0,
		previousJobs: [
			{ company: '', position: '', startYear: '', endYear: '' }
		],
		spouse: '',
		children: '',
		animals: '',
		hobbies: [' ', ''],
		activities: [''],
		howLong: '',
		burningDesire: '',
		secretThing: '',
		photo: null,
		companyLogo: null,

		goals: '',
		accomplishments: '',
		interests: '',
		networks: '',
		skills: '',
		// Contact Sphere fields
		contactSphere: [''],
		contactSphereTop3: ['', '', ''],
		// Last 10 Customers fields
		last10Customers: [''],
		notesOnCustomers: '',
		notesOnReferrals: ''


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



	function addContactSphere() {
		formData.contactSphere = [...formData.contactSphere, ''];
	}

	function removeContactSphere(index) {
		formData.contactSphere = formData.contactSphere.filter((_, i) => i !== index);
	}

	// Last 10 Customers Management
	function addCustomer() {
		formData.last10Customers = [...formData.last10Customers, ''];
	}

	function removeCustomer(index) {
		formData.last10Customers = formData.last10Customers.filter((_, i) => i !== index);
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

	// References for preview elements
	let previewElement; // For display (responsive)
	let pdfElement; // For PDF generation (static size)
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
			.filter(job => job.company)
			.map(job => job.company)
			.join(', ');
	}

	// MongoDB API Call (replace with your actual endpoint)
	async function saveBioToDatabase(bioData) {
		try {
			const response = await fetch('https://reixit.onrender.com/api/user/auth/new_pdf', {
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
		if (!pdfElement || !html2canvasLoaded || !jsPdfLoaded) {
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
			// await saveBioToDatabase(bioData);

			// Generate PDF
			isGeneratingPDF = true;
			const filename = `BNI_Bio_Sheet_${formData.speaker.replace(/\s+/g, '_')}.pdf`;
 

			const jsPDF = window.jspdf.jsPDF;

				// A4 portrait size in mm
				const PDF_WIDTH = 210;
				const PDF_HEIGHT = 297;
				const margin = 10;

				const pdf = new jsPDF({
					orientation: 'portrait',
					unit: 'mm',
					format: 'a4',
					compress: true
				});

				const canvas = await window.html2canvas(pdfElement, {
					scale: 2,
					useCORS: true,
					backgroundColor: '#ffffff',
					logging: false,
					allowTaint: true,
					windowWidth: pdfElement.scrollWidth,
					windowHeight: pdfElement.scrollHeight
				});

				const imgData = canvas.toDataURL('image/jpeg', 0.95);

				// Image dimensions
				const imgWidth = PDF_WIDTH - margin * 2;
				const imgHeight = (canvas.height * imgWidth) / canvas.width;

				// MULTI-PAGE handling
				let heightLeft = imgHeight;
				let position = margin;

				pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
				heightLeft -= PDF_HEIGHT - margin * 2;

				while (heightLeft > 0) {
					position = heightLeft - imgHeight + margin;
					pdf.addPage();
					pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
					heightLeft -= PDF_HEIGHT - margin * 2;
				}

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

			<!-- <div class="features">
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
			</div> -->
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
						<p class="field-helper">Add your work history (most recent first)</p>
						
						{#each formData.previousJobs as job, index}
							<div class="job-entry">
								<div class="job-number">{index + 1}</div>
								<div class="job-inputs-grid">
									<div class="job-field">
										<input
											type="text"
											bind:value={job.position}
											placeholder="e.g., Marketing Manager"
											class="job-input"
										/>
										<span class="field-label">Position</span>
									</div>
									
									<div class="job-field">
										<input
											type="text"
											bind:value={job.company}
											placeholder="e.g., ABC Corporation"
											class="job-input"
										/>
										<span class="field-label">Company</span>
									</div>
									
									<div class="job-field year-field">
										<input
											type="text"
											bind:value={job.startYear}
											placeholder="2018"
											class="job-year"
											maxlength="4"
										/>
										<span class="field-label">Start Year</span>
									</div>
									
									<div class="job-field year-field">
										<input
											type="text"
											bind:value={job.endYear}
											placeholder="2022"
											class="job-year"
											maxlength="4"
										/>
										<span class="field-label">End Year</span>
									</div>
								</div>
								
								{#if formData.previousJobs.length > 1}
									<button
										type="button"
										class="remove-item-btn-new"
										on:click={() => removePreviousJob(index)}
										title="Remove this job"
									>
										<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
										</svg>
									</button>
								{/if}
							</div>
						{/each}
						
						<button type="button" class="add-item-btn-new" on:click={addPreviousJob}>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
							</svg>
							<span>Add Another Job</span>
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


				<div class="section-title-wrapper">
					<div class="section-title">BNI Gains Worksheet</div>
				</div>

				<div class="form-card">
					<div class="form-group full-width">
						<label for="goals">Goals:</label>
						<p class="field-helper">Your business or personal objectives</p>
						<textarea id="goals" bind:value={formData.goals} rows="3" placeholder="e.g., To achieve 10 crore turnover by this year"></textarea>
					</div>

					<div class="form-group full-width">
						<label for="accomplishments">Accomplishments:</label>
						<p class="field-helper">What you're proud of achieving</p>
						<textarea id="accomplishments" bind:value={formData.accomplishments} rows="3" placeholder="e.g., Processed a loan which worth 1.85 crores in a very short time"></textarea>
					</div>

					<div class="form-group full-width">
						<label for="interests">Interests:</label>
						<p class="field-helper">Things you enjoy doing</p>
						<textarea id="interests" bind:value={formData.interests} rows="2" placeholder="e.g., Sports and music"></textarea>
					</div>

					<div class="form-group full-width">
						<label for="networks">Networks:</label>
						<p class="field-helper">Organizations or groups you associate with</p>
						<textarea id="networks" bind:value={formData.networks} rows="2" placeholder="e.g., BNI, Local Chamber of Commerce"></textarea>
					</div>

					<div class="form-group full-width">
						<label for="skills">Skills:</label>
						<p class="field-helper">Your talents and abilities</p>
						<textarea id="skills" bind:value={formData.skills} rows="2" placeholder="e.g., Communication, quick loan valuation"></textarea>
					</div>
				</div>


				<div class="section-title-wrapper">
					<div class="section-title">Contact Sphere Planning</div>
				</div>

				<div class="form-card">
					<div class="form-group full-width">
						<label>Contact Sphere:</label>
						<p class="field-helper">Businesses or professions that naturally provide referrals</p>
						{#each formData.contactSphere as sphere, index}
							<div class="multi-input-entry">
								<input type="text" bind:value={formData.contactSphere[index]} placeholder="e.g., Hotel Business, Hospitals, Schools" />
								{#if formData.contactSphere.length > 1}
									<button type="button" class="remove-item-btn" on:click={() => removeContactSphere(index)}>
										×
									</button>
								{/if}
							</div>
						{/each}
						<button type="button" class="add-item-btn" on:click={addContactSphere}>
							+ Add Contact Sphere
						</button>
					</div>

					<div class="form-group full-width">
						<label>Contact Sphere Top-3:</label>
						<p class="field-helper">Your top 3 contact sphere priorities</p>
						<div class="top3-grid">
							<input type="text" bind:value={formData.contactSphereTop3[0]} placeholder="1. e.g., Bejansing Eye Hospital" />
							<input type="text" bind:value={formData.contactSphereTop3[1]} placeholder="2. e.g., Velavan Hospital" />
							<input type="text" bind:value={formData.contactSphereTop3[2]} placeholder="3. e.g., Auditors" />
						</div>
					</div>
				</div>

				<div class="section-title-wrapper">
					<div class="section-title">Last 10 Customer Worksheet</div>
				</div>

				<div class="form-card">
					<div class="form-group full-width">
						<label>Last 10 Customers:</label>
						<p class="field-helper">List your recent customers (most recent first)</p>
						{#each formData.last10Customers as customer, index}
							<div class="multi-input-entry">
								<input type="text" bind:value={formData.last10Customers[index]} placeholder="e.g., Krishna balan - owner of Jeyam Hotel" />
								{#if formData.last10Customers.length > 1}
									<button type="button" class="remove-item-btn" on:click={() => removeCustomer(index)}>
										×
									</button>
								{/if}
							</div>
						{/each}
						<button type="button" class="add-item-btn" on:click={addCustomer}>
							+ Add Customer
						</button>
					</div>

					<div class="form-group full-width">
						<label for="notesOnCustomers">Notes on Customers:</label>
						<p class="field-helper">Observations about your last 10 customers</p>
						<textarea id="notesOnCustomers" bind:value={formData.notesOnCustomers} rows="4" placeholder="Make notes about your last 10 customers"></textarea>
					</div>

					<div class="form-group full-width">
						<label for="notesOnReferrals">Notes on Referrals:</label>
						<p class="field-helper">Track referral patterns and opportunities</p>
						<textarea id="notesOnReferrals" bind:value={formData.notesOnReferrals} rows="4" placeholder="Make notes about referrals"></textarea>
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

		<!-- Preview Section - RESPONSIVE (for display only) -->
		<div class="preview-section">
			<h2 class="preview-title">📄 Live Preview</h2>

			{#if classic}
				<div class="preview-wrapper" bind:this={previewElement}>
					<div class="classic-container">
						<!-- Header -->
						<div class="classic-header">
							<h2>BNI Member Bio Sheet</h2>
						</div>

						<!-- Top Section -->
						<div class="classic-top">
							<div>Our <u>Speaker</u>: <strong>{formData.speaker}</strong></div>
							<div style="text-align: right;">Date: <u>{formatDate(formData.date)}</u></div>
						</div>

						<!-- Business Information -->
						<div class="classic-section-header">Business Information</div>
						<div class="classic-row">
							<span>Business Name: <u>{formData.businessName}</u></span>
						</div>
						<div class="classic-row">
							<span>Profession: {formData.profession}</span>
						</div>
						<div class="classic-row-blank"></div>
						<div class="classic-row">
							<span>Location: <u>{formData.doorStreet}, {formData.area}, {formData.city}</u></span>
							<span style="margin-left: auto;">Years in Business: <u>{formData.yearsInBusiness}</u></span>
						</div>
						<div class="classic-row">
							<span>Previous Types of Jobs: <u>{formatPreviousJobs()}</u></span>
						</div>

						<!-- Personal Information -->
						<div class="classic-section-header">Personal Information</div>
						<div class="classic-row">
							<span>Family Information:</span>
						</div>
						<div class="classic-row classic-indent">
							<span>A. Spouse</span>
							<span style="margin-left: 20px;">: <u>{formData.spouse}</u></span>
						</div>
						<div class="classic-row classic-indent">
							<span>B. Children</span>
							<span style="margin-left: 10px;">: <u>{formData.children}</u></span>
						</div>
						<div class="classic-row classic-indent">
							<span>C. Animals</span>
							<span style="margin-left: 15px;">{formData.animals}</span>
						</div>
						<div class="classic-row">
							<span>Hobbies: <u>{formData.hobbies.filter(h => h).join(' and ')}</u></span>
						</div>
						<div class="classic-row">
							<span>Activities of Interest: <u>{formData.activities.filter(a => a).join(', ')}</u></span>
						</div>
						<div class="classic-row">
							<span>City of Residence:</span>
							<span style="margin-left: 20px;"><u>{formData.city}</u></span>
							<span style="margin-left: auto;">How Long? <u>{formData.howLong}</u></span>
						</div>

						<!-- Miscellaneous -->
						<div class="classic-section-header">Miscellaneous</div>
						<div class="classic-row">
							<span>My burning desire is to . . . <u>{formData.burningDesire}</u></span>
						</div>
						<div class="classic-row-blank"></div>
						<div class="classic-row">
							<span>Something no one knows about me is: <u>{formData.secretThing}</u></span>
						</div>
						<div class="classic-row-blank"></div>
						<div class="classic-row-blank"></div>
						<div class="classic-row">
							<span>My key to success is . . . <u>{formData.successKey}</u></span>
						</div>


 
						<div class="classic-section-header">BNI Gains Worksheet</div>
						 
						<div class="classic-row">
							<span>Goals: <u>{formData.goals}</u></span>
						</div> 
						<div class="classic-row">
							<span>Accomplishments: <u>{formData.accomplishments}</u></span>
						</div> 
						<div class="classic-row">
							<span>Interests: <u>{formData.interests}</u></span>
						</div> 
						<div class="classic-row">
							<span>Networks: <u>{formData.networks}</u></span>
						</div> 
						<div class="classic-row">
							<span>Skills: <u>{formData.skills}</u></span>
						</div>

						<div class="classic-section-header">Contact Sphere</div>
						<div class="classic-row">
							<span>Contact Sphere: <u>{formData.contactSphere.filter(s => s).join(', ')}</u></span>
						</div>
						<div class="classic-row">
							<span>Top-3: <u>{formData.contactSphereTop3.filter(s => s).join(', ')}</u></span>
						</div> 

						<!-- Last 10 Customers --> 
						<div class="classic-section-header">Last 10 Customers</div>
						<div class="classic-row">
							<span>Customers: <u>{formData.last10Customers.filter(c => c).join(', ')}</u></span>
						</div> 
						<div class="classic-row">
							<span>Notes on Customers: <u>{formData.notesOnCustomers}</u></span>
						</div> 
						<div class="classic-row">
							<span>Notes on Referrals: <u>{formData.notesOnReferrals}</u></span>
						</div> 


					</div>
				</div>
			{:else}
				<div class="preview-wrapper">
					<div class="preview-container" bind:this={previewElement}>
						<!-- Header with Photo and Logo -->
						<div class="preview-header-with-images">
							<!-- {#if photoPreview}
								<img src={photoPreview} alt="Member Photo" class="preview-photo" />
							{:else}
								<div class="photo-placeholder"></div>
							{/if} -->
							<div class="preview-header">
								<h2>BNI Member Bio Sheet</h2>
							</div>
							<!-- {#if logoPreview}
								<img src={logoPreview} alt="Company Logo" class="preview-logo" />
							{:else}
								<div class="logo-placeholder"></div>
							{/if} -->
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

 
							<div class="preview-section-header">BNI Gains Worksheet</div> 
							<div class="preview-field"><strong>Goals:</strong> {formData.goals}</div> 
							<div class="preview-field"><strong>Accomplishments:</strong> {formData.accomplishments}</div> 
							<div class="preview-field"><strong>Interests:</strong> {formData.interests}</div> 
							<div class="preview-field"><strong>Networks:</strong> {formData.networks}</div> 
							<div class="preview-field"><strong>Skills:</strong> {formData.skills}</div> 

							<!-- Contact Sphere --> 
							<div class="preview-section-header">Contact Sphere</div>
							<div class="preview-field">
								<strong>Contact Sphere:</strong> {formData.contactSphere.filter(s => s).join(', ')}
							</div>
							<div class="preview-field">
								<strong>Top-3:</strong> {formData.contactSphereTop3.filter(s => s).join(', ')}
							</div> 
							<!-- Last 10 Customers --> 
							<div class="preview-section-header">Last 10 Customers</div>
							<div class="preview-field">
								<strong>Customers:</strong> {formData.last10Customers.filter(c => c).join(', ')}
							</div> 
							<div class="preview-field">
								<strong>Notes on Customers:</strong> {formData.notesOnCustomers}
							</div> 
							<div class="preview-field">
								<strong>Notes on Referrals:</strong> {formData.notesOnReferrals}
							</div> 
					</div>
				</div>
			{/if}
		</div>

		<!-- HIDDEN PDF ELEMENT - STATIC SIZE (for PDF download only) -->
		<div class="pdf-hidden-element" bind:this={pdfElement}>
			{#if classic}
				<div class="pdf-classic-container">
					<!-- Header -->
					<div class="pdf-classic-header">
						<h2>BNI Member Bio Sheet</h2>
					</div>

					<!-- Top Section -->
					<div class="pdf-classic-top">
						<div>Our <u  >Speaker: <strong>{formData.speaker}</strong></u></div>
						<div style="text-align: right;">Date: <u>{formatDate(formData.date)}</u></div>
					</div>

					<!-- Business Information -->

					<div  style="border: 1px solid #000000; padding-bottom: 15px;">
						<div class="pdf-classic-section-headers"><p>Business Information</p></div>
						<div class="pdf-classic-row">
							<span >Business Name: <u>{formData.businessName}</u></span>
						</div>
						<div class="pdf-classic-row">
							<span>Profession: {formData.profession}</span>
						</div>
						<div class="pdf-classic-row-blank"></div>
						<div class="pdf-classic-row">
							<span>Location: <u>{formData.doorStreet}, {formData.area}, {formData.city}</u></span>
							<span style="margin-left: auto;">Years in Business: <u>{formData.yearsInBusiness}</u></span>
						</div>
						<div class="pdf-classic-row">
							<span>Previous Types of Jobs: <u>{formatPreviousJobs()}</u></span>
						</div>

						<!-- Personal Information -->
						<div class="pdf-classic-section-header"><p>Personal Information</p></div>
						<div class="pdf-classic-row">
							<span>Family Information:</span>
						</div>
						<div class="pdf-classic-row pdf-classic-indent">
							<span>A. Spouse</span>
							<span style="margin-left: 20px;">: <u>{formData.spouse}</u></span>
						</div>
						<div class="pdf-classic-row pdf-classic-indent">
							<span>B. Children</span>
							<span style="margin-left: 10px;">: <u>{formData.children}</u></span>
						</div>
						<div class="pdf-classic-row pdf-classic-indent">
							<span>C. Animals</span>
							<span style="margin-left: 15px;">{formData.animals}</span>
						</div>
						<div class="pdf-classic-row">
							<span>Hobbies: <u>{formData.hobbies.filter(h => h).join(' and ')}</u></span>
						</div>
						<div class="pdf-classic-row">
							<span>Activities of Interest: <u>{formData.activities.filter(a => a).join(', ')}</u></span>
						</div>
						<div class="pdf-classic-row">
							<span>City of Residence:</span>
							<span style="margin-left: 20px;"><u>{formData.city}</u></span>
							<span style="margin-left: auto;">How Long? <u>{formData.howLong}</u></span>
						</div>

						<!-- Miscellaneous -->
						<div class="pdf-classic-section-header"><p>Miscellaneous</p></div>
						<div class="pdf-classic-row">
							<span>My burning desire is to . . . <u>{formData.burningDesire}</u></span>
						</div>
						<div class="pdf-classic-row-blank"></div>
						<div class="pdf-classic-row">
							<span>Something no one knows about me is: <u>{formData.secretThing}</u></span>
						</div>
						<div class="pdf-classic-row-blank"></div>
						<div class="pdf-classic-row-blank"></div>
						<div class="pdf-classic-row">
							<span>My key to success is . . . <u>{formData.successKey}</u></span>
						</div>

						
						<div class="classic-section-header">BNI Gains Worksheet</div>
						 
						<div class="classic-row">
							<span>Goals: <u>{formData.goals}</u></span>
						</div> 
						<div class="classic-row">
							<span>Accomplishments: <u>{formData.accomplishments}</u></span>
						</div> 
						<div class="classic-row">
							<span>Interests: <u>{formData.interests}</u></span>
						</div> 
						<div class="classic-row">
							<span>Networks: <u>{formData.networks}</u></span>
						</div> 
						<div class="classic-row">
							<span>Skills: <u>{formData.skills}</u></span>
						</div>

						<div class="classic-section-header">Contact Sphere</div>
						<div class="classic-row">
							<span>Contact Sphere: <u>{formData.contactSphere.filter(s => s).join(', ')}</u></span>
						</div>
						<div class="classic-row">
							<span>Top-3: <u>{formData.contactSphereTop3.filter(s => s).join(', ')}</u></span>
						</div> 

						<!-- Last 10 Customers --> 
						<div class="classic-section-header">Last 10 Customers</div>
						<div class="classic-row">
							<span>Customers: <u>{formData.last10Customers.filter(c => c).join(', ')}</u></span>
						</div> 
						<div class="classic-row">
							<span>Notes on Customers: <u>{formData.notesOnCustomers}</u></span>
						</div> 
						<div class="classic-row">
							<span>Notes on Referrals: <u>{formData.notesOnReferrals}</u></span>
						</div> 

					</div>
				</div>
			{:else}
				<div class="pdf-classic-container">
					<!-- Header -->
					<div class="pdf-classic-header">
						<h2>BNI Member Bio Sheet</h2>
					</div>

					<!-- Top Section -->
					<div class="pdf-classic-top">
						<div>Our <u  >Speaker: <strong>{formData.speaker}</strong></u></div>
						<div style="text-align: right;">Date: <u>{formatDate(formData.date)}</u></div>
					</div>

					<!-- Business Information -->

					<div  style="border: 1px solid #000000; padding-bottom: 15px;">
						<div class="pdf-classic-section-headers"><p>Business Information</p></div>
						<div class="pdf-classic-row">
							<span >Business Name: <u>{formData.businessName}</u></span>
						</div>
						<div class="pdf-classic-row">
							<span>Profession: {formData.profession}</span>
						</div>
						<div class="pdf-classic-row-blank"></div>
						<div class="pdf-classic-row">
							<span>Location: <u>{formData.doorStreet}, {formData.area}, {formData.city}</u></span>
							<span style="margin-left: auto;">Years in Business: <u>{formData.yearsInBusiness}</u></span>
						</div>
						<div class="pdf-classic-row">
							<span>Previous Types of Jobs: <u>{formatPreviousJobs()}</u></span>
						</div>

						<!-- Personal Information -->
						<div class="pdf-classic-section-header"><p>Personal Information</p></div>
						<div class="pdf-classic-row">
							<span>Family Information:</span>
						</div>
						<div class="pdf-classic-row pdf-classic-indent">
							<span>A. Spouse</span>
							<span style="margin-left: 20px;">: <u>{formData.spouse}</u></span>
						</div>
						<div class="pdf-classic-row pdf-classic-indent">
							<span>B. Children</span>
							<span style="margin-left: 10px;">: <u>{formData.children}</u></span>
						</div>
						<div class="pdf-classic-row pdf-classic-indent">
							<span>C. Animals</span>
							<span style="margin-left: 15px;">{formData.animals}</span>
						</div>
						<div class="pdf-classic-row">
							<span>Hobbies: <u>{formData.hobbies.filter(h => h).join(' and ')}</u></span>
						</div>
						<div class="pdf-classic-row">
							<span>Activities of Interest: <u>{formData.activities.filter(a => a).join(', ')}</u></span>
						</div>
						<div class="pdf-classic-row">
							<span>City of Residence:</span>
							<span style="margin-left: 20px;"><u>{formData.city}</u></span>
							<span style="margin-left: auto;">How Long? <u>{formData.howLong}</u></span>
						</div>

						<!-- Miscellaneous -->
						<div class="pdf-classic-section-header"><p>Miscellaneous</p></div>
						<div class="pdf-classic-row">
							<span>My burning desire is to . . . <u>{formData.burningDesire}</u></span>
						</div>
						<div class="pdf-classic-row-blank"></div>
						<div class="pdf-classic-row">
							<span>Something no one knows about me is: <u>{formData.secretThing}</u></span>
						</div>
						<div class="pdf-classic-row-blank"></div>
						<div class="pdf-classic-row-blank"></div>
						<div class="pdf-classic-row">
							<span>My key to success is . . . <u>{formData.successKey}</u></span>
						</div>


						
						<div class="classic-section-header">BNI Gains Worksheet</div>
						 
						<div class="classic-row">
							<span>Goals: <u>{formData.goals}</u></span>
						</div> 
						<div class="classic-row">
							<span>Accomplishments: <u>{formData.accomplishments}</u></span>
						</div> 
						<div class="classic-row">
							<span>Interests: <u>{formData.interests}</u></span>
						</div> 
						<div class="classic-row">
							<span>Networks: <u>{formData.networks}</u></span>
						</div> 
						<div class="classic-row">
							<span>Skills: <u>{formData.skills}</u></span>
						</div>

						<div class="classic-section-header">Contact Sphere</div>
						<div class="classic-row">
							<span>Contact Sphere: <u>{formData.contactSphere.filter(s => s).join(', ')}</u></span>
						</div>
						<div class="classic-row">
							<span>Top-3: <u>{formData.contactSphereTop3.filter(s => s).join(', ')}</u></span>
						</div> 

						<!-- Last 10 Customers --> 
						<div class="classic-section-header">Last 10 Customers</div>
						<div class="classic-row">
							<span>Customers: <u>{formData.last10Customers.filter(c => c).join(', ')}</u></span>
						</div> 
						<div class="classic-row">
							<span>Notes on Customers: <u>{formData.notesOnCustomers}</u></span>
						</div> 
						<div class="classic-row">
							<span>Notes on Referrals: <u>{formData.notesOnReferrals}</u></span>
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
	.pdf-underline{
			display: inline-block;
	border-bottom: 1.5px solid #000;
	padding-bottom: 1px;
	line-height: 1.6;
	}

	:global(body) {
		font-family: 'DM Sans', sans-serif;
		background: linear-gradient(135deg, #f8f7f4 0%, #ede9e3 100%);
		min-height: 100vh;
	}

	/* HIDDEN PDF ELEMENT - FIXED SIZE */
	.pdf-hidden-element {
		position: fixed;
		top: -9999px;
		left: -9999px;
		width: 1000px;
		height: 1414px;
		background: white;
		overflow: hidden;
		z-index: -1000; 
	}

	/* Field Helper Text */
.field-helper {
	font-size: 0.8rem;
	color: var(--text-medium);
	margin-top: -4px;
	margin-bottom: 16px;
	font-weight: 400;
	font-style: italic;
}

/* Improved Job Entry Styles */
.job-entry {
	display: flex;
	gap: 12px;
	margin-bottom: 20px;
	align-items: flex-start;
	background: #f8f9fa;
	padding: 20px;
	border-radius: 12px;
	border: 2px solid #e8e8e8;
	transition: all 0.3s ease;
	position: relative;
}

.job-entry:hover {
	border-color: var(--green-primary);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.job-number {
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 32px;
	height: 32px;
	background: var(--green-primary);
	color: white;
	border-radius: 50%;
	font-weight: 700;
	font-size: 0.9rem;
	margin-top: 8px;
}

.job-inputs-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 16px;
	flex: 1;
}

.job-field {
	display: flex;
	flex-direction: column;
	gap: 6px;
}

.job-field.year-field {
	max-width: 120px;
}

.field-label {
	font-size: 0.75rem;
	font-weight: 600;
	color: var(--text-medium);
	text-transform: uppercase;
	letter-spacing: 0.5px;
	order: -1;
}

.job-input,
.job-year {
	width: 100%;
	padding: 10px 12px;
	border: 2px solid #e0e0e0;
	border-radius: 8px;
	font-size: 0.9rem;
	transition: all 0.2s ease;
}

.job-input:focus,
.job-year:focus {
	outline: none;
	border-color: var(--green-primary);
	box-shadow: 0 0 0 3px rgba(63, 194, 49, 0.1);
}

/* New Remove Button Style */
.remove-item-btn-new {
	width: 32px;
	height: 32px;
	min-width: 32px;
	border-radius: 8px;
	background: #fff;
	color: #ff4444;
	border: 2px solid #ffdddd;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.2s ease;
	margin-top: 8px;
}

.remove-item-btn-new:hover {
	background: #ff4444;
	color: white;
	border-color: #ff4444;
	transform: scale(1.05);
}

/* New Add Button Style */
.add-item-btn-new {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	padding: 12px 20px;
	background: white;
	color: var(--green-primary);
	border: 2px dashed var(--green-primary);
	border-radius: 10px;
	font-size: 0.9rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	margin-top: 8px;
}

.add-item-btn-new:hover {
	background: var(--green-primary);
	color: white;
	border-style: solid;
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(63, 194, 49, 0.2);
}

.add-item-btn-new svg {
	transition: transform 0.3s ease;
}

.add-item-btn-new:hover svg {
	transform: rotate(90deg);
}

/* Responsive adjustments */
@media (max-width: 768px) {
	.job-inputs-grid {
		grid-template-columns: 1fr;
	}
	
	.job-field.year-field {
		max-width: 100%;
	}
	
	.job-entry {
		padding: 16px;
	}
	
	.job-number {
		min-width: 28px;
		height: 28px;
		font-size: 0.85rem;
	}
	.preview-header h2{
		font-size: 1rem !important;
	}
	.preview-header {
		width: 100% !important;
	}
}

	/* PDF CLASSIC STYLES - FIXED */
	.pdf-classic-container {
		width: 100%;
		height: 100%;
		background: #ffffff;
		padding: 30px;
		font-family: Arial, sans-serif;
		font-size: 13px;
		line-height: 1.5;
		box-sizing: border-box;
	}

	.pdf-classic-header {
		text-align: center;
		border: 2px solid #000000;
		padding: 10px;
		background: #ffffff;
		margin-bottom: 12px;
		margin-top: -12px;
	}

	.pdf-classic-header h2 {
		font-family: Arial, sans-serif;
		font-size: 20px;
		font-weight: bold;
		color: #000000; 
		margin-top: -12px;
		margin-bottom: 10px;
	}

	.pdf-classic-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 12px;
		font-size: 13px;
		color: #000000;
		padding: 0 8px;
	}

	.pdf-classic-top u {
		text-decoration: underline;
	}

	.pdf-classic-top strong {
		font-weight: bold;
	}

	.pdf-classic-section-header {
		background: #000000;
		color: #ffffff;
		padding: 6px 6px;
		font-family: Arial, sans-serif;
		font-size: 13px;
		font-weight: bold;
		margin: 12px 0 8px;
	}
	.pdf-classic-section-header p {    
		font-size: 13px; 
		margin-bottom: 13px;
	}

	.pdf-classic-section-headers {
		background: #000000;
		color: #ffffff;
		padding: 6px 6px;
		font-family: Arial, sans-serif;
		font-size: 13px;
		font-weight: bold; 
	}
	.pdf-classic-section-headers p {    
		font-size: 13px; 
		margin-bottom: 13px;
	}


	.pdf-classic-row {
		margin-bottom: 4px;
		font-size: 13px;
		line-height: 1.5;
		color: #000000;
		padding: 0 8px;
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}

	.pdf-classic-row u {
		text-decoration: underline;
		  text-decoration-color: rgba(0, 0, 0, 0.6); /* 40% opacity */

	}

	.pdf-classic-row-blank {
		height: 18px;
	}

	.pdf-classic-indent {
		padding-left: 30px;
	}

	/* PDF MODERN STYLES - FIXED */
	.pdf-modern-container {
		width: 100%;
		height: 100%;
		background: #ffffff;
		padding: 30px;
		font-family: 'DM Sans', Arial, sans-serif;
		font-size: 13px;
		line-height: 1.5;
		box-sizing: border-box;
		overflow: hidden;
	}

	.pdf-header-with-images {
		display: grid;
		grid-template-columns: 100px 1fr 100px;
		align-items: center;
		gap: 15px;
		margin-bottom: 16px;
	}

	.pdf-photo {
		width: 100px;
		height: 120px;
		object-fit: cover;
		border: 2px solid #000000;
		border-radius: 4px;
	}

	.pdf-logo {
		width: 100px;
		height: 100px;
		object-fit: contain;
	}

	.pdf-photo-placeholder,
	.pdf-logo-placeholder {
		width: 100px;
		height: 100px;
		background: #f5f5f5;
	}

	.pdf-header {
		text-align: center;
		border: 3px solid var(--primary-dark);
		padding: 12px;
		background: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pdf-header h2 {
		font-family: 'Crimson Pro', serif;
		font-size: 18px;
		font-weight: 700;
		color: var(--primary-dark);
		letter-spacing: 1px;
		margin: 0;
		padding: 0;
	}

	.pdf-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 14px;
		font-size: 12px;
		color: var(--text-dark);
		padding: 0 8px;
	}

	.pdf-section-header {
		background: var(--primary-dark);
		color: var(--white);
		padding: 8px 12px;
		font-family: 'Crimson Pro', serif;
		font-size: 13px;
		font-weight: 700;
		margin: 10px 0 8px;
	}

	.pdf-field {
		margin-bottom: 6px;
		font-size: 12px;
		line-height: 1.4;
		color: var(--text-dark);
		padding: 0 8px;
	}

	.pdf-field strong {
		font-weight: 600;
		color: var(--primary-dark);
	}

	.pdf-indent {
		padding-left: 35px;
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
		font-size: 22px;
	}

	.btn-icon.spinning {
		animation: spin 1s linear infinite;
	}

	/* ============================================
	   PREVIEW SECTION STYLES - RESPONSIVE ONLY
	   ============================================ */
	.preview-wrapper {
		background: #ffffff;
		padding: 0;
		border-radius: 8px;
		overflow: hidden;
	}

	/* CLASSIC DESIGN STYLES - RESPONSIVE DISPLAY */
	.classic-container {
		background: #ffffff;
		padding: 20px;
		width: 100%;
		margin: 0;
		border: 2px solid #000000;
		font-family: Arial, sans-serif;
		font-size: 11px;
		line-height: 1.5;
	}

	.classic-header {
		text-align: center;
		border: 2px solid #000000;
		padding: 10px;
		background: #ffffff;
		margin-bottom: 12px;
	}

	.classic-header h2 {
		font-family: Arial, sans-serif;
		font-size: 18px;
		font-weight: bold;
		color: #000000;
		margin: 0;
		padding: 0;
	}

	.classic-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 12px;
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
		margin: 12px 0 8px;
	}

	.classic-row {
		margin-bottom: 4px;
		font-size: 11px;
		line-height: 1.5;
		color: #000000;
		padding: 0 8px;
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
	}

	.classic-row u {
		text-decoration: underline;
	}

	.classic-row-blank {
		height: 18px;
	}

	.classic-indent {
		padding-left: 30px;
	}

	/* MODERN DESIGN STYLES - RESPONSIVE DISPLAY */
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
		padding: 8px 12px;
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

	/* Header with images */
	.preview-header-with-images { 
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

		.country-dropdown {
			max-height: 250px;
		}

		.form-card {
			grid-template-columns: 1fr;
		}

		.job-inputs {
			flex-direction: column;
			align-items: stretch;
		}

		.job-input,
		.job-year {
			width: 100%;
		}

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

		.classic-container {
			padding: 20px;
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

		.classic-container {
			padding: 20px;
		}
	}


	.top3-grid {
		display: grid;
		gap: 12px;
	}

	.top3-grid input {
		width: 100%;
	}
</style>