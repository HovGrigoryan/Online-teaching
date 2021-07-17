const studentInfoUrl = "studentData/student";

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

function getStudentInfo() {
    sendGetRequest("GET", studentInfoUrl + "?id=" + user.id).then(
        data => {
            let image = data.imageUrl;
            let imageb;
            if (image.startsWith('"')) {
                let imagea = image.substring(0);
                imageb = imagea.substring(imagea.length - 1, 1);
            } else {
                imageb = data.imageUrl;
            }


            let studentData = `<div class="author-image">
            <img src="/userImage?image=${imageb}" alt=""/>
            </div>`;
            console.log(data)
            let h4 = `<h4 id="studentName">${data.userName} ${data.userSurname} &nbsp; <a title="Edit Account" href="/editStudentAccount/${data.id}"><i class="fa fa-edit"></i></a></h4>`;
            let phoneNumber = ` <h7>phone number - ${data.phoneNumber}  </h7> <br>`;
            let email = ` <h7>email  - ${data.email}  </h7> <br>`;
            // let country = ` <h7>country  - ${data.country.countryName}  </h7> <br>`;
            // let language = ` <h7>language  - ${data.language.language}  </h7> <br>`;
            // let languageLevel = ` <h7>languageLevel  - ${data.languageLevel}  </h7> <br>`;
            let userTimezone = ` <h7>Time zone  - ${data.userTimeZone.timeZoneId}  </h7><br>`;


            $("#balance").text(data.studentBalance);
            $("#student-main-info").append(h4);
            $("#student-main-info").append(phoneNumber);
            $("#student-main-info").append(email);
            // $("#student-main-info").append(country);
            // $("#student-main-info").append(language);
            // $("#student-main-info").append(languageLevel);
            $("#student-main-info").append(userTimezone);
            $("#student-content").html(studentData);
        }
    ).catch();
}

getStudentInfo();


