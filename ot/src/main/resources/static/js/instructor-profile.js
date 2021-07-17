const teacherStudents = '/teacher/students';
const teacherBooking = '/teacherBooking/count';
const teacherMessage = '/teacher/message';
const teacherAvailibility = '/teacher/availability';


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const teacherId = user.id;


const teacherInfoUrl = "teacherData/teacher";

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

function getTeacherInfo() {
    sendGetRequest("GET", teacherInfoUrl + "?id=" + user.id).then(
        data => {
            console.log(data)
            let image = data.imageUrl;
            let imageb;
            if (image.startsWith('"')) {
                let imagea = image.substring(0);
                imageb = imagea.substring(imagea.length - 1, 1);
            } else {
                imageb = data.imageUrl;
            }

            let teacherData = `<div class="author-image">
            <img src="/userImage?image=${imageb}" alt=""/>
            </div>`;

            let h4 = `<h4 id="teacherName">${data.userName} ${data.userSurname} &nbsp; <a title="Edit Account" href="/editAccount/${data.id}"><i class="fa fa-edit"></i></a></h4>`;
            let subjectTitle = `<p>subject:${data.subjectTitle}</p>`;
            let description = `<p>${data.userDescription}</p>`;
            let country = `<p>country:${data.country}</p>`;
            let dataElement = $("#counter-booking-count");
            let rate = `<div class="rating" id="teacher-rate"><span class="rate" id="teacher-rate-span">Rate ${data.rate} <i class="fa fa-star"></i></span>
                        <span class="total-rating" id="totalRating">${data.previewCount} review(s)</span></div>`;

            $(dataElement).text(data.hourlyRate);
            let video = data.videoUrl;
            let videob;
            if (video.startsWith('"')) {
                let videoa = video.substring(0);
                videob = videoa.substring(videoa.length - 1, 1);

                let videoWrap = `<video width="100%" height="auto" controls>
                                 <source src="/userVideo?video=${videob}" type="video/mp4">
                                 
                                 Your browser does not support the video tag.
                                </video>`;


                $("#teacher-intro-video").append(videoWrap);


            } else {
                videob = data.videoUrl;
                let videoDiv = `<div class="intro-video">${videob}</div>`;
                $("#teacher-intro-video").append(videoDiv);
            }


            $("#balance").text(user.userBalance);
            $("#teacher-main-info").append(h4);
            $("#teacher-main-info").append(subjectTitle);
            $("#teacher-main-info").append(country);
            $("#teacher-main-info").append(rate);
            $("#teacherDescription").append(description);


            $("#teacher-content").html(teacherData);
        }
    ).catch();
}

getTeacherInfo();

function drawUsersonTable() {

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

            let date = year + "-" + intMonth + "-" + day;


            if (!$(elem).hasClass("vanilla-calendar-date--disabled")) {


                //TODO

                let form = `<form>
                    <input type="text" placeholder="Fill the necessary data">
                    <button class="btn btn-success">Kanach</button>
                </form>`;

                $(".time-interval-wrapper").html(form);
                $(".time-interval-wrapper").css("display", "block");

                let body = {
                    teacherId: teacherId,
                    date: date
                }
                let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                let availTimeWrapper = $("#avail-time");

                sendPostRequest("POST", "/teacherData/getAvailableHours", body, timeZone).then(
                    data => {

                        $("#userBookedTime").empty();
                        $("#userBookedTime").css("display", "flex");
                        $("#userBookedTime").append("<p><b>" + data + "</b></p>");


                    }).then(
                    data => {
                        $("#teacherUserInfo").css("display", "flex");
                        $("#teacherUserInfo").empty();
                        sendGetRequest("GET", "/student/getUserByTeacherIdAndDate?id=" + teacherId + "&date=" + date).then(
                            data => data.forEach(element => {
                                {


                                    $("#teacherUserInfo").append("<h3>" + element.user.name + "  " + element.user.surname + "</h3>");
                                    $("#teacherUserInfo").append("<p> Phone number: " + element.user.phoneNumber + "</p>");
                                    $("#teacherUserInfo").append("<p> Email: " + element.user.email + "</p>");
                                    $("#teacherUserInfo").append("<p> Lesson hour: " + element.lessonHour + "</p>");
                                    $("#teacherUserInfo").append("<br><hr>");


                                }
                            })
                        ).catch();
                    }
                ).catch();
            } else {

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

        let date = year + "-" + intMonth + "-" + day;

        let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;


        let body = {
            teacherId: teacherId,
            date: date
        };

        sendPostRequest("POST", "/teacherData/checkLessonAvailability", body, timeZone).then(
            data => {

                if (data != 1) {
                    $(val).addClass("vanilla-calendar-date--disabled");
                    $(val).removeClass("vanilla-calendar-date--active");
                }
            }
        ).catch();


    });

    let controlls = $(".vanilla-calendar-btn").find('[data-calendar-toggle]');

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
                i.log
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

                let clickedDate = clickedYear + "-" + clickedIntMonth + "-" + day;

                let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                let body = {
                    teacherId: teacherId,
                    date: clickedDate,
                    timeZone: timeZone
                };

                sendPostRequest("POST", "/teacherData/checkLessonAvailability", body, timeZone).then(
                    data => {

                        if (data != 1) {
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
            $("#popupWrapper").css("display", "flex");
            $("#popupWrapper").css("background-color", "rgba(0,0,0,.3)");
            $(".page-wrapper").css("filter", "blur(3px)");
            $(".info-popup").append("<p><b>Tutor " + $("#teacher-subjectTitle h2").text() + "</b></p>");
            $(".info-popup").append("<p><b>" + $("#course-price div").text() + "</b></p>");
            $(".info-popup").append("<p><b>" + $("#teacher-subjectSescription div").text() + "</b></p>");
            $(".info-popup").append("<p><b>" + $("#avail-time div").text() + "</b></p>");


        }

    });


    $(document).on("click", "#closePopup, #cancelPopup", function () {
        $("#popupWrapper").css("display", "none");
        $("#popupWrapper").css("background-color", "transparent");
        $(".page-wrapper").css("filter", "blur(0)");
        $(".info-popup").empty();

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

        let date = clickedYear + "-" + clickedIntMonth + "-" + day;

        let body = {
            teacherId: teacherId,
            date: date,
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
}

drawUsersonTable();

function getSuggestBooking() {
    let wrapper = $("#suggestBooking");


    sendPostRequest("POST", "/teacherData/suggestBooking?teacherId=" + teacherId).then(
        data => {
            console.log(data)

            data.forEach(element => {
                bookingId = element.id;


                $(element.permanentLessonTimes).each(function (e, permanentLessonTimes) {
                    let toTime = permanentLessonTimes.toTime;
                    console.log(toTime)

                    let image1 = element.student.avatar;
                    console.log(element.student.avatar)
                    let imageb;
                    if (image1.startsWith('"')) {
                        let imagea = image1.substring(0);
                        imageb = imagea.substring(imagea.length - 1, 1);
                    } else {
                        imageb = previews.user.avatar;
                    }


                    let div = `<div class="feature-block-two col-lg-6 col-md-12 col-sm-12">
     <div class="inner-box">
        <div class="content">
            
             <div class="image">
               ${"<img src='/userImage?image=" + imageb + "'/>"}
           </div>
            
           <div>
            <div class="name">  ${element.student.name}  ${element.student.surname} </div>
            <h6>${element.day}</h6>
        
             <h6> ${permanentLessonTimes.weekDays} ${permanentLessonTimes.fromTime}:00 - ${permanentLessonTimes.toTime}:00 </h6>
             <div class="accept">accept</div>
             <div class="decline">decline</div>
            

            



         </div>
     </div>
 </div>`;
                    $(wrapper).append(div);
                })
            });

        })
        .catch();
}

getSuggestBooking()

$(document).on("click", ".accept", function () {


    sendGetRequest("GET", "/teacherData/acceptBooking?bookingId=" + bookingId).then(
        data => {
            window.location.reload()
        }
    )
})
$(document).on("click", ".decline", function () {
    sendGetRequest("GET", "/teacherData/declineBooking?bookingId=" + bookingId).then(
        data => {
            window.location.reload()
        }
    )
})