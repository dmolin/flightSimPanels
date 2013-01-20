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


