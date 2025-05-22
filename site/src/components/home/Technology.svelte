<script>
	let images = [
	  "https://a.storyblok.com/f/206664/600x600/3b7fc0937b/short-06-min.jpg/m/120x120/smart/filters:quality(95)",
	  "https://a.storyblok.com/f/206664/600x600/3b7fc0937b/short-06-min.jpg/m/120x120/smart/filters:quality(95)",
	  "Pratap.png",
	  "/Pressup.png",
	  "/Greentech.png",
	  "https://a.storyblok.com/f/206664/600x600/3b7fc0937b/short-06-min.jpg/m/120x120/smart/filters:quality(95)",
	  "https://a.storyblok.com/f/206664/600x600/3b7fc0937b/short-06-min.jpg/m/120x120/smart/filters:quality(95)"
	];
  
	// Optional - props for customization
	export let mainImageIndex = 3; // Index of the main/center image
	export let overlapAmount = "60%"; // How much cards should overlap
	export let tiltAngle = 55; // Tilt angle in degrees
	export let scaleDecrease = 0.15; // Decrease in scale for each consecutive image
	export let hoverScaleDecrease = 0.11; 
	export let hoverTiltAngle = 0; // Tilt angle on hover
	export let hoverOverlapAmount = "40%"; // Overlap amount on hover
  
	let isHovering = false;
  </script>
  
  <div class="cards-container">
	{#each images as src, i}
	  <!-- svelte-ignore a11y-no-static-element-interactions -->
	  <div
		class="card"
		style="
		  z-index: {i === mainImageIndex ? images.length + 1 : images.length - Math.abs(i - mainImageIndex)};
		  transform:
			translateX(calc({i - mainImageIndex} * (110% - {isHovering ? hoverOverlapAmount : overlapAmount})))
			rotateY({i < mainImageIndex ? (isHovering ? hoverTiltAngle : tiltAngle) : i > mainImageIndex ? (isHovering ? -hoverTiltAngle : -tiltAngle) : 0}deg)
			scale({1 - Math.abs(i - mainImageIndex) * (isHovering? hoverScaleDecrease:scaleDecrease)});
		"
		class:main-card={i === mainImageIndex}
		on:mouseenter={() => (isHovering = true)}
		on:mouseleave={() => (isHovering = false)}
	  >
		<img src={src} alt="Card image {i+1}" />
	  </div>
	{/each}
  </div>
  
  <style>
	.cards-container {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  height: 350px;
	  position: relative;
	  width: 100%;
	  padding: 40px 0;
	  perspective: 1000px;
	}
  
	.card {
	  position: absolute;
	  width: 270px;
	  height: 270px;
	  border-radius: 30px;
	  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
	  overflow: hidden;
	  transition: all 0.4s ease;
	  background-color: white;
	}
  
	.card img {
	  width: 100%;
	  height: 100%;
	  object-fit: cover;
	}
  
	.main-card {
	  width: 270px;
	  height: 270px;
	  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
	}
  </style>
  