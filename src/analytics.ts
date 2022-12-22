import * as $ from 'jquery'

function createAnalytics(): object {
    let counter = 0
    let isActive: boolean = true
    const clickHandler = () => counter++

    $(document).on('click', clickHandler)

    return {
        stop() {
            document.removeEventListener('click', clickHandler)
            isActive = false
        },
        get counter() {
            if(isActive) {
                return counter
            }
            return 'counter is not active'
        },
        start() {
            isActive = true
        }
    }
}

window['analytic'] = createAnalytics()