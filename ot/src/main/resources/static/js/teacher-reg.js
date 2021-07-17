const regPageData = '/pageData/teacher/registration';
let profilePicUrl;

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


function loadRegTeacherPageData() {
    sendGetRequest("GET", regPageData).then(
        data => {

            let subjectSelect = $("#subjectTaught");
            let countryOrigin = $("#countryOrigin");
            let languageSpokenSelect = $(".chooseLang");
            let languageLevel = $(".language-level");
            let timeZoneWrap = $("#timezoneSelect");

            data.subjectTaughts.forEach(element => {

                let option = `<option value="${element.id}">${element.subjectTaught}</option>`;
                subjectSelect.append(option);
            });


            data.userTimeZones.forEach(element => {

                let option = `<option value="${element.id}">${element.displayTimeZone}</option>`;
                timeZoneWrap.append(option);
            });

            data.countryList.forEach(element => {
                let options = `<option value="${element.id}">${element.countryName}</option>`;
                countryOrigin.append(options);
            });

            data.languageList.forEach(element => {
                let option;
                if (element.language === 'English' || element.language === 'английский') {
                    option = `<option value="${element.id}" selected>${element.language}</option>`;
                    $(".chooseLang").attr('disabled', 'disabled');
                } else {
                    option = `<option value="${element.id}">${element.language}</option>`;
                }
                languageSpokenSelect.append(option);
            });

            $.each(data.languageLevels, function (index, value) {
                let options = `<option value="${value.toUpperCase()}">${value}</option>`;
                languageLevel.append(options);
            });
        }
    ).catch()
}


$(document).on("click", "#toThirth", function () {

    let errorMsg = "";
    let error = false;
    $(".validation-error").empty();
    $("#avatar").css("border", "none");
    $("#avatarVideo").css("border", "none");
    $("#descTitle").css("border", "none");
    $("#descText").css("border", "none");


    if ($("#avatar")[0].files.length == 0) {
        errorMsg = "<p>The <b>Avatar image </b> is required</p>";
        $("#avatar").css("border", "1px solid #ff5773");
        error = true;
        $(".validation-error").append(errorMsg);
        $(".validation-error").css("display", "block");

    }

    if ($("#avatarVideo")[0].files.length == 0 && $("#vimeo").val().length == 0) {
        errorMsg = "<p>The <b>Avatar video </b> is required</p>";
        $("#avatarVideo").css("border", "1px solid #ff5773");
        error = true;
        $(".validation-error").append(errorMsg);
        $(".validation-error").css("display", "block");

    }

    if ($("#descTitle").val() == 0) {

        errorMsg = "<p>The <b>Description title </b> is required</p>";
        $("#descTitle").css("border", "1px solid #ff5773");
        error = true;
        $(".validation-error").append(errorMsg);
        $(".validation-error").css("display", "block");

    }

    if ($("#descText").val() == 0) {

        errorMsg = "<p>The <b>Description text </b> is required</p>";
        $("#descText").css("border", "1px solid #ff5773");
        error = true;
        $(".validation-error").append(errorMsg);
        $(".validation-error").css("display", "block");

    } else if ($("#descText").val().length < 250) {
        errorMsg = "<p>The <b>Description text </b> should be longer than 250 symbols</p>";
        $("#descText").css("border", "1px solid #ff5773");
        error = true;
        $(".validation-error").append(errorMsg);
        $(".validation-error").css("display", "block");
    }


    if (!error) {
        $(".validation-error").empty();
        $(".validation-error").css("display", "none");
        $("#secondStep").css("display", "none");
        $("#firstStep").css("display", "none");
        $("#third").css("display", "flex");
    }
});


$(document).on("click", "#toFirst", function () {

    $("#secondStep").css("display", "none");
    $("#firstStep").css("display", "flex");

});


$(document).on("click", "#toSecond", function () {

    let errorMsg = "";
    let error = false;
    $(".validation-error").empty();
    $("#firstName").css("border", "none");
    $("#lastName").css("border", "none");
    $("#phoneNumber").css("border", "none");
    $("#email").css("border", "none");
    $("#password").css("border", "none");
    $("#rePassword").css("border", "none");
    $("#countryOrigin").css("border", "none");
    $("#languageLevel").css("border", "none");
    $("#subjectTaught").css("border", "none");
    $(".language-level").css("border", "none");
    $("#hourlyRate").css("border", "none");
    $(".selectLangWrap").find(".chooseLang").css("border", "none");


    if ($("#firstName").val().length == "0") {
        errorMsg = "<p>The <b>First name</b> field is required</p>";
        $("#firstName").css("border", "1px solid #ff5773");
        error = true;
        $(".validation-error").append(errorMsg);
        $(".validation-error").css("display", "block");
    }

    if ($("#hourlyRate").val().length == "0") {
        errorMsg = "<p>The <b>Hourly Rate</b> field is required</p>";
        $("#hourlyRate").css("border", "1px solid #ff5773");
        error = true;
        $(".validation-error").append(errorMsg);
        $(".validation-error").css("display", "block");
    } else {
        if ($("#hourlyRate").val() < "0") {
            errorMsg = "<p>The <b>Hourly Rate</b> can not be negative number</p>";
            $("#hourlyRate").css("border", "1px solid #ff5773");
            error = true;
            $(".validation-error").append(errorMsg);
            $(".validation-error").css("display", "block");
        }
    }

    if ($("#lastName").val().length == "0") {
        errorMsg = "<p>The <b>Last name</b> field is required</p>";
        $("#lastName").css("border", "1px solid #ff5773");
        error = true;
        $(".validation-error").append(errorMsg);
        $(".validation-error").css("display", "block");
    }

    if ($("#phoneNumber").val().length == "0") {
        errorMsg = "<p>The <b>Phone number</b> field is required</p>";
        $("#phoneNumber").css("border", "1px solid #ff5773");
        error = true;
        $(".validation-error").append(errorMsg);
        $(".validation-error").css("display", "block");
    } else {
        if ($("#phoneNumber").val().length > "15" || $("#phoneNumber").val().length < "7") {
            errorMsg = "<p>The <b>Phone number</b> must be 9 numbers</p>";
            $("#phoneNumber").css("border", "1px solid #ff5773");
            error = true;
            $(".validation-error").append(errorMsg);
            $(".validation-error").css("display", "block");

        }
    }

    if ($(".selectLangWrap").find(" .chooseLang").val() == "0") {
        errorMsg = "<p>The <b>Language </b> field is required</p>";
        $(".selectLangWrap").find(".chooseLang").css("border", "1px solid #ff5773");
        error = true;
        $(".validation-error").append(errorMsg);
        $(".validation-error").css("display", "block");
    }


    if ($(".language-level").val() == 0) {
        errorMsg = "<p>The <b>Language level</b> field is required</p>";
        $(".language-level").css("border", "1px solid #ff5773");
        error = true;
        $(".validation-error").append(errorMsg);
        $(".validation-error").css("display", "block");
    }

    if ($("#email").val().length == "0") {
        errorMsg = "<p>The <b>Email </b> field is required</p>";
        $("#email").css("border", "1px solid #ff5773");
        error = true;
        $(".validation-error").append(errorMsg);
        $(".validation-error").css("display", "block");
    } else {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        if (!pattern.test($("#email").val())) {
            errorMsg = "<p>The <b>Email </b> format is incorrect</p>";
            $("#email").css("border", "1px solid #ff5773");
            error = true;
            $(".validation-error").append(errorMsg);
            $(".validation-error").css("display", "block");
        }
    }

    if ($("#password").val().length == "0") {
        errorMsg = "<p>The <b>Password </b> field is required</p>";
        $("#password").css("border", "1px solid #ff5773");
        error = true;
        $(".validation-error").append(errorMsg);
        $(".validation-error").css("display", "block");
    } else {

        if ($("#password").val().length < "8") {
            errorMsg = "<p>The <b>Password </b> field length should be more than 8 symbols</p>";
            $("#password").css("border", "1px solid #ff5773");
            error = true;
            $(".validation-error").append(errorMsg);
            $(".validation-error").css("display", "block");
        } else {

            if ($("#rePassword").val() !== $("#password").val()) {
                errorMsg = "<p><b>Password </b> and <b>Confirm password</b> fields should be the same</p>";
                $("#rePassword").css("border", "1px solid #ff5773");
                error = true;
                $(".validation-error").append(errorMsg);
                $(".validation-error").css("display", "block");
            }
        }
    }
    if ($("#countryOrigin").val() == "0") {
        errorMsg = "<p>The <b> country </b> not selected</p>";
        $("#countryOrigin").css("border", "1px solid #ff5773");
        error = true;
        $(".validation-error").append(errorMsg);
        $(".validation-error").css("display", "block");

    }
    if ($("#languageLevel").val() == "0") {
        errorMsg = "<p>The <b> language level </b> not selected</p>";
        $("#languageLevel").css("border", "1px solid #ff5773");
        error = true;
        $(".validation-error").append(errorMsg);
        $(".validation-error").css("display", "block");

    }
    if ($("#subjectTaught").val() == "0") {
        errorMsg = "<p>The <b> subject </b> not selected</p>";
        $("#subjectTaught").css("border", "1px solid #ff5773");
        error = true;
        $(".validation-error").append(errorMsg);
        $(".validation-error").css("display", "block");

    }

    if (!error) {
        $(".validation-error").empty();
        $(".validation-error").css("display", "none");
        $("#firstStep").css("display", "none");
        $("#secondStep").css("display", "flex");
    }

});


const inputFile = document.getElementById("avatar");
const prevIMG = document.getElementById("prevIMG");


inputFile.addEventListener("change", function () {

    const file = this.files[0];
    $("#prevIMG").css("display", "block")
    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            prevIMG.setAttribute("src", this.result);
        });
        reader.readAsDataURL(file);
    }

});

document.querySelector("#avatarVideo")
    .onchange = function (event) {
    let file = event.target.files[0];
    let blobURL = URL.createObjectURL(file);
    document.querySelector("video").src = blobURL;
    $("#videoPreview").css("display", "block")
}


document.querySelector("#vimeo")
    .oninput = function (event) {
    let value = event.target.value;
    $("#vimeoFrame").html(value);

    document.querySelector("video").src = blobURL;
}


$(document).on("click", "#toFirst", function () {

    $("#secondStep").css("display", "none");
    $("#firstStep").css("display", "flex");


});


$(document).on("click", ".adddMoreLanguage", function () {

    this.remove();

    let newLanguageSelect = `<div class="form-group col-lg-12 col-md-12 col-sm-12 selectLangWrap" style="display: flex;flex-wrap: wrap"><div class="form-group col-lg-6 col-md-6 col-sm-6">
            <select class="custom-select-box chooseLang">
                    <option value="0">Choose language</option>
                </select>
            </div>           
            
            <div class="form-group col-lg-6 col-md-6 col-sm-6">
            <div style="display: flex; align-items: center">
            <select class="custom-select-box language-level">
                 <option value="0">Choose level</option>
            </select>
            <i class="fa fa-trash removeLang" style="margin: 0 5px 0 15px"></i>            
            </div>
            
            
        </div>
        <span class="adddMoreLanguage">Add another language</span>
        </div>`;

    $(".clonableLanguage").append(newLanguageSelect);
    let languageSpokenSelect = $(".selectLangWrap .chooseLang");
    let languageLevel = $(".selectLangWrap .language-level");

    sendGetRequest("GET", regPageData).then(
        data => {
            let languageListSize = data.languageList.length;
            let languageLevelSize = data.languageLevels.length;

            languageSpokenSelect.empty();
            let firstLangOption = `<option value="0">Choose language</option>`;
            languageSpokenSelect.append(firstLangOption);
            data.languageList.forEach(element => {
                let option;
                option = `<option value="${element.id}">${element.language}</option>`;
                if (languageListSize != data.languageList.size + 1) {
                    languageSpokenSelect.append(option);
                }
            });

            languageLevel.empty();
            let firstOption = `<option value="0">Choose level</option>`;
            languageLevel.append(firstOption);
            $.each(data.languageLevels, function (index, value) {
                let options = `<option value="${value.toUpperCase()}">${value}</option>`;
                if (languageLevelSize != data.languageLevels.size + 1) {
                    $(languageLevel).append(options);
                }
            });

        }
    ).catch();
});


$(document).on('click', '.remov.' +
    'eLang', function () {
    // $(this).closest('.selectLangWrap').empty();
    $(this).closest('.selectLangWrap').remove();
    let div = `<span class="adddMoreLanguage">Add another language</span>`;
    $(".adddMoreLanguage").remove();
    $(".clonableLanguage").append(div);
});


$("#monday").change(function () {

    if ($('#monday').prop('checked')) {
        $(".monday").css("display", "block");
    } else {
        $(".monday").css("display", "none");
    }
});

$("#tuesday").change(function () {

    if ($('#tuesday').prop('checked')) {
        $(".tuesday").css("display", "block");
    } else {
        $(".tuesday").css("display", "none");
    }
});

$("#wednesday").change(function () {

    if ($('#wednesday').prop('checked')) {
        $(".wednesday").css("display", "block");
    } else {
        $(".wednesday").css("display", "none");
    }
});

$("#thursday").change(function () {

    if ($('#thursday').prop('checked')) {
        $(".thursday").css("display", "block");
    } else {
        $(".thursday").css("display", "none");
    }
});

$("#friday").change(function () {

    if ($('#friday').prop('checked')) {
        $(".friday").css("display", "block");
    } else {
        $(".friday").css("display", "none");
    }
});

$("#saturday").change(function () {

    if ($('#saturday').prop('checked')) {
        $(".saturday").css("display", "block");
    } else {
        $(".saturday").css("display", "none");
    }
});


$("#sunday").change(function () {

    if ($('#sunday').prop('checked')) {
        $(".sunday").css("display", "block");
    } else {
        $(".sunday").css("display", "none");
    }
});


$(document).on("click", "#backToSecond", function () {
    $("#third").css("display", "none");
    $("#secondStep").css("display", "block");
});


$(document).on("click", "#submit", function () {
    $(".loader-wrapper").css("display", "flex");
    let spokenLanguage;
    let spokenLanguageList = [];
    let langs = document.getElementsByClassName("chooseLang");
    let levels = document.getElementsByClassName("language-level");

    for (let i = 0; i < langs.length; i++) {


        for (let j = 0; j < levels.length; j++) {
            if (i === j) {

                spokenLanguage = {
                    language: langs[i].value,
                    level: levels[j].value
                };

                spokenLanguageList.push(spokenLanguage);
            }
        }
    }


    let form = $("#avatarImageForm")[0];
    let data = new FormData(form);
    let avatarImageName = "";
    let avatarVideoName = "";
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/user/avatar",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 3000,
        success: function (data) {

            avatarImageName = data;

            let form = $("#avatarVideoForm")[0];
            let videoFormData = new FormData(form);
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/user/avatarVideo",
                data: videoFormData,
                processData: false,
                contentType: false,
                cache: false,
                timeout: 0,
                success: function (data) {

                    avatarVideoName = data;

                    let name = $("#firstName").val();
                    let surname = $("#lastName").val();
                    let phoneNumber =($("#phoneNumber").val())
                    let email = $("#email").val();
                    let password = $("#password").val();
                    let countryName = $("#countryOrigin").val();
                    let spokenLanguages = spokenLanguageList;
                    // let languageLevel = $(".language-level").val();
                    let hourlyRate = $("#hourlyRate").val();
                    let subjectTaught = $("#subjectTaught").val();
                    let descTitle = $("#descTitle").val();
                    let descText = $("#descText").val();
                    let vimeoVideo = $("#vimeo").val();
                    let avatarVideo = avatarVideoName;
                    let avatar = avatarImageName;
                    let timezoneSelect = $("#timezoneSelect").val();
                    let monday = $("#monday").val();
                    let tuesday = $("#tuesday").val();
                    let wednesday = $("#wednesday").val();
                    let thursday = $("#thursday").val();
                    let friday = $("#friday").val();
                    let saturday = $("#saturday").val();
                    let sunday = $("#sunday").val();

                    let mondayStart = $(".mondayStart");
                    let mondayEnd = $(".mondayEnd");

                    let tuesdayStart = $(".tuesdayStart");
                    let tuesdayEnd = $(".tuesdayEnd");

                    let wednesdayStart = $(".wednesdayStart");
                    let wednesdayEnd = $(".wednesdayEnd");

                    let thursdayStart = $(".thursdayStart");
                    let thursdayEnd = $(".thursdayEnd");

                    let fridayStart = $(".fridayStart");
                    let fridayEnd = $(".fridayEnd");

                    let saturdayStart = $(".saturdayStart");
                    let saturdayEnd = $(".saturdayEnd");

                    let sundayStart = $(".sundayStart");
                    let sundayEnd = $(".sundayEnd");

                    let mondayHourList = [];
                    $(mondayStart).each(function (i, e) {
                        $(mondayEnd).each(function (j, x) {
                            if (i === j) {
                                let mondayHourDto = {
                                    mondayStartHour: $(e).val(),
                                    mondayEndHour: $(x).val()
                                }
                                mondayHourList.push(mondayHourDto);
                            }
                        });
                    });
                    let mondayHourObjDto = {
                        mondayHourList: mondayHourList,
                        monday: monday
                    }

                    let tuesdayHourList = [];
                    $(tuesdayStart).each(function (i, e) {
                        $(tuesdayEnd).each(function (j, x) {
                            if (i === j) {
                                let tuesdayHourDto = {
                                    tuesdayStartHour: $(e).val(),
                                    tuesdayEndHour: $(x).val()
                                }
                                tuesdayHourList.push(tuesdayHourDto);
                            }
                        });
                    });
                    let tuesdayHourObjDto = {
                        tuesdayHourList: tuesdayHourList,
                        tuesday: tuesday
                    }


                    let wednesdayHourList = [];
                    $(wednesdayStart).each(function (i, e) {
                        $(wednesdayEnd).each(function (j, x) {
                            if (i === j) {
                                let wednesdayHourDto = {
                                    wednesdayStartHour: $(e).val(),
                                    wednesdayEndHour: $(x).val()
                                }
                                wednesdayHourList.push(wednesdayHourDto);
                            }
                        });
                    });
                    let wednesdayHourObjDto = {
                        wednesdayHourList: wednesdayHourList,
                        wednesday: wednesday
                    }

                    let thursdayHourList = [];
                    $(thursdayStart).each(function (i, e) {
                        $(thursdayEnd).each(function (j, x) {
                            if (i === j) {
                                let thursdayHourDto = {
                                    thursdayStartHour: $(e).val(),
                                    thursdayEndHour: $(x).val()
                                }
                                thursdayHourList.push(thursdayHourDto);
                            }
                        });
                    });
                    let thursdayHourObjDto = {
                        thursdayHourList: thursdayHourList,
                        thursday: thursday
                    }

                    let fridayHourList = [];
                    $(fridayStart).each(function (i, e) {
                        $(fridayEnd).each(function (j, x) {
                            if (i === j) {
                                let fridayHourDto = {
                                    fridayStartHour: $(e).val(),
                                    fridayEndHour: $(x).val()
                                }
                                fridayHourList.push(fridayHourDto);
                            }
                        });
                    });
                    let fridayHourObjDto = {
                        fridayHourList: fridayHourList,
                        friday: friday
                    }

                    let saturdayHourList = [];
                    $(saturdayStart).each(function (i, e) {
                        $(saturdayEnd).each(function (j, x) {
                            if (i === j) {
                                let saturdayHourDto = {
                                    saturdayStartHour: $(e).val(),
                                    saturdayEndHour: $(x).val()
                                }
                                saturdayHourList.push(saturdayHourDto);
                            }
                        });
                    });
                    let saturdayHourObjDto = {
                        saturdayHourList: saturdayHourList,
                        saturday: saturday
                    }

                    let sundayHourList = [];
                    $(sundayStart).each(function (i, e) {
                        $(sundayEnd).each(function (j, x) {
                            if (i === j) {
                                let sundayHourDto = {
                                    sundayStartHour: $(e).val(),
                                    sundayEndHour: $(x).val()
                                }
                                sundayHourList.push(sundayHourDto);
                            }
                        });
                    });
                    let sundayHourObjDto = {
                        sundayHourList: sundayHourList,
                        sunday: sunday
                    }

                    let body = {

                        name: name,
                        surname: surname,
                        phoneNumber: phoneNumber,
                        email: email,
                        password: password,
                        countryName: countryName,
                        spokenLanguages: spokenLanguages,
                        subjectTaught: subjectTaught,
                        descTitle: descTitle,
                        descText: descText,
                        vimeoVideo: vimeoVideo,
                        avatarVideo: avatarVideo,
                        avatar: avatar,
                        timezoneSelect: timezoneSelect,
                        mondayHourObjDto: mondayHourObjDto,
                        fridayHourObjDto: fridayHourObjDto,
                        tuesdayHourObjDto: tuesdayHourObjDto,
                        wednesdayHourObjDto: wednesdayHourObjDto,
                        thursdayHourObjDto: thursdayHourObjDto,
                        saturdayHourObjDto: saturdayHourObjDto,
                        sundayHourObjDto: sundayHourObjDto,
                        hourlyRate: hourlyRate
                    };
                    console.log(body);

                    sendPostRequest("POST", "/user", body).then(
                        data => {
                            if (data == "Created") {
                                window.location.href = "/";
                            } else {
                                errorMsg = "<p>The <b>Email is unique, try another email </b></p>";
                                $(".validation-error").append(errorMsg);
                                $(".validation-error").css("display", "block");
                            }
                        }
                    ).catch();


                },
                error: function (data) {
                    // window.location = "/error";
                    // console.log("ERROR")
                }
            });
            return false;
        },
        error: function (data) {
            window.location = "/error";
        }
    });

});
loadRegTeacherPageData();


$(document).on("click", ".hour-action-monday", function () {

    let newRows = $(".monday-hours")[0];
    let newRow = $(newRows).clone();


    if ($(".hour-action-monday>i").hasClass("fa-plus-circle")) {
        $(".hour-action-monday>i").removeClass("fa-plus-circle");
        $(".hour-action-monday>i").addClass("fa-times-circle");
        $(".hour-action-monday").removeClass("hour-action-monday").addClass("hour-delete-monday");

    }
    $(newRow).find("span i").removeClass("fa-times-circle");
    $(newRow).find("span i").addClass("fa-plus-circle");
    $(newRow).find("span").removeClass("hour-delete-monday");
    $(newRow).find("span").addClass("hour-action-monday");
    $("#monday-wrapper").append(newRow);

});

$(document).on("click", ".hour-delete-monday", function () {

    $(this).parent().remove();

});


$(document).on("click", ".hour-action-tuesday", function () {

    let newRows = $(".tuesday-hours")[0];
    let newRow = $(newRows).clone();


    if ($(".hour-action-tuesday>i").hasClass("fa-plus-circle")) {
        $(".hour-action-tuesday>i").removeClass("fa-plus-circle");
        $(".hour-action-tuesday>i").addClass("fa-times-circle");
        $(".hour-action-tuesday").removeClass("hour-action-tuesday").addClass("hour-delete-tuesday");

    }
    $(newRow).find("span i").removeClass("fa-times-circle");
    $(newRow).find("span i").addClass("fa-plus-circle");
    $(newRow).find("span").removeClass("hour-delete-tuesday");
    $(newRow).find("span").addClass("hour-action-tuesday");
    $("#tuesday-wrapper").append(newRow);


});

$(document).on("click", ".hour-delete-tuesday", function () {

    $(this).parent().remove();

});

$(document).on("click", ".hour-action-wednesday", function () {

    let newRows = $(".wednesday-hours")[0];
    let newRow = $(newRows).clone();


    if ($(".hour-action-wednesday>i").hasClass("fa-plus-circle")) {
        $(".hour-action-wednesday>i").removeClass("fa-plus-circle");
        $(".hour-action-wednesday>i").addClass("fa-times-circle");
        $(".hour-action-wednesday").removeClass("hour-action-wednesday").addClass("hour-delete-wednesday");

    }
    $(newRow).find("span i").removeClass("fa-times-circle");
    $(newRow).find("span i").addClass("fa-plus-circle");
    $(newRow).find("span").removeClass("hour-delete-wednesday");
    $(newRow).find("span").addClass("hour-action-wednesday");
    $("#wednesday-wrapper").append(newRow);

});

$(document).on("click", ".hour-delete-wednesday", function () {

    $(this).parent().remove();

});

$(document).on("click", ".hour-action-thursday", function () {

    let newRows = $(".thursday-hours")[0];
    let newRow = $(newRows).clone();


    if ($(".hour-action-thursday>i").hasClass("fa-plus-circle")) {
        $(".hour-action-thursday>i").removeClass("fa-plus-circle");
        $(".hour-action-thursday>i").addClass("fa-times-circle");
        $(".hour-action-thursday").removeClass("hour-action-thursday").addClass("hour-delete-thursday");

    }
    $(newRow).find("span i").removeClass("fa-times-circle");
    $(newRow).find("span i").addClass("fa-plus-circle");
    $(newRow).find("span").removeClass("hour-delete-thursday");
    $(newRow).find("span").addClass("hour-action-thursday");
    $("#thursday-wrapper").append(newRow);


});

$(document).on("click", ".hour-delete-thursday", function () {

    $(this).parent().remove();

});

$(document).on("click", ".hour-delete-wednesday", function () {

    $(this).parent().remove();

});

$(document).on("click", ".hour-action-friday", function () {

    let newRows = $(".friday-hours")[0];
    let newRow = $(newRows).clone();


    if ($(".hour-action-friday>i").hasClass("fa-plus-circle")) {
        $(".hour-action-friday>i").removeClass("fa-plus-circle");
        $(".hour-action-friday>i").addClass("fa-times-circle");
        $(".hour-action-friday").removeClass("hour-action-friday").addClass("hour-delete-friday");

    }
    $(newRow).find("span i").removeClass("fa-times-circle");
    $(newRow).find("span i").addClass("fa-plus-circle");
    $(newRow).find("span").removeClass("hour-delete-friday");
    $(newRow).find("span").addClass("hour-action-friday");
    $("#friday-wrapper").append(newRow);
});

$(document).on("click", ".hour-delete-friday", function () {

    $(this).parent().remove();

});

$(document).on("click", ".hour-action-saturday", function () {

    let newRows = $(".saturday-hours")[0];
    let newRow = $(newRows).clone();


    if ($(".hour-action-saturday>i").hasClass("fa-plus-circle")) {
        $(".hour-action-saturday>i").removeClass("fa-plus-circle");
        $(".hour-action-saturday>i").addClass("fa-times-circle");
        $(".hour-action-saturday").removeClass("hour-action-saturday").addClass("hour-delete-saturday");

    }
    $(newRow).find("span i").removeClass("fa-times-circle");
    $(newRow).find("span i").addClass("fa-plus-circle");
    $(newRow).find("span").removeClass("hour-delete-saturday");
    $(newRow).find("span").addClass("hour-action-saturday");
    $("#saturday-wrapper").append(newRow);

});

$(document).on("click", ".hour-delete-saturday", function () {

    $(this).parent().remove();

});

$(document).on("click", ".hour-action-sunday", function () {

    let newRows = $(".sunday-hours")[0];
    let newRow = $(newRows).clone();


    if ($(".hour-action-sunday>i").hasClass("fa-plus-circle")) {
        $(".hour-action-sunday>i").removeClass("fa-plus-circle");
        $(".hour-action-sunday>i").addClass("fa-times-circle");
        $(".hour-action-sunday").removeClass("hour-action-sunday").addClass("hour-delete-sunday");

    }
    $(newRow).find("span i").removeClass("fa-times-circle");
    $(newRow).find("span i").addClass("fa-plus-circle");
    $(newRow).find("span").removeClass("hour-delete-sunday");
    $(newRow).find("span").addClass("hour-action-sunday");
    $("#sunday-wrapper").append(newRow);


});

$(document).on("click", ".hour-delete-sunday", function () {

    $(this).parent().remove();

});

