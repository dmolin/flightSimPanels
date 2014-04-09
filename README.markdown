Flight Simulator Panels
======================

### See your Flight Simulator Instrument Panels from your browser! ###

![Example of FlightSimPanels running in a connected browser](https://raw.github.com/dmolin/flightSimPanels/master/assets/flightsimpanels.png)

See the Code in action in a Browser connected with a Flight Simulator (X-Plane):

[![ScreenShot](https://raw.github.com/dmolin/flightSimPanels/master/assets/techdemo.png)](https://vimeo.com/60944060)

### Inception ###

This (ongoing) project was born out of the necessity of overcoming the actual limitations of the best Flight Simulator around: [X-Plane](http://www.x-plane.com).

![X-Plane in Action!](https://raw.github.com/dmolin/flightSimPanels/master/assets/x-plane.png)

One of the problems of X-Plane is the limitation in running multi-monitor configurations on a single computer. Even running networked computers with multiple licenses of the Flight Simulator is a real problem, especially when using not up2date hardware (like small or not recent laptops, without GPU or with a limited CPU power).

When using the flight Simulator, a big part of the display view is taken by the aeroplane cockpit; not much space is left for the visual of the scenery outside the cabin windows. Many phisical add-ons solution are made to bring part of the cockpit outside the screen, on the desk of the flight simmer, like the Saitek add-ons:
![Saitek yoke and panels](https://raw.github.com/dmolin/flightSimPanels/master/assets/saitek-panels.jpg)

The ideal, in this regard, should be to 'remove' the cockpit from the monitor view and use the maximum monitor real estate only for rendering the scenery. A much more cost effective option, to avoid spending a lot of money buying a lot of external hardware, is to simply 'move' the cockpit instrument panels out of the screen into a separate monitor:

![Instrument monitor](http://www.shetland.flyer.co.uk/multiplayer/pics/cockpit_3.jpg)

That's not currently possible with X-Plane; Multi monitor configuration are not possible and displaying the panels onto the screen of a networked computer is prohibitive, since the connected computer has to run a full copy of the flight sim and thus meet the minimum requirements in terms of memory, CPU and GPU.

From this necessity came "Flight Simulator Panels" :)

It's a small combination of Web enabling technologies to show the aeroplane instrument panels on networked devices (Computers/Tablets/Mobile phones!) using only a recent Canvas/Websocket enable browser (latest Chrome/Safari/Firefox will do). The advantage here is you can avoid running a copy of X-Plane on that computer/device; Only a simple recent browser will suffice.

### Prerequisites for the developer ###

In order to successfully run this code you need to have:
- A copy of X-Plane (* optional * you can download a free Demo from the [X-Plane](http://www.x-plane.com) website)
	the Flight Simulator has to be configured as the pictures below, in the Architecture paragraph, show.
- node and npm installed on your machine and available in your path

Then, clone the repository, cd into the flightSimPanels folder and run

`npm install`

- Install the command line version of Grunt
This is a dependency and the best is for you to do that. Please, ensure a fairly recent version of the command line interface is installed (version > 0.1.10). Run the following command:

'npm install -g grunt-cli'

This will globally install "grunt-cli" (the command line version of Grunt); If you want to keep it local to this project, then remove the "-g" but keep in mind that the 'grunt' executable then won't be in your path; you'll find it under ./node-modules/.bin/

You're ready to go! Just run

`grunt` (or `grunt dev`)

And your server will be already up and running, waiting for packets from the Flight Simulator.

Even without having X-Plane installed and running, you will be able to open your browser on:

`http://localhost:3000/`

And see the instrument panels widgets running and waiting for IO updates..

#### Testing the server from the command line ####

An easy way to run tests on the server and check everything's working smooth is to simply run the server (running 'grunt') and then open another console, head to the ./test-scripts folder and then run one of the shell scripts you'll find there.
Each shell script will issue a series of network requests to a specific test URL in the server, simulating data coming from a fictitious installation of X-Plane. This is tremendoulsy useful when implementing a new instrument panel.


#### Note for MS Windows users ####

Sorry dudes, Windows is a nice toy for playing games and stuffs, but it's not a tool for Web Developers; If you are on a Windows machine, you'll have to use "Cygwin" (good luck with that) or do youserlf a favor and buy a Mac or install Linux..


### Architecture ###

The Architectural diagram is pretty simple:

![Deadly simple Architectural diagram](https://raw.github.com/dmolin/flightSimPanels/master/assets/architecture.png)

X-Plane allows you to configure sending its data through a UDP port to an external computer, at specific intervals per second. Through its configuration panels you can choose what information to send and how often (how many times per second):

![X-Plane Data Output configuration](https://raw.github.com/dmolin/flightSimPanels/master/assets/xplane-data-io.png)

![X-Plane Data receiver configuration](https://raw.github.com/dmolin/flightSimPanels/master/assets/xplane-network-panel.png)

The purpose of this feature is probably to drive external hardware or training stations but nothing prevent us to use this feature to simply drive an external computer displaying the cockpit instrument panels!

### Code Architecture ###

The codebase is organized around these technologies/frameworks:

#### Backend ####

- Node.js with Express
- Websockets via Socket.IO
- Pluggable component architecture with automatic discovery of new widgets

The Server is run by the Railway framework, simplifying the serving of dynamic pages with the addition of a templating engine, routing and an easy to grasp MVC-based architecture.
Socket.IO is used to communicate in realtime with connected browsers and send them periodic updates.
Each time a packet is received from the Flight Simulator, the raw binary data is transformed into a complete JSON packet and sent over the Websocket channels to all connected clients.

The data transformation process is realized by a set of "measure" components; These components are dynamically discovered and loaded by the src/app/component/measures/ folder by a "Measure" factory (/src/app/components/Measures.js).

Each one of these component map a specific instrument panel into a corresponding JSON data object.
Each component carries on also a 'client-side' part (its "view"), provided by its "./client/" subfolder; that folder contains the code that will be packaged, minified and sent to the connected browsers, and executed as a client widget.

![Components](https://raw.github.com/dmolin/flightSimPanels/master/assets/components.png)

#### Frontend ####

- modernizr
- Tash! Pub/Sub library (see my other project [Tash!](https://github.com/dmolin/tash))
- HTML5/Canvas (used to render the instrument panels) with [EaselJS](http://www.createjs.com/#!/EaselJS)
- Component architecture via widgets received by the Node.js server

Each client retrieves much of its logic from the server, with the following call:

http://`<node.js server address>`:3000/widget/code

That URL map to an Express endpoint that load all of the "measure" components client subfolders, minifies their content and send the payload to the client.

![Client code](https://raw.github.com/dmolin/flightSimPanels/master/assets/client-code.png)

### Build with Grunt ###

I've been recently playing with Grunt in my latest gig and I was eager to use it again in other projects.
I really love Grunt; I love its task based nature; it reminds me of my beloved Ant and it's really easy to grasp and leverage. Moreover, there's node and a LOT of ready-made plugins already available at your fingertips to do nearly EVERYTHING you want. Writing code to zip files, minify, collect, organize folders is deadly easy. It's really difficult to think about NOT using it after you make your feet wet with Grunt ;)

### Unit Testing with mocha and Supertest ###

Unit tests have been written with mocha and Supertest.
A basic setup is in place, with just a couple of tests to check the process is working the right way.
Expect much more in the near future...
