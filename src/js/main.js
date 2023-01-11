(function() {

    // Header Menu
    let headerMenu = document.querySelector('.header-menu');
    let headerToggle = document.querySelector('.header-menu-toggle');

    headerToggle.addEventListener('click', function() {
        headerMenu.classList.toggle('is-active');
        this.classList.toggle('is-active');
    })

    // Scroll Animation
    function motion() {
        let motion = document.querySelectorAll('[data-motion]');

        for (let i = 0; i < motion.length; i++) {
            let top = motion[i].getBoundingClientRect().top;

            if (top < window.innerHeight - 200) {
                motion[i].classList.add('has-motion')
            }
        }
    }


    // Wave
    function wave(pos) {
        let wave = document.querySelectorAll('.wave');

        let w = window.innerWidth / 2;
        let h = window.innerHeight / 2;

        let x = pos.clientX;
        let y = pos.clientY;

        wave.forEach(el => {
            let depth = '0.01' * el.dataset.depth;

            el.style.transform = `translate(${(x - w) * depth}px, ${(y - h) * depth}px)`;
        });
    }

    window.addEventListener('mousemove', wave);
    window.addEventListener('scroll', motion);
    window.addEventListener('load', motion);

})();