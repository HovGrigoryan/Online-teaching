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


function loadRegStudentPageData() {
    sendGetRequest("GET", regPageData).then(
        data => {

            // let countryOrigin = $("#countryOrigin");
            // let languageSpokenSelect = $(".chooseLang");
            // let languageLevel = $(".language-level");
            let timeZoneWrap = $("#timezoneSelect");

            // data.countryList.forEach(element => {
            //     let options = `<option value="${element.id}">${element.countryName}</option>`;
            //     countryOrigin.append(options);
            // });

            data.userTimeZones.forEach(element => {

                let option = `<option value="${element.id}">${element.displayTimeZone}</option>`;
                timeZoneWrap.append(option);
            });


            // data.languageList.forEach(element => {
            //     let option;
            //     if (element.language === 'English' || element.language === 'английский' || element.language === 'անգլերեն') {
            //         option = `<option value="${element.id}" selected>${element.language}</option>`;
            //         $(".chooseLang").attr('disabled', 'disabled');
            //     } else {
            //         option = `<option value="${element.id}">${element.language}</option>`;
            //     }
            //     languageSpokenSelect.append(option);
            // });

            // $.each(data.languageLevels, function (index, value) {
            //     let options = `<option value="${value.toUpperCase()}">${value}</option>`;
            //     languageLevel.append(options);
            // });
        }
    ).catch()
}


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


// $(document).on("click", ".adddMoreLanguage", function () {
//
//     this.remove();
//
//     let newLanguageSelect = `<div class="form-group col-lg-12 col-md-12 col-sm-12 selectLangWrap" style="display: flex;flex-wrap: wrap"><div class="form-group col-lg-6 col-md-6 col-sm-6">
//             <select class="custom-select-box chooseLang">
//                     <option value="0">Choose language</option>
//                 </select>
//             </div>
//
//             <div class="form-group col-lg-6 col-md-6 col-sm-6">
//             <div style="display: flex; align-items: center">
//             <select class="custom-select-box language-level">
//                  <option value="0">Choose level</option>
//             </select>
//             <i class="fa fa-trash removeLang" style="margin: 0 5px 0 15px"></i>
//             </div>
//
//
//         </div>
//         <span class="adddMoreLanguage">Add another language</span>
//         </div>`;
//
//     $(".clonableLanguage").append(newLanguageSelect);
//     let languageSpokenSelect = $(".selectLangWrap .chooseLang");
//     let languageLevel = $(".selectLangWrap .language-level");
//
//     sendGetRequest("GET", regPageData).then(
//         data => {
//             let languageListSize = data.languageList.length;
//             let languageLevelSize = data.languageLevels.length;
//
//             languageSpokenSelect.empty();
//             let firstLangOption = `<option value="0">Choose language</option>`;
//             languageSpokenSelect.append(firstLangOption);
//             data.languageList.forEach(element => {
//                 let option;
//                 option = `<option value="${element.id}">${element.language}</option>`;
//                 if (languageListSize != data.languageList.size + 1) {
//                     languageSpokenSelect.append(option);
//                 }
//             });
//
//             languageLevel.empty();
//             let firstOption = `<option value="0">Choose level</option>`;
//             languageLevel.append(firstOption);
//             $.each(data.languageLevels, function (index, value) {
//                 let options = `<option value="${value.toUpperCase()}">${value}</option>`;
//                 if (languageLevelSize != data.languageLevels.size + 1) {
//                     $(languageLevel).append(options);
//                 }
//             });
//
//         }
//     ).catch();
// });




// $(document).on('click', '.removeLang',function () {
//     // $(this).closest('.selectLangWrap').empty();
//     $(this).closest('.selectLangWrap').remove();
//     let div = `<span class="adddMoreLanguage">Add another language</span>`;
//     $(".adddMoreLanguage").remove();
//     $(".clonableLanguage").append(div);
// });


function regStudent(){
// $(".loader-wrapper").css("display", "flex");
    let errorMsg = "";
    let error = false;
    $(".validation-error").empty();


    $("#firstName").css("border", "none");
    $("#lastName").css("border", "none");
    $("#phoneNumber").css("border", "none");
    $("#email").css("border", "none");
    $("#password").css("border", "none");
    $("#rePassword").css("border", "none");
    // $("#countryOrigin").css("border", "none");
    // $("#languageLevel").css("border", "none");
    // $(".language-level").css("border", "none");
    // $(".selectLangWrap").find(".chooseLang").css("border", "none");
    $("#timezoneSelect").css("border", "none");
    $("#avatar").css("border", "none");




    if ($("#firstName").val().length == "0") {
        errorMsg = "<p>The <b>First name</b> field is required</p>";
        $("#firstName").css("border", "1px solid #ff5773");
        error = true;
        $(".validation-error").append(errorMsg);
        $(".validation-error").css("display", "block");
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
            errorMsg = "<p>The <b>Phone number</b> must be 7-15 numbers</p>";
            $("#phoneNumber").css("border", "1px solid #ff5773");
            error = true;
            $(".validation-error").append(errorMsg);
            $(".validation-error").css("display", "block");

        }
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

    // if ($(".selectLangWrap").find(" .chooseLang").val() == "0") {
    //     errorMsg = "<p>The <b>Language </b> field is required</p>";
    //     $(".selectLangWrap").find(".chooseLang").css("border", "1px solid #ff5773");
    //     error = true;
    //     $(".validation-error").append(errorMsg);
    //     $(".validation-error").css("display", "block");
    // }


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

    // if ($("#countryOrigin").val() == "0") {
    //     errorMsg = "<p>The <b> country </b> not selected</p>";
    //     $("#countryOrigin").css("border", "1px solid #ff5773");
    //     error = true;
    //     $(".validation-error").append(errorMsg);
    //     $(".validation-error").css("display", "block");
    //
    // }
    //
    // if ($(".language-level").val() == 0) {
    //     errorMsg = "<p>The <b>Language level</b> field is required</p>";
    //     $(".language-level").css("border", "1px solid #ff5773");
    //     error = true;
    //     $(".validation-error").append(errorMsg);
    //     $(".validation-error").css("display", "block");
    // }


    // if ($("#languageLevel").val() == "0") {
    //     errorMsg = "<p>The <b> language level </b> not selected</p>";
    //     $("#languageLevel").css("border", "1px solid #ff5773");
    //     error = true;
    //     $(".validation-error").append(errorMsg);
    //     $(".validation-error").css("display", "block");
    //
    // }
    if ($("#timezoneSelect").val() == "0") {
        errorMsg = "<p>The <b> Timezone </b> not selected</p>";
        $("#timezoneSelect").css("border", "1px solid #ff5773");
        error = true;
        $(".validation-error").append(errorMsg);
        $(".validation-error").css("display", "block");

    }

    if ($("#avatar")[0].files.length == 0) {
        errorMsg = "<p>The <b>Avatar image </b> is required</p>";
        $("#avatar").css("border", "1px solid #ff5773");
        error = true;
        $(".validation-error").append(errorMsg);
        $(".validation-error").css("display", "block");

    }

    if (!error) {
        $(".validation-error").empty();
        $(".validation-error").css("display", "none");


        $(this).prop("disabled", true);

        // let spokenLanguage;
        // let spokenLanguageList = [];
        // let langs = document.getElementsByClassName("chooseLang");
        // let levels = document.getElementsByClassName("language-level");
        //
        // for (let i = 0; i < langs.length; i++) {
        //
        //
        //     for (let j = 0; j < levels.length; j++) {
        //         if (i === j) {
        //
        //             spokenLanguage = {
        //                 language: langs[i].value,
        //                 level: levels[j].value
        //             };
        //
        //             spokenLanguageList.push(spokenLanguage);
        //         }
        //     }
        // }


        let form = $("#avatarImageForm")[0];
        let data = new FormData(form);
        let avatarImageName = "";
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/student/avatar",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 0,
            success: function (data) {

                avatarImageName = data;
                let name = $("#firstName").val();
                let surname = $("#lastName").val();
                let phoneNumber =($("#phoneNumber").val());
                let email = $("#email").val();
                let password = $("#password").val();
                // let countryName = $("#countryOrigin").val();
                // let spokenLanguages = spokenLanguageList;
                let avatar = avatarImageName;
                let timezoneSelect = $("#timezoneSelect").val();

                let body = {

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

                sendPostRequest("POST", "/student", body).then(
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
                window.location = "/error";
            }
        });
    }
}

loadRegStudentPageData();


