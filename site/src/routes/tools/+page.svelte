<script>
  import { onMount } from 'svelte';

  let currentStep = 0;
  let photoData = '';

  const steps = ['Basic & Business', 'Personal', 'GAINS', 'Contact Sphere', 'Last 10 Customers'];

  // FIX 2: Separate current job (single) vs previous jobs (multiple)
  let currentJob = { profession: '', businessName: '', companyName: '', yearsInBusiness: '' };
  let previousJobs = [];

  function addPreviousJob() {
    previousJobs = [...previousJobs, { profession: '', businessName: '', companyName: '', yearsInBusiness: '' }];
  }

  function removePreviousJob(i) {
    previousJobs = previousJobs.filter((_, idx) => idx !== i);
  }

  let formData = {
    speakerName: '',
    date: '',
    locationCity: '',
    locationState: '',
    timeline: '',
    spouseName: '',
    childrenNames: '',
    animals: '',
    hobbies: '',
    activities: '',
    residencyCity: '',
    residencyDuration: '',
    burningDesire: '',
    secretFact: '',
    keySuccess: '',
    goals: '',
    accomplishments: '',
    interests: '',
    networks: '',
    skills: '',
    contactSphere: '',
    contactSphereTop3: '',
    last10Customers: '',
    customerNotes: '',
    referralNotes: '',
  };

  let showPreview = false;
  let photoInput;
  let pdfGenerating = false;

  function navigate(direction) {
    const nextStep = currentStep + direction;
    if (nextStep >= 0 && nextStep <= 4) {
      currentStep = nextStep;
      window.scrollTo(0, 0);
    }
  }

  function handlePhotoUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => { photoData = e.target?.result || ''; };
    reader.readAsDataURL(file);
  }

  function getInitials() {
    const parts = (formData.speakerName || '').trim().split(' ');
    const first = parts[0]?.[0] || '';
    const last = parts[1]?.[0] || '';
    return (first + last || '?').toUpperCase();
  }

  function openPreview() { showPreview = true; }
  function closePreview() { showPreview = false; }

  function backdropClick(event) {
    if (event.target === event.currentTarget) closePreview();
  }

  // All jobs for preview & PDF
  $: filledCurrentJob = (currentJob.profession || currentJob.businessName) ? [currentJob] : [];
  $: filledPreviousJobs = previousJobs.filter(j => j.profession || j.businessName);
  $: allJobs = [...filledCurrentJob, ...filledPreviousJobs];

  function buildPDFHTML() {
    const esc = (s) => String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const nl = (s) => esc(s).replace(/\n/g,'<br>');
    const loc = [formData.locationCity, formData.locationState].filter(Boolean).join(', ');
    const subline = [currentJob.profession, currentJob.businessName].filter(Boolean).join(' · ');

    const section = (title, body) => body ? `
      <div style="padding:8px 14px;border-bottom:1px solid #EAE8E3;background:#fff;">
        <div style="font-size:8px;font-weight:700;color:#CC1F1F;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:5px;">${esc(title)}</div>
        <div style="font-size:11px;color:#1A1A1A;line-height:1.7;text-transform:none;">${nl(body)}</div>
      </div>` : '';

    const chip = (label, val) => val ? `
      <div style="padding:7px 10px;border:1px solid #EAE8E3;border-radius:6px;background:#F9F8F5;">
        <div style="font-size:8px;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:2px;">${esc(label)}</div>
        <div style="font-size:11px;font-weight:500;color:#1A1A1A;text-transform:none;">${esc(val)}</div>
      </div>` : '';

    const gainsCell = (label, val) => `
      <div style="padding:6px 10px;border:1px solid #EAE8E3;border-radius:6px;background:#F5F4F0;">
        <div style="font-size:8px;font-weight:600;color:#CC1F1F;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:3px;">${esc(label)}</div>
        <div style="font-size:11px;color:#1A1A1A;line-height:1.5;text-transform:none;">${nl(val) || '<span style="color:#CCC;font-style:italic;">—</span>'}</div>
      </div>`;

    const aviHTML = photoData
      ? `<img src="${photoData}" style="width:60px;height:60px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,0.5);" />`
      : `<div style="width:60px;height:60px;border-radius:50%;background:rgba(255,255,255,0.25);border:2px solid rgba(255,255,255,0.5);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;color:white;flex-shrink:0;">${esc(getInitials())}</div>`;

    const chips = [
      chip('Date', formData.date),
      chip('Location', loc),
      chip('Years in Business', currentJob.yearsInBusiness),
      chip('Company', currentJob.companyName || currentJob.businessName),
    ].filter(Boolean).join('');

    const familyParts = [
      formData.spouseName && `Spouse: ${formData.spouseName}`,
      formData.childrenNames && `Children: ${formData.childrenNames}`,
      formData.animals && `Pets: ${formData.animals}`,
    ].filter(Boolean).join('\n');

    const aboutParts = [
      formData.burningDesire && `Burning Desire:\n${formData.burningDesire}`,
      formData.secretFact && `Something Nobody Knows:\n${formData.secretFact}`,
      formData.keySuccess && `Key Success:\n${formData.keySuccess}`,
    ].filter(Boolean).join('\n\n');

    const filledAll = allJobs;
    const jobsHTML = filledAll.map((j, i) => `
      <div style="padding:7px 10px;border:1px solid #EAE8E3;border-radius:6px;background:#F9F8F5;margin-bottom:6px;">
        <div style="font-size:8px;font-weight:600;${i === 0 ? 'color:#CC1F1F' : 'color:#888'};text-transform:uppercase;letter-spacing:0.4px;margin-bottom:3px;">${i === 0 ? 'Current' : 'Previous'}</div>
        <div style="font-size:11px;font-weight:600;color:#1A1A1A;text-transform:none;">${esc(j.profession || '')}${j.profession && j.businessName ? ' · ' : ''}${esc(j.businessName || '')}</div>
        ${j.companyName ? `<div style="font-size:10px;color:#666;margin-top:2px;text-transform:none;">${esc(j.companyName)}</div>` : ''}
        ${j.yearsInBusiness ? `<div style="font-size:10px;color:#999;margin-top:1px;text-transform:none;">${esc(j.yearsInBusiness)} in business</div>` : ''}
      </div>`).join('');

    const jobsBlock = filledAll.length > 0 ? `
      <div style="padding:8px 14px;border-bottom:1px solid #EAE8E3;background:#fff;">
        <div style="font-size:8px;font-weight:700;color:#CC1F1F;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:8px;">Business / Profession</div>
        ${jobsHTML}
      </div>` : '';

    const hasGains = formData.goals || formData.accomplishments || formData.interests || formData.networks || formData.skills;
    const gainsBlock = hasGains ? `
      <div style="padding:8px 14px;border-bottom:1px solid #EAE8E3;background:#fff;">
        <div style="font-size:8px;font-weight:700;color:#CC1F1F;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:8px;">GAINS Worksheet</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
          ${gainsCell('Goals', formData.goals)}
          ${gainsCell('Accomplishments', formData.accomplishments)}
          ${gainsCell('Interests', formData.interests)}
          ${gainsCell('Networks', formData.networks)}
          <div style="grid-column:1/-1">${gainsCell('Skills', formData.skills)}</div>
        </div>
      </div>` : '';

    const contactBlock = (formData.contactSphere || formData.contactSphereTop3) ? `
      <div style="padding:8px 14px;border-bottom:1px solid #EAE8E3;background:#fff;">
        <div style="font-size:8px;font-weight:700;color:#CC1F1F;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:5px;">Contact Sphere</div>
        ${formData.contactSphere ? `<div style="font-size:11px;color:#1A1A1A;line-height:1.7;text-transform:none;">${nl(formData.contactSphere)}</div>` : ''}
        ${formData.contactSphereTop3 ? `<div style="margin-top:6px;"><div style="font-size:8px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:3px;">Top 3</div><div style="font-size:11px;color:#1A1A1A;line-height:1.7;text-transform:none;">${nl(formData.contactSphereTop3)}</div></div>` : ''}
      </div>` : '';

    const customersBlock = (formData.last10Customers || formData.customerNotes || formData.referralNotes) ? `
      <div style="padding:8px 14px;border-bottom:1px solid #EAE8E3;background:#fff;">
        <div style="font-size:8px;font-weight:700;color:#CC1F1F;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:5px;">Last 10 Customers</div>
        ${formData.last10Customers ? `<div style="font-size:11px;color:#1A1A1A;line-height:1.7;text-transform:none;">${nl(formData.last10Customers)}</div>` : ''}
        ${formData.customerNotes ? `<div style="margin-top:6px;"><div style="font-size:8px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:3px;">Customer Notes</div><div style="font-size:11px;color:#1A1A1A;line-height:1.7;text-transform:none;">${nl(formData.customerNotes)}</div></div>` : ''}
        ${formData.referralNotes ? `<div style="margin-top:6px;"><div style="font-size:8px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:3px;">Referral Notes</div><div style="font-size:11px;color:#1A1A1A;line-height:1.7;text-transform:none;">${nl(formData.referralNotes)}</div></div>` : ''}
      </div>` : '';

    return `
      <div style="font-family:Arial,sans-serif;background:#ffffff;color:#1A1A1A;width:794px;">
        <div style="background-color:#CC1F1F;padding:20px 20px;display:flex;align-items:center;gap:14px;">
          ${aviHTML}
          <div style="flex:1;min-width:0;">
            <div style="font-size:20px;font-weight:700;color:#ffffff;text-transform:none;">${esc(formData.speakerName || 'Your Name')}</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.85);margin-top:3px;text-transform:none;">${esc(subline)}</div>
          </div>
          <div style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.65);letter-spacing:2px;">BNI</div>
        </div>
        ${chips ? `<div style="padding:10px 14px;background:#fff;border-bottom:1px solid #EAE8E3;display:grid;grid-template-columns:1fr 1fr;gap:7px;">${chips}</div>` : ''}
        ${jobsBlock}
        ${section('Career Timeline', formData.timeline)}
        ${section('Family & Pets', familyParts)}
        ${section('Hobbies & Activities', [formData.hobbies, formData.activities].filter(Boolean).join(' · '))}
        ${formData.residencyCity || formData.residencyDuration ? section('Residency', [formData.residencyCity, formData.residencyDuration].filter(Boolean).join(' — ')) : ''}
        ${section('About Me', aboutParts)}
        ${gainsBlock}
        ${contactBlock}
        ${customersBlock}
        <div style="text-align:center;font-size:8px;color:#BBB;padding:10px;border-top:1px solid #EAE8E3;background:#fff;">
          Powered by Wenoxo Technologies · wenoxo.in
        </div>
      </div>`;
  }

  async function downloadPDF() {
    if (pdfGenerating) return;
    pdfGenerating = true;

    if (!window.html2pdf) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:fixed;left:-9999px;top:0;z-index:-999;';
    wrapper.innerHTML = buildPDFHTML();
    document.body.appendChild(wrapper);

    const opt = {
      margin: [0, 0, 0, 0],
      filename: `BNI-Bio-${(formData.speakerName || 'Member').replace(/\s+/g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2, useCORS: true, logging: false,
        backgroundColor: '#ffffff', allowTaint: true, width: 794,
      },
      jsPDF: { unit: 'px', format: [794, 1123], orientation: 'portrait' },
    };

    try {
      await window.html2pdf().set(opt).from(wrapper.firstElementChild).save();
    } catch (e) {
      alert('PDF generation failed. Try: Share → Print → Save as PDF.');
    }

    document.body.removeChild(wrapper);
    pdfGenerating = false;
  }

  $: progressPercentage = ((currentStep + 1) / 5) * 100;
  $: fullName = formData.speakerName || 'Your Name';
</script>

<style>
  :global(*) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(:root) { background: #F5F4F0; }
  :global(html) {
    height: 100%;
    height: -webkit-fill-available;
    background: #F5F4F0;
    overscroll-behavior: none;
  }
  :global(body) {
    font-family: 'DM Sans', sans-serif;
    min-height: 100%;
    min-height: -webkit-fill-available;
    background: #F5F4F0;
    overscroll-behavior-y: none;
  }

  .app {
    max-width: 430px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    /* FIX 4: No left shift, no transition — preview panel overlays without moving the app */
  }

  /* TOP BAR */
  .topbar {
    background: #fff;
    border-bottom: 1px solid #E8E6E0;
    padding: 14px 16px 10px;
    position: sticky;
    top: 0;
    z-index: 9;
  }
  .topbar-row { display: flex; align-items: center; gap: 10px; }
  .bni-pill {
    background: #CC1F1F; color: white;
    font-family: 'Playfair Display', serif; font-weight: 600; font-size: 13px;
    padding: 4px 10px; border-radius: 6px; letter-spacing: 0.5px;
  }
  .topbar h1 { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 500; color: #1A1A1A; }
  .progress-bar { height: 3px; background: #EDE9E3; border-radius: 2px; margin-top: 10px; overflow: hidden; }
  .progress-fill { height: 100%; background: #CC1F1F; border-radius: 2px; transition: width 0.3s ease; }

  /* SECTION HEADER */
  .sec-header { padding: 16px 16px 8px; }
  .sec-header h2 { font-size: 18px; font-weight: 500; color: #1A1A1A; }
  .sec-header p { font-size: 12px; color: #888; margin-top: 2px; }

  /* FORM CARD */
  .form-card {
    background: #fff; border-radius: 16px; margin: 0 12px; padding: 16px;
    border: 1px solid #EAE8E3; box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .field { margin-bottom: 16px; }
  .field:last-child { margin-bottom: 0; }
  .field label {
    display: flex; align-items: center; gap: 4px;
    font-size: 12px; font-weight: 500; color: #666; margin-bottom: 6px;
  }
  .req { color: #CC1F1F; font-size: 14px; line-height: 1; }
  .field input, .field textarea {
    width: 100%; padding: 12px 14px;
    font-family: 'DM Sans', sans-serif; font-size: 15px;
    background: #FAFAF8; color: #1A1A1A;
    border: 1px solid #E0DDD7; border-radius: 10px;
    outline: none; transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
    -webkit-appearance: none;
    text-transform: none; /* FIX 1 */
  }
  .field input:focus, .field textarea:focus {
    border-color: #CC1F1F; background: #fff;
    box-shadow: 0 0 0 3px rgba(204,31,31,0.07);
  }
  .field textarea { resize: none; min-height: 80px; line-height: 1.6; }
  .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

  /* PHOTO UPLOAD */
  .photo-upload {
    display: flex; align-items: center; gap: 14px;
    background: #FDF6F6; border: 1.5px dashed #F4AAAA;
    border-radius: 12px; padding: 14px; cursor: pointer;
    margin-bottom: 16px; transition: border-color 0.15s;
  }
  .photo-upload:active { opacity: 0.85; }
  .photo-circle {
    width: 56px; height: 56px; border-radius: 50%;
    background: #fff; border: 1px solid #E8E6E0;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; overflow: hidden;
  }
  .photo-circle img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
  .cam { font-size: 22px; }
  .photo-text p { font-size: 13px; font-weight: 500; color: #1A1A1A; }
  .photo-text span { font-size: 11px; color: #999; }

  /* SECTION DIVIDER */
  .sec-divider {
    font-size: 10px; font-weight: 500; color: #CC1F1F;
    text-transform: uppercase; letter-spacing: 0.8px;
    padding: 4px 0 10px; border-bottom: 1px solid #F0EDE8; margin-bottom: 14px;
  }

  /* CURRENT JOB BLOCK */
  .job-block {
    background: #F9F8F5; border: 1px solid #EAE8E3; border-radius: 12px;
    padding: 12px; margin-bottom: 12px; position: relative;
  }
  .job-block-header {
    display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;
  }
  .job-num { font-size: 11px; font-weight: 600; color: #CC1F1F; }
  .job-num-prev { font-size: 11px; font-weight: 600; color: #888; }
  .remove-job-btn {
    background: none; border: none; font-size: 16px; color: #CCC; cursor: pointer;
    padding: 2px 6px; border-radius: 6px; transition: color 0.15s;
  }
  .remove-job-btn:hover { color: #CC1F1F; }
  .add-job-btn {
    display: flex; align-items: center; gap: 8px; justify-content: center;
    width: 100%; padding: 11px; background: #FDF6F6;
    border: 1.5px dashed #F4AAAA; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #CC1F1F;
    cursor: pointer; transition: background 0.15s; margin-bottom: 16px;
  }
  .add-job-btn:hover { background: #FFF0F0; }

  /* BOTTOM NAV */
  .bottom-nav {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    max-width: 430px; margin: 0 auto;
    background: #fff;
    border-top: 1px solid #EAE8E3;
    padding: 12px 16px;
    display: flex; gap: 10px;
    z-index: 8; /* FIX 4: stays behind overlay (z-index 50), stays put — no shift */
    box-shadow: 0 -2px 12px rgba(0,0,0,0.05);
  }
  .btn {
    flex: 1; padding: 13px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
    border-radius: 12px; border: 1px solid #DDD9D2;
    background: #F5F4F0; color: #444; cursor: pointer; transition: all 0.15s;
    -webkit-appearance: none;
  }
  .btn:active { transform: scale(0.97); }
  .btn.primary { background: #CC1F1F; color: white; border-color: #CC1F1F; flex: 2; }
  .btn.primary:active { background: #aa1919; }
  .btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .section { display: none; padding-bottom: 90px; }
  .section.active { display: block; }

  /* ─── MOBILE: bottom sheet ─── */
  .sheet-backdrop {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.35);
    z-index: 50;
    display: none; align-items: flex-end;
  }
  .sheet-backdrop.open { display: flex; }

  @media (min-width: 768px) {
    .sheet-backdrop { display: none !important; }
  }

  .sheet {
    background: #F5F4F0; border-radius: 22px 22px 0 0;
    width: 100%; max-height: 92vh; overflow-y: auto; padding-bottom: 40px;
  }
  .sheet-handle { width: 36px; height: 4px; background: #D4D0C9; border-radius: 2px; margin: 12px auto 14px; }
  .sheet-topbar {
    display: flex; justify-content: space-between; align-items: center;
    padding: 0 16px 12px; border-bottom: 1px solid #E8E6E0;
  }
  .sheet-topbar span { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 500; color: #1A1A1A; }
  .sheet-close { font-size: 18px; color: #999; cursor: pointer; background: none; border: none; padding: 4px 10px; font-family: 'DM Sans', sans-serif; border-radius: 8px; }

  /* ─── DESKTOP: right slide-in panel ─── */
  .desktop-preview-panel {
    display: none;
  }
  @media (min-width: 768px) {
    .desktop-preview-panel {
      display: block;
      position: fixed;
      top: 0; right: 0; bottom: 0;
      width: 450px;
      background: #F5F4F0;
      border-left: 1px solid #E0DDD7;
      box-shadow: -4px 0 24px rgba(0,0,0,0.10);
      z-index: 50;
      overflow-y: auto;
      transform: translateX(100%);
      transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
      /* FIX 4: panel slides over the top — app does NOT move */
    }
    .desktop-preview-panel.open {
      transform: translateX(0);
    }
  }

  .desktop-panel-topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px;
    background: #fff; border-bottom: 1px solid #E8E6E0;
    position: sticky; top: 0; z-index: 2;
  }
  .desktop-panel-topbar span {
    font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 500; color: #1A1A1A;
  }
  .panel-close {
    background: #F5F4F0; border: 1px solid #E8E6E0; border-radius: 8px;
    color: #666; font-size: 13px; cursor: pointer; padding: 6px 12px;
    font-family: 'DM Sans', sans-serif; font-weight: 500; transition: background 0.15s;
  }
  .panel-close:hover { background: #EAE8E3; }

  .desktop-panel-content {
    padding: 16px;
    padding-bottom: 100px;
  }

  /* Bio card — shared styles */
  .bio-head {
    background: #CC1F1F; border-radius: 14px 14px 0 0;
    padding: 18px 16px; display: flex; align-items: center; gap: 14px;
  }
  .bio-avi {
    width: 60px; height: 60px; border-radius: 50%;
    background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.5);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 600;
    color: white; flex-shrink: 0; overflow: hidden;
  }
  .bio-avi img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
  .bio-head-info { flex: 1; min-width: 0; }
  .bio-head-name {
    font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600;
    color: white; line-height: 1.2;
    text-transform: none; /* FIX 1 */
  }
  .bio-head-sub {
    font-size: 11px; color: rgba(255,255,255,0.8); margin-top: 3px; line-height: 1.4;
    text-transform: none; /* FIX 1 */
  }
  .bni-tag { font-family: 'Playfair Display', serif; font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.65); letter-spacing: 1.5px; }

  .bio-chips {
    background: #fff; padding: 12px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
    border-left: 1px solid #EAE8E3; border-right: 1px solid #EAE8E3;
  }
  .chip { background: #F9F8F5; border-radius: 8px; padding: 8px 10px; border: 1px solid #EAE8E3; }
  .chip-lbl { font-size: 9px; font-weight: 500; color: #999; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 2px; }
  /* FIX 1: Explicit no-uppercase on all data value elements */
  .chip-val { font-size: 12px; font-weight: 500; color: #1A1A1A; word-break: break-word; text-transform: none; }
  .chip.full { grid-column: 1 / -1; }

  .bio-sections {
    background: #fff; padding: 0 12px 12px;
    border-radius: 0 0 14px 14px; border: 1px solid #EAE8E3; border-top: none;
  }
  .bio-sec { background: #F9F8F5; border-radius: 8px; padding: 10px 12px; margin-top: 8px; border: 1px solid #EAE8E3; }
  .bio-sec-lbl { font-size: 9px; font-weight: 500; color: #CC1F1F; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 5px; }
  /* FIX 1: user data shown exactly as typed — no text-transform */
  .bio-sec-val { font-size: 12px; color: #1A1A1A; line-height: 1.6; white-space: pre-line; text-transform: none; }

  .gains-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .gains-item { background: #F9F8F5; border-radius: 8px; padding: 8px 10px; border: 1px solid #EAE8E3; }
  .gains-item-lbl { font-size: 9px; font-weight: 500; color: #CC1F1F; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 3px; }
  /* FIX 1 */
  .gains-item-val { font-size: 11px; color: #1A1A1A; line-height: 1.5; text-transform: none; }
  .gains-item-val.empty { color: #CCC; font-style: italic; }

  .preview-footer { text-align: center; font-size: 10px; color: #BBB; padding: 12px 16px 0; }
  .sheet-actions { padding: 12px 12px 0; display: flex; gap: 10px; }

  .sheet .bio-card { margin: 14px 12px 0; }
  .desktop-panel-content .bio-card { margin: 0; }

  /* Jobs preview */
  .jobs-preview-list { display: flex; flex-direction: column; gap: 6px; }
  .job-preview-item {
    background: #F9F8F5; border-radius: 8px; padding: 8px 10px; border: 1px solid #EAE8E3;
  }
  .job-preview-badge {
    font-size: 9px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;
  }
  .job-preview-badge.current { color: #CC1F1F; }
  .job-preview-badge.previous { color: #888; }
  /* FIX 1 */
  .job-preview-name { font-size: 12px; font-weight: 600; color: #1A1A1A; text-transform: none; }
  .job-preview-sub { font-size: 11px; color: #666; margin-top: 2px; text-transform: none; }
</style>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<!-- ═══════════════════════════ APP ═══════════════════════════ -->
<!-- FIX 4: No preview-open class shift — panel overlays from right -->
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

  <!-- ── STEP 1: Basic & Business ── -->
  <div class="section" class:active={currentStep === 0}>
    <div class="sec-header">
      <h2>Basic &amp; Business</h2>
      <p>Speaker and company information</p>
    </div>
    <div class="form-card">
      <div class="photo-upload" on:click={() => photoInput?.click()}>
        <div class="photo-circle">
          {#if photoData}<img src={photoData} alt="Profile" />{:else}<div class="cam">📷</div>{/if}
        </div>
        <div class="photo-text">
          <p>Upload your photo</p>
          <span>JPG or PNG · Recommended</span>
        </div>
        <input type="file" bind:this={photoInput} accept="image/*" on:change={handlePhotoUpload} style="display:none" />
      </div>

      <div class="sec-divider">Speaker Info</div>
      <div class="field">
        <label>Speaker Name <span class="req">*</span></label>
        <input type="text" placeholder="Ravi Kumar" bind:value={formData.speakerName} />
      </div>
      <div class="field">
        <label>Date</label>
        <input type="date" bind:value={formData.date} />
      </div>

      <!-- FIX 2: Current Job — single block, no "Add Another" -->
      <div class="sec-divider">Current Job / Business</div>
      <div class="job-block">
        <div class="job-block-header">
          <span class="job-num">Current Job</span>
        </div>
        <div class="field">
          <label>Profession / Role</label>
          <input type="text" placeholder="e.g. Web Developer, Chartered Accountant" bind:value={currentJob.profession} />
        </div>
        <div class="field">
          <label>Business Name <span class="req">*</span></label>
          <input type="text" placeholder="Enter Your Business Name" bind:value={currentJob.businessName} />
        </div>
        <div class="field">
          <label>Company Name</label>
          <input type="text" placeholder="Enter Your Company Name" bind:value={currentJob.companyName} />
        </div>
        <div class="field" style="margin-bottom:0">
          <label>Years in Business</label>
          <input type="text" placeholder="e.g. 8 years" bind:value={currentJob.yearsInBusiness} />
        </div>
      </div>

      <!-- FIX 2: Previous Jobs — separate section with Add/Remove -->
      <div class="sec-divider">Previous Jobs / Businesses</div>

      {#each previousJobs as job, i}
        <div class="job-block">
          <div class="job-block-header">
            <span class="job-num-prev">Previous Job {i + 1}</span>
            <button class="remove-job-btn" on:click={() => removePreviousJob(i)} title="Remove">✕</button>
          </div>
          <div class="field">
            <label>Profession / Role</label>
            <input type="text" placeholder="e.g. Senior Engineer" bind:value={job.profession} />
          </div>
          <div class="field">
            <label>Business Name</label>
            <input type="text" placeholder="Business or Company Name" bind:value={job.businessName} />
          </div>
          <div class="field">
            <label>Company Name</label>
            <input type="text" placeholder="Company Name" bind:value={job.companyName} />
          </div>
          <div class="field" style="margin-bottom:0">
            <label>Years in Business</label>
            <input type="text" placeholder="e.g. 5 years" bind:value={job.yearsInBusiness} />
          </div>
        </div>
      {/each}

      <button class="add-job-btn" on:click={addPreviousJob}>
        <span style="font-size:18px;line-height:1">＋</span> Add Previous Job / Business
      </button>

      <div class="sec-divider">Location</div>
      <div class="row2">
        <div class="field">
          <label>City</label>
          <input type="text" placeholder="Chennai" bind:value={formData.locationCity} />
        </div>
        <div class="field">
          <label>State</label>
          <input type="text" placeholder="Tamil Nadu" bind:value={formData.locationState} />
        </div>
      </div>

      <div class="sec-divider">Career Timeline</div>
      <div class="field">
        <label>Career Timeline</label>
        <textarea placeholder="Brief career journey or key milestones..." bind:value={formData.timeline} />
      </div>
    </div>
  </div>

  <!-- ── STEP 2: Personal ── -->
  <div class="section" class:active={currentStep === 1}>
    <div class="sec-header">
      <h2>Personal Info</h2>
      <p>Help members connect with you personally</p>
    </div>
    <div class="form-card">
      <div class="sec-divider">Family</div>
      <div class="field">
        <label>Spouse / Partner Name &amp; Age</label>
        <input type="text" placeholder="Priya Kumar (34)" bind:value={formData.spouseName} />
      </div>
      <div class="field">
        <label>Children's Names &amp; Ages</label>
        <input type="text" placeholder="Arjun (12), Meena (8)" bind:value={formData.childrenNames} />
      </div>
      <div class="field">
        <label>Pets / Animals</label>
        <input type="text" placeholder="Golden Retriever named Bruno" bind:value={formData.animals} />
      </div>

      <div class="sec-divider">Lifestyle</div>
      <div class="field">
        <label>Hobbies</label>
        <textarea placeholder="Photography, cooking, reading, travel..." bind:value={formData.hobbies} />
      </div>
      <div class="field">
        <label>Activities &amp; Sports</label>
        <textarea placeholder="Cricket, badminton, yoga, hiking..." bind:value={formData.activities} />
      </div>

      <div class="sec-divider">Residency</div>
      <div class="row2">
        <div class="field">
          <label>City</label>
          <input type="text" placeholder="Chennai" bind:value={formData.residencyCity} />
        </div>
        <div class="field">
          <label>Duration</label>
          <input type="text" placeholder="15 years" bind:value={formData.residencyDuration} />
        </div>
      </div>
    </div>
  </div>

  <!-- ── STEP 3: GAINS ── -->
  <div class="section" class:active={currentStep === 2}>
    <div class="sec-header">
      <h2>Miscellaneous &amp; GAINS</h2>
      <p>Share what makes you unique</p>
    </div>
    <div class="form-card">
      <div class="sec-divider">About Me</div>
      <div class="field">
        <label>My burning desire is to…</label>
        <textarea placeholder="e.g. Build a company that creates 500 jobs in Tamil Nadu" bind:value={formData.burningDesire} />
      </div>
      <div class="field">
        <label>Something no one knows about me…</label>
        <textarea placeholder="e.g. I once trekked to Everest base camp solo" bind:value={formData.secretFact} />
      </div>
      <div class="field">
        <label>My key success is…</label>
        <textarea placeholder="e.g. Scaled revenue 10x in 3 years with zero funding" bind:value={formData.keySuccess} />
      </div>

      <div class="sec-divider">GAINS Worksheet</div>
      <div class="field">
        <label>Goals</label>
        <textarea placeholder="Short and long-term goals..." bind:value={formData.goals} />
      </div>
      <div class="field">
        <label>Accomplishments</label>
        <textarea placeholder="Awards, milestones, achievements..." bind:value={formData.accomplishments} />
      </div>
      <div class="field">
        <label>Interests</label>
        <textarea placeholder="Topics you're passionate about..." bind:value={formData.interests} />
      </div>
      <div class="field">
        <label>Networks</label>
        <textarea placeholder="BNI chapters, industry associations, clubs..." bind:value={formData.networks} />
      </div>
      <div class="field">
        <label>Skills</label>
        <textarea placeholder="Key professional skills you bring..." bind:value={formData.skills} />
      </div>
    </div>
  </div>

  <!-- ── STEP 4: Contact Sphere ── -->
  <div class="section" class:active={currentStep === 3}>
    <div class="sec-header">
      <h2>Contact Sphere</h2>
      <p>BNI contact sphere planning</p>
    </div>
    <div class="form-card">
      <div class="field">
        <label>Contact Sphere</label>
        <textarea
          style="min-height:100px"
          placeholder="e.g. Architects, Interior Designers, Real Estate Agents, Home Loan Officers, Vastu Consultants..."
          bind:value={formData.contactSphere}
        />
      </div>
      <div class="field">
        <label>Top 3 Contact Sphere Members</label>
        <textarea
          style="min-height:90px"
          placeholder="1. Ramesh Iyer — Real Estate Agent&#10;2. Sunita Rao — Interior Designer&#10;3. Kiran Mehta — Home Loan Officer"
          bind:value={formData.contactSphereTop3}
        />
      </div>
    </div>
  </div>

  <!-- ── STEP 5: Last 10 Customers ── -->
  <div class="section" class:active={currentStep === 4}>
    <div class="sec-header">
      <h2>Last 10 Customers</h2>
      <p>Worksheet for referral opportunities</p>
    </div>
    <div class="form-card">
      <div class="field">
        <label>Last 10 Customers</label>
        <textarea
          style="min-height:130px"
          placeholder="1. Rajesh Sharma — Sharma Builders&#10;2. Anita Nair — Nair Exports&#10;3. ..."
          bind:value={formData.last10Customers}
        />
      </div>
      <div class="field">
        <label>Notes on Customers</label>
        <textarea
          style="min-height:90px"
          placeholder="Industry, company size, location, key needs..."
          bind:value={formData.customerNotes}
        />
      </div>
      <div class="field">
        <label>Notes on Referrals</label>
        <textarea
          style="min-height:90px"
          placeholder="Referral patterns, cross-referral opportunities..."
          bind:value={formData.referralNotes}
        />
      </div>
    </div>
  </div>

  <!-- BOTTOM NAV — stays fixed, aligned with app, does NOT shift -->
  <div class="bottom-nav">
    {#if currentStep > 0}
      <button class="btn" on:click={() => navigate(-1)}>← Back</button>
    {/if}
    <!-- FIX 3: Preview button is never primary (no red highlight) -->
    <button class="btn" on:click={openPreview}>Preview</button>
    {#if currentStep < 4}
      <button class="btn primary" on:click={() => navigate(1)}>Next →</button>
    <!-- {:else} 
      <button class="btn" on:click={openPreview}>Preview ✓</button> -->
    {/if}
  </div>
</div>

<!-- ═══ MOBILE: Bottom Sheet ═══ -->
<div class="sheet-backdrop" class:open={showPreview} on:click={backdropClick}>
  <div class="sheet">
    <div class="sheet-handle" />
    <div class="sheet-topbar">
      <span>Your Bio Sheet</span>
      <button class="sheet-close" on:click={closePreview}>✕</button>
    </div>    

    <div class="bio-card">
      <div class="bio-head">
        <div class="bio-avi">
          {#if photoData}<img src={photoData} alt="Profile" />{:else}<span>{getInitials()}</span>{/if}
        </div>
        <div class="bio-head-info">
          <div class="bio-head-name">{fullName}</div>
          <div class="bio-head-sub">
            {[currentJob.profession, currentJob.businessName].filter(Boolean).join(' · ') || 'Profession · Business'}
          </div>
        </div>
        <div class="bni-tag">BNI</div>
      </div>

      <div class="bio-chips">
        {#if formData.date}<div class="chip"><div class="chip-lbl">Date</div><div class="chip-val">{formData.date}</div></div>{/if}
        {#if formData.locationCity || formData.locationState}<div class="chip"><div class="chip-lbl">Location</div><div class="chip-val">{[formData.locationCity, formData.locationState].filter(Boolean).join(', ')}</div></div>{/if}
        {#if currentJob.yearsInBusiness}<div class="chip"><div class="chip-lbl">Years in Business</div><div class="chip-val">{currentJob.yearsInBusiness}</div></div>{/if}
        {#if currentJob.companyName || currentJob.businessName}<div class="chip"><div class="chip-lbl">Company</div><div class="chip-val">{currentJob.companyName || currentJob.businessName}</div></div>{/if}
      </div>

      <div class="bio-sections">
        {#if filledCurrentJob.length > 0 || filledPreviousJobs.length > 0}
          <div class="bio-sec">
            <div class="bio-sec-lbl">Business / Profession</div>
            <div class="jobs-preview-list">
              {#each filledCurrentJob as j}
                <div class="job-preview-item">
                  <div class="job-preview-badge current">Current</div>
                  <div class="job-preview-name">{[j.profession, j.businessName].filter(Boolean).join(' · ')}</div>
                  {#if j.companyName || j.yearsInBusiness}
                    <div class="job-preview-sub">{[j.companyName, j.yearsInBusiness && `${j.yearsInBusiness} in business`].filter(Boolean).join(' · ')}</div>
                  {/if}
                </div>
              {/each}
              {#each filledPreviousJobs as j}
                <div class="job-preview-item">
                  <div class="job-preview-badge previous">Previous</div>
                  <div class="job-preview-name">{[j.profession, j.businessName].filter(Boolean).join(' · ')}</div>
                  {#if j.companyName || j.yearsInBusiness}
                    <div class="job-preview-sub">{[j.companyName, j.yearsInBusiness && `${j.yearsInBusiness} in business`].filter(Boolean).join(' · ')}</div>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        {/if}
        {#if formData.timeline}<div class="bio-sec"><div class="bio-sec-lbl">Career Timeline</div><div class="bio-sec-val">{formData.timeline}</div></div>{/if}
        {#if formData.spouseName || formData.childrenNames || formData.animals}
          <div class="bio-sec"><div class="bio-sec-lbl">Family &amp; Pets</div>
            <div class="bio-sec-val">{[formData.spouseName && `Spouse: ${formData.spouseName}`, formData.childrenNames && `Children: ${formData.childrenNames}`, formData.animals && `Pets: ${formData.animals}`].filter(Boolean).join('\n')}</div>
          </div>
        {/if}
        {#if formData.hobbies || formData.activities}<div class="bio-sec"><div class="bio-sec-lbl">Hobbies &amp; Activities</div><div class="bio-sec-val">{[formData.hobbies, formData.activities].filter(Boolean).join(' · ')}</div></div>{/if}
        {#if formData.burningDesire}<div class="bio-sec"><div class="bio-sec-lbl">My Burning Desire</div><div class="bio-sec-val">{formData.burningDesire}</div></div>{/if}
        {#if formData.secretFact}<div class="bio-sec"><div class="bio-sec-lbl">Something Nobody Knows</div><div class="bio-sec-val">{formData.secretFact}</div></div>{/if}
        {#if formData.keySuccess}<div class="bio-sec"><div class="bio-sec-lbl">Key Success</div><div class="bio-sec-val">{formData.keySuccess}</div></div>{/if}
        {#if formData.goals || formData.accomplishments || formData.interests || formData.networks || formData.skills}
          <div class="bio-sec"><div class="bio-sec-lbl">GAINS Worksheet</div>
            <div class="gains-grid">
              <div class="gains-item"><div class="gains-item-lbl">Goals</div><div class="gains-item-val" class:empty={!formData.goals}>{formData.goals || '—'}</div></div>
              <div class="gains-item"><div class="gains-item-lbl">Accomplishments</div><div class="gains-item-val" class:empty={!formData.accomplishments}>{formData.accomplishments || '—'}</div></div>
              <div class="gains-item"><div class="gains-item-lbl">Interests</div><div class="gains-item-val" class:empty={!formData.interests}>{formData.interests || '—'}</div></div>
              <div class="gains-item"><div class="gains-item-lbl">Networks</div><div class="gains-item-val" class:empty={!formData.networks}>{formData.networks || '—'}</div></div>
              <div class="gains-item" style="grid-column:1/-1"><div class="gains-item-lbl">Skills</div><div class="gains-item-val" class:empty={!formData.skills}>{formData.skills || '—'}</div></div>
            </div>
          </div>
        {/if}
        {#if formData.contactSphere || formData.contactSphereTop3}
          <div class="bio-sec"><div class="bio-sec-lbl">Contact Sphere</div>
            {#if formData.contactSphere}<div class="bio-sec-val">{formData.contactSphere}</div>{/if}
            {#if formData.contactSphereTop3}<div style="margin-top:6px"><div class="gains-item-lbl" style="color:#888;margin-bottom:3px">Top 3</div><div class="bio-sec-val">{formData.contactSphereTop3}</div></div>{/if}
          </div>
        {/if}
        {#if formData.last10Customers || formData.customerNotes || formData.referralNotes}
          <div class="bio-sec"><div class="bio-sec-lbl">Last 10 Customers</div>
            {#if formData.last10Customers}<div class="bio-sec-val">{formData.last10Customers}</div>{/if}
            {#if formData.customerNotes}<div style="margin-top:4px"><div class="gains-item-lbl" style="color:#888;margin-bottom:2px">Customer Notes</div><div class="bio-sec-val">{formData.customerNotes}</div></div>{/if}
            {#if formData.referralNotes}<div style="margin-top:6px"><div class="gains-item-lbl" style="color:#888;margin-bottom:2px">Referral Notes</div><div class="bio-sec-val">{formData.referralNotes}</div></div>{/if}
          </div>
        {/if}
      </div>
    </div>

    <div class="preview-footer">Powered by Wenoxo Technologies · wenoxo.in</div>
    <div class="sheet-actions">
      <button class="btn" on:click={closePreview} style="flex:1">← Edit</button>
      <button class="btn primary" on:click={downloadPDF} disabled={pdfGenerating} style="flex:2">
        {pdfGenerating ? 'Generating…' : 'Download PDF'}
      </button>
    </div>
  </div>
</div>

<!-- ═══ DESKTOP: Right Slide-in Panel (overlays, does NOT push app) ═══ -->
<div class="desktop-preview-panel" class:open={showPreview}>
  <div class="desktop-panel-topbar">
    <span>Bio Preview</span>
    <button class="panel-close" on:click={closePreview}>✕ Close</button>
  </div>
  <div class="desktop-panel-content">
    <div class="bio-card">
      <div class="bio-head">
        <div class="bio-avi">
          {#if photoData}<img src={photoData} alt="Profile" />{:else}<span>{getInitials()}</span>{/if}
        </div>
        <div class="bio-head-info">
          <div class="bio-head-name">{fullName}</div>
          <div class="bio-head-sub">
            {[currentJob.profession, currentJob.businessName].filter(Boolean).join(' · ') || 'Profession · Business'}
          </div>
        </div>
        <div class="bni-tag">BNI</div>
      </div>

      <div class="bio-chips">
        {#if formData.date}<div class="chip"><div class="chip-lbl">Date</div><div class="chip-val">{formData.date}</div></div>{/if}
        {#if formData.locationCity || formData.locationState}<div class="chip"><div class="chip-lbl">Location</div><div class="chip-val">{[formData.locationCity, formData.locationState].filter(Boolean).join(', ')}</div></div>{/if}
        {#if currentJob.yearsInBusiness}<div class="chip"><div class="chip-lbl">Years in Business</div><div class="chip-val">{currentJob.yearsInBusiness}</div></div>{/if}
        {#if currentJob.companyName || currentJob.businessName}<div class="chip"><div class="chip-lbl">Company</div><div class="chip-val">{currentJob.companyName || currentJob.businessName}</div></div>{/if}
      </div>

      <div class="bio-sections">
        {#if filledCurrentJob.length > 0 || filledPreviousJobs.length > 0}
          <div class="bio-sec">
            <div class="bio-sec-lbl">Business / Profession</div>
            <div class="jobs-preview-list">
              {#each filledCurrentJob as j}
                <div class="job-preview-item">
                  <div class="job-preview-badge current">Current</div>
                  <div class="job-preview-name">{[j.profession, j.businessName].filter(Boolean).join(' · ')}</div>
                  {#if j.companyName || j.yearsInBusiness}
                    <div class="job-preview-sub">{[j.companyName, j.yearsInBusiness && `${j.yearsInBusiness} in business`].filter(Boolean).join(' · ')}</div>
                  {/if}
                </div>
              {/each}
              {#each filledPreviousJobs as j}
                <div class="job-preview-item">
                  <div class="job-preview-badge previous">Previous</div>
                  <div class="job-preview-name">{[j.profession, j.businessName].filter(Boolean).join(' · ')}</div>
                  {#if j.companyName || j.yearsInBusiness}
                    <div class="job-preview-sub">{[j.companyName, j.yearsInBusiness && `${j.yearsInBusiness} in business`].filter(Boolean).join(' · ')}</div>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        {/if}
        {#if formData.timeline}<div class="bio-sec"><div class="bio-sec-lbl">Career Timeline</div><div class="bio-sec-val">{formData.timeline}</div></div>{/if}
        {#if formData.spouseName || formData.childrenNames || formData.animals}
          <div class="bio-sec"><div class="bio-sec-lbl">Family &amp; Pets</div>
            <div class="bio-sec-val">{[formData.spouseName && `Spouse: ${formData.spouseName}`, formData.childrenNames && `Children: ${formData.childrenNames}`, formData.animals && `Pets: ${formData.animals}`].filter(Boolean).join('\n')}</div>
          </div>
        {/if}
        {#if formData.hobbies || formData.activities}<div class="bio-sec"><div class="bio-sec-lbl">Hobbies &amp; Activities</div><div class="bio-sec-val">{[formData.hobbies, formData.activities].filter(Boolean).join(' · ')}</div></div>{/if}
        {#if formData.burningDesire}<div class="bio-sec"><div class="bio-sec-lbl">My Burning Desire</div><div class="bio-sec-val">{formData.burningDesire}</div></div>{/if}
        {#if formData.secretFact}<div class="bio-sec"><div class="bio-sec-lbl">Something Nobody Knows</div><div class="bio-sec-val">{formData.secretFact}</div></div>{/if}
        {#if formData.keySuccess}<div class="bio-sec"><div class="bio-sec-lbl">Key Success</div><div class="bio-sec-val">{formData.keySuccess}</div></div>{/if}
        {#if formData.goals || formData.accomplishments || formData.interests || formData.networks || formData.skills}
          <div class="bio-sec"><div class="bio-sec-lbl">GAINS Worksheet</div>
            <div class="gains-grid">
              <div class="gains-item"><div class="gains-item-lbl">Goals</div><div class="gains-item-val" class:empty={!formData.goals}>{formData.goals || '—'}</div></div>
              <div class="gains-item"><div class="gains-item-lbl">Accomplishments</div><div class="gains-item-val" class:empty={!formData.accomplishments}>{formData.accomplishments || '—'}</div></div>
              <div class="gains-item"><div class="gains-item-lbl">Interests</div><div class="gains-item-val" class:empty={!formData.interests}>{formData.interests || '—'}</div></div>
              <div class="gains-item"><div class="gains-item-lbl">Networks</div><div class="gains-item-val" class:empty={!formData.networks}>{formData.networks || '—'}</div></div>
              <div class="gains-item" style="grid-column:1/-1"><div class="gains-item-lbl">Skills</div><div class="gains-item-val" class:empty={!formData.skills}>{formData.skills || '—'}</div></div>
            </div>
          </div>
        {/if}
        {#if formData.contactSphere || formData.contactSphereTop3}
          <div class="bio-sec"><div class="bio-sec-lbl">Contact Sphere</div>
            {#if formData.contactSphere}<div class="bio-sec-val">{formData.contactSphere}</div>{/if}
            {#if formData.contactSphereTop3}<div style="margin-top:6px"><div class="gains-item-lbl" style="color:#888;margin-bottom:3px">Top 3</div><div class="bio-sec-val">{formData.contactSphereTop3}</div></div>{/if}
          </div>
        {/if}
        {#if formData.last10Customers || formData.customerNotes || formData.referralNotes}
          <div class="bio-sec"><div class="bio-sec-lbl">Last 10 Customers</div>
            {#if formData.last10Customers}<div class="bio-sec-val">{formData.last10Customers}</div>{/if}
            {#if formData.customerNotes}<div style="margin-top:4px"><div class="gains-item-lbl" style="color:#888;margin-bottom:2px">Customer Notes</div><div class="bio-sec-val">{formData.customerNotes}</div></div>{/if}
            {#if formData.referralNotes}<div style="margin-top:6px"><div class="gains-item-lbl" style="color:#888;margin-bottom:2px">Referral Notes</div><div class="bio-sec-val">{formData.referralNotes}</div></div>{/if}
          </div>
        {/if}
      </div>
    </div>

    <div class="preview-footer">Powered by Wenoxo Technologies · wenoxo.in</div>
    <div class="sheet-actions">
      <button class="btn primary" on:click={downloadPDF} disabled={pdfGenerating} style="width:100%;flex:1">
        {pdfGenerating ? 'Generating…' : '⬇ Download PDF'}
      </button>
    </div>
  </div>
</div>