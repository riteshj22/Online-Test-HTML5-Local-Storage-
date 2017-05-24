# Online-Test-HTML5-Local-Storage-
 A Web Application that enables MCQ style tests with HTML, CSS, Bootstrap, JQuery using HTML5 Local Storage.

Steps to Run

 - On Apache

 		
 		1) Place the files data.json, test.html, controller.js in htdocs folder of apache.
 		2) Start the Server
 		3) Open the browser
 		4) open the test.html page in the browser 
 		5) Login and continue to use the application   

On Tomcat

 		
 		1) Place the files data.json, test.html, controller.js in htdocs folder of webapps.
 		2) Start the Server
 		3) Open the browser
 		4) open the test.html page in the browser
 		5) Login and continue to use the application   
	
	if on localhost url will be like following:
	
	http://localhost:8080/test.html

	where 8080 is port number used to listen on server

	(Note: Verify the port number if same from conf file for apache it should be same as that on line Listen)

Working and test environment overview:

    You will need to login with an email id e.g. test@gmail.com. On the home screen users sees records related to his previous test and button to start a new test.

	When user clicks on start button
		a ajax call is made to get data i.e questions and their options.

 	Once user starts the test he has 
 	- Back and next buttons to navigate test environment. 
 	- Review button to see list of all questions and go directly to a particular question if needed.

 	- a User can submit te test  by clicking on submit when he attemps the last question and click on next or from review screen.

 	- After submitting user can see his score and return to home page.
