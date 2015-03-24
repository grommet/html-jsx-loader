# html-jsx-loader

Webpack loader module that exports HTML as [React](http://facebook.github.io/react/) JSX class.

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

## Examples

Add the **html-jsx-loader** to your Webpack configuration:

``` javascript
{
	...
	module: { 
		loaders: [
			{ test: /\.htm$/, loader: 'jsx-loader!imports?React=react!html-jsx-loader'}
		]},
		resolve: {
			extensions: ['', '.js', '.htm']
		}
	}
	...
}
```

Now you can write raw HTML (e.g. Introduction.htm) and webpack will automatically convert the content of this file to a React component.

Finally, you can reference this component in your JavaScript code as follows:

``` javascript
	var Introduction = require('./Introduction'); 

	//Introduction is not HTML but ReactJS class.
```