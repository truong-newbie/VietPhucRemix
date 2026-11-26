import * as THREE from 'three';

/**
 * Tạo texture 2.5D độ phân giải cao (768×1024) cho Không gian Trưng bày Di sản:
 * - mainMap: Hình khối Việt phục sắc nét (7 dòng cổ phục + quần/váy) hòa quyện chất liệu Lụa / Gấm / Đũi
 * - accentMap: Lớp nổi phía trước (z + 0.06) gồm cổ áo, khuy đồng, nẹp gấm, đai lụa, mũ/nón tạo chiều sâu parallax khi xoay
 * - backPlaqueMap: Mặt sau bình phong trưng bày bảo tàng (giúp xoay đủ 360° vẫn sang trọng)
 * - bumpMap: Thớ vải vật lý phản chiếu ánh sáng
 */

function hexToRgba(hex, alpha = 1) {
  const clean = (hex || '#8B1A1A').replace('#', '');
  const num = parseInt(clean.length === 3 ? clean.replace(/(.)/g, '$1$1') : clean, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function drawFabricOverlay(ctx, w, h, fabricId) {
  ctx.save();
  ctx.globalCompositeOperation = 'source-atop';

  if (fabricId === 'gam') {
    // Hoa văn gấm chữ Thọ / Mây cổ ánh kim
    ctx.strokeStyle = 'rgba(245, 208, 96, 0.28)';
    ctx.fillStyle = 'rgba(245, 208, 96, 0.08)';
    ctx.lineWidth = 1.6;
    const step = 48;
    for (let y = 24; y < h; y += step) {
      for (let x = 24; x < w; x += step) {
        const ox = (Math.floor(y / step) % 2) * (step / 2);
        ctx.beginPath();
        ctx.arc(x + ox, y, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x + ox, y, 7, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  } else if (fabricId === 'dui') {
    // Đũi mộc: thớ vải sần tự nhiên
    ctx.fillStyle = 'rgba(30, 20, 10, 0.06)';
    for (let y = 0; y < h; y += 5) ctx.fillRect(0, y, w, 1.5);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let x = 0; x < w; x += 7) ctx.fillRect(x, 0, 1.2, h);
  } else {
    // Lụa tơ tằm: ánh bóng chéo mềm mại
    const silkGrad = ctx.createLinearGradient(0, 0, w, h);
    silkGrad.addColorStop(0, 'rgba(255,255,255,0.16)');
    silkGrad.addColorStop(0.38, 'rgba(255,255,255,0.02)');
    silkGrad.addColorStop(0.65, 'rgba(255,245,220,0.12)');
    silkGrad.addColorStop(1, 'rgba(0,0,0,0.14)');
    ctx.fillStyle = silkGrad;
    ctx.fillRect(0, 0, w, h);
  }

  // Tạo khối sáng tối 3D dọc theo thân áo để không bị bẹt
  const foldShade = ctx.createLinearGradient(w * 0.22, 0, w * 0.78, 0);
  foldShade.addColorStop(0, 'rgba(0,0,0,0.18)');
  foldShade.addColorStop(0.25, 'rgba(255,255,255,0.08)');
  foldShade.addColorStop(0.5, 'rgba(255,255,255,0.14)');
  foldShade.addColorStop(0.75, 'rgba(0,0,0,0.05)');
  foldShade.addColorStop(1, 'rgba(0,0,0,0.22)');
  ctx.fillStyle = foldShade;
  ctx.fillRect(0, 0, w, h);

  ctx.restore();
}

export function createDioramaTextures({
  garmentId = 'ngu-than',
  outerHex = '#8B1A1A',
  innerHex = '#F5F5F0',
  bottomHex = '#EFECE6',
  beltHex = '#C9A227',
  headAccessoryId = 'none',
  fabricId = 'lua'
}) {
  if (typeof document === 'undefined') {
    return { mainMap: null, accentMap: null, bumpMap: null, backPlaqueMap: null };
  }

  const w = 768;
  const h = 1024;
  const cx = w / 2;

  const isAoTac = garmentId === 'ao-tac';
  const isNhatBinh = garmentId === 'nhat-binh';
  const isTuThan = garmentId === 'tu-than';
  const isBaBa = garmentId === 'ao-ba-ba';
  const isGiaoLinh = garmentId === 'giao-linh';
  const isAoDai = garmentId === 'ao-dai';

  // === 1. MAIN GARMENT CANVAS ===
  const mainCanvas = document.createElement('canvas');
  mainCanvas.width = w;
  mainCanvas.height = h;
  const ctx = mainCanvas.getContext('2d');
  ctx.clearRect(0, 0, w, h);

  // Bóng đổ mềm phía sau thân áo trên nền bình phong
  ctx.save();
  ctx.shadowColor = 'rgba(29, 36, 64, 0.24)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 12;

  // 1a. Quần lụa hoặc Váy lĩnh bên dưới
  ctx.fillStyle = bottomHex;
  if (isTuThan) {
    ctx.beginPath();
    ctx.moveTo(cx - 72, 480);
    ctx.lineTo(cx + 72, 480);
    ctx.lineTo(cx + 128, 910);
    ctx.quadraticCurveTo(cx, 932, cx - 128, 910);
    ctx.closePath();
    ctx.fill();
  } else {
    // Quần suông 2 ống có nếp ly giữa
    ctx.beginPath();
    ctx.moveTo(cx - 78, 520);
    ctx.lineTo(cx - 8, 520);
    ctx.lineTo(cx - 12, 912);
    ctx.lineTo(cx - 98, 912);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx + 8, 520);
    ctx.lineTo(cx + 78, 520);
    ctx.lineTo(cx + 98, 912);
    ctx.lineTo(cx + 12, 912);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // Đường bóng phân ly 2 ống quần / nếp váy
  ctx.strokeStyle = 'rgba(0,0,0,0.12)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, 560);
  ctx.lineTo(cx, 912);
  ctx.stroke();

  // 1b. Giá cổ gỗ gụ / đồng bảo tàng tinh tế (thay đầu ma-nơ-canh giả)
  const standGrad = ctx.createLinearGradient(cx - 28, 120, cx + 28, 220);
  standGrad.addColorStop(0, '#4E2E1B');
  standGrad.addColorStop(0.5, '#7A492C');
  standGrad.addColorStop(1, '#3D2212');
  ctx.fillStyle = standGrad;
  ctx.beginPath();
  ctx.roundRect(cx - 20, 148, 40, 72, 8);
  ctx.fill();

  const knobGrad = ctx.createRadialGradient(cx - 6, 134, 4, cx, 140, 26);
  knobGrad.addColorStop(0, '#FCE588');
  knobGrad.addColorStop(0.5, '#C9A227');
  knobGrad.addColorStop(1, '#7D5C10');
  ctx.fillStyle = knobGrad;
  ctx.beginPath();
  ctx.arc(cx, 140, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx - 10, 122);
  ctx.lineTo(cx, 96);
  ctx.lineTo(cx + 10, 122);
  ctx.closePath();
  ctx.fill();

  // 1c. Thân áo chính & Tay áo rủ xuống tự nhiên
  const bodyCanvas = document.createElement('canvas');
  bodyCanvas.width = w;
  bodyCanvas.height = h;
  const bctx = bodyCanvas.getContext('2d');

  bctx.fillStyle = outerHex;

  // Tay áo trái & phải rủ cong mềm (KHÔNG bao giờ chĩa lên trời!)
  if (isAoTac || isNhatBinh || isGiaoLinh) {
    // Tay thụng rộng đại lễ rủ mềm từ vai xuống ngang đùi
    // Tay trái
    bctx.beginPath();
    bctx.moveTo(cx - 68, 218);
    bctx.quadraticCurveTo(cx - 172, 232, cx - 224, 396);
    bctx.lineTo(cx - 188, 520);
    bctx.quadraticCurveTo(cx - 128, 540, cx - 86, 442);
    bctx.lineTo(cx - 66, 330);
    bctx.closePath();
    bctx.fill();
    // Tay phải
    bctx.beginPath();
    bctx.moveTo(cx + 68, 218);
    bctx.quadraticCurveTo(cx + 172, 232, cx + 224, 396);
    bctx.lineTo(cx + 188, 520);
    bctx.quadraticCurveTo(cx + 128, 540, cx + 86, 442);
    bctx.lineTo(cx + 66, 330);
    bctx.closePath();
    bctx.fill();
  } else {
    // Tay chẽn / tay ôm thanh lịch rủ dọc thân
    // Tay trái
    bctx.beginPath();
    bctx.moveTo(cx - 64, 218);
    bctx.quadraticCurveTo(cx - 134, 238, cx - 152, 466);
    bctx.lineTo(cx - 118, 474);
    bctx.quadraticCurveTo(cx - 98, 338, cx - 64, 310);
    bctx.closePath();
    bctx.fill();
    // Tay phải
    bctx.beginPath();
    bctx.moveTo(cx + 64, 218);
    bctx.quadraticCurveTo(cx + 134, 238, cx + 152, 466);
    bctx.lineTo(cx + 118, 474);
    bctx.quadraticCurveTo(cx + 98, 338, cx + 64, 310);
    bctx.closePath();
    bctx.fill();
  }

  // Thân áo chính theo dáng từng triều đại
  bctx.beginPath();
  bctx.moveTo(cx - 32, 200);
  bctx.lineTo(cx - 72, 218);
  if (isBaBa) {
    // Áo Bà Ba ngắn ngang mông
    bctx.quadraticCurveTo(cx - 76, 340, cx - 96, 515);
    bctx.quadraticCurveTo(cx, 535, cx + 96, 515);
    bctx.quadraticCurveTo(cx + 76, 340, cx + 72, 218);
  } else if (isAoDai) {
    // Áo Dài chiết eo xẻ tà bay dài
    bctx.quadraticCurveTo(cx - 56, 340, cx - 54, 392);
    bctx.quadraticCurveTo(cx - 96, 580, cx - 122, 838);
    bctx.quadraticCurveTo(cx, 860, cx + 122, 838);
    bctx.quadraticCurveTo(cx + 96, 580, cx + 54, 392);
    bctx.quadraticCurveTo(cx + 56, 340, cx + 72, 218);
  } else if (isTuThan) {
    // Tứ Thân 2 tà trước buông mở nhẹ
    bctx.quadraticCurveTo(cx - 72, 360, cx - 118, 810);
    bctx.lineTo(cx - 18, 818);
    bctx.lineTo(cx, 505);
    bctx.lineTo(cx + 18, 818);
    bctx.lineTo(cx + 118, 810);
    bctx.quadraticCurveTo(cx + 72, 360, cx + 72, 218);
  } else {
    // Ngũ Thân / Áo Tấc / Nhật Bình / Giao Lĩnh: phom chữ A rộng thoáng uy nghi
    const hemHalfW = isAoTac || isNhatBinh || isGiaoLinh ? 156 : 132;
    const hemY = isNhatBinh ? 835 : 815;
    bctx.quadraticCurveTo(cx - 78, 355, cx - hemHalfW, hemY);
    bctx.quadraticCurveTo(cx, hemY + 26, cx + hemHalfW, hemY);
    bctx.quadraticCurveTo(cx + 78, 355, cx + 72, 218);
  }
  bctx.lineTo(cx + 32, 200);
  bctx.closePath();
  bctx.fill();

  // Áp lớp dệt Lụa / Gấm / Đũi lên đúng vùng thân & tay áo
  drawFabricOverlay(bctx, w, h, fabricId);

  // Vẽ dải ngũ sắc tay áo Nhật Bình
  if (isNhatBinh) {
    const bandColors = ['#1F6F5C', '#F9D423', '#F5F5F0', '#8B1A1A', '#2B3A67'];
    bctx.save();
    bctx.globalCompositeOperation = 'source-atop';
    bandColors.forEach((col, i) => {
      bctx.fillStyle = col;
      bctx.fillRect(cx - 230, 448 + i * 11, 145, 11);
      bctx.fillRect(cx + 85, 448 + i * 11, 145, 11);
    });
    bctx.restore();
  }

  // Nếp tà áo mềm
  bctx.strokeStyle = 'rgba(0, 0, 0, 0.14)';
  bctx.lineWidth = 2;
  if (!isBaBa) {
    bctx.beginPath();
    bctx.moveTo(cx - 52, 420);
    bctx.quadraticCurveTo(cx - 72, 620, cx - 84, 812);
    bctx.moveTo(cx + 52, 420);
    bctx.quadraticCurveTo(cx + 72, 620, cx + 84, 812);
    bctx.stroke();
  }

  ctx.drawImage(bodyCanvas, 0, 0);

  const mainMap = new THREE.CanvasTexture(mainCanvas);
  mainMap.colorSpace = THREE.SRGBColorSpace;
  mainMap.anisotropy = 4;

  // === 2. FRONT PARALLAX ACCENT LAYER (z + 0.06) ===
  const accCanvas = document.createElement('canvas');
  accCanvas.width = w;
  accCanvas.height = h;
  const actx = accCanvas.getContext('2d');
  actx.clearRect(0, 0, w, h);

  // Cổ áo & Chi tiết nổi phía trước
  if (isGiaoLinh) {
    // Cổ chéo chữ Y (Hữu Nhậm)
    actx.lineCap = 'round';
    actx.strokeStyle = innerHex;
    actx.lineWidth = 22;
    actx.beginPath();
    actx.moveTo(cx + 38, 198);
    actx.lineTo(cx - 26, 360);
    actx.stroke();

    actx.strokeStyle = beltHex;
    actx.lineWidth = 22;
    actx.beginPath();
    actx.moveTo(cx - 38, 198);
    actx.lineTo(cx + 36, 382);
    actx.stroke();
  } else if (isNhatBinh) {
    // Nẹp ngực chữ Nhật mạ vàng + dải lụa trong
    actx.fillStyle = '#D4AF37';
    actx.beginPath();
    actx.roundRect(cx - 38, 196, 76, 280, 6);
    actx.fill();

    actx.fillStyle = innerHex;
    actx.fillRect(cx - 20, 200, 40, 272);

    actx.strokeStyle = '#8B1A1A';
    actx.lineWidth = 2;
    actx.strokeRect(cx - 38, 196, 76, 280);
  } else if (isTuThan) {
    // Yếm đào hình quả trám
    actx.fillStyle = innerHex;
    actx.beginPath();
    actx.moveTo(cx, 212);
    actx.lineTo(cx + 52, 295);
    actx.lineTo(cx, 385);
    actx.lineTo(cx - 52, 295);
    actx.closePath();
    actx.fill();
    actx.strokeStyle = '#C9A227';
    actx.lineWidth = 2.5;
    actx.stroke();
  } else if (isBaBa) {
    // Cổ tim nhẹ + hàng khuy giữa
    actx.strokeStyle = innerHex;
    actx.lineWidth = 6;
    actx.beginPath();
    actx.moveTo(cx - 28, 204);
    actx.quadraticCurveTo(cx, 236, cx + 28, 204);
    actx.stroke();

    actx.fillStyle = '#E5C672';
    for (let i = 0; i < 5; i++) {
      actx.beginPath();
      actx.arc(cx, 255 + i * 38, 4.5, 0, Math.PI * 2);
      actx.fill();
    }
  } else {
    // Cổ đứng kép Ngũ Thân / Áo Tấc / Áo Dài + Đường hò + 5 hạt khuy Ngũ Thường
    actx.fillStyle = innerHex;
    actx.beginPath();
    actx.roundRect(cx - 32, 182, 64, 24, 6);
    actx.fill();

    actx.fillStyle = outerHex;
    actx.beginPath();
    actx.roundRect(cx - 34, 192, 68, 26, 6);
    actx.fill();
    actx.strokeStyle = 'rgba(0,0,0,0.25)';
    actx.lineWidth = 1.5;
    actx.stroke();

    // Đường tà hò sang nách phải
    actx.strokeStyle = 'rgba(0,0,0,0.22)';
    actx.lineWidth = 2.5;
    actx.beginPath();
    actx.moveTo(cx, 218);
    actx.quadraticCurveTo(cx + 46, 250, cx + 64, 326);
    actx.stroke();

    // 5 hạt khuy Ngũ Thường vàng kim
    [
      [cx + 6, 222],
      [cx + 30, 236],
      [cx + 48, 258],
      [cx + 58, 286],
      [cx + 63, 316]
    ].forEach(([bx, by]) => {
      actx.fillStyle = '#F3D266';
      actx.beginPath();
      actx.arc(bx, by, 5.5, 0, Math.PI * 2);
      actx.fill();
      actx.strokeStyle = '#7D5C10';
      actx.lineWidth = 1.2;
      actx.stroke();
    });
  }

  // Đai thắt lưng / Khăn bao rủ (Tứ Thân / Giao Lĩnh / Nhật Bình)
  if (isTuThan || isGiaoLinh || isNhatBinh) {
    actx.fillStyle = hexToRgba(beltHex, 0.96);
    actx.beginPath();
    actx.roundRect(cx - 72, 378, 144, 24, 6);
    actx.fill();
    // 2 dải lụa buông mềm
    actx.beginPath();
    actx.moveTo(cx - 26, 400);
    actx.lineTo(cx - 46, 560);
    actx.lineTo(cx - 20, 566);
    actx.lineTo(cx - 8, 400);
    actx.fill();

    actx.beginPath();
    actx.moveTo(cx + 8, 400);
    actx.lineTo(cx + 38, 535);
    actx.lineTo(cx + 14, 542);
    actx.lineTo(cx - 4, 400);
    actx.fill();
  }

  // Phụ kiện đầu trên cốt trưng bày
  if (headAccessoryId === 'khan-van') {
    actx.strokeStyle = outerHex;
    actx.lineWidth = 22;
    actx.beginPath();
    actx.ellipse(cx, 126, 52, 22, 0, 0, Math.PI * 2);
    actx.stroke();
    actx.strokeStyle = '#D4AF37';
    actx.lineWidth = 2.5;
    actx.beginPath();
    actx.moveTo(cx - 16, 108);
    actx.lineTo(cx, 128);
    actx.lineTo(cx + 16, 108);
    actx.stroke();
  } else if (headAccessoryId === 'non-quai-thao') {
    actx.fillStyle = '#E8D5B2';
    actx.beginPath();
    actx.ellipse(cx, 106, 132, 36, 0, 0, Math.PI * 2);
    actx.fill();
    actx.strokeStyle = '#C9A227';
    actx.lineWidth = 4;
    actx.stroke();
    // Dải quai thao rủ
    actx.strokeStyle = '#8B1A1A';
    actx.lineWidth = 4;
    actx.beginPath();
    actx.moveTo(cx - 72, 118);
    actx.quadraticCurveTo(cx - 58, 220, cx - 50, 310);
    actx.stroke();
  } else if (headAccessoryId === 'non-la-sen') {
    actx.fillStyle = '#EFE3C6';
    actx.beginPath();
    actx.moveTo(cx, 48);
    actx.lineTo(cx - 118, 134);
    actx.quadraticCurveTo(cx, 146, cx + 118, 134);
    actx.closePath();
    actx.fill();
    actx.strokeStyle = '#C5AF82';
    actx.lineWidth = 2.5;
    actx.stroke();
  } else if (headAccessoryId === 'tram-cai-sen') {
    actx.strokeStyle = '#D4AF37';
    actx.lineWidth = 4;
    actx.beginPath();
    actx.moveTo(cx - 26, 128);
    actx.lineTo(cx + 58, 76);
    actx.stroke();
    actx.fillStyle = '#E65C7B';
    actx.beginPath();
    actx.arc(cx + 62, 74, 9, 0, Math.PI * 2);
    actx.fill();
  }

  const accentMap = new THREE.CanvasTexture(accCanvas);
  accentMap.colorSpace = THREE.SRGBColorSpace;
  accentMap.anisotropy = 4;

  // === 3. BUMP MAP THỚ VẢI ===
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 256;
  bumpCanvas.height = 256;
  const bmctx = bumpCanvas.getContext('2d');
  bmctx.fillStyle = '#808080';
  bmctx.fillRect(0, 0, 256, 256);
  if (fabricId === 'gam') {
    bmctx.strokeStyle = 'rgba(255,255,255,0.45)';
    bmctx.lineWidth = 2;
    for (let y = 24; y < 256; y += 48) {
      for (let x = 24; x < 256; x += 48) {
        bmctx.beginPath();
        bmctx.arc(x, y, 14, 0, Math.PI * 2);
        bmctx.stroke();
      }
    }
  } else if (fabricId === 'dui') {
    for (let y = 0; y < 256; y += 4) {
      bmctx.fillStyle = y % 8 === 0 ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.22)';
      bmctx.fillRect(0, y, 256, 1.5);
    }
  }
  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;
  bumpMap.repeat.set(3, 4);

  // === 4. MẶT SAU BÌNH PHONG DI SẢN (cho góc xoay 360°) ===
  const backCanvas = document.createElement('canvas');
  backCanvas.width = 512;
  backCanvas.height = 680;
  const kctx = backCanvas.getContext('2d');
  const bgGrad = kctx.createLinearGradient(0, 0, 0, 680);
  bgGrad.addColorStop(0, '#2B1410');
  bgGrad.addColorStop(1, '#1D2440');
  kctx.fillStyle = bgGrad;
  kctx.fillRect(0, 0, 512, 680);

  kctx.strokeStyle = '#C9A227';
  kctx.lineWidth = 6;
  kctx.strokeRect(20, 20, 472, 640);
  kctx.lineWidth = 1.5;
  kctx.strokeRect(32, 32, 448, 616);

  // Vòng tròn mặt trời Đông Sơn cách điệu
  kctx.strokeStyle = 'rgba(201, 162, 39, 0.45)';
  kctx.lineWidth = 2;
  kctx.beginPath();
  kctx.arc(256, 260, 95, 0, Math.PI * 2);
  kctx.stroke();
  kctx.beginPath();
  kctx.arc(256, 260, 64, 0, Math.PI * 2);
  kctx.stroke();

  kctx.fillStyle = '#F9D423';
  kctx.font = 'bold 34px "Be Vietnam Pro", sans-serif';
  kctx.textAlign = 'center';
  kctx.fillText('VIỆT PHỤC REMIX', 256, 415);

  kctx.fillStyle = '#E8DFD1';
  kctx.font = '600 18px "Be Vietnam Pro", sans-serif';
  kctx.fillText('BẢO TÀNG SỐ CỔ PHỤC', 256, 452);
  kctx.fillText('Xoay lại mặt trước để ngắm trang phục', 256, 515);

  const backPlaqueMap = new THREE.CanvasTexture(backCanvas);
  backPlaqueMap.colorSpace = THREE.SRGBColorSpace;

  return { mainMap, accentMap, bumpMap, backPlaqueMap };
}
