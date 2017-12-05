import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
    // Switch
} from 'react-router-dom'
import axios from 'axios';
import config from '../config';
import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'
import '../css/add'
import '../../../node_modules/simplemde/dist/simplemde.min.css';
import '../../../node_modules/highlight.js/styles/atelier-cave-dark.css';
class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            author: 'rex',
            headImg: '',
        };
        this.postData=new FormData();
        this.handleChange = this.handleChange.bind(this);
        this.saveArticle = this.saveArticle.bind(this);
        /*   this.simplemde = new SimpleMDE({
              autofocus: true,
              autosave: {
                  enabled: true,
                  uniqueId: "MyUniqueID",
                  delay: 1000,
              },
              blockStyles: {
                  bold: "__",
                  italic: "_"
              },
              element: document.getElementById("content"),
              forceSync: true,
              hideIcons: ["guide", "heading"],
              indentWithTabs: false,
              initialValue: "Hello world!",
              insertTexts: {
                  horizontalRule: ["", "\n\n-----\n\n"],
                  image: ["![](http://", ")"],
                  link: ["[", "](http://)"],
                  table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
              },
              lineWrapping: false,
              parsingConfig: {
                  allowAtxHeaderWithoutSpace: true,
                  strikethrough: false,
                  underscoresBreakWords: true,
              },
              placeholder: "Type here...",
              previewRender: function(plainText) {
                  // return customMarkdownParser(plainText); // Returns HTML from a custom parser
              },
              previewRender: function(plainText, preview) { // Async method
                  // setTimeout(function(){
                  //     preview.innerHTML = customMarkdownParser(plainText);
                  // }, 250);
          
                  return "Loading...";
              },
              promptURLs: true,
              renderingConfig: {
                  singleLineBreaks: false,
                  codeSyntaxHighlighting: true,
              },
              shortcuts: {
                  drawTable: "Cmd-Alt-T"
              },
              showIcons: ["code", "table"],
              spellChecker: false,
              status: false,
              status: ["autosave", "lines", "words", "cursor"], // Optional usage
              status: ["autosave", "lines", "words", "cursor", {
                  className: "keystrokes",
                  defaultValue: function(el) {
                      this.keystrokes = 0;
                      el.innerHTML = "0 Keystrokes";
                  },
                  onUpdate: function(el) {
                      el.innerHTML = ++this.keystrokes + " Keystrokes";
                  }
              }], // Another optional usage, with a custom status bar item that counts keystrokes
              styleSelectedText: false,
              tabSize: 4,
              toolbar: false,
              toolbarTips: false,
          }); */



    }
    componentDidMount() {
        this.smde = new SimpleMDE({
            element: document.getElementById('content').childElementCount,
            autofocus: true,
            autosave: true,
            previewRender: function (plainText) {
                return marked(plainText, {
                    renderer: new marked.Renderer(),
                    gfm: true,
                    pedantic: false,
                    sanitize: false,
                    tables: true,
                    breaks: true,
                    smartLists: true,
                    smartypants: true,
                    highlight: function (code) {
                        return highlight.highlightAuto(code).value;
                    }
                });
                return plainText;
            }
        })
    }
    /**
     * 保存文章
     */
    saveArticle() {
        let self = this;
        self.setState({ content: self.smde.value() });
        
        setTimeout(() => {
            // let param = self.state;
            self.postData.set('content', self.state.content);
            let param = self.postData;
            axios.post(config.url + "/article/add", param).then((response) => {
                if (response.data) {
                    let data = response.data.data;
                    console.log(data);
                    alert('保存成功');
                }
            });
        }, 0);

    }
    handleChange(event) {
        let self = this;
        let target = event.target;
        let name = target.name;
        if (target.type === "file") {
            let file = target.files[0];
            var supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
            if (file && supportedTypes.indexOf(file.type) >= 0) {
                let oReader = new FileReader();
                oReader.onload = function (e) {
                    self.setState({ headImg: e.target.result });
                }
                oReader.readAsDataURL(file)
                self.postData.set(name,file);
            }
            else{alert('只支持图片格式');}
        }
        else {
            let value = target.type === "checkbox" ? target.checked : target.value;
            self.setState({ [name]: value });
            self.postData.set(name,value);
          
        }
    }
    render() {

        return (
            <div className='add_content'>
                <label htmlFor="headImg"></label>
                <input type="file" id="headImg" name="headImg" onChange={this.handleChange} />
                <img src={this.state.headImg} alt="" className='head_img_preview w100'/>
                <p>
                    <label htmlFor="title">标题</label>
                    <input id='title' name='title' value={this.state.title} onChange={this.handleChange}></input>
                </p>
                <label htmlFor="content">正文内容</label>
                <textarea id='content' name='content' value={this.state.content} onChange={this.handleChange}></textarea>
                <p> <input type="button" value="保存" onClick={this.saveArticle} /></p>

                <Link to={{ pathname: '/manage' }} className="btn_add">返回列表</Link>
            </div>
        )
    }
}
export default Add;