# express-pjaxify

**Express middleware to [pjaxify](http://pjax.heroku.com/) your views.**

## Installation

```bash
$ npm i -S express-pjaxify
```

## Usage

Setup the middleware:

```js
var app = require('express')();
var pjaxify = require('express-pjaxify');
app.use(pjaxify());
```

## Options

### Option: `strategy`

Setup the strategy: `layout` or `view`.

* The `layout` strategy dynamically injects a `layout` variable into view context
* The `view` strategy dynamically render a view with or without pjax support

#### `layout` strategry example

Let's take an example with [Nunjucks](http://mozilla.github.io/nunjucks/) template engine.

The `layout.html` file (for regular requests):

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>
      {% block title %}
      {% endblock %}
    </title>
    <link rel="stylesheet" href="/app.css">
  </head>
  <body>
    <div id="pjax-container">
      {% block content %}
      {% endblock %}
    </div>
  </body>
</html>
```

The `layout.pjax.html` file (for pjax requests):

```html
<title>
  {% block title %}
  {% endblock %}
</title>

{% block content %}
{% endblock %}
```

The `page.html` file:

```html
{% extends layout %}
{% block title %}My Page{% endblock %}
{% block content %}<p>My page content.</p>{% endblock %}
```

Now, let's render the view with the provided `pjax` aware render function:

```js
app.use(pjaxify({strategy: 'layout'}));

app.get('/page', function(req, res) {
  res.pjax('page.html', {layout: 'layout.html'});
});
```

If the current request is pjax, `{layout: 'layout.html'}` will be auto-magically
replaced by `{layout: 'layout.pjax.html'}`. You can override the pjax template
name via the `pjaxViewFormat` option.

#### `view` strategy example

Let's take an example with [Swig](https://github.com/paularmstrong/swig) template engine.

The `layout.html` file (for regular requests):

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>
      {% block title %}
      {% endblock %}
    </title>
    <link rel="stylesheet" href="/app.css">
  </head>
  <body>
    <div id="pjax-container">
      {% block content %}
      {% endblock %}
    </div>
  </body>
</html>
```

The `layout.pjax.html` file (for pjax requests):

```html
<title>
  {% block title %}
  {% endblock %}
</title>

{% block content %}
{% endblock %}
```

The `page.html` file (for no-pjax requests):

```html
{% extends "layout.html" %}
{% block title %}My Page{% endblock %}
{% block content %}<p>My page content.</p>{% endblock %}
```

The `page.pjax.html` file (for pjax requests):

```html
{% extends "layout.pjax.html" %}
{% block title %}My Page{% endblock %}
{% block content %}<p>My page content.</p>{% endblock %}
```

Now, let's render the view with the provided `pjax` aware render function:

```js
app.use(pjaxify({strategy: 'view'}));

app.get('/page', function(req, res) {
  res.pjax('page');
});
```

If the current request is pjax, the `pjax` function will render `page.pjax.html`
instead of `page.html`. You can override the pjax template name via the
`pjaxViewFormat` option.

### Option: `pjaxHeader`

The pjax HTTP header name.

Defaults to `X-PJAX`.

### Option: `isPjaxKey`

The key name that will be both injected in the Express `Request` object and
in the view context, containing either `true` or `false depending on the current
request type (pjax or not).

Defaults to `isPjax`.

### Option: `layoutKey`

Only used with the `layout` strategy.

The key name that contains the layout file path.

Defaults to `layout`.

### Option: `defaultLayout`

Only used with the `layout` strategy.

The default layout to inject in view context if `layout` is not set.

Defaults to `layout.html`.

### Option: `pjaxViewFormat`

The format used to dynamically set the pjax view based on the regular one.
It will respectively replace `{name}` and `{ext}` by your view
name and extension, using Node's [Path](http://nodejs.org/api/path.html)
API. For example: `my-awesome-layout.html` with `{name}-pjax{ext}` will be named
`my-awesome-layout-pjax.html`.

Defaults to `{name}.pjax{ext}`.

### Option: `renderName`

The render function name attached to Express `Response` object.

Defaults to `pjax`.
