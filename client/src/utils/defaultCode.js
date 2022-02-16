

export const codeForCpp = 
`#include<bits/stdc++.h>
using namespace std;

int main() {
    cout<<"Hello World";
}`

export const codeForJava = 
`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!!");
    }
}`

export const codeForPython = 
`print("Hello World!")`

export const codeForJavascript = 
`console.log('Hello World');`

export const codeForPHP = 
`echo "Hello World!";`


const map1 = new Map();

map1.set('cpp', codeForCpp);
map1.set('java', codeForJava);
map1.set('python', codeForPython);
map1.set('javascript', codeForJavascript);
map1.set('php', codeForPHP);

export const getDefaultCode = (lang) => {
  return(map1.get(lang) + "\n\n\n\n");
}
