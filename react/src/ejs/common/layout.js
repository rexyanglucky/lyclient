const footer = require("./footer.ejs");
const header = require("./header.ejs");
const layout = require("./layout.ejs");

const htmlChunck = {
    footer: footer(),
    header: header()
}

module.exports = {
    basehtmlChunck: {
        footer: footer(),
        header: header()
    },
    //挂载
    mount(renderData) {
        let realRenderData = Object.assign(renderData, htmlChunck);
        return layout(realRenderData);
    }
}
// module.exports = layout(htmlChunck);



