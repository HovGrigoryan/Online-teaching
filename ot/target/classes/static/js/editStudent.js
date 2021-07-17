const regPageData = '/pageData/student/registration';
let id = window.location.pathname.substring(20);
let activeCountry;

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


function loadPageData() {
    sendGetRequest("GET", regPageData).then(
        data => {
            // let countryOrigin = $("#countryOrigin");
            // let languageSpokenSelect = $(".chooseLang");
            // let languageLevel = $(".language-level");
            let timeZoneWrap = $("#timezoneSelect");


            data.userTimeZones.forEach(element => {
                let option = `<option value="${element.id}">${element.displayTimeZone}</option>`;
                timeZoneWrap.append(option);
            });

            // data.countryList.forEach(element => {
            //     let options = `<option value="${element.id}">${element.countryName}</option>`;
            //     countryOrigin.append(options);
            // });
            //
            // data.languageList.forEach(element => {
            //     let option;
            //     if (element.language === 'English' || element.language === 'английский') {
            //         option = `<option value="${element.id}" selected>${element.language}</option>`;
            //         $(".chooseLang").attr('disabled', 'disabled');
            //     } else {
            //         option = `<option value="${element.id}">${element.language}</option>`;
            //     }
            //     languageSpokenSelect.append(option);
            // });
            //
            // $.each(data.languageLevels, function (index, value) {
            //     let options = `<option value="${value.toUpperCase()}">${value}</option>`;
            //     languageLevel.append(options);
            // });
        }
    ).catch();
}

// console.log(id)

function getUserById() {
    sendGetRequest("GET", "/studentData/studentEntity?id=" + id).then(
        data => {

            $("#firstName").val(data.user.name);
            $("#lastName").val(data.user.surname);
            $("#phoneNumber").val(data.user.phoneNumber);
            $("#email").val(data.user.email);
            let image = data.user.avatar;
            let imageb;
            if (image.startsWith('"')) {
                let imagea = image.substring(0);
                imageb = imagea.substring(imagea.length - 1, 1);
            } else {
                imageb = data.user.avatar;

            }
            const prevIMG = document.getElementById("prevIMG");
            prevIMG.setAttribute("src", "/userImage?image=" + imageb);
            $("#avatarPreview img").css("display", "block");
            // activeCountry = data.user.country;
            // $("#countryOrigin > option").each(function (index, value) {
            //     if ($(value).val() == activeCountry.id) {
            //         $(value).prop('selected', true);
            //     }
            // });

            console.log(data)
            // let  lvl = data.userLanguageLevelList[0].languageLevel;
            //
            // $(".language-level > option").each(function (index, object) {
            //     if ($(object).val() == lvl) {
            //         $(object).prop('selected', true);
            //     }
            // });


            let timeZone = data.user.userTimeZone.id;
            $("#timezoneSelect > option").each(function (index,e){
                if($(e).val() == timeZone){
                    $(e).prop('selected',true)
                }
            });
        }
    ).catch();
}


$(document).on("click", "#saveEditStudent", function () {

    $(".loader-wrapper").css("display", "flex");
    let error = false;
    // let spokenLanguage;
    // let spokenLanguageList = [];
    // let langs = document.getElementsByClassName("chooseLang");
    // let levels = document.getElementsByClassName("language-level");

    // spokenLanguage = {
    //     language: langs[0].value,
    //     level: levels[0].value,
    // };
    // spokenLanguageList.push(spokenLanguage);
    // // console.log(spokenLanguageList);


    //Image Upload
    let form = $("#avatarImageForm")[0];
    let data = new FormData(form);
    let avatarImageName = "";


    $(".validation-error").empty();

    let nameError;
    let surNameError;
    let phoneError;
    // let countryError;
    // let languageLevelError;


    if ($("#firstName").val().length < 3) {
        nameError = "<p>Wrong Name</p>";
        $(".validation-error").append(nameError);
        error = true;
    }

    if ($("#lastName").val().length < 3) {
        surNameError = "<p>Wrong Surname</p>";
        $(".validation-error").append(surNameError);
        error = true;
    }

    if ($("#phoneNumber").val().length < 7 || $("#phoneNumber").val().length > 15) {
        phoneError = "<p>Wrong Phone Number</p>";
        $(".validation-error").append(phoneError);
        error = true;
    }
    // if ($("#countryOrigin option:selected").val() == 0) {
    //     countryError = "<p>Country Name not selected</p>";
    //     $(".validation-error").append(countryError);
    //     error = true;
    // }
    // if ($("#language-level option:selected").val() == 0) {
    //     languageLevelError = "<p>Language Level not selected</p>";
    //     $(".validation-error").append(languageLevelError);
    //     error = true;
    // }


    if (error === false) {
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/user/avatar",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 30000,
            success: function (data) {

                avatarImageName = data;

                avatarVideoName = data;

                let name = $("#firstName").val();
                let surname = $("#lastName").val();
                let phoneNumber = $("#phoneNumber").val();
                let email = $("#email").val();
                let password = $("#password").val();
                // let countryName = $("#countryO    rigin").val();
                // let spokenLanguages = spokenLanguageList;
                let avatar = avatarImageName;
                let timezoneSelect = $("#timezoneSelect").val();

                let body = {
                    userId: id,
                    name: name,
                    surname: surname,
                    phoneNumber: phoneNumber,
                    email: email,
                    password: password,
                    // countryName: countryName,
                    // spokenLanguages: spokenLanguages,
                    avatar: avatar,
                    timezoneSelect: timezoneSelect,
                };


                sendPostRequest("POST", "/user/editStudent", body).then(
                    data => {
                        if (data == "Created") {
                            window.location.reload();
                        }
                        // else{
                        //     $(".loader-wrapper").css("display", "none");
                        //     // errorMsg = "<p>The <b>Email is unique, try another email </b></p>";
                        //     // $(".validation-error").append(errorMsg);
                        //     // $(".validation-error").css("display", "block");
                        //     alert("Please, do validation");
                        // }
                    }
                ).catch();
            },
            error: function (data) {
                window.location = "/error";
            }
        })
    } else {
        $(".loader-wrapper").css("display", "none");
        $(".validation-error").css("display", "block");
    }


});


loadPageData();

setTimeout(() => {
    getUserById();
}, 1500);