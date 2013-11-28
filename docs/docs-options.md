### username
Type: `String`
Default: `assemble`

List repositories for the specified org. Using `src`, you must also pass an HTTP query string as a parameter, e.g. `repos?page=1&per_page=100`. This is done the way to keep the task light and flexible. (See the [Gruntfile](./Gruntfile.js) for examples).

### path
Type: `String`
Default: `/orgs/assemble/`

If you don't like how the task constructs the path by default, a custom path may be defined. Any custom parameters may be specified as segments in the path or passed as an HTTP query string parameter in the `src`.

### filterBy
Type: `String`
Default: `name`

The property to use to filter the collection. This option works in conjunction with `options.include` and `options.exclude`.

### exclude
Type: `String|Array`
Default: `undefined`

Keywords to use for excluding repos from the returned array. If the property defined using `filterBy` contains any values with excluded keywords, the repo will be omitted from the list.

### include
Type: `String|Array`
Default: `undefined`

Keywords to use for whitelisting repos in the returned array. Unless excluded, if the property defined using `filterBy` contains any values with these keywords, the repo will be included in the list.

### sortBy
Type: `String`
Default: `name`

The property by which to sort the collection.

### sortOrder
Type: `String`
Default: `asc`

The order in which to sort the collection.

### namespace
Type: `String`
Default: `"repos": []`

Add the list of repos to an array with the given property name. If left undefined, `"repos": []` will be used. Specify `false` if you don't want to add the array to a property.