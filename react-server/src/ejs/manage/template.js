const content = require('./content.ejs');
const css=require('./css.ejs');
const script=require('./script.ejs');
const layout = require('../common/layout.js')


module.exports = layout.mount({ self: content(),script:script(),css:css() });