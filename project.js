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

// empty
const showEmpty=()=>{
  const videoContainer=document.getElementById("video-container")
  videoContainer.innerHTML="";
  const emptyContainer = document.getElementById("empty");
  const div = document.createElement("div");
  div.innerHTML = `  <div class="d-flex justify-content-center m-5">
  <img src="./images/Icon.png" class="img-fluid" alt="" />
  <h2
    class="mt-8  text-center  mx-auto"
  >
    Oops!! Sorry, There is no content here
  </h2>
</div>`;
  emptyContainer.appendChild(div);
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
    .then(data=> showCategoryWiseData(data.data))
}




const showCategoryWiseData=(data)=>{
console.log(data.length);
if(data.length ==0 )
{
  document.getElementById("empty").classList.remove("d-none")
    showEmpty()
   
  
}
else
{
// hide the empty
document.getElementById("empty").classList.add("d-none")

  const videoContainer = document.getElementById("video-container");
videoContainer.innerHTML = "";
data?.forEach((video) =>{
    const div=document.createElement("div")
    div.classList.add("col-3","m-2","text-center")
    div.innerHTML=`
  <div class="container m-2">
  <div class="card" style="width: 18rem">

  <div class="img" >
  <img src="${video.thumbnail}" class="card-img-top" alt="...">
  </div>


<div class="d-flex justify-content-start">
<span class="w-100"> <img class="w-25 rounded-5 img-fluid" src=${video?.authors[0].profile_picture} /></span>
<h6 class="card-text"> ${video.title}</h6> 
</div>

  <div class="name-verification d-flex gap-2 justify-content-center">
  <p class="">${video?.authors[0].profile_name}</p>
  <span>${
    video?.authors[0].verified
      ? '<img class="img-fluid" src="./images/icons8-verified-30.png" alt="" />'
      : ""
  }
  </span>
  </div>


  
  </div>
  
  </div>

    `
    videoContainer.appendChild(div)
}

)
}






}


const handleSort = () => {
  isAscending = !isAscending;
  if (!isAscending) {
    document
      .getElementById("sort-container")
      .setAttribute("data-tip", "Highest to Lowest");
  } else {
    document
      .getElementById("sort-container")
      .setAttribute("data-tip", "Lowest to Highest");
  }
  const sortedVideo = sortViews(videos, isAscending);
  showVideos(sortedVideo);
};


loadCategories()



// extra
function formatTime(seconds) {
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const remainingMinutes = Math.floor((seconds % 3600) / 60);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ${remainingMinutes} ${
        remainingMinutes === 1 ? "minute" : "minutes"
      } ago`;
    }
  }


  function sortViews(data, options) {
    const sortedData = data.sort((a, b) => {
      const aViews = parseInt(a.others.views);
      const bViews = parseInt(b.others.views);
      if (options) {
        console.log(options);
        return bViews - aViews;
      } else {
        console.log(options);
        return aViews - bViews;
      }
    });
    return sortedData;
  }

  async function fetchData(url) {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("An error occurred:", error);
      return null;
    }
  }
  