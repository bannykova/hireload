(function() {

    let body = document.querySelector('body').classList;
    let modalBtn = document.querySelectorAll('[data-modal], .modal-close');

    modalBtn.forEach(el => {
        let modal = document.getElementById(modalBtn[0].dataset.modal).classList;

        el.addEventListener('click', function() {
            modal.toggle('is-active');
            body.toggle('no-scroll');
        });
    });

})();