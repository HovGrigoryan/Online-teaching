const allCoursesFetchUrl = "/pageData/courses/";


function sendGetRequest(method, url) {
    const headers = {
        'Content-Type': 'application/json'
    };
    return fetch(url, {
        method: method,
        headers: headers
    }).then(response => {
        if (!response.ok) {
            return response.status;
        }
        return response.json();
    });
}

let pageWrapper = $("#coursesWrap");
let pageSize = 8;
let page = 0;
let totalPages;

function pageablePageData() {

    $("#coursesWrap").css("display", "flex");
    sendGetRequest('GET', allCoursesFetchUrl + '?page=' + page + '&pageSize=' + pageSize).then(
        data => data.subjectTaughtsList.forEach(element => {
            let image = element.image;
            let imageb;
            if(image.startsWith('"')){
                let imagea = image.substring(0);
                imageb = imagea.substring(imagea.length-1, 1);
                // console.log(imageb);
            }else{
                imageb = element.image;
            }

            let div = `<div class="feature-block-two col-lg-3 col-md-6 col-sm-12">
     <div class="inner-box">
        <div class="content">
            <div class="image">

                <img src="/userImage?image=${imageb}" alt="" />

           </div>
           <div>
              <h6><a href="/subjectTaught/${element.id}">${element.subjectTaught}</a></h6>
              <div class="text">${element.description}</div>
              <div class="courses">Taken courses (${element.count}) </div></div>
            


         </div>
     </div>
 </div>`;
            $(pageWrapper).append(div);
            totalPages = data.totalPages;

        })
    ).then(
        data => {
            page = page + 1;

            if (page < totalPages) {
                let paginationDiv = `<div style="width: 100%; display: flex; justify-content: center" id="nextPage"><button class="btn btn-primary" onclick="getNextItems()">Load more...</button></div>`;
                $(pageWrapper).append(paginationDiv);
            }

        }
    ).catch();
}


function getNextItems() {
    sendGetRequest("GET", allCoursesFetchUrl + "?page=" + page + "&pageSize=" + pageSize).then(
        data => data.subjectTaughtsList.forEach(element => {
            // console.log(element);
            $("#nextPage").remove();
            totalPages = data.totalPages;
            let div = `<div class="feature-block-two col-lg-3 col-md-6 col-sm-12">
     <div class="inner-box">
        <div class="content">
            <div class="image">

                <img src="/userImage?image=${element.image}" alt="" />

           </div>
           <div>
              <h6><a href="/subjectTaught/${element.id}">${element.subjectTaught}</a></h6>
              <div class="text">${element.description}</div>
              <div class="courses">Taken courses (${element.count}) </div></div>
              <div class="clearfix">
                  <div class="pull-left">
                      <div class="rating">
                          <span class="fa fa-star"></span>
                          <span class="fa fa-star"></span>
                          <span class="fa fa-star"></span>
                          <span class="fa fa-star"></span>
                          <span class="dark fa fa-star-o"></span>
                      </div>
                  </div>
              </div>
         </div>
     </div>
 </div>`;
            $(pageWrapper).append(div);
            page = page + 1;

            if (page < totalPages) {
                let paginationDiv = `<div style="width: 100%; display: flex; justify-content: center" id="nextPage"><button class="btn btn-primary" onclick="getNextItems(page, totalPages)">Load more...</button></div>`;
                $(pageWrapper).append(paginationDiv);
            }


        })
    ).catch();


}
pageablePageData();