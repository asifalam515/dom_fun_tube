const fatchData=()=>{
    

    fetch(' https://openapi.programming-hero.com/api/videos/categories')
    .then(res=>res.json())
    .then(data=>showAll(data.data))
 
}

const showAll=(data)=>{
    const categories=document.getElementById("category")

data.forEach((singleData)=>{
    console.log(singleData);
    const btn=document.createElement('button')
    btn.innerText=`${singleData.category}`
    btn.classList.add("btn", "btn-secondary")
    btn.addEventListener('click', () => handleButtonClick(singleData.category_id));

    categories.appendChild(btn)
})
}
const handleButtonClick=(categoryId)=>{
    console.log('clicked button with the category id:',categoryId);
}
fatchData()