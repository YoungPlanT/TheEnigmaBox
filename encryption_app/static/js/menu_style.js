document.addEventListener('DOMContentLoaded', function() {
    const methodList = document.querySelector('.method-list');
    const alphabetList = document.querySelector('.alphabet-list');
    let selectedItem_methodItem = null;
    let selectedItem_alphabetItem = null;
    
    methodList.addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('method-item')) {
            if (selectedItem_methodItem) {
                selectedItem_methodItem.classList.remove('selected');
            }
            target.classList.add('selected');
            selectedItem_methodItem = target;
        }
    })

    alphabetList.addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('alphabet-item')) {
            if (selectedItem_alphabetItem) {
                selectedItem_alphabetItem.classList.remove('selected');
            }
            target.classList.add('selected');
            selectedItem_alphabetItem = target;
        }
    })
})