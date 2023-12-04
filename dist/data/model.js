var parentPage = "";

export function changePage(pathArray){

  if(pathArray == ""){
    $.get(`../pages/home.html`, (data) => {
      $("#app").html(data);
    }).fail(() => {
      console.log("failed");
    });
  }else{
    if(pathArray.length == 1){
      $.get(`pages/${pathArray}.html`, (data) => {
        if(data){
          $("#app").html(data);
  
        } else{
          console.log("page not found");
        }
      }).fail(() => {
        console.log("this page doesn't exist");
      });
    } else{
      $("#breadcrumb").html(`> <a href="#${pathArray[0]}">${pathArray[0]}</a>
      / ${pathArray[1]}`);
      $.get(`pages/${pathArray[1]}.html`, (data) => {
        if(data){
          $("#app").html(data);
  
        } else{
          console.log("page not found");
        }
      }).fail(() => {
        console.log("this page doesn't exist");
      });
    }
    
   
  }

}