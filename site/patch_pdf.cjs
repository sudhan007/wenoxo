const fs = require('fs');
const path = 'src/routes/tools/+page.svelte';
let content = fs.readFileSync(path, 'utf-8');

// Find the old PDF generation block by its unique start/end markers
const START = '  // \u2500\u2500 Original PDF generation (unchanged)';
const END_MARKER = "    pdf.save(filename);\r\n  } catch (e) {\r\n    console.error(e);\r\n  } finally {\r\n    pdfGenerating = false;\r\n  }\r\n}";

const startIdx = content.indexOf(START);
if (startIdx === -1) { console.error('START not found'); process.exit(1); }

const endIdx = content.indexOf(END_MARKER, startIdx);
if (endIdx === -1) { console.error('END not found'); process.exit(1); }

const blockEnd = endIdx + END_MARKER.length;

const newBlock = `  // \u2500\u2500 Smart-break PDF generation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  try {
    const { jsPDF } = window.jspdf;
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;background:#fff;font-family:\\"Roboto\\",Arial,sans-serif;';
    container.innerHTML = buildPDFHTML();
    document.body.appendChild(container);
    await new Promise(r => setTimeout(r, 400));
    const contentEl = container.querySelector('#bni-content');
    const totalHeightPx = contentEl.scrollHeight;

    const footerWrap = document.createElement('div');
    footerWrap.style.cssText = 'position:fixed;left:-9999px;top:0;width:730px;background:#fff;font-family:\\"Roboto\\",Arial,sans-serif;';
    footerWrap.innerHTML = buildFooterHTML();
    document.body.appendChild(footerWrap);
    await new Promise(r => setTimeout(r, 200));
    const footerHeightPx = footerWrap.scrollHeight;
    const footerCanvas = await html2canvas(footerWrap, {
      scale: 2, useCORS: true, backgroundColor: '#ffffff',
      width: 730, height: footerHeightPx,
    });
    document.body.removeChild(footerWrap);

    const pageWidthMM  = 210;
    const pageHeightMM = 297;
    const pxPerMM      = 794 / pageWidthMM;
    const pageHeightPx = Math.round(pageHeightMM * pxPerMM);
    const borderTop    = 14;
    const footerPad    = 20;
    const usablePx     = pageHeightPx - 8;

    const fullCanvas = await html2canvas(contentEl, {
      scale: 2, useCORS: true, backgroundColor: '#ffffff',
      width: 794, height: totalHeightPx,
      windowWidth: 794, windowHeight: totalHeightPx,
    });
    document.body.removeChild(container);

    // \u2500\u2500 Smart page-break: scan backwards for an all-white row \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    const canvasScale  = 2;
    const usableScaled = usablePx * canvasScale;
    const searchRange  = 120 * canvasScale; // scan up to 120 content-px back

    function findSmartBreak(nominalY) {
      const ctx      = fullCanvas.getContext('2d');
      const scanFrom = Math.max(0, nominalY - searchRange);
      const scanH    = nominalY - scanFrom;
      if (scanH <= 0) return nominalY;
      const imgData  = ctx.getImageData(0, scanFrom, fullCanvas.width, scanH);
      for (let row = scanH - 1; row >= 0; row--) {
        let white = true;
        for (let col = 0; col < fullCanvas.width; col++) {
          const i = (row * fullCanvas.width + col) * 4;
          if (imgData.data[i] < 240 || imgData.data[i+1] < 240 || imgData.data[i+2] < 240) {
            white = false; break;
          }
        }
        if (white) return scanFrom + row;
      }
      return nominalY;
    }

    // Build slices using smart break points (canvas coordinates)
    const slices = [];
    let pos = 0;
    while (pos < fullCanvas.height) {
      const nominalEnd = pos + usableScaled;
      if (nominalEnd >= fullCanvas.height) {
        slices.push({ start: pos, end: fullCanvas.height });
        break;
      }
      const smartEnd = findSmartBreak(nominalEnd);
      slices.push({ start: pos, end: smartEnd });
      pos = smartEnd;
    }
    // \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

    for (let p = 0; p < slices.length; p++) {
      if (p > 0) pdf.addPage();
      const { start, end } = slices[p];
      const sliceH = end - start;

      const pageCanvas = document.createElement('canvas');
      pageCanvas.width  = fullCanvas.width;
      pageCanvas.height = Math.round(pageHeightPx * canvasScale);
      const ctx = pageCanvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      ctx.drawImage(
        fullCanvas,
        0, start, fullCanvas.width, sliceH,
        0, borderTop, fullCanvas.width, sliceH
      );
      if (p === slices.length - 1) {
        const footerX = Math.round((pageCanvas.width - footerCanvas.width) / 2);
        const footerY = pageCanvas.height - footerCanvas.height - footerPad - 10;
        ctx.drawImage(footerCanvas, footerX, footerY);
      }
      if (p === 0) {
        ctx.fillStyle = '#CC1F1F';
        ctx.fillRect(0, 0, pageCanvas.width, borderTop);
      }
      const imgData = pageCanvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidthMM, pageHeightMM);
    }

    pdf.save(\`BNI-Bio-\${(formData.speakerName || 'Member').replace(/\\s+/g, '-')}.pdf\`);
  } catch (e) {
    console.error(e);
  } finally {
    pdfGenerating = false;
  }
}`;

// Normalise newlines for the replacement (file uses CRLF)
const newBlockCRLF = newBlock.replace(/\r?\n/g, '\r\n');

content = content.substring(0, startIdx) + newBlockCRLF + content.substring(blockEnd);
fs.writeFileSync(path, content);
console.log('Smart-break PDF generation applied successfully.');
