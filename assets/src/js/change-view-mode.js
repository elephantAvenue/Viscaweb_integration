document.addEventListener("DOMContentLoaded", function () {

    let $changeView = document.getElementById('change-view')

    let $bookmakers = document.querySelectorAll('.Bookmakers-items')

    if ($bookmakers.length > 0) {

        if ($changeView) {

            $changeView.addEventListener('click', (e) => {

                if ($changeView.checked) {

                    $bookmakers.forEach((item, index) => {
                        item.classList.add('Bookmakers-items--gridView')
                    })

                } else {
                    $bookmakers.forEach((item, index) => {
                        item.classList.remove('Bookmakers-items--gridView')
                    })
                }
            })
        }
    }
})