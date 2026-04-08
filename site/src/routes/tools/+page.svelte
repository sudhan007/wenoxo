<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<title>BNI Member Bio Builder – Wenoxo Technologies</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0;}
html,body{height:100%;background:#F5F4F0;}
body{font-family:'DM Sans',sans-serif;}
.app{max-width:430px;margin:0 auto;min-height:100vh;display:flex;flex-direction:column;background:#F5F4F0;}

/* TOP BAR */
.topbar{background:#fff;border-bottom:1px solid #E8E6E0;padding:14px 16px 10px;position:sticky;top:0;z-index:10;}
.topbar-row{display:flex;align-items:center;gap:10px;}
.bni-pill{background:#CC1F1F;color:white;font-family:'Playfair Display',serif;font-weight:600;font-size:13px;padding:4px 10px;border-radius:6px;letter-spacing:.5px;}
.topbar h1{font-family:'Playfair Display',serif;font-size:17px;font-weight:500;color:#1A1A1A;}
.progress-bar{height:3px;background:#EDE9E3;border-radius:2px;margin-top:10px;overflow:hidden;}
.progress-fill{height:100%;background:#CC1F1F;border-radius:2px;transition:width .3s ease;}

/* STEP DOTS */
.step-dots{display:flex;justify-content:center;gap:6px;padding:12px 16px 0;}
.dot{flex:1;height:4px;border-radius:2px;background:#DDD9D2;cursor:pointer;transition:background .2s;}
.dot.done{background:#F4AAAA;}
.dot.active{background:#CC1F1F;}
.step-label{text-align:center;font-size:11px;color:#888;padding:7px 0 2px;}

/* SECTION HEADER */
.sec-header{padding:16px 16px 8px;}
.sec-header h2{font-size:18px;font-weight:500;color:#1A1A1A;}
.sec-header p{font-size:12px;color:#888;margin-top:2px;}

/* FORM CARD */
.form-card{background:#fff;border-radius:16px;margin:0 12px;padding:16px;border:1px solid #EAE8E3;box-shadow:0 1px 4px rgba(0,0,0,.04);}
.field{margin-bottom:16px;}
.field:last-child{margin-bottom:0;}
.field label{display:flex;align-items:center;gap:4px;font-size:12px;font-weight:500;color:#666;margin-bottom:6px;}
.req{color:#CC1F1F;font-size:14px;line-height:1;}
.field input,.field textarea{
  width:100%;padding:12px 14px;font-family:'DM Sans',sans-serif;font-size:15px;
  background:#FAFAF8;color:#1A1A1A;
  border:1px solid #E0DDD7;border-radius:10px;
  outline:none;transition:border-color .15s,background .15s,box-shadow .15s;
  -webkit-appearance:none;
}
.field input:focus,.field textarea:focus{
  border-color:#CC1F1F;background:#fff;
  box-shadow:0 0 0 3px rgba(204,31,31,.07);
}
.field textarea{resize:none;min-height:80px;line-height:1.6;}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:10px;}

/* PHOTO UPLOAD */
.photo-upload{display:flex;align-items:center;gap:14px;background:#FDF6F6;border:1.5px dashed #F4AAAA;border-radius:12px;padding:14px;cursor:pointer;margin-bottom:16px;transition:border-color .15s;}
.photo-upload:active{opacity:.85;}
.photo-circle{width:56px;height:56px;border-radius:50%;background:#fff;border:1px solid #E8E6E0;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;}
.photo-circle img{width:100%;height:100%;object-fit:cover;border-radius:50%;display:none;}
.cam{font-size:22px;}
.photo-text p{font-size:13px;font-weight:500;color:#1A1A1A;}
.photo-text span{font-size:11px;color:#999;}

/* BOTTOM NAV */
.bottom-nav{position:sticky;bottom:0;background:#fff;border-top:1px solid #EAE8E3;padding:12px 16px;display:flex;gap:10px;z-index:10;box-shadow:0 -2px 12px rgba(0,0,0,.05);}
.btn{flex:1;padding:13px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;border-radius:12px;border:1px solid #DDD9D2;background:#F5F4F0;color:#444;cursor:pointer;transition:all .15s;-webkit-appearance:none;}
.btn:active{transform:scale(.97);}
.btn.primary{background:#CC1F1F;color:white;border-color:#CC1F1F;flex:2;}
.btn.primary:active{background:#aa1919;}

/* SECTIONS */
.section{display:none;padding-bottom:90px;}
.section.active{display:block;}

/* BOTTOM SHEET */
.sheet-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.35);z-index:20;display:none;align-items:flex-end;}
.sheet-backdrop.open{display:flex;}
.sheet{background:#F5F4F0;border-radius:22px 22px 0 0;width:100%;max-height:92vh;overflow-y:auto;padding-bottom:40px;}
.sheet-handle{width:36px;height:4px;background:#D4D0C9;border-radius:2px;margin:12px auto 14px;}
.sheet-topbar{display:flex;justify-content:space-between;align-items:center;padding:0 16px 12px;border-bottom:1px solid #E8E6E0;}
.sheet-topbar span{font-family:'Playfair Display',serif;font-size:16px;font-weight:500;color:#1A1A1A;}
.sheet-close{font-size:18px;color:#999;cursor:pointer;background:none;border:none;padding:4px 10px;font-family:'DM Sans',sans-serif;border-radius:8px;}

/* BIO CARD */
.bio-card{margin:14px 12px 0;}
.bio-head{background:#CC1F1F;border-radius:14px 14px 0 0;padding:18px 16px;display:flex;align-items:center;gap:14px;}
.bio-avi{width:60px;height:60px;border-radius:50%;background:rgba(255,255,255,.2);border:2px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:22px;font-weight:600;color:white;flex-shrink:0;overflow:hidden;}
.bio-avi img{width:100%;height:100%;object-fit:cover;border-radius:50%;display:none;}
.bio-head-info{flex:1;min-width:0;}
.bio-head-name{font-family:'Playfair Display',serif;font-size:18px;font-weight:600;color:white;line-height:1.2;}
.bio-head-sub{font-size:11px;color:rgba(255,255,255,.8);margin-top:3px;line-height:1.4;}
.bni-tag{font-family:'Playfair Display',serif;font-size:10px;font-weight:600;color:rgba(255,255,255,.65);letter-spacing:1.5px;}
.bio-chips{background:#fff;padding:12px;display:grid;grid-template-columns:1fr 1fr;gap:8px;border-left:1px solid #EAE8E3;border-right:1px solid #EAE8E3;}
.chip{background:#F9F8F5;border-radius:8px;padding:8px 10px;border:1px solid #EAE8E3;}
.chip-lbl{font-size:9px;font-weight:500;color:#999;text-transform:uppercase;letter-spacing:.6px;margin-bottom:2px;}
.chip-val{font-size:12px;font-weight:500;color:#1A1A1A;word-break:break-word;}
.chip.full{grid-column:1/-1;}
.bio-sections{background:#fff;padding:0 12px 12px;border-radius:0 0 14px 14px;border:1px solid #EAE8E3;border-top:none;}
.bio-sec{background:#F9F8F5;border-radius:8px;padding:10px 12px;margin-top:8px;border:1px solid #EAE8E3;}
.bio-sec-lbl{font-size:9px;font-weight:500;color:#CC1F1F;text-transform:uppercase;letter-spacing:.8px;margin-bottom:5px;}
.bio-sec-val{font-size:12px;color:#1A1A1A;line-height:1.6;}
.bio-sec-val.empty{color:#BBBBBB;font-style:italic;}
.preview-footer{text-align:center;font-size:10px;color:#BBB;padding:12px 16px 0;}
.sheet-actions{padding:12px 12px 0;display:flex;gap:10px;}
</style>
</head>
<body>
<div class="app">

  <!-- TOP BAR -->
  <div class="topbar">
    <div class="topbar-row">
      <div class="bni-pill">BNI</div>
      <h1>Member Bio Builder</h1>
    </div>
    <div class="progress-bar"><div class="progress-fill" id="prog" style="width:25%"></div></div>
  </div>

  <div class="step-dots">
    <div class="dot active" onclick="goStep(0)"></div>
    <div class="dot" onclick="goStep(1)"></div>
    <div class="dot" onclick="goStep(2)"></div>
    <div class="dot" onclick="goStep(3)"></div>
  </div>
  <div class="step-label" id="step-label">Step 1 of 4 — Identity</div>

  <!-- STEP 1: Identity -->
  <div class="section active" id="s0">
    <div class="sec-header"><h2>Your Identity</h2><p>Start with who you are</p></div>
    <div class="form-card">
      <div class="photo-upload" onclick="document.getElementById('photo-input').click()">
        <div class="photo-circle">
          <img id="photo-img" src="" alt="">
          <div class="cam" id="cam-icon">📷</div>
        </div>
        <div class="photo-text"><p>Upload your photo</p><span>JPG or PNG · Recommended</span></div>
        <input type="file" id="photo-input" accept="image/*" style="display:none">
      </div>
      <div class="row2">
        <div class="field"><label>First Name <span class="req">*</span></label><input id="fname" type="text" placeholder="Ravi"></div>
        <div class="field"><label>Last Name <span class="req">*</span></label><input id="lname" type="text" placeholder="Kumar"></div>
      </div>
      <div class="field"><label>Designation / Title</label><input id="title" type="text" placeholder="Managing Director"></div>
      <div class="field"><label>Mobile <span class="req">*</span></label><input id="mobile" type="tel" placeholder="+91 98765 43210"></div>
      <div class="field"><label>Email Address</label><input id="email" type="email" placeholder="ravi@business.com"></div>
      <div class="field"><label>Website</label><input id="website" type="url" placeholder="www.yourbusiness.com"></div>
    </div>
  </div>

  <!-- STEP 2: Business -->
  <div class="section" id="s1">
    <div class="sec-header"><h2>Your Business</h2><p>Tell us what you do</p></div>
    <div class="form-card">
      <div class="field"><label>Business Name <span class="req">*</span></label><input id="bizname" type="text" placeholder="Wenoxo Technologies"></div>
      <div class="field"><label>Industry / Classification</label><input id="industry" type="text" placeholder="Web Design & Development"></div>
      <div class="field"><label>Tagline / USP</label><input id="tagline" type="text" placeholder="One line that makes you memorable"></div>
      <div class="field"><label>Services / Products</label><textarea id="services" placeholder="List your key services..."></textarea></div>
      <div class="field"><label>City / Location</label><input id="city" type="text" placeholder="Chennai, Tamil Nadu"></div>
    </div>
  </div>

  <!-- STEP 3: BNI -->
  <div class="section" id="s2">
    <div class="sec-header"><h2>BNI Profile</h2><p>Your chapter & networking info</p></div>
    <div class="form-card">
      <div class="field"><label>Chapter Name</label><input id="chapter" type="text" placeholder="BNI Pinnacle"></div>
      <div class="row2">
        <div class="field"><label>Member Since</label><input id="since" type="text" placeholder="Jan 2022"></div>
        <div class="field"><label>Chapter Role</label><input id="role" type="text" placeholder="Member / VP"></div>
      </div>
      <div class="field"><label>GAINS Profile</label><textarea id="gains" placeholder="Goals, Accomplishments, Interests, Networks, Skills..."></textarea></div>
      <div class="field"><label>Weekly Highlight</label><textarea id="weekly" placeholder="What should members know this week?"></textarea></div>
    </div>
  </div>

  <!-- STEP 4: Referrals -->
  <div class="section" id="s3">
    <div class="sec-header"><h2>Referral Info</h2><p>Help members refer you better</p></div>
    <div class="form-card">
      <div class="field"><label>Ideal Referral / Customer</label><textarea id="ideal" placeholder="Who is your perfect customer?"></textarea></div>
      <div class="field"><label>Top Referral Sources</label><input id="refs" type="text" placeholder="HR Managers, Startup Founders..."></div>
      <div class="field"><label>How I Can Help You</label><textarea id="help" placeholder="What can you offer fellow members?"></textarea></div>
      <div class="field"><label>Client Testimonial</label><textarea id="testimonial" placeholder='"A quote from a happy client..."'></textarea></div>
    </div>
  </div>

  <!-- BOTTOM NAV -->
  <div class="bottom-nav">
    <button class="btn" id="btn-back" onclick="nav(-1)" style="display:none">← Back</button>
    <button class="btn" id="btn-preview" onclick="openPreview()">Preview</button>
    <button class="btn primary" id="btn-next" onclick="nav(1)">Next →</button>
  </div>
</div>

<!-- PREVIEW SHEET -->
<div class="sheet-backdrop" id="sheet-backdrop" onclick="bgClose(event)">
  <div class="sheet">
    <div class="sheet-handle"></div>
    <div class="sheet-topbar">
      <span>Your Bio Sheet</span>
      <button class="sheet-close" onclick="closePreview()">✕</button>
    </div>
    <div class="bio-card">
      <div class="bio-head">
        <div class="bio-avi">
          <img id="pv-photo" src="" alt="">
          <span id="pv-initials">?</span>
        </div>
        <div class="bio-head-info">
          <div class="bio-head-name" id="pv-name">Your Name</div>
          <div class="bio-head-sub" id="pv-sub">Title · Business</div>
        </div>
        <div class="bni-tag">BNI</div>
      </div>
      <div class="bio-chips">
        <div class="chip"><div class="chip-lbl">Mobile</div><div class="chip-val" id="pv-mobile">—</div></div>
        <div class="chip"><div class="chip-lbl">Email</div><div class="chip-val" id="pv-email">—</div></div>
        <div class="chip"><div class="chip-lbl">Industry</div><div class="chip-val" id="pv-industry">—</div></div>
        <div class="chip"><div class="chip-lbl">Chapter</div><div class="chip-val" id="pv-chapter">—</div></div>
        <div class="chip full" id="pv-city-wrap" style="display:none"><div class="chip-lbl">Location</div><div class="chip-val" id="pv-city"></div></div>
      </div>
      <div class="bio-sections">
        <div class="bio-sec"><div class="bio-sec-lbl">Tagline</div><div class="bio-sec-val empty" id="pv-tagline">Your tagline will appear here…</div></div>
        <div class="bio-sec"><div class="bio-sec-lbl">Services</div><div class="bio-sec-val empty" id="pv-services">Your services will appear here…</div></div>
        <div class="bio-sec" id="pv-gains-wrap" style="display:none"><div class="bio-sec-lbl">GAINS</div><div class="bio-sec-val" id="pv-gains"></div></div>
        <div class="bio-sec" id="pv-ideal-wrap" style="display:none"><div class="bio-sec-lbl">Ideal Referral</div><div class="bio-sec-val" id="pv-ideal"></div></div>
        <div class="bio-sec" id="pv-test-wrap" style="display:none"><div class="bio-sec-lbl">Testimonial</div><div class="bio-sec-val" id="pv-testimonial"></div></div>
      </div>
    </div>
    <div class="preview-footer">Powered by Wenoxo Technologies · wenoxo.in</div>
    <div class="sheet-actions">
      <button class="btn" onclick="closePreview()" style="flex:1">← Edit</button>
      <button class="btn primary" onclick="dlPDF()" style="flex:2">Download PDF</button>
    </div>
  </div>
</div>

<script>
var cur=0, photoData='';
var steps=['Identity','Business','BNI Profile','Referrals'];
function g(id){return document.getElementById(id);}
function v(id){return(g(id)?g(id).value:'').trim();}

function nav(d){
  var n=cur+d;
  if(n<0||n>3)return;
  g('s'+cur).classList.remove('active');
  cur=n;
  g('s'+cur).classList.add('active');
  updateNav();
  window.scrollTo(0,0);
}
function goStep(i){
  g('s'+cur).classList.remove('active');
  cur=i;
  g('s'+cur).classList.add('active');
  updateNav();
}
function updateNav(){
  document.querySelectorAll('.dot').forEach(function(d,i){
    d.classList.remove('active','done');
    if(i<cur) d.classList.add('done');
    else if(i===cur) d.classList.add('active');
  });
  g('prog').style.width=((cur+1)/4*100)+'%';
  g('step-label').textContent='Step '+(cur+1)+' of 4 — '+steps[cur];
  g('btn-back').style.display=cur>0?'block':'none';
  if(cur===3){
    g('btn-next').textContent='Preview ✓';
    g('btn-next').onclick=openPreview;
  } else {
    g('btn-next').textContent='Next →';
    g('btn-next').onclick=function(){nav(1);};
  }
}
function openPreview(){
  var fn=v('fname'), ln=v('lname');
  g('pv-name').textContent=(fn||ln)?(fn+' '+ln).trim():'Your Name';
  g('pv-initials').textContent=((fn?fn[0]:'')+(ln?ln[0]:'')||'?').toUpperCase();
  if(photoData){
    g('pv-photo').src=photoData; g('pv-photo').style.display='block';
    g('pv-initials').style.display='none';
  } else {
    g('pv-photo').style.display='none'; g('pv-initials').style.display='block';
  }
  var t=v('title'), b=v('bizname');
  g('pv-sub').textContent=[t,b].filter(Boolean).join(' · ')||'Title · Business';
  g('pv-mobile').textContent=v('mobile')||'—';
  g('pv-email').textContent=v('email')||'—';
  g('pv-industry').textContent=v('industry')||'—';
  g('pv-chapter').textContent=v('chapter')||'—';
  var cy=v('city');
  if(cy){g('pv-city-wrap').style.display='block'; g('pv-city').textContent=cy;}
  else{g('pv-city-wrap').style.display='none';}
  sv('pv-tagline', v('tagline'), 'Your tagline will appear here…');
  sv('pv-services', v('services'), 'Your services will appear here…');
  sh('pv-gains-wrap','pv-gains', v('gains'));
  sh('pv-ideal-wrap','pv-ideal', v('ideal'));
  var te=v('testimonial');
  if(te){g('pv-test-wrap').style.display='block'; g('pv-testimonial').textContent='"'+te+'"';}
  else{g('pv-test-wrap').style.display='none';}
  g('sheet-backdrop').classList.add('open');
}
function sv(id, val, empty){
  var el=g(id);
  if(val){el.textContent=val; el.classList.remove('empty');}
  else{el.textContent=empty; el.classList.add('empty');}
}
function sh(wid, vid, val){
  if(val){g(wid).style.display='block'; g(vid).textContent=val;}
  else{g(wid).style.display='none';}
}
function closePreview(){g('sheet-backdrop').classList.remove('open');}
function bgClose(e){if(e.target===g('sheet-backdrop')) closePreview();}
function dlPDF(){
  alert('To enable PDF download, integrate html2pdf.js or connect a Puppeteer backend on wenoxo.in.\n\nQuick option: use browser Share → Print → Save as PDF.');
}
document.getElementById('photo-input').addEventListener('change', function(e){
  var file=e.target.files[0]; if(!file) return;
  var r=new FileReader();
  r.onload=function(ev){
    photoData=ev.target.result;
    g('photo-img').src=photoData; g('photo-img').style.display='block';
    g('cam-icon').style.display='none';
  };
  r.readAsDataURL(file);
});
</script>
</body>
</html>
