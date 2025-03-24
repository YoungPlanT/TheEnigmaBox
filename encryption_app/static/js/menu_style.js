document.addEventListener('DOMContentLoaded', function() {
    const methodList = document.querySelector('.method-list');
    const alphabetList = document.querySelector('.alphabet-list');
    
    function habdleItemClick(list, itemClass) {
        let selectedItem = null;

        list.addEventListener('click', function(event) {
            const target = event.target;

            if (target.classList.contains(itemClass)) {
                if (selectedItem) {
                    selectedItem.classList.remove('selected');
                }

                target.classList.add('selected');
                selectedItem = target;
            }
        });
    }

    habdleItemClick(methodList, 'method-item');
    habdleItemClick(alphabetList, 'alphabet-item');
});