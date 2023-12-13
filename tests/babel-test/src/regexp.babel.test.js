
const babeled = true;

if(babeled){
    test('regex convert', ()=>{
        expect(/abc/).toBeInstanceOf(ReRegExp);
        expect(/abc/g).toBeInstanceOf(ReRegExp);
        expect(RegExp('abc')).toBeInstanceOf(ReRegExp);
        expect(new RegExp('abc')).toBeInstanceOf(ReRegExp);
        expect(RegExp(/abc/)).toBeInstanceOf(ReRegExp);
        expect(RegExp(/abc/g)).toBeInstanceOf(ReRegExp);
    })
}

test('match', ()=>{
    const reg = new ReRegExp('abc');

    expect('abc'.match(reg)).toMatchObject(eval(`'abc'.match(/abc/)`));
    expect('abcabc'.match(reg)).toMatchObject(eval(`'abcabc'.match(/abc/)`));
    expect('0abc0abc0'.match(reg)).toMatchObject(eval(`'0abc0abc0'.match(/abc/)`));
    expect('000'.match(reg)).toBeNull();
})

test('match with globals', ()=>{
    const reg = new ReRegExp('abc', 'g');

    expect('abc'.match(reg)).toMatchObject(eval(`'abc'.match(/abc/g)`));
    expect('abcabc'.match(reg)).toMatchObject(eval(`'abcabc'.match(/abc/g)`));
    expect('0abc0abc0'.match(reg)).toMatchObject(eval(`'0abc0abc0'.match(/abc/g)`));
    expect('000'.match(reg)).toBeNull();
})

test('match with captures', ()=>{
    const reg = new ReRegExp('a(b)(c)');

    expect('abc'.match(reg)).toMatchObject(eval(`'abc'.match(/a(b)(c)/)`));
    expect('abcabc'.match(reg)).toMatchObject(eval(`'abcabc'.match(/a(b)(c)/)`));
    expect('0abc0abc0'.match(reg)).toMatchObject(eval(`'0abc0abc0'.match(/a(b)(c)/)`));
    expect('000'.match(reg)).toBeNull();
})

test('match with asserts', ()=>{
    const reg = new ReRegExp('(?<=a)bc');

    expect('abc'.match(reg)).toMatchObject(eval(`'abc'.match(/(?<=a)bc/)`));
    expect('abcabc'.match(reg)).toMatchObject(eval(`'abcabc'.match(/(?<=a)bc/)`));
    expect('0abc0abc0'.match(reg)).toMatchObject(eval(`'0abc0abc0'.match(/(?<=a)bc/)`));
    expect('000'.match(reg)).toBeNull();
})

test('match with looped asserts', ()=>{
    const reg = new ReRegExp('(?<=a)bc');

    expect('abc'.match(reg)).toMatchObject(eval(`'abc'.match(/(?<=a)bc/)`));
    expect('abcabc'.match(reg)).toMatchObject(eval(`'abcabc'.match(/(?<=a)bc/)`));
    expect('0abc0abc0'.match(reg)).toMatchObject(eval(`'0abc0abc0'.match(/(?<=a)bc/)`));
    expect('000'.match(reg)).toBeNull();
})