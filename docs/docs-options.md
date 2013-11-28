## path
Type: `String`
Default: `/orgs/assemble/`

List repositories for the specified org.

## filterBy
Type: `String`
Default: `name`

The property to use to filter the collection. This option works in conjunction with `options.include` and `options.exclude`.

## exclude
Type: `String|Array`
Default: `undefined`

Keywords to use for excluding repos from the returned array. If the property defined using `filterBy` contains any values with excluded keywords, the repo will be omitted from the list.

## include
Type: `String|Array`
Default: `undefined`

Keywords to use for whitelisting repos in the returned array. Unless excluded, if the property defined using `filterBy` contains any values with these keywords, the repo will be included in the list.

## sortBy
Type: `String`
Default: `name`

The property by which to sort the collection.

## sortOrder
Type: `String`
Default: `asc`

The order in which to sort the collection.