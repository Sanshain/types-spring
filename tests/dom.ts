//@ts-check


/// Node.querySelector:

const elem = document.querySelector('.cls'); if (elem) elem.innerHTML = ''                                              // is Element 
const tag = document.querySelector('input'); if (tag) tag.value = '';                                                   // is HTMLInputElement


const force = document.querySelector<HTMLElement>('#id'); if (force) force.innerText = ''                               // is HTMLElement
const forceType = document.querySelector<HTMLInputElement>('a a input'); if (forceType) forceType.value = ''            // is HTMLInputElement


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

const misspell = document.querySelector<HTMLInputElement>('a.cls');                         // is HTMLAnchorElement | null
misspell?.value.replace('', '')





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

function uiEvent(event: UIEvent<Node>) {
    if (event.target) var s: string | null = event.target.textContent    
}

function mouseEvent(event: MouseEvent & UIEvent<Node>) {
    if (event.target) var s: string | null = event.target.textContent
    if (event.currentTarget) var s: string | null = event.currentTarget.textContent
}

function keyEvent(event: KeyboardEvent<HTMLInputElement>) {
    //@ts-expect-error
    if (event.target) var s: string | null = event.target.value
    if (event.currentTarget) var s: string | null = event.currentTarget.value
}

function event__window(event: MouseEvent<Window>) {
    event.pageX    
    if (event.target) var s: string | null = 'self' in event.target ? '' : event.target.textContent
    if (event.currentTarget) var s: string | null = event.currentTarget.origin
}

function strictWindowEvent(event: MouseEvent<Window, Element>) {
    event.pageX
    event.target?.innerHTML    
}

window.addEventListener('click', event__window)
window.addEventListener('click', e => {
    if (e.target) {
        // if (e.isTrusted === true) { e.target }
        if ('atob' in e.target) {
            e.target.alert(9)
        }
        else {  // 'nodeName' in 
            e.target.textContent = e.currentTarget?.origin || '';
        }        
    }
})



/// addEventListener:



{
    /// generic: 
    window.addEventListener<'click', Element>('click', e => {
        e.target?.innerHTML
    })
    const elem = document.querySelector('div')

    let tt: EventTarget & {a?: 1} = new EventTarget();
    tt.addEventListener('click', e => e.currentTarget == e.target)

    document.querySelector('div.a')?.addEventListener('click', (e: MouseEvent<HTMLDivElement>) => {
        let tc = e.target?.textContent
        //@ts-expect-error
        let tv = e.target?.innerText
        let v = e.currentTarget?.innerText
    })
    document.addEventListener('click', function (event) {
        //@ts-expect-error
        let r = event.target?.body                      // is Node        
        let b = event.currentTarget?.body
    })
    document.querySelector('input.a')?.addEventListener('focus', e => {
        let v = e.currentTarget?.value
        let tv = e.target.value
        let tc = e.target.textContent
    })    
    document.querySelector('input.a')?.addEventListener('input', e => {        
        let v = e.currentTarget?.value
        let tv = e.target.value   
        let tc = e.target.textContent             
        e.inputType?.indexOf('a')        
        //@ts-expect-error
        e.inputType.indexOf('a')        
    })
    document.querySelector('textarea.a')?.addEventListener('input', e => {
        let v = e.currentTarget?.value
        let tv = e.target.value
        let tc = e.target.textContent        
        e.inputType.indexOf('a')        
    })    

    document.addEventListener('click', e => {
        let v = e.currentTarget?.body
        let tc = e.target?.textContent
    })
}

