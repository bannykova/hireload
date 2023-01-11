(function() {

    function tagSelect() {
        let tagModule = document.querySelectorAll('.tag-select');

        tagModule.forEach(module => {
            let tagInput = module.querySelector('.tag-select-input');
            let tagSelected = module.querySelector('.tag-select-selected');

            let tagDropdownList = module.querySelector('.tag-select-dropdown-list');
            let tagSelect = module.querySelector('.tag-select select');
            let tagSelectOption = module.querySelectorAll('.tag-select select option');

            if (tagSelectOption) {
                tagSelectOption.forEach(el => {
                    let liSelected = document.createElement('li');
                    let liDropdown = document.createElement('li');
                    let hasAttr = el.hasAttribute('selected');

                    liSelected.dataset.id = el.value;
                    liSelected.innerHTML = el.innerText + '<span class="tag-select-close">&times;</span>';
                    tagSelected.appendChild(liSelected);

                    if (!hasAttr) {
                        liSelected.classList.add('is-hidden')
                    }

                    liDropdown.dataset.id = el.value;
                    liDropdown.innerHTML = el.innerText;

                    if (hasAttr) {
                        liDropdown.classList.add('is-active');
                    }

                    tagDropdownList.appendChild(liDropdown);

                    tagDropdownList.childNodes.forEach(em => {
                        em.addEventListener('click', function() {
                            if (em.dataset.id === liSelected.dataset.id) {
                                liSelected.classList.toggle('is-hidden');
                                liDropdown.classList.toggle('is-active');
                                el.toggleAttribute('selected');
                            }
                        })
                    });

                    let tagClose = module.querySelectorAll('.tag-select-close');
                    tagClose.forEach(em => {
                        em.addEventListener('click', function() {
                            if (liSelected.dataset.id === em.parentNode.dataset.id) {
                                liSelected.classList.toggle('is-hidden');
                                liDropdown.classList.toggle('is-active');
                                el.toggleAttribute('selected');
                            }
                        });
                    });
                })
            }

            module.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    let dataId = module.querySelectorAll('[data-id]');
                    let tagValue = tagInput.value;
                    let liSelected = document.createElement('li');
                    let liDropdown = document.createElement('li');
                    let option = document.createElement('option');

                    liSelected.dataset.id = tagValue;
                    liSelected.innerHTML = tagValue + '<span class="tag-select-close">&times;</span>';

                    liDropdown.dataset.id = tagValue;
                    liDropdown.innerHTML = tagValue;
                    liDropdown.classList.add('is-active');

                    option.dataset.id = tagValue;
                    option.innerHTML = tagValue;
                    option.value = tagValue;
                    option.setAttribute('selected', '');

                    if (tagValue !== '') {
                        tagDropdownList.appendChild(liDropdown);
                        tagSelected.appendChild(liSelected);
                        tagSelect.appendChild(option);
                    }

                    tagInput.value = '';

                    dataId.forEach(el => {
                        if (tagValue === el.dataset.id) {
                            el.remove();
                        }
                    });

                    tagDropdownList.childNodes.forEach(el => {
                        el.addEventListener('click', function() {
                            if (el.dataset.id === liSelected.dataset.id) {
                                liSelected.classList.toggle('is-hidden');
                                liDropdown.classList.toggle('is-active');
                                option.toggleAttribute('selected');
                            }
                        })
                    });

                    let tagClose = module.querySelectorAll('.tag-select-close');
                    tagClose.forEach(el => {
                        el.addEventListener('click', function() {
                            if (option.dataset.id === el.parentNode.dataset.id) {
                                liSelected.classList.add('is-hidden');
                                liDropdown.classList.remove('is-active');
                                option.removeAttribute('selected');
                            }
                        });
                    });
                }
            })
        })


        let tagSelectClick = function(e) {
            if (!e.target.matches('.tag-select-dropdown *')) {
                document.querySelectorAll('.tag-select-dropdown').forEach(e => {
                    e.classList.remove('is-active');
                })
            }

            if (e.target.className.includes('tag-select-selected')) {
                let tagSelected = e.target.nextElementSibling;
                tagSelected.classList.toggle('is-active');
            }
        }

        window.addEventListener('click', tagSelectClick)
    }

    window.addEventListener('load', tagSelect);

})();