document.addEventListener("DOMContentLoaded", function () {
  // 💡 已成功修改：將三個 Class (.kv-fade-in, .kv-fade-normal, .kv-fade-left) 整合進同一個高效能偵測器中
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
