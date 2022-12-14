_build.src_content=[
`// fibonacci sequence
 int f(int a)
 {
    if(a>=0){
        return f(a-1)+f(a-2);
    }
    return -1;
 }
`,
]
_build.src_content['fibonacci.c']=_build.src_content[0]
_build.src_content.keys=['fibonacci.c',]