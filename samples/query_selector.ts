
/// Before:

// CORRECT WORKS:

const a = document.querySelector('div');
if (a) {
    a.innerText = '11'
}

// UNCORRECT WORK:

const b = document.querySelector('div.cls');
if (b) {
    //@ts-expect-error
    b.innerText = '11'
}

