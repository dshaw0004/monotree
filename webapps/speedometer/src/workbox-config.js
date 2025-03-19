module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{png,html,json,js}'
	],
	swDest: 'serviceworker.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};
