document.getElementById("smash_table").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: smash
  });
});

function smash() {
  const video = document.createElement("video");

video.src = chrome.runtime.getURL("magnus.mp4");

video.autoplay = true;
video.muted = false;//hmm if the video gets block it might be because of this
video.controls = false;
video.playsInline = true;

video.style.position = "fixed";
video.style.top = "50%";
video.style.left = "50%";
video.style.transform = "translate(-50%, -50%)";
video.style.zIndex = 999999;

video.style.width = "20vw";
video.style.height = "auto";

document.body.appendChild(video);
video.play().catch((err) => {
  console.log("Autoplay blocked or failed:", err);
});

video.onended = () => {
  video.remove();
};

console.log("testing123");
  const pieces = document.querySelectorAll('.piece');

  const items = Array.from(pieces).map(piece => {
    const rect = piece.getBoundingClientRect();

    return {
      el: piece,
      startX: rect.left,
      startY: rect.top,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10   // random velocity
    };
  });

  let t = 0;

  const interval = setInterval(() => {
    t++;

    items.forEach(item => {
      item.vy += 0.3; // gravity

      const x = item.vx * t;
      const y = item.vy * t;

      item.el.style.transform =
        `translate(${x}px, ${y}px) rotate(${t * 2}deg)`;//bruh so harddddddddd
    });

    if (t >= 90) clearInterval(interval);
  }, 16);
}