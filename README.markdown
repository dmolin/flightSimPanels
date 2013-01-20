Flight Simulator Panels
======================

### See your Flight Simulator Instrument Panels from your browser! ###

![Example of FlightSimPanels running in a connected browser](https://raw.github.com/dmolin/flightSimPanels/master/README/flightsimpanels.png)


### Prerequisites for the developer ###

In order to successfully run this code you need to have:
- A copy of X-Plane (* optional * you can download a free Demo from the [X-Plane](http://www.x-plane.com) website)
	the Flight Simulator has to be configured as the pictures below, in the Architecture paragraph, show.
- node and npm installed on your machine and available in your path
- phantomjs installed (it's not possible to have it installed automatically by grunt, sorry)

Then, clone the repository, cd into the flightSimPanels folder and run

`npm install`

This will globally install "grunt-cli" (the command line version of Grunt) and create the node_modules folder.
You're ready to go! Just run

`grunt` (or `grunt dev`)

And your server will be already up and running, waiting for packets from the Flight Simulator.

Even without having X-Plane installed and running, you will be able to open your browser on:

`http://localhost:3000/`

And see the instrument panels widgets running and waiting for IO updates..


#### Note for MS Windows users ####

Sorry dudes, Windows is a nice toy for playing games and stuffs, but it's not a tool for Web Developers; If you are on a Windows machine, you'll have to use "Cygwin" (good luck with that) or do youserlf a favor and buy a Mac or install Linux..


### Inception ###

This (ongoing) project was born out of the necessity of overcoming the actual limitations of the best Flight Simulator around: [X-Plane](http://www.x-plane.com).

![X-Plane in Action!](https://raw.github.com/dmolin/flightSimPanels/master/README/x-plane.png)

One of the problems of X-Plane is the limitation in running multi-monitor configurations on a single computer. Even running networked computers with multiple licenses of the Flight Simulator is a real problem, especially when using not top-notch computers (like small laptops).

Sometimes we'd like to use our second computer only to display the aeroplane instrument panels, leaving the main computer dealing with the scenery, but that's not currently possible (the external computer has to run a full version of the flight sim and die of a horrible death with its small CPU..)

From this necessity came "Flight Simulator Panels" :)

It's a small combination of Web enabling technologies to show the aeroplane instrument panels on networked devices (Computers/Tablets/Mobile phones!) using a recent Canvas/Websocket enable browser (latest Chrome/Safari/Firefox will do).

### Architecture ###

The Architectural diagram is pretty simple:

![Deadly simple Architectural diagram](https://raw.github.com/dmolin/flightSimPanels/master/README/architecture.png)

X-Plane allows to configure sending its data through a UDP port at specific intervals per second. Through its configuration panels you can choose what information to send and how often (how many times per second):

![X-Plane Data Output configuration](https://raw.github.com/dmolin/flightSimPanels/master/README/xplane-data-io.png)

![X-Plane Data receiver configuration](https://raw.github.com/dmolin/flightSimPanels/master/README/xplane-network-panel.png)

### Code Architecture ###

The codebase is organized around these technologies/frameworks:

#### Backend ####

- Node.js with Railway (soon to be moved to a simpler Express)
- Websockets via Socket.IO
- Pluggable component architecture with automatic discovery of new widgets

The Server is run by the Railway framework, simplifying the serving of dynamic pages with the addition of a templating engine, routing and an easy to grasp MVC-based architecture.
Socket.IO is used to communicate in realtime with connected browsers and send them periodic updates.
Each time a packet is received from the Flight Simulator, the raw binary data is transformed into a complete JSON packet and sent over the Websocket channels to all connected clients.

The data transformation process is realized by a set of "measure" components; These components are dynamically discovered and loaded by the src/app/component/measures/ folder by a "Measure" factory (/src/app/components/Measures.js).

Each one of these component map a specific instrument panel into a corresponding JSON data object.
Each component carries on also a 'client-side' part (its "view"), provided by its "./client/" subfolder; that folder contains the code that will be packaged, minified and sent to the connected browsers, and executed as a client widget.

![Components](https://raw.github.com/dmolin/flightSimPanels/master/README/components.png)

#### Frontend ####

- Railway (frontend js files - bootstrap.js/rails.js)
- modernizr
- Tash! Pub/Sub library (see my other project [Tash!](https://github.com/dmolin/tash))
- HTML5/Canvas (used to render the instrument panels) with [EaselJS](http://www.createjs.com/#!/EaselJS)
- Component architecture via widgets received by the Node.js server

Each client retrieves much of its logic from the server, with the following call:

http://`<node.js server address>`:3000/widget/code

That URL map to a Railway controller that load all of the "measure" components client subfolders, minifies their content and send the payload to the client. 

![Client code](https://raw.github.com/dmolin/flightSimPanels/master/README/client-code.png)

### Build with Grunt ###

I've been recently playing with Grunt in my latest gig and I was eager to use it again in other projects. 
I really love Grunt; I love its task based nature; it reminds me of my beloved Ant and it's really easy to grasp and leverage. Moreover, there's node and a LOT of ready-made plugins already available at your fingertips to do nearly EVERYTHING you want. Writing code to zip files, minify, collect, organize folders is deadly easy. It's really difficult to think about NOT using it after you make your feet wet with Grunt ;)

### Unit Testing with Jasmine and PhantomJS ###

This is a beast I'm still dealing with.
Writing tests with Jasmine is pretty straightforward and it's quite easy to become addicted to that. The tough part is to fit Jasmine/PhantomJS into the whole server architecture.
My initial stake was to run the Jasmine tests into the same server used to serve the website, in order to have the Selenium Acceptance tests already for free...  It's proving to be not-so-easy as expected.
I'll likely move to a simple httpd-based server for serving Unit tests soon (the code is still in writing atm).

