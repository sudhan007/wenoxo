<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    interface CardState {
        progress: number; // -1 to 1, based on scroll position
    }

    let cardStates = $state<CardState[]>(Array(4).fill({ progress: 0 }));
    let rafId: number | null = null;
    let isMobile = false;

    onMount(() => {
        if (!browser) return; // Skip during SSR

        const cards = document.querySelectorAll('.card');
        let windowHeight = window.innerHeight || 600; // Fallback for SSR
        let windowWidth = window.innerWidth || 1024; // Fallback for SSR
        
        // Set initial mobile state
        isMobile = windowWidth < 768;

        const updateCardStates = () => {
            const scrollY = window.scrollY;
            isMobile = windowWidth < 768;
            
            // Adjust these values for better mobile visibility
            const margin = isMobile ? windowHeight * 0.05 : windowHeight * 0.1;
            const startPoint = isMobile ? windowHeight * 1 : windowHeight * 0.9;
            const endPoint = isMobile ? windowHeight * 0.5 : windowHeight * 0.4;
            const animationRange = startPoint - endPoint;

            cardStates = Array.from(cards).map((card) => {
                const rect = card.getBoundingClientRect();
                const cardTop = rect.top;

                // Progress: -1 (above viewport), 0 (center), 1 (below viewport)
                let progress = 1 - (cardTop - endPoint) / animationRange;
                progress = Math.max(-1, Math.min(1, progress));

                return { progress };
            });

            rafId = null;
        };

        const handleScroll = () => {
            if (!rafId) {
                rafId = requestAnimationFrame(updateCardStates);
            }
        };

        const handleResize = () => {
            windowHeight = window.innerHeight || 600;
            windowWidth = window.innerWidth || 1024;
            isMobile = windowWidth < 768;
            updateCardStates();
        };

        // Initial calculation with a small delay to ensure DOM is ready
        setTimeout(updateCardStates, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
            if (rafId) cancelAnimationFrame(rafId);
        };
    });

    function easeOutCubic(x: number): number {
        return 1 - Math.pow(1 - x, 3); // Slightly less aggressive easing for mobile
    }
    
    // Helper function to get transform based on device and card state
    function getCardTransform(progress: number, index: number): string {
        const isEven = index % 2 === 0;
        
        if (browser && isMobile) {
            // More subtle animation for mobile
            const translateX = (1 - Math.abs(progress)) * (isEven ? -4 : 4);
            const scale = 0.95 + easeOutCubic(Math.abs(progress)) * 0.05;
            const rotate = (1 - Math.abs(progress)) * (isEven ? -2 : 2);
            
            return `translateX(${translateX}rem) scale(${scale}) rotate(${rotate}deg)`;
        } else {
            // Regular animation for desktop
            const translateX = (1 - Math.abs(progress)) * (isEven ? -20 : 20);
            const scale = 0.9 + easeOutCubic(Math.abs(progress)) * 0.1;
            const rotate = (1 - Math.abs(progress)) * (isEven ? -8 : 8);
            
            return `translateX(${translateX}rem) scale(${scale}) rotate(${rotate}deg)`;
        }
    }
</script>

<section class="grid grid-cols-1 lg:grid-cols-2 mt-10 px-4 sm:px-6 md:px-8 lg:px-16 lg:gap-x-6 gap-y-1 md:gap-y-10 lg:gap-y-12 lg:w-5/6 md:w-3/4 w-5/6 mx-auto">
    {#each cardStates as state, i}
        <div
            class="card w-full p-6 sm:p-8 md:p-10 lg:p-12 py-10 sm:py-12 md:py-16 lg:py-20 relative rounded-3xl shadow-lg bg-white will-change-transform"
            class:even={i % 2 === 0}
            class:odd={i % 2 !== 0}
            data-index={i}
            style="opacity: {easeOutCubic(Math.abs(state.progress))};
                   transform: {getCardTransform(state.progress, i)};"
        >
            <div class="card-content relative z-10">
                <div>
                    {#if i === 0}
                        <p
                            class="absolute w-fit p-2 sm:p-3 -top-10 sm:-top-12 md:-top-16 -right-2 sm:-right-3 md:-right-5 text-sm sm:text-base md:text-lg rounded-full bg-blue-100 border-gradient-to-r from-[#f8a5c2] to-[#f58b8c]"
                        >
                            Projects Delivered
                        </p>
                    {:else if i === 1}
                        <p
                            class="absolute w-fit p-2 sm:p-3 -top-10 sm:-top-12 md:-top-16 -right-2 sm:-right-3 md:-right-5 text-sm sm:text-base md:text-lg rounded-full bg-orange-100 border-gradient-to-r from-[#f8a5c2] to-[#f58b8c]"
                        >
                            Years Experience
                        </p>
                    {:else if i === 2}
                        <p
                            class="absolute w-fit p-2 sm:p-3 -top-10 sm:-top-12 md:-top-16 -right-2 sm:-right-3 md:-right-5 text-sm sm:text-base md:text-lg rounded-full bg-pink-100"
                        >
                            Industry Expertise
                        </p>
                    {:else}
                        <p
                            class="absolute w-fit p-2 sm:p-3 -top-10 sm:-top-12 md:-top-16 -right-2 sm:-right-3 md:-right-5 text-sm sm:text-base md:text-lg rounded-full bg-indigo-200 border-gradient-to-r from-[#f8a5c2] to-[#f58b8c]"
                        >
                            Satisfied Clients
                        </p>
                    {/if}
                </div>

                <p
                    class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-6 sm:mt-8 font-bold text-gray-900"
                >
                    {i === 0 ? '300' : i === 1 ? '12+' : i === 2 ? '10+' : '150'}
                </p>
                <p class="text-sm sm:text-base md:text-lg pt-6 sm:pt-8 md:pt-10 text-gray-600">
                    {i === 0
                        ? 'Successful projects completed'
                        : i === 1
                            ? 'Years of hands-on experience'
                            : i === 2
                                ? 'Industries of Expertise'
                                : 'Clients across diverse industries'}
                </p>
            </div>
        </div>
    {/each}
</section>

<style>
    section {
        scroll-behavior: smooth;
        perspective: 1000px;
    }

    .card {
        overflow: hidden;
        position: relative;
        backface-visibility: hidden;
        transition: opacity 0.3s ease-out, transform 0.3s ease-out;
    }

    .card.even {
        margin-bottom: 2rem;
    }

    .card.odd {
        margin-top: 2rem;
    }

    .card::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: conic-gradient(transparent, rgba(84, 84, 85, 0.4), transparent 30%);
        animation: rotate 2s linear infinite;
        pointer-events: none;
    }

    .card::after {
        content: '';
        position: absolute;
        inset: 1px;
        background: white;
        border-radius: 1.5rem;
        pointer-events: none;
    }

    @keyframes rotate {
        100% {
            transform: rotate(1turn);
        }
    }

    @media (max-width: 767px) {
        .card.even,
        .card.odd {
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
        
        /* Add specific mobile optimizations */
        .card {
            transition: opacity 0.25s ease-out, transform 0.25s ease-out;
        }
    }
</style>