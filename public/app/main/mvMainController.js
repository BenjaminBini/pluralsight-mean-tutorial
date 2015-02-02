angular.module('app').controller('mvMainController', function($scope) {
	$scope.courses = [
		{ name: 'C# for Sociotpaths', featured: true, published: new Date('1/1/2015') },
		{ name: 'C# for non-Sociotpaths', featured: true, published: new Date('2/1/2015') },
		{ name: 'Learn Java', featured: true, published: new Date('3/1/2015') },
		{ name: 'C for dummies', featured: true, published: new Date('4/1/2015') },
		{ name: '.NET made easy', featured: true, published: new Date('5/1/2015') },
		{ name: 'C/C++', featured: false, published: new Date('6/1/2015') },
		{ name: 'Java for web developers', featured: true, published: new Date('7/1/2015') },
		{ name: 'C', featured: false, published: new Date('8/1/2015') },
		{ name: 'Build a dynamic website with PHP', featured: false, published: new Date('9/1/2015') },
		{ name: 'Learn node.js', featured: false, published: new Date('10/1/2015') },
		{ name: 'The Javascript bible', featured: false, published: new Date('11/1/2015') },
	];
});