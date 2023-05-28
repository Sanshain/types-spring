//@ts-check


/// Node.querySelector:

const elem = document.querySelector('.cls'); if (elem) elem.innerHTML = ''                                              // is Element 
const tag = document.querySelector('input'); if (tag) tag.value = '';                                                   // is HTMLInputElement 


const cls = document.querySelector('input.cls'); if (cls) cls.value = ''                                                // is HTMLInputElement 
const id = document.querySelector('input#id'); if (id) id.value = ''                                                    // is HTMLInputElement 
const child = document.querySelector('.cls input')                                                                      // is HTMLInputElement 
    && document.querySelector('.cls input#cls')
    && document.querySelector('.cls input.cls'); if (child) child.value = ''
const nextchild = document.querySelector('.cls>input')                                                                  // is HTMLInputElement 
    && document.querySelector('.cls>input#cls')
    && document.querySelector('.cls>input.cls'); if (nextchild) nextchild.value = ''
const neighbor = document.querySelector('.cls+input')                                                                   // is HTMLInputElement 
    && document.querySelector('.cls+input#cls')
    && document.querySelector('.cls+input.cls'); if (neighbor) neighbor.value = ''
const kindred = document.querySelector('.cls+input')                                                                    // is HTMLInputElement 
    && document.querySelector('.cls~input#cls')
    && document.querySelector('.cls~input.cls'); if (kindred) kindred.value = ''    

const tilda3 = document.querySelector('a~a~input'); if (tilda3) tilda3.innerText = ''                                   // is HTMLElement
const _wsps1 = document.querySelector('a a input'); if (_wsps1) _wsps1.innerText = ''                                   // is HTMLElement





//@ts-expect-error
const _id = document.querySelector('#id'); if (_id) _id.innerText = ''                                                  // is Element     
//@ts-expect-error
const _cls = document.querySelector('.cls'); if (_cls) _cls.innerText = ''                                              // is Element 
//@ts-expect-error
const _attr = document.querySelector('div.cls[attr~=value]'); if (_attr) _attr.innerText = ''                           // is Element 
//@ts-expect-error
const _wsp = document.querySelector('div.cls[attr="a b"]'); if (_wsp) _wsp.innerText = ''                               // is Element 
//@ts-expect-error
const _attr_value = document.querySelector('div.cls[attr="a a.div"]'); if (_attr_value) _attr_value.innerText = ''      // is Element 

//@ts-expect-error
const _wsps2 = document.querySelector('a a input'); if (_wsps2) _wsps2.value = ''                                       // is HTMLElement
//@ts-expect-error
const _tilda3 = document.querySelector('a~a~input'); if (_tilda3) _tilda3.value = ''                                    // is HTMLElement



/// HTMLElement.cloneNode:

const element = document.getElementById('id')?.cloneNode();
if (element) element.innerText = ''



/// MouseEvent:

function uiEvent(event: UIEvent) {
    if (event.target) var s: string | null = event.target.textContent    
}

function mouseEvent(event: MouseEvent) {
    if (event.target) var s: string | null = event.target.textContent
    if (event.currentTarget) var s: string | null = event.currentTarget.textContent
}

function keyEvent(event: KeyboardEvent<HTMLInputElement>) {
    if (event.target) var s: string | null = event.target.value
    if (event.currentTarget) var s: string | null = event.currentTarget.value
}

function event__window(event: MouseEvent<Window>|KeyboardEvent<Window>) {
    if (event.target) var s: string | null = event.target.textContent
    if (event.currentTarget) var s: string | null = event.currentTarget.origin
}