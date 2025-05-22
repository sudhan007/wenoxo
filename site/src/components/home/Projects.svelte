<script lang="ts">
  import { onMount } from 'svelte';

  let scrollPosition = 90;
  let handFixed = false;
  let handStyle = '';
  let firstRowElement: HTMLElement | null = null;
  let thirdRowElement: HTMLElement | null = null;
  let handElement: HTMLElement | null = null;

  const getDynamicOffset = () => {
    const width = window.innerWidth;
    if (width >= 1600) return 90;
    if (width >= 1124) return 60;
    if (width >= 991) return 70;
    if (width >= 768) return 0;
    return 10;
  };
  const getDynamicOffset2 = () => {
    const width = window.innerWidth;
    if (width >= 1600) return 0;
    if (width >= 1124) return 0;
    if (width >= 991) return -90;
    if (width >= 768) return 0;
    return 10;
  };
  onMount(() => {
    // Get references to DOM elements
    firstRowElement = document.querySelector('.first-row');
    thirdRowElement = document.querySelectorAll('.grid-row')[2]; // Third row
    handElement = document.querySelector('.development_dev_hand__1L3Gd');

    const handleScroll = () => {
      scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const dynamicOffset = getDynamicOffset();
      const dynamicOffset2 = getDynamicOffset2();
      if (!firstRowElement || !thirdRowElement || !handElement) return;

      const handHeight = handElement.offsetHeight;
      const firstRowRect = firstRowElement.getBoundingClientRect();
      const thirdRowRect = thirdRowElement.getBoundingClientRect();

      const firstRowTop = firstRowRect.top + scrollPosition - dynamicOffset;
      const firstRowBottom = firstRowRect.bottom + scrollPosition;
      const thirdRowTop = thirdRowRect.top + scrollPosition - dynamicOffset2 ;
      const thirdRowBottom = thirdRowRect.bottom + scrollPosition;

      // Initial state - hand aligns with first row
      if (scrollPosition < firstRowTop) {
        handFixed = false;
        // Position the hand at the bottom of the viewport initially
        handStyle = `position: absolute; bottom: 0px; top: ${dynamicOffset}px;`;
      }
      // Hand becomes fixed when first row bottom crosses viewport bottom
      else if (scrollPosition < thirdRowTop - dynamicOffset) {
        // Check if first row bottom has crossed viewport bottom
        if (firstRowBottom < scrollPosition + windowHeight) {
          handFixed = true;
          // Keep the hand fixed to the bottom of the viewport
          handStyle = `position: fixed; bottom: 0px; top: auto;`;
        } else {
          // Still aligned with first row
          handFixed = false;
          handStyle = `position: absolute; bottom: 0px; top: auto;`;
        }
      }
      // Hand reaches third row - stick to third row
      else {
        handFixed = false;
        // Position the hand relative to the third row
        // This ensures the hand stays with the third row as it scrolls out of view
        handStyle = `position: absolute; top: ${thirdRowTop - firstRowTop}px; bottom: auto;`;
      }

      // Apply the style to the hand element
      handElement.style.cssText = handStyle;
    };

    // Initial call and event listeners
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  });
</script>

<!-- Section Container -->
<section class="development_dev__mvT8y">
  <!-- Hand and Video Overlay -->
  <div class="development_dev_hand_wrapper__yXHKJ">
    <div class="development_dev_hand__1L3Gd" style={handStyle}>
      <img
        alt="hand holding phone"
        decoding="async"
        class="development_dev_hand_image__s8v9J"
        style="position: absolute; height: 100%; width: 100%; left: 0; right: 0; top: 0px; color: transparent;"
        src="/hand.png"
        sizes="100vw"
      />
      <div class="dev-video_video__tvEzd">
        <video
          src="/phone.mp4"
          playsinline
          autoplay
          muted
          loop
        ></video>
      </div>
    </div>
  </div>

  <!-- Grid Layout -->
  <div class="development_dev_screens__L4P5Z">
    <div class="development_dev_screens_wrapper__iDJ0j">
      <!-- First Row (hand should be visible here initially) -->
      <div class="dev-screens_screens_list__QZ0lc first-row grid-row">
        <div class="dev-screens_screens_item__x7szP">
          <img src="/screen1.png" alt="Health Overview" class="dev-media_media_preview__hjQcj" />
        </div>
        <div class="dev-screens_screens_item__x7szP">
          <img src="/screen2.png" alt="Smart Hub" class="dev-media_media_preview__hjQcj" />
        </div>
        <div class="dev-screens_screens_item__x7szP hand-alignment">
          <!-- Empty space for hand alignment -->
        </div>
        <div class="dev-screens_screens_item__x7szP">
          <img src="/screen1.png" alt="Screen 1" class="dev-media_media_preview__hjQcj" />
        </div>
        <div class="dev-screens_screens_item__x7szP">
          <img src="/screen2.png" alt="Screen 2" class="dev-media_media_preview__hjQcj" />
        </div>
      </div>

      <!-- Second Row (with hand-alignment space) -->
      <div class="dev-screens_screens_list__QZ0lc grid-row">
        <div class="dev-screens_screens_item__x7szP">
          <img src="/screen1.png" alt="Screen 3" class="dev-media_media_preview__hjQcj" />
        </div>
        <div class="dev-screens_screens_item__x7szP">
          <img src="/screen2.png" alt="Screen 4" class="dev-media_media_preview__hjQcj" />
        </div>
        <div class="dev-screens_screens_item__x7szP hand-alignment">
          <!-- Empty space for hand alignment -->
        </div>
        <div class="dev-screens_screens_item__x7szP">
          <img src="/screen1.png" alt="Screen 5" class="dev-media_media_preview__hjQcj" />
        </div>
        <div class="dev-screens_screens_item__x7szP">
          <img src="/screen2.png" alt="Screen 6" class="dev-media_media_preview__hjQcj" />
        </div>
      </div>

      <!-- Third Row and Beyond -->
      {#each Array(1) as _, rowIndex}
        <div class="dev-screens_screens_list__QZ0lc grid-row">
          <div class="dev-screens_screens_item__x7szP">
            <img src="/screen1.png" alt="Screen {rowIndex + 7}" class="dev-media_media_preview__hjQcj" />
          </div>
          <div class="dev-screens_screens_item__x7szP">
            <img src="/screen2.png" alt="Screen {rowIndex + 8}" class="dev-media_media_preview__hjQcj" />
          </div>
          <div class="dev-screens_screens_item__x7szP hand-alignment">
            <!-- Empty space -->
          </div>
          <div class="dev-screens_screens_item__x7szP">
            <img src="/screen1.png" alt="Screen {rowIndex + 9}" class="dev-media_media_preview__hjQcj" />
          </div>
          <div class="dev-screens_screens_item__x7szP">
            <img src="/screen2.png" alt="Screen {rowIndex + 10}" class="dev-media_media_preview__hjQcj" />
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Content beyond this section -->
  <div class="content-beyond"></div>
</section>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  .development_dev__mvT8y {
    padding-top: 120px;
    padding-bottom: 90px !important;
    position: relative;
    overflow: hidden;
    min-height: 90vh;
  }

  .development_dev_hand_wrapper__yXHKJ {
    position: absolute;
    left: 0;
    top: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 3;
  }

  .development_dev_hand__1L3Gd {
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 840px;
    overflow: hidden;
    pointer-events: none;
  }

  .development_dev_hand_image__s8v9J {
    flex-shrink: 0;
top: 110px !important;
    min-width: 1670px !important;
    width: 1670px !important;
    height: auto !important;
    position: relative !important;
    object-fit: cover;
    object-position: center top;
  }

  .dev-video_video__tvEzd {
    position: absolute;
    z-index: 2;
    width: 320px;
    height: 675px;
    top: 32px;
    border-radius: 42px;
  }

  .dev-video_video__tvEzd video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: inherit;
  }

  .development_dev_screens__L4P5Z {
    margin-top: 0;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .development_dev_screens_wrapper__iDJ0j {
    max-width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .dev-screens_screens_list__QZ0lc {
    display: flex;
    justify-content: center;
    gap: 4px;
    padding: 0 0px;
  }

  .dev-screens_screens_item__x7szP {
    margin: 4px ;
    flex-shrink: 0;
    position: relative;
    border-radius: 44px;
    overflow: hidden;
  }

  .hand-alignment {
    position: relative;
    z-index: 0;
    min-height: 750px;
    width: 365px;
  }

  .dev-media_media_preview__hjQcj {
    border-radius: inherit !important;
    position: relative !important;
    object-fit: cover !important;
    object-position: center !important;
    width: 365px;
    height: 670px;
  }

  .content-beyond {
    padding: 20px;
    background: transparent;
  }

  @media screen and (max-width: 1600px) {
    .development_dev_hand__1L3Gd {
      height: 900px;
    }
    .development_dev_hand_wrapper__yXHKJ {
      top:0px;
      height: 100vh;
    }
    .development_dev_hand_image__s8v9J {
      width: 1589.5px !important;
      top: 100px !important;
      min-width: 1589.5px !important;
    }
    .dev-video_video__tvEzd {
      width: 297px;
      height: 630px;
      top: 80px;
      border-radius: 35px;
    }
    .dev-media_media_preview__hjQcj {
      width: 310.25px;
      height: 654.5px;
    }
    .hand-alignment {
      min-height: 650px;
      width: 300px;
    }
  }

  @media screen and (max-width: 1124px) {
    .development_dev_hand__1L3Gd {
      height: 700px;
    }
    .development_dev_hand_wrapper__yXHKJ {
      top: 0px;
      height: 100vh;
    }
    .development_dev_hand_image__s8v9J {
      width: 1328.5px !important;
      min-width: 1328.5px !important;
    }
    .dev-video_video__tvEzd {
      width: 248px;
      height: 528px;
      top: 60px;
      border-radius: 22px;
    }
    .dev-media_media_preview__hjQcj {
      width: 300.75px;
      height: 623.5px;
    }
    .hand-alignment {
      min-height: 423.5px;
      width: 200.75px;
    }
  }

  @media screen and (max-width: 991px) {
    .development_dev_screens__L4P5Z {
      margin-top: -20px;
    }
    .dev-media_media_preview__hjQcj {
      width: 200.75px;
      height: 423.5px;
    }
    .hand-alignment {
      min-height: 423.5px;
      width: 200.75px;
    }
    .development_dev_hand_wrapper__yXHKJ {
      top: 0px;
      height: 100vh;
    }
    .development_dev_hand_image__s8v9J {
      width: 1028.5px !important;
      min-width: 1028.5px !important;
    }
    .dev-video_video__tvEzd {
      width: 196px;
      height: 410px;
      top: 145px;
      border-radius: 22px;
    }
  }

  @media screen and (max-width: 768px) {
    .development_dev_hand__1L3Gd {
      height: 700px;
    }
    .development_dev_hand_image__s8v9J {
      width: 770px !important;
      min-width: 770px !important;
    }
    .dev-video_video__tvEzd {
      width: 145px;
      height: 305px;
      top: 223px;
      border-radius: 18px;
    }
    .dev-screens_screens_list__QZ0lc {
      gap: 8px;
      padding: 0 5px;
    }
    .dev-screens_screens_item__x7szP {
      margin: 8px;
    }
    .dev-media_media_preview__hjQcj {
      width: 150px;
      height: 310px;
    }
    .hand-alignment {
      min-height: 310px;
      width: 150px;
    }
  }

  @media screen and (max-width: 465px) {
    .development_dev_hand__1L3Gd {
      height: 350px;
    }
    .development_dev_hand_image__s8v9J {
      width: 770px !important;
      min-width: 770px !important;
    }
    .dev-video_video__tvEzd {
      width: 145px;
      height: 305px;
      top: 0px !important;
      border-radius: 18px;
    }
    .dev-screens_screens_list__QZ0lc {
      gap: 8px;
      padding: 0 5px;
    }
    .dev-screens_screens_item__x7szP {
      margin: 8px;
    }
    .dev-media_media_preview__hjQcj {
      width: 150px;
      height: 310px;
    }
    .hand-alignment {
      min-height: 310px;
      width: 150px;
    }
  }
</style>
