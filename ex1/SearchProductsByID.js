const btnSearch= document. getElementById('btnSearch'); //גישה לכפתור החיפוש
const inptSearch= document. getElementById('inptSearch');//גישה לשדה החיפוש
const searchResault= document. getElementById('searchResault'); //גישה לדיב שבו יוצג המוצר שנמצא
//אובייקט המכיל שם קטגוריה ואייקון
const categories={
    "men's clothing": "🧥",
    "jewelery": "💍",
    "electronics": "🔌", 
    "women's clothing":"👗"
}

let htmlProduct="";
//בעת לחיצה על כפתור החיפוש
btnSearch.addEventListener('click',()=>{
 searchProduct(inptSearch.value)})
 //הפונקציה שתופעל בעת לחיצה על כפתור החיפש
async function searchProduct(id){
    try{
        if (!id){ //אם לא הוקש מספר מזהה 
            searchResault.innerHTML='נא הקש קוד מוצר';   
            return;
        }
        //אם הקישו מספר מזהה
        //נסיון גישה לשרת עם המספר שנקלט
    let response=await fetch(`https://fakestoreapi.com/products/${id}`)
        try{
            //נסיון להפוך את הנתונים לגייסון
            let product= await response.json();
            //לתוך משתנה HTML הכנסת המוצר בתצוגת
            htmlProduct= 
                `<h3>${product.title}</h3>
                    <table class="productTable">
                        <tr>
                            <th>id </th>
                            <th>price </th>
                            <th>description </th>
                            <th>category </th>
                            <th>image </th>
                        </tr>
                        <tr>
                            <td class="tdBold">${product.id}</td>
                            <td>${product.price}</td>
                            <td>${product.description}</td>
                            <td>${categories[product.category]}<br>${product.category}</td>
                            <td><img class='imagesProduct' src= ${product.image}></td>
                        </tr>
                    </table>`

                    //הכנסת המשתנה לתצוגה בפועל
                searchResault.innerHTML=htmlProduct;   
            }
            catch(err){
                //אם לא הצליח להביא נתונים, זה אומר שאים כזה קוד מוצר
                htmlProduct=`<h2>המוצר לא קיים</h2>`
                searchResault.innerHTML=htmlProduct;   
            }
        }
        catch(error){
        console.log(error);
}
}
