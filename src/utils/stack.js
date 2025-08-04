//stack keep tracks of previous moves 

export default class Stack{
    constructor(){
        this.items = [];
    }
    push(cell){
        this.items.push(cell);
    }
    pop() {
        if (this.isEmpty()) return null;
        return this.items.pop();
    }
    isEmpty(){
        return this.items.length === 0;
    }
    size(){
        return this.items.length;
    }
    peek(){
        if (this.isEmpty()) return null;
        return this.items[this.items.length-1];
    }
    clear(){
        this.items = [];
    }
    printStack(){
        console.log(this.items);
    }
}
