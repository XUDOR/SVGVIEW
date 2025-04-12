window.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const svgImage = document.getElementById('svgImage');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const fitScreenBtn = document.getElementById('fitScreenBtn');
  const resetBtn = document.getElementById('resetBtn');
  const x10Toggle = document.getElementById('x10Toggle');

  // Keep track of current zoom level
  let scale = 1;

  // Decide on the zoom step
  function getZoomStep() {
    return x10Toggle.checked ? 1.0 : 0.1;
  }

  // Handle file selection
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file && file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => {
        svgImage.src = e.target.result;
        scale = 1; // Reset scale each time a new file is loaded
        svgImage.style.transform = `scale(${scale})`;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid SVG file.');
    }
  });

  // Zoom In
  zoomInBtn.addEventListener('click', () => {
    scale += getZoomStep();
    svgImage.style.transform = `scale(${scale})`;
  });

  // Zoom Out
  zoomOutBtn.addEventListener('click', () => {
    scale = Math.max(0.1, scale - getZoomStep());
    svgImage.style.transform = `scale(${scale})`;
  });

  // Fit to Screen
  fitScreenBtn.addEventListener('click', () => {
    if (!svgImage.src) return; // If no image is loaded, do nothing
    
    const tempImg = new Image();
    tempImg.src = svgImage.src;
    tempImg.onload = () => {
      const naturalWidth = tempImg.naturalWidth;
      const naturalHeight = tempImg.naturalHeight;
      
      // Container dimensions
      const container = document.getElementById('svgContainer');
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      // Fit so image won't overflow either dimension
      const widthRatio = containerWidth / naturalWidth;
      const heightRatio = containerHeight / naturalHeight;
      scale = Math.min(widthRatio, heightRatio);

      svgImage.style.transform = `scale(${scale})`;
    };
  });

  // Reset to default (100%) zoom
  resetBtn.addEventListener('click', () => {
    scale = 1;
    svgImage.style.transform = `scale(${scale})`;
  });
});
