const sendMailUrl ="/pageData/sendMessage";


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

$(document).on("click", "#sendMessage", function (){
    let subject = $("#subject").val();
    let content = $("#content").val();

    let body = {

        subject:subject,
        content:content

    }

    console.log(body);
    sendPostRequest("POST", sendMailUrl, body).then(
        data => {
            console.log(data);
            if(data == "0"){
                window.location.href = "/login";

            }else {
                window.location.reload();
            }
        }
    ).catch();

});







