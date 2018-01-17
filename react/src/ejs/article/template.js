const content = require('./content.ejs');
const layout = require('../common/layout.js')

module.exports = layout.mount({ self: content() });