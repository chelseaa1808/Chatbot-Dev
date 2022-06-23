var jsonData = ''
var condition = 'HHHC'
var tutorialMsgs = []
var triggerEnterKeyEvent = true
var sessionDictData = {}
var currentClue = {}
var isPersonFirst = false
var isPersonClicked = false
var isRolesFirst = false
var isRolesClicked = false
var isHoursFirst = false
var isHoursClicked = false
var isPerson5Data = [
    ['bot', condition , 'Knock Knock'],
    ['user', condition, 'who is there?'],
    ['bot', condition, 'Déja'],
    ['user', condition, 'Déja who?'],
    ['bot', condition, 'Knock Knock'],
    ['bot', condition, 'Ok, enough comedy. On to more serious matters. '],
    ['bot', condition, 'Specific information for 4 personnel is available. Select the team member for which information is requested.']
]
var isRoles5Data = [
    ['user', condition, 'Yes?'],
    ['bot', condition, 'Do you know why the project manager crossed the road? '],
    ['user', condition, 'Why?'],
    ['bot', condition, 'Because the client refused to meet her halfway 😃😃😃'],
    ['bot', condition, 'haha – am I not the funniest? '],
    ['bot', condition, 'Specific information for 4 of the project roles is available. Select the position for which information is requested.']
]
var isHours5Data = [
    ['user', condition, 'Yes?'],
    ['bot', condition, 'Do you know why I am your project AI now?  '],
    ['user', condition, 'Why?'],
    ['bot', condition, 'because, I was fired from the clock-making factory after all the extra hours I put in. 😜😃'],
    ['bot', condition, 'Specific information for 4 of the Number of hours is available. Select the branch for which information is requested.']
]

var isPerson5DataIndex = 0;
var isRoles5DataIndex = 0;
var isHours5DataIndex = 0;
$(document).ready(function () {
    //alert(localStorage.getItem("sessionId"))

    //window.onbeforeunload = function (event) {
    //    return confirm("Confirm refresh");
    //};

    //console.log(window.location.href.split('/').pop())

    if (localStorage.getItem("sessionId") == "" || localStorage.getItem("sessionId") == null ||
        localStorage.getItem("condition") == "" || localStorage.getItem("condition") == null
        ) {
        window.location.replace(window.location.origin)
    }
    else {

        $("#bgStorySetupModal").modal()
        initialDataSetup();
    }

    function initialDataSetup() {
        var conditionDict = {
            1: "HHH",
            2: "HLH",
            3: "LHH",
            4: "LLH",
            5: "HHHC",
            6: "HHLC",
            7: "NHHC",
            8: "NHLC"
        }
        ////console.log(window.location.href.split('/'))
        var condition = window.location.href.split('/').pop()
        ////console.log(conditionDict[condition])
        $('#condition').val(conditionDict[condition])
        onloadSetup();
    }


    function onloadSetup() {
        if (!$.trim($('#chatDiv').html()).length) {

            $('#topic').val('Introduction');
            $('#index').val('0');
            $('#sessionId').val(localStorage.getItem("sessionId"));
            $.ajax({
                url: '/getResponse',
                data: {
                    'sessionId': $('#sessionId').val(),
                    'condition': $('#condition').val(),
                    'topic': $('#topic').val(),
                    'index': $('#index').val(),
                    'response': '',
                    'timeTaken': '',
                    'gridAction': '',
                },
                type: 'GET',
                success: function (response) {
                    $('#topic').val(response["topic"]);
                    $('#index').val(response["index"]);
                    $('#condition').val(response["condition"]);
                    $('#sessionId').val(response["sessionId"]);
                    addThinking('bot', response["condition"])
                    var message = response["botResponse"];


                    if (response['condition'][1] == 'H' && response['topic'] == 'Introduction' && response['index'] == "1") {
                        message = message + "<br/>For the next steps, please take your time to read the information I provide you. When you are done, press enter key or click on 'next' button, and I will move on"


                    }



                    $("#nextButton").attr("disabled", true);
                    setTimeout(function () {
                        $('#bot_thinking').remove();
                        addMessage('bot', response["condition"], message)
                    }, 1000);

                    $("#nextButton").attr("disabled", false);


                   //$('#topic').val('Task Reminder')
                    //$('#index').val("0")

                }
            });


            // $("#nextButton").click(function (e) {
            //     triggerEnterKeyEvent = false;
            //     if (((isPersonFirst) && $('#condition').val() == 'HHHC' || (isPersonFirst) && $('#condition').val() == 'HHLC') && isPerson5DataIndex < isPerson5Data.length && isPersonClicked) {
            //         console.log('herer')
            //         addMessage(isPerson5Data[isPerson5DataIndex][0], isPerson5Data[isPerson5DataIndex][1], isPerson5Data[isPerson5DataIndex][2])
            //         isPerson5DataIndex = isPerson5DataIndex + 1;
            //         if (isPerson5DataIndex === isPerson5Data.length) {
            //             var navItems = []
            //             navItems = ["Alex", "Leon", "Rachel", "Tina"]
            //             userActionBlock = buildUserActionButtonGroup(navItems, condition, 'person')
            //             addActionBlock(userActionBlock)
            //             isPersonFirst = false;
            //         }
            //     } else {
            //         isPerson5DataIndex = 0;
            //         isPersonFirst = false;
            //         getDataEvent();
            //     }
            // });

            $("#nextButton").click(function (e) {
                triggerEnterKeyEvent = false;
                if (((isPersonFirst) && $('#condition').val() == 'HHHC' || (isPersonFirst) && $('#condition').val() == 'HHLC') && isPerson5DataIndex < isPerson5Data.length && isPersonClicked) {
                    console.log('herer')
                    addMessage(isPerson5Data[isPerson5DataIndex][0], isPerson5Data[isPerson5DataIndex][1], isPerson5Data[isPerson5DataIndex][2])
                    isPerson5DataIndex = isPerson5DataIndex + 1;
                    if (isPerson5DataIndex === isPerson5Data.length) {
                        var navItems = []
                        navItems = ["Alex", "Leon", "Rachel", "Tina"]
                        userActionBlock = buildUserActionButtonGroup(navItems, condition, 'person')
                        addActionBlock(userActionBlock)
                        isPersonFirst = false;
                    }
                }
				else if (((isRolesFirst) && $('#condition').val() == 'HHHC' || (isRolesFirst) && $('#condition').val() == 'HHLC') && isRoles5DataIndex < isRoles5Data.length && isRolesClicked) {
                    console.log('herer')
                    addMessage(isRoles5Data[isRoles5DataIndex][0], isRoles5Data[isRoles5DataIndex][1], isRoles5Data[isRoles5DataIndex][2])
                    isRoles5DataIndex = isRoles5DataIndex + 1;
                    if (isRoles5DataIndex === isRoles5Data.length) {
                        var navItems = []
                       navItems = ["Network <br /> Architect", "Systems <br /> Analyst", "Cybersecurity <br /> Specialist", "Database <br /> Administrator"]
                        userActionBlock = buildUserActionButtonGroup(navItems, condition, 'roles')
                        addActionBlock(userActionBlock)
                        isRolesFirst = false;
                    }
                } 
				else if (((isHoursFirst) && $('#condition').val() == 'HHHC' || (isHoursFirst) && $('#condition').val() == 'HHLC') && isHours5DataIndex < isHours5Data.length && isHoursClicked) {
                    console.log('herer')
                    addMessage(isHours5Data[isHours5DataIndex][0], isHours5Data[isHours5DataIndex][1], isHours5Data[isHours5DataIndex][2])
                    isHours5DataIndex = isHours5DataIndex + 1;
                    if (isHours5DataIndex === isHours5Data.length) {
                        var navItems = []
                        navItems = ["6", "8", "10", "12"]
                        userActionBlock = buildUserActionButtonGroup(navItems, condition, 'hours')
                        addActionBlock(userActionBlock)
                        isHoursFirst = false;
                    }
                } 
				else {
                    isPerson5DataIndex = 0;
                    isRoles5DataIndex = 0;
                    isHours5DataIndex = 0;
                    isPersonFirst = false;
                    isRolesFirst = false;
                    isHoursFirst = false;
                    getDataEvent();
                }
            });


            $(document.body).on("click", ".showNextClue", function () {
                var message = getButtonText('showNextClue')
                var element = document.getElementById("chatDiv");
                element.removeChild(element.childNodes[element.childNodes.length - 1]);
                addMessage('user', $("#condition").val(), message)
                if ($('#topic').val() != 'Redundant') {
                    triggerEnterKeyEvent = false;
                    getDataEvent();
                }
                else {
                    if (sessionDictData['All'].length == 0) {
                        if ($('#condition').val()[1] == 'H') {
                            redundantMessage('That is all of the information I am able to provide about the project assignments', false);
                        }
                        else {
                            redundantMessage('Status: All available information has been provided', false);
                        }

                    }
                    else {
                        redundantBlock($('#condition').val())
                    }
                }



            });

            //$(document.body).on("click", '.showClueExplanation', function () {
            //    var message = getButtonText('showClueExplanation')
            //    var element = document.getElementById("chatDiv");
            //    element.removeChild(element.childNodes[element.childNodes.length - 1]);

            //    addMessage('user', $("#condition").val(), message)

            //    redundantMessage(currentClue['explanation'], true, true)
            //});

            $(document.body).on('click', '.showMatrixGrid', function (event) {
                var message = getButtonText('showMatrixGrid')
                var element = document.getElementById("chatDiv");
                element.removeChild(element.childNodes[element.childNodes.length - 1]);
                addMessage('user', $("#condition").val(), message)
                $('#topic').val('Submit');
                $('#index').val("1");
                triggerEnterKeyEvent = false;
                getDataEvent();
                $("#nextButton").attr("disabled", false);
                $("#nextButton").show()

            });


            $(document.body).on('click', '.person', function (event) {
                var message = getButtonText('person')
                var element = document.getElementById("chatDiv");
                element.removeChild(element.childNodes[element.childNodes.length - 1]);
                addMessage('user', $("#condition").val(), message)
                //addMessage('bot', $("#condition").val(), 'Specific information for 4 personnel is available. Select the team member for which information is requested.');
                //var navItems = []
                //navItems = ["Alex", "Leon", "Rachel", "Tina"]
                //userActionBlock = buildUserActionButtonGroup(navItems, condition, 'person')
                // $('#topic').val('Person')
                // $('#index').val('0')
                if (!isPersonClicked) {
                    isPersonFirst = true    
                }
                isPerson5DataIndex = 0
                if (((isPersonFirst) && $('#condition').val() == 'HHHC' || (isPersonFirst) && $('#condition').val() == 'HHLC') && !isPersonClicked) {
                isPersonClicked = true
                $("#nextButton").attr("disabled", false);
                $("#nextButton").show();
                //getperson();
                // $("#nextButton").click(function (e) {
                //     triggerEnterKeyEvent = false;
                //     addMessage('bot', $("#condition").val(), 'Not so fast!');
                // });
                // $("#nextButton").click(function (e) {
                //     triggerEnterKeyEvent = false;
                //     addMessage('bot', $("#condition").val(), 'Not so fast!');
                // });
                addMessage('bot', $("#condition").val(), 'Not so fast!');
                
                }
                else {
                addMessage('bot', $("#condition").val(), 'Specific information for 4 personnel is available. Select the team member for which information is requested.');
                var navItems = []
                navItems = ["Alex", "Leon", "Rachel", "Tina"]
                userActionBlock = buildUserActionButtonGroup(navItems, condition, 'person')
                addActionBlock(userActionBlock)
                }
                // else{
                //     addActionBlock(userActionBlock)
                // }
                //addActionBlock(userActionBlock)

            });
        
            // function getperson() {
            //     if(i==1)
            //     {
            //     addMessage('bot', $("#condition").val(), 'Not so fast!');
            //     $("#nextButton").attr("disabled", false);
            //     $("#nextButton").show();
            //     }
            // };

            $(document.body).on('click', '.alex', function (event) {
                var message = getButtonText('alex')
                // if (isPersonFirst) {
                //     isPersonFirst = false;
                //     getDataEvent();
                //     $("#nextButton").attr("disabled", false);
                //     $("#nextButton").show();
                //     return
                // }
                var element = document.getElementById("chatDiv");
                element.removeChild(element.childNodes[element.childNodes.length - 1]);
                addMessage('user', $("#condition").val(), message)
                var dataList = sessionDictData['Alex'];
                if (dataList.length == 0) {
                    if ($('#condition').val()[1] == 'H') {
                        redundantMessage('I do not have any more information regarding that specific person.', true, true);
                    }
                    else {
                        redundantMessage('There is no more information available regarding specific personnel.', true, true);
                    }
                }
                //else if (sessionDictData['All'].length == 0) {
                //    redundantMessage('Status: All available information has been provided',true);
                //    $('#topic').val("Submit")
                //    $('#index').val("1")
                //    triggerEnterKeyEvent = false;
                //    getDataEvent();


                //    $("#nextButton").attr("disabled", true);
                //    $("#nextButton").hide()
                //}
                else {
                    var allList = sessionDictData['All']
                    var id = dataList.shift()
                    var isUsed = false
                    while (!isUsed) {
                        if (allList.indexOf(id) > -1) {
                            $.ajax({
                                url: '/getRedundantClueById',
                                data: {
                                    'id': id
                                },
                                type: 'GET',
                                success: function (response) {

                                    var message = response["clue"];
                                    currentClue = message
                                    redundantMessage(message['clue'],true)
                                }
                            });

                            allList.splice(allList.indexOf(id), 1)
                            sessionDictData['All'] = allList
                            ////console.log(sessionDictData)
                            sessionDictData['Alex'] = dataList
                            isUsed = true
                        }
                        else {
                            if (dataList.length != 0) {
                                var id = dataList.shift()
                                isused = false
                            }
                            else {
                                isused = true
                                if ($('#condition').val()[1] == 'H') {
                                    redundantMessage('I do not have any more information regarding that specific person.', true, true);
                                }
                                else {
                                    redundantMessage('There is no more information available regarding specific personnel.', true, true);
                                }
                            }
                        }
                    }
                }


            });

            $(document.body).on('click', '.leon', function (event) {
                var message = getButtonText('leon')
                var element = document.getElementById("chatDiv");
                element.removeChild(element.childNodes[element.childNodes.length - 1]);
                addMessage('user', $("#condition").val(), message)
                var dataList = sessionDictData['Leon'];
                if (dataList.length == 0) {
                    if ($('#condition').val()[1] == 'H') {
                        redundantMessage('I do not have any more information regarding that specific person.', true, true);
                    }
                    else {
                        redundantMessage('There is no more information available regarding specific personnel.', true, true);
                    }
                }
                //else if (sessionDictData['All'].length == 0) {
                //    redundantMessage('Status: All available information has been provided',true);
                //    $('#topic').val("Redundant")
                //    $('#index').val("22")
                //    triggerEnterKeyEvent = false;
                //    getDataEvent();
                //}
                else {
                    var allList = sessionDictData['All']
                    var id = dataList.shift()
                    var isUsed = false
                    while (!isUsed) {
                        if (allList.indexOf(id) > -1) {
                            $.ajax({
                                url: '/getRedundantClueById',
                                data: {
                                    'id': id
                                },
                                type: 'GET',
                                success: function (response) {

                                    var message = response["clue"];
                                    currentClue = message
                                    redundantMessage(message['clue'],true)
                                }
                            });
                            var allList = sessionDictData['All']
                            allList.splice(allList.indexOf(id), 1)
                            sessionDictData['All'] = allList
                            //////console.log(sessionDictData)
                            sessionDictData['Leon'] = dataList
                            isUsed = true
                        }
                        else {
                            if (dataList.length != 0) {
                                var id = dataList.shift()
                                isused = false
                            }
                            else {
                                isused = true
                                if ($('#condition').val()[1] == 'H') {
                                    redundantMessage('I do not have any more information regarding that specific person.', true, true);
                                }
                                else {
                                    redundantMessage('There is no more information available regarding specific personnel.', true, true);
                                }
                            }
                        }
                    }
                }
            });

            $(document.body).on('click', '.rachel', function (event) {
                var message = getButtonText('rachel')
                var element = document.getElementById("chatDiv");
                element.removeChild(element.childNodes[element.childNodes.length - 1]);
                addMessage('user', $("#condition").val(), message)
                var dataList = sessionDictData['Rachel'];
                if (dataList.length == 0) {
                    if ($('#condition').val()[1] == 'H') {
                        redundantMessage('I do not have any more information regarding that specific person.', true, true);
                    }
                    else {
                        redundantMessage('There is no more information available regarding specific personnel.', true, true);
                    }
                }
                //else if (sessionDictData['All'].length == 0) {
                //    redundantMessage('Status: All available information has been provided',true);
                //    $('#topic').val("Redundant")
                //    $('#index').val("22")
                //    triggerEnterKeyEvent = false;
                //    getDataEvent();
                //}
                else {
                    var allList = sessionDictData['All']
                    var id = dataList.shift()
                    var isUsed = false
                    while (!isUsed) {
                        if (allList.indexOf(id) > -1) {
                            $.ajax({
                                url: '/getRedundantClueById',
                                data: {
                                    'id': id
                                },
                                type: 'GET',
                                success: function (response) {

                                    var message = response["clue"];
                                    currentClue = message
                                    redundantMessage(message['clue'],true)
                                }
                            });
                            var allList = sessionDictData['All']
                            allList.splice(allList.indexOf(id), 1)
                            sessionDictData['All'] = allList
                            ////console.log(sessionDictData)
                            sessionDictData['Rachel'] = dataList
                            isUsed = true
                        }
                        else {
                            if (dataList.length != 0) {
                                var id = dataList.shift()
                                isused = false
                            }
                            else {
                                isused = true
                                if ($('#condition').val()[1] == 'H') {
                                    redundantMessage('I do not have any more information regarding that specific person.', true, true);
                                }
                                else {
                                    redundantMessage('There is no more information available regarding specific personnel.', true, true);
                                }
                            }
                        }
                    }
                }
            });

            $(document.body).on('click', '.tina', function (event) {
                var message = getButtonText('tina')
                var element = document.getElementById("chatDiv");
                element.removeChild(element.childNodes[element.childNodes.length - 1]);
                addMessage('user', $("#condition").val(), message)
                var dataList = sessionDictData['Tina'];
                if (dataList.length == 0) {
                    if ($('#condition').val()[1] == 'H') {
                        redundantMessage('I do not have any more information regarding that specific person.', true, true);
                    }
                    else {
                        redundantMessage('There is no more information available regarding specific personnel.', true, true);
                    }
                }
                //else if (sessionDictData['All'].length == 0) {
                //    redundantMessage('Status: All available information has been provided',true);
                //    $('#topic').val("Redundant")
                //    $('#index').val("22")
                //    triggerEnterKeyEvent = false;
                //    getDataEvent();
                //}
                else {
                    var allList = sessionDictData['All']
                    var id = dataList.shift()
                    var isUsed = false
                    while (!isUsed) {
                        if (allList.indexOf(id) > -1) {
                            $.ajax({
                                url: '/getRedundantClueById',
                                data: {
                                    'id': id
                                },
                                type: 'GET',
                                success: function (response) {

                                    var message = response["clue"];
                                    currentClue = message
                                    redundantMessage(message['clue'],true)
                                }
                            });
                            var allList = sessionDictData['All']
                            allList.splice(allList.indexOf(id), 1)
                            sessionDictData['All'] = allList
                            ////console.log(sessionDictData)
                            sessionDictData['Tina'] = dataList
                            isUsed = true
                        }
                        else {
                            if (dataList.length != 0) {
                                var id = dataList.shift()
                                isused = false
                            }
                            else {
                                isused = true
                                if ($('#condition').val()[1] == 'H') {
                                    redundantMessage('I do not have any more information regarding that specific person.', true, true);
                                }
                                else {
                                    redundantMessage('There is no more information available regarding specific personnel.', true, true);
                                }
                            }
                        }
                    }
                }
            });

            // $(document.body).on('click', '.roles', function (event) {
            //     var message = getButtonText('roles')
            //     var element = document.getElementById("chatDiv");
            //     element.removeChild(element.childNodes[element.childNodes.length - 1]);
            //     addMessage('user', $("#condition").val(), message)
            //     addMessage('bot', $("#condition").val(), 'Specific information for 4 of the project roles is available. Select the position for which information is requested.');
            //     var navItems = []
            //     navItems = ["Network <br /> Architect", "Systems <br /> Analyst", "Cybersecurity <br /> Specialist", "Database <br /> Administrator"]
            //     userActionBlock = buildUserActionButtonGroup(navItems, condition, 'roles')
            //     if ((isRolesFirst) && $('#condition').val() == 'HHHC' || (isRolesFirst) && $('#condition').val() == 'HHLC') 
            //     {
            //       isRolesFirst = false;
            //     addMessage('bot', $("#condition").val(), 'Before I give you a clue, I have a question. ');
            //     addMessage('user', $("#condition").val(), 'Yes?')
            //     addMessage('bot', $("#condition").val(), 'Do you know why the project manager crossed the road? '); 
            //     addMessage('user', $("#condition").val(), 'Why?')
            //     addMessage('bot', $("#condition").val(), 'Because the client refused to meet her halfway 😃😃😃');
            //     addMessage('bot', $("#condition").val(), 'haha – am I not the funniest?  ');
            //     }
            //     addActionBlock(userActionBlock)
            // });

            $(document.body).on('click', '.roles', function (event) {
                var message = getButtonText('roles')
                var element = document.getElementById("chatDiv");
                element.removeChild(element.childNodes[element.childNodes.length - 1]);
                addMessage('user', $("#condition").val(), message)
				
				if (!isRolesClicked) {
                    isRolesFirst = true    
                }
                isRoles5DataIndex = 0
                
                if (((isRolesFirst) && $('#condition').val() == 'HHHC' || (isRolesFirst) && $('#condition').val() == 'HHLC') && !isRolesClicked)
                {
                    isRolesClicked = true;
                  $("#nextButton").attr("disabled", false);
                  $("#nextButton").show();
                addMessage('bot', $("#condition").val(), 'Before I give you a clue, I have a question. ');
                
                }
				else{
				addMessage('bot', $("#condition").val(), 'Specific information for 4 of the project roles is available. Select the position for which information is requested.');
                var navItems = []
                navItems = ["Network <br /> Architect", "Systems <br /> Analyst", "Cybersecurity <br /> Specialist", "Database <br /> Administrator"]
                userActionBlock = buildUserActionButtonGroup(navItems, condition, 'roles')
                addActionBlock(userActionBlock)
				}
            });

            $(document.body).on('click', '.networkArchitect', function (event) {
                var message = getButtonText('networkArchitect')
                var element = document.getElementById("chatDiv");
                element.removeChild(element.childNodes[element.childNodes.length - 1]);
                addMessage('user', $("#condition").val(), message)
                var dataList = sessionDictData['Network Architect'];
                if (dataList.length == 0) {
                    if ($('#condition').val()[1] == 'H') {
                        redundantMessage('I do not have any more information regarding that specific role.', true, true);
                    }
                    else {
                        redundantMessage('There is no more information available regarding specific role.', true, true);
                    }
                }
                //else if (sessionDictData['All'].length == 0) {
                //    redundantMessage('Status: All available information has been provided',true);
                //    $('#topic').val("Redundant")
                //    $('#index').val("22")
                //    triggerEnterKeyEvent = false;
                //    getDataEvent();
                //}
                else {
                    var allList = sessionDictData['All']
                    var id = dataList.shift()
                    var isUsed = false
                    while (!isUsed) {
                        if (allList.indexOf(id) > -1) {
                            $.ajax({
                                url: '/getRedundantClueById',
                                data: {
                                    'id': id
                                },
                                type: 'GET',
                                success: function (response) {

                                    var message = response["clue"];
                                    currentClue = message
                                    redundantMessage(message['clue'],true)
                                }
                            });
                            var allList = sessionDictData['All']
                            allList.splice(allList.indexOf(id), 1)
                            sessionDictData['All'] = allList
                            ////console.log(sessionDictData)
                            sessionDictData['Network Architect'] = dataList
                            isUsed = true
                        }
                        else {
                            if (dataList.length != 0) {
                                var id = dataList.shift()
                                isused = false
                            }
                            else {
                                isused = true
                                if ($('#condition').val()[1] == 'H') {
                                    redundantMessage('I do not have any more information regarding that specific role.', true, true);
                                }
                                else {
                                    redundantMessage('There is no more information available regarding specific role.', true, true);
                                }
                            }
                        }
                    }
                }
            });

            $(document.body).on('click', '.systemsAnalyst', function (event) {
                var message = getButtonText('systemsAnalyst')
                var element = document.getElementById("chatDiv");
                element.removeChild(element.childNodes[element.childNodes.length - 1]);
                addMessage('user', $("#condition").val(), message)
                var dataList = sessionDictData['Systems Analyst'];
                if (dataList.length == 0) {
                    if ($('#condition').val()[1] == 'H') {
                        redundantMessage('I do not have any more information regarding that specific role.', true, true);
                    }
                    else {
                        redundantMessage('There is no more information available regarding specific role.', true, true);
                    }
                }
                //else if (sessionDictData['All'].length == 0) {
                //    redundantMessage('Status: All available information has been provided',true);
                //    $('#topic').val("Redundant")
                //    $('#index').val("22")
                //    triggerEnterKeyEvent = false;
                //    getDataEvent();
                //}
                else {
                    var allList = sessionDictData['All']
                    var id = dataList.shift()
                    var isUsed = false
                    while (!isUsed) {
                        if (allList.indexOf(id) > -1) {
                            $.ajax({
                                url: '/getRedundantClueById',
                                data: {
                                    'id': id
                                },
                                type: 'GET',
                                success: function (response) {

                                    var message = response["clue"];
                                    currentClue = message
                                    redundantMessage(message['clue'],true)
                                }
                            });
                            var allList = sessionDictData['All']
                            allList.splice(allList.indexOf(id), 1)
                            sessionDictData['All'] = allList
                            ////console.log(sessionDictData)
                            sessionDictData['Systems Analyst'] = dataList
                            isUsed = true
                        }
                        else {
                            if (dataList.length != 0) {
                                var id = dataList.shift()
                                isused = false
                            }
                            else {
                                isused = true
                                if ($('#condition').val()[1] == 'H') {
                                    redundantMessage('I do not have any more information regarding that specific role.', true, true);
                                }
                                else {
                                    redundantMessage('There is no more information available regarding specific role.', true, true);
                                }
                            }
                        }
                    }
                }
            });

            $(document.body).on('click', '.cyberSpecialist', function (event) {
                var message = getButtonText('cyberSpecialist')
                var element = document.getElementById("chatDiv");
                element.removeChild(element.childNodes[element.childNodes.length - 1]);
                addMessage('user', $("#condition").val(), message)
                var dataList = sessionDictData['Cybersecurity Specialist'];
                if (dataList.length == 0) {
                    if ($('#condition').val()[1] == 'H') {
                        redundantMessage('I do not have any more information regarding that specific role.', true, true);
                    }
                    else {
                        redundantMessage('There is no more information available regarding specific role.', true, true);
                    }
                }
                //else if (sessionDictData['All'].length == 0) {
                //    redundantMessage('Status: All available information has been provided',true);
                //    $('#topic').val("Redundant")
                //    $('#index').val("22")
                //    triggerEnterKeyEvent = false;
                //    getDataEvent();
                //}
                else {
                    var allList = sessionDictData['All']
                    var id = dataList.shift()
                    var isUsed = false
                    while (!isUsed) {
                        if (allList.indexOf(id) > -1) {
                            $.ajax({
                                url: '/getRedundantClueById',
                                data: {
                                    'id': id
                                },
                                type: 'GET',
                                success: function (response) {

                                    var message = response["clue"];
                                    currentClue = message
                                    redundantMessage(message['clue'],true)
                                }
                            });
                            var allList = sessionDictData['All']
                            allList.splice(allList.indexOf(id), 1)
                            sessionDictData['All'] = allList
                            ////console.log(sessionDictData)
                            sessionDictData['Cybersecurity Specialist'] = dataList
                            isUsed = true
                        }
                        else {
                            if (dataList.length != 0) {
                                var id = dataList.shift()
                                isused = false
                            }
                            else {
                                isused = true
                                if ($('#condition').val()[1] == 'H') {
                                    redundantMessage('I do not have any more information regarding that specific role.', true, true);
                                }
                                else {
                                    redundantMessage('There is no more information available regarding specific role.', true, true);
                                }
                            }
                        }
                    }

                }
            });

            $(document.body).on('click', '.databaseAdmin', function (event) {
                var message = getButtonText('databaseAdmin')
                var element = document.getElementById("chatDiv");
                element.removeChild(element.childNodes[element.childNodes.length - 1]);
                addMessage('user', $("#condition").val(), message)
                var dataList = sessionDictData['Database Administrator'];
                if (dataList.length == 0) {
                    if ($('#condition').val()[1] == 'H') {
                        redundantMessage('I do not have any more information regarding that specific role.', true, true);
                    }
                    else {
                        redundantMessage('There is no more information available regarding specific role.', true, true);
                    }
                }
                //else if (sessionDictData['All'].length == 0) {
                //    redundantMessage('Status: All available information has been provided',true);
                //    $('#topic').val("Redundant")
                //    $('#index').val("22")
                //    triggerEnterKeyEvent = false;
                //    getDataEvent();
                //}
                else {
                    var allList = sessionDictData['All']
                    var id = dataList.shift()
                    var isUsed = false
                    while (!isUsed) {
                        if (allList.indexOf(id) > -1) {
                            $.ajax({
                                url: '/getRedundantClueById',
                                data: {
                                    'id': id
                                },
                                type: 'GET',
                                success: function (response) {

                                    var message = response["clue"];
                                    currentClue = message
                                    redundantMessage(message['clue'],true)
                                }
                            });
                            var allList = sessionDictData['All']
                            allList.splice(allList.indexOf(id), 1)
                            sessionDictData['All'] = allList
                            ////console.log(sessionDictData)
                            sessionDictData['Database Administrator'] = dataList
                            isUsed = true
                        }
                        else {
                            if (dataList.length != 0) {
                                var id = dataList.shift()
                                isused = false
                            }
                            else {
                                isused = true
                                if ($('#condition').val()[1] == 'H') {
                                    redundantMessage('I do not have any more information regarding that specific role.', true, true);
                                }
                                else {
                                    redundantMessage('There is no more information available regarding specific role.', true, true);
                                }
                            }
                        }
                    }
                }
            });

            // $(document.body).on('click', '.hours', function (event) {
            //     var message = getButtonText('hours')
            //     var element = document.getElementById("chatDiv");
            //     element.removeChild(element.childNodes[element.childNodes.length - 1]);
            //     addMessage('user', $("#condition").val(), message)
            //     addMessage('bot', $("#condition").val(), 'Specific information for 4 of the Number of hours is available. Select the branch for which information is requested.');
            //     var navItems = []
            //     navItems = ["6", "8", "10", "12"]
            //     userActionBlock = buildUserActionButtonGroup(navItems, condition, 'hours')
            //     if ((isHoursFirst) && $('#condition').val() == 'HHHC' || (isHoursFirst) && $('#condition').val() == 'HHLC') 
            //     {
            //         isHoursFirst = false;
            //     addMessage('bot', $("#condition").val(), 'Wait a moment – do you have time for a brief diversion?');
            //     addMessage('user', $("#condition").val(), 'Yes?')
            //     addMessage('bot', $("#condition").val(), 'Do you know why I am your project AI now?  '); 
            //     addMessage('user', $("#condition").val(), 'Why?')
            //     addMessage('bot', $("#condition").val(), 'because, I was fired from the clock-making factory after all the extra hours I put in. 😢😜');
            //     }
            //     addActionBlock(userActionBlock)
            // });
            $(document.body).on('click', '.hours', function (event) {
                var message = getButtonText('hours')
                var element = document.getElementById("chatDiv");
                element.removeChild(element.childNodes[element.childNodes.length - 1]);
                addMessage('user', $("#condition").val(), message)
				
				if (!isHoursClicked) {
                    isHoursFirst = true    
                }
                isPerson5DataIndex = 0
              
                if (((isHoursFirst) && $('#condition').val() == 'HHHC' || (isHoursFirst) && $('#condition').val() == 'HHLC') && !isHoursClicked)
                {
                 isHoursClicked = true;
				 $("#nextButton").attr("disabled", false);
                $("#nextButton").show();
                addMessage('bot', $("#condition").val(), 'Wait a moment – do you have time for a brief diversion?');
               
                }
				else{
				addMessage('bot', $("#condition").val(), 'Specific information for 4 of the Number of hours is available. Select the branch for which information is requested.');
                var navItems = []
                navItems = ["6", "8", "10", "12"]
                userActionBlock = buildUserActionButtonGroup(navItems, condition, 'hours')
                addActionBlock(userActionBlock)
				}
            });

            $(document.body).on('click', '.six', function (event) {
                var message = getButtonText('six')
                var element = document.getElementById("chatDiv");
                element.removeChild(element.childNodes[element.childNodes.length - 1]);
                addMessage('user', $("#condition").val(), message)
                var dataList = sessionDictData['Six'];
                if (dataList.length == 0) {
                    if ($('#condition').val()[1] == 'H') {
                        redundantMessage('I do not have any more information regarding that specific hour.', true, true);
                    }
                    else {
                        redundantMessage('There is no more information available regarding specific hour.', true, true);
                    }
                }
                //else if (sessionDictData['All'].length == 0) {
                //    redundantMessage('Status: All available information has been provided',true);
                //    $('#topic').val("Redundant")
                //    $('#index').val("22")
                //    triggerEnterKeyEvent = false;
                //    getDataEvent();
                //}
                else {
                    var allList = sessionDictData['All']
                    var id = dataList.shift()
                    var isUsed = false
                    while (!isUsed) {
                        if (allList.indexOf(id) > -1) {
                            $.ajax({
                                url: '/getRedundantClueById',
                                data: {
                                    'id': id
                                },
                                type: 'GET',
                                success: function (response) {

                                    var message = response["clue"];
                                    currentClue = message
                                    redundantMessage(message['clue'],true)
                                }
                            });
                            var allList = sessionDictData['All']
                            allList.splice(allList.indexOf(id), 1)
                            sessionDictData['All'] = allList
                            ////console.log(sessionDictData)
                            sessionDictData['Six'] = dataList
                            isUsed = true
                        }
                        else {
                            if (dataList.length != 0) {
                                var id = dataList.shift()
                                isused = false
                            }
                            else {
                                isused = true
                                if ($('#condition').val()[1] == 'H') {
                                    redundantMessage('I do not have any more information regarding that specific hour.', true, true);
                                }
                                else {
                                    redundantMessage('There is no more information available regarding specific hour.', true, true);
                                }
                            }
                        }
                    }
                }
            });

            $(document.body).on('click', '.eight', function (event) {
                var message = getButtonText('eight')
                var element = document.getElementById("chatDiv");
                element.removeChild(element.childNodes[element.childNodes.length - 1]);
                addMessage('user', $("#condition").val(), message)
                var dataList = sessionDictData['Eight'];
                if (dataList.length == 0) {
                    if ($('#condition').val()[1] == 'H') {
                        redundantMessage('I do not have any more information regarding that specific hour.', true, true);
                    }
                    else {
                        redundantMessage('There is no more information available regarding specific hour.', true, true);
                    }
                }
                //else if (sessionDictData['All'].length == 0) {
                //    redundantMessage('Status: All available information has been provided',true);
                //    $('#topic').val("Redundant")
                //    $('#index').val("22")
                //    triggerEnterKeyEvent = false;
                //    getDataEvent();
                //}
                else {
                    var allList = sessionDictData['All']
                    var id = dataList.shift()
                    var isUsed = false
                    while (!isUsed) {
                        if (allList.indexOf(id) > -1) {
                            $.ajax({
                                url: '/getRedundantClueById',
                                data: {
                                    'id': id
                                },
                                type: 'GET',
                                success: function (response) {

                                    var message = response["clue"];
                                    currentClue = message
                                    redundantMessage(message['clue'],true)
                                }
                            });
                            var allList = sessionDictData['All']
                            allList.splice(allList.indexOf(id), 1)
                            sessionDictData['All'] = allList
                            ////console.log(sessionDictData)
                            sessionDictData['Eight'] = dataList
                            isUsed = true
                        }
                        else {
                            if (dataList.length != 0) {
                                var id = dataList.shift()
                                isused = false
                            }
                            else {
                                isused = true
                                if ($('#condition').val()[1] == 'H') {
                                    redundantMessage('I do not have any more information regarding that specific hour.', true, true);
                                }
                                else {
                                    redundantMessage('There is no more information available regarding specific hour.', true, true);
                                }
                            }
                        }
                    }
                }
            });

            $(document.body).on('click', '.ten', function (event) {
                var message = getButtonText('ten')
                var element = document.getElementById("chatDiv");
                element.removeChild(element.childNodes[element.childNodes.length - 1]);
                addMessage('user', $("#condition").val(), message)
                var dataList = sessionDictData['Ten'];
                if (dataList.length == 0) {
                    if ($('#condition').val()[1] == 'H') {
                        redundantMessage('I do not have any more information regarding that specific hour.', true, true);
                    }
                    else {
                        redundantMessage('There is no more information available regarding specific hour.', true, true);
                    }
                }
                //else if (sessionDictData['All'].length == 0) {
                //    redundantMessage('Status: All available information has been provided',true);
                //    $('#topic').val("Redundant")
                //    $('#index').val("22")
                //    triggerEnterKeyEvent = false;
                //    getDataEvent();
                //}
                else {
                    var allList = sessionDictData['All']
                    var id = dataList.shift()
                    var isUsed = false
                    while (!isUsed) {

                        if (allList.indexOf(id) > -1) {
                            $.ajax({
                                url: '/getRedundantClueById',
                                data: {
                                    'id': id
                                },
                                type: 'GET',
                                success: function (response) {

                                    var message = response["clue"];
                                    currentClue = message
                                    redundantMessage(message['clue'],true)
                                }
                            });
                            var allList = sessionDictData['All']
                            allList.splice(allList.indexOf(id), 1)
                            sessionDictData['All'] = allList
                            ////console.log(sessionDictData)
                            sessionDictData['Ten'] = dataList
                            isUsed = true
                        }
                        else {
                            if (dataList.length != 0) {
                                var id = dataList.shift()
                                isused = false
                            }
                            else {
                                isused = true
                                if ($('#condition').val()[1] == 'H') {
                                    redundantMessage('I do not have any more information regarding that specific hour.', true, true);
                                }
                                else {
                                    redundantMessage('There is no more information available regarding specific hour.', true, true);
                                }
                            }
                        }
                    }
                }
            });

            $(document.body).on('click', '.twelve', function (event) {
                var message = getButtonText('twelve')
                var element = document.getElementById("chatDiv");
                element.removeChild(element.childNodes[element.childNodes.length - 1]);
                addMessage('user', $("#condition").val(), message)
                var dataList = sessionDictData['Twelve'];
                if (dataList.length == 0) {
                    if ($('#condition').val()[1] == 'H') {
                        redundantMessage('I do not have any more information regarding that specific hour.', true, true);
                    }
                    else {
                        redundantMessage('There is no more information available regarding specific hour.', true, true);
                    }
                }
                //else if (sessionDictData['All'].length == 0) {
                //    redundantMessage('Status: All available information has been provided',true);
                //    $('#topic').val("Redundant")
                //    $('#index').val("22")
                //    triggerEnterKeyEvent = false;
                //    getDataEvent();
                //}
                else {
                    var allList = sessionDictData['All']

                    var id = dataList.shift()
                    var isUsed = false
                    while (!isUsed) {

                        if (allList.indexOf(id) > -1) {
                            $.ajax({
                                url: '/getRedundantClueById',
                                data: {
                                    'id': id
                                },
                                type: 'GET',
                                success: function (response) {

                                    var message = response["clue"];
                                    currentClue = message
                                    redundantMessage(message['clue'],true)
                                }
                            });
                            var allList = sessionDictData['All']
                            allList.splice(allList.indexOf(id), 1)
                            sessionDictData['All'] = allList
                            ////console.log(sessionDictData)
                            sessionDictData['Twelve'] = dataList
                            isUsed = true

                        }
                        else {
                            if (dataList.length != 0) {
                                var id = dataList.shift()
                                isused = false
                            }
                            else {
                                isused = true
                                if ($('#condition').val()[1] == 'H') {
                                    redundantMessage('I do not have any more information regarding that specific hour.', true, true);
                                }
                                else {
                                    redundantMessage('There is no more information available regarding specific hour.', true, true);
                                }
                            }
                        }
                    }
                }
            });


            $(document).keypress(function (e) {
                if (e.key === 'Enter' && triggerEnterKeyEvent) {
                    triggerEnterKeyEvent = false;

                    getDataEvent();

                }
            });


        }

        $('#userMessage').keyup(function (e) {
            if (e.key != 'Enter') {
                if ($("#user_thinking").length < 1) {
                    addThinking('user')
                }
            }
            else if (e.key === 'Enter' ) {
                if ($('#userMessage').val().trim().length > 0) {
                    triggerEnterKeyEvent = false;

                    getDataEvent();
                }
            }

            if ($('#userMessage').val().trim().length > 0) {
                $("#nextButton").attr("disabled", false);
                istriggerEnterKeyEventActive = true
                $('#userMessage').css('border-color', '#80bdff');
                $('#userMessage').css('box - shadow', '0 0 0 0.2rem rgba(0,123,255,.25)');
            }
            else {
                $('#userMessage').css('border-color', 'red');
                $('#userMessage').css('box - shadow', '0 0 0 0.2rem rgba(255,123,0,.25)');
            }

        })


        gridClick();
        gridSubmit();

    }

    function getButtonText(className) {
        var button = document.getElementsByClassName(className);
        var message = ''
        for (var i = 0; i < button[0].childNodes.length; i++) {
            if (button[0].childNodes[i].nodeName == '#text')
                message += button[0].childNodes[i].data
        }
        return message
    }

    function redundantMessage(message, isRepeat, explanationBlock = false) {
        //Made it false because in new mode there is no explanation block
        explanationBlock = false
        addThinking('bot', $('#condition').val())
        $("#nextButton").attr("disabled", true);
        setTimeout(function () {
            $('#bot_thinking').remove();
            addMessage('bot', $('#condition').val(), message)
            if (isRepeat) {
                //addMessage('bot', $('#condition').val(), 'Indicate if additional information is requested.')
                if ($('#condition').val()[1] == 'H') {
                    addMessage('bot', $('#condition').val(), 'Would you like to request information about something else?')
                }
                else {
                    addMessage('bot', $('#condition').val(), 'Is more information required ?')
                }
                var navItems = []
                navItems = ["Yes, I would like <br /> to request specific information.", "No, I'm ready to make <br /> my final decisions."]
                //if ($('#condition').val()[2] != 'H') {
                //    navItems = ["Yes, I would like <br /> to request specific information.", "No, I'm ready to make <br /> my final decisions."]
                //}
                //else {
                //    navItems = ["Yes, I would like <br /> to request specific information.", "Explain the rationale <br /> for this information." ,"No, I'm ready to make <br /> my final decisions."]
                //}
                if (explanationBlock) {
                    navItems = ["Yes, I would like <br /> to request specific information.", "No, I'm ready to make <br /> my final decisions."]
                }
                userActionBlock = buildUserActionButtonGroup(navItems, $('#condition').val(), 'askRedundant', explanationBlock)
                addActionBlock(userActionBlock)
            }
            else {
                $('#topic').val('Submit');
                $('#index').val("1");
                triggerEnterKeyEvent = false;
                getDataEvent();
                $("#nextButton").attr("disabled", false);
                $("#nextButton").show()
            }
        }, 1000);

        $("#nextButton").attr("disabled", false);


    }


    function getDataEvent() {
        istriggerEnterKeyEventActive = true
        isTaskCompleted = false
        $("#nextButton").attr("disabled", true);
        $('#user_thinking').remove();
        var timeTaken = 0.0
        if ($('#topic').val() == 'Clue' ) {
            var seconds = new Date().getTime() / 1000;
            timeTaken = seconds - parseInt($('#timeTaken').val());
        }
        $.ajax({
            url: '/getResponse',
            data: {
                'sessionId': $('#sessionId').val(),
                'condition': $('#condition').val(),
                'topic': $('#topic').val(),
                'index': $('#index').val(),
                'response': '',
                'timeTaken': timeTaken,
                'gridAction': $('#gridAction').val(),
            },
            type: 'GET',
            success: function (response) {
                $('#sessionId').val(response["sessionId"]);
                $('#condition').val(response["condition"]);
                $('#topic').val(response["topic"]);
                $('#index').val(response["index"]);
                $('#gridAction').val("");
                addThinking('bot', response["condition"])
                //$("#nextButton").attr("disabled", true);
                setTimeout(function () {
                    if (response['condition'][2] == 'H' || response['condition'][2] == 'L') {
                        if (response['topic'] == 'Tutorial' && response['index'] == '2') {
                            $('#clickableGrid').show()
                            $('#demoTable').show()
                        }
                    }
                    if (response['topic'] == 'Task Reminder' && response['index'] == '1') {
                        $('#clickableGrid').show()
                        $('#demoTable').hide()
                        $('#mainTable').show()
                    }
                        if (response['condition'][0] == 'L') {
                            fillLowConditionContent(response, istriggerEnterKeyEventActive, isTaskCompleted);
                        }
                        else if (response['condition'][0] == 'H' || response['condition'][0] == 'N') {

                            fillHighConditionContent(response, istriggerEnterKeyEventActive, isTaskCompleted);
                        }



                }, 1000);
                //////console.log("outside timeout")
                //$("#nextButton").attr("disabled", false);



            }
        });
    }

    function fillLowConditionContent(response, istriggerEnterKeyEventActive, isTaskCompleted) {
        $('#bot_thinking').remove();
        var message = '';

        if (response['topic'] == 'Clue') {
            response_dict = response["botResponse"][0]
            var clues = []
            var explanations = []
            for (var key in response_dict) {

                message += '<b>' + key.toString() + '. </b>' + response_dict[key]['clue'];
                //if (response['condition'][2] == 'H') {
                //    message += '<b>Explanation: </b>' + response_dict[key]['explanation'] + '<br/>';
                //}
                message += '<br/>'
                clues.push(response_dict[key]['clue']);
                //explanations.push(response_dict[key]['explanation']);


            }
            addMessage('bot', response["condition"], message);
        }
        else if (response['topic'] == 'Redundant') {
            response_dict = response["botResponse"][0]
            var clues = []
            var explanations = []
            for (var key in response_dict) {

                clues.push(response_dict[key]['clue']);
                //explanations.push(response_dict[key]['explanation']);
            }

            message = '';
            for (var clue in clues) {
                message += '<span style="font - weight: 900;">&bull; </span>' + clues[clue];
                //if (response['condition'][2] == 'H') {
                //    message += '<b>Explanation: </b>' + explanations[i] + '<br/>';
                //}
                message += '<br/>'
            }
            addMessage('bot', response["condition"], message);

            //message = '';
            //for (var i = 5; i < 10; i++) {
            //    message += '<span style="font - weight: 900;">&bull; </span>' + clues[i];
            //    //if (response['condition'][2] == 'H') {
            //    //    message += '<b>Explanation: </b>' + explanations[i] + '<br/>';
            //    //}
            //    message += '<br/>'
            //}
            //addMessage('bot', response["condition"], message);

            //message = '';
            //for (var i = 10; i < 15; i++) {
            //    message += '<span style="font - weight: 900;">&bull; </span>' + clues[i];
            //    //if (response['condition'][2] == 'H') {
            //    //    message += '<b>Explanation: </b>' + explanations[i] + '<br/>';
            //    //}
            //    message += '<br/>'
            //}
            //addMessage('bot', response["condition"], message);

            //message = '';
            //for (var i = 15; i < 20; i++) {
            //    message += '<span style="font - weight: 900;">&bull; </span>' + clues[i];
            //    //if (response['condition'][2] == 'H') {
            //    //    message += '<b>Explanation: </b>' + explanations[i] + '<br/>';
            //    //}
            //    message += '<br/>'
            //}
            //addMessage('bot', response["condition"], message);


            //message = '';
            //for (var i = 20; i < 25; i++) {
            //    message += '<span style="font - weight: 900;">&bull; </span>' + clues[i];
            //    //if (response['condition'][2] == 'H') {
            //    //    message += '<b>Explanation: </b>' + explanations[i] + '<br/>';
            //    //}
            //    message += '<br/>'
            //}
            //addMessage('bot', response["condition"], message);

            //message = '';
            //for (var i = 25; i < 27; i++) {
            //    message += '<span style="font - weight: 900;">&bull; </span>' + clues[i];
            //    //if (response['condition'][2] == 'H') {
            //    //    message += '<b>Explanation: </b>' + explanations[i] + '<br/>';
            //    //}
            //    message += '<br/>'
            //}
            //addMessage('bot', response["condition"], message);

            message = '';
        }
        else {

            message = response["botResponse"][0];
        }

        //if (response['topic'] == 'Tutorial') {
        //    $('#clickableGrid').css('display', 'inline-block');
        //}

        //////console.log(message)
        if (response['topic'] == 'Clue') {

            var seconds = new Date().getTime() / 1000;
            $('#timeTaken').val(seconds);
        }
        //console.log(response)
        if (response['topic'] == 'Clue' && response['index'] == "0") {

            $('#infoClueButton').show()
            var seconds = new Date().getTime() / 1000;
            $('#clueStartTimestamp').val(seconds);
        }

        if (response['topic'] == 'Submit' && response['index'] == "2") {
            message = message + '<br/><br/>'
            addMessage('bot', response["condition"], message);
            message = getMatrixHtml()

        }

        if (response['topic'] == 'Submit' && response['index'] == "3") {
            $("#submitButton").show();
            $("#nextButton").hide();
            $("#nextButton").attr("disabled", true);
            istriggerEnterKeyEventActive = false

        }

        if ((response['topic'] == 'Conclusion' && response['index'] == "2" && response['condition'][1] == 'H')
            || (response['topic'] == 'Conclusion' && response['index'] == "2" && response['condition'][1] == 'L')) {
            $("#submitButton").hide();
            $("#nextButton").hide();
            $("#nextButton").attr("disabled", true);
            istriggerEnterKeyEventActive = false;
            isTaskCompleted = true;
        }



        if (($('#condition').val() == 'HHHC' || $('#condition').val() == 'HHLC' || $('#condition').val() == 'HHH' || $('#condition').val() == 'LHH') && response["topic"] == 'Introduction' && response["index"] == "2") {
            $("#userMessage").show();
            $('#userMessage').focus()
            $('#userInputType').val("name")
            $("#nextButton").attr("disabled", true);
            istriggerEnterKeyEventActive = false

        }
        else if ($('#userInputType').val() == 'name') {
            message = message + ' ' + $('#userMessage').val();
            $('#userName').val($('#userMessage').val())
            addMessage('user', response["condition"], $('#userName').val())
            $("#userMessage").hide();
            $('#userInputType').val("");
        }
        else if (($('#condition').val() == 'HHHC') && response["topic"] == 'Tutorial' && response["index"] == "23" ||
        ($('#condition').val() == 'HHLC') && response["topic"] == 'Tutorial' && response["index"] == "23" ||
        ($('#condition').val() == 'HHH') && response["topic"] == 'Tutorial' && response["index"] == "21"  ||
         ($('#condition').val() == 'LHH') && response["topic"] == 'Tutorial' && response["index"] == "21"
            || ($('#condition').val() == 'NHHC') && response["topic"] == 'Conclusion' && response["index"] == "1"
            || ($('#condition').val() == 'LHH') && response["topic"] == 'Conclusion' && response["index"] == "1"
            || ($('#condition').val() == 'HHLC') && response["topic"] == 'Conclusion' && response["index"] == "1"
            || ($('#condition').val() == 'HHH') && response["topic"] == 'Conclusion' && response["index"] == "1") {
            var msgs = message.split("[Name]");
            message = msgs[0] + $('#userName').val() + msgs[1];

        }
        if (response['topic'] == 'Submit' && response['index'] == "2" ) {
            addMessage('full', response["condition"], message);
        }
        else if ((response['topic'] != 'Redundant') && (response['topic'] != 'Clue')) {
            addMessage('bot', response["condition"], message);
        }
        $("#nextButton").attr("disabled", false);
        if (istriggerEnterKeyEventActive) {
            triggerEnterKeyEvent = true;
        }
        else {
            triggerEnterKeyEvent = false;
        }
        if (isTaskCompleted) {

            //alert("Task Completed. Click OK. Page will refresh in 3 seconds")
            //window.setTimeout(function () { location.reload() }, 3000)
            let cond=Number(window.location.pathname.split("/")[1])
            if (cond<5){
            window.location.replace("https://usf.az1.qualtrics.com/jfe/form/SV_bjSxk2rNGebGUi9")}
            else{
                window.location.replace("https://www.google.com")
            }
            localStorage.clear()
        }


    }

    function fillHighConditionContent(response, istriggerEnterKeyEventActive, isTaskCompleted) {
        $('#bot_thinking').remove();
        var message = '';
        var userActionBlock = ''

        //if (response['topic'] == 'Clue') {
        //    console.log(response["botResponse"])
        //    var navItems = []

        //    triggerEnterKeyEvent = false
        //    $("#nextButton").attr("disabled", true);
        //    $("#nextButton").hide()
        //    navItems = ["Yes, I would <br /> like more information.", "No, I'm ready to make <br /> my final decisions."]
        //    //if (response['condition'][2] != 'H') {
        //    //    navItems = ["Yes, I would <br /> like more information.", "No, I'm ready to make <br /> my final decisions."]
        //    //}
        //    //else {
        //    //    navItems = ["Yes, I would <br /> like more information.", "I need more explanation <br /> for this information.", "No, I'm ready to make <br /> my final decisions."]
        //    //}
        //    userActionBlock = buildUserActionButtonGroup(navItems, response['condition'], 'clueSelection')
        //    message = response["botResponse"][0]['clue'];
        //    currentClue = response["botResponse"][0]

        //}
        if (response['topic'] == 'Clue') {
            //console.log(response["botResponse"])
            response_dict = response["botResponse"][0]
            for (var key in response_dict) {

                message += '<b>' + key.toString() + '. </b>' + response_dict[key]['clue'];
                message += '<br/>'
            }
            //addMessage('bot', response["condition"], message);
            $('#index').val('5');
            triggerEnterKeyEvent = true
        }
        else if (response['topic'] == 'Clue_End_Ins') {
            triggerEnterKeyEvent = true
            $("#nextButton").attr("disabled", false);
            $("#nextButton").show()
            message = response["botResponse"][0];
        }
        // else if (response['topic'] == 'Person' && response['index'] == '5' && response['condition'][0] == 'H') {
        //     triggerEnterKeyEvent = true
        //     var cls = '.' + message.toLowerCase();
        //     $(cls).click();
        // }
        else if (response['topic'] == 'Redundant_Ins' && response['index'] == '2' && response['condition'][0] == 'H') {
            var navItems = []
            navItems = ["Yes, I would like <br /> to request specific information.", "No, I'm ready to make <br /> my final decisions."]
            userActionBlock = buildUserActionButtonGroup(navItems, response['condition'], 'redundantConfirmation')
            message = response["botResponse"][0]
            triggerEnterKeyEvent = false
            $("#nextButton").attr("disabled", true);
            $("#nextButton").hide()
            istriggerEnterKeyEventActive = false
        }

        else if ((response['topic'] == 'Redundant_Ins' && response['index'] == '3' && response['condition'][1] == 'H')) {
            sessionDictData = redundantDictData();
            message = response["botResponse"][0]
            triggerEnterKeyEvent = true
            $("#nextButton").attr("disabled", false);
            $("#nextButton").show()
        }
        // Added by Chaitanya
        else if ((response['topic'] == 'Redundant_Ins' && response['index'] == '3' && response['condition'][0]=='H' && response['condition'][1]=='L' )) {
            sessionDictData = redundantDictData();
            message = response["botResponse"][0]
            triggerEnterKeyEvent = true
            $("#nextButton").attr("disabled", false);
            $("#nextButton").show()
        }

        else if (response['topic'] == 'Redundant_Ins' && response['index'] == '3'&& response['condition'][0] == 'N') {
            var navItems = []
            navItems = ["Yes, I would like <br /> to request specific information.", "No, I'm ready to make <br /> my final decisions."]
            userActionBlock = buildUserActionButtonGroup(navItems, response['condition'], 'redundantConfirmation')
            message = response["botResponse"][0]
            triggerEnterKeyEvent = false
            $("#nextButton").attr("disabled", true);
            $("#nextButton").hide()
            istriggerEnterKeyEventActive = false
        }
        else if ((response['topic'] == 'Redundant_Ins' && response['index'] == '4') ) {
            sessionDictData = redundantDictData();
            //console.log(sessionDictData)
            message = response["botResponse"][0]
            triggerEnterKeyEvent = true
            $("#nextButton").attr("disabled", false);
            $("#nextButton").show()
        }
        else if (response['topic'] == 'Redundant') {
            //redundantBlock(response['condition'])
        }

        else {
            message = response["botResponse"][0];
        }
        if (response['topic'] == 'Clue') {

            var seconds = new Date().getTime() / 1000;
            $('#timeTaken').val(seconds);
        }

        if (response['topic'] == 'Clue' && response['index'] == "1") {

            $('#infoClueButton').show()
            var seconds = new Date().getTime() / 1000;
            $('#clueStartTimestamp').val(seconds);
        }

        if (response['topic'] == 'Submit' && response['index'] == "2" && (response['condition'] == "HHHC" || response['condition'] =="NHHC")) {
            message = message + '<br/><br/>'
            addMessage('bot', response["condition"], message);
            message = getMatrixHtml()

        }

        if (response['topic'] == 'Submit' && response['index'] == "2" && (response['condition'] == "HHLC" || response['condition'] =="NHLC")) {
            message = message + '<br/><br/>'
            addMessage('bot', response["condition"], message);
            message = getMatrixHtml_lc()

        }

        if (response['topic'] == 'Submit' && response['index'] == "2" &&  (response['condition'] == "HHH" || response['condition'] =="HLH" || response['condition'] =="LHH" || response['condition'] =="LLH")) {// changed this response['condition'] == ("HHH" || "HLH" || "LHH" || "LLH")) {
            message = message + '<br/><br/>'
            addMessage('bot', response["condition"], message);
            message = getMatrixHtml()

        }

        if (response['topic'] == 'Submit' && response['index'] == "3") {
            $("#submitButton").show();
            $("#nextButton").hide();
            $("#nextButton").attr("disabled", true);
            istriggerEnterKeyEventActive = false

        }

        if ((response['topic'] == 'Conclusion' && response['index'] == "2" && response['condition'][1] == 'H')
            || (response['topic'] == 'Conclusion' && response['index'] == "2" && response['condition'][1] == 'L')) {
            $("#submitButton").hide();
            $("#nextButton").hide();
            $("#nextButton").attr("disabled", true);
            istriggerEnterKeyEventActive = false;
            isTaskCompleted = true;
        }



        if (($('#condition').val() == 'HHL' || $('#condition').val() == 'HHH'|| $('#condition').val() == 'HHHC' || $('#condition').val() == 'HHLC' || $('#condition').val() == 'NHHC' || $('#condition').val() == 'NHLC' ) && response["topic"] == 'Introduction' && response["index"] == "2") {
            $("#userMessage").show();
            $('#userMessage').focus()
            $('#userInputType').val("name");
            $("#nextButton").attr("disabled", true);
            istriggerEnterKeyEventActive = false

        }
        else if ($('#userInputType').val() == 'name') {
            message = message + ' ' + $('#userMessage').val();
            $('#userName').val($('#userMessage').val())
            addMessage('user', response["condition"], $('#userName').val())
            $("#userMessage").hide();
            $('#userInputType').val("");
        }
        else if (($('#condition').val() == 'HHHC') && response["topic"] == 'Tutorial' && response["index"] == "23" ||
        ($('#condition').val() == 'HHLC') && response["topic"] == 'Tutorial' && response["index"] == "23" ||
        ($('#condition').val() == 'HHH') && response["topic"] == 'Tutorial' && response["index"] == "21"
            || ($('#condition').val() == 'HHHC') && response["topic"] == 'Conclusion' && response["index"] == "1"
            || ($('#condition').val() == 'HHLC') && response["topic"] == 'Conclusion' && response["index"] == "1"
            || ($('#condition').val() == 'HHH') && response["topic"] == 'Conclusion' && response["index"] == "1") {
            var msgs = message.split("[Name]");

            message = msgs[0] + $('#userName').val() + msgs[1];

        }

        if (response['topic'] == 'Submit' && response['index'] == "2") {
            addMessage('full', response["condition"], message);
        }
        else if ((response['topic'] != 'Redundant')) {
            addMessage('bot', response["condition"], message);
        }

        //if (response['topic'] == 'Clue') {
        //    if (response['condition'][1] == 'H') {
        //        addMessage('bot', $('#condition').val(), 'Do you want more information?')
        //    }
        //    else {
        //        addMessage('bot', $('#condition').val(), 'Is more information required ?')
        //    }
        //}

        if (response['condition'][0] == 'H') {
            addActionBlock(userActionBlock)
        }

        if ((response['topic'] == 'Redundant_Ins' && response['index'] == '3' && response['condition'][1]=='H')) {
            redundantBlock(response['condition'])
            $('#topic').val('Redundant')
            triggerEnterKeyEvent = false
            $("#nextButton").attr("disabled", true);
            $("#nextButton").hide()
        }
        else if ((response['topic'] == 'Redundant_Ins' && response['index'] == '3' && response['condition'][0]=='H' && response['condition'][1]=='L')) {
            redundantBlock(response['condition'])
            $('#topic').val('Redundant')
            triggerEnterKeyEvent = false
            $("#nextButton").attr("disabled", true);
            $("#nextButton").hide()
        }
        else if ((response['topic'] == 'Redundant_Ins' && response['index'] == '4')) {

            redundantBlock(response['condition'])
            $('#topic').val('Redundant')
            triggerEnterKeyEvent = false
            $("#nextButton").attr("disabled", true);
            $("#nextButton").hide()
        }
        $("#nextButton").attr("disabled", false);
        if (response['topic'] == 'Clue' || response['topic'] == 'Redundant') {

        }
        else {
            if (istriggerEnterKeyEventActive) {
                triggerEnterKeyEvent = true;
            }
            else {
                triggerEnterKeyEvent = false;
            }
        }
        if (isTaskCompleted) {

            //alert("Task Completed. Click OK. Page will refresh in 3 seconds")
            //window.setTimeout(function () { location.reload() }, 3000)
            window.location.replace("https://usf.az1.qualtrics.com/jfe/form/SV_bjSxk2rNGebGUi9")
        }


    }

    function redundantBlock(condition) {

        //addThinking('bot', response["condition"])
        //$("#nextButton").attr("disabled", true);
        //setTimeout(function () {
        //    $('#bot_thinking').remove();
        //    addMessage('bot', response["condition"], message)
        //}, 1000);

        //$("#nextButton").attr("disabled", false);

        addMessage('bot', condition, 'Select a category to obtain information.');
        var navItems = []
        navItems = ["Person", "Roles", "Hours"]
        userActionBlock = buildUserActionButtonGroup(navItems, condition, 'category')
        addActionBlock(userActionBlock)

    }


    function redundantDictData() {
        var data = {
            "All": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
            "Alex": [1, 2],
            "Leon": [3, 4],
            "Rachel": [5, 6, 7],
            "Tina": [8, 9],
            "Network Architect": [13, 14, 15],
            "Systems Analyst": [16, 17, 18],
            "Cybersecurity Specialist": [10],
            "Database Administrator": [11, 12],
            "Six": [19, 20, 21],
            "Eight": [22, 23],
            "Ten": [24, 25],
            "Twelve": [26, 27]
        }
        return data
    }

    function buildUserActionButtonGroup(content, condition, type, explanationBlock) {
        var html = ''
        html += `<div class='actionBlock' style="margin: 26px 0 26px;overflow: hidden;">
                        <div style="display: inline-block;text-align: center;width: 100%;">
                            <div style="display: inline-block;">
                                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">`
        for (var i = 0; i < content.length; i++) {
            html += `<div class="btn-group btn-group-sm mr-2" role="group" aria-label="First group">`
            if (type == 'clueSelection') {
                if (i == 0) {
                    html += `<button type="button" class="btn btn-secondary showNextClue" style="font-size:10px">`
                }
                else if (i == 1) {
                    html += `<button type="button" class="btn btn-secondary showMatrixGrid" style="font-size:10px">`
                }
                //if (condition[2] == 'H') {
                //    if (i == 0) {
                //        html += `<button type="button" class="btn btn-secondary showNextClue" style="font-size:10px">`
                //    }
                //    else if (i == 1) {
                //        html += `<button type="button" class="btn btn-secondary showClueExplanation" style="font-size:10px">`
                //    }
                //    else if (i == 2) {
                //        html += `<button type="button" class="btn btn-secondary showMatrixGrid" style="font-size:10px">`
                //    }
                //}
                //else {
                //    if (i == 0) {
                //        html += `<button type="button" class="btn btn-secondary showNextClue" style="font-size:10px">`
                //    }
                //    else if (i == 1) {
                //        html += `<button type="button" class="btn btn-secondary showMatrixGrid" style="font-size:10px">`
                //    }

                //}

            }
            else if (type == 'redundantConfirmation') {
                if (i == 0) {
                    html += `<button type="button" class="btn btn-secondary showNextClue" style="font-size:10px">`
                }
                else if (i == 1) {
                    html += `<button type="button" class="btn btn-secondary showMatrixGrid" style="font-size:10px">`
                }

            }
            else if (explanationBlock) {
                if (i == 0) {
                    html += `<button type="button" class="btn btn-secondary showNextClue" style="font-size:10px">`
                }
                else if (i == 1) {
                    html += `<button type="button" class="btn btn-secondary showMatrixGrid" style="font-size:10px">`
                }
            }
            else if (type == 'askRedundant') {
                if (i == 0) {
                    html += `<button type="button" class="btn btn-secondary showNextClue" style="font-size:10px">`
                }
                else if (i == 1) {
                    html += `<button type="button" class="btn btn-secondary showMatrixGrid" style="font-size:10px">`
                }
                //if (condition[2] == 'H') {
                //    if (i == 0) {
                //        html += `<button type="button" class="btn btn-secondary showNextClue" style="font-size:10px">`
                //    }
                //    else if (i == 1) {
                //        html += `<button type="button" class="btn btn-secondary showClueExplanation" style="font-size:10px">`
                //    }
                //    else if (i == 2) {
                //        html += `<button type="button" class="btn btn-secondary showMatrixGrid" style="font-size:10px">`
                //    }
                //}
                //else {
                //    if (i == 0) {
                //        html += `<button type="button" class="btn btn-secondary showNextClue" style="font-size:10px">`
                //    }
                //    else if (i == 1) {
                //        html += `<button type="button" class="btn btn-secondary showMatrixGrid" style="font-size:10px">`
                //    }
                //}


            }

            else if (type == 'category') {
                if (i == 0) {
                    html += `<button type="button" class="btn btn-secondary person" style="font-size:10px">`
                }
                else if (i == 1) {
                    html += `<button type="button" class="btn btn-secondary roles" style="font-size:10px">`
                }
                else if (i == 2) {
                    html += `<button type="button" class="btn btn-secondary hours" style="font-size:10px">`
                }

            }
            else if (type == 'person') {
                if (i == 0) {
                    html += `<button type="button" class="btn btn-secondary alex" style="font-size:10px">`
                }
                else if (i == 1) {
                    html += `<button type="button" class="btn btn-secondary leon" style="font-size:10px">`
                }
                else if (i == 2) {
                    html += `<button type="button" class="btn btn-secondary rachel" style="font-size:10px">`
                }
                else if (i == 3) {
                    html += `<button type="button" class="btn btn-secondary tina" style="font-size:10px">`
                }
            }
            else if (type == 'roles') {
                if (i == 0) {
                    html += `<button type="button" class="btn btn-secondary networkArchitect" style="font-size:10px">`
                }
                else if (i == 1) {
                    html += `<button type="button" class="btn btn-secondary systemsAnalyst" style="font-size:10px">`
                }
                else if (i == 2) {
                    html += `<button type="button" class="btn btn-secondary cyberSpecialist" style="font-size:10px">`
                }
                else if (i == 3) {
                    html += `<button type="button" class="btn btn-secondary databaseAdmin" style="font-size:10px">`
                }
            }
            else if (type == 'hours') {
                if (i == 0) {
                    html += `<button type="button" class="btn btn-secondary six" style="font-size:10px">`
                }
                else if (i == 1) {
                    html += `<button type="button" class="btn btn-secondary eight" style="font-size:10px">`
                }
                else if (i == 2) {
                    html += `<button type="button" class="btn btn-secondary ten" style="font-size:10px">`
                }
                else if (i == 3) {
                    html += `<button type="button" class="btn btn-secondary twelve" style="font-size:10px">`
                }
            }

            html += content[i]
            html += `</button></div>`
        }

        html += `</div></div></div></div>`

        return html;
    }



    function getMatrixHtml() {
        var html = ` <div id = 'matrixResult' class='table-responsive-sm' style = 'width:130%' >
            <table class='table table-sm' >
                <thead>
                    <tr style='font-size: 10px;font-weight:bold;'>
                        <th scope='col'>Team Member</th>
                        <th scope='col'>Role</th>
                        <th scope='col'>Pjt hrs/wk</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td style='font-size: 14px;font-weight:bold;'>Alex</td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >Network Architect</option>
                                <option value='2'>Systems Analyst</option>
                                <option value='3'>Cyber Security Specalist</option>
                                <option value='4'>Database Administrator</option>
                            </select>
                        </td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >6</option>
                                <option value='2'>8</option>
                                <option value='3'>10</option>
                                <option value='4'>12</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style='font-size: 14px;font-weight:bold;'>Leon</td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >Network Architect</option>
                                <option value='2'>Systems Analyst</option>
                                <option value='3'>Cyber Security Specalist</option>
                                <option value='4'>Database Administrator</option>
                            </select>
                        </td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >6</option>
                                <option value='2'>8</option>
                                <option value='3'>10</option>
                                <option value='4'>12</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style='font-size: 14px;font-weight:bold;'>Rachel</td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >Network Architect</option>
                                <option value='2'>Systems Analyst</option>
                                <option value='3'>Cyber Security Specalist</option>
                                <option value='4'>Database Administrator</option>
                            </select>
                        </td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >6</option>
                                <option value='2'>8</option>
                                <option value='3'>10</option>
                                <option value='4'>12</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style='font-size: 14px;font-weight:bold;'>Tina</td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >Network Architect</option>
                                <option value='2'>Systems Analyst</option>
                                <option value='3'>Cyber Security Specalist</option>
                                <option value='4'>Database Administrator</option>
                            </select>
                        </td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >6</option>
                                <option value='2'>8</option>
                                <option value='3'>10</option>
                                <option value='4'>12</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table >
            <div><span style='display:none;color:red;font-size:9px'>* All the values should be selected.</span></div></div >`
        return html
    }

    function getMatrixHtml_hc() {
        var html = ` <div id = 'matrixResult' class='table-responsive-sm' style = 'width:130%' >
            <table class='table table-sm' >
                <thead>
                    <tr style='font-size: 10px;font-weight:bold;'>
                        <th scope='col'>Team Member</th>
                        <th scope='col'>Role</th>
                        <th scope='col'>Pjt hrs/wk</th>
                        <th scope='col'>Office Location/wk</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td style='font-size: 14px;font-weight:bold;'>Alex</td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >Network Architect</option>
                                <option value='2'>Systems Analyst</option>
                                <option value='3'>Cyber Security Specalist</option>
                                <option value='4'>Database Administrator</option>
                            </select>
                        </td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >6</option>
                                <option value='2'>8</option>
                                <option value='3'>10</option>
                                <option value='4'>12</option>
                            </select>
                        </td>
                        <td>
                        <select class='form-control form-control-sm'>
                            <option value='0'>Select</option>
                            <option value='1' >locationA</option>
                            <option value='2'>locationB</option>
                            <option value='3'>locationC</option>
                            <option value='4'>locationD</option>
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td style='font-size: 14px;font-weight:bold;'>Leon</td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >Network Architect</option>
                                <option value='2'>Systems Analyst</option>
                                <option value='3'>Cyber Security Specalist</option>
                                <option value='4'>Database Administrator</option>
                            </select>
                        </td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >6</option>
                                <option value='2'>8</option>
                                <option value='3'>10</option>
                                <option value='4'>12</option>
                            </select>
                        </td>
                        <td>
                        <select class='form-control form-control-sm'>
                            <option value='0'>Select</option>
                            <option value='1' >locationA</option>
                            <option value='2'>locationB</option>
                            <option value='3'>locationC</option>
                            <option value='4'>locationD</option>
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td style='font-size: 14px;font-weight:bold;'>Rachel</td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >Network Architect</option>
                                <option value='2'>Systems Analyst</option>
                                <option value='3'>Cyber Security Specalist</option>
                                <option value='4'>Database Administrator</option>
                            </select>
                        </td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >6</option>
                                <option value='2'>8</option>
                                <option value='3'>10</option>
                                <option value='4'>12</option>
                            </select>
                        </td>
                        <td>
                        <select class='form-control form-control-sm'>
                            <option value='0'>Select</option>
                            <option value='1' >locationA</option>
                            <option value='2'>locationB</option>
                            <option value='3'>locationC</option>
                            <option value='4'>locationD</option>
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td style='font-size: 14px;font-weight:bold;'>Tina</td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >Network Architect</option>
                                <option value='2'>Systems Analyst</option>
                                <option value='3'>Cyber Security Specalist</option>
                                <option value='4'>Database Administrator</option>
                            </select>
                        </td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >6</option>
                                <option value='2'>8</option>
                                <option value='3'>10</option>
                                <option value='4'>12</option>
                            </select>
                        </td>
                        <td>
                        <select class='form-control form-control-sm'>
                            <option value='0'>Select</option>
                            <option value='1' >locationA</option>
                            <option value='2'>locationB</option>
                            <option value='3'>locationC</option>
                            <option value='4'>locationD</option>
                        </select>
                        </td>
                        <tr>
                        <td style='font-size: 14px;font-weight:bold;'>Michael</td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >Network Architect</option>
                                <option value='2'>Systems Analyst</option>
                                <option value='3'>Cyber Security Specalist</option>
                                <option value='4'>Database Administrator</option>
                            </select>
                        </td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >6</option>
                                <option value='2'>8</option>
                                <option value='3'>10</option>
                                <option value='4'>12</option>
                            </select>
                        </td>
                        <td>
                        <select class='form-control form-control-sm'>
                            <option value='0'>Select</option>
                            <option value='1' >locationA</option>
                            <option value='2'>locationB</option>
                            <option value='3'>locationC</option>
                            <option value='4'>locationD</option>
                        </select>
                        </td>
                    </tr>
                </tbody>
            </table >
            <div><span style='display:none;color:red;font-size:9px'>* All the values should be selected.</span></div></div >`
        return html
    }

    function getMatrixHtml_lc() {
        var html = ` <div id = 'matrixResult' class='table-responsive-sm' style = 'width:130%' >
            <table class='table table-sm' >
                <thead>
                    <tr style='font-size: 10px;font-weight:bold;'>
                        <th scope='col'>Team Member</th>
                        <th scope='col'>Role</th>
                        <th scope='col'>Pjt hrs/wk</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style='font-size: 14px;font-weight:bold;'>Leon</td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >Network Architect</option>
                                <option value='2'>Systems Analyst</option>
                                <option value='3'>Cyber Security Specalist</option>
                            </select>
                        </td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >6</option>
                                <option value='2'>8</option>
                                <option value='3'>10</option>
                                <option value='4'>12</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style='font-size: 14px;font-weight:bold;'>Rachel</td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >Network Architect</option>
                                <option value='2'>Systems Analyst</option>
                                <option value='3'>Cyber Security Specalist</option>
                            </select>
                        </td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >6</option>
                                <option value='2'>8</option>
                                <option value='3'>10</option>
                                <option value='4'>12</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style='font-size: 14px;font-weight:bold;'>Tina</td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >Network Architect</option>
                                <option value='2'>Systems Analyst</option>
                                <option value='3'>Cyber Security Specalist</option>
                            </select>
                        </td>
                        <td>
                            <select class='form-control form-control-sm'>
                                <option value='0'>Select</option>
                                <option value='1' >6</option>
                                <option value='2'>8</option>
                                <option value='3'>10</option>
                                <option value='4'>12</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table >
            <div><span style='display:none;color:red;font-size:9px'>* All the values should be selected.</span></div></div >`
        return html
    }

    function addThinking(type,condition) {
        var html = '';
        if (type == 'user') {
            html = "<div id='user_thinking' class='user_msg_div'><div class='user_msg_img' ><img src='../static/images/user.png' alt='Avatar' fstyle='width:100%;'></div><div class='user_msg_main_div'><div class='ticontainer'><div class='tiblock'><div class='tidot'></div><div class='tidot'></div><div class='tidot'></div></div></div></div></div > "
        }
        else {
            if (condition[1] == 'H') {
                html = "<div id='bot_thinking' class='bot_msg_div'><div class='bot_msg_img'><img src='../static/images/pic1.jpg' alt='Avatar' style='width:100%;border-radius: 70%;'></div><div class='bot_msg_main_div'><div class='bot_msg_inner_div'><div class='ticontainer'><div class='tiblock'><div class='tidot'></div><div class='tidot'></div><div class='tidot'></div></div></div></div></div></div>"
            }
            else {
                html = "<div id='bot_thinking' class='bot_msg_div'><div class='bot_msg_img'><img src='../static/images/bot3.jpg' alt='Avatar' style='width:100%;'></div><div class='bot_msg_main_div'><div class='bot_msg_inner_div'><div class='ticontainer'><div class='tiblock'><div class='tidot'></div><div class='tidot'></div><div class='tidot'></div></div></div></div></div></div>"
            }

        }
        $('#chatDiv').append(html)
        var element = document.getElementById("chatDiv");
        element.scrollTop = element.scrollHeight;
    }

    function addMessage(type,condition,message) {
        var html = '';
        if (type == 'user') {
            html = "<div class='user_msg_div'><div class='user_msg_img'><img src='../static/images/user.png' alt='Avatar' style='width:100%;'></div><div class='user_msg_main_div'><p style='word-wrap: break-word'>" + message + "</p></div></div>"
        }
        else if (type == 'bot') {
            if (condition[1] == 'H') {
                html = "<div class='bot_msg_div'><div class='bot_msg_img'><img src='../static/images/pic1.jpg' alt='Avatar' style='width:100%;border-radius: 70%;'></div><div class='bot_msg_main_div'><div class='bot_msg_inner_div'><p style='word-wrap: break-word;background: #f0ecda'>" + message + "</p></div></div></div>"
            }
            else {
                html = "<div class='bot_msg_div'><div class='bot_msg_img'><img src='../static/images/bot3.jpg' alt='Avatar' style='width:100%;'></div><div class='bot_msg_main_div'><div class='bot_msg_inner_div'><p style='word-wrap: break-word;background: #f0ecda'>" + message + "</p></div></div></div>"
            }

        }
        else {
            if (condition[1] == 'H') {
                html = "<div class='bot_msg_div'><div class='bot_msg_img'><img src='../static/images/pic1.jpg' alt='Avatar' style='width:100%;border-radius: 70%;'></div><div class='bot_msg_main_div'><div class='submit_msg_inner_div'><p style='word-wrap: break-word;background: #f0ecda'>" + message + "</p></div></div></div>"
            }
            else {
                html = "<div class='bot_msg_div'><div class='bot_msg_img'><img src='../static/images/bot3.jpg' alt='Avatar' style='width:100%;'></div><div class='bot_msg_main_div'><div class='submit_msg_inner_div'><p style='word-wrap: break-word;background: #f0ecda'>" + message + "</p></div></div></div>"
            }
        }
        $('#chatDiv').append(html)
        var element = document.getElementById("chatDiv");
        element.scrollTop = element.scrollHeight;
    }

    function addActionBlock(content) {
        $('#chatDiv').append(content)
        var element = document.getElementById("chatDiv");
        element.scrollTop = element.scrollHeight;


    }

    //To check if dict is empty
    function isEmptyObj(object) {
        var result = true
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                result = false;
            }
        }
        return result
    }

    function gridSubmit() {
        $('#submitButton').click(function () {
            var rows = document.querySelector('#matrixResult').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
            var errorMsg = document.querySelector('#matrixResult').getElementsByTagName('span')[0]
            var isValid = true
            var result = {}
            for (var row = 0; row < rows.length; row++) {
                var role = rows[row].getElementsByTagName('td')[1].getElementsByTagName('select')[0].value
                var projectHours = rows[row].getElementsByTagName('td')[2].getElementsByTagName('select')[0].value
                if (role == "0" || projectHours == "0" ) {
                    $('#matrixResult div span').css('display', 'inline-block');
                    isValid = false
                    break
                }
                result[row+1] = {
                    "role": role,
                    "projectHours": projectHours
                }

            }
            //console.log(isValid)
            if (isValid) {
                ////console.log(JSON.stringify(result))
                $('#matrixResult div span').css('display', 'none');
                var timeTaken = 0.0

                var seconds = new Date().getTime() / 1000;
                timeTaken = seconds - parseInt($('#clueStartTimestamp').val());

                usedHints = ''
                if(isEmptyObj(sessionDictData)) {
                    usedHints = ''
                }
                else {
                    usedHints = sessionDictData['All'].toString()
                }

                var ajaxData = {
                    'sessionId': $('#sessionId').val(),
                    'timeTaken': timeTaken,
                    'condition': $('#condition').val(),
                    'matrixDict': JSON.stringify(result),
                    'workGrid':'',
                    'usedHints': usedHints,
                    'sonaid': localStorage.getItem("sona_id"),
                    'uid' : localStorage.getItem("uid")
                }
                //console.log(ajaxData)
                $.ajax({
                    url: '/storeMatrixResult',
                    data: ajaxData,
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (response) {
                        //console.log(response)
                        var ajaxData1 = {
                            'sessionId': $('#sessionId').val(),
                            'workGrid': $('#mainTable')[0].innerHTML,
                        }
                        //console.log(ajaxData1)
                        $.ajax({
                            url: '/updateMatrixResult',
                            data: ajaxData1,
                            type: 'POST',
                            success: function (response) {
                                //console.log(response)
                            }
                        });
                    }
                });



                ////console.log(result)
                $("#submitButton").hide();
                $("#nextButton").show();
                $("#nextButton").attr("disabled", false);
                //triggerEnterKeyEvent = true;
                triggerEnterKeyEvent = false;
                getDataEvent();
            }
        });
    }

    function gridClick() {
        $('td').click(function () {
            var col = $(this).parent().children().index($(this));
            var row = $(this).parent().parent().children().index($(this).parent());
            var className = "empty";

            //if((col > 1 && row > 1)){
            if ($(this).hasClass('click')) {
                if ($(this).hasClass('cross')) {

                    $(this).removeClass('cross')
                    $(this).addClass('circle')
                    className = $(this).attr("class");

                }
                else {
                    if ($(this).hasClass('circle')) {

                        $(this).removeClass('circle')
                        $(this).addClass('empty')
                        className = $(this).attr("class");

                    }
                    else {
                        if ($(this).hasClass('empty')) {
                            $(this).removeClass('empty')
                            $(this).addClass('cross')
                            className = $(this).attr("class");

                        }
                        else {
                            $(this).addClass('cross')
                            className = $(this).attr("class");

                        }
                    }
                }
                $("#gridAction").val('(' + row.toString() + ',' + col.toString() +')')
                //}
            }
            ////console.log(col, row, className)

        });
    }
});


