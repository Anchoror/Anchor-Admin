module.exports = {
	plugins: ['stylelint-scss', 'stylelint-order'],
	customSyntax: 'postcss-html',
	extends: ['stylelint-config-standard-vue', 'stylelint-config-standard-scss', 'stylelint-config-rational-order'],
	overrides: [
		{
			files: ['**/*.{scss,css,sass}'],
			customSyntax: 'postcss-scss',
		},
	],
	rules: {
		'no-empty-source': null,
		'scss/at-import-partial-extension': null,
		'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['deep'] }],
		'selector-type-no-unknown': [true, { ignoreTypes: ['page'] }],
		'unit-no-unknown': [true, { ignoreUnits: ['rpx', 'rem', 'vw', 'vh'] }],
		'selector-class-pattern': null,
		'font-family-no-missing-generic-family-keyword': null,
		'no-descending-specificity': null,
	},
};
