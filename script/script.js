let hasInteracted = false;

document.addEventListener("DOMContentLoaded", function () {
  // 📌 1. 網頁元素動態偵測器（保持你的圖片淡入特效）
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

  // 📌 2. 初始化無感背景音樂
  initBackgroundMusic();
});

function initBackgroundMusic() {
  const bgm = document.getElementById('bgm');
  if (!bgm) return;

  // 預設將婚禮襯底音量調小至輕柔舒適的 30%
  bgm.volume = 0.3;

  // 【核心無感啟動器】只要手一摸到網頁、或者準備開始滑動，就強制瞬間啟動音樂
  function autoPlayOnGesture() {
    if (!hasInteracted) {
      bgm.play()
        .then(() => {
          hasInteracted = true;
          console.log("🌸 背景音樂已在賓客滑動/觸碰時無感啟動！ 🌸");
          
          // 播放成功後立刻清除所有臨時監聽器，絕不卡頓手機
          removeMusicListeners();
        })
        .catch(error => {
          // 捕捉因為完全沒碰螢幕而被瀏覽器拒絕的紀錄
          console.log("等待有效手勢中...", error);
        });
    }
  }

  // 監聽手機版最重要的「手指觸碰（touchstart）」和「滑動（scroll）」事件
  // 使用 capture: true 確保這段網頁擁有最高優先解鎖權限
  window.addEventListener('touchstart', autoPlayOnGesture, { capture: true, passive: true });
  document.addEventListener('touchstart', autoPlayOnGesture, { capture: true, passive: true });

  window.addEventListener('scroll', autoPlayOnGesture, { passive: true });
  window.addEventListener('touchmove', autoPlayOnGesture, { passive: true });
  window.addEventListener('click', autoPlayOnGesture);
  window.addEventListener('pointerdown', autoPlayOnGesture);

  function removeMusicListeners() {
    window.removeEventListener('touchstart', autoPlayOnGesture, { capture: true });
    document.removeEventListener('touchstart', autoPlayOnGesture, { capture: true });
    window.removeEventListener('scroll', autoPlayOnGesture);
    window.removeEventListener('touchmove', autoPlayOnGesture);
    window.removeEventListener('click', autoPlayOnGesture);
    window.removeEventListener('pointerdown', autoPlayOnGesture);
  }
}


