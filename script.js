window.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const svgImage = document.getElementById('svgImage');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const fitScreenBtn = document.getElementById('fitScreenBtn');

  // Keep track of current zoom level
  let scale = 1;

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
    scale += 0.1;
    svgImage.style.transform = `scale(${scale})`;
  });

  // Zoom Out
  zoomOutBtn.addEventListener('click', () => {
    scale = Math.max(0.1, scale - 0.1); // keep scale above 0
    svgImage.style.transform = `scale(${scale})`;
  });

  // Fit to Screen
  fitScreenBtn.addEventListener('click', () => {
    if (!svgImage.src) return; // If no image loaded, do nothing
    
    // Wait until the image has size info
    const tempImg = new Image();
    tempImg.src = svgImage.src;
    
    // onload ensures we have the natural width/height
    tempImg.onload = () => {
      const naturalWidth = tempImg.naturalWidth;
      const naturalHeight = tempImg.naturalHeight;

      // Container dimensions
      const container = document.getElementById('svgContainer');
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      // We want to scale so the SVG fits within the container in both dimensions
      const widthRatio = containerWidth / naturalWidth;
      const heightRatio = containerHeight / naturalHeight;
      scale = Math.min(widthRatio, heightRatio);

      // Apply the new scale
      svgImage.style.transform = `scale(${scale})`;
    };
  });
});
