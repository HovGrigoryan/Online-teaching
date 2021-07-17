const teacherDetailsUrl = "/teacherData/teacher";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const teacherId = urlParams.get('id');

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

function sendPostRequest(method, url, body, timeZone) {

    const headers = {
        'Content-Type': 'application/json',
        'timeZone': timeZone
    };
    return fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
    }).then(response => {
        return response.json();
    });

}

function loadTeacherData() {
    let videoWrapper = $("#teacher-intro-video");
    let titleWrapper = $("#teacher-subjectTitle");
    let subjectDescWrapper = $("#teacher-subjectSescription");
    let priceWrapper = $("#course-price");
    let teacherDescWrapper = $("#teacher-description");
    let studentImageWrapper = $("#student-image");

    let reviews = $("#reviews")
    let imageReviews = $("#imageReviews")

    sendGetRequest("GET", teacherDetailsUrl + "?id=" + teacherId).then(
        data => {
            console.log(data)
            let video = data.videoUrl;
            let videob;
            if(video.startsWith('"')){
                let videoa = video.substring(0);
                videob = videoa.substring(videoa.length - 1, 1);

                let videoWrap = `<video width="420px" height="auto" controls>
                                 <source src="/userVideo?video=${videob}" type="video/mp4">
                                 
                                 Your browser does not support the video tag.
                                </video>`;


                $(videoWrapper).append(videoWrap);


            } else {
                b = data.videoUrl;
                let videoDiv = `<div class="intro-video">${b}</div>`;
                $(videoWrapper).append(videoDiv);
            }

            let titleH2 = `<h2>${data.userName} ${data.userSurname}</h2>`;
            $(titleWrapper).append(titleH2);


            $(data.previews).each(function (e, previews) {
                let image1 = previews.user.avatar;
                let imageb;
                if (image1.startsWith('"')) {
                    let imagea = image1.substring(0);
                    imageb = imagea.substring(imagea.length - 1, 1);
                } else {
                    imageb = previews.user.avatar;
                }
                if (previews.content != null) {
                    let previewName = `<div class = "info">
                                        ${"<img style='float: left' src='/userImage?image=" + imageb + "'/>" +
                    "<h4 style='width: 20%; float: left; margin-top: 10px'>" + previews.user.name + " " + previews.user.surname + "</h4><br><br>" +
                    "<p>" + previews.content} </p></div> <br><br><hr style="margin: auto; width: 98%">`
                    $(reviews).append(previewName);

                    // $(imageReviews).append("<img src='/userImage?image=" + imageb + "'/>");
                    // $(reviews).append(imageReviews);

                }
            })


            let subjectDescDiv = `<div>${data.subjectTitle}</div>`;
            $(subjectDescWrapper).append(subjectDescDiv);

            let rateSpan = $("#teacher-rate-span");


            let a = data.rate.toString().substring(0, 3);


            let rateSpabContent = `${a} <i class="fa fa-star"></i>`;
            $(rateSpan).append(rateSpabContent);

            let totalRating = $("#totalRating");
            $(totalRating).append(data.previewCount + " review(s)");

            let priceDiv = `<div >Course Price: $${data.hourlyRate} <span></span></div>`;
            $(priceWrapper).append(priceDiv);

            let teacherDescDiv = `<div>${data.userDescription} </div>`;
            $(teacherDescWrapper).append(teacherDescDiv);

            let studentImageDiv = `<div class="user-image"><img src="/userImage?image=${data.imageUrl}"  alt=""></div>`;
            $(studentImageWrapper).append(studentImageDiv);
            $(studentImageWrapper).append(data.userName);


            let image = data.imageUrl;
            let imageb;
            if (image.startsWith('"')) {
                let imagea = image.substring(0);
                imageb = imagea.substring(imagea.length - 1, 1);
            } else {
                imageb = data.imageUrl;
            }
            $("#teacher-detail-image").append("<img src='/userImage?image=" + imageb + "'/>");


            if (data.rate == 5) {
                let starWrapper = `<span><i id="rate-1" class="giveRate fa fa-2x fa-star"></i></span>
                                    <span><i id="rate-2" class="giveRate fa fa-2x fa-star"></i></span>
                                    <span><i id="rate-3" class="giveRate fa fa-2x fa-star"></i></span>
                                    <span><i id="rate-4" class="giveRate fa fa-2x fa-star"></i></span>
                                    <span><i id="rate-5" class="giveRate fa fa-2x fa-star"></i></span>`;
                $(".stars").empty();
                $(".stars").append(starWrapper);
            }

            if (data.rate < 5 && data.rate > 4) {
                let starWrapper = `<span><i id="rate-1" class="giveRate fa fa-2x fa-star"></i></span>
                                    <span><i id="rate-2" class="giveRate fa fa-2x fa-star"></i></span>
                                    <span><i id="rate-3" class="giveRate fa fa-2x fa-star"></i></span>
                                    <span><i id="rate-4" class="giveRate fa fa-2x fa-star"></i></span>
                                    <span><i id="rate-5" class="giveRate fa fa-2x fa-star-o"></i></span>`;
                $(".stars").empty();
                $(".stars").append(starWrapper);
            }

            if (data.rate <= 4 && data.rate > 3) {
                let starWrapper = `<span><i id="rate-1" class="giveRate fa fa-2x fa-star"></i></span>
                                    <span><i id="rate-2" class="giveRate fa fa-2x fa-star"></i></span>
                                    <span><i id="rate-3" class="giveRate fa fa-2x fa-star"></i></span>
                                    <span><i id="rate-4" class="giveRate fa fa-2x fa-star-o"></i></span>
                                    <span><i id="rate-5" class="giveRate fa fa-2x fa-star-o"></i></span>`;
                $(".stars").empty();
                $(".stars").append(starWrapper);
            }

            if (data.rate <= 3 && data.rate > 2) {
                let starWrapper = `<span><i id="rate-1" class="giveRate fa fa-2x fa-star"></i></span>
                                    <span><i id="rate-2" class="giveRate fa fa-2x fa-star"></i></span>
                                    <span><i id="rate-3" class="giveRate fa fa-2x fa-star-o"></i></span>
                                    <span><i id="rate-4" class="giveRate fa fa-2x fa-star-o"></i></span>
                                    <span><i id="rate-5" class="giveRate fa fa-2x fa-star-o"></i></span>`;
                $(".stars").empty();
                $(".stars").append(starWrapper);
            }

            if (data.rate <= 2 && data.rate > 1) {
                let starWrapper = `<span><i id="rate-1" class="giveRate fa fa-2x fa-star"></i></span>
                                    <span><i id="rate-2" class="giveRate fa fa-2x fa-star-o"></i></span>
                                    <span><i id="rate-3" class="giveRate fa fa-2x fa-star-o"></i></span>
                                    <span><i id="rate-4" class="giveRate fa fa-2x fa-star-o"></i></span>
                                    <span><i id="rate-5" class="giveRate fa fa-2x fa-star-o"></i></span>`;
                $(".stars").empty();
                $(".stars").append(starWrapper);
            }

            if (data.rate <= 1 && data.rate >= 0) {
                let starWrapper = `<span><i id="rate-1" class="giveRate fa fa-2x fa-star-o"></i></span>
                                    <span><i id="rate-2" class="giveRate fa fa-2x fa-star-o"></i></span>
                                    <span><i id="rate-3" class="giveRate fa fa-2x fa-star-o"></i></span>
                                    <span><i id="rate-4" class="giveRate fa fa-2x fa-star-o"></i></span>
                                    <span><i id="rate-5" class="giveRate fa fa-2x fa-star-o"></i></span>`;
                $(".stars").empty();
                $(".stars").append(starWrapper);
            }


        }
    ).catch();


}

let year;

loadTeacherData();
let select = $("#selectAvailabilityHoursForEnroll");

let myCalendar = new VanillaCalendar({
    selector: "#myCalendar",

    onSelect: (data, elem) => {


        let day = $(elem).find("span").text();

        if (day == 1) {
            day = "01";
        }
        if (day == 2) {
            day = "02";
        }
        if (day == 3) {
            day = "03";
        }
        if (day == 4) {
            day = "04";
        }
        if (day == 5) {
            day = "05";
        }
        if (day == 6) {
            day = "06";
        }
        if (day == 7) {
            day = "07";
        }
        if (day == 8) {
            day = "08";
        }
        if (day == 9) {
            day = "09";
        }

        date = year + "-" + intMonth + "-" + day;

        if (!$(elem).hasClass("vanilla-calendar-date--disabled")) {


            //Todo check
            let availTimeWrapper = $("#avail-time");
            $(availTimeWrapper).empty();
            $(availTimeWrapper).append("<button class='btn btn-danger' id='enroll'>Enroll now</button>");
            $(availTimeWrapper).css("display", "flex");

        } else {
            window.location.reload();
        }
    }


})
year = $(".vanilla-calendar-header__label").text().split(" ")[1];
let intMonth;
let month = $(".vanilla-calendar-header__label").text().split(" ")[0];
switch (month) {
    case "January":
        intMonth = "01"
        break;
    case "February":
        intMonth = "02"
        break;
    case "March":
        intMonth = "03"
        break;
    case "April":
        intMonth = "04"
        break;
    case "May":
        intMonth = "05"
        break;
    case "June":
        intMonth = "06"
        break;
    case "July":
        intMonth = "07"
        break;
    case "August":
        intMonth = "08"
        break;
    case "September":
        intMonth = "09"
        break;
    case "October":
        intMonth = "10"
        break;
    case "November":
        intMonth = "11"
        break;
    case "December":
        intMonth = "12"
        break;
}

let date;

jQuery.each($(".vanilla-calendar-date"), function (i, val) {
    let day = $(val).find("span").text();

    if (day == 1) {
        day = "01";
    }
    if (day == 2) {
        day = "02";
    }
    if (day == 3) {
        day = "03";
    }
    if (day == 4) {
        day = "04";
    }
    if (day == 5) {
        day = "05";
    }
    if (day == 6) {
        day = "06";
    }
    if (day == 7) {
        day = "07";
    }
    if (day == 8) {
        day = "08";
    }
    if (day == 9) {
        day = "09";
    }

    date = year + "-" + intMonth + "-" + day;


    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    let body = {
        teacherId: teacherId,
        date: date,
        timeZone: timeZone
    };

    sendPostRequest("POST", "/teacherData/checkLessonAvailability", body, timeZone).then(
        data => {

            if (data == 1) {

                $(val).addClass("vanilla-calendar-date--disabled");
                $(val).removeClass("vanilla-calendar-date--active");
            }
        }
    ).catch();


});

let controlls = $(".vanilla-calendar-btn").find('[data-calendar-toggle]');
let prev = controlls[0];
let next = controlls[1];

$(document).on("click", controlls, function () {
    clickedYear = $(".vanilla-calendar-header__label").text().split(" ")[1];
    let clickedIntMonth;
    let clickedMonth = $(".vanilla-calendar-header__label").text().split(" ")[0];
    switch (clickedMonth) {
        case "January":
            clickedIntMonth = "01"
            break;
        case "February":
            clickedIntMonth = "02"
            break;
        case "March":
            clickedIntMonth = "03"
            break;
        case "April":
            clickedIntMonth = "04"
            break;
        case "May":
            clickedIntMonth = "05"
            break;
        case "June":
            clickedIntMonth = "06"
            break;
        case "July":
            clickedIntMonth = "07"
            break;
        case "August":
            clickedIntMonth = "08"
            break;
        case "September":
            clickedIntMonth = "09"
            break;
        case "October":
            clickedIntMonth = "10"
            break;
        case "November":
            clickedIntMonth = "11"
            break;
        case "December":
            clickedIntMonth = "12"
            break;
    }
    setTimeout(() => {
        jQuery.each($(".vanilla-calendar-date"), function (i, val) {
            let day = $(val).find("span").text();

            if (day == 1) {
                day = "01";
            }
            if (day == 2) {
                day = "02";
            }
            if (day == 3) {
                day = "03";
            }
            if (day == 4) {
                day = "04";
            }
            if (day == 5) {
                day = "05";
            }
            if (day == 6) {
                day = "06";
            }
            if (day == 7) {
                day = "07";
            }
            if (day == 8) {
                day = "08";
            }
            if (day == 9) {
                day = "09";
            }

            // let clickedDate = clickedYear + "-" + clickedIntMonth + "-" +  day;

            let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            let body = {
                teacherId: teacherId,
                date: date,
                timeZone: timeZone
            };

            sendPostRequest("POST", "/teacherData/checkLessonAvailability", body, timeZone).then(
                data => {

                    if (data == 1) {

                        $(val).addClass("vanilla-calendar-date--disabled");
                        $(val).removeClass("vanilla-calendar-date--active");
                    }
                }
            ).catch();
        });
    }, 0)
});

$(document).on("click", "#enroll", function () {

    if (user == null) {
        window.location.href = "/login";
    } else {

        let form = `<form></form>`;

        $(".time-interval-wrapper").html(form);
        $(".time-interval-wrapper").css("display", "block");

        let body = {
            teacherId: teacherId,
            date: date

        }

        let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // console.log(select);
        sendPostRequest("POST", "/teacherData/getAvailableHours", body, timeZone).then(
            data => data.forEach(element => {
                let option = `<option value="${element.id}">from ${element.fromTime}:00 to ${element.toTime}:00</option>`;
                $(select).append(option);
            })
        ).catch();


        $("#popupWrapper").css("display", "flex");
        $("#popupWrapper").css("background-color", "rgba(0,0,0,.3)");
        $(".page-wrapper").css("filter", "blur(3px)");
        $(".info-popup").prepend("<p><b>Tutor " + $("#teacher-subjectTitle h2").text() + "</b></p>");
        $(".info-popup").prepend("<p><b>" + $("#course-price div").text() + "</b></p>");
        $(".info-popup").prepend("<p><b>" + $("#teacher-subjectSescription div").text() + "</b></p>");
        $(".info-popup").prepend("<p><b>" + $("#avail-time div").text() + "</b></p>");

    }
});


$(document).on("click", "#closePopup, #cancelPopup", function () {
    window.location.reload();
});

$(document).on("click", "#acceptPopup", function () {

    let teacherBooking = "/pageData/bookCourse";

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const teacherId = urlParams.get('id');

    clickedYear = $(".vanilla-calendar-header__label").text().split(" ")[1];
    let clickedIntMonth;
    let clickedMonth = $(".vanilla-calendar-header__label").text().split(" ")[0];
    switch (clickedMonth) {
        case "January":
            clickedIntMonth = "01"
            break;
        case "February":
            clickedIntMonth = "02"
            break;
        case "March":
            clickedIntMonth = "03"
            break;
        case "April":
            clickedIntMonth = "04"
            break;
        case "May":
            clickedIntMonth = "05"
            break;
        case "June":
            clickedIntMonth = "06"
            break;
        case "July":
            clickedIntMonth = "07"
            break;
        case "August":
            clickedIntMonth = "08"
            break;
        case "September":
            clickedIntMonth = "09"
            break;
        case "October":
            clickedIntMonth = "10"
            break;
        case "November":
            clickedIntMonth = "11"
            break;
        case "December":
            clickedIntMonth = "12"
            break;
    }

    let day = $(".vanilla-calendar-date--selected span").text();

    if (day == 1) {
        day = "01";
    }
    if (day == 2) {
        day = "02";
    }
    if (day == 3) {
        day = "03";
    }
    if (day == 4) {
        day = "04";
    }
    if (day == 5) {
        day = "05";
    }
    if (day == 6) {
        day = "06";
    }
    if (day == 7) {
        day = "07";
    }
    if (day == 8) {
        day = "08";
    }
    if (day == 9) {
        day = "09";
    }

    let date = clickedYear + "-" + clickedIntMonth + "-" + day;

    let body = {
        teacherId: teacherId,
        date: date,
        availabilityId: $("#selectAvailabilityHoursForEnroll").val()
    }
    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    sendPostRequest("POST", teacherBooking, body, timeZone).then(
        data => {
            if (data == 1) {
                window.location.reload();
            } else {
                window.location.href = "/login";
            }
        }
    ).catch();


});

$(document).on("click", ".giveRate", function () {
    let rate = this.id.substring(5);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let teacherId = urlParams.get("id");

    sendGetRequest("GET", "/pageData/rate?rate=" + rate + "&teacherId=" + teacherId).then(
        data => {
            if (data != 0) {
                window.location.reload();
            }
        }
    ).catch();


});


function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}


function feedBack() {

    sendGetRequest("GET", "/pageData/feedBackUpdate?&teacherId=" + teacherId).then(
        data => {
            if (data == 0) {
                // window.location.reload();
                // document.getElementById("openForm").style.display = "none";
                $("#openForm").css("pointer-events", "none");
            }


        }
    ).catch();

}

feedBack()


$(document).on("click", "#sendFeedback", function () {
    let feedBack = $("#feedBack").val();

    sendGetRequest("GET", "/pageData/feedBack?feedBack=" + feedBack + "&teacherId=" + teacherId).then(
        data => {
            if (data == 1) {
                window.location.reload();
                // document.getElementById("openForm").style.display = "none";
            }
            // else{
            //     document.getElementById("openForm").style.display = "none";
            //
            // }


        }
    ).catch();

});
