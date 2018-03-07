const content = require('./content.ejs');
const layout = require('./layout.js')
// alert(content());
console.log(content());
module.exports = layout.mount({ self: content() });
