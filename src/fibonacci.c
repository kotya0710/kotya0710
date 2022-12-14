typedef unsigned int fibonacci_t;
fibonacci_t fibonacci(fibonacci_t d)
{
    fibonacci_t a,b,c;
    a=1;
    b=1;
    while(b<d)
    {
        c=a+b;
        a=b;
        b=c;
    }
    return b;
}
