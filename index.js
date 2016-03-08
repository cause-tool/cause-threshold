'use strict';

const versus = require('versus');


function main(step, context, config, input, done) {

	// has the threshold been crossed?
	const checkResult = versus(
		input,
		config.comparison,
		config.value
	);
	let decision = context.prepareDecision(checkResult);

	// trigger only once, when the threshold is reached,
	// otherwise it would keep on triggering.
	// TODO: make desired behavior configurable
	if (checkResult && step.data.triggered) {
		decision['if'] = false;
		decision['else'] = false;
	}

	// mark as triggered, or not
	step.data.triggered = checkResult;
	context.saveTask();

	const output = input;
	done(null, output, decision);
}


module.exports = {
	main: main,
	defaults: {
		config: {
			// value: 0,
			// comparison: '=='
		},
		data: {
			triggered: false
		},
		description: '<%=config.comparison%> <%=config.value%>'
	},
};
