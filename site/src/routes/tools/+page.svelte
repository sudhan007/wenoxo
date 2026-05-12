<script>
  import { onMount } from 'svelte';

  let currentStep = 0;
  let photoData = '';

  const steps = ['Basic & Business', 'Personal', 'GAINS', 'Contact Sphere', 'Last 10 Customers'];

  let currentJob = { profession: '', businessName: '', companyName: '', yearsInBusiness: '', location: '' };
  let previousJobs = [];

  function addPreviousJob() {
    previousJobs = [...previousJobs, { designation: '', companyName: '' }];
  }
  function removePreviousJob(i) {
    previousJobs = previousJobs.filter((_, idx) => idx !== i);
  }

  let formData = {
    speakerName: '',
    date: '',
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
    contactSphereTop3_1: '',
    contactSphereTop3_2: '',
    contactSphereTop3_3: '',
    last10Customers: '',
    customerNotes: '',
    referralNotes: '',
    chapter: '',
    region: '',
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

  $: filledCurrentJob = (currentJob.profession || currentJob.businessName) ? [currentJob] : [];
  $: filledPreviousJobs = previousJobs.filter(j => j.designation || j.companyName);

  // ─── FORMAT DATE ────────────────────────────────────────────
  function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      const day = d.getDate();
      const month = d.toLocaleString('default', { month: 'long' });
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    } catch { return dateStr; }
  }

  // ─── BUILD PDF HTML ─────────────────────────────────────────
  function buildPDFHTML() {
    const esc = (s) => String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    const nl  = (s) => esc(s).replace(/\n/g,'<br>');

    const photoSrc = photoData || '';
    const displayDate = formatDate(formData.date);

    // Contact sphere lines
    const contactSphereLines = (formData.contactSphere || '')
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);

    // Last 10 customers lines
    const customerLines = (formData.last10Customers || '')
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);

    // Section header: red bold text + centered horizontal line extending to right
    const sectionHeader = (title) =>
      `<div style="margin-top:18px; margin-bottom:8px; display:flex; align-items:center; gap:10px;">
        <div style="font-size:12px; font-weight:700; color:#CC1F1F; text-transform:uppercase; letter-spacing:0.8px; white-space:nowrap;">${title}</div>
        <div style="flex:1; height:1.5px; background:#E0E0E0;margin-top:15px;"></div>
       </div>`;

    const labelVal = (label, value, bold = true) =>
      value ? `<div style="margin-bottom:9px;">
        <div style="font-size:11px; color:#888; margin-bottom:2px;">${esc(label)}</div>
        <div style="font-size:15px; font-weight:${bold ? '600' : '400'}; color:#111;">${nl(value)}</div>
      </div>` : '';

    // Top 3 lines
    const top3 = [formData.contactSphereTop3_1, formData.contactSphereTop3_2, formData.contactSphereTop3_3].filter(Boolean);

    // BNI footer block (repeated on every page)
    const footerHTML = ` `;

    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
  * { box-sizing: border-box; margin:0; padding:0; }
  body { font-family: Arial, Helvetica, sans-serif; background:#fff; color:#111; }
  /* Single content wrapper — no forced page splits */
  .content {
    width: 794px;
    background: #fff;
    padding: 28px 32px 120px 32px;
    display: block;
  }
</style>
</head>
<body>
<div class="content" id="bni-content">

  <!-- Header Row: Photo + Name + Date -->
  <table style="width:100%; margin-bottom:16px; border-collapse:collapse;">
    <tr>
      <td style="width:110px; vertical-align:top;">
        ${photoSrc
          ? `<img src="${photoSrc}" style="width:100px;height:110px;object-fit:cover;border-radius:5px;display:block;" />`
          : `<div style="width:100px;height:110px;background:#EEE;border-radius:5px;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:700;color:#999;">${esc(getInitials())}</div>`
        }
      </td>
      <td style="vertical-align:top; padding-left:16px;">
        <div style="font-size:24px; font-weight:700; color:#CC1F1F; margin-bottom:3px;">${esc(formData.speakerName)}</div>
        <div style="font-size:15px; color:#333; margin-bottom:3px;">${esc(currentJob.profession || currentJob.businessName)}</div>
        ${currentJob.companyName ? `<div style="font-size:13px; color:#555; margin-bottom:5px;">Company Name : ${esc(currentJob.companyName)}</div>` : ''}
        <div style="font-size:12px; color:#555; display:flex; gap:18px; flex-wrap:wrap; margin-top:3px;">
          ${currentJob.yearsInBusiness ? `<span>🗂 ${esc(currentJob.yearsInBusiness)} In Business</span>` : ''}
          ${currentJob.location ? `<span>📍 ${esc(currentJob.location)}</span>` : ''}
        </div>
      </td>
      <td style="vertical-align:top; text-align:right; white-space:nowrap; width:110px;">
        <div style="font-size:13px; color:#555;">${esc(displayDate)}</div>
      </td>
    </tr>
  </table>

  <!-- PREVIOUS TYPES OF JOB -->
  ${filledPreviousJobs.length > 0 ? `
  ${sectionHeader('Previous Types of Job')}
  <table style="width:100%; border-collapse:collapse; margin-bottom:4px;">
    <tr>
      <td style="font-size:11px; color:#888; width:50%; padding-bottom:4px;">Designation</td>
      <td style="font-size:11px; color:#888; padding-bottom:4px;">Company Name</td>
    </tr>
    ${filledPreviousJobs.map(j => `<tr>
      <td style="padding:3px 0; font-size:15px; font-weight:600; color:#111;">${esc(j.designation)}</td>
      <td style="padding:3px 0; font-size:15px; color:#111;">${esc(j.companyName)}</td>
    </tr>`).join('')}
  </table>
  ` : ''}

  <!-- PERSONAL INFORMATION -->
  ${sectionHeader('Personal Information')}
  <table style="width:100%; border-collapse:collapse; margin-bottom:8px;">
    <tr>
      ${formData.spouseName ? `<td style="width:25%; vertical-align:top; padding-right:8px;"><div style="font-size:11px;color:#888;">Spouse/Partner Name</div><div style="font-size:15px;font-weight:600;">${esc(formData.spouseName)}</div></td>` : '<td style="width:25%;"></td>'}
      ${formData.childrenNames ? `<td style="width:25%; vertical-align:top; padding-right:8px;"><div style="font-size:11px;color:#888;">Childrens Name</div><div style="font-size:15px;font-weight:600;">${esc(formData.childrenNames)}</div></td>` : '<td style="width:25%;"></td>'}
      ${formData.residencyCity ? `<td style="width:25%; vertical-align:top; padding-right:8px;"><div style="font-size:11px;color:#888;">City Of Residence</div><div style="font-size:15px;font-weight:600;">${esc(formData.residencyCity)}</div></td>` : '<td style="width:25%;"></td>'}
      ${formData.residencyDuration ? `<td style="width:25%; vertical-align:top;"><div style="font-size:11px;color:#888;">How Long</div><div style="font-size:15px;font-weight:600;">${esc(formData.residencyDuration)}</div></td>` : '<td style="width:25%;"></td>'}
    </tr>
  </table>
  ${formData.hobbies ? `<div style="margin-bottom:8px;"><div style="font-size:11px;color:#888;">Hobbies</div><div style="font-size:15px;font-weight:600;">${esc(formData.hobbies)}</div></div>` : ''}
  ${formData.activities ? `<div style="margin-bottom:8px;"><div style="font-size:11px;color:#888;">Activities Of Interest</div><div style="font-size:15px;font-weight:600;">${esc(formData.activities)}</div></div>` : ''}
  ${formData.animals ? `<div style="margin-bottom:8px;"><div style="font-size:11px;color:#888;">Pets / Animals</div><div style="font-size:15px;font-weight:600;">${esc(formData.animals)}</div></div>` : ''}

  <!-- MISCELLANEOUS -->
  ${sectionHeader('Miscellaneous')}
  ${labelVal('My Burning Desire To', formData.burningDesire)}
  ${labelVal('Something No One Knows About Me', formData.secretFact)}
  ${labelVal('My Key To Success Is', formData.keySuccess)}

  <!-- GAINS WORKSHEET -->
  ${sectionHeader('Gains Worksheet')}
  ${labelVal('Goals', formData.goals)}
  ${labelVal('Accomplishments', formData.accomplishments)}
  ${labelVal('Interests', formData.interests)}
  ${labelVal('Networks', formData.networks)}
  ${labelVal('Skills', formData.skills)}

  <!-- CONTACT SPHERE PLANNING -->
  ${sectionHeader('Contact Sphere Planning')}
  <table style="width:100%; border-collapse:collapse; margin-bottom:6px;">
    <tr>
      <td style="width:55%; vertical-align:top; padding-right:24px;">
        <div style="font-size:11px; color:#888; margin-bottom:6px;">Contact Sphere</div>
        ${contactSphereLines.map((line, i) =>
          `<div style="font-size:15px; color:#111; margin-bottom:5px;">${i+1}. ${esc(line)}</div>`
        ).join('')}
      </td>
      <td style="width:45%; vertical-align:top;">
        <div style="font-size:11px; color:#888; margin-bottom:6px;">Top 3 Contact Sphere Members</div>
        ${top3.map((item, i) =>
          `<div style="font-size:15px; font-weight:600; color:#111; margin-bottom:5px;">${i+1}. ${esc(item)}</div>`
        ).join('')}
      </td>
    </tr>
  </table>

  <!-- LAST 10 CUSTOMERS -->
  ${sectionHeader('Last 10 Customers')}
  <div style="margin-bottom:8px;">
    ${customerLines.map((line, i) => {
      const clean = line.replace(/^\d+[\.\)]\s*/, '');
      const parts = clean.split('–');
      if (parts.length >= 2) {
        return `<div style="font-size:15px; margin-bottom:5px;"><strong>${esc(parts[0].trim())}</strong> – ${esc(parts.slice(1).join('–').trim())}</div>`;
      }
      return `<div style="font-size:15px; margin-bottom:5px;">${i+1}. ${esc(clean)}</div>`;
    }).join('')}
  </div>

  <!-- NOTES -->
  ${sectionHeader('Notes')}
  ${formData.customerNotes ? `<div style="margin-bottom:10px;"><div style="font-size:11px;color:#888;margin-bottom:3px;">Notes On Customer</div><div style="font-size:15px;font-weight:600;">${nl(formData.customerNotes)}</div></div>` : ''}
  ${formData.referralNotes ? `<div style="margin-bottom:10px;"><div style="font-size:11px;color:#888;margin-bottom:3px;">Notes On Referrals</div><div style="font-size:15px;font-weight:600;">${nl(formData.referralNotes)}</div></div>` : ''}

  <!-- FOOTER: Chapter + BNI Logo -->
  ${footerHTML}

</div>
</body>
</html>`;
  }

  function buildFooterHTML() {
  const esc = (s) => String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;padding:14px 0 10px;display:flex;justify-content:space-between;align-items:flex-end; ">
      <div>
        <div style="font-size:18px;font-weight:700;color:#111;">${esc(formData.chapter || 'Chapter Name')}</div>
        <div style="font-size:13px;color:#555;margin-top:2px;">Region : ${esc(formData.region || 'Region')}</div>
      </div>
      <svg width="80" height="42" viewBox="0 0 140 60" xmlns="http://www.w3.org/2000/svg">
        <rect width="140" height="60" rx="4" fill="#CC1F1F"/>
        <text x="70" y="44" font-family="Arial Black,Arial" font-weight="900" font-size="36" fill="white" text-anchor="middle">BNI</text>
      </svg>
    </div>`;
}

  // ─── DOWNLOAD PDF — single canvas, sliced into A4 pages ──
async function downloadPDF() {
  if (pdfGenerating) return;
  pdfGenerating = true;

  try {
    const { jsPDF } = window.jspdf;

    // ── Render main content ──────────────────────────────────
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;background:#fff;font-family:Arial,sans-serif;';
    container.innerHTML = buildPDFHTML();
    document.body.appendChild(container);
    await new Promise(r => setTimeout(r, 400));
    const contentEl = container.querySelector('#bni-content');
    const totalHeightPx = contentEl.scrollHeight;

    // ── Render footer separately ─────────────────────────────
    const footerWrap = document.createElement('div');
    footerWrap.style.cssText = 'position:fixed;left:-9999px;top:0;width:730px;background:#fff;font-family:Arial,sans-serif;';
    footerWrap.innerHTML = buildFooterHTML();
    document.body.appendChild(footerWrap);
    await new Promise(r => setTimeout(r, 200));
    const footerHeightPx = footerWrap.scrollHeight;

    const footerCanvas = await html2canvas(footerWrap, {
      scale: 2, useCORS: true, backgroundColor: '#ffffff',
      width: 730, height: footerHeightPx,
    });
    document.body.removeChild(footerWrap);

    // ── A4 layout math ───────────────────────────────────────
    const pageWidthMM  = 210;
    const pageHeightMM = 297;
    const pxPerMM      = 794 / pageWidthMM;           // ≈ 3.78
    const pageHeightPx = Math.round(pageHeightMM * pxPerMM); // ≈ 1123

    const borderSide  = 5;   // canvas px (scale 2 → 10)
    const borderTop   = 14;  // canvas px (scale 2 → 28)
    const footerPad   = 20;  // gap between footer and bottom border (canvas px × 2)

    // How many logical px of content fit per page (reserves footer area)
    const footerReservePx = Math.ceil(footerHeightPx) + 30; // 30px padding
    const usablePx = pageHeightPx  - 8;    // 8 = top border logical

    // ── Capture full content canvas ──────────────────────────
    const fullCanvas = await html2canvas(contentEl, {
      scale: 2, useCORS: true, backgroundColor: '#ffffff',
      width: 794, height: totalHeightPx,
      windowWidth: 794, windowHeight: totalHeightPx,
    });
    document.body.removeChild(container);

    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
    const totalPages = Math.ceil(totalHeightPx / usablePx);

    for (let p = 0; p < totalPages; p++) {
      if (p > 0) pdf.addPage();

      const sliceStartPx  = p * usablePx;
      const sliceHeightPx = Math.min(usablePx, totalHeightPx - sliceStartPx);

      const pageCanvas = document.createElement('canvas');
      pageCanvas.width  = fullCanvas.width;              // 1588
      pageCanvas.height = Math.round(pageHeightPx * 2); // 2246

      const ctx = pageCanvas.getContext('2d');

      // White background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

      // Content slice (offset below top border)
      ctx.drawImage(
        fullCanvas,
        0, sliceStartPx * 2,
        fullCanvas.width, sliceHeightPx * 2,
        0, borderTop,
        fullCanvas.width, sliceHeightPx * 2
      );

      // Footer — centred horizontally, pinned to bottom

      if (p === totalPages - 1) {
        const footerX = Math.round((pageCanvas.width - footerCanvas.width) / 2);
        const footerY = pageCanvas.height - footerCanvas.height - footerPad - borderSide * 2;
        ctx.drawImage(footerCanvas, footerX, footerY);
      }
      // const footerX = Math.round((pageCanvas.width - footerCanvas.width) / 2);
      // const footerY = pageCanvas.height - footerCanvas.height - footerPad - borderSide * 2;
      // ctx.drawImage(footerCanvas, footerX, footerY);

      // Red borders
     if (p === 0) {
      ctx.fillStyle = '#CC1F1F';
      ctx.fillRect(0, 0, pageCanvas.width, borderTop);
    }

      const imgData = pageCanvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidthMM, pageHeightMM);
    }

    const filename = `BNI-Bio-${(formData.speakerName || 'Member').replace(/\s+/g, '-')}.pdf`;
    pdf.save(filename);

  } catch (e) {
    console.error(e);
    alert('PDF generation failed: ' + e.message);
  } finally {
    pdfGenerating = false;
  }
}

  $: progressPercentage = ((currentStep + 1) / 5) * 100;
  $: fullName = formData.speakerName || 'Your Name';
  $: top3Preview = [formData.contactSphereTop3_1, formData.contactSphereTop3_2, formData.contactSphereTop3_3].filter(Boolean);
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
  }

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

  .sec-header { padding: 16px 16px 8px; }
  .sec-header h2 { font-size: 18px; font-weight: 500; color: #1A1A1A; }
  .sec-header p { font-size: 12px; color: #888; margin-top: 2px; }

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
    text-transform: none;
  }
  .field input:focus, .field textarea:focus {
    border-color: #CC1F1F; background: #fff;
    box-shadow: 0 0 0 3px rgba(204,31,31,0.07);
  }
  .field textarea { resize: none; min-height: 80px; line-height: 1.6; }
  .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

  .photo-upload {
    display: flex; align-items: center; gap: 14px;
    background: #FDF6F6; border: 1.5px dashed #F4AAAA;
    border-radius: 12px; padding: 14px; cursor: pointer;
    margin-bottom: 16px; transition: border-color 0.15s;
  }
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

  .sec-divider {
    font-size: 10px; font-weight: 500; color: #CC1F1F;
    text-transform: uppercase; letter-spacing: 0.8px;
    padding: 4px 0 10px; border-bottom: 1px solid #F0EDE8; margin-bottom: 14px;
  }

  .job-block { margin-bottom: 12px; position: relative; }
  .job-block-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
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

  .top3-inputs { display: flex; flex-direction: column; gap: 8px; }
  .top3-row { display: flex; align-items: center; gap: 10px; }
  .top3-badge {
    width: 24px; height: 24px; border-radius: 50%;
    background: #CC1F1F; color: white;
    font-size: 11px; font-weight: 700;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .top3-row input {
    flex: 1; padding: 10px 12px;
    font-family: 'DM Sans', sans-serif; font-size: 14px;
    background: #FAFAF8; color: #1A1A1A;
    border: 1px solid #E0DDD7; border-radius: 10px;
    outline: none; transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
    -webkit-appearance: none; text-transform: none; width: 100%;
  }
  .top3-row input:focus {
    border-color: #CC1F1F; background: #fff;
    box-shadow: 0 0 0 3px rgba(204,31,31,0.07);
  }

  .bottom-nav {
    position: fixed; bottom: 0; left: 0; right: 0;
    max-width: 430px; margin: 0 auto;
    background: #fff; border-top: 1px solid #EAE8E3;
    padding: 12px 16px; display: flex; gap: 10px;
    z-index: 8; box-shadow: 0 -2px 12px rgba(0,0,0,0.05);
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

  /* Bottom Sheet */
  .sheet-backdrop {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.35);
    z-index: 50; display: none; align-items: flex-end;
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
  .sheet-close { font-size: 18px; color: #999; cursor: pointer; background: none; border: none; padding: 4px 10px; border-radius: 8px; }

  /* Desktop Panel */
  .desktop-preview-panel { display: none; }
  @media (min-width: 768px) {
    .desktop-preview-panel {
      display: block; position: fixed; top: 0; right: 0; bottom: 0;
      width: 450px; background: #F5F4F0;
      border-left: 1px solid #E0DDD7;
      box-shadow: -4px 0 24px rgba(0,0,0,0.10);
      z-index: 50; overflow-y: auto;
      transform: translateX(100%);
      transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
    }
    .desktop-preview-panel.open { transform: translateX(0); }
  }

  .desktop-panel-topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px; background: #fff; border-bottom: 1px solid #E8E6E0;
    position: sticky; top: 0; z-index: 2;
  }
  .desktop-panel-topbar span { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 500; color: #1A1A1A; }
  .panel-close {
    background: #F5F4F0; border: 1px solid #E8E6E0; border-radius: 8px;
    color: #666; font-size: 13px; cursor: pointer; padding: 6px 12px;
    font-family: 'DM Sans', sans-serif; font-weight: 500;
  }

  .desktop-panel-content { padding: 16px; padding-bottom: 100px; }

  /* Bio Preview Card */
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
  .bio-head-name { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600; color: white; }
  .bio-head-sub { font-size: 11px; color: rgba(255,255,255,0.8); margin-top: 3px; }
  .bni-tag { font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.65); letter-spacing: 1.5px; }

  .bio-chips {
    background: #fff; padding: 12px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
    border-left: 1px solid #EAE8E3; border-right: 1px solid #EAE8E3;
  }
  .chip { background: #F9F8F5; border-radius: 8px; padding: 8px 10px; border: 1px solid #EAE8E3; }
  .chip-lbl { font-size: 9px; font-weight: 500; color: #999; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 2px; }
  .chip-val { font-size: 12px; font-weight: 500; color: #1A1A1A; }

  .bio-sections {
    background: #fff; padding: 0 12px 12px;
    border-radius: 0 0 14px 14px; border: 1px solid #EAE8E3; border-top: none;
  }
  .bio-sec { background: #F9F8F5; border-radius: 8px; padding: 10px 12px; margin-top: 8px; border: 1px solid #EAE8E3; }
  .bio-sec-lbl { font-size: 9px; font-weight: 500; color: #CC1F1F; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 5px; }
  .bio-sec-val { font-size: 12px; color: #1A1A1A; line-height: 1.6; white-space: pre-line; }

  .gains-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .gains-item { background: #F9F8F5; border-radius: 8px; padding: 8px 10px; border: 1px solid #EAE8E3; }
  .gains-item-lbl { font-size: 9px; font-weight: 500; color: #CC1F1F; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 3px; }
  .gains-item-val { font-size: 11px; color: #1A1A1A; line-height: 1.5; }
  .gains-item-val.empty { color: #CCC; font-style: italic; }

  .top3-preview-list { display: flex; flex-direction: column; gap: 5px; margin-top: 6px; }
  .top3-preview-item { display: flex; align-items: center; gap: 8px; background: #F0EFEC; border-radius: 7px; padding: 6px 8px; border: 1px solid #E5E3DE; }
  .top3-preview-num { width: 18px; height: 18px; border-radius: 50%; background: #CC1F1F; color: white; font-size: 9px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .top3-preview-text { font-size: 11px; color: #1A1A1A; }

  .preview-footer { text-align: center; font-size: 10px; color: #BBB; padding: 12px 16px 0; }
  .sheet-actions { padding: 12px 12px 0; display: flex; gap: 10px; }

  .jobs-preview-list { display: flex; flex-direction: column; gap: 6px; }
  .job-preview-item { background: #F9F8F5; border-radius: 8px; padding: 8px 10px; border: 1px solid #EAE8E3; }
  .job-preview-badge { font-size: 9px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px; }
  .job-preview-badge.current { color: #CC1F1F; }
  .job-preview-badge.previous { color: #888; }
  .job-preview-name { font-size: 12px; font-weight: 600; color: #1A1A1A; }
  .job-preview-sub { font-size: 11px; color: #666; margin-top: 2px; }

  /* Chapter preview strip */
  .chapter-strip {
    background: #fff; border: 1px solid #EAE8E3; border-top: none;
    border-radius: 0 0 14px 14px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 12px;
  }
  .chapter-info .chapter-name { font-size: 13px; font-weight: 700; color: #1A1A1A; }
  .chapter-info .region-name { font-size: 11px; color: #666; margin-top: 1px; }
  .bni-logo-preview {
    background: #CC1F1F; color: white;
    font-weight: 900; font-size: 16px; letter-spacing: 1px;
    padding: 5px 12px; border-radius: 4px;
  }
</style>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
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

      <div class="sec-divider">Business Information</div>
      <div class="job-block">
        <div class="job-block-header">
          <span class="job-num">Current Job</span>
        </div>
        <div class="field">
          <label>Profession / Role</label>
          <input type="text" placeholder="e.g. Financial Service, Web Developer" bind:value={currentJob.profession} />
        </div>
        <div class="field">
          <label>Business Category <span class="req">*</span></label>
          <input type="text" placeholder="Enter Your Business Category" bind:value={currentJob.businessName} />
        </div>
        <div class="field">
          <label>Company Name</label>
          <input type="text" placeholder="Enter Your Company Name" bind:value={currentJob.companyName} />
        </div>
        <div class="row2">
          <div class="field" style="margin-bottom:0">
            <label>Years in Business</label>
            <input type="text" placeholder="e.g. 8 Years" bind:value={currentJob.yearsInBusiness} />
          </div>
          <div class="field" style="margin-bottom:0">
            <label>Location / Address</label>
            <input type="text" placeholder="e.g. Chennai" bind:value={currentJob.location} />
          </div>
        </div>
      </div>

      <div class="sec-divider">Previous Jobs / Businesses</div>
      {#each previousJobs as job, i}
        <div class="job-block">
          <div class="job-block-header">
            <span class="job-num-prev">Previous Job {i + 1}</span>
            <button class="remove-job-btn" on:click={() => removePreviousJob(i)}>✕</button>
          </div>
          <div class="field">
            <label>Designation</label>
            <input type="text" placeholder="Senior Engineer, Sales Manager" bind:value={job.designation} />
          </div>
          <div class="field" style="margin-bottom:0">
            <label>Company Name</label>
            <input type="text" placeholder="Enter Company Name" bind:value={job.companyName} />
          </div>
        </div>
      {/each}
      <button class="add-job-btn" on:click={addPreviousJob}>
        <span style="font-size:18px;line-height:1">＋</span> Add Previous Job / Business
      </button>
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
        <label>Spouse / Partner Name</label>
        <input type="text" placeholder="Priya Kumar" bind:value={formData.spouseName} />
      </div>
      <div class="field">
        <label>Children's Names</label>
        <input type="text" placeholder="Arjun, Meena" bind:value={formData.childrenNames} />
      </div>
      <div class="field">
        <label>Pets / Animals</label>
        <input type="text" placeholder="Golden Retriever named Bruno" bind:value={formData.animals} />
      </div>
      <div class="sec-divider">Lifestyle</div>
      <div class="field">
        <label>Hobbies</label>
        <textarea placeholder="Playing Cricket, Kabadi & Hockey..." bind:value={formData.hobbies} />
      </div>
      <div class="field">
        <label>Activities &amp; Sports</label>
        <textarea placeholder="Two Wheeler Long Drive, Yoga..." bind:value={formData.activities} />
      </div>
      <div class="sec-divider">Residency</div>
      <div class="row2">
        <div class="field">
          <label>City</label>
          <input type="text" placeholder="Nagercoil" bind:value={formData.residencyCity} />
        </div>
        <div class="field">
          <label>How Long?</label>
          <input type="text" placeholder="40 Years" bind:value={formData.residencyDuration} />
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
        <textarea placeholder="e.g. Process high value loans (above 10 crores)" bind:value={formData.burningDesire} />
      </div>
      <div class="field">
        <label>Something no one knows about me…</label>
        <textarea placeholder="e.g. District level player in kabadi" bind:value={formData.secretFact} />
      </div>
      <div class="field">
        <label>My key to success is…</label>
        <textarea placeholder="e.g. Decision Making, understanding the requirement, punctuality" bind:value={formData.keySuccess} />
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
          style="min-height:160px"
          placeholder="Hotel Business&#10;Hospitals&#10;Schools&#10;Auditor&#10;Tax Consultant..."
          bind:value={formData.contactSphere}
        />
      </div>
      <div class="field">
        <label>Top 3 Contact Sphere Members</label>
        <div class="top3-inputs">
          <div class="top3-row">
            <div class="top3-badge">1</div>
            <input type="text" placeholder="e.g. Bejansing Eye Hospital" bind:value={formData.contactSphereTop3_1} />
          </div>
          <div class="top3-row">
            <div class="top3-badge">2</div>
            <input type="text" placeholder="e.g. Velavan Hospital" bind:value={formData.contactSphereTop3_2} />
          </div>
          <div class="top3-row">
            <div class="top3-badge">3</div>
            <input type="text" placeholder="e.g. Auditors" bind:value={formData.contactSphereTop3_3} />
          </div>
        </div>
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
          style="min-height:160px"
          placeholder="Krishna Balan – Owner Of Jeyam Hotel&#10;Rayappan – Sahaya Madha Ice Planet&#10;Justin – Petrol Station&#10;..."
          bind:value={formData.last10Customers}
        />
      </div>
      <div class="field">
        <label>Notes on Customers</label>
        <textarea
          style="min-height:80px"
          placeholder="Process high value loans (above 10 crores)..."
          bind:value={formData.customerNotes}
        />
      </div>
      <div class="field">
        <label>Notes on Referrals</label>
        <textarea
          style="min-height:80px"
          placeholder="Decision Making, understanding the requirement..."
          bind:value={formData.referralNotes}
        />
      </div>

      <!-- ── NEW: Chapter & Region ── -->
      <div class="sec-divider" style="margin-top:8px;">Chapter Details</div>
      <div class="field">
        <label>Chapter Name <span class="req">*</span></label>
        <input type="text" placeholder="e.g. Comorin Chapter" bind:value={formData.chapter} />
      </div>
      <div class="field" style="margin-bottom:0">
        <label>Region</label>
        <input type="text" placeholder="e.g. Nagercoil" bind:value={formData.region} />
      </div>
    </div>
  </div>

  <!-- BOTTOM NAV -->
  <div class="bottom-nav">
    {#if currentStep > 0}
      <button class="btn" on:click={() => navigate(-1)}>← Back</button>
    {/if}
    <button class="btn" on:click={openPreview}>Preview</button>
    {#if currentStep < 4}
      <button class="btn primary" on:click={() => navigate(1)}>Next →</button>
    {/if}
    {#if currentStep >= 4}
      <button class="btn primary" on:click={downloadPDF} disabled={pdfGenerating}>
        {pdfGenerating ? 'Generating…' : '⬇ Download PDF'}
      </button>
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

    <div style="margin: 14px 12px 0;">
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
        {#if currentJob.yearsInBusiness}<div class="chip"><div class="chip-lbl">Years in Business</div><div class="chip-val">{currentJob.yearsInBusiness}</div></div>{/if}
        {#if currentJob.companyName || currentJob.businessName}<div class="chip"><div class="chip-lbl">Company</div><div class="chip-val">{currentJob.companyName || currentJob.businessName}</div></div>{/if}
        {#if currentJob.location}<div class="chip"><div class="chip-lbl">Location</div><div class="chip-val">{currentJob.location}</div></div>{/if}
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
                  {#if j.companyName}<div class="job-preview-sub">{j.companyName}</div>{/if}
                </div>
              {/each}
              {#each filledPreviousJobs as j}
                <div class="job-preview-item">
                  <div class="job-preview-badge previous">Previous</div>
                  <div class="job-preview-name">{j.designation || '—'}</div>
                  {#if j.companyName}<div class="job-preview-sub">{j.companyName}</div>{/if}
                </div>
              {/each}
            </div>
          </div>
        {/if}
        {#if formData.spouseName || formData.childrenNames || formData.residencyCity}
          <div class="bio-sec"><div class="bio-sec-lbl">Personal</div>
            <div class="bio-sec-val">{[formData.spouseName && `Spouse: ${formData.spouseName}`, formData.childrenNames && `Children: ${formData.childrenNames}`, formData.residencyCity && `City: ${formData.residencyCity}`, formData.residencyDuration && `${formData.residencyDuration}`].filter(Boolean).join(' · ')}</div>
          </div>
        {/if}
        {#if formData.hobbies || formData.activities}
          <div class="bio-sec"><div class="bio-sec-lbl">Hobbies &amp; Activities</div><div class="bio-sec-val">{[formData.hobbies, formData.activities].filter(Boolean).join(' · ')}</div></div>
        {/if}
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
        {#if formData.contactSphere || top3Preview.length > 0}
          <div class="bio-sec"><div class="bio-sec-lbl">Contact Sphere</div>
            {#if formData.contactSphere}<div class="bio-sec-val">{formData.contactSphere}</div>{/if}
            {#if top3Preview.length > 0}
              <div style="margin-top:6px">
                <div class="gains-item-lbl" style="color:#888;margin-bottom:6px">Top 3</div>
                <div class="top3-preview-list">
                  {#each top3Preview as item, idx}
                    <div class="top3-preview-item">
                      <div class="top3-preview-num">{idx + 1}</div>
                      <div class="top3-preview-text">{item}</div>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
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

      <!-- Chapter strip in preview -->
      <div class="chapter-strip">
        <div class="chapter-info">
          <div class="chapter-name">{formData.chapter || 'Chapter Name'}</div>
          <div class="region-name">Region : {formData.region || 'Region'}</div>
        </div>
        <div class="bni-logo-preview">BNI</div>
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

<!-- ═══ DESKTOP: Right Slide-in Panel ═══ -->
<div class="desktop-preview-panel" class:open={showPreview}>
  <div class="desktop-panel-topbar">
    <span>Bio Preview</span>
    <button class="panel-close" on:click={closePreview}>✕ Close</button>
  </div>
  <div class="desktop-panel-content">
    <div>
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
        {#if currentJob.yearsInBusiness}<div class="chip"><div class="chip-lbl">Years in Business</div><div class="chip-val">{currentJob.yearsInBusiness}</div></div>{/if}
        {#if currentJob.companyName || currentJob.businessName}<div class="chip"><div class="chip-lbl">Company</div><div class="chip-val">{currentJob.companyName || currentJob.businessName}</div></div>{/if}
        {#if currentJob.location}<div class="chip"><div class="chip-lbl">Location</div><div class="chip-val">{currentJob.location}</div></div>{/if}
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
                  {#if j.companyName}<div class="job-preview-sub">{j.companyName}</div>{/if}
                </div>
              {/each}
              {#each filledPreviousJobs as j}
                <div class="job-preview-item">
                  <div class="job-preview-badge previous">Previous</div>
                  <div class="job-preview-name">{j.designation || '—'}</div>
                  {#if j.companyName}<div class="job-preview-sub">{j.companyName}</div>{/if}
                </div>
              {/each}
            </div>
          </div>
        {/if}
        {#if formData.spouseName || formData.childrenNames || formData.residencyCity}
          <div class="bio-sec"><div class="bio-sec-lbl">Personal</div>
            <div class="bio-sec-val">{[formData.spouseName && `Spouse: ${formData.spouseName}`, formData.childrenNames && `Children: ${formData.childrenNames}`, formData.residencyCity && `City: ${formData.residencyCity}`, formData.residencyDuration && `${formData.residencyDuration}`].filter(Boolean).join(' · ')}</div>
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
        {#if formData.contactSphere || top3Preview.length > 0}
          <div class="bio-sec"><div class="bio-sec-lbl">Contact Sphere</div>
            {#if formData.contactSphere}<div class="bio-sec-val">{formData.contactSphere}</div>{/if}
            {#if top3Preview.length > 0}
              <div style="margin-top:6px">
                <div class="gains-item-lbl" style="color:#888;margin-bottom:6px">Top 3</div>
                <div class="top3-preview-list">
                  {#each top3Preview as item, idx}
                    <div class="top3-preview-item">
                      <div class="top3-preview-num">{idx + 1}</div>
                      <div class="top3-preview-text">{item}</div>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
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

      <!-- Chapter + BNI in preview -->
      <div class="chapter-strip">
        <div class="chapter-info">
          <div class="chapter-name">{formData.chapter || 'Chapter Name'}</div>
          <div class="region-name">Region : {formData.region || 'Region'}</div>
        </div>
        <div class="bni-logo-preview">BNI</div>
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