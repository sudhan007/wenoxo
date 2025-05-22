<script lang="ts">
	import { goto } from '$app/navigation';
	import { ArrowRight } from 'lucide-svelte';
    import { onMount } from 'svelte';

    let scrollContainer: HTMLElement;
    let rightSection: HTMLElement;

    // Image sources for the carousel
    const imageSources = [
        '/pictures/d1.png',
        '/pictures/d2.png',
        '/pictures/d3.png',
        '/pictures/d4.png',
        '/pictures/d5.png',
        '/pictures/d6.png'
    ];

    // Text items for the text carousel
    const textItems = [
        'E-commerce',
        'Healthcare',
        'Finance',
        'Education',
        'Real Estate',
        'Logistics'
    ];

    onMount(() => {
        // Only apply scaling logic for desktop (lg and above)
        const isMobile = window.innerWidth < 1024; // Matches lg breakpoint
        if (!isMobile) {
            const updateImageScale = () => {
                const images = document.querySelectorAll('.right-images img');
                const viewportTop = rightSection.scrollTop;
                const viewportBottom = viewportTop + window.innerHeight;
                const viewportCenter = viewportTop + window.innerHeight / 2;

                let closestImage: HTMLImageElement | null = null;
                let minDistance = Infinity;

                images.forEach((img: HTMLImageElement) => {
                    const rect = img.getBoundingClientRect();
                    const imgTop = rect.top + rightSection.scrollTop;
                    const imgBottom = imgTop + rect.height;
                    const imgCenter = imgTop + rect.height / 2;

                    const isVisible = imgBottom > viewportTop && imgTop < viewportBottom;

                    if (isVisible) {
                        const distance = Math.abs(viewportCenter - imgCenter);
                        if (distance < minDistance) {
                            minDistance = distance;
                            closestImage = img;
                        }
                    }
                });

                images.forEach((img: HTMLImageElement) => {
                    if (img === closestImage) {
                        img.style.transform = 'scale(1.05)';
                        img.style.transition = 'transform 0.5s ease';
                    } else {
                        img.style.transform = 'scale(0.9)';
                        img.style.transition = 'transform 0.5s ease';
                    }
                });
            };

            rightSection.addEventListener('scroll', updateImageScale);
            updateImageScale();

            // Scroll handling to prioritize right section
            const handleWheel = (event: WheelEvent) => {
                const { deltaY } = event;
                const rightScrollTop = rightSection.scrollTop;
                const rightScrollHeight = rightSection.scrollHeight;
                const rightClientHeight = rightSection.clientHeight;

                const atRightTop = rightScrollTop === 0 && deltaY < 0;
                const atRightBottom = rightScrollTop + rightClientHeight >= rightScrollHeight - 1 && deltaY > 0;

                if (!atRightTop && !atRightBottom) {
                    // Scroll within right section
                    event.preventDefault();
                    rightSection.scrollTop += deltaY;
                } else {
                    // Allow container scroll only at boundaries
                    const containerScrollTop = scrollContainer.scrollTop;
                    const containerScrollHeight = scrollContainer.scrollHeight;
                    const containerClientHeight = scrollContainer.clientHeight;

                    const atContainerTop = containerScrollTop === 0 && deltaY < 0;
                    const atContainerBottom = containerScrollTop + containerClientHeight >= containerScrollHeight - 1 && deltaY > 0;

                    if (!atContainerTop && !atContainerBottom) {
                        event.preventDefault();
                        scrollContainer.scrollTop += deltaY;
                    }
                }
            };

            scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

            return () => {
                rightSection.removeEventListener('scroll', updateImageScale);
                scrollContainer.removeEventListener('wheel', handleWheel);
            };
        } else {
            // Mobile scroll handling (same as original)
            const handleWheel = (event: WheelEvent) => {
                const { deltaY } = event;
                const scrollTop = scrollContainer.scrollTop;
                const scrollHeight = scrollContainer.scrollHeight;
                const clientHeight = scrollContainer.clientHeight;

                const atTop = scrollTop === 0 && deltaY < 0;
                const atBottom = scrollTop + clientHeight >= scrollHeight && deltaY > 0;

                if (atTop || atBottom) {
                    return;
                } else {
                    event.preventDefault();
                    scrollContainer.scrollTop += deltaY;
                }
            };

            scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

            return () => {
                scrollContainer.removeEventListener('wheel', handleWheel);
            };
        }
    });
</script>

<svelte:head>
    <script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

<div bind:this={scrollContainer} class="scroll-container lg:min-h-[100dvh] pt-10 lg:max-h-[100dvh] flex lg:overflow-y-auto snap-y snap-mandatory">
    <div class="left-section lg:w-1/2 w-full text-gray-900 lg:px-12 px-5 flex flex-col lg:justify-between">
        <div class="flex flex-col items-center lg:items-start">
            <h1 class="xl:text-6xl font-josefin lg:text-5xl text-4xl font-bold my-10 text-center lg:text-left !leading-tight">Shape Your Ideas into Boundless Digital Experiences</h1>
           <p class="md:text-lg px-5 font-sharp-semibold lg:px-0 text-center lg:text-left   text-base pb-10">
            We specialize in building dynamic, high-performing websites and mobile applications that are not only responsive but also user-friendly and strategically aligned with your business goals. We focus on creating digital platforms that enhance user engagement, streamline operations, and support your long-term business objectives.
           </p>
            <p
            on:click={()=>{goto('/#howWeWork')}}
			class="group relative flex cursor-pointer items-center gap-2 overflow-hidden rounded-full bg-indigo-200 px-6 py-2 text-lg mt-5 md:mt-0 w-fit"
		>
			<span
				class="group-hover:animate-fallIn relative z-10 transition-all duration-300 group-hover:text-white"
			>
				Explore
			</span>
			<span
				class="group-hover:animate-fallIn relative z-10 transition-all duration-300 group-hover:text-white"
			>
				<ArrowRight size={20} />
			</span>

			<!-- Flow effect -->
			<span
				class="absolute inset-0 origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100"
			></span>
		</p>
        </div>

        <div class="flex flex-col gap-10 lg:pb-56 py-20">
            <div class="flex flex-col gap-10 lg:hidden">
                <!-- Image carousel inside bordered wrapper -->
                <div class="wrapper lg:hidden">
                    {#each imageSources as src, index}
                        <div class="img-item" style="--i: {index + 1}">
                            <img  loading="eager" src={src} alt={`Image ${index + 1}`} class="h-full w-full object-contain" />
                        </div>
                    {/each}
            
                </div>
            </div>

            <!-- Text carousel with CSS animation -->
            <div class="text-wrapper">
                {#each textItems as text, index}
                    <div class="text-item" style="--i: {index + 1}">
                        <p class="md:text-3xl font-josefin text-xl">{text}</p>
                    </div>
                {/each}
                {#each textItems as text, index}
                <div class="text-item" style="--i: {index + 1}">
                    <p class="md:text-3xl font-josefin text-xl">{text}</p>
                </div>
            {/each}
            {#each textItems as text, index}
            <div class="text-item" style="--i: {index + 1}">
                <p class="md:text-3xl font-josefin text-xl">{text}</p>
            </div>
        {/each}
            </div>
        </div>
    </div>

    <div bind:this={rightSection} class="right-section w-1/2 hidden lg:block lg:overflow-y-auto relative">
        <div class="image-background absolute inset-0 -z-10"></div>
        <div class="right-images flex flex-col gap-5 items-center p-5">
            <img src="/pictures/d1.png" alt="Image 1" class="w-full max-h-[450px] object-contain mb-5 rounded-lg">
            <img src="/pictures/d2.png" alt="Image 2" class="w-full max-h-[550px] object-contain mb-5 rounded-lg">
            <img src="/pictures/d3.png" alt="Image 3" class="w-full max-h-[550px] object-contain mb-5 rounded-lg">
            <img src="/pictures/d4.png" alt="Image 4" class="w-full max-h-[450px] object-contain mb-5 rounded-lg">
            <img src="/pictures/d5.png" alt="Image 5" class="w-full max-h-[550px] object-contain mb-5 rounded-lg">
            <img src="/pictures/d6.png" alt="Image 6" class="w-full max-h-[550px] object-contain mb-5 rounded-lg">
        </div>
        <div class="py-16">

        </div>
    </div>

    <div id="end"></div>
</div>

<style>
  :root {
    --duration: 10s; /* Duration for image animation */
    --totalitems: 5; /* Number of unique image items */
    --text-duration: 8s; /* Duration for text animation */
    --totaltextitems: 6; /* Number of unique text items */
    --image-width: 250px; /* Fixed width for images */
}

.wrapper {
    position: relative;
    display: flex;
    height: 10vw; /* Fixed height */
    width: 50vw; /* Fixed width */
    overflow: hidden;
    margin: 0 auto; /* Center the wrapper */
}

.img-item {
    position: absolute;
    height: inherit;
    width: var(--image-width); /* Fixed width */
    left: 100%; /* Start off-screen to the right */
    animation: scrollX var(--duration) linear infinite;
    animation-delay: calc(var(--duration) / var(--totalitems) * var(--i));
}

@keyframes scrollX {
    to {
        left: calc(-100% - var(--image-width)); /* Move to off-screen left */
    }
}

.img-item img {
    height: 100%;
    left: 0;
    width: 100%; /* Fill the fixed width */
    object-fit: cover; /* Ensure image fills the area */
}

.text-wrapper {
    position: relative;
    display: flex;
    height: 3rem; /* Fixed height for text */
    width: 50vw; /* Match wrapper width */
    overflow: hidden;
    margin: 0 auto; /* Center the text wrapper */
}

.text-item {
    position: absolute;
    height: inherit;
    width: 200px; /* Fixed width for text items */
    left: calc(-1 * 200px * var(--totaltextitems)); /* Start off-screen to the left */
    display: flex;
    align-items: center;
    animation: scrollText var(--text-duration) linear infinite;
    animation-delay: calc(var(--text-duration) / var(--totaltextitems) * var(--i));
}

@keyframes scrollText {
    to {
        left: 100%; /* Move to off-screen right */
    }
}

.scroll-container {
    scroll-snap-type: y mandatory;
}

.left-section {
    position: sticky;
    top: 0;
    height: 100vh;
    flex-shrink: 0;
}

.right-section {
    flex-grow: 1;
}

.right-images img {
    transform-origin: center;
}

.image-background {
    width: 100%;
    height: 100%;
}

@media (max-width: 1023px) {
    .scroll-container {
        min-height: auto;
        max-height: none;
        overflow-y: auto;
        flex-direction: column;
    }

    .left-section {
        position: relative;
        height: auto;
        width: 100%;
    }

    .right-section {
        display: none;
    }

    .wrapper {
        width: 100vw;
        height: 150px;
        overflow: hidden;
        position: relative;
    }

    .img-item {
        width: var(--image-width);
        height: 100%;
        position: absolute;

        will-change: transform; /* Optimize for animation */
    }

    .img-item img {
        width: 100%;
        height: 100%;
        object-fit: contain; /* Ensure images maintain aspect ratio */
        display: block;
    }

    @keyframes scrollX {
        to {
            left: calc(-100% - var(--image-width)); /* Move to off-screen left */
        }
    }

    .text-wrapper {
        width: 90vw; /* Wider on mobile */
        height: 2.5rem; /* Slightly smaller for mobile */
    }

    .text-item {
        left: calc(-1 * 200px * var(--totaltextitems)); /* Start off-screen to the left */
    }

    @keyframes scrollText {
        to {
            left: 100%; /* Move to off-screen right */
        }
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    .wrapper {
        width: 80vw; /* Slightly narrower for medium screens */
        height: 120px; /* Adjusted height for medium screens */
    }

    .text-wrapper {
        width: 80vw; /* Match wrapper width */
    }
}

</style>