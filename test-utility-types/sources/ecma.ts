window.addEventListener('load', function(event) {
    const elem = this.document.querySelector('input');
    elem?.addEventListener('click', event => {
        console.log(event.target?.textContent);
    })
})