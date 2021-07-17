const regPageData = '/pageData/all/popular';
const regPageDataCourses = '/pageData/all/featuredCourses';
const regPageDataPreviews = '/pageData/all/previews';
const searchUrl = '/pageData/search';
const pageDataLatestCourses = `/pageData/all/latestCourses`;

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

function sendPostRequest(method, url, body) {

    const headers = {
        'Content-Type': 'application/json'
    };
    return fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    }).then(response => {
        return response.json();
    });

}

function getPopularTeachers() {
    let wrapper = $("#by-popularity");


    sendGetRequest("GET", regPageData).then(
        data => {

            data.forEach(element => {
                let image = element.teacherAvatar;
                let imageb;
                if (image.startsWith('"')) {
                    let imagea = image.substring(0);

                    imageb = imagea.substring(imagea.length-1, 1);
                }else{
                    imageb = element.teacherAvatar;
                }
                let div = `<div class="team-block col-lg-3 col-md-6 col-sm-12">
                
                <div class="inner-box">
                <div class="image">
                <a href="/course-detail?id=${element.teacherId}"><img src="/userImage?image=${imageb}" alt="" /></a>
                </div>
                <div class="name"><a href="/course-detail?id=${element.teacherId}">${element.teacherName}</a></div>
                <div class="designation">${element.subjectTaugth}</div>
                <div class="text">${element.description}</div>
                <div class="courses">${element.bookingCount}</div></div>                
                </div>`;
                $(wrapper).append(div);
            });

        })
        .catch();
}

getPopularTeachers();


function getFeaturedCourses() {
    let wrapper = $("#featuredCourses");


    sendGetRequest("GET", regPageDataCourses).then(
        data => {


            data.forEach(element => {
                let div = `<div class="feature-block-two col-lg-6 col-md-12 col-sm-12">
     <div class="inner-box">
        <div class="content">
            <div class="image">
<!--                <a href="course-lesson.html">-->
                <img src="/userImage?image=${element.image}" alt="" />
<!--                </a>-->
           </div>
           <div>
             <h6><a href="/subjectTaught/${element.id}">${element.subjectTaught}</a></h6>
             <div class="text">${element.description}</div>
<!--             <div class="author">By: <span>John Smith</span></div>-->
             <div class="courses">${element.count} </div></div>
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
                $(wrapper).append(div);
            });

        })
        .catch();
}


getFeaturedCourses()


function getPreviews() {

    let wrapper = $("#previews");

    sendGetRequest("GET", regPageDataPreviews).then(
        data => {


            data.forEach(element => {

                let div = `<div class="owl-item" style="width: 519.65px; margin-right: 20px;"><div class="testimonial-block">
                <div class="inner-box">
                     <div class="quote flaticon-quote"></div>
                <div class="image">
                    <img src="/userImage?image=${element.user.avatar}" alt="" />
                </div>
                <div class="name">${element.user.name}</div>
                <div class="designation">${element.content}</div>
                <div class="text">${element.teacher.name}</div>
                </div>
                </div></div>`
                $(wrapper).append(div);
            });
        }).then(
        data => {
            let carousel = $('.slideshow');
            carousel.owlCarousel({
                autoplay: true,
                singleItem: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 1
                    },
                    1000: {
                        items: 1
                    }
                },
                autoPlay: 3000,
                lazyLoad: true,
                navigation: true,
                navigationText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
                pagination: true,
                autoplayHoverPause: false,
            });
        }
    ).catch()
}

let rangeFrom = $("#myRangeStart").val();
let rangeTo = $("#myRangeTo").val();
$("#fromVal").text(rangeFrom);
$("#toVal").text(rangeTo);

// $("#myRangeStart").change(function () {
//     if ($("#myRangeStart").val() > $("#myRangeTo").val()) {
//         setTimeout(()=>{
//             $("#myRangeTo").val(parseInt($("#myRangeStart").val()) + 1);
//         },0)
//     }
//     setTimeout(()=>{
//         let newRangeFrom = $("#myRangeStart").val();
//         $("#fromVal").text(newRangeFrom);
//         let newRangeTo = $("#myRangeTo").val();
//         $("#toVal").text(newRangeTo);
//     },800);
//
//
// });

// $("#myRangeTo").change(function () {
//     if ($("#myRangeStart").val() > $("#myRangeTo").val()) {
//         setTimeout(()=>{
//             $("#myRangeTo").val(parseInt($("#myRangeStart").val()) + 1);
//         },0)
//     }
//     setTimeout(()=>{
//         let newRangeTo = $("#myRangeTo").val();
//         $("#toVal").text(newRangeTo);
//     },800);
//
// });


// getPreviews();


let open = false;
$(document).on("click", "#country-id", function () {

    if (!open) {
        $("#multyCheck").css("display", "flex");
        open = true;
    } else {
        $("#multyCheck").css("display", "none");
        open = false;
    }


});

$(document).on("click", ".page-wrapper", function (e) {

    setTimeout(() => {
        if ((!$(e.target).is('#country-id'))) {

            let multyCheck = $(e.target).is("#multyCheck");
            let checkedClass = $(e.target).is(".countryCheckBox");
            let label = $(e.target).is("#multyCheck label");


            if (!multyCheck && !checkedClass && !label) {
                if (open) {
                    $("#multyCheck").css("display", "none");
                    open = false;
                }
            }


        }
    }, 0)

})


function showTeachersByCategory() {
    let wrapper = $("#by-filter");
    if (teachers != null) {

        if (teachers.popularTeacherDtoList.length > 0) {

            $("#subjectTitle").text(teachers.catName + " instructors");


            $(teachers.popularTeacherDtoList).each(function (index, element) {
                let image = element.teacherAvatar;
                let imageb;
                if (image.startsWith('"')) {
                    let imagea = image.substring(0);
                    imageb = imagea.substring(imagea.length - 1, 1);
                } else {
                    imageb = element.teacherAvatar;
                }
                let div = `<div class="team-block col-lg-3 col-md-6 col-sm-12">
                <div class="inner-box">
                <div class="image">
                <a href="/course-detail?id=${element.teacherId}"><img src="/userImage?image=${imageb}"/></a>
                </div>
                <div class="name"><a href="/course-detail?id=${element.teacherId}">${element.teacherName} </a></div>
                <div class="designation">${element.subjectTaugth}</div>
                <div class="text">${element.description}</div>
                <div class="courses">${element.bookingCount}</div></div>
                </div>`;
                $(wrapper).append(div);
            })

        } else {
            $("#subjectTitle").text("No instructors by " + teachers.catName + " category");
            $("#subjectTitle").css("color", "#ff0000");
        }

    }
}

showTeachersByCategory();


$(document).on("click", "#submit-search", function () {


    if (!$("#search-teachers").val().trim().length == 0) {


        let wrapper = $("#by-filter");
        $(wrapper).empty();
        $(wrapper).css("display", "flex");
        let searchVal = $("#search-teachers").val().trim();

        sendGetRequest("GET", searchUrl + "?q=" + searchVal).then(
            data => {
                if (data.length < 1) {
                    $(wrapper).empty();
                    $(wrapper).append("<h3>No information  satisfying your request</h3>");
                }
                data.forEach(element => {
                    let image = element.avatar;
                    let imageb;
                    if (image.startsWith('"')) {
                        let imagea = image.substring(0);
                        imageb = imagea.substring(imagea.length - 1, 1);
                    } else {
                        imageb = element.avatar;
                    }
                    let div = `<div class="team-block col-lg-3 col-md-6 col-sm-12">
                    <div class="inner-box">
                    <div class="image">
                    <a href="/course-detail?id=${element.id}"><img src="/userImage?image=${imageb}" /></a>
                    </div>
                    <div class="name"><a href="/course-detail?id=${element.id}">${element.name} </a></div>
                     <div class="designation">${element.subjectTaught.subjectTaught}</div>
                     <div class="text">${element.userDescription}</div>
                     <div class="courses">${element.subjectTaught.count}</div></div>
                    </div>`;
                    $(wrapper).append(div);
                })
            }

            ).catch();
    }

});

function getLatestCourses() {

    let latestWrapper = $("#latest");

    sendGetRequest("GET", pageDataLatestCourses).then(
        data => data.forEach(element => {
            let course = `<div class="course-block col-lg-4 col-md-6 col-sm-12">
                            <div class="inner-box">
                                <div class="image">
                                    <a href="/subjectTaught/${element.id}"><img src="/userImage?image=${element.image}" alt="${element.subjectTaught}" /></a>
                                    
                                </div>
                                <div class="lower-content">
                                <h6><a href="/subjectTaught/${element.id}">${element.subjectTaught}</a></h6>

                            <div class="clearfix">
                            <div class="pull-left">
                            </div>
                            <div class="pull-right">
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>`;
            $(latestWrapper).append(course);
        })
    ).catch();


}

getLatestCourses();