//@ts-check
/**
 * @type {HTMLElement}
 */
//@ts-expect-error
const jug = document.querySelector('div.aa')
if (jug) {    
    jug.onclick = function (event) {
        console.log(event.target);
        console.log(event.currentTarget);
    }
}

/**
 * @type {MouseEvent}
 */
let r;

