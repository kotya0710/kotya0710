// array func <> arrow func
// match don't return groups if /g set
window.onload = function () {
    document.body.innerHTML = ""
    let text = build('src_content')['fibonacci.c']
    
    let _c_rules = c_rules()
    let os=[]
    let maxparses = 0x10
    for(;;)
    {
        if(maxparses<+Infinity)
            if(--maxparses<=0)
                break
        let o = parse(text, _c_rules)
        if(!o)
            break
        os.push(o)
        text = text.slice(o._len)
    }

    let _=document.createElement('div')
    _.append(...os.map((o,i) => display(`[${i}] `+o._name+
    ' `font-size:0.49em` '+JSON.stringify(o))))
    poop(
        //os.map((o,i) => `[${i}]`+
        //JSON.stringify(o)).join('\n')
        _
    )

    poop(text, { color: 'hotpink' })

    if(!text.length)
    {
        poop('Program ready!', { color: 'green' })
    }
}

function display(a)
{
    // string -> div(string)
    if(typeof a == 'string')
    {
        let ai=a.indexOf('`')
        if(ai<=0)
        {
            let d=document.createElement('div')
            d.innerText=(a)
            return d
        }
        let bi=a.indexOf('`',ai+1)
        if(ai>=0 && bi<0)
        {
            throw 'Unclosed `'
        }
        let d=document.createElement('div')
        d.innerText=a.slice(0,ai)
        let d2=document.createElement('span')
        d2.innerText=a.slice(bi+1)
        let b=(a.slice(ai+1,bi)).match(/(.*)\:(.*)/)
        if(!b)
            throw 'Not expressed'
        d2.style[b[1]] = b[2]
        d.append(d2)
        return d
    }
    throw 'What to display?'
}

function is_expression(expr)
{
    // returns null if expr is not an expression
    // returns [a,o,b,o,...o,b] owervise
    
    return true
}

function exec_expression(a,o,b)
{
    return {
        expression_true:expression_true([a+o+b]),
        a_is_expression:is_expression(a),
        b_is_expression:is_expression(b),

    }
}

function function_call(type, name, args){
    //poop(type)
    if(type[0]=='return')
    {
        let expr = type[1] + '(' + type[2] + ')'
        if((expr=is_expression(expr)))
        {
            let a=expr[0]
            let i0=MUST_BE_INFINITY
            let i=0
            for(;;)
            {
                if(i0<Infinity)
                {
                    if(i0--<=0)
                    {
                        return '<function call :: return with expression like infinite?>'
                        break;
                    }
                }
                let o=expr[i+=1]
                let b=expr[i+=1]
                if(o == b) // xor test
                {
                    i-=2;
                    break;
                }
                //exec a o b
                a=exec_expression(a,o,b);
                if(expr.length <= i)
                    break
            }
            let o=expr[i+=1]
            let b=expr[i+=1]
            return exec_expression(a,o,b);
        }
        else
        {
            return '<function call :: return with expression like no>'
        }
    }
}

function c_rules() {
    // isolate brackets first
    return [ // sorted by greedyness
        [
            'typedef',
            /^typedef\s+(.*)\s+([a-zA-Z0-9_]+)\s*;\s*/,
            'type', 'alias'
        ],
        [
            'function block',
            /^([a-zA-Z0-9_\s]+)\s+([a-zA-Z0-9_]+)\s*\((.*)\)\s*\{\s*/,
            'type', 'name', 'args'
        ],
        [
            'function call',
            /^([a-zA-Z0-9_\s]+)\s+([a-zA-Z0-9_]+)\s*\((.*)\)\s*;\s*/,
            function_call,
            'fc',//'Description: <error> xor exec_expression like in c--'

        ],
        [
            'function WHAT',
            /^([a-zA-Z0-9_\s]+)\s+([a-zA-Z0-9_]+)\s*\((.*)\)\s*/,
            'type', 'name', 'args'
        ],
        [
            'function call extended',//'подпроцедура или тип и процедура',
            '[a-zA-Z0-9_\s]+(.*)\s*;',
            function_call,
            'fce'
        ],
        [
            'comm',
            [ /\/\/.*\n/ ],
            null
        ],
        [
            'if block',
            [ /if\s*\(\s*(.*)\s*\)\s*\{/ ],
            (if_body)=>{return expression_true(if_body)},
            'true'
        ],
        [
            'if',
            [ /if\s*\(\s*(.*)\s*\)/ ],
            (if_body)=>{return expression_true(if_body)},
            'true'
        ],
        [
            'block end',
            [ /\}/ ],
            null
        ]
    ]
        .map(([a, b, ...x]) => typeof b == 'string' ?
            [a, new RegExp('^' + b + '\\s*'), ...x] :
            [a, b, ...x])

        .map(([a, b, ...x]) => b instanceof Array ?
            [a, new RegExp('^' + String(b[0]).slice(1,-1) + '\\s*'), ...x] :
            [a, b, ...x])
        
        .map(([a, ...x]) => a instanceof Function ?
            [a, ...x] :
            [a, ...x])
}

function expression_true([expression])
{
    let head1=/^/
    
    let body1=/\s*([a-zA-Z0-9_]+)/

    let head2=/\s*([^a-zA-Z0-9_]+)/

    // body1

    let tail1=/\s*/

    let ex=new RegExp([head1,body1,head2,body1,tail1].map(e=>String).join(''))
    ex=/^\s*([a-zA-Z0-9_]+)\s*([^a-zA-Z0-9_]+)\s*([a-zA-Z0-9_]+)\s*/
    //<--- not same lol?
    //poop(expression)
    if(typeof expression != 'string')
        return false
    ex=expression.match(ex)
    if(!ex)
        //throw 'Very Bad expression'
        return false // Expression is not true if it is not an axpression is my opinion
    if(ex.length<1+3)
        throw 'Expression too little'
    let [a,op,b]=ex.slice(1)
    if(op=='>=')return parseInt(a)>=parseInt(b)

    let bool = true
    return bool
}

function parse(text, ps) {
    let o
    for(let p of ps)
        if((o = parse_(text, ...p)))
            break;
    return o;
}

function parse_(text, _name, re, ...a) {
    if(typeof re == 'string')
        poop_err('re cannot be string')
    if(re instanceof Array)
        poop_err('re cannot be Array')
    let cb=null,cbname='_ooups'
    if(a[0] instanceof Function)
    {
        cb=a[0]
        cbname=a[1]
    }
    let m = text.match(re)
    if(!m)
        return null
    let o = { _name, _len: m[0].length, _str: m[0] }
    if(cb)
        return (()=>{
            // python where are you
            let o2={ ...o }
            o2[a[1]]=cb(m.slice(1))
            return o2
        })()
    if(m.length - 1 > a.length)
        poop_err('You want too less arguments')
    if(a.length == 1 && a[0] === null)
        return o // No arguments
    for(let i=0; i<a.length; ++i)
        o[a[i]] = m[i+1]
    if(!m[0].length)
        poop_err('Cannot be 0, check re')
    return o
}

function poop_err(t = 'poop', s = {}, ...a)
{
    s.color='white'
    s.background='red'
    poop(t, s, ...a)
    throw Error(t)
}

function poop(text = 'poop', style = {}) {
    console.log(text)
    let poop = document.createElement('div')
    if(text && text.length)
        poop.innerText = text
    else if(text.classList instanceof DOMTokenList)
        document.body.append(text)
    else
        poop.innerText = JSON.stringify(text)
    poop.style.color = style.color || 'black'
    poop.style.background = style.background || 'white'
    document.body.append(poop)
}

// Adds ._string field to the provided image
function string_from_image(im)
{
    if(im._string==null)
    {
        let cvs=document.body.querySelector('canvas')
        if(!cvs)
        {
            cvs=document.createElement('canvas')
            document.body.append(cvs)
        }
        let ctx=cvs.getContext('2d')
        cvs.width=im.width
        cvs.height=im.height
        ctx.drawImage(im, 0, 0)
        im._string = ":("
        im._string = cvs.toDataURL("image/png")
    }
    return im
}

function cvs_as_string(ctx, cvs) {
    let d=ctx.getImageData(0, 0, cvs.width, cvs.height).data
    return String.fromCodePoint(...d)
}

function _anon1() {
    // uses string_from_image
    let ims=[...document.body.querySelectorAll('img')]
        .map(im => string_from_image(im))
    let text = ims.map(e=>e._string).join('\n\n\n')
    document.body.innerText += text
}

async function _anon2() {
    // uses string_from_image
    let ims=[]
    ims.ready = Promise.all(images
        .split('\n')
        .filter(e => e)
        .map(file => 'images/'+file)
        .map(src => new Promise(r => {
            let im=new Image()
            im.src=src
            im.onload = r
            ims.push(im)
            ims[src]=im
            im.as_string=()=>string_from_image(im)
        })))
    // do something ...
    await ims.ready
    let text = ims.map(e=>e._string).join('\n\n\n')
    document.body.innerText += text
}