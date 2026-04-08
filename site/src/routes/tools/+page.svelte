<script>
  import { onMount } from 'svelte';

  let currentStep = 0;
  let photoData = '';
  
  const steps = ['Identity', 'Business', 'BNI Profile', 'Referrals'];
  
  // Form data
  let formData = {
    fname: '',
    lname: '',
    title: '',
    mobile: '',
    email: '',
    website: '',
    bizname: '',
    industry: '',
    tagline: '',
    services: '',
    city: '',
    chapter: '',
    since: '',
    role: '',
    gains: '',
    weekly: '',
    ideal: '',
    refs: '',
    help: '',
    testimonial: ''
  };

  let showPreview = false;
  let photoInput;

  function navigate(direction) {
    const nextStep = currentStep + direction;
    if (nextStep >= 0 && nextStep <= 3) {
      currentStep = nextStep;
      window.scrollTo(0, 0);
    }
  }

  function goToStep(stepIndex) {
    currentStep = stepIndex;
  }

  function handlePhotoUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      photoData = e.target?.result || '';
    };
    reader.readAsDataURL(file);
  }

  function getInitials() {
    const first = formData.fname[0] || '';
    const last = formData.lname[0] || '';
    return (first + last || '?').toUpperCase();
  }

  function openPreview() {
    showPreview = true;
  }

  function closePreview() {
    showPreview = false;
  }

  function downloadPDF() {
    alert('To enable PDF download, integrate html2pdf.js or connect a Puppeteer backend on wenoxo.in.\n\nQuick option: use browser Share → Print → Save as PDF.');
  }

  function backdropClick(event) {
    if (event.target === event.currentTarget) {
      closePreview();
    }
  }

  $: progressPercentage = ((currentStep + 1) / 4) * 100;
</script>

<style>
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(html, body) {
    height: 100%;
    background: #F5F4F0;
  }

  :global(body) {
    font-family: 'DM Sans', sans-serif;
  }

  .app {
    max-width: 430px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #F5F4F0;
  }

  /* TOP BAR */
  .topbar {
    background: #fff;
    border-bottom: 1px solid #E8E6E0;
    padding: 14px 16px 10px;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .topbar-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .bni-pill {
    background: #CC1F1F;
    color: white;
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    font-size: 13px;
    padding: 4px 10px;
    border-radius: 6px;
    letter-spacing: 0.5px;
  }

  .topbar h1 {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 500;
    color: #1A1A1A;
  }

  .progress-bar {
    height: 3px;
    background: #EDE9E3;
    border-radius: 2px;
    margin-top: 10px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: #CC1F1F;
    border-radius: 2px;
    transition: width 0.3s ease;
  }

  /* STEP DOTS */
  .step-dots {
    display: flex;
    justify-content: center;
    gap: 6px;
    padding: 12px 16px 0;
  }

  .dot {
    flex: 1;
    height: 4px;
    border-radius: 2px;
    background: #DDD9D2;
    cursor: pointer;
    transition: background 0.2s;
  }

  .dot.done {
    background: #F4AAAA;
  }

  .dot.active {
    background: #CC1F1F;
  }

  .step-label {
    text-align: center;
    font-size: 11px;
    color: #888;
    padding: 7px 0 2px;
  }

  /* SECTION HEADER */
  .sec-header {
    padding: 16px 16px 8px;
  }

  .sec-header h2 {
    font-size: 18px;
    font-weight: 500;
    color: #1A1A1A;
  }

  .sec-header p {
    font-size: 12px;
    color: #888;
    margin-top: 2px;
  }

  /* FORM CARD */
  .form-card {
    background: #fff;
    border-radius: 16px;
    margin: 0 12px;
    padding: 16px;
    border: 1px solid #EAE8E3;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  }

  .field {
    margin-bottom: 16px;
  }

  .field:last-child {
    margin-bottom: 0;
  }

  .field label {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 500;
    color: #666;
    margin-bottom: 6px;
  }

  .req {
    color: #CC1F1F;
    font-size: 14px;
    line-height: 1;
  }

  .field input,
  .field textarea {
    width: 100%;
    padding: 12px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    background: #FAFAF8;
    color: #1A1A1A;
    border: 1px solid #E0DDD7;
    border-radius: 10px;
    outline: none;
    transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
    -webkit-appearance: none;
  }

  .field input:focus,
  .field textarea:focus {
    border-color: #CC1F1F;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(204, 31, 31, 0.07);
  }

  .field textarea {
    resize: none;
    min-height: 80px;
    line-height: 1.6;
  }

  .row2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  /* PHOTO UPLOAD */
  .photo-upload {
    display: flex;
    align-items: center;
    gap: 14px;
    background: #FDF6F6;
    border: 1.5px dashed #F4AAAA;
    border-radius: 12px;
    padding: 14px;
    cursor: pointer;
    margin-bottom: 16px;
    transition: border-color 0.15s;
  }

  .photo-upload:active {
    opacity: 0.85;
  }

  .photo-circle {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid #E8E6E0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
  }

  .photo-circle img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .cam {
    font-size: 22px;
  }

  .photo-text p {
    font-size: 13px;
    font-weight: 500;
    color: #1A1A1A;
  }

  .photo-text span {
    font-size: 11px;
    color: #999;
  }

  /* BOTTOM NAV */
  .bottom-nav {
    position: sticky;
    bottom: 0;
    background: #fff;
    border-top: 1px solid #EAE8E3;
    padding: 12px 16px;
    display: flex;
    gap: 10px;
    z-index: 10;
    box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.05);
  }

  .btn {
    flex: 1;
    padding: 13px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    border-radius: 12px;
    border: 1px solid #DDD9D2;
    background: #F5F4F0;
    color: #444;
    cursor: pointer;
    transition: all 0.15s;
    -webkit-appearance: none;
  }

  .btn:active {
    transform: scale(0.97);
  }

  .btn.primary {
    background: #CC1F1F;
    color: white;
    border-color: #CC1F1F;
    flex: 2;
  }

  .btn.primary:active {
    background: #aa1919;
  }

  .section {
    display: none;
    padding-bottom: 90px;
  }

  .section.active {
    display: block;
  }

  /* BOTTOM SHEET */
  .sheet-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 20;
    display: none;
    align-items: flex-end;
  }

  .sheet-backdrop.open {
    display: flex;
  }

  .sheet {
    background: #F5F4F0;
    border-radius: 22px 22px 0 0;
    width: 100%;
    max-height: 92vh;
    overflow-y: auto;
    padding-bottom: 40px;
  }

  .sheet-handle {
    width: 36px;
    height: 4px;
    background: #D4D0C9;
    border-radius: 2px;
    margin: 12px auto 14px;
  }

  .sheet-topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px 12px;
    border-bottom: 1px solid #E8E6E0;
  }

  .sheet-topbar span {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 500;
    color: #1A1A1A;
  }

  .sheet-close {
    font-size: 18px;
    color: #999;
    cursor: pointer;
    background: none;
    border: none;
    padding: 4px 10px;
    font-family: 'DM Sans', sans-serif;
    border-radius: 8px;
  }

  /* BIO CARD */
  .bio-card {
    margin: 14px 12px 0;
  }

  .bio-head {
    background: #CC1F1F;
    border-radius: 14px 14px 0 0;
    padding: 18px 16px;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .bio-avi {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 600;
    color: white;
    flex-shrink: 0;
    overflow: hidden;
  }

  .bio-avi img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .bio-head-info {
    flex: 1;
    min-width: 0;
  }

  .bio-head-name {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 600;
    color: white;
    line-height: 1.2;
  }

  .bio-head-sub {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 3px;
    line-height: 1.4;
  }

  .bni-tag {
    font-family: 'Playfair Display', serif;
    font-size: 10px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.65);
    letter-spacing: 1.5px;
  }

  .bio-chips {
    background: #fff;
    padding: 12px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    border-left: 1px solid #EAE8E3;
    border-right: 1px solid #EAE8E3;
  }

  .chip {
    background: #F9F8F5;
    border-radius: 8px;
    padding: 8px 10px;
    border: 1px solid #EAE8E3;
  }

  .chip-lbl {
    font-size: 9px;
    font-weight: 500;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    margin-bottom: 2px;
  }

  .chip-val {
    font-size: 12px;
    font-weight: 500;
    color: #1A1A1A;
    word-break: break-word;
  }

  .chip.full {
    grid-column: 1 / -1;
  }

  .bio-sections {
    background: #fff;
    padding: 0 12px 12px;
    border-radius: 0 0 14px 14px;
    border: 1px solid #EAE8E3;
    border-top: none;
  }

  .bio-sec {
    background: #F9F8F5;
    border-radius: 8px;
    padding: 10px 12px;
    margin-top: 8px;
    border: 1px solid #EAE8E3;
  }

  .bio-sec-lbl {
    font-size: 9px;
    font-weight: 500;
    color: #CC1F1F;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 5px;
  }

  .bio-sec-val {
    font-size: 12px;
    color: #1A1A1A;
    line-height: 1.6;
  }

  .bio-sec-val.empty {
    color: #BBBBBB;
    font-style: italic;
  }

  .preview-footer {
    text-align: center;
    font-size: 10px;
    color: #BBB;
    padding: 12px 16px 0;
  }

  .sheet-actions {
    padding: 12px 12px 0;
    display: flex;
    gap: 10px;
  }
</style>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@400;500&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="app">
  <!-- TOP BAR -->
  <div class="topbar">
    <div class="topbar-row">
      <div class="bni-pill">BNI</div>
      <h1>Member Bio Builder</h1>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width: {progressPercentage}%" />
    </div>
  </div>

  <!-- STEP DOTS -->
  <div class="step-dots">
    {#each { length: 4 } as _, i}
      <div
        class="dot"
        class:active={i === currentStep}
        class:done={i < currentStep}
        on:click={() => goToStep(i)}
      />
    {/each}
  </div>
  <div class="step-label">Step {currentStep + 1} of 4 — {steps[currentStep]}</div>

  <!-- STEP 1: Identity -->
  <div class="section" class:active={currentStep === 0}>
    <div class="sec-header">
      <h2>Your Identity</h2>
      <p>Start with who you are</p>
    </div>
    <div class="form-card">
      <div class="photo-upload" on:click={() => photoInput?.click()}>
        <div class="photo-circle">
          {#if photoData}
            <img src={photoData} alt="Profile" />
          {:else}
            <div class="cam">📷</div>
          {/if}
        </div>
        <div class="photo-text">
          <p>Upload your photo</p>
          <span>JPG or PNG · Recommended</span>
        </div>
        <input
          type="file"
          bind:this={photoInput}
          accept="image/*"
          on:change={handlePhotoUpload}
          style="display:none"
        />
      </div>
      <div class="row2">
        <div class="field">
          <label>First Name <span class="req">*</span></label>
          <input type="text" placeholder="Ravi" bind:value={formData.fname} />
        </div>
        <div class="field">
          <label>Last Name <span class="req">*</span></label>
          <input type="text" placeholder="Kumar" bind:value={formData.lname} />
        </div>
      </div>
      <div class="field">
        <label>Designation / Title</label>
        <input type="text" placeholder="Managing Director" bind:value={formData.title} />
      </div>
      <div class="field">
        <label>Mobile <span class="req">*</span></label>
        <input type="tel" placeholder="+91 98765 43210" bind:value={formData.mobile} />
      </div>
      <div class="field">
        <label>Email Address</label>
        <input type="email" placeholder="ravi@business.com" bind:value={formData.email} />
      </div>
      <div class="field">
        <label>Website</label>
        <input type="url" placeholder="www.yourbusiness.com" bind:value={formData.website} />
      </div>
    </div>
  </div>

  <!-- STEP 2: Business -->
  <div class="section" class:active={currentStep === 1}>
    <div class="sec-header">
      <h2>Your Business</h2>
      <p>Tell us what you do</p>
    </div>
    <div class="form-card">
      <div class="field">
        <label>Business Name <span class="req">*</span></label>
        <input type="text" placeholder="Wenoxo Technologies" bind:value={formData.bizname} />
      </div>
      <div class="field">
        <label>Industry / Classification</label>
        <input type="text" placeholder="Web Design & Development" bind:value={formData.industry} />
      </div>
      <div class="field">
        <label>Tagline / USP</label>
        <input type="text" placeholder="One line that makes you memorable" bind:value={formData.tagline} />
      </div>
      <div class="field">
        <label>Services / Products</label>
        <textarea placeholder="List your key services..." bind:value={formData.services} />
      </div>
      <div class="field">
        <label>City / Location</label>
        <input type="text" placeholder="Chennai, Tamil Nadu" bind:value={formData.city} />
      </div>
    </div>
  </div>

  <!-- STEP 3: BNI -->
  <div class="section" class:active={currentStep === 2}>
    <div class="sec-header">
      <h2>BNI Profile</h2>
      <p>Your chapter & networking info</p>
    </div>
    <div class="form-card">
      <div class="field">
        <label>Chapter Name</label>
        <input type="text" placeholder="BNI Pinnacle" bind:value={formData.chapter} />
      </div>
      <div class="row2">
        <div class="field">
          <label>Member Since</label>
          <input type="text" placeholder="Jan 2022" bind:value={formData.since} />
        </div>
        <div class="field">
          <label>Chapter Role</label>
          <input type="text" placeholder="Member / VP" bind:value={formData.role} />
        </div>
      </div>
      <div class="field">
        <label>GAINS Profile</label>
        <textarea
          placeholder="Goals, Accomplishments, Interests, Networks, Skills..."
          bind:value={formData.gains}
        />
      </div>
      <div class="field">
        <label>Weekly Highlight</label>
        <textarea placeholder="What should members know this week?" bind:value={formData.weekly} />
      </div>
    </div>
  </div>

  <!-- STEP 4: Referrals -->
  <div class="section" class:active={currentStep === 3}>
    <div class="sec-header">
      <h2>Referral Info</h2>
      <p>Help members refer you better</p>
    </div>
    <div class="form-card">
      <div class="field">
        <label>Ideal Referral / Customer</label>
        <textarea placeholder="Who is your perfect customer?" bind:value={formData.ideal} />
      </div>
      <div class="field">
        <label>Top Referral Sources</label>
        <input type="text" placeholder="HR Managers, Startup Founders..." bind:value={formData.refs} />
      </div>
      <div class="field">
        <label>How I Can Help You</label>
        <textarea placeholder="What can you offer fellow members?" bind:value={formData.help} />
      </div>
      <div class="field">
        <label>Client Testimonial</label>
        <textarea placeholder='"A quote from a happy client..."' bind:value={formData.testimonial} />
      </div>
    </div>
  </div>

  <!-- BOTTOM NAV -->
  <div class="bottom-nav">
    {#if currentStep > 0}
      <button class="btn" on:click={() => navigate(-1)}>← Back</button>
    {/if}
    <button class="btn" on:click={openPreview}>Preview</button>
    {#if currentStep < 3}
      <button class="btn primary" on:click={() => navigate(1)}>Next →</button>
    {:else}
      <button class="btn primary" on:click={openPreview}>Preview ✓</button>
    {/if}
  </div>
</div>

<!-- PREVIEW SHEET -->
<div
  class="sheet-backdrop"
  class:open={showPreview}
  on:click={backdropClick}
>
  <div class="sheet">
    <div class="sheet-handle" />
    <div class="sheet-topbar">
      <span>Your Bio Sheet</span>
      <button class="sheet-close" on:click={closePreview}>✕</button>
    </div>
    <div class="bio-card">
      <div class="bio-head">
        <div class="bio-avi">
          {#if photoData}
            <img src={photoData} alt="Profile" />
          {:else}
            <span>{getInitials()}</span>
          {/if}
        </div>
        <div class="bio-head-info">
          <div class="bio-head-name">
            {formData.fname && formData.lname
              ? `${formData.fname} ${formData.lname}`.trim()
              : 'Your Name'}
          </div>
          <div class="bio-head-sub">
            {[formData.title, formData.bizname].filter(Boolean).join(' · ') || 'Title · Business'}
          </div>
        </div>
        <div class="bni-tag">BNI</div>
      </div>
      <div class="bio-chips">
        <div class="chip">
          <div class="chip-lbl">Mobile</div>
          <div class="chip-val">{formData.mobile || '—'}</div>
        </div>
        <div class="chip">
          <div class="chip-lbl">Email</div>
          <div class="chip-val">{formData.email || '—'}</div>
        </div>
        <div class="chip">
          <div class="chip-lbl">Industry</div>
          <div class="chip-val">{formData.industry || '—'}</div>
        </div>
        <div class="chip">
          <div class="chip-lbl">Chapter</div>
          <div class="chip-val">{formData.chapter || '—'}</div>
        </div>
        {#if formData.city}
          <div class="chip full">
            <div class="chip-lbl">Location</div>
            <div class="chip-val">{formData.city}</div>
          </div>
        {/if}
      </div>
      <div class="bio-sections">
        <div class="bio-sec">
          <div class="bio-sec-lbl">Tagline</div>
          <div class="bio-sec-val" class:empty={!formData.tagline}>
            {formData.tagline || 'Your tagline will appear here…'}
          </div>
        </div>
        <div class="bio-sec">
          <div class="bio-sec-lbl">Services</div>
          <div class="bio-sec-val" class:empty={!formData.services}>
            {formData.services || 'Your services will appear here…'}
          </div>
        </div>
        {#if formData.gains}
          <div class="bio-sec">
            <div class="bio-sec-lbl">GAINS</div>
            <div class="bio-sec-val">{formData.gains}</div>
          </div>
        {/if}
        {#if formData.ideal}
          <div class="bio-sec">
            <div class="bio-sec-lbl">Ideal Referral</div>
            <div class="bio-sec-val">{formData.ideal}</div>
          </div>
        {/if}
        {#if formData.testimonial}
          <div class="bio-sec">
            <div class="bio-sec-lbl">Testimonial</div>
            <div class="bio-sec-val">"{formData.testimonial}"</div>
          </div>
        {/if}
      </div>
    </div>
    <div class="preview-footer">Powered by Wenoxo Technologies · wenoxo.in</div>
    <div class="sheet-actions">
      <button class="btn" on:click={closePreview} style="flex:1">← Edit</button>
      <button class="btn primary" on:click={downloadPDF} style="flex:2">Download PDF</button>
    </div>
  </div>
</div>