document.addEventListener('DOMContentLoaded', () => {
    const confettiContainer = document.querySelector('.confetti-container');
    const bubblesContainer = document.querySelector('.bubbles');
    
    // Tạo container cho pháo giấy
    const confettiContainerElement = document.createElement('div');
    confettiContainerElement.className = 'confetti-container';
    document.body.appendChild(confettiContainerElement);

    // Music Control
    const musicButton = document.querySelector('.music-button');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    musicButton.addEventListener('click', () => {
        if (!isPlaying) {
            bgMusic.play();
            musicButton.classList.add('playing');
            isPlaying = true;
        } else {
            bgMusic.pause();
            musicButton.classList.remove('playing');
            isPlaying = false;
        }
    });

    // Xử lý sự kiện cho letter popup
    const letterIcon = document.querySelector('.letter-icon');
    const arrowHint = document.querySelector('.arrow-hint');
    const letterPopup = document.querySelector('.letter-popup');
    const closeBtn = document.querySelector('.close-btn');

    // Function để hiển thị popup thư
    function showLetter() {
        letterPopup.style.display = 'flex';
        letterPopup.style.opacity = '0';
        // Thêm animation fade in
        requestAnimationFrame(() => {
            letterPopup.style.opacity = '1';
        });
        // Thêm class để ngăn scroll
        document.body.style.overflow = 'hidden';
        // Ẩn pháo giấy
        confettiContainerElement.style.display = 'none';
    }

    // Function để đóng popup thư
    function closeLetter() {
        letterPopup.style.opacity = '0';
        setTimeout(() => {
            letterPopup.style.display = 'none';
            // Cho phép scroll lại
            document.body.style.overflow = '';
            // Hiện lại pháo giấy
            confettiContainerElement.style.display = 'block';
        }, 300);
    }

    // Click vào icon thư
    letterIcon.addEventListener('click', showLetter);

    // Click vào gợi ý thư
    arrowHint.addEventListener('click', showLetter);

    // Đóng popup khi click vào nút close
    closeBtn.addEventListener('click', closeLetter);

    // Đóng popup khi click ra ngoài
    letterPopup.addEventListener('click', (e) => {
        if (e.target === letterPopup) {
            closeLetter();
        }
    });

    // Tạo pháo giấy
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Vị trí ngẫu nhiên
        const startPositionX = Math.random() * window.innerWidth;
        confetti.style.left = startPositionX + 'px';
        confetti.style.top = '-20px';
        
        // Màu sắc ngẫu nhiên
        const colors = ['#ff9999', '#ff7777', '#ffb366', '#99ff99', '#99ccff', '#ff99cc'];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Kích thước ngẫu nhiên
        const size = Math.random() * 8 + 6;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        // Góc xoay ngẫu nhiên
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        confettiContainerElement.appendChild(confetti);
        
        // Animation
        const animation = confetti.animate([
            {
                transform: `translate(0, 0) rotate(0deg)`,
                opacity: 1
            },
            {
                transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`,
                opacity: 0
            }
        ], {
            duration: Math.random() * 2000 + 3000,
            easing: 'cubic-bezier(.37,0,.63,1)'
        });
        
        // Xóa phần tử sau khi animation kết thúc
        animation.onfinish = () => confetti.remove();
    }
    
    // Tạo bong bóng
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = Math.random() * 50 + 20;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.animationDuration = Math.random() * 5 + 5 + 's';
        
        bubblesContainer.appendChild(bubble);
        
        setTimeout(() => {
            bubble.remove();
        }, 8000);
    }
    
    // Tạo pháo giấy liên tục
    function startConfetti() {
        // Tạo nhiều pháo giấy ban đầu
        for (let i = 0; i < 50; i++) {
            setTimeout(createConfetti, Math.random() * 1000);
        }
        
        // Tiếp tục tạo pháo giấy
        setInterval(createConfetti, 50);
    }

    // Bắt đầu hiệu ứng pháo giấy
    startConfetti();
    
    // Tạo bong bóng liên tục
    setInterval(createBubble, 500);

    // Password handling
    const passwordLayer = document.querySelector('.password-layer');
    const passwordInput = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitPassword');
    const correctPassword = '1606'; // Mật khẩu là ngày sinh nhật 04/02

    function checkPassword() {
        const enteredPassword = passwordInput.value;
        if (enteredPassword === correctPassword) {
            passwordLayer.classList.add('hidden');
            startConfetti(); // Bắt đầu hiệu ứng pháo giấy sau khi nhập đúng mật khẩu
        } else {
            passwordInput.value = '';
            passwordInput.placeholder = 'Mật khẩu không đúng, thử lại...';
            passwordInput.style.borderColor = '#ff5555';
            setTimeout(() => {
                passwordInput.placeholder = 'Nhập mật khẩu...';
                passwordInput.style.borderColor = '#ffcece';
            }, 2000);
        }
    }

    submitButton.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
}); 