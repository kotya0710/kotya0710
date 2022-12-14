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

    poop(
        os.map((o,i) => `[${i}]`+JSON.stringify(o)).join('\n')
    )

    poop(text, { color: 'hotpink' })
}

function c_rules() {
    // isolate brackets first
    return [
        [
            'typedef',
            /^typedef\s+(.*)\s+([a-zA-Z0-9_]+)\s*;\s*/,
            'type', 'alias'
        ],
        [
            'function',
            /^([a-zA-Z0-9_\s]+)\s+([a-zA-Z0-9_]+)\s*\((.*)\)\s*/,
            'type', 'name', 'args'
        ],
        [
            'подпроцедура или тип и процедура',
            '[a-zA-Z0-9_\s]+(.*)\s*;',
            'a'
        ],
        [
            'comm',
            [ /\/\/.*\n/ ],
            null
        ],
        [
            'if',
        [ /if\s*\(\s*(.*)\s*\)/ ],
            'if_body'
        ]
    ]
        .map(([a, b, ...x]) => typeof b == 'string' ?
            [a, new RegExp('^' + b + '\\s*'), ...x] :
            [a, b, ...x])

        .map(([a, b, ...x]) => b instanceof Array ?
            [a, new RegExp('^' + String(b[0]).slice(1,-1) + '\\s*'), ...x] :
            [a, b, ...x])
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
    let m = text.match(re)
    if(!m)
        return null
    let o = { _name, _len: m[0].length, _str: m[0] }
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
    poop.innerText = text
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