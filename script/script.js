document.addEventListener("DOMContentLoaded", function () {
  // 💡 已成功優化：移除所有背景音樂控制邏輯，僅保留高效能圖片淡入偵測器
  const targetElements = document.querySelectorAll(".kv-fade-in, .kv-fade-normal, .kv-fade-left");

  const observerOptions = {
    root: null,
    threshold: 0.55
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  targetElements.forEach(element => {
    observer.observe(element);
  });
});

