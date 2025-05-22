<script lang="ts">
    import { onMount } from 'svelte';
    import { animate, scroll } from 'https://cdn.jsdelivr.net/npm/motion@12.12.0/+esm';
    import { goto } from '$app/navigation';
    import { ArrowRight } from 'lucide-svelte';
    import Icon from '@iconify/svelte';

    let items: NodeListOf<HTMLElement>;
    let imgGroupContainer: HTMLElement;
    let homeSection: HTMLElement;
    let glassmorphismImage: HTMLImageElement;

    // Text items for the text carousel
    const textItems = [
        'E-commerce',
        'Healthcare',
        'Finance',
        'Education',
        'Real Estate',
        'Logistics'
    ];
    const imageSources = [
        '/pictures/d1.png',
        '/pictures/d2.png',
        '/pictures/d3.png',
        '/pictures/d4.png',
        '/pictures/d5.png',
    ];

    onMount(() => {
        items = document.querySelectorAll('.img-container');
        imgGroupContainer = document.querySelector('.img-group-container');
        glassmorphismImage = document.querySelector('.glassmorphism-bg');
        homeSection = document.querySelector('.home-section');

        if (items.length && imgGroupContainer) {
            // Constants for image height and gap
            const imageHeight = 600; // Matches max-h-[600px] in pixels
            const gap = 40; // Gap between images in pixels
            const totalHeight = items.length * imageHeight + (items.length - 1) * gap; // Total height including gaps

            // Set the container height to match images + gaps
            imgGroupContainer.style.height = `${totalHeight}px`;

            // Animate gallery vertically during vertical scroll
            scroll(
                animate('.img-group', {
                    transform: ['none', `translateY(-${totalHeight - window.innerHeight}px)`],
                }),
                { target: imgGroupContainer }
            );

            // Progress bar representing gallery scroll
            scroll(
                animate('.progress', { scaleX: [0, 1] }),
                { target: imgGroupContainer }
            );

            // Handle background image visibility based on scroll position
            const handleBackgroundVisibility = () => {
                const homeSectionRect = homeSection.getBoundingClientRect();
                const homeBottom = homeSectionRect.bottom;

                // If we've scrolled past the home section
                if (homeBottom <= 590) {
                    glassmorphismImage.classList.remove('fixed');
                    glassmorphismImage.classList.add('absolute')
                    glassmorphismImage.classList.remove('transition-all');
                    glassmorphismImage.classList.remove('duration-900');
                } else {
                    glassmorphismImage.classList.add('fixed');
                    glassmorphismImage.classList.remove('absolute')
                    glassmorphismImage.classList.add('transition-all');
                    glassmorphismImage.classList.add('duration-900');
                }
            };

            // Listen for scroll events to handle background visibility
            window.addEventListener('scroll', handleBackgroundVisibility);

            // Initial check
            handleBackgroundVisibility();

            // Cleanup
            return () => {
                window.removeEventListener('scroll', handleBackgroundVisibility);
            };
        }
    });
</script>

<article class="home-section relative" bind:this={homeSection}>
    <img
        src="/images/glassmorphism.png"
        class="glassmorphism-bg fixed transition-all duration-900 lg:w-full h-screen object-cover -z-10"
        alt=""
        loading="lazy"
    >

    <div class="flex container">
        <section class="!sticky top-0 md:py-20 py-0 lg:py-0 lg:h-screen h-full  flex flex-col items-center justify-center lg:w-[60%] w-full z-10">
            <div class="flex flex-col items-center lg:items-start">
                <h1 class="xl:text-6xl font-sharp-bold lg:text-5xl text-3xl font-bold my-10 text-center lg:text-left !leading-tight">
                    Shape Your Ideas into Boundless Digital Experiences
                </h1>
                <p class="md:text-lg lg:w-[90%] w-full px-5 font-sharp-semibold lg:px-0 text-center lg:text-left text-sm pb-10">
                    We specialize in building dynamic, high-performing websites and mobile applications that are not only responsive but also user-friendly and strategically aligned with your business goals. We focus on creating digital platforms that enhance user engagement, streamline operations, and support your long-term business objectives.
                </p>
                <div class="flex gap-4 md:gap-10 pb-10">
                    <p class="text-[#2B3029] flex md:gap-2 items-center md:text-xl text-base font-medium">
                        <span class="text-[#276F00]">
                            <Icon icon="material-symbols:check-circle-rounded" width="24" height="24" />
                        </span>
                        On Time Delivery
                    </p>
                    <p class="text-[#2B3029] flex md:gap-2 items-center md:text-xl text-base  font-medium">
                        <span class="text-[#276F00]">
                            <Icon icon="material-symbols:check-circle-rounded" width="24" height="24" />
                        </span>
                        Client Centric
                    </p>
                </div>
                <button on:click={() => goto('/#howWeWork')} class="bg-[#0B63E5] mb-6 font-medium rounded-lg px-8 py-3 text-white">
                    Explore
                </button>
            </div>
                      <!-- Text carousel with CSS animation -->
                      <div class="text-carousel-container lg:block hidden">
                        <div class="text-carousel">
                            {#each textItems as text, index}
                                <div class="text-item">
                                    <p class="md:text-3xl text-[#949494] font-josefin text-2xl">{text}</p>
                                </div>
                            {/each}
                            {#each textItems as text, index}
                            <div class="text-item">
                                <p class="md:text-3xl text-[#949494] font-josefin text-2xl">{text}</p>
                            </div>
                        {/each}
    
                            <!-- Duplicate items for seamless looping -->
                            {#each textItems as text, index}
                                <div class="text-item">
                                    <p class="md:text-3xl text-[#949494] font-josefin text-2xl">{text}</p>
                                </div>
                            {/each}
                        </div>
                    </div>
            <div class="flex flex-col gap-10 py-5 lg:hidden">
                <!-- Image carousel inside bordered wrapper -->
                <div class="wrapper lg:hidden">
                    {#each imageSources as src, index}
                        <div class="img-item" style="--i: {index + 1}">
                            <img  loading="eager" src={src} alt={`Image ${index + 1}`} class="h-full w-full object-contain" />
                        </div>
                    {/each}
                    {#each imageSources as src, index}
                    <div class="img-item" style="--i: {index + 1}">
                        <img  loading="eager" src={src} alt={`Image ${index + 1}`} class="h-full w-full object-contain" />
                    </div>
                {/each}
                </div>
                <!-- Text carousel with CSS animation -->
                <div class="text-carousel-container">
                    <div class="text-carousel">
                        {#each textItems as text, index}
                            <div class="text-item">
                                <p class="md:text-3xl text-[#949494] font-josefin text-2xl">{text}</p>
                            </div>
                        {/each}
                        {#each textItems as text, index}
                        <div class="text-item">
                            <p class="md:text-3xl text-[#949494] font-josefin text-2xl">{text}</p>
                        </div>
                    {/each}

                        <!-- Duplicate items for seamless looping -->
                        {#each textItems as text, index}
                            <div class="text-item">
                                <p class="md:text-3xl text-[#949494] font-josefin text-2xl">{text}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </section>

        <section class="img-group-container hidden lg:block z-30 py-32 relative w-[40%]" bind:this={imgGroupContainer}>
            <div class="sticky top-0 overflow-hidden h-[100vh]">
                <ul class="img-group flex flex-col items-center justify-center gap-10">
                    {#each Array(5) as _, i}
                        <li class="img-container w-full flex items-center justify-center flex-col">
                            <img src={`/pictures/d${i + 1}.png`} class="w-full max-h-[600px] object-contain" />
                        </li>
                    {/each}
                </ul>
            </div>
        </section>
    </div>
</article>

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
    height: 20vh; /* Fixed height */
    width: 100vw; /* Fixed width */
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

    .text-carousel-container {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        margin-top: 20px;
    }

    .text-carousel {
        display: inline-flex;
        animation: scrollText 10s linear infinite;
    }

    .text-item {
        padding: 0 40px;
        display: inline-block;
    }

    @keyframes scrollText {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }

    .glassmorphism-bg {
        transition: opacity 3s ease, transform 3s ease; /* Increased duration */
        position: absolute;
        top: 0;
        left: 0;
    }

    .glassmorphism-bg.fixed {
        position: fixed;
    }

    .img-group {
        gap: 40px; /* Matches the gap constant in the script */
    }

    .img-container {
        height: 600px; /* Matches max-h-[600px] of images */
    }

    @media (max-width: 767px) {
        .home-section {
            padding-top: 80px; /* Adjust based on your header height */
        }

        .text-carousel-container {
            width: 90vw; /* Adjust width for mobile screens */
            margin: 0 auto; /* Center the container */
        }

        .text-item {
            padding: 0 10px; /* Further adjust padding for smaller screens */
        }

        .wrapper {
            height: 15vh; /* Adjust height for mobile screens */
            width: 100vw; /* Ensure full width */
        }

        .img-item {
            width: 200px; /* Adjust width for mobile screens */
        }

        .text-carousel {
            animation: scrollText 15s linear infinite; /* Adjust animation duration for mobile screens */
        }

        @keyframes scrollText {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-50%);
            }
        }
    }
</style>
