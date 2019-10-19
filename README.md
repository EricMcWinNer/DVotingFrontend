# ![DVotingApp Logo](http://dneoagency.org/dvotingappassets/logo4.png)  DVotingApp Frontend 
 
![DVotingApp Dashboard](http://dneoagency.org/dvotingappassets/SCREENSHOT1.PNG)

**DvotingApp** is a prototype web application proposal to handle the Nigerian Presidential elections online built by Eric Aprioku as a final year project. The web application consists of a RESTful, stateless API built on Laravel on the server-side and a React application on the front-end. This repository contains the React application that holds the client-side of the application. This web application uses fingerprint verification and a password to verify the identity of users. The fingerprint is done using Secugen's Web API service. This service only works in Windows OS devices of version 7 and later, this service is needed to interface between the browser and the fingerprint reader.

This application allows users to create elections, with a start date-time and an end date-time, as well as create political parties and add candidates to these parties. The application automatically starts and ends the application at the set date and time. It would work in a browser and all activity to be performed by users would done via the browser.

The application has four roles a user could adopt. These roles are: **Voter, Candidate, Electoral Official and Polling Officer**. Every user is a voter by default, users are allowed to adopt only one more role to keep things free and fair.  An overview of these roles is given below:

1. **Voter**: All users are voters. Voters are allowed to participate and vote in elections. They are the most basic kind of users.

1. **Candidate**: Candidates are users who can be voted for in an election. All candidates would be selected by the electoral officials and a new candidate would be notified when he is made a new candidate. All candidates must belong to only one party per election. A candidate could further have two "roles" depending on the position he/she is campaigning for which are: President and Vice-President. All candidates must have only one role.

1. **Electoral Official**: Electoral Officials are in charge of managing the entirety of the election. As such, they have access to editing the information of the election, postponing the election, creating new officials, and polling officers, generating registration pins and viewing all the voters registered in the application.

1. **Polling Officer**: Polling officers are responsible for managing polling stations. Their duties are to register new voters as well as supervise voters during an election. **Only polling officers are allowed to register new voters.** The electoral officers can see all the voters a polling officer has registered. 

## Features of DVotingApp

### Automatic Elections

![DVotingApp Dashboard](http://dneoagency.org/dvotingappassets/SCREENSHOT2.PNG)

Elections as mentioned earlier are created by electoral officials. In this application only one election can exist at a given time. Elections have three defining properties; a **name**, a **start date-time** and an **end date-time** which **must** be defined by an electoral official when creating an election. An election has four states in it's life-cycle: **pending**, **ongoing**, **completed** and **finalized**. 
A pending election is one that has been created but whose start date-time is still in the future. During this time, candidates, polling officers, electoral officials, voters and parties can be added. This is the time to setup the election. To ensure this is obeyed, an election cannot be created if it's start date-time is less than one hour into the future. The minimum duration an election can run is one hour; meaning the end date-time of an election must be at least one hour greater than the start date-time. 
Once an election start date-time has been reached but it's end date-time is in the future, it is ongoing. During this time, new users cannot be registered, and candidates cannot be added until the election completes. A completed election is one whose end date-time has been reached. While the election is ongoing and while it is completed, its results are publicly available to all voters. 
A finalized election is one that has been finished and one can consider as dead. Elections are not finalized automatically, they have to be finalized by an electoral official. They cannot however be finalized until 24 hours after the election has ended. This is to ensure all voters have seen the results of the election. The moment an election is finalized, the results are trashed and become unavailable to all voters, the results remain in the database though.

### Confirmation/Registration Pins

![DVotingApp Dashboard](http://dneoagency.org/dvotingappassets/SCREENSHOT3.PNG)

Manually creating electoral officials and polling officers can quickly become a mundane, monotonous and painful task to do on the part of the electoral officials. In the 2019 elections, there were over 119,000 polling units all across the country. If each of these polling units had just three polling officers (which would probably not be the case) we could easily have over 357,000 polling officers to add to the system, minus the electoral officials. To fix this problem, I added the ability for electoral officials to create registration/confirmation pins which can be  given to polling officers who can then register remotely. An electoral official can create up to 100,000 pins at a given time. There are two kinds of registration pins to be used by electoral officials and polling officers.

![DVotingApp Dashboard](http://dneoagency.org/dvotingappassets/SCREENSHOT4.PNG)

### Easy Online Registration

![RegistrationVideo](http://dneoagency.org/dvotingappassets/RegistrationFingeprints.gif)

As mentioned earlier, polling officers and electoral officials can easily create an account online once they have a registration/confirmation pin as seen in the snapshot above. To prevent the system from being spammed however, voters have to be registered by polling officers. All polling officers have access to a similar page where they can register voters. Users' pictures could either be uploaded to the site or captured there at the time of registration via webcam. Users' fingerprints would also be captured at the time of registration via fingerprints. This application currently supports a handful of Secugen fingeprint readers and works with the Secugen Web API service. Because of this, the fingerprint feature is limited to Windows OS devices and the systems have to install the Secugen service to interface between the hardware and the browser. 

### Remote Voting

![DVotingApp Dashboard](http://dneoagency.org/dvotingappassets/Voted.gif)

While registration must be done by polling officers, voting must not. Anybody with an internet connection and a fingerprint reader can stay wherever they are and participate in the elections and if they do not have access to a computer, the internet and a fingerprint reader, then they can go to polling stations and register via Polling Officers. In order to vote, one would need the password to his account and his fingerprint to verify his identity. During registration the prints of the index and thumb of both hands are stored in the database, the matching during voting is systematically done across the four prints before voting is processed.

### Automatic Counting and Real-time Results

![DVotingApp Dashboard](http://dneoagency.org/dvotingappassets/DVotingApp_ElectionResults-Googl.gif)

This application also has a feature to allow all users to see the results of the election in real-time. The results are calculated automatically and displayed even as the election is ongoing. It shows the number of votes and distribution of votes and this can be filtered to show votes from different states and local governments as seen above.

## Resources

* All colored icons (including the logo) used in this project were gotten from [FlatIcon](http://flaticon.com)
* All dark icons were gotten from [FontAwesome](http://fontawesome.com)
* The sidebar background image and the login page's background image were both gotten from [Unsplash](http://unsplash.com)
* The 404 error page background image was gotten from [Freepik](http://freepik.com)
* Thanks to all the Open-Source authors and packages on top of which this application was built

## Disclaimer
* This is a prototype and there is a lot of room for improvement.
* This is a demo so it contains dummy data.
* A link to an online demo would probably be available sometime in the future upon request, I will update this README when it becomes available.
* If you want to set it up in your PC and need help you can contact me.
* With the exception of the open source packages used, the rest of the dashboard UI and application were built ground-up from scratch.
* Because of the service required to interface with fingerprint readers, this web application only works on Windows 7 OS or later and a handful of Secugen fingerprint readers.


You can find a link to the API [here](http://github.com/EricMcWinNEr/DVotingAPI)





