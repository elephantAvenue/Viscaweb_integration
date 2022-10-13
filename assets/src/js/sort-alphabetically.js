document.addEventListener("DOMContentLoaded", function () {

    let $sortLink = document.getElementById('sort-alphabetically')

    let $bookmakers = document.querySelectorAll('.Bookmakers-items')

    if ($bookmakers.length > 0) {

        if ($sortLink) {

            $sortLink.addEventListener('click', (e) => {

                $bookmakers.forEach((item, index) => {

                    if (!item.classList.contains('Bookmakers-items--orderedAplphabetically')) {
                        // content already ordered
                        // order content

                        item.classList.add('Bookmakers-items--orderedAplphabetically')

                        /**/

                        var i, switching, b, shouldSwitch

                        switching = true
                        /* Make a loop that will continue until
                        no switching has been done: */

                        while (switching) {
                            // start by saying: no switching is done:

                            switching = false
                            b = item.getElementsByTagName("LI")

                            // Loop through all list-items:

                            for (i = 0; i < (b.length - 1); i++) {
                                // start by saying there should be no switching:
                                shouldSwitch = false
                                /* check if the next item should
                                switch place with the current item: */


                                if (b[i].getAttribute('data-name').toLowerCase() > b[i + 1].getAttribute('data-name').toLowerCase()) {
                                    /* if next item is alphabetically
                                    lower than current item, mark as a switch
                                    and break the loop: */
                                    shouldSwitch = true
                                    break
                                }
                            }
                            if (shouldSwitch) {
                                /* If a switch has been marked, make the switch
                                and mark the switch as done: */
                                b[i].parentNode.insertBefore(b[i + 1], b[i])
                                switching = true
                            }
                        }

                        /**/

                    }
                })
            })
        }
    }
})