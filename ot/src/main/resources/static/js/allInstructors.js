const allInstructorsFetchUrl = "/pageData/instructors";


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

let pageWrapper = $("#instructorsWrap");
let pageSize = 8;
let page = 0;
let totalPages;

function pageablePageData() {

    $("#instructorsWrap").css("display", "flex");
    sendGetRequest('GET', allInstructorsFetchUrl + '?page=' + page + '&pageSize=' + pageSize).then(
        data => data.userList.forEach(element => {

            let image = element.avatar;
            let imageb;
            if(image.startsWith('"')){
                let imagea = image.substring(0);
                imageb = imagea.substring(imagea.length-1, 1);
            }else{
                imageb = element.avatar;
            }

            let div = `<a href="/course-detail?id=${element.id}"><div class="team-block col-lg-3 col-md-6 col-sm-12">
                <div class="inner-box">
                <div class="image">
                <a href="/course-detail?id=${element.id}"><img src="/userImage?image=${imageb}" alt=""/></a>
                </div>
                <div class="name"><a href="/course-detail?id=${element.id}">${element.name} ${element.surname}  </a></div>
                <div class="designation">${element.subjectTaught.subjectTaught}</div>
                <div class="text">${element.subjectTaught.description}</div>
                <div class="courses">${element.subjectTaught.count} order(s)</div></div>
                </div></a>`;
            $(pageWrapper).append(div);
            totalPages = data.totalPages;

        })
    ).then(
        data => {
            page = page + 1;

            if (page < totalPages) {
                let paginationDiv = `<a><div style="width: 100%; display: flex; justify-content: center" id="nextPage"><button class="btn btn-primary" onclick="getNextItems()">Load more...</button></div></a>`;
                $(pageWrapper).append(paginationDiv);
            }

        }
    ).catch();
}


function getNextItems() {
    sendGetRequest("GET", allInstructorsFetchUrl + "?page=" + page + "&pageSize=" + pageSize).then(
        data => data.userList.forEach(element => {
            $("#nextPage").remove();
            totalPages = data.totalPages;
            let div = `<div class="team-block col-lg-3 col-md-6 col-sm-12">
                <div class="inner-box">
                <div class="image">
                <a href="instructor-profile.html"><img src="/userImage?image=${element.avatar}" alt="" /></a>
                </div>
                <div class="name"><a href="instructor-profile.html">${element.name} ${element.surname} </a></div>
                <div class="designation">${element.subjectTaught.subjectTaught}</div>
                <div class="text">${element.subjectTaught.description}</div>
                <div class="courses">${element.subjectTaught.count} order(s)</div></div>
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