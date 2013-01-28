describe("testing events", function () {
	it("events namespace is defined", function () {
		expect(Gauges.events.AppReady).toBeDefined();
		expect(Gauges.events.MeasuresUpdate).toBeDefined();
	});
});