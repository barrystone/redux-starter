import { Map } from "immutable";

let book = Map({title: "Harry Potter"});

const publish=(book)=>{
    // book.isPublished=true;
    return book.set("isPublished",true);
}
let updated = publish(book);

// console.log(book);
// console.log(book.get("title"));
console.log("book",book.toJS());
console.log("updated",updated.toJS());
