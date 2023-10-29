// fetching dom elements------------------------------>
let categories_container=document.querySelector(".categories_container");
let main_content_container=document.querySelector(".main_content_container");
let All_categories=document.querySelector(".all-categories");
let dialog=document.querySelector("dialog")
let dialog_box_container=document.querySelector(".dialog_box_container");
let mode=document.querySelector(".mode");
let navbar=document.querySelector("nav");
let addToCart=document.querySelector(".add-to-cart");
// let button=document.querySelector(".show_All_btn");




DisplayMainpage();
showAllCategories();


All_categories.addEventListener("click",()=>{
    main_content_container.innerHTML=""
    let heading=document.createElement("h1");
    heading.classList.add("heading");
    heading.innerText="Best Sellers Books"
    main_content_container.appendChild(heading)
    DisplayMainpage();
})

mode.addEventListener("click",()=>{
    if(mode.innerHTML=='<i class="fas fa-sun"></i>'){
        document.body.style.backgroundColor="hsl(0, 0%, 16%)";
       main_content_container.style.color="white"
       categories_container.style.color="rgb(142, 141, 141)";
       navbar.style.backgroundColor="rgb(192, 191, 191)";
       mode.innerHTML=`<i class="fas fa-moon"></i>`;
       dialog.style.backgroundColor="black";
       dialog.style.color="white";
      
    }
    else{
        document.body.style.backgroundColor="#F6F6F6";
        main_content_container.style.color="black"
        categories_container.style.color="#11111159";
        navbar.style.backgroundColor="white";
        dialog.style.backgroundColor="white";
        dialog.style.backgroundColor="rgb(142, 141, 141)";
        dialog.style.color="black";
        mode.innerHTML=`<i class="fas fa-sun"></i>`;

    }
})
//------------fetching Api---------------------->
async function fetchApi(){
    console.log("inside fetch")
    let response=await fetch(`https://books-backend.p.goit.global/books/Top-Books`);
    let books=await response.json();
    return books;
}

//---------------------fetching categorywise--------------------->

async function fetchApiCategory(category){
    console.log("inside fetch")
    let response=await fetch(`https://books-backend.p.goit.global/books/category?category=${category}`);
    let books=await response.json();
    return books;
}

// ------------display main page ui books----------------
async function DisplayMainpage(){
    let AllBooks=await fetchApi();
    AllBooks.forEach(async (element) =>{
        let show_All_btn=document.createElement("button");
        show_All_btn.innerText="See More";
    show_All_btn.setAttribute("value",element.list_name);
    show_All_btn.setAttribute("class","show_All_btn");
    show_All_btn.setAttribute("onclick",`replacecpntent("${element.list_name}")`)
        main_content_container.appendChild(displayBooks(element.books));
        main_content_container.appendChild(show_All_btn)
    });
}



//---------------------------starting ui books------------------------------>
function displayBooks(category){
    let displayitems=document.createElement("div")
    let book_category_container=document.createElement("div");
    let books_categoryName=document.createElement("h2");
    let categoryBooks_container=document.createElement("div");
   
   


    book_category_container.classList.add("book_category_container");
    categoryBooks_container.classList.add("categoryBooks_container")
    books_categoryName.innerText=category[0].list_name;
    books_categoryName.setAttribute("class","category_name")
    
    book_category_container.appendChild(books_categoryName);
    book_category_container.appendChild(categoryBooks_container);
    
category.forEach(element=>{
   
    let book_info=document.createElement("div");
    book_info.classList.add("book_info");
    book_info.innerHTML=`
    <div class="images">
    <img src="${element.book_image}" alt="">
    <p class="quick-view"> quick view </p></div>
        <p class="book-title">${element.title}</p>
       
        <p class="author-name">${element.author}</p>`

   categoryBooks_container.appendChild(book_info);

   book_info.addEventListener("click",()=>{
    let dialog_container=document.querySelector("#dialog_box");
    dialog_container.innerHTML=` <div class="info_container">
    <div class="book_image"><img src="${element.book_image}" alt=""></div>
    <div class="book-title">
        <h2>${element.title}</h2>
        <p class="author-name">${element.author}</p>
        <p class="des">${element.description}</p>
        <div class="shopping-sites">
            <a href="${element.buy_links[0].url}"><img src="https://yevhenii2022.github.io/team-proj-js-book-app/amazon-shop-1x.d33dc585.png" alt=""></a>
            <a href="${element.buy_links[1].url}"><img src="https://yevhenii2022.github.io/team-proj-js-book-app/apple-shop-1x.aeb5cfd2.png" alt=""></a>
            <a href="${element.buy_links[2].url}"><img src="https://yevhenii2022.github.io/team-proj-js-book-app/bookshop-1x.d3877644.png" alt=""></a>
            
        </div>
       
    </div>
  </div>
  <div class="close">X</div>
  <button class="add-to-cart">Add to shopping list</button>`
   dialog.show();
   dialog_box_container.style.display="block";

   let closeBtn=dialog_box_container.querySelector(".close");
   let addToCart=dialog_box_container.querySelector(".add-to-cart");

   closeBtn.addEventListener("click",()=>{
        dialog_box_container.style.display="none"; 
   })

   addToCart.addEventListener("click",()=>{
    if(localStorage.name==null){
        alert("login to add to shopping list");
    }else{
        console.log("added tp cart");
    }
   })



   })
  
   

})
displayitems.appendChild(book_category_container);
return displayitems;


}


// -----------------show all categories----------------------->

async function showAllCategories(){
    let response=await fetch("https://books-backend.p.goit.global/books/category-list");
    let result=await response.json();
    console.log(result);
    result.forEach(element=>{
        let category_item=document.createElement("p");
        category_item.innerText=element.list_name;
        category_item.setAttribute("onClick",`replacecpntent("${element.list_name}")`)
        categories_container.appendChild(category_item);
    })

}


// -------------------replace element--------------------
async function replacecpntent(content){
    main_content_container.innerHTML="";
    let heading=document.createElement("h1");
    heading.classList.add("heading");
    heading.innerText=content
    main_content_container.appendChild(heading)
    let newBooks= await fetchApiCategory(content);
    main_content_container.appendChild(displayBooks(newBooks));
}

