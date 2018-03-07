const content = require('./content.ejs');
const layout = require('../common/layout.js')
console.log(content());
module.exports = layout.mount({ self: content() });
