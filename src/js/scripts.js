// Polyfill Array.from as Babel uses it when compiling spread
// See https://babeljs.io/docs/usage/caveats
if (typeof Array.from !== 'function') {
  require('core-js/fn/array/from')
}

import analytics from './modules/analytics'
import helloWorld from './modules/hello-world'

document.addEventListener('DOMContentLoaded', () => {
  analytics()
  helloWorld()
})
