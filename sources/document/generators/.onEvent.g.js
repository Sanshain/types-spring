//@ts-check

const fs = require('fs');
const libdom = fs.readFileSync('node_modules/typescript/lib/lib.dom.d.ts').toString()
const matches = libdom.matchAll(/on\w+: \(\(this: GlobalEventHandlers, ev: (?<name>MouseEvent|KeyboardEvent)\) => any\) \| null/g)

let acc = ''
for (let match of matches) {
    const [declaration, name] = match; 
    const newDeclaration = declaration.replace(/ev: \w+/, `ev: ${name} & {currentTarget: Window | null}`)
    // const newDeclaration = declaration.replace(/ev: \w+/, `ev: Merge<${name}, {currentTarget: Window | null}>`)    
    acc += '\t' + newDeclaration + '\n';
}

acc = `interface Window {\n${acc}}`

fs.writeFileSync('sources/document/onEvent.d.ts', '/** Automatically generated content: */\n\n' + acc)

console.log('`onEvent` declarations generated...');



// Proposals:


/// with TouchEvent:

// const matches = libdom.matchAll(/on\w+(?:\?)?: \(\(this: GlobalEventHandlers, ev: (?<name>MouseEvent|KeyboardEvent|TouchEvent)\) => any\) \| null/g)