//@ts-check

const fs = require('fs');
const { execSync } = require('child_process')


const CHANGELOG = 'CHANGELOG.md'


const packageConfig = fs.readFileSync('package.json').toString()



var [lastVer, lastLog] = getLastVer();

const package = JSON.parse(packageConfig)
if (package.version !== lastVer) {
    const log = execSync('git log --oneline').toString();
    const lines = log.split('\n')
        .map(title => title.replace(/\([\s\S]+\)/, ''))                             // remove current branch name
        .map(line => line.split(' ').slice(1).join(' '))                            // remove commit hash
        .filter(w => !w.match(/(readme|merge branch|npmignore|gitignore)/i))        // remove service commits by specifying keywords
        .filter(title => !title.match(/^[\w\d\-_]+$/m))                             // remove one-word commits as useless info
        .filter(title => title.length > 6)                                          // remove too short commit names as useless
    
    
    console.log(lines);
    let newLog = ''
    for (const line of lines) {
        if (lastLog == line) break;
        newLog += line + '. '
    }

    if (newLog) {
        fs.writeFileSync(CHANGELOG, `${package.version} - ${newLog}\n` + log);   
    }    
}



function getLastVer() {
    if (fs.existsSync(CHANGELOG)) {
        const log = fs.readFileSync(CHANGELOG).toString();
        const lastVerInfo = log.split('\n')[0]
        const verInfo = lastVerInfo.match(/(?<ver>\d+.\d+.\d+)b? - (?<log>[\s\S]+)/);
        if (verInfo) {
            return [verInfo.groups?.ver, verInfo.groups?.log];
        }
    }
    return [];
}

