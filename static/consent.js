$(document).ready(function () {
    localStorage.clear();
    var sona_id = window.location.href.split('=').pop()
    console.log(sona_id)
    $('input[type=radio][name=optradio]').change(function () {
        if (this.value == 'yes') {
            $("#participantFullName").removeAttr('disabled');
            $("#participantUid").removeAttr('disabled');
        }
        else if (this.value == 'no') {
            $("#uidError").hide()
            $("#uidValidError").hide()
            $("#nameError").hide()
            $("#participantFullName").attr('disabled', 'disabled');
            $("#participantUid").attr('disabled', 'disabled');
        }
    });

    $("#participantFullName").keyup(function (e) {
        if ($('#participantFullName').val().trim().length > 0) {
            $("#nameError").hide()
        }
        else {
            $("#nameError").show()
        }
        
    });

    $("#participantUid").keyup(function (e) {
        var uid = $('#participantUid').val().trim()
        if (uid.length > 0) {
            $("#uidError").hide()
            for (var i = 0; i < uid.length; i++) {
                if ((uid.charCodeAt(i) >= 97 && uid.charCodeAt(i) <= 122)||(uid.charCodeAt(i) >= 65 && uid.charCodeAt(i) <= 90)||(uid.charCodeAt(i) >= 48 && uid.charCodeAt(i) <= 57)) {
                        $("#uidValidError").hide()
                    }
                else {
                    $("#uidValidError").show() 
                    break;
                    }
            }
        
        }
        else {
            $("#uidError").show()
        }
        
        

    });

    $('#consentNext').click(function (e) {

        var name = $('#participantFullName').val().trim();
        var uid = $('#participantUid').val().trim();
        console.log("participant", $('#participantUid'))
        console.log("uid", uid)
        var isUidValid = false
        var isAllValid = false
        var option = $("input[type=radio][name=optradio]:checked").val()
        
        if (option == 'yes') {
            if (!isAllValid) {
                var isnameAvailable = false
                var isuidAvailable = false
                // Validating the Mturk Id if it is 14 digit alphanumeric 
                if (uid.length == 14)  {
                    for (var i = 0; i < uid.length; i++) {
                        if ((uid.charCodeAt(i) >=97 && uid.charCodeAt(i) <= 122)||(uid.charCodeAt(i) >= 65 && uid.charCodeAt(i) <= 90)||(uid.charCodeAt(i) >= 48 && uid.charCodeAt(i) <= 57)) {
                            isUidValid =  true
                        }
                        else {
                            isUidValid =  false;
                            break;
                        }
                    }
                }

                if (name.length == 0) {
                    $("#nameError").show()
                    isnameAvailable = false
                }
                else {
                    isnameAvailable = true
                }
                if (uid.length == 0) {
                    $("#uidError").show()
                    isuidAvailable = false
                }
                else {
                    isuidAvailable = true
                }
                if (isUidValid) {
                    $("#uidValidError").hide()
                }
                else {
                    $("#uidValidError").show()
                }

                if (isnameAvailable && isuidAvailable && isUidValid) {
                    isAllValid = true
                }

            }
        }
        else {
            alert("Thank you for your visit");
            location.reload(true);
        }

        if (isAllValid) {
            var option = $("input[type=radio][name=optradio]:checked").val()
            
            if (option == 'yes') {
                $.ajax({
                    url: '/getSession',
                    data: {
                        'name': name,
                        'uid': uid,
                        //'sonaid': window.location.href.split('=').pop()
                        'sonaid': '0000'
                    },
                    type: 'GET',
                    success: function (response) {
                        console.log(response)
                        if (response['condition'] == 0) {
                            alert("Contact Administrator. Resetting the limit is required")
                        }
                        else if (response['sessionId'] == 0) {
                            alert("You are allowed to take the study only once. If you feel this is in error, then contact your professor.")
                        }
                        else {
                            localStorage.setItem("sessionId", response['sessionId']);
                            localStorage.setItem("condition", response['condition']);
                            //localStorage.setItem("sona_id", window.location.href.split('=').pop())
                            localStorage.setItem("sona_id", '0000')
                            localStorage.setItem("uid", response['uid'])
                            window.location.replace(window.location.href.split('?')[0] + response['condition'])
                            
                        }
                    },
                    error: function (response) {

                    }
                });
            }
            else {
                alert("Thank you")
            }

        }

    });
});
