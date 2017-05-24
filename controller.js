   $(function() {
         
        var count  = 0;
        var nextCounter = 1;  
        var backcounter = 1;
        var quesno = 1;
        var answers = [];
        var curr_test = {};

        var uid = 0;
      
        var dataCopy = '';
        var total = 0;
        
        var email = '';
       
        //var ans = [];
       
        var review = false;
     
       
       $('#signup').hide();
       $("#logout1").hide();
       $("#previousTest").hide();
       $('#startPage').hide();
       $('#test').hide();
       $("#final").hide();
       
       
      
//        localStorage.setItem("email", "test@gmail.com");   
//        localStorage.setItem("1", "");
       
//        var users = {};
//        users["user1"] = {id: 1, email:"test@gmail.com",test:[ { id: 1, ans: ["A","B","C","D","E","A","B","C"]  , score: 3 } ]};
//        users["user2"] = {id: 2, email:"test1@gmail.com",test:[{ id: 2, ans: ["A","B","C","D","E","A","B","C"]  , score: 4 } ]};
//        try {
//                localStorage["userTable"] = JSON.stringify(users);
//        } catch (e) {
//                alert("Error when writing to Local Storage\n" + e);
//        };
     
//       localStorage.clear();
    
       $('#login1').click(function(){
           
          
                    var list = '';
           var f = false;
            
            email = $("#loginEmail").val();
           
            $("#previousTest").empty();
        

          var len = localStorage.length;
            var keys = [];
            if (len > 0){
                var u = {};
                    try {
                          u = JSON.parse(localStorage.userTable);
                        } catch (e) {
                          alert("Error when reading from Local Storage\n" + e);        
                    }
                
                    $("#message").hide();
                    $("#login").hide();
                    $("#startPage").show();
                    $("#logout1").show();
                    $("#previousTest").show(); 
                    
                
                    for ( var k in u ) {
                        keys.push(k);
                        if (u[k].email == email){
                            
                            f = true;
                            var tests = u[k].test;
                            
                            total = 0;
                            // if previous test attempted
                            if (tests.length !== 0){
                                list = '<div id="prevTestButtons" style = "text-align :center">';
                                for ( var test in tests) 
                                {
                                    total += 1;
                                    list += '<div class="row" id = "ptest' + total + '"><p>' + total + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  TEST ID: ' + tests[test].id + ' &nbsp&nbsp&nbsp&nbsp Score : ' + tests[test].score+ '&nbsp&nbsp&nbsp&nbsp<button  id ="' + tests[test].id + '" type="button" class= "btn btn-default">View Test</button></p></div>';
                                }
                                list += '</div>';
                                 $("#previousTest").append("<div class = 'row col-lg-offset-5 col-md-offset-5 col-sm-offset-5 col-xs-offset-4'  id = 'total'>Total Tests : " + total + "</div>");
                                $("#previousTest").append(list);
                                list = '';
                                uid = k;
                            } 
                            //No previous test available
                            else{
                                $("#previousTest").append("<div class = 'row'  id = 'total'><p style = 'margin-left :200' ><b> Total Tests : " + total + "<b> </p></div>");
                                $("#previousTest").append(list);
                                list = '';
                                uid = k;
                            }
                           
                                   
                            
                            
                            } 
                        }
                        
                
                    if (f === false){

                        if (localStorage.idcount) {
                                localStorage.idcount = Number(localStorage.idcount) + 1;
                        }
                        
                        var tempID = localStorage.getItem("idcount");
                
                        u["user" + tempID] = {id: tempID, email: email,test:[]};
                        
                        try {
                                localStorage.userTable = JSON.stringify(u);
                        } catch (e) {
                                alert("Error when writing to Local Storage\n" + e);
                        }
                         $("#previousTest").append("<div class = 'row col-lg-offset-5 col-md-offset-5 col-sm-offset-5 col-xs-offset-4'  id = 'total'>Total Tests : " + total + "</div>");
                        $("#previousTest").append(list);
                        
                        
                        list = '';
                        uid = "user"+ tempID;
                    }
            }
            else{
                 
                    
                    var users = {};
                    if (localStorage.getItem("userTable") === null) {
                            localStorage.clear();
                    }
                     
                    var idcount = 1;
                    $("#message").hide();
                    $("#login").hide();
                    $("#startPage").show();
                    $("#logout1").show();
                    $("#previousTest").show(); 
//                    users["user1"] = {id: 1, email:"test@gmail.com",test:[ { id: 1, ans: ["A","B","C","D","E","A","B","C"]  , score: 3 } ]};
//                    users["user2"] = {id: 2, email:"test1@gmail.com",test:[{ id: 2, ans: ["A","B","C","D","E","A","B","C"]  , score: 4 } ]};
                    users["user" + idcount] = {id: idcount, email: email,test:[]};
                    
                    try {
                            localStorage.userTable = JSON.stringify(users);
                    } catch (e) {
                            alert("Error when writing to Local Storage\n" + e);
                    }
                    localStorage.setItem("idcount", "1");

                //                    var questionSet = {"125": "B","126": "B","127": "D","128": "A","129": "B","130": "B","131": "C","133": "E"};
                
                    var questionSet = {"1": "B","2": "B","3": "D","4": "A","5": "B","6": "B","7": "C","8": "E"};
                    localStorage.setItem('questionSet', JSON.stringify(questionSet));
                    
                    list = '';
                    list += "<div class = 'row'  id = 'total'><p style = 'margin-left :200' ><b> Total Tests : " + total + "<b></p></div>";
                    $("#previousTest").append(list);
                    list = '';
                    uid = "user"+ idcount;
                 
                }
        });
    
    
       
  
  $("#start").click( function(){
            $("#previousTest").hide();
            $("#submit").hide(); 
            $("#startPage").hide();
            $("#question_list").hide();
            
            $("#test").show();
            $("#options").empty();
            $("#options").show();
            $("#review").show();
            $("#next").show();
            $("#back").show();
            
            backcounter = 1;
            nextCounter = 1;
            count =0;
            quesno = 1;
            review= false;


            if (localStorage.testCount) {
                localStorage.testCount = Number(localStorage.testCount) + 1;
            } else {
                localStorage.testCount = 1;
            }
            var u = {};
            try {
                  u = JSON.parse( localStorage.userTable);
                } catch (e) {
                  alert("Error when Start\n" + e);        
            }
            
            
             $.getJSON("data.json", function(jsonData) {
                dataCopy = jsonData;
                 
                 var temp = 1;
                 var questionString = '';
                 
                 $.each(jsonData, function(i, curr_question) {

                     if (temp == 1){
                         
                        questionString  = '<div id = "q' + temp + '">';    
                    
                     }else{
                     
                         questionString  = '<div id = "q' + temp + '" style = "display:none">';    
                 }
                 
                 questionString += '<br><div class="row questionButton"><h3 class = "well col-lg-2 col-md-2 col-sm-2 col-xs-12 pull-left" id="question"' + temp +'">QUESTION ' + temp + '</h3></div><br>';
                 questionString += "<p>" + curr_question.text + "</p>";


                $.each(curr_question.answers, function(i, ans){
                    var no = parseInt(i) + 1;
                    no = no.toString();
                 
                    questionString += '<br><input id = "answer' + no + '" type="radio" name="answer' + temp + '" value="' + no + '"/>' + ans.ans_text;
                });
                curr_test = { id: localStorage.testCount, ans: []  , score: 0 };
                questionString += '</div>';
                $('#options').append(questionString);
                temp += 1;
                count += 1;
                 });            
            });    
        });
       
       
       
        $('#next').click(function(){
          
            var nextQues = '';
            var prevQues = '';
          
            if (nextCounter >= count){
                if(review === true){
                    
                    backcounter = 1;
                    nextCounter = 1;
                      
                    $("#test").hide();
                    
                    $("#startPage").show(); 
                    $("#previousTest").show();
                    $("#prevTestButtons").show();
                    review = false;
                    
                }else{
            
                    $("#options").hide();
                    $("#back").hide();
                    $("#next").hide();
                    
                    $('#submit').show();  
                }
            }
            
             
            
            if(review === false){
                
               
                var value1 = '';
                value1 = $('input[name="answer' + nextCounter +'"]:checked').val();
                
                if (parseInt(value1) == 1){
                     answers[nextCounter] = "A";     
                }else
                if (parseInt(value1) == 2){
                      answers[nextCounter] = "B";     
                }else if (parseInt(value1) == 3){
                      answers[nextCounter] = "C";     
                }else if (parseInt(value1) == 4){
                      answers[nextCounter] = "D";     
                }else if (parseInt(value1) == 5){
                     answers[nextCounter] = "E";     
                }else{
                     answers[nextCounter] = "Z";
                }
                console.log(answers);
//                }
        
            }
             prevQues = 'q' +quesno;
            quesno += 1;
            nextQues = 'q' + quesno;
            $('#' + prevQues).hide();
            $('#' + nextQues).show();
            backcounter +=1;
            nextCounter += 1;
//              console.log(backcounter);
//            console.log(nextCounter);
//             console.log(count);
//             console.log(quesno);
    });
       
       
       
       
       
         $('#back').click(function(){
           
            var nextQues = '';
            var prevQues = '';
           
            backcounter-= 1;
            if (backcounter <= 0){
                var currQues = 'q' +quesno;
                 $('#' + currQues).show();
                backcounter += 1;
            }else{
                
                 nextCounter -= 1;
                if(review === true){
                    
                    nextQues = 'q' + quesno;
                    quesno -= 1;
                    prevQues = 'q' +quesno;


                    $('#' + prevQues).show();
                    $('#' + nextQues).hide();
                }else{
                    var value1 = '';
                    value1 = answers[backcounter];    


                    var choice = 0;
                    if (value1 == "A"){
                            choice  = 1;     
                    }else
                    if (value1 == "B"){
                             choice  = 2;     
                    }else if (value1 == "C"){
                             choice  = 3;   
                    }else if (value1 == "D"){
                              choice  = 4; 
                    }else if (value1 == "E"){
                              choice  = 5;   
                    }else{
                         choice  = 0; 
                    }
                    nextQues = 'q' + quesno;
                    quesno -= 1;
                    prevQues = 'q' +quesno;
//                    console.log(value1);

                    $('#' + prevQues).show();
                     $('#answer' + choice).prop('checked', true);
                    $('#' + nextQues).hide();
                    console.log(answers);
//                     console.log(backcounter);
//            console.log(nextCounter);
//             console.log(count);
//             console.log(quesno);
                    
                }
            }
            
    });
             
             
       function goToQuestion(qindex){
          
            
          if(quesno > count){
                $('#q' + 8).hide();    
            }
            else{
              $('#q' + quesno).hide();   
            }
          
          
            quesno = parseInt(qindex);
          
          
            var currQues = 'q' + quesno;
          
            $("#submit").hide();
           
            $("#test").show();
            $("#options").show();
            $("#next").show();
            $("#back").show();
            $("#question_list").hide();
            $('#' + currQues).show();

        
            var ansIndex = answers[qindex];
            var choice = 0;
           
            if (ansIndex == "A"){
                    choice = 1;     
            }else if (ansIndex == "B"){
                    choice = 2;     
            } else if (ansIndex == "C"){
                    choice = 3;     
            } else if (ansIndex == "D"){
                    choice = 4;     
            } else if (ansIndex == "E"){
                    choice = 5;     
            } 
           
           backcounter = parseInt(qindex);
           nextCounter = parseInt(qindex);

          $('#answer' + choice).prop('checked', true);
    }        
             
//// ////////          Review the Entire Section
      
    $("#reviewButton").on('click','#review', function() {

        var list = '';    
        var index = 1;
        
        $("#options").hide();
        $("#next").hide();
        $("#back").hide();
        $("#question_list").show();
        $("#question_list").empty();
        $("#submit").show();
        
        list += '<br><div id="buttons" class ="row well text-center col-lg-offset-3 col-lg-6  col-md-offset-3 col-md-6  col-sm-offset-3 col-sm-6">';
        $.each(dataCopy, function(i, curr_question) {
                
                list += '<br> <button  id =' + index + ' type="button" class= "btn btn-warning text-center  col-lg-10 col-md-10 col-sm-10 col-xs-offset-1 col-xs-10">Question ' + index+ '</button><br>';
                index += 1;
        });
       list += '</div>';
        
        $('#question_list').append(list);
 
        $("#question_list").on('click','button', function() {


            goToQuestion(this.id);
        
        });
    });     
       
       
    $('#submit').click(function(){
        var finalString = '';    
        var quesAns = {};
        var score = 0;
        $("#final").empty();
        
        // To get the questions and thier correct answers from local storage
        try {
          quesAns = JSON.parse(localStorage.questionSet);
        } catch (e) {
          alert("Error when reading from Local Storage\n" + e);        
        }

        // Calculating the test score 
        
        for (var i =1; i<= count; i++){
           if (answers[i] == quesAns[i]){
               score += 1;
           }
       }
        console.log(score);
        
        // To get the users details from local storage
        var u = {};
        try {
          u = JSON.parse(localStorage.userTable);
        } catch (e) {
          alert("Error when submit\n" + e);        
        }
        // Adding the test deatils  like his answers , score to his record 
        curr_test.ans = answers;
        curr_test.score = score;
        
        var tests = u[uid].test;
        var len = tests.length;
        
        u[uid].test[len] = curr_test; 
        
        
        try {
                            localStorage.userTable = JSON.stringify(u);
                    } catch (e) {
                            alert("Error when writing to Local Storage\n" + e);
                    }
        
        // Thank you screen 
        
        $("#test").hide();
        $('#final').show();
        
        finalString += '<div id="thankyou" class="row"><div class="row col-lg-offset-3 col-lg-9 col-md-offset-3 col-md-10  col-xs-offset-3 col-xs-10"><p> Your Score is : ' + score + '.</p></div><br><button type="button" class = "btn btn-info col-lg-offset-1 col-lg-10 col-md-offset-1 col-md-10  col-sm-offset-1 col-sm-10 col-xs-offset-1 col-xs-10" id="home">HOME</button></div>';
        $("#final").append(finalString);
    });

       
       // To update the previous test details on start page after submitting test
   function load(){
         
        $("#startPage").show();
        $("#login").hide();
        $("#previousTest").show();
        
       
        var list = '';                
        var total = 0;
        var u = {};
       
        try {
          u = JSON.parse(localStorage.userTable);
        } catch (e) {
          alert("Error when reading from Local Storage\n" + e);        
        }
       
        var tests = u[uid].test;
        
       // previous test attempted
        
        if (tests.length !== 0){
            list += '<div id="prevTestButtons" style = "text-align :center">';
            for ( var test in tests) 
            {
                total += 1;
                list += '<div class="row col-xs-12" id = "ptest' + total + '"><p>' + total + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  TEST ID: ' + tests[test].id + ' &nbsp&nbsp&nbsp&nbsp Score : ' + tests[test].score+ '&nbsp&nbsp&nbsp&nbsp<button  id ="' + tests[test].id + '" type="button" class= "btn btn-default">View Test</button></p></div>';
            }
            list += '</div>';
            $("#total p").html("<b> Total Tests : " + total + "<b>");
            $("#previousTest").append(list);
            list = '';
        }
    }
            

   $("#final").on('click', '#home' ,function(){
        $("#final").hide();
        $("#previousTest").show();
        $("#previousTest").empty();
        
        load();
        
        $("#startPage").show();

   });  
             
    
   function gotoTest(testIndex){

        quesno = 1;
        count = 0;
        backcounter = 1;
        nextCounter = 1;
        
        var u = {};
        try {
          u = JSON.parse(localStorage.userTable);
        } catch (e) {
          alert("Error when reading from Local Storage\n" + e);        
        }
        
        var ans = [];
        $("#startPage").hide();
        $("#options").empty();
        $('#test').show();
       $("#options").show();
       $("#next").show();
       $("#back").show();
       $("#question_list").hide();

        for (var k in u[uid].test){
            var testAnsPtr =u[uid].test[k];
            if(testIndex ==  testAnsPtr.id)
            {
                ans =  testAnsPtr.ans;
            }
        }


        var choice = 0;
       
        $.getJSON("data.json", function(Data) {
                 var temp = 1;
                 var questionString = '';
                 $.each(Data, function(i, curr_question) {
                     
                    review= true;
                    choice = 0;
                     
                     
                    if (ans[temp] == "A"){
                            choice = 1;     
                    }else if (ans[temp] == "B"){
                            choice = 2;     
                    } else if (ans[temp] == "C"){
                            choice = 3;     
                    } else if (ans[temp] == "D"){
                            choice = 4;     
                    } else if (ans[temp] == "E"){
                            choice = 5;     
                    } else{
                        choice= 100;
                    }


                     if (temp == 1){
                        questionString  = '<div id = "q' + temp + '">';    
                    }else{
                        questionString  = '<div id = "q' + temp + '" style = "display:none">';    
                    }
                 
                          questionString += '<br><div class="row questionButton"><h3 class = " well col-lg-2 col-md-2 col-sm-2 col-xs-12 pull-left" id="question"' + temp +'">QUESTION ' + temp + '</h3></div><br>';
                         
                         questionString += "<p>" + curr_question.text + "</p>";


                    $.each(curr_question.answers, function(i, ans){
                        var no = parseInt(i) + 1;
                        no = no.toString();
                
                         if (choice == (i+1)){
                                 questionString += '<br><input id = "answer' + no + '" type="radio" name="answer' + temp + '" value="' + no + '" checked = "checked"/>' + ans.ans_text;     
                            }else{
                                 questionString += '<br><input id = "answer' + no + '" type="radio" name="answer' + temp + '" value="' + no + '"/>' + ans.ans_text;
                            }
                    });

                    questionString += '</div>';
                    $('#options').append(questionString);
                    
                     temp += 1;
                    count += 1;
                 });
                  $("input[type=radio]").attr('disabled', true);
                 });      
   }
       
       
    $("#previousTest").on('click','button', function() {


            $("#previousTest").hide();
            $("#review").hide();
            $("#submit").hide();
        
            gotoTest(this.id);
        
        });         
             
       
   $("#logout").click(function(){
            $("#previousTest").empty();
            $("#options").empty();

            $("#startPage").hide();                
            $("#test").hide();               
            $("#previousTest").hide();           
            $("#final").hide();
            $("#logout1").hide();

            $("#message").show();
            $("#login").show();     

            quesno = 1;
            count = 0;
            nextCounter = 1;
            backcounter = 1;
   });

   });