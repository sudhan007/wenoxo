<script lang="ts">
	import { writable } from 'svelte/store';

	// Track focus state for each input
	const focused = writable([false, false, false, false]); // [name, phone, email, message]

	// Track selected services
	const selectedServices = writable<string[]>([]);

	// Track selected business sectors
	const selectedSectors = writable<string[]>([]);

	// Track input values and feedback
	let name = '';
	let phone = '';
	let email = '';
	let message = '';
	let phoneError = '';
	let nameError = '';
	let emailError = '';
	let servicesError = '';
	let sectorsError = '';
	let formMessage = '';
	let formMessageType = ''; // 'success' or 'error'
	const isSubmitting = writable(false);
	
	// List of available services
	const services = [
		'Mobile App',
		'Website',
		'Cloud Application',
		'ERP Software',
		'CMS Development',
		'UI/UX Design'
	];

	// List of business sectors
	const sectors = [
		'E-commerce',
		'Education',
		'Finance',
		'Health',
		'Real Estate',
		'Logistics',
		'Other'
	];

	// Toggle selection of a service
	function toggleService(service: string) {
		selectedServices.update((current) => {
			if (current.includes(service)) {
				return current.filter((s) => s !== service);
			} else {
				return [...current, service];
			}
		});
		// Clear error when user selects a service
		if ($selectedServices.length > 0) {
			servicesError = '';
		}
	}

	// Toggle selection of a sector
	function toggleSector(sector: string) {
		selectedSectors.update((current) => {
			if (current.includes(sector)) {
				return current.filter((s) => s !== sector);
			} else {
				return [...current, sector];
			}
		});
		// Clear error when user selects a sector
		if ($selectedSectors.length > 0) {
			sectorsError = '';
		}
	}

	// Functions to update focus state
	function handleFocus(index: number) {
		$focused[index] = true;
	}

	function handleBlur(index: number) {
		$focused[index] = false;
	}

	// Validate name
	function validateName() {
		if (!name.trim()) {
			nameError = 'Please enter your name';
		} else {
			nameError = '';
		}
	}

	// Validate phone number (allow only digits)
	function validatePhone(event: Event) {
		const input = event.target as HTMLInputElement;
		const numericValue = input.value.replace(/[^0-9]/g, '');
		phone = numericValue;
		
		if (!numericValue) {
			phoneError = 'Please enter your phone number';
		} else if (numericValue.length < 10) {
			phoneError = 'Please enter a valid phone number (at least 10 digits)';
		} else {
			phoneError = '';
		}
	}

	// Validate email
	function validateEmail() {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email.trim()) {
			emailError = 'Please enter your email address';
		} else if (!emailRegex.test(email)) {
			emailError = 'Please enter a valid email address';
		} else {
			emailError = '';
		}
	}

	// Validate all fields
	function validateAllFields() {
		let isValid = true;

		// Validate name
		if (!name.trim()) {
			nameError = 'Please enter your name';
			isValid = false;
		}

		// Validate phone
		if (!phone) {
			phoneError = 'Please enter your phone number';
			isValid = false;
		} else if (phone.length < 10) {
			phoneError = 'Please enter a valid phone number (at least 10 digits)';
			isValid = false;
		}

		// Validate email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email.trim()) {
			emailError = 'Please enter your email address';
			isValid = false;
		} else if (!emailRegex.test(email)) {
			emailError = 'Please enter a valid email address';
			isValid = false;
		}

		// Validate sectors
		if ($selectedSectors.length === 0) {
			sectorsError = 'Please select at least one business sector';
			isValid = false;
		}

		// Validate services
		if ($selectedServices.length === 0) {
			servicesError = 'Please select at least one digital service';
			isValid = false;
		}

		return isValid;
	}

	// Handle form submission
	async function handleSubmit(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;

		// Clear previous form messages
		formMessage = '';

		// Validate all fields
		if (!validateAllFields()) {
			formMessage = 'Please fill in all required fields correctly.';
			formMessageType = 'error';
			return;
		}

		isSubmitting.set(true);

		const payload = {
			service_id: 'service_70nfi2e',
			template_id: 'template_hxj6cst',
			user_id: '4neAUe9l0jy_Tyrus',
			template_params: {
				name: name,
				phone: phone,
				email: email,
				message: message || 'No additional message provided',
				services: $selectedServices.join(', '),
				sectors: $selectedSectors.join(', ')
			}
		};

		try {
			// Send email using EmailJS
			const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			if (response.status === 200) {
				formMessage = 'Your message has been sent successfully!';
				formMessageType = 'success';
				form.reset();
				name = phone = email = message = '';
				selectedServices.set([]);
				selectedSectors.set([]);
				// Clear all error messages
				nameError = phoneError = emailError = servicesError = sectorsError = '';
			} else {
				formMessage = 'Failed to send message. Please try again.';
				formMessageType = 'error';
			}
		} catch (error) {
			console.error('Submission error:', error);
			formMessage = 'An error occurred. Please try again later.';
			formMessageType = 'error';
		}
		finally {
			// Reset submitting state
			isSubmitting.set(false);
		}
	}
</script>

<div class="px-4 pt-12 bg-black text-white">
	<div class="flex lg:container flex-col md:flex-row justify-between items-center">
		<div class="text-center w-full md:w-1/3 md:text-left mb-8 md:mb-0">
			<h2 class="lg:text-6xl md:text-5xl text-3xl leading-normal font-bold">Shall we get started?</h2>
		</div>
		<div class="w-full md:w-2/3">
			<form class="p-6 rounded-lg" on:submit={handleSubmit}>
				{#if formMessage}
					<p class="mb-4 text-sm {formMessageType === 'success' ? 'text-green-500' : 'text-red-500'}">
						{formMessage}
					</p>
				{/if}
				
				<div class="mb-10">
					<label class="block text-gray-400 text-sm font-bold mb-4" for="sector">
						Choose your business sector 
					</label>
					<div class="flex flex-wrap gap-2">
						{#each sectors as sector}
							<button
								type="button"
								class="py-2 px-4 rounded-full transition-colors duration-300 {$selectedSectors.includes(sector) ? 'bg-white text-black' : 'bg-gray-600/50 text-gray-400 hover:bg-gray-500/50 hover:text-white'}"
								on:click={() => toggleSector(sector)}
							>
								{sector}
							</button>
						{/each}
					</div>
					{#if sectorsError}
						<p class="text-red-500 text-xs mt-2">{sectorsError}</p>
					{/if}
				</div>
				
				<div class="mb-10">
					<label class="block text-gray-400 text-sm font-bold mb-4" for="service">
						Select the digital service that matches your requirements 
					</label>
					<div class="flex flex-wrap gap-2">
						{#each services as service}
							<button
								type="button"
								class="py-2 px-4 rounded-full transition-colors duration-300 {$selectedServices.includes(service) ? 'bg-white text-black' : 'bg-gray-600/50 text-gray-400 hover:bg-gray-500/50 hover:text-white'}"
								on:click={() => toggleService(service)}
							>
								{service}
							</button>
						{/each}
					</div>
					{#if servicesError}
						<p class="text-red-500 text-xs mt-2">{servicesError}</p>
					{/if}
				</div>
				
				<!-- Hidden input to store selected services -->
				<input
					type="hidden"
					name="services"
					value={$selectedServices.join(',')}
				/>
				<!-- Hidden input to store selected sectors -->
				<input
					type="hidden"
					name="sectors"
					value={$selectedSectors.join(',')}
				/>
				
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
					<!-- Name Input -->
					<div class="mb-4 relative">
						<input
							class="block w-full rounded-lg bg-transparent border border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 pt-4 pb-2 peer"
							id="name"
							type="text"
							name="name"
							bind:value={name}
							on:focus={() => handleFocus(0)}
							on:blur={() => { handleBlur(0); validateName(); }}
							placeholder=" "
							required
						/>
						<label
							for="name"
							class="absolute left-5 bg-black text-gray-400 text-base font-bold transition-all duration-200 transform peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-base peer-focus:text-blue-500 {$focused[0] || name ? '-top-3 text-base text-blue-500' : 'top-3 text-base'}"
						>
							Enter Your Name 
						</label>
						{#if nameError}
							<p class="text-red-500 text-xs mt-1">{nameError}</p>
						{/if}
					</div>

					<!-- Phone Input -->
					<div class="mb-4 relative">
						<input
							class="block w-full rounded-lg bg-transparent border border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 pt-4 pb-2 peer"
							id="phone"
							type="text"
							name="phone"
							bind:value={phone}
							on:input={validatePhone}
							on:focus={() => handleFocus(1)}
							on:blur={() => handleBlur(1)}
							placeholder=" "
							required
						/>
						<label
							for="phone"
							class="absolute left-5 bg-black text-gray-400 text-base font-bold transition-all duration-200 transform peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-base peer-focus:text-blue-500 {$focused[1] || phone ? '-top-3 text-base text-blue-500' : 'top-3 text-base'}"
						>
							Enter Mobile Number 
						</label>
						{#if phoneError}
							<p class="text-red-500 text-xs mt-1">{phoneError}</p>
						{/if}
					</div>

					<!-- Email Input -->
					<div class="mb-4 relative">
						<input
							class="block w-full rounded-lg bg-transparent border border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 pt-4 pb-2 peer"
							id="email"
							type="email"
							name="email"
							bind:value={email}
							on:focus={() => handleFocus(2)}
							on:blur={() => { handleBlur(2); validateEmail(); }}
							placeholder=" "
							required
						/>
						<label
							for="email"
							class="absolute left-5 bg-black text-gray-400 text-base font-bold transition-all duration-200 transform peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-base peer-focus:text-blue-500 {$focused[2] || email ? '-top-3 text-base text-blue-500' : 'top-3 text-base'}"
						>
							Enter Email 
						</label>
						{#if emailError}
							<p class="text-red-500 text-xs mt-1">{emailError}</p>
						{/if}
					</div>

					<!-- Message Textarea -->
					<div class="mb-4 relative">
						<textarea
							class="block w-full rounded-lg bg-transparent border border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 pt-3 pb-1 peer h-[50px]"
							id="message"
							name="message"
							bind:value={message}
							on:focus={() => handleFocus(3)}
							on:blur={() => handleBlur(3)}
							placeholder=" "
						></textarea>
						<label
							for="message"
							class="absolute left-5 bg-black text-gray-400 text-base font-bold transition-all duration-200 transform peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-base peer-focus:text-blue-500 {$focused[3] || message ? '-top-3 text-base text-blue-500' : 'top-3 text-base'}"
						>
							Tell us more... (optional)
						</label>
					</div>
				</div>
				
				<div class="flex items-center justify-between">
					<button
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
						type="submit"
						disabled={$isSubmitting}
					>
						{$isSubmitting ? 'Sending...' : 'Send'}
					</button>
				</div>
			</form>
		</div>
	</div>
</div>