// Typewriter effect for subheadline without layout jumping
const subheadline = document.querySelector('.subheadline');
const texts = ["Cinematography.", "Photography.", "Art Direction."];

const TYPE_SPEED = 100;   // ms per character when typing
const ERASE_SPEED = 70;   // ms per character when deleting
const HOLD_TIME  = 2000;  // ms to hold fully-typed text

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Ensure the element never collapses (prevents logo jump)
function setTextSafe(str) {
  subheadline.textContent = str && str.length ? str : '\u00A0'; // NBSP when "empty"
}

// Initialize with non-breaking space
setTextSafe('');

function typeLoop() {
  const current = texts[textIndex];

  if (!isDeleting) {
    // Typing forward
    charIndex = Math.min(charIndex + 1, current.length);
    setTextSafe(current.substring(0, charIndex));

    if (charIndex === current.length) {
      // Hold full text, then start deleting
      return setTimeout(() => { isDeleting = true; typeLoop(); }, HOLD_TIME);
    }
    return setTimeout(typeLoop, TYPE_SPEED);
  } else {
    // Deleting backward
    charIndex = Math.max(charIndex - 1, 0);
    setTextSafe(current.substring(0, charIndex));

    if (charIndex === 0) {
      // Switch to next phrase and start typing
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      return setTimeout(typeLoop, TYPE_SPEED);
    }
    return setTimeout(typeLoop, ERASE_SPEED);
  }
}



// Kick it off
typeLoop();
