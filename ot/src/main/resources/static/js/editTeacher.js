const regPageData = '/pageData/teacher/registration';
let id  = window.location.pathname.substring(13);
let activeCountry;

function  sendGetRequest(method, url) {
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


function loadPageData(){
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
                if (element.language === 'English'|| element.language === 'английский') {
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

    ).catch();
}

function getUserById(){
    sendGetRequest("GET","/teacherData/teacherEntity?id=" + id).then(
        data => {
            $("#firstName").val(data.user.name);
            $("#lastName").val(data.user.surname);
            $("#phoneNumber").val(data.user.phoneNumber);
            $("#email").val(data.user.email);
            $("#hourlyRate").val(data.user.hourlyRate);
            let image = data.user.avatar;
            let imageb;
            if(image.startsWith('"')){
                let imagea = image.substring(0);
                imageb = imagea.substring(imagea.length-1, 1);
            }else{
                imageb = data.user.avatar;

            }
            const prevIMG = document.getElementById("prevIMG");
            prevIMG.setAttribute("src", "/userImage?image=" + imageb);
            $("#avatarPreview img").css("display", "block");
            $("#descTitle").val(data.user.userDescriptionTitle);
            let video = data.user.videoUrl;
            let videoWrapper = $("#videoPreview");
            $("#descText").val(data.user.userDescription);
            $(videoWrapper).css({"display":"block", "width":"50%"});
            if(window.innerWidth < 768){
                $(videoWrapper).css("width","100%");
            }
            if(video.startsWith('"')){
                let videoa = video.substring(0);
                videob = videoa.substring(videoa.length-1, 1);
                let videoWrap = `<video width="100%" height="auto" controls>
                                 <source src="/userVideo?video=${videob}" type="video/mp4">                                 
                                 Your browser does not support the video tag.
                                </video>`;
                $(videoWrapper).append(videoWrap);
            }else{
                videob = data.user.videoUrl;
                let videoDiv = `<div class="intro-video">${videob}</div>`;
                $(videoWrapper).append(videoDiv);
            }
            activeCountry = data.user.country;
            $("#countryOrigin > option").each(function (index, value){
                if($(value).val() == activeCountry.id){
                    $(value).prop('selected', true);
                }
            });

            let  lvl = data.userLanguageLevelList[0].languageLevel;

            $(".language-level > option").each(function (index, object){
                if($(object).val() == lvl){
                    $(object).prop('selected', true);
                }
            });

            let subject = data.user.subjectTaught.id;

            $("#subjectTaught > option").each(function (index,element){
                if($(element).val() == subject){
                    $(element).prop('selected',true);
                }
            });

            let timeZone = data.user.userTimeZone.id;
            $("#timezoneSelect > option").each(function (index,e){
                if($(e).val() == timeZone){
                    $(e).prop('selected',true)
                }
            });




            $(".monday-hours").empty();
            $(".tuesday-hours").empty();
            $(".wednesday-hours").empty();
            $(".thursday-hours").empty();
            $(".friday-hours").empty();
            $(".saturday-hours").empty();
            $(".sunday-hours").empty();
            console.log(data);

            let weekdayArray = [];

            $(data.availabilityList).each(function (i, e){

                let day = e.weekDays.toLowerCase();
                let from = e.fromTime;
                let to = e.toTime;

                if(day === "monday"){


                    if(!weekdayArray.includes("monday")){
                        weekdayArray.push("monday");
                    }

                    let mondayHoursInput = `
                    <div style="display: flex; width: 100%" class="hours monday-hours">
                    <div class="form-group col-lg-6 col-md-6 col-sm-6 monday">
                    <select class="custom-select-box mondayStart">
                    <option value="0" ${(from == 0)? 'selected' : ''}>00:00</option>
                    <option value="1" ${(from == 1)? 'selected' : ''}>01:00</option>
                    <option value="2" ${(from == 2)? 'selected' : ''}>02:00</option>
                    <option value="3" ${(from == 3)? 'selected' : ''}>03:00</option>
                    <option value="4" ${(from == 4)? 'selected' : ''}>04:00</option>
                    <option value="5" ${(from == 5)? 'selected' : ''}>05:00</option>
                    <option value="6" ${(from == 6)? 'selected' : ''}>06:00</option>
                    <option value="7" ${(from == 7)? 'selected' : ''}>07:00</option>
                    <option value="8" ${(from == 8)? 'selected' : ''}>08:00</option>
                    <option value="9" ${(from == 9)? 'selected' : ''}>09:00</option>
                    <option value="10" ${(from == 10)? 'selected' : ''}>10:00</option>
                    <option value="11" ${(from == 11)? 'selected' : ''}>11:00</option>
                    <option value="12" ${(from == 12)? 'selected' : ''}>12:00</option>
                    <option value="13" ${(from == 13)? 'selected' : ''}>13:00</option>
                    <option value="14" ${(from == 14)? 'selected' : ''}>14:00</option>
                    <option value="15" ${(from == 15)? 'selected' : ''}>15:00</option>
                    <option value="16" ${(from == 16)? 'selected' : ''}>16:00</option>
                    <option value="17" ${(from == 17)? 'selected' : ''}>17:00</option>
                    <option value="18" ${(from == 18)? 'selected' : ''}>18:00</option>
                    <option value="19" ${(from == 19)? 'selected' : ''}>19:00</option>
                    <option value="20" ${(from == 20)? 'selected' : ''}>20:00</option>
                    <option value="21" ${(from == 21)? 'selected' : ''}>21:00</option>
                    <option value="22" ${(from == 22)? 'selected' : ''}>22:00</option>
                    <option value="23" ${(from == 23)? 'selected' : ''}>23:00</option>                                       
                    </select>
                    </div>

                    <div class="form-group col-lg-5 col-md-6 col-sm-6 monday">
                    <select class="custom-select-box mondayEnd">
                    <option value="0" ${(to == 0)? 'selected' : ''}>00:00</option>
                    <option value="1" ${(to == 1)? 'selected' : ''}>01:00</option>
                    <option value="2" ${(to == 2)? 'selected' : ''}>02:00</option>
                    <option value="3" ${(to == 3)? 'selected' : ''}>03:00</option>
                    <option value="4" ${(to == 4)? 'selected' : ''}>04:00</option>
                    <option value="5" ${(to == 5)? 'selected' : ''}>05:00</option>
                    <option value="6" ${(to == 6)? 'selected' : ''}>06:00</option>
                    <option value="7" ${(to == 7)? 'selected' : ''}>07:00</option>
                    <option value="8" ${(to == 8)? 'selected' : ''}>08:00</option>
                    <option value="9" ${(to == 9)? 'selected' : ''}>09:00</option>
                    <option value="10" ${(to == 10)? 'selected' : ''}>10:00</option>
                    <option value="11" ${(to == 11)? 'selected' : ''}>11:00</option>
                    <option value="12" ${(to == 12)? 'selected' : ''}>12:00</option>
                    <option value="13" ${(to == 13)? 'selected' : ''}>13:00</option>
                    <option value="14" ${(to == 14)? 'selected' : ''}>14:00</option>
                    <option value="15" ${(to == 15)? 'selected' : ''}>15:00</option>
                    <option value="16" ${(to == 16)? 'selected' : ''}>16:00</option>
                    <option value="17" ${(to == 17)? 'selected' : ''}>17:00</option>
                    <option value="18" ${(to == 18)? 'selected' : ''}>18:00</option>
                    <option value="19" ${(to == 19)? 'selected' : ''}>19:00</option>
                    <option value="20" ${(to == 21)? 'selected' : ''}>20:00</option>
                    <option value="21" ${(to == 22)? 'selected' : ''}>21:00</option>
                    <option value="22" ${(to == 23)? 'selected' : ''}>22:00</option>
                    <option value="23" ${(to == 24)? 'selected' : ''}>23:00</option>
                    </select>
                    </div>
                    <span class="col-1 hour-action-monday monday"><i class="fa fa-times-circle"></i></span>
                    </div>
                    </div>`;
                    $("#monday-wrapper").append(mondayHoursInput);


                    let l = mondayHoursInput.length;

                }

                if(day === "tuesday"){

                    if(!weekdayArray.includes("tuesday")){
                        weekdayArray.push("tuesday");
                    }

                    let tuesdayHoursInput = `
                    <div style="display: flex; width: 100%" class="hours tuesday-hours">
                    <div class="form-group col-lg-6 col-md-6 col-sm-6 tuesday">
                    <select class="custom-select-box tuesdayStart">
                    <option value="0" ${(from == 0)? 'selected' : ''}>00:00</option>
                    <option value="1" ${(from == 1)? 'selected' : ''}>01:00</option>
                    <option value="2" ${(from == 2)? 'selected' : ''}>02:00</option>
                    <option value="3" ${(from == 3)? 'selected' : ''}>03:00</option>
                    <option value="4" ${(from == 4)? 'selected' : ''}>04:00</option>
                    <option value="5" ${(from == 5)? 'selected' : ''}>05:00</option>
                    <option value="6" ${(from == 6)? 'selected' : ''}>06:00</option>
                    <option value="7" ${(from == 7)? 'selected' : ''}>07:00</option>
                    <option value="8" ${(from == 8)? 'selected' : ''}>08:00</option>
                    <option value="9" ${(from == 9)? 'selected' : ''}>09:00</option>
                    <option value="10" ${(from == 10)? 'selected' : ''}>10:00</option>
                    <option value="11" ${(from == 11)? 'selected' : ''}>11:00</option>
                    <option value="12" ${(from == 12)? 'selected' : ''}>12:00</option>
                    <option value="13" ${(from == 13)? 'selected' : ''}>13:00</option>
                    <option value="14" ${(from == 14)? 'selected' : ''}>14:00</option>
                    <option value="15" ${(from == 15)? 'selected' : ''}>15:00</option>
                    <option value="16" ${(from == 16)? 'selected' : ''}>16:00</option>
                    <option value="17" ${(from == 17)? 'selected' : ''}>17:00</option>
                    <option value="18" ${(from == 18)? 'selected' : ''}>18:00</option>
                    <option value="19" ${(from == 19)? 'selected' : ''}>19:00</option>
                    <option value="20" ${(from == 20)? 'selected' : ''}>20:00</option>
                    <option value="21" ${(from == 21)? 'selected' : ''}>21:00</option>
                    <option value="22" ${(from == 22)? 'selected' : ''}>22:00</option>
                    <option value="23" ${(from == 23)? 'selected' : ''}>23:00</option>                                       
                    </select>
                    </div>

                    <div class="form-group col-lg-5 col-md-6 col-sm-6 tuesday">
                    <select class="custom-select-box tuesdayEnd">
                    <option value="0" ${(to == 0)? 'selected' : ''}>00:00</option>
                    <option value="1" ${(to == 1)? 'selected' : ''}>01:00</option>
                    <option value="2" ${(to == 2)? 'selected' : ''}>02:00</option>
                    <option value="3" ${(to == 3)? 'selected' : ''}>03:00</option>
                    <option value="4" ${(to == 4)? 'selected' : ''}>04:00</option>
                    <option value="5" ${(to == 5)? 'selected' : ''}>05:00</option>
                    <option value="6" ${(to == 6)? 'selected' : ''}>06:00</option>
                    <option value="7" ${(to == 7)? 'selected' : ''}>07:00</option>
                    <option value="8" ${(to == 8)? 'selected' : ''}>08:00</option>
                    <option value="9" ${(to == 9)? 'selected' : ''}>09:00</option>
                    <option value="10" ${(to == 10)? 'selected' : ''}>10:00</option>
                    <option value="11" ${(to == 11)? 'selected' : ''}>11:00</option>
                    <option value="12" ${(to == 12)? 'selected' : ''}>12:00</option>
                    <option value="13" ${(to == 13)? 'selected' : ''}>13:00</option>
                    <option value="14" ${(to == 14)? 'selected' : ''}>14:00</option>
                    <option value="15" ${(to == 15)? 'selected' : ''}>15:00</option>
                    <option value="16" ${(to == 16)? 'selected' : ''}>16:00</option>
                    <option value="17" ${(to == 17)? 'selected' : ''}>17:00</option>
                    <option value="18" ${(to == 18)? 'selected' : ''}>18:00</option>
                    <option value="19" ${(to == 19)? 'selected' : ''}>19:00</option>
                    <option value="20" ${(to == 21)? 'selected' : ''}>20:00</option>
                    <option value="21" ${(to == 22)? 'selected' : ''}>21:00</option>
                    <option value="22" ${(to == 23)? 'selected' : ''}>22:00</option>
                    <option value="23" ${(to == 24)? 'selected' : ''}>23:00</option>
                    </select>
                    </div>
                    <span class="col-1 hour-action-tuesday tuesday"><i class="fa fa-times-circle"></i></span>
                    </div>
                    </div>`;


                    $("#tuesday-wrapper").append(tuesdayHoursInput);


                    let l = tuesdayHoursInput.length;

                }

                if(day === "wednesday"){

                    if(!weekdayArray.includes("wednesday")){
                        weekdayArray.push("wednesday");
                    }

                    let wednesdayHoursInput = `
                    <div style="display: flex; width: 100%" class="hours wednesday-hours">
                    <div class="form-group col-lg-6 col-md-6 col-sm-6 wednesday">
                    <select class="custom-select-box wednesdayStart">
                    <option value="0" ${(from == 0)? 'selected' : ''}>00:00</option>
                    <option value="1" ${(from == 1)? 'selected' : ''}>01:00</option>
                    <option value="2" ${(from == 2)? 'selected' : ''}>02:00</option>
                    <option value="3" ${(from == 3)? 'selected' : ''}>03:00</option>
                    <option value="4" ${(from == 4)? 'selected' : ''}>04:00</option>
                    <option value="5" ${(from == 5)? 'selected' : ''}>05:00</option>
                    <option value="6" ${(from == 6)? 'selected' : ''}>06:00</option>
                    <option value="7" ${(from == 7)? 'selected' : ''}>07:00</option>
                    <option value="8" ${(from == 8)? 'selected' : ''}>08:00</option>
                    <option value="9" ${(from == 9)? 'selected' : ''}>09:00</option>
                    <option value="10" ${(from == 10)? 'selected' : ''}>10:00</option>
                    <option value="11" ${(from == 11)? 'selected' : ''}>11:00</option>
                    <option value="12" ${(from == 12)? 'selected' : ''}>12:00</option>
                    <option value="13" ${(from == 13)? 'selected' : ''}>13:00</option>
                    <option value="14" ${(from == 14)? 'selected' : ''}>14:00</option>
                    <option value="15" ${(from == 15)? 'selected' : ''}>15:00</option>
                    <option value="16" ${(from == 16)? 'selected' : ''}>16:00</option>
                    <option value="17" ${(from == 17)? 'selected' : ''}>17:00</option>
                    <option value="18" ${(from == 18)? 'selected' : ''}>18:00</option>
                    <option value="19" ${(from == 19)? 'selected' : ''}>19:00</option>
                    <option value="20" ${(from == 20)? 'selected' : ''}>20:00</option>
                    <option value="21" ${(from == 21)? 'selected' : ''}>21:00</option>
                    <option value="22" ${(from == 22)? 'selected' : ''}>22:00</option>
                    <option value="23" ${(from == 23)? 'selected' : ''}>23:00</option>                                       
                    </select>
                    </div>

                    <div class="form-group col-lg-5 col-md-6 col-sm-6 wednesday">
                    <select class="custom-select-box wednesdayEnd">
                    <option value="0" ${(to == 0)? 'selected' : ''}>00:00</option>
                    <option value="1" ${(to == 1)? 'selected' : ''}>01:00</option>
                    <option value="2" ${(to == 2)? 'selected' : ''}>02:00</option>
                    <option value="3" ${(to == 3)? 'selected' : ''}>03:00</option>
                    <option value="4" ${(to == 4)? 'selected' : ''}>04:00</option>
                    <option value="5" ${(to == 5)? 'selected' : ''}>05:00</option>
                    <option value="6" ${(to == 6)? 'selected' : ''}>06:00</option>
                    <option value="7" ${(to == 7)? 'selected' : ''}>07:00</option>
                    <option value="8" ${(to == 8)? 'selected' : ''}>08:00</option>
                    <option value="9" ${(to == 9)? 'selected' : ''}>09:00</option>
                    <option value="10" ${(to == 10)? 'selected' : ''}>10:00</option>
                    <option value="11" ${(to == 11)? 'selected' : ''}>11:00</option>
                    <option value="12" ${(to == 12)? 'selected' : ''}>12:00</option>
                    <option value="13" ${(to == 13)? 'selected' : ''}>13:00</option>
                    <option value="14" ${(to == 14)? 'selected' : ''}>14:00</option>
                    <option value="15" ${(to == 15)? 'selected' : ''}>15:00</option>
                    <option value="16" ${(to == 16)? 'selected' : ''}>16:00</option>
                    <option value="17" ${(to == 17)? 'selected' : ''}>17:00</option>
                    <option value="18" ${(to == 18)? 'selected' : ''}>18:00</option>
                    <option value="19" ${(to == 19)? 'selected' : ''}>19:00</option>
                    <option value="20" ${(to == 21)? 'selected' : ''}>20:00</option>
                    <option value="21" ${(to == 22)? 'selected' : ''}>21:00</option>
                    <option value="22" ${(to == 23)? 'selected' : ''}>22:00</option>
                    <option value="23" ${(to == 24)? 'selected' : ''}>23:00</option>
                    </select>
                    </div>
                    <span class="col-1 hour-action-wednesday wednesday"><i class="fa fa-times-circle"></i></span>
                    </div>
                    </div>`;


                    $("#wednesday-wrapper").append(wednesdayHoursInput);


                    let l = wednesdayHoursInput.length;

                }


                if(day === "thursday"){

                    if(!weekdayArray.includes("thursday")){
                        weekdayArray.push("thursday");
                    }

                    let thursdayHoursInput = `
                    <div style="display: flex; width: 100%" class="hours thursday-hours">
                    <div class="form-group col-lg-6 col-md-6 col-sm-6 thursday">
                    <select class="custom-select-box thursdayStart">
                    <option value="0" ${(from == 0)? 'selected' : ''}>00:00</option>
                    <option value="1" ${(from == 1)? 'selected' : ''}>01:00</option>
                    <option value="2" ${(from == 2)? 'selected' : ''}>02:00</option>
                    <option value="3" ${(from == 3)? 'selected' : ''}>03:00</option>
                    <option value="4" ${(from == 4)? 'selected' : ''}>04:00</option>
                    <option value="5" ${(from == 5)? 'selected' : ''}>05:00</option>
                    <option value="6" ${(from == 6)? 'selected' : ''}>06:00</option>
                    <option value="7" ${(from == 7)? 'selected' : ''}>07:00</option>
                    <option value="8" ${(from == 8)? 'selected' : ''}>08:00</option>
                    <option value="9" ${(from == 9)? 'selected' : ''}>09:00</option>
                    <option value="10" ${(from == 10)? 'selected' : ''}>10:00</option>
                    <option value="11" ${(from == 11)? 'selected' : ''}>11:00</option>
                    <option value="12" ${(from == 12)? 'selected' : ''}>12:00</option>
                    <option value="13" ${(from == 13)? 'selected' : ''}>13:00</option>
                    <option value="14" ${(from == 14)? 'selected' : ''}>14:00</option>
                    <option value="15" ${(from == 15)? 'selected' : ''}>15:00</option>
                    <option value="16" ${(from == 16)? 'selected' : ''}>16:00</option>
                    <option value="17" ${(from == 17)? 'selected' : ''}>17:00</option>
                    <option value="18" ${(from == 18)? 'selected' : ''}>18:00</option>
                    <option value="19" ${(from == 19)? 'selected' : ''}>19:00</option>
                    <option value="20" ${(from == 20)? 'selected' : ''}>20:00</option>
                    <option value="21" ${(from == 21)? 'selected' : ''}>21:00</option>
                    <option value="22" ${(from == 22)? 'selected' : ''}>22:00</option>
                    <option value="23" ${(from == 23)? 'selected' : ''}>23:00</option>                                       
                    </select>
                    </div>

                    <div class="form-group col-lg-5 col-md-6 col-sm-6 thursday">
                    <select class="custom-select-box thursdayEnd">
                    <option value="0" ${(to == 0)? 'selected' : ''}>00:00</option>
                    <option value="1" ${(to == 1)? 'selected' : ''}>01:00</option>
                    <option value="2" ${(to == 2)? 'selected' : ''}>02:00</option>
                    <option value="3" ${(to == 3)? 'selected' : ''}>03:00</option>
                    <option value="4" ${(to == 4)? 'selected' : ''}>04:00</option>
                    <option value="5" ${(to == 5)? 'selected' : ''}>05:00</option>
                    <option value="6" ${(to == 6)? 'selected' : ''}>06:00</option>
                    <option value="7" ${(to == 7)? 'selected' : ''}>07:00</option>
                    <option value="8" ${(to == 8)? 'selected' : ''}>08:00</option>
                    <option value="9" ${(to == 9)? 'selected' : ''}>09:00</option>
                    <option value="10" ${(to == 10)? 'selected' : ''}>10:00</option>
                    <option value="11" ${(to == 11)? 'selected' : ''}>11:00</option>
                    <option value="12" ${(to == 12)? 'selected' : ''}>12:00</option>
                    <option value="13" ${(to == 13)? 'selected' : ''}>13:00</option>
                    <option value="14" ${(to == 14)? 'selected' : ''}>14:00</option>
                    <option value="15" ${(to == 15)? 'selected' : ''}>15:00</option>
                    <option value="16" ${(to == 16)? 'selected' : ''}>16:00</option>
                    <option value="17" ${(to == 17)? 'selected' : ''}>17:00</option>
                    <option value="18" ${(to == 18)? 'selected' : ''}>18:00</option>
                    <option value="19" ${(to == 19)? 'selected' : ''}>19:00</option>
                    <option value="20" ${(to == 21)? 'selected' : ''}>20:00</option>
                    <option value="21" ${(to == 22)? 'selected' : ''}>21:00</option>
                    <option value="22" ${(to == 23)? 'selected' : ''}>22:00</option>
                    <option value="23" ${(to == 24)? 'selected' : ''}>23:00</option>
                    </select>
                    </div>
                    <span class="col-1 hour-action-thursday thursday"><i class="fa fa-times-circle"></i></span>
                    </div>
                    </div>`;


                    $("#thursday-wrapper").append(thursdayHoursInput);


                    let l = thursdayHoursInput.length;

                }

                if(day === "friday"){

                    if(!weekdayArray.includes("friday")){
                        weekdayArray.push("friday");
                    }

                    let fridayHoursInput = `
                    <div style="display: flex; width: 100%" class="hours friday-hours">
                    <div class="form-group col-lg-6 col-md-6 col-sm-6 friday">
                    <select class="custom-select-box fridayStart">
                    <option value="0" ${(from == 0)? 'selected' : ''}>00:00</option>
                    <option value="1" ${(from == 1)? 'selected' : ''}>01:00</option>
                    <option value="2" ${(from == 2)? 'selected' : ''}>02:00</option>
                    <option value="3" ${(from == 3)? 'selected' : ''}>03:00</option>
                    <option value="4" ${(from == 4)? 'selected' : ''}>04:00</option>
                    <option value="5" ${(from == 5)? 'selected' : ''}>05:00</option>
                    <option value="6" ${(from == 6)? 'selected' : ''}>06:00</option>
                    <option value="7" ${(from == 7)? 'selected' : ''}>07:00</option>
                    <option value="8" ${(from == 8)? 'selected' : ''}>08:00</option>
                    <option value="9" ${(from == 9)? 'selected' : ''}>09:00</option>
                    <option value="10" ${(from == 10)? 'selected' : ''}>10:00</option>
                    <option value="11" ${(from == 11)? 'selected' : ''}>11:00</option>
                    <option value="12" ${(from == 12)? 'selected' : ''}>12:00</option>
                    <option value="13" ${(from == 13)? 'selected' : ''}>13:00</option>
                    <option value="14" ${(from == 14)? 'selected' : ''}>14:00</option>
                    <option value="15" ${(from == 15)? 'selected' : ''}>15:00</option>
                    <option value="16" ${(from == 16)? 'selected' : ''}>16:00</option>
                    <option value="17" ${(from == 17)? 'selected' : ''}>17:00</option>
                    <option value="18" ${(from == 18)? 'selected' : ''}>18:00</option>
                    <option value="19" ${(from == 19)? 'selected' : ''}>19:00</option>
                    <option value="20" ${(from == 20)? 'selected' : ''}>20:00</option>
                    <option value="21" ${(from == 21)? 'selected' : ''}>21:00</option>
                    <option value="22" ${(from == 22)? 'selected' : ''}>22:00</option>
                    <option value="23" ${(from == 23)? 'selected' : ''}>23:00</option>                                       
                    </select>
                    </div>

                    <div class="form-group col-lg-5 col-md-6 col-sm-6 friday">
                    <select class="custom-select-box fridayEnd">
                    <option value="0" ${(to == 0)? 'selected' : ''}>00:00</option>
                    <option value="1" ${(to == 1)? 'selected' : ''}>01:00</option>
                    <option value="2" ${(to == 2)? 'selected' : ''}>02:00</option>
                    <option value="3" ${(to == 3)? 'selected' : ''}>03:00</option>
                    <option value="4" ${(to == 4)? 'selected' : ''}>04:00</option>
                    <option value="5" ${(to == 5)? 'selected' : ''}>05:00</option>
                    <option value="6" ${(to == 6)? 'selected' : ''}>06:00</option>
                    <option value="7" ${(to == 7)? 'selected' : ''}>07:00</option>
                    <option value="8" ${(to == 8)? 'selected' : ''}>08:00</option>
                    <option value="9" ${(to == 9)? 'selected' : ''}>09:00</option>
                    <option value="10" ${(to == 10)? 'selected' : ''}>10:00</option>
                    <option value="11" ${(to == 11)? 'selected' : ''}>11:00</option>
                    <option value="12" ${(to == 12)? 'selected' : ''}>12:00</option>
                    <option value="13" ${(to == 13)? 'selected' : ''}>13:00</option>
                    <option value="14" ${(to == 14)? 'selected' : ''}>14:00</option>
                    <option value="15" ${(to == 15)? 'selected' : ''}>15:00</option>
                    <option value="16" ${(to == 16)? 'selected' : ''}>16:00</option>
                    <option value="17" ${(to == 17)? 'selected' : ''}>17:00</option>
                    <option value="18" ${(to == 18)? 'selected' : ''}>18:00</option>
                    <option value="19" ${(to == 19)? 'selected' : ''}>19:00</option>
                    <option value="20" ${(to == 21)? 'selected' : ''}>20:00</option>
                    <option value="21" ${(to == 22)? 'selected' : ''}>21:00</option>
                    <option value="22" ${(to == 23)? 'selected' : ''}>22:00</option>
                    <option value="23" ${(to == 24)? 'selected' : ''}>23:00</option>
                    </select>
                    </div>
                    <span class="col-1 hour-action-friday friday"><i class="fa fa-times-circle"></i></span>
                    </div>
                    </div>`;


                    $("#friday-wrapper").append(fridayHoursInput);


                    let l = fridayHoursInput.length;

                }

                if(day === "saturday"){

                    if(!weekdayArray.includes("saturday")){
                        weekdayArray.push("saturday");
                    }

                    let saturdayHoursInput = `
                    <div style="display: flex; width: 100%" class="hours saturday-hours">
                    <div class="form-group col-lg-6 col-md-6 col-sm-6 saturday">
                    <select class="custom-select-box saturdayStart">
                    <option value="0" ${(from == 0)? 'selected' : ''}>00:00</option>
                    <option value="1" ${(from == 1)? 'selected' : ''}>01:00</option>
                    <option value="2" ${(from == 2)? 'selected' : ''}>02:00</option>
                    <option value="3" ${(from == 3)? 'selected' : ''}>03:00</option>
                    <option value="4" ${(from == 4)? 'selected' : ''}>04:00</option>
                    <option value="5" ${(from == 5)? 'selected' : ''}>05:00</option>
                    <option value="6" ${(from == 6)? 'selected' : ''}>06:00</option>
                    <option value="7" ${(from == 7)? 'selected' : ''}>07:00</option>
                    <option value="8" ${(from == 8)? 'selected' : ''}>08:00</option>
                    <option value="9" ${(from == 9)? 'selected' : ''}>09:00</option>
                    <option value="10" ${(from == 10)? 'selected' : ''}>10:00</option>
                    <option value="11" ${(from == 11)? 'selected' : ''}>11:00</option>
                    <option value="12" ${(from == 12)? 'selected' : ''}>12:00</option>
                    <option value="13" ${(from == 13)? 'selected' : ''}>13:00</option>
                    <option value="14" ${(from == 14)? 'selected' : ''}>14:00</option>
                    <option value="15" ${(from == 15)? 'selected' : ''}>15:00</option>
                    <option value="16" ${(from == 16)? 'selected' : ''}>16:00</option>
                    <option value="17" ${(from == 17)? 'selected' : ''}>17:00</option>
                    <option value="18" ${(from == 18)? 'selected' : ''}>18:00</option>
                    <option value="19" ${(from == 19)? 'selected' : ''}>19:00</option>
                    <option value="20" ${(from == 20)? 'selected' : ''}>20:00</option>
                    <option value="21" ${(from == 21)? 'selected' : ''}>21:00</option>
                    <option value="22" ${(from == 22)? 'selected' : ''}>22:00</option>
                    <option value="23" ${(from == 23)? 'selected' : ''}>23:00</option>                                       
                    </select>
                    </div>

                    <div class="form-group col-lg-5 col-md-6 col-sm-6 saturday">
                    <select class="custom-select-box saturdayEnd">
                    <option value="0" ${(to == 0)? 'selected' : ''}>00:00</option>
                    <option value="1" ${(to == 1)? 'selected' : ''}>01:00</option>
                    <option value="2" ${(to == 2)? 'selected' : ''}>02:00</option>
                    <option value="3" ${(to == 3)? 'selected' : ''}>03:00</option>
                    <option value="4" ${(to == 4)? 'selected' : ''}>04:00</option>
                    <option value="5" ${(to == 5)? 'selected' : ''}>05:00</option>
                    <option value="6" ${(to == 6)? 'selected' : ''}>06:00</option>
                    <option value="7" ${(to == 7)? 'selected' : ''}>07:00</option>
                    <option value="8" ${(to == 8)? 'selected' : ''}>08:00</option>
                    <option value="9" ${(to == 9)? 'selected' : ''}>09:00</option>
                    <option value="10" ${(to == 10)? 'selected' : ''}>10:00</option>
                    <option value="11" ${(to == 11)? 'selected' : ''}>11:00</option>
                    <option value="12" ${(to == 12)? 'selected' : ''}>12:00</option>
                    <option value="13" ${(to == 13)? 'selected' : ''}>13:00</option>
                    <option value="14" ${(to == 14)? 'selected' : ''}>14:00</option>
                    <option value="15" ${(to == 15)? 'selected' : ''}>15:00</option>
                    <option value="16" ${(to == 16)? 'selected' : ''}>16:00</option>
                    <option value="17" ${(to == 17)? 'selected' : ''}>17:00</option>
                    <option value="18" ${(to == 18)? 'selected' : ''}>18:00</option>
                    <option value="19" ${(to == 19)? 'selected' : ''}>19:00</option>
                    <option value="20" ${(to == 21)? 'selected' : ''}>20:00</option>
                    <option value="21" ${(to == 22)? 'selected' : ''}>21:00</option>
                    <option value="22" ${(to == 23)? 'selected' : ''}>22:00</option>
                    <option value="23" ${(to == 24)? 'selected' : ''}>23:00</option>
                    </select>
                    </div>
                    <span class="col-1 hour-action-saturday saturday"><i class="fa fa-times-circle"></i></span>
                    </div>
                    </div>`;


                    $("#saturday-wrapper").append(saturdayHoursInput);


                    let l = saturdayHoursInput.length;

                }

                if(day === "sunday"){

                    if(!weekdayArray.includes("sunday")){
                        weekdayArray.push("sunday");
                    }

                    let sundayHoursInput = `
                    <div style="display: flex; width: 100%" class="hours sunday-hours">
                    <div class="form-group col-lg-6 col-md-6 col-sm-6 sunday">
                    <select class="custom-select-box sundayStart">
                    <option value="0" ${(from == 0)? 'selected' : ''}>00:00</option>
                    <option value="1" ${(from == 1)? 'selected' : ''}>01:00</option>
                    <option value="2" ${(from == 2)? 'selected' : ''}>02:00</option>
                    <option value="3" ${(from == 3)? 'selected' : ''}>03:00</option>
                    <option value="4" ${(from == 4)? 'selected' : ''}>04:00</option>
                    <option value="5" ${(from == 5)? 'selected' : ''}>05:00</option>
                    <option value="6" ${(from == 6)? 'selected' : ''}>06:00</option>
                    <option value="7" ${(from == 7)? 'selected' : ''}>07:00</option>
                    <option value="8" ${(from == 8)? 'selected' : ''}>08:00</option>
                    <option value="9" ${(from == 9)? 'selected' : ''}>09:00</option>
                    <option value="10" ${(from == 10)? 'selected' : ''}>10:00</option>
                    <option value="11" ${(from == 11)? 'selected' : ''}>11:00</option>
                    <option value="12" ${(from == 12)? 'selected' : ''}>12:00</option>
                    <option value="13" ${(from == 13)? 'selected' : ''}>13:00</option>
                    <option value="14" ${(from == 14)? 'selected' : ''}>14:00</option>
                    <option value="15" ${(from == 15)? 'selected' : ''}>15:00</option>
                    <option value="16" ${(from == 16)? 'selected' : ''}>16:00</option>
                    <option value="17" ${(from == 17)? 'selected' : ''}>17:00</option>
                    <option value="18" ${(from == 18)? 'selected' : ''}>18:00</option>
                    <option value="19" ${(from == 19)? 'selected' : ''}>19:00</option>
                    <option value="20" ${(from == 20)? 'selected' : ''}>20:00</option>
                    <option value="21" ${(from == 21)? 'selected' : ''}>21:00</option>
                    <option value="22" ${(from == 22)? 'selected' : ''}>22:00</option>
                    <option value="23" ${(from == 23)? 'selected' : ''}>23:00</option>                                       
                    </select>
                    </div>

                    <div class="form-group col-lg-5 col-md-6 col-sm-6 sunday">
                    <select class="custom-select-box sundayEnd">
                    <option value="0" ${(to == 0)? 'selected' : ''}>00:00</option>
                    <option value="1" ${(to == 1)? 'selected' : ''}>01:00</option>
                    <option value="2" ${(to == 2)? 'selected' : ''}>02:00</option>
                    <option value="3" ${(to == 3)? 'selected' : ''}>03:00</option>
                    <option value="4" ${(to == 4)? 'selected' : ''}>04:00</option>
                    <option value="5" ${(to == 5)? 'selected' : ''}>05:00</option>
                    <option value="6" ${(to == 6)? 'selected' : ''}>06:00</option>
                    <option value="7" ${(to == 7)? 'selected' : ''}>07:00</option>
                    <option value="8" ${(to == 8)? 'selected' : ''}>08:00</option>
                    <option value="9" ${(to == 9)? 'selected' : ''}>09:00</option>
                    <option value="10" ${(to == 10)? 'selected' : ''}>10:00</option>
                    <option value="11" ${(to == 11)? 'selected' : ''}>11:00</option>
                    <option value="12" ${(to == 12)? 'selected' : ''}>12:00</option>
                    <option value="13" ${(to == 13)? 'selected' : ''}>13:00</option>
                    <option value="14" ${(to == 14)? 'selected' : ''}>14:00</option>
                    <option value="15" ${(to == 15)? 'selected' : ''}>15:00</option>
                    <option value="16" ${(to == 16)? 'selected' : ''}>16:00</option>
                    <option value="17" ${(to == 17)? 'selected' : ''}>17:00</option>
                    <option value="18" ${(to == 18)? 'selected' : ''}>18:00</option>
                    <option value="19" ${(to == 19)? 'selected' : ''}>19:00</option>
                    <option value="20" ${(to == 21)? 'selected' : ''}>20:00</option>
                    <option value="21" ${(to == 22)? 'selected' : ''}>21:00</option>
                    <option value="22" ${(to == 23)? 'selected' : ''}>22:00</option>
                    <option value="23" ${(to == 24)? 'selected' : ''}>23:00</option>
                    </select>
                    </div>
                    <span class="col-1 hour-action-sunday sunday"><i class="fa fa-times-circle"></i></span>
                    </div>
                    </div>`;


                    $("#sunday-wrapper").append(sundayHoursInput);


                    let l = sundayHoursInput.length;

                }




            });

            console.log(weekdayArray);

            if(!weekdayArray.includes("monday")){

                let select = `<div style="display: flex; width: 100%" class="hours monday-hours">
                                    <div class="form-group col-lg-5 col-md-6 col-sm-6 monday">
                                        <select class="custom-select-box mondayStart">
                                            <option value="0">00:00</option>
                                            <option value="1">01:00</option>
                                            <option value="2">02:00</option>
                                            <option value="3">03:00</option>
                                            <option value="4">04:00</option>
                                            <option value="5">05:00</option>
                                            <option value="6">06:00</option>
                                            <option value="7">07:00</option>
                                            <option value="8">08:00</option>
                                            <option value="9">09:00</option>
                                            <option value="10">10:00</option>
                                            <option value="11">11:00</option>
                                            <option value="12">12:00</option>
                                            <option value="13">13:00</option>
                                            <option value="14">14:00</option>
                                            <option value="15">15:00</option>
                                            <option value="16">16:00</option>
                                            <option value="17">17:00</option>
                                            <option value="18">18:00</option>
                                            <option value="19">19:00</option>
                                            <option value="20">20:00</option>
                                            <option value="21">21:00</option>
                                            <option value="22">22:00</option>
                                            <option value="23">23:00</option>
                                        </select>

                                    </div>

                                    <div class="form-group col-lg-6 col-md-6 col-sm-6 monday">
                                        <select class="custom-select-box mondayEnd">
                                            <option value="0">00:00</option>
                                            <option value="1">01:00</option>
                                            <option value="2">02:00</option>
                                            <option value="3">03:00</option>
                                            <option value="4">04:00</option>
                                            <option value="5">05:00</option>
                                            <option value="6">06:00</option>
                                            <option value="7">07:00</option>
                                            <option value="8">08:00</option>
                                            <option value="9">09:00</option>
                                            <option value="10">10:00</option>
                                            <option value="11">11:00</option>
                                            <option value="12">12:00</option>
                                            <option value="13">13:00</option>
                                            <option value="14">14:00</option>
                                            <option value="15">15:00</option>
                                            <option value="16">16:00</option>
                                            <option value="17">17:00</option>
                                            <option value="18">18:00</option>
                                            <option value="19">19:00</option>
                                            <option value="20">20:00</option>
                                            <option value="21">21:00</option>
                                            <option value="22">22:00</option>
                                            <option value="23">23:00</option>
                                        </select>

                                    </div>
                                    <span class="col-1 hour-action-monday monday"><i class="fa fa-plus-circle" ></i></span></div>`;

                $("#monday-wrapper").append(select);
            }

            if(!weekdayArray.includes("tuesday")){

                let select = `<div style="display: flex; width: 100%" class="hours tuesday-hours">
                                    <div class="form-group col-lg-5 col-md-6 col-sm-6 tuesday">
                                        <select class="custom-select-box tuesdayStart">
                                            <option value="0">00:00</option>
                                            <option value="1">01:00</option>
                                            <option value="2">02:00</option>
                                            <option value="3">03:00</option>
                                            <option value="4">04:00</option>
                                            <option value="5">05:00</option>
                                            <option value="6">06:00</option>
                                            <option value="7">07:00</option>
                                            <option value="8">08:00</option>
                                            <option value="9">09:00</option>
                                            <option value="10">10:00</option>
                                            <option value="11">11:00</option>
                                            <option value="12">12:00</option>
                                            <option value="13">13:00</option>
                                            <option value="14">14:00</option>
                                            <option value="15">15:00</option>
                                            <option value="16">16:00</option>
                                            <option value="17">17:00</option>
                                            <option value="18">18:00</option>
                                            <option value="19">19:00</option>
                                            <option value="20">20:00</option>
                                            <option value="21">21:00</option>
                                            <option value="22">22:00</option>
                                            <option value="23">23:00</option>
                                        </select>

                                    </div>

                                    <div class="form-group col-lg-6 col-md-6 col-sm-6 tuesday">
                                        <select class="custom-select-box tuesdayEnd">
                                            <option value="0">00:00</option>
                                            <option value="1">01:00</option>
                                            <option value="2">02:00</option>
                                            <option value="3">03:00</option>
                                            <option value="4">04:00</option>
                                            <option value="5">05:00</option>
                                            <option value="6">06:00</option>
                                            <option value="7">07:00</option>
                                            <option value="8">08:00</option>
                                            <option value="9">09:00</option>
                                            <option value="10">10:00</option>
                                            <option value="11">11:00</option>
                                            <option value="12">12:00</option>
                                            <option value="13">13:00</option>
                                            <option value="14">14:00</option>
                                            <option value="15">15:00</option>
                                            <option value="16">16:00</option>
                                            <option value="17">17:00</option>
                                            <option value="18">18:00</option>
                                            <option value="19">19:00</option>
                                            <option value="20">20:00</option>
                                            <option value="21">21:00</option>
                                            <option value="22">22:00</option>
                                            <option value="23">23:00</option>
                                        </select>

                                    </div>
                                    <span class="col-1 hour-action-tuesday tuesday"><i class="fa fa-plus-circle" ></i></span></div>`;

                $("#tuesday-wrapper").append(select);
            }

            if(!weekdayArray.includes("wednesday")){

                let select = `<div style="display: flex; width: 100%" class="hours wednesday-hours">
                                    <div class="form-group col-lg-5 col-md-6 col-sm-6 wednesday">
                                        <select class="custom-select-box wednesdayStart">
                                            <option value="0">00:00</option>
                                            <option value="1">01:00</option>
                                            <option value="2">02:00</option>
                                            <option value="3">03:00</option>
                                            <option value="4">04:00</option>
                                            <option value="5">05:00</option>
                                            <option value="6">06:00</option>
                                            <option value="7">07:00</option>
                                            <option value="8">08:00</option>
                                            <option value="9">09:00</option>
                                            <option value="10">10:00</option>
                                            <option value="11">11:00</option>
                                            <option value="12">12:00</option>
                                            <option value="13">13:00</option>
                                            <option value="14">14:00</option>
                                            <option value="15">15:00</option>
                                            <option value="16">16:00</option>
                                            <option value="17">17:00</option>
                                            <option value="18">18:00</option>
                                            <option value="19">19:00</option>
                                            <option value="20">20:00</option>
                                            <option value="21">21:00</option>
                                            <option value="22">22:00</option>
                                            <option value="23">23:00</option>
                                        </select>

                                    </div>

                                    <div class="form-group col-lg-6 col-md-6 col-sm-6 wednesday">
                                        <select class="custom-select-box wednesdayEnd">
                                            <option value="0">00:00</option>
                                            <option value="1">01:00</option>
                                            <option value="2">02:00</option>
                                            <option value="3">03:00</option>
                                            <option value="4">04:00</option>
                                            <option value="5">05:00</option>
                                            <option value="6">06:00</option>
                                            <option value="7">07:00</option>
                                            <option value="8">08:00</option>
                                            <option value="9">09:00</option>
                                            <option value="10">10:00</option>
                                            <option value="11">11:00</option>
                                            <option value="12">12:00</option>
                                            <option value="13">13:00</option>
                                            <option value="14">14:00</option>
                                            <option value="15">15:00</option>
                                            <option value="16">16:00</option>
                                            <option value="17">17:00</option>
                                            <option value="18">18:00</option>
                                            <option value="19">19:00</option>
                                            <option value="20">20:00</option>
                                            <option value="21">21:00</option>
                                            <option value="22">22:00</option>
                                            <option value="23">23:00</option>
                                        </select>

                                    </div>
                                    <span class="col-1 hour-action-wednesday wednesday"><i class="fa fa-plus-circle" ></i></span></div>`;

                $("#wednesday-wrapper").append(select);
            }

            if(!weekdayArray.includes("thursday")){

                let select = `<div style="display: flex; width: 100%" class="hours thursday-hours">
                                    <div class="form-group col-lg-5 col-md-6 col-sm-6 thursday">
                                        <select class="custom-select-box thursdayStart">
                                            <option value="0">00:00</option>
                                            <option value="1">01:00</option>
                                            <option value="2">02:00</option>
                                            <option value="3">03:00</option>
                                            <option value="4">04:00</option>
                                            <option value="5">05:00</option>
                                            <option value="6">06:00</option>
                                            <option value="7">07:00</option>
                                            <option value="8">08:00</option>
                                            <option value="9">09:00</option>
                                            <option value="10">10:00</option>
                                            <option value="11">11:00</option>
                                            <option value="12">12:00</option>
                                            <option value="13">13:00</option>
                                            <option value="14">14:00</option>
                                            <option value="15">15:00</option>
                                            <option value="16">16:00</option>
                                            <option value="17">17:00</option>
                                            <option value="18">18:00</option>
                                            <option value="19">19:00</option>
                                            <option value="20">20:00</option>
                                            <option value="21">21:00</option>
                                            <option value="22">22:00</option>
                                            <option value="23">23:00</option>
                                        </select>

                                    </div>

                                    <div class="form-group col-lg-6 col-md-6 col-sm-6 thursday">
                                        <select class="custom-select-box thursdayEnd">
                                            <option value="0">00:00</option>
                                            <option value="1">01:00</option>
                                            <option value="2">02:00</option>
                                            <option value="3">03:00</option>
                                            <option value="4">04:00</option>
                                            <option value="5">05:00</option>
                                            <option value="6">06:00</option>
                                            <option value="7">07:00</option>
                                            <option value="8">08:00</option>
                                            <option value="9">09:00</option>
                                            <option value="10">10:00</option>
                                            <option value="11">11:00</option>
                                            <option value="12">12:00</option>
                                            <option value="13">13:00</option>
                                            <option value="14">14:00</option>
                                            <option value="15">15:00</option>
                                            <option value="16">16:00</option>
                                            <option value="17">17:00</option>
                                            <option value="18">18:00</option>
                                            <option value="19">19:00</option>
                                            <option value="20">20:00</option>
                                            <option value="21">21:00</option>
                                            <option value="22">22:00</option>
                                            <option value="23">23:00</option>
                                        </select>

                                    </div>
                                    <span class="col-1 hour-action-thursday thursday"><i class="fa fa-plus-circle" ></i></span></div>`;

                $("#thursday-wrapper").append(select);
            }

            if(!weekdayArray.includes("friday")){

                let select = `<div style="display: flex; width: 100%" class="hours friday-hours">
                                    <div class="form-group col-lg-5 col-md-6 col-sm-6 friday">
                                        <select class="custom-select-box fridayStart">
                                            <option value="0">00:00</option>
                                            <option value="1">01:00</option>
                                            <option value="2">02:00</option>
                                            <option value="3">03:00</option>
                                            <option value="4">04:00</option>
                                            <option value="5">05:00</option>
                                            <option value="6">06:00</option>
                                            <option value="7">07:00</option>
                                            <option value="8">08:00</option>
                                            <option value="9">09:00</option>
                                            <option value="10">10:00</option>
                                            <option value="11">11:00</option>
                                            <option value="12">12:00</option>
                                            <option value="13">13:00</option>
                                            <option value="14">14:00</option>
                                            <option value="15">15:00</option>
                                            <option value="16">16:00</option>
                                            <option value="17">17:00</option>
                                            <option value="18">18:00</option>
                                            <option value="19">19:00</option>
                                            <option value="20">20:00</option>
                                            <option value="21">21:00</option>
                                            <option value="22">22:00</option>
                                            <option value="23">23:00</option>
                                        </select>

                                    </div>

                                    <div class="form-group col-lg-6 col-md-6 col-sm-6 friday">
                                        <select class="custom-select-box fridayEnd">
                                            <option value="0">00:00</option>
                                            <option value="1">01:00</option>
                                            <option value="2">02:00</option>
                                            <option value="3">03:00</option>
                                            <option value="4">04:00</option>
                                            <option value="5">05:00</option>
                                            <option value="6">06:00</option>
                                            <option value="7">07:00</option>
                                            <option value="8">08:00</option>
                                            <option value="9">09:00</option>
                                            <option value="10">10:00</option>
                                            <option value="11">11:00</option>
                                            <option value="12">12:00</option>
                                            <option value="13">13:00</option>
                                            <option value="14">14:00</option>
                                            <option value="15">15:00</option>
                                            <option value="16">16:00</option>
                                            <option value="17">17:00</option>
                                            <option value="18">18:00</option>
                                            <option value="19">19:00</option>
                                            <option value="20">20:00</option>
                                            <option value="21">21:00</option>
                                            <option value="22">22:00</option>
                                            <option value="23">23:00</option>
                                        </select>

                                    </div>
                                    <span class="col-1 hour-action-friday friday"><i class="fa fa-plus-circle" ></i></span></div>`;

                $("#friday-wrapper").append(select);
            }

            if(!weekdayArray.includes("saturday")){

                let select = `<div style="display: flex; width: 100%" class="hours saturday-hours">
                                    <div class="form-group col-lg-5 col-md-6 col-sm-6 saturday">
                                        <select class="custom-select-box saturdayStart">
                                            <option value="0">00:00</option>
                                            <option value="1">01:00</option>
                                            <option value="2">02:00</option>
                                            <option value="3">03:00</option>
                                            <option value="4">04:00</option>
                                            <option value="5">05:00</option>
                                            <option value="6">06:00</option>
                                            <option value="7">07:00</option>
                                            <option value="8">08:00</option>
                                            <option value="9">09:00</option>
                                            <option value="10">10:00</option>
                                            <option value="11">11:00</option>
                                            <option value="12">12:00</option>
                                            <option value="13">13:00</option>
                                            <option value="14">14:00</option>
                                            <option value="15">15:00</option>
                                            <option value="16">16:00</option>
                                            <option value="17">17:00</option>
                                            <option value="18">18:00</option>
                                            <option value="19">19:00</option>
                                            <option value="20">20:00</option>
                                            <option value="21">21:00</option>
                                            <option value="22">22:00</option>
                                            <option value="23">23:00</option>
                                        </select>

                                    </div>

                                    <div class="form-group col-lg-6 col-md-6 col-sm-6 saturday">
                                        <select class="custom-select-box saturdayEnd">
                                            <option value="0">00:00</option>
                                            <option value="1">01:00</option>
                                            <option value="2">02:00</option>
                                            <option value="3">03:00</option>
                                            <option value="4">04:00</option>
                                            <option value="5">05:00</option>
                                            <option value="6">06:00</option>
                                            <option value="7">07:00</option>
                                            <option value="8">08:00</option>
                                            <option value="9">09:00</option>
                                            <option value="10">10:00</option>
                                            <option value="11">11:00</option>
                                            <option value="12">12:00</option>
                                            <option value="13">13:00</option>
                                            <option value="14">14:00</option>
                                            <option value="15">15:00</option>
                                            <option value="16">16:00</option>
                                            <option value="17">17:00</option>
                                            <option value="18">18:00</option>
                                            <option value="19">19:00</option>
                                            <option value="20">20:00</option>
                                            <option value="21">21:00</option>
                                            <option value="22">22:00</option>
                                            <option value="23">23:00</option>
                                        </select>

                                    </div>
                                    <span class="col-1 hour-action-saturday saturday"><i class="fa fa-plus-circle" ></i></span></div>`;

                $("#saturday-wrapper").append(select);
            }

            if(!weekdayArray.includes("sunday")){

                let select = `<div style="display: flex; width: 100%" class="hours sunday-hours">
                                    <div class="form-group col-lg-5 col-md-6 col-sm-6 sunday">
                                        <select class="custom-select-box sundayStart">
                                            <option value="0">00:00</option>
                                            <option value="1">01:00</option>
                                            <option value="2">02:00</option>
                                            <option value="3">03:00</option>
                                            <option value="4">04:00</option>
                                            <option value="5">05:00</option>
                                            <option value="6">06:00</option>
                                            <option value="7">07:00</option>
                                            <option value="8">08:00</option>
                                            <option value="9">09:00</option>
                                            <option value="10">10:00</option>
                                            <option value="11">11:00</option>
                                            <option value="12">12:00</option>
                                            <option value="13">13:00</option>
                                            <option value="14">14:00</option>
                                            <option value="15">15:00</option>
                                            <option value="16">16:00</option>
                                            <option value="17">17:00</option>
                                            <option value="18">18:00</option>
                                            <option value="19">19:00</option>
                                            <option value="20">20:00</option>
                                            <option value="21">21:00</option>
                                            <option value="22">22:00</option>
                                            <option value="23">23:00</option>
                                        </select>

                                    </div>

                                    <div class="form-group col-lg-6 col-md-6 col-sm-6 sunday">
                                        <select class="custom-select-box sundayEnd">
                                            <option value="0">00:00</option>
                                            <option value="1">01:00</option>
                                            <option value="2">02:00</option>
                                            <option value="3">03:00</option>
                                            <option value="4">04:00</option>
                                            <option value="5">05:00</option>
                                            <option value="6">06:00</option>
                                            <option value="7">07:00</option>
                                            <option value="8">08:00</option>
                                            <option value="9">09:00</option>
                                            <option value="10">10:00</option>
                                            <option value="11">11:00</option>
                                            <option value="12">12:00</option>
                                            <option value="13">13:00</option>
                                            <option value="14">14:00</option>
                                            <option value="15">15:00</option>
                                            <option value="16">16:00</option>
                                            <option value="17">17:00</option>
                                            <option value="18">18:00</option>
                                            <option value="19">19:00</option>
                                            <option value="20">20:00</option>
                                            <option value="21">21:00</option>
                                            <option value="22">22:00</option>
                                            <option value="23">23:00</option>
                                        </select>

                                    </div>
                                    <span class="col-1 hour-action-sunday sunday"><i class="fa fa-plus-circle" ></i></span></div>`;

                $("#sunday-wrapper").append(select);
            }
        }
    ).catch();
}


$(document).on("click", "#saveEditTeacher", function (){
   $(".loader-wrapper").css("display", "flex");
    let error = false;
    let spokenLanguage;
    let spokenLanguageList = [];
    let langs = document.getElementsByClassName("chooseLang");
    let levels = document.getElementsByClassName("language-level");

    spokenLanguage = {
        language: langs[0].value,
        level: levels[0].value,
    };
    spokenLanguageList.push(spokenLanguage);



    //Image Upload
    let form = $("#avatarImageForm")[0];
    let data = new FormData(form);
    let avatarImageName = "";
    let avatarVideoName = "";


    $(".validation-error").empty();

    let nameError;
    let surNameError;
    let phoneError;
    let countryError;
    let languageLevelError;
    let hourlyRateError;
    let subjectTaughtError;
    let descriptionTitleError;
    let descriptionTextError;

    if($("#firstName").val().length < 3){
        nameError = "<p>Wrong Name</p>";
        $(".validation-error").append(nameError);
        error = true;
    }

    if($("#lastName").val().length < 3){
        surNameError = "<p>Wrong Surname</p>";
        $(".validation-error").append(surNameError);
        error = true;
    }

    if($("#phoneNumber").val().length < 7 || $("#phoneNumber").val().length > 15){
        phoneError = "<p>Wrong Phone Number</p>";
        $(".validation-error").append(phoneError);
        error = true;
    }
    if($("#countryOrigin option:selected").val()==0){
        countryError = "<p>Country Name not selected</p>";
        $(".validation-error").append(countryError);
        error = true;
    }
    if($("#language-level option:selected").val()==0){
        languageLevelError = "<p>Language Level not selected</p>";
        $(".validation-error").append(languageLevelError);
        error = true;
    }
    if($("#hourlyRate").val().length == 0){
        hourlyRateError = "<p>Hourly Rate not set</p>";
        $(".validation-error").append(hourlyRateError);
        error = true;
    }
    if($("#subjectTaught option:selected").val()== 0){
        subjectTaughtError = "<p>Subject Taught not selected</p>";
        $(".validation-error").append(subjectTaughtError);
        error = true;
    }
    if($("#descText").val().length < 250){
        descriptionTextError = "<p>Description Text must be more than 250 symbols</p>";
        $(".validation-error").append(descriptionTextError);
        error = true;
    }
    if($("#descTitle").val().length ==0){
        descriptionTitleError = "<p>Description Title not set</p>";
        $(".validation-error").append(descriptionTitleError);
        error = true;
    }

    if(error===false){
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
                        let phoneNumber = $("#phoneNumber").val();
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

                        let monday;
                        if($("#monday").prop("checked") == true){
                            monday = "on";
                        }else{
                            monday = "off";
                        }
                        let tuesday;
                        if($("#tuesday").prop("checked") == true){
                            tuesday = "on";
                        }else{
                            tuesday = "off";
                        }

                        let wednesday;
                        if($("#wednesday").prop("checked") == true){
                            wednesday = "on";
                        }else{
                            wednesday = "off";
                        }

                        let thursday;
                        if($("#thursday").prop("checked") == true){
                            thursday = "on";
                        }else{
                            thursday = "off";
                        }

                        let friday;
                        if($("#friday").prop("checked") == true){
                            friday = "on";
                        }else{
                            friday = "off";
                        }

                        let saturday;
                        if($("#saturday").prop("checked") == true){
                            saturday = "on";
                        }else{
                            saturday = "off";
                        }

                        let sunday;
                        if($("#sunday").prop("checked") == true){
                            sunday = "on";
                        }else{
                            sunday = "off";
                        }



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
                        $(mondayStart).each(function (i, e){
                            $(mondayEnd).each(function (j, x){
                                if(i === j){
                                    let mondayHourDto = {
                                        mondayStartHour: $(e).val(),
                                        mondayEndHour: $(x).val()
                                    }
                                    mondayHourList.push(mondayHourDto);
                                }
                            });
                        });
                        let mondayHourObjDto = {
                            mondayHourList:mondayHourList,
                            monday:monday
                        }

                        let tuesdayHourList = [];
                        $(tuesdayStart).each(function (i, e){
                            $(tuesdayEnd).each(function (j, x){
                                if(i === j){
                                    let tuesdayHourDto = {
                                        tuesdayStartHour: $(e).val(),
                                        tuesdayEndHour: $(x).val()
                                    }
                                    tuesdayHourList.push(tuesdayHourDto);
                                }
                            });
                        });
                        let tuesdayHourObjDto = {
                            tuesdayHourList:tuesdayHourList,
                            tuesday:tuesday
                        }


                        let wednesdayHourList = [];
                        $(wednesdayStart).each(function (i, e){
                            $(wednesdayEnd).each(function (j, x){
                                if(i === j){
                                    let wednesdayHourDto = {
                                        wednesdayStartHour: $(e).val(),
                                        wednesdayEndHour: $(x).val()
                                    }
                                    wednesdayHourList.push(wednesdayHourDto);
                                }
                            });
                        });
                        let wednesdayHourObjDto = {
                            wednesdayHourList:wednesdayHourList,
                            wednesday:wednesday
                        }

                        let thursdayHourList = [];
                        $(thursdayStart).each(function (i, e){
                            $(thursdayEnd).each(function (j, x){
                                if(i === j){
                                    let thursdayHourDto = {
                                        thursdayStartHour: $(e).val(),
                                        thursdayEndHour: $(x).val()
                                    }
                                    thursdayHourList.push(thursdayHourDto);
                                }
                            });
                        });
                        let thursdayHourObjDto = {
                            thursdayHourList:thursdayHourList,
                            thursday:thursday
                        }

                        let fridayHourList = [];
                        $(fridayStart).each(function (i, e){
                            $(fridayEnd).each(function (j, x){
                                if(i === j){
                                    let fridayHourDto = {
                                        fridayStartHour: $(e).val(),
                                        fridayEndHour: $(x).val()
                                    }
                                    fridayHourList.push(fridayHourDto);
                                }
                            });
                        });
                        let fridayHourObjDto = {
                            fridayHourList:fridayHourList,
                            friday:friday
                        }

                        let saturdayHourList = [];
                        $(saturdayStart).each(function (i, e){
                            $(saturdayEnd).each(function (j, x){
                                if(i === j){
                                    let saturdayHourDto = {
                                        saturdayStartHour: $(e).val(),
                                        saturdayEndHour: $(x).val()
                                    }
                                    saturdayHourList.push(saturdayHourDto);
                                }
                            });
                        });
                        let saturdayHourObjDto = {
                            saturdayHourList:saturdayHourList,
                            saturday:saturday
                        }

                        let sundayHourList = [];
                        $(sundayStart).each(function (i,e){
                            $(sundayEnd).each(function (j,x){
                                if (i===j){
                                    let sundayHourDto = {
                                        sundayStartHour:$(e).val(),
                                        sundayEndHour:$(x).val()
                                    }
                                    sundayHourList.push(sundayHourDto);
                                }
                            });
                        });
                        let sundayHourObjDto = {
                            sundayHourList:sundayHourList,
                            sunday:sunday
                        }

                        let body = {
                            userId: id,
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
                            mondayHourObjDto:mondayHourObjDto,
                            fridayHourObjDto:fridayHourObjDto,
                            tuesdayHourObjDto:tuesdayHourObjDto,
                            wednesdayHourObjDto:wednesdayHourObjDto,
                            thursdayHourObjDto:thursdayHourObjDto,
                            saturdayHourObjDto:saturdayHourObjDto,
                            sundayHourObjDto:sundayHourObjDto,
                            hourlyRate:hourlyRate
                        };



                        sendPostRequest("POST", "/user/editUser",body).then(
                            data => {
                                if(data == "Created"){
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

            },
            error: function (data) {
                window.location = "/error";
            }
        })
    }else{
        $(".loader-wrapper").css("display","none");
        $(".validation-error").css("display", "block");
    }

});


loadPageData();

setTimeout(()=>{
    getUserById();
},1500);

$(document).on("click", ".hour-action-monday", function (){

    let newRows = $(this).parent();
    let newRow = $(newRows).clone();


    if($(".hour-action-monday>i").hasClass("fa-plus-circle")){
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

$(document).on("click",".hour-delete-monday", function (){

    $(this).parent().remove();
});

$(document).on("click",".hour-action-tuesday", function (){

    let newRows = $(this).parent();
    let newRow = $(newRows).clone();


    if($(".hour-action-tuesday>i").hasClass("fa-plus-circle")){
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

$(document).on("click",".hour-delete-tuesday", function (){

    $(this).parent().remove();

});


$(document).on("click",".hour-action-wednesday",function (){
    let newRows = $(this).parent();
    let newRow = $(newRows).clone();

    if ($(".hour-action-wednesday>i").hasClass("fa-plus-circle")){
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
$(document).on("click",".hour-delete-wednesday",function (){
   $(this).parent().remove();
});

$(document).on("click", ".hour-action-thursday", function (){

    let newRows = $(this).parent();
    let newRow = $(newRows).clone();


    if($(".hour-action-thursday>i").hasClass("fa-plus-circle")){
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

$(document).on("click",".hour-delete-thursday", function (){

    $(this).parent().remove();

});

$(document).on("click", ".hour-action-friday", function (){

    let newRows = $(this).parent();
    let newRow = $(newRows).clone();


    if($(".hour-action-friday>i").hasClass("fa-plus-circle")){
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

$(document).on("click",".hour-delete-friday", function (){

    $(this).parent().remove();

});

$(document).on("click", ".hour-action-saturday", function (){

    let newRows = $(this).parent();
    let newRow = $(newRows).clone();


    if($(".hour-action-saturday>i").hasClass("fa-plus-circle")){
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

$(document).on("click",".hour-delete-saturday", function (){

    $(this).parent().remove();

});

$(document).on("click", ".hour-action-sunday", function (){

    let newRows = $(this).parent();
    let newRow = $(newRows).clone();


    if($(".hour-action-sunday>i").hasClass("fa-plus-circle")){
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

$(document).on("click",".hour-delete-sunday", function (){

    $(this).parent().remove();

});
setTimeout(()=>{



    let mondayRow  = $(".monday-hours");
    $(mondayRow).each(function (i,e){
        if (i+1 == mondayRow.length){
            $(e).find(".fa-times-circle").removeClass("fa-times-circle").addClass("fa-plus-circle");
            $(e).find("span").removeClass("hour-delete-monday");
            $(e).find("span").addClass("hour-action-monday");
        }
    });
}, 2000);

setTimeout(()=>{



    let tuesdayRow  = $(".tuesday-hours");

    $(tuesdayRow).each(function (i,e){
        if (i+1 == tuesdayRow.length){
            $(e).find(".fa-times-circle").removeClass("fa-times-circle").addClass("fa-plus-circle");
            $(e).find("span").removeClass("hour-delete-tuesday");
            $(e).find("span").addClass("hour-action-tuesday");
        }
    });
}, 2000);


setTimeout(()=>{
let wednesdayRow  = $(".wednesday-hours");

$(wednesdayRow).each(function (i,e){
    if (i+1 == wednesdayRow.length){
        $(e).find(".fa-times-circle").removeClass("fa-times-circle").addClass("fa-plus-circle");
        $(e).find("span").removeClass("hour-delete-wednesday");
        $(e).find("span").addClass("hour-action-wednesday");
    }
});
}, 2000);

setTimeout(()=>{
    let thursdayRow  = $(".thursday-hours");

    $(thursdayRow).each(function (i,e){
        if (i+1 == thursdayRow.length){
            $(e).find(".fa-times-circle").removeClass("fa-times-circle").addClass("fa-plus-circle");
            $(e).find("span").removeClass("hour-delete-thursday");
            $(e).find("span").addClass("hour-action-thursday");
        }
    });
}, 2000);

setTimeout(()=>{
    let fridayRow  = $(".friday-hours");

    $(fridayRow).each(function (i,e){
        if (i+1 == fridayRow.length){
            $(e).find(".fa-times-circle").removeClass("fa-times-circle").addClass("fa-plus-circle");
            $(e).find("span").removeClass("hour-delete-friday");
            $(e).find("span").addClass("hour-action-friday");
        }
    });
}, 2000);

setTimeout(()=>{
    let saturdayRow  = $(".saturday-hours");

    $(saturdayRow).each(function (i,e){
        if (i+1 == saturdayRow.length){
            $(e).find(".fa-times-circle").removeClass("fa-times-circle").addClass("fa-plus-circle");
            $(e).find("span").removeClass("hour-delete-saturday");
            $(e).find("span").addClass("hour-action-saturday");
        }
    });
}, 2000);


setTimeout(()=>{
    let sundayRow  = $(".sunday-hours");

    $(sundayRow).each(function (i,e){
        if (i+1 == sundayRow.length){
            $(e).find(".fa-times-circle").removeClass("fa-times-circle").addClass("fa-plus-circle");
            $(e).find("span").removeClass("hour-delete-sunday");
            $(e).find("span").addClass("hour-action-sunday");
        }
    });
}, 2000);









