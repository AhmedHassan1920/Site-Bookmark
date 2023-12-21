var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var submitBtn = document.getElementById("submitBtn");
var tableBody = document.getElementById("tableBody");
var nameWarning = document.getElementById("nameWarning");
var UrlWarning = document.getElementById("UrlWarning");


var container;
if(localStorage.getItem("sitesBookmark") == null)
{
    container = [];
}
else{
    container = JSON.parse( localStorage.getItem("sitesBookmark"));
    displaySite();
}

function addSite(){
    if(nameValidation() == true)
    {
       if (UrlValidation() == true)
       {
         var site = {
            name : siteNameInput.value,
            Url : siteUrlInput.value
        }
    
        container.push(site);
        
        localStorage.setItem("sitesBookmark" , JSON.stringify(container));
    
        clearInputs();
        displaySite();
        nameWarning.classList.replace("d-block","d-none")
        siteNameInput.classList.remove("warning");

        UrlWarning.classList.replace("d-block","d-none")
        siteUrlInput.classList.remove("warning");

       }else{
        siteUrlInput.classList.add("warning");
        UrlWarning.classList.replace("d-none","d-block")
       }
    }
    else{
        siteNameInput.classList.add("warning");
        nameWarning.classList.replace("d-none","d-block")
    }
}

function clearInputs(){
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function displaySite() {

    var sitesBox = ``;
    for (var i = 0; i < container.length; i++){
        sitesBox += `<tr>
        <td>${i+1}</td>
        <td>${container[i].name}</td>
        <td><a href="${container[i].Url}" target="_blank" class="btn btn-success ">Visit</a></td>
        <td><button class="btn btn-danger" onclick="deleteSite(${i});">Delete</button></td>
    </tr>`;
    }
    document.getElementById("tableBody").innerHTML = sitesBox;
}

function deleteSite(index) {
    container.splice(index , 1);
    localStorage.setItem("sitesBookmark" , JSON.stringify(container));
    displaySite();
  }


  function nameValidation(){
    var nameRex = /^[a-z]{3,8}$/;

    if(nameRex.test(siteNameInput.value) == true){
        return true
    }else{
        return false
    }
  }

  function UrlValidation(){
    var UrlRex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

    if(UrlRex.test(siteUrlInput.value) == true){
        return true
    }else{
        return false
    }
  }