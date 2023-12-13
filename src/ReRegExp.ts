class ReRegExp extends RegExp {
    constructor(pattern: string | ReRegExp, flags?: string){
        let isAssert = false;
        let assertPattern = '';
        const recovery = (str: string)=> str.replace(/_sIgNaL_1/g, '\\\(').replace(/_sIgNaL_2/g, '\\\)');

        if(typeof pattern === 'string'){
            if(pattern.match(/^\(\?\<=/)){
                isAssert = true;
                pattern = pattern.replace(/\\\(/g, '_sIgNaL_1').replace(/\\\)/g, '_sIgNaL_2');

                let _deep= 0;
                const index = pattern.split('').findIndex(char=>{
                    if(char === '(') ++_deep;
                    else if(char === ')' && !--_deep) return true; 
                    return false
                });

                assertPattern = recovery(pattern.slice(4, index));
                pattern = recovery(pattern.slice(index + 1));
            }
        }
        super(pattern, flags);
        this.__isAssert = isAssert;
        this.__assertPattern = assertPattern;
        this.__assertRegExp = new RegExp(`^${assertPattern}`); 
    }

    __isAssert = false;
    __assertPattern = '';
    __assertRegExp?:RegExp
    
    [Symbol.match](str: string){
        const result = RegExp.prototype[Symbol.match].call(this, str);

        if(result && this.__isAssert)
        result.forEach((str, i, _)=>{
            if(!i && Reflect.has(_, 'index')){
                (<any>_).index += (str.match(this.__assertRegExp!)||[''])[0].length
            }
            _[i] = str.replace(this.__assertRegExp!, '');
        })

        return result;
    }
}

module.exports = ReRegExp;