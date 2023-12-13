const cp = require('child_process');
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');


console.log(chalk.bgYellow.white('packing...', '\n'));
cp.exec('npm run build', {
    cwd: path.resolve(__dirname, '..')
}, (err, stdout, stderr)=>{
    if(err) throw err;
    else if(stderr) console.warn(chalk.blackBright(stderr, '\n'));
    console.log(chalk.blackBright('ok...', '\n'));


    console.log(chalk.bgYellow.white('rewrite tests...', '\n'));
    {
        const _file = path.resolve(__dirname, '../tests/babel-test');
        const _dist = path.resolve(_file, 'src');
        const _test = path.resolve(__dirname, '../tests/regexp.test.ts');
        const _babel = path.resolve(_file, '.babelrc');
        const _newFile = 'regexp.babel.test.js';
        const _data = fs.readFileSync(_test).toString();

        !fs.existsSync(_file) && fs.mkdirSync(_file)
        !fs.existsSync(_dist) && fs.mkdirSync(_dist);
        fs.existsSync(path.join(_dist, _newFile)) && fs.unlinkSync(path.join(_dist, _newFile));
        !fs.existsSync(_babel) && fs.appendFileSync(_babel, JSON.stringify({
            "presets": [
              [
                "@babel/preset-env",
              ]
            ],
            "plugins": [
              "../../dist/regexp-polyfill.js"
            ]
        }));
        fs.appendFileSync(
            path.join(_dist, _newFile),
            _data
            .replace(`const ReRegExp = require('../src/ReRegExp');`, '')
            .replace(/(?<=const babeled = ).*?(?=;?$)/m, 'true')
            .replace(/\.\.\/src/g, '../../../src')
            .replace(/(?<=toMatchObject\()(.*?)!?(?=\);?$)/gm,"eval(`$1`)")
        );
    }

    console.log(chalk.bgYellow.white('babel...', '\n'));
    cp.exec('node ../../node_modules/@babel/cli/bin/babel.js src --out-dir dist', {
        cwd: path.resolve(__dirname, '..', 'tests/babel-test')
    }, (err, stdout, stderr)=>{
        if(err) throw err;
        else if(stderr) console.warn(chalk.blackBright(stderr, '\n'));
        // console.log(stdout);

        console.log(chalk.bgYellow.white('testing...', '\n'));
        cp.exec('node ./node_modules/jest/bin/jest.js tests/babel-test/dist/regexp.babel.test.js', {
            cwd: path.resolve(__dirname, '..')
        }, (err, stdout, stderr)=>{
            if(err) throw err;
            process.stdout
            console.log(stderr || stdout);
        })
    })
});


