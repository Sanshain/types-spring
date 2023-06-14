//@ts-check

/**
 * The purpose of this test is to check whether the flaws in the original package have been eliminated
 */

/// querySelector:

const tag = document.querySelector('div'); if (tag) tag.innerText = '';                                         // success
//@ts-expect-error
const cls = document.querySelector('div.cls'); if (cls) cls.innerText = ''                                      // is error
//@ts-expect-error
const id = document.querySelector('div#id'); if (id) id.innerText = ''                                          // is error
//@ts-expect-error
const child = document.querySelector('.cls div'); if(child) child.innerText = ''                                // is error
//@ts-expect-error
const childCls = document.querySelector('.cls div.cls'); if (childCls) childCls.innerText = ''                  // is error
//@ts-expect-error
const childId = document.querySelector('.cls div#id'); if (childId) childId.innerText = ''                      // is error
//@ts-expect-error
const nextchild = document.querySelector('.cls>div'); if (nextchild) nextchild.innerText = ''                   // is error
//@ts-expect-error
const nextchildId = document.querySelector('.cls>div#id'); if (nextchildId) nextchildId.innerText = ''          // is error 
//@ts-expect-error
const nextchildCls = document.querySelector('.cls>div.cls'); if (nextchildCls) nextchildCls.innerText = ''      // is error
//@ts-expect-error
const neighbor = document.querySelector('.cls+div'); if (neighbor) neighbor.innerText = ''                      // is error
//@ts-expect-error
const neighborID = document.querySelector('.cls+div#id'); if (neighborID) neighborID.innerText = ''              // is error
//@ts-expect-error
const neighborCls = document.querySelector('.cls+div.cls'); if (neighborID) neighborID.innerText = ''            // is error
//@ts-expect-error
const kindred = document.querySelector('.cls~div'); if (kindred) kindred.innerText = ''                          // is error
//@ts-expect-error
const kindredID = document.querySelector('.cls~div#id'); if (kindredID) kindredID.innerText = ''                 // is error
//@ts-expect-error
const kindredCls = document.querySelector('.cls~div.cls'); if (kindredID) kindredID.innerText = ''               // is error




/// cloneNode:

const element = document.getElementById('id')?.cloneNode();
//@ts-expect-error
if (element) element.innerText = ''




/// MouseEvent:

function uiEvent(event: UIEvent) {
    //@ts-expect-error
    if (event.target) var s: string | null = event.target.textContent
}
window.addEventListener('click', e => {    
    if (e.target) {
        //@ts-expect-error
        let v = e.currentTarget?.origin || '';
        //@ts-expect-error
        e.target.textContent = v;
    }
})

/// addEventListener:



{
    let tt = new EventTarget();
    tt.addEventListener('click', e => e.currentTarget == e.target)

    let div_a = document.querySelector<HTMLDivElement>('div.a');
    let input = document.querySelector<HTMLInputElement>('div.a');
    let txtar = document.querySelector<HTMLTextAreaElement>('div.a');

    div_a?.addEventListener('click', e => {
        //@ts-expect-error
        let tv = e.target?.innerText
        //@ts-expect-error
        let v = e.currentTarget?.innerText
    })
    document.addEventListener('click', function (event) {
        //@ts-expect-error
        let r = event.target?.body
        //@ts-expect-error
        let b = event.currentTarget?.body
    })    
    input?.addEventListener('focus', e => {
        //@ts-expect-error
        let v = e.currentTarget?.value
        //@ts-expect-error
        let tv = e.target.value
        //@ts-expect-error
        let tc = e.target.textContent
    })
    input?.addEventListener('input', e => {
        //@ts-expect-error
        let v = e.currentTarget?.value
        //@ts-expect-error
        let tv = e.target.value
        //@ts-expect-error
        let tc = e.target.textContent
        //@ts-expect-error
        e.inputType?.indexOf('a')
    })
    txtar?.addEventListener('input', e => {
        //@ts-expect-error
        let v = e.currentTarget?.value
        //@ts-expect-error
        let tv = e.target.value
        //@ts-expect-error
        let tc = e.target.textContent
        //@ts-expect-error
        e.inputType.indexOf('a')
    })
}

window.addEventListener('click', e => {
    if (e.target) {
        if (e.isTrusted === true) {
            e.target                       // is Element
        }

        if (e.target instanceof Window) {
            e.target                       // is Window
        }
        else {
            e.target                       // is Node
        }
    }
})