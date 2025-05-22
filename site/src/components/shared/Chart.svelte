<script lang="ts">
    import { writable } from 'svelte/store';

    interface Point {
        label: string;
        isMain: boolean;
    }

    const hoveredCircle = writable(-1);

    const circleData = [
        {
            points: [
                { label: "Deployment", isMain: false },
                { label: "Monitoring", isMain: false },
                { label: "Launch", isMain: true },
                { label: "Support", isMain: false },
                { label: "", isMain: false },

            ]
        },
        {
            points: [
                { label: "Front-End Development,", isMain: false },
                { label: "", isMain: false },
                { label: "Backend Development", isMain: false },
                { label: "Build", isMain: true },
                { label: "", isMain: false },
                { label: "Testing", isMain: false },
                { label: "Quality Assurance", isMain: false },

            ]
        },
        {
            points: [
                { label: "Information Architecture", isMain: false },
                { label: "Wireframe", isMain: false },
                { label: "", isMain: false },
                { label: "Design", isMain: true },
                { label: "Visual Design", isMain: false },
                { label: "Prototype", isMain: false },
                { label: "Test", isMain: false },
 
            ]
        },
        {
            points: [
                { label: "Discover", isMain: true },
                { label: "Business Goals", isMain: false },
                { label: "User Requirements", isMain: false },
                { label: "", isMain: false },
                { label: "Market Research", isMain: false },
                
            ]
        }
    ];

    function getPointPosition(point: Point, index: number, total: number, circleIndex: number): { x: number; y: number } {
        // If it's the main point, place it in the center of its circle
        if (point.isMain) {
            return {
                x: 20, // Center X
                y: 90  // Center Y
            };
        }
        
        // For non-main points, distribute them evenly around the circle
        // First, count how many non-main points we have
        const nonMainPoints = circleData[circleIndex].points.filter(p => !p.isMain).length;
        
        // Find the position of this point among non-main points
        const nonMainIndex = circleData[circleIndex].points.filter((p, i) => !p.isMain && i < index).length;
        
        // Calculate angle based on position among non-main points
        const angle = (nonMainIndex * 1.8 * Math.PI) / nonMainPoints;
        
        // Calculate radius based on circle size
        const radius = 50; // Percentage of circle radius
        
        return {
            x: 50 + radius * Math.cos(angle), // Center X + offset
            y: 50 + radius * Math.sin(angle)  // Center Y + offset
        };
    }

    function handleCircleHover(index: number) {
        $hoveredCircle = index;
    }

    function handleCircleLeave() {
        $hoveredCircle = -1;
    }

    $: isPointVisible = (point: Point, circleIndex: number) => point.isMain || $hoveredCircle === circleIndex;
</script>

<div class="w-full max-w-[525px]">
    <div class="relative w-full pb-[100%]">
        <!-- Base circle background -->
        <div class="absolute inset-0 rounded-full bg-[#f4f4f4]"></div>

        {#each circleData as circle, circleIndex}
            <!-- Individual Circle -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div 
                class="circle circle-{circleIndex + 1}"
                on:mouseenter={() => handleCircleHover(circleIndex)}
                on:mouseleave={handleCircleLeave}
            >
                <div class="w-full h-full rounded-full" style="background-color: {['#eee', '#e1e1e1', '#f4f4f4','#fff'][circleIndex]};"></div>
                {#each circle.points as point, pointIndex}
                    {@const position = getPointPosition(point, pointIndex, circle.points.length, circleIndex)}
                    {#if isPointVisible(point, circleIndex)}
                        <div
                            class="absolute transition-all duration-400"
                            style="left: {position.x}%; top: {position.y}%; transform: translate(-50%, -50%);"
                        >
                            <div class={`relative ${point.isMain ? 'w-3 h-3' : 'w-1 h-1'} z-50`}>
                                <div class={`absolute w-full h-full rounded-full ${
                                    point.isMain ? 'bg-blue-500 animate-pulse' : 
                                    point.label === "" ? 'bg-transparent' : 'bg-black'
                                }`}></div>
                                <span class={`${$hoveredCircle===circleIndex?'text-black':'text-gray-500'} absolute z-50 whitespace-nowrap  text-sm font-semibold text-black left-4 top-1/2 transform -translate-y-1/2`}>
                                    {point.label}
                                </span>
                            </div>
                        </div>
                    {/if}
                {/each}
            </div>
        {/each}
    </div>
</div>

<style>
    .circle {
        position: absolute;
        right: 0;
        top: 0;
        transition: all 0.4s;
        cursor: pointer;
        width: 100%;
        height: 100%;
    }

    .circle-1 {
        width: 88%;
        height: 88%;
        right: 3%;
        top: 1%;
    }

    .circle-2 {
        width: 70%;
        height: 70%;
        right: 7%;
        top: 3%;
    }

    .circle-3 {
        width: 50%;
        height: 50%;
        top: 6%;
        right: 9%;
    }
    .circle-4 {
        width: 25%;
        height: 25%;
        top: 9%;
        right: 14%;
    }

    .animate-pulse {
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(27, 118, 255, 0.15);
        }
        70% {
            box-shadow: 0 0 0 20px rgba(27, 118, 255, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(27, 118, 255, 0);
        }
    }
</style>