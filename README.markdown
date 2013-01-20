Flight Simulator Panels
======================

### See your Flight Simulator Instrument Panels from your browser! ###

![Example of FlightSimPanels running in a connected browser](https://raw.github.com/dmolin/flightSimPanels/master/README/flightsimpanels.png)

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

http://<node.js server address>:3000/widget/code

That URL map to a Railway controller that load all of the "measure" components client subfolders, minifies their content and send the payload to the client. 

![Client code](https://raw.github.com/dmolin/flightSimPanels/master/README/client-code.png)
