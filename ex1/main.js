document.addEventListener('DOMContentLoaded', onLoading); //הפעלת פונקציה בעת טעינת הדף
const productTable = document.querySelector('.productTable'); //HTML גישה לתגית טבלה הנמצאת ב
const categories = {// אובייקט המכיל שם קטגוריה ואייקון
    "men's clothing": "🧥",
    "jewelery": "💍",
    "electronics": "🔌",
    "women's clothing": "👗"
}
//פונקציה שתופעל בעת טעינת הדף, 
//מטרת הפונקציה לשלוף את כל המוצרים מהשרת ולהציג אותם בטבלה
async function onLoading() {
    try {
        let response = await fetch('https://fakestoreapi.com/products');//בקשת שליפת נתונים מהשרת
        let data = await response.json();//המרה לגייסון
        data.forEach(product => { //מעבר בלולאה על כל המוצרים
            // לתוך משתנה בתור שורה בטבלה HTML הכנסת המוצר בתצוגת
            let rowOfTable = `<tr> 
                                <td class="tdBold">${product.id}</td>
                                <td>${product.title}</td>
                                <td>${product.price}</td>
                                <td>${product.description}</td>
                                <td>${categories[product.category]}<br>${product.category}</td>
                                <td><img class='imagesProduct' src= ${product.image}></td>
                               </tr>`
            //הוספת שורת הטבלה למוצר
            productTable.innerHTML += rowOfTable;
        });
    }
    catch (error) {
        console.log(error);
    }
}


