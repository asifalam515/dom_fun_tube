let videos=[]
let categories=[]
let isAscending=false;

const loadCategories =(id)=>{
    activeId=id
    if(categories.length == 0)
    {
        fetch(' https://openapi.programming-hero.com/api/videos/categories')
        .then(res=>res.json())
        .then(data=>showAll(data.data))
    }
 
}

const showAll=(data)=>{
    const categories=document.getElementById("category")

data.forEach((singleData)=>{
    // console.log(singleData);
    const btn=document.createElement('button')
    btn.innerText=`${singleData.category}`
    btn.classList.add("btn", "btn-secondary")
    btn.addEventListener('click', () => handleButtonClick(singleData.category_id));

    categories.appendChild(btn)
})
}
const handleButtonClick=(categoryId)=>{
    // console.log('clicked button with the category id:',categoryId);
     fatchByCategory(categoryId)
}


const fatchByCategory=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then(res=>res.json())
    .then(data=>showCategoryWiseData(data.data))
}




const showCategoryWiseData=(data)=>{
console.log(data);
data.forEach((singleData)=>{
    // console.log(singleData);
})

// load data
const categoryContainer = document.getElementById("categories-ul");
categoryContainer.innerHTML = "";
data?.forEach((category)=>{
    console.log(category);
    const div = document.createElement("div");
    div.innerHTML=`
 ]<div class="card" ">
 <img src="${category.thumbnail}" class="card-img-top img-fluid" alt="...">
 <div class="card-body">
   <h5 class="card-title">Card title</h5>
   <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
   <a href="#" class="btn btn-primary">Go somewhere</a>
 </div>
</div>
    
    `
    categoryContainer.appendChild(div);

})

}




loadCategories()