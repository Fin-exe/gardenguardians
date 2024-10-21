# gardenguardians

PROJECT DESCRIPTION AND PURPOSE:
Garden Guardians is an interactive and engaging educational website that educates children about the “Native Plants of Australia” as a part of Brisbane City Council’s Free Native Plants Program. In a world of climate change, it is imperative to start introducing the next generation to be consciously aware and caring for their surroundings. 


INSTALLATION INSTRUCTIONS: 
All files are in Filezilla and all connections are done in the files themselves. Simply click to open the index.html file to peruse the website!


TECHNOLOGY USED:
-Brisbane City Council 'Native Plants Species' Dataset
-Open Meteo Weather API 
-Flicker API 
-Javascript Papaparse Library - library that helps parsing through csv files. 
-HTML
-CSS
-Javascript 
-Generative AI


FILE CONTENT DESCRIPTIONS:
index.html - This file hosts the HTML code for the landing page in which guides users through the rest of the website to the tutorial.html and mainpage.html.

mainpage.html - This file hosts the main game interface, where HTML code provides functionality for the drag and drop interaction, the weather condition widget calling the weather API (Open-Meteo), current plant conditions, and links to the seedpage.html and quizpage.html. 

seedpage.html - This file hosts the selection of 15 plants for the game based on the Native Plant Species Database by the Brisbane City Council. Here, users can peruse the selection, choose, and see plant descriptions through flipcards to be directed back to the mainpage.html to start growing. 

quizpage.html - This file hosts the quiz questions, the scoring and calling of the Native Plants Species dataset to check against the user answers to the correct answer. The back button provides the link back towards the mainpage.html. 

tutorial.html - This file hosts the tutorial walkthrough video, where users can see a prerecorded video from one of our members navigating through the site. 

styles.css - This file is the main CSS file in which hosts the css styling for the index, mainpage, quizpage and tutorial page. 

seedpage.css - This file hosts the css styling for the seedpage specifically. As there was more heavy styling required, to allow simple, easier and faster navigation to find the necessary attributes for this page. 

test.php - This file calls the flicker public feed and returns the url of each of the images given the assigned plant tag and turns url to jpeg files and returns images to the seedpage image source. 

script.js - This file hosts the javascript interactions of the whole website, this includes the animations for the navigation bar, the plant stage change, flip card function, global variable plant select function to track user interaction, existing functions, drag and drop function, congratulations message when plant is grown, dynamic weather bar and plant condition widget and seed page filtering. 


DECLARATION OF GENERATIVE AI USE: 
Chatgpt.com. (2024). ChatGPT. [online] Available at: https://chatgpt.com/# [Accessed 21 Oct. 2024].

Generative AI was mainly used for code debugging, syntax errors, code commenting, consulted a way to connect plant growing function to be relevant for all plants - identified a strategy to implement a variable to put in local storage through whole site (dataplant ID). Help create filter functions and assist with API intergration. 