// Nén ảnh tải lên xuống tối đa 1280px (JPEG 0.85) để không vượt giới hạn payload 4.5MB của Vercel Serverless

export function compressImageFile(file, maxDim = 1280, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('Chưa chọn tệp ảnh.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Không đọc được tệp ảnh.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Tệp không phải ảnh hợp lệ.'));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width >= height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
