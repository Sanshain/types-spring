//@ts-check

const fs = require('fs');
const libdom = fs.readFileSync('node_modules/typescript/lib/lib.dom.d.ts').toString()
const matches = libdom.matchAll(/addEventListener<K extends keyof HTMLElementEventMap>\(type: K, listener: \(this: (?<this>\w+),[\s\S]+?\n/g)
let acc = ''
for (let match of matches) {
    const [declaration, name] = match;    
    const newSign = 'HTMLElementEventMap[K] extends UIEvent ? UIEvent<' + name + '> & HTMLElementEventMap[K] : HTMLElementEventMap[K]';
    const newDeclaration = `interface ${name} {\n\t${declaration.replace('HTMLElementEventMap[K]', newSign)}}\n`.replace(
        'HTMLElementEventMap>(',
        'HTMLElementEventMap>(\n\t\t'
    ).replace(
        '[K] : HTMLElementEventMap[K]',
        '[K] : HTMLElementEventMap[K]\n\t'
    )
    acc += newDeclaration;
}

fs.writeFileSync('sources/document/addEventListener.d.ts', '/** Automatically generated content: */\n\n' + acc)