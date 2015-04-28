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

## Advanced Usage

### Grouping tags

If you would like the **html-jsx-loader** to group tags into separate react components, use the query **group=true**:

``` javascript
{
	...
	module: { 
		loaders: [
			{ test: /\.htm$/, loader: 'jsx-loader!imports?React=react!html-jsx-loader?query=true'}
		]},
		resolve: {
			extensions: ['', '.js', '.htm']
		}
	}
	...
}
```

Then you can refer to your components like this:

``` javascript
	var Introduction = require('./Introduction'); 
	var Header = Introduction.Header;
	var Section = Introduction.Section;
	
	//Section will contain all <section /> tags
```

### React Router integration

If you would like the **html-jsx-loader** to parse **<a/>** tags to React Router **<Link/>**, specify data-* inside your markup and the convertion will be done automatically:


``` html
<html>
	<body>
		<a data-style="[color: 'white']" data-activeStyle="[color: 'red']" to="user" params="[userId: user.id]" query="[foo: bar]">[user.name]</a>
	</body>
</html>
```

``` javascript
{
	...
	module: { 
		loaders: [
			{ test: /\.htm$/, loader: 'jsx-loader!imports?React=react,Router=react-router, Link=>Router.Link!html-jsx-loader?query=true'}
		]},
		resolve: {
			extensions: ['', '.js', '.htm']
		}
	}
	...
}
```
```

The only required attribute is **data-to**. If not provided, the current tag will remain unchanged.


