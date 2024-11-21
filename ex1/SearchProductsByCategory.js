const btnSelectCategory = document.querySelector('.btnSelectCategory');//גישה לשדה בחירת הקטגוריה
const searchResault = document.getElementById('searchResault'); //גישה לדיב שבו נשים את התוצאה 
//אובייקט המכיל שם קטגוריה ואייקון
const categories = {
    "men's clothing": "🧥",
    "jewelery": "💍",
    "electronics": "🔌",
    "women's clothing": "👗"
}

btnSelectCategory.addEventListener('change', searchByCategory);
//פונקציה לשליפת נתונים לפי קטגוריה
async function searchByCategory() {
    if (btnSelectCategory.value != "") { //רק אם נבחרה קטגוריה
        try {
           let htmlProduct = ""; //איפוס תוכן המשתנה
            searchResault.innerHTML = htmlProduct; // איפוס תוכן החיפוש הקודם
            //גישה לשרת באמצעות שלחית הקטגוריה שנשלחה
            let response = await fetch(`https://fakestoreapi.com/products/category/${btnSelectCategory.value}`);
            //המרה לגייסון
            let data = await response.json();

            //HTML הכנסה לתוך משתנה התחלה של טבלה בתצוגה של 
            htmlProduct =
                `<table class="productTable">
                <tr>
                <th>id </th>
                <th>title </th>
                <th>price </th>
                <th>description </th>
                <th>category </th>
                <th>image </th>
                </tr>`
            //מעבר בלולאה על התוכן שהתקבל מהשרת ויצירת תוכן לטבלה
            data.forEach(product => {
                htmlProduct += `<tr>
                <td class="tdBold">${product.id}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.description}</td>
                <td>${categories[product.category]}<br>${product.category}</td>
                <td><img class='imagesProduct' src= ${product.image}></td>
                </tr>`

            });
            //הוספת סיומת לטבלה
            htmlProduct += `</table>`;
            //הכנסת תוכן הטבלה לתוך הדיב היועד לכך
            searchResault.innerHTML += htmlProduct;
        }
        catch (err) {
console.log(`שגיאה בשליפת נתונים מהשרת לפי קטגוריה ${err}`);

        }

    }

}

