<script>
    import { onMount, onDestroy } from "svelte";
    
    let x = 1, y = 1;
    let targetX = 1, targetY = 1;
    
    const moveCursor = (event) => {
        targetX = event.clientX;
        targetY = event.clientY;
    };

    // Function to smoothly interpolate between old and new positions
    const smoothMove = () => {
        x += (targetX - x) * 0.5; // Adjust 0.1 for more or less delay
        y += (targetY - y) * 0.5;

        requestAnimationFrame(smoothMove); // Continuously update
    };

    onMount(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("mousemove", moveCursor);
            smoothMove(); // Start smooth animation loop
        }
    });

    onDestroy(() => {
        if (typeof window !== "undefined") {
            window.removeEventListener("mousemove", moveCursor);
        }
    });
</script>

<style>
    .custom-cursor {
        position: fixed;
        width: 9px;
        height: 9px;
        background-color: #037bf3; /* Blue color */
        border-radius: 50%;
        pointer-events: none; /* So it doesn't block clicks */
        transform: translate(-50%, -50%);
        z-index: 9999; /* Always on top */
        transition: transform 0.1s linear; /* Smooth delay */
    }
</style>

<div class="custom-cursor" style="left: {x}px; top: {y}px;"></div>
