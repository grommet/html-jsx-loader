/**
* © Copyright [2015] Hewlett-Packard Development Company, L.P.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var should = require("should");

var loader = require("../");

describe("loader", function() {
	it("should convert to JSX", function() {
		loader.call({}, '<div>Hello World!</div>').should.be.eql(
			'module.exports = React.createClass({\n  render: function() {\n    return (\n<div>Hello World!</div>);\n}\n})\n;'
		);
	});

	it("should convert to JSX and group items", function() {
		loader.call({query: "?group=true"}, '<header>Hi Header!</header><section>h1</section><section>h2</section>').should.be.eql(
			'module.exports = {Header:React.createClass({\n  render: function() {\n    return (\n<header>Hi Header!</header>);\n}\n})\n,Section:React.createClass({\n  render: function() {\n    return (\n<div>\n        <section>h1</section><section>h2</section>\n      </div>);\n}\n})\n};'
		);
	});

	it("should parse images properly", function() {
		loader.call({query: "?group=true"}, '<section><img src="img/path_1.jpg" /></section><section><img src="img/path_2.jpg" /></section>').should.be.eql(
			'module.exports = {Section:React.createClass({\n  render: function() {\n    return (\n<div>\n        <section><img src=\"img/path_1.jpg\"/></section><section><img src=\"img/path_2.jpg\"/></section>\n      </div>);\n}\n})\n};'
		);
	});

	it("should parse br properly", function() {
		loader.call({}, '<section><br /> Testing!</section>').should.be.eql(
			'module.exports = React.createClass({\n  render: function() {\n    return (\n<section><br/> Testing!</section>);\n}\n})\n;'
		);
	});

	it("should convert to JSX using React Router simple", function() {
		loader.call({}, '<html><body><a data-to="testing">[user.name]</a></body></html>').should.be.eql(
			'module.exports = React.createClass({\n  render: function() {\n    return (\n<Link to=\"testing\">{user.name}</Link>);\n}\n})\n;'
		);
	});

	it("should convert to JSX using React Router complete", function() {
		loader.call({}, '<html><body><a data-style="[color: \'white\']" data-activeStyle="[color: \'red\']" data-params="[userId: user.id]" data-query="[foo:bar]" data-to="testing">Link Text</a></body></html>').should.be.eql(
			"module.exports = React.createClass({\n  render: function() {\n    return (\n<Link to=\"testing\" style={{color: 'white'}} activeStyle={{color: 'red'}} params={{userId: user.id}} query={{foo:bar}}>Link Text</Link>);\n}\n})\n;"
		);
	});
});