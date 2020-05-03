import { produce } from "immer";

let book = {title: "Harry Potter"};

const publish=(book)=>{
    // book.isPublished=true;
    return produce(book,draftBook=>{
        draftBook.isPublished=true;
    })
}
let updated = publish(book);

console.log("book",book);
console.log("updated",updated);

