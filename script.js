window.addEventListener('DOMContentLoaded', function() {
  const originalOuter = 'rgb(236, 137, 95)';
  const finalOuter = 'rgb(81, 0, 81)';

  const originalInner = 'rgb(255, 255, 255)';
  const finalInner = 'rgb(0, 0, 0)'; 
  
  window.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;
    let maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    let fraction = Math.min(Math.max(scrollPosition / maxScroll, 0), 1);
  
  
    let newOuter = interpolateColor(originalOuter, finalOuter, fraction);
    let newInner = interpolateColor(originalInner, finalInner, fraction);
    document.body.style.background = `
      url(background_temp.png) top center no-repeat,
      linear-gradient(to right, ${newOuter}, ${newInner}, ${newOuter})
    `;
    document.body.style.backgroundSize = `100% auto`;
  });

  function interpolateColor(color1, color2, fraction) {
    color1 = color1.match(/\d+/g).map(Number);
    color2 = color2.match(/\d+/g).map(Number);

    let r = Math.round(color1[0] + fraction * (color2[0] - color1[0]));
    let g = Math.round(color1[1] + fraction * (color2[1] - color1[1]));
    let b = Math.round(color1[2] + fraction * (color2[2] - color1[2]));

    return `rgb(${r}, ${g}, ${b})`;
  }
});