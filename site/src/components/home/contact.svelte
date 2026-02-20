<script lang="ts">
	import { writable } from 'svelte/store';
	import { toast } from 'svelte-sonner';

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
	let formMessageType = '';
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
			return false;
		}
		nameError = '';
		return true;
	}

	// Validate phone number (allow only digits)
	function validatePhone(event: Event) {
		const input = event.target as HTMLInputElement;
		const numericValue = input.value.replace(/[^0-9]/g, '');
		phone = numericValue;

		if (!numericValue) {
			phoneError = 'Please enter your phone number';
			return false;
		} else if (numericValue.length < 10) {
			phoneError = 'Please enter a valid phone number (at least 10 digits)';
			return false;
		}
		phoneError = '';
		return true;
	}

	// Validate email
	function validateEmail() {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email.trim()) {
			emailError = 'Please enter your email address';
			return false;
		} else if (!emailRegex.test(email)) {
			emailError = 'Please enter a valid email address';
			return false;
		}
		emailError = '';
		return true;
	}

	// Validate all fields
	function validateAllFields() {
		const isNameValid = validateName();
		const isPhoneValid = validatePhone({ target: { value: phone } } as Event);
		const isEmailValid = validateEmail();
		const isServicesValid = $selectedServices.length > 0;
		const isSectorsValid = $selectedSectors.length > 0;

		if (!isServicesValid) {
			servicesError = 'Please select at least one digital service';
		}
		if (!isSectorsValid) {
			sectorsError = 'Please select at least one business sector';
		}

		return isNameValid && isPhoneValid && isEmailValid && isServicesValid && isSectorsValid;
	}

	// Handle form submission
	async function handleSubmit(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;

		// Clear previous form messages
		formMessage = '';

		// Validate all fields
		if (!validateAllFields()) {
			toast.error('Please fill in all required fields correctly.');
			return;
		}

		isSubmitting.set(true);

		const formData = new FormData();
		formData.append('name', name);
		formData.append('phone', phone);
		formData.append('email', email);
		formData.append('message', message || 'No additional message provided');
		formData.append('services', $selectedServices.join(', '));
		formData.append('sectors', $selectedSectors.join(', '));

		try {
			const response = await fetch('/api/send-email', {
				method: 'POST',
				body: formData
			});

			const responseData = await response.json();

			if (response.ok) {
				toast.success(
					'Your message has been sent successfully! You will receive a confirmation email shortly.'
				);
				form.reset();
				name = phone = email = message = '';
				selectedServices.set([]);
				selectedSectors.set([]);
				nameError = phoneError = emailError = servicesError = sectorsError = '';
				formMessage = 'Your message has been sent successfully!';
				formMessageType = 'success';
			} else {
				console.error('Server response:', responseData);
				toast.error(
					responseData.error || 'Failed to send email. Please check console for details.'
				);
				formMessage = 'Failed to send message. Please try again.';
				formMessageType = 'error';
			}
		} catch (error) {
			console.error('Submission error:', error);
			toast.error('An error occurred while sending the email.');
			formMessage = 'An error occurred. Please try again later.';
			formMessageType = 'error';
		} finally {
			isSubmitting.set(false);
		}
	}
</script>

<div class="bg-black px-4 pt-12 text-white">
	<div class="flex flex-col items-center justify-between lg:container md:flex-row">
		<div class="mb-8 w-full text-center md:mb-0 md:w-1/3 md:text-left">
			<h2 class="text-3xl font-bold leading-normal md:text-5xl lg:text-6xl">
				Shall we get started?
			</h2>
		</div>
		<div class="w-full md:w-2/3">
			<form class="rounded-lg p-6" on:submit={handleSubmit}>
				{#if formMessage}
					<p
						class="mb-4 text-sm {formMessageType === 'success' ? 'text-green-500' : 'text-red-500'}"
					>
						{formMessage}
					</p>
				{/if}

				<div class="mb-10">
					<label class="mb-4 block text-sm font-bold text-gray-400" for="sector">
						Choose your business sector
					</label>
					<div class="flex flex-wrap gap-2">
						{#each sectors as sector}
							<button
								type="button"
								class="rounded-full px-4 py-2 transition-colors duration-300 {$selectedSectors.includes(
									sector
								)
									? 'bg-white text-black'
									: 'bg-gray-600/50 text-gray-400 hover:bg-gray-500/50 hover:text-white'}"
								on:click={() => toggleSector(sector)}
								disabled={$isSubmitting}
							>
								{sector}
							</button>
						{/each}
					</div>
					{#if sectorsError}
						<p class="mt-2 text-xs text-red-500">{sectorsError}</p>
					{/if}
				</div>

				<div class="mb-10">
					<label class="mb-4 block text-sm font-bold text-gray-400" for="service">
						Select the digital service that matches your requirements
					</label>
					<div class="flex flex-wrap gap-2">
						{#each services as service}
							<button
								type="button"
								class="rounded-full px-4 py-2 transition-colors duration-300 {$selectedServices.includes(
									service
								)
									? 'bg-white text-black'
									: 'bg-gray-600/50 text-gray-400 hover:bg-gray-500/50 hover:text-white'}"
								on:click={() => toggleService(service)}
								disabled={$isSubmitting}
							>
								{service}
							</button>
						{/each}
					</div>
					{#if servicesError}
						<p class="mt-2 text-xs text-red-500">{servicesError}</p>
					{/if}
				</div>

				<!-- Hidden inputs to store selected services and sectors -->
				<input type="hidden" name="services" value={$selectedServices.join(',')} />
				<input type="hidden" name="sectors" value={$selectedSectors.join(',')} />

				<div class="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
					<!-- Name Input -->
					<div class="relative mb-4">
						<input
							class="peer block w-full appearance-none rounded-lg border border-gray-500 bg-transparent pb-2 pt-4 focus:border-blue-500 focus:outline-none focus:ring-0"
							id="name"
							autocomplete="off"
							type="text"
							name="name"
							bind:value={name}
							on:focus={() => handleFocus(0)}
							on:blur={() => {
								handleBlur(0);
								validateName();
							}}
							placeholder=" "
							required
							disabled={$isSubmitting}
						/>
						<label
							for="name"
							class="absolute left-5 transform bg-black text-base font-bold text-gray-400 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-base peer-focus:text-blue-500 {$focused[0] ||
							name
								? '-top-3 text-base text-blue-500'
								: 'top-3 text-base'}"
						>
							Enter Your Name
						</label>
						{#if nameError}
							<p class="mt-1 text-xs text-red-500">{nameError}</p>
						{/if}
					</div>

					<!-- Phone Input -->
					<div class="relative mb-4">
						<input
							class="peer block w-full appearance-none rounded-lg border border-gray-500 bg-transparent pb-2 pt-4 focus:border-blue-500 focus:outline-none focus:ring-0"
							id="phone"
							autocomplete="off"
							type="text"
							name="phone"
							bind:value={phone}
							on:input={validatePhone}
							on:focus={() => handleFocus(1)}
							on:blur={() => handleBlur(1)}
							placeholder=" "
							required
							disabled={$isSubmitting}
						/>
						<label
							for="phone"
							class="absolute left-5 transform bg-black text-base font-bold text-gray-400 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-base peer-focus:text-blue-500 {$focused[1] ||
							phone
								? '-top-3 text-base text-blue-500'
								: 'top-3 text-base'}"
						>
							Enter Mobile Number
						</label>
						{#if phoneError}
							<p class="mt-1 text-xs text-red-500">{phoneError}</p>
						{/if}
					</div>

					<!-- Email Input -->
					<div class="relative mb-4">
						<input
							class="peer block w-full appearance-none rounded-lg border border-gray-500 bg-transparent pb-2 pt-4 focus:border-blue-500 focus:outline-none focus:ring-0"
							id="email"
							type="email"
							autocomplete="off"
							name="email"
							bind:value={email}
							on:focus={() => handleFocus(2)}
							on:blur={() => {
								handleBlur(2);
								validateEmail();
							}}
							placeholder=" "
							required
							disabled={$isSubmitting}
						/>
						<label
							for="email"
							class="absolute left-5 transform bg-black text-base font-bold text-gray-400 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-base peer-focus:text-blue-500 {$focused[2] ||
							email
								? '-top-3 text-base text-blue-500'
								: 'top-3 text-base'}"
						>
							Enter Email
						</label>
						{#if emailError}
							<p class="mt-1 text-xs text-red-500">{emailError}</p>
						{/if}
					</div>

					<!-- Message Textarea -->
					<div class="relative mb-4">
						<textarea
							class="peer block h-[50px] w-full appearance-none rounded-lg border border-gray-500 bg-transparent pb-1 pt-3 focus:border-blue-500 focus:outline-none focus:ring-0"
							id="message"
							name="message"
							bind:value={message}
							on:focus={() => handleFocus(3)}
							on:blur={() => handleBlur(3)}
							placeholder=" "
							disabled={$isSubmitting}
						></textarea>
						<label
							for="message"
							class="absolute left-5 transform bg-black text-base font-bold text-gray-400 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-base peer-focus:text-blue-500 {$focused[3] ||
							message
								? '-top-3 text-base text-blue-500'
								: 'top-3 text-base'}"
						>
							Tell us more... (optional)
						</label>
					</div>
				</div>

				<div class="flex items-center justify-between">
					<button
						class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
