import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
    // Switch
} from 'react-router-dom'
import axios from 'axios';
import config from '@/config';
import dataBlob from '@/lib/dataBlob';
import SimpleMDE from 'simplemde'
import marked from 'marked'
// import highlight from 'highlight.js'
import '@/css/add'
// import '../../../../node_modules/simplemde/dist/simplemde.min.css';
// import '../../../../node_modules/highlight.js/styles/atelier-cave-dark.css';
class Add extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        const {match,getArticleDetialAsync}=props;
        this.state = {
            title: '',
            content: '',
            author: 'rex',
            headImg: '',
            headImgBase64: '',
            headImgBase64Small: '',
            headImgFileName:'',
            isMD:false
        };
        this.isEdit=false;
        if(match&&match.params&&match.params.id&&getArticleDetialAsync){
            getArticleDetialAsync(match.params).then(()=>{
                // var info=store.
                // console.log(this.props.articleInfo);
                // if(window){
                //    alert(this.props.articleInfo);
                // }
                this.setState({...this.props.articleInfo})
                this.initSmde();
                
            });
            this.isEdit=true;
        }

        this.postData = new FormData();
        this.handleChange = this.handleChange.bind(this);
        this.saveArticle = this.saveArticle.bind(this);
        console.log(props);

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
        if(!this.isEdit){
          this.initSmde();
        }
    }
    initSmde(){
        // this.smde = new SimpleMDE({
        //     element: document.getElementById('content').childElementCount,
        //     autofocus: true,
        //     autosave: true,
        //     previewRender: function (plainText) {
        //         return marked(plainText, {
        //             renderer: new marked.Renderer(),
        //             gfm: true,
        //             pedantic: false,
        //             sanitize: false,
        //             tables: true,
        //             breaks: true,
        //             smartLists: true,
        //             smartypants: true,
        //             highlight: function (code) {
        //                 return highlight.highlightAuto(code).value;
        //             }
        //         });
        //         return plainText;
        //     }
        // })
    }
    /**
     * 保存文章
     */
    saveArticle() {
        let self = this;
        self.setState({ content: self.smde.value() });
        setTimeout(() => {
            // let param = self.state;
            self.postData.append('content', self.state.content);
            self.postData.append('title', self.state.title);
            if(this.isEdit&&!self.state.headImgFileName){
                self.postData.append('headImg', self.state.headImg);
            }
            else{
                self.postData.append('headImg', self.state.headImg,self.state.headImgFileName);
            }
            self.postData.append('author', self.state.author);
            self.postData.append('isMD', self.state.isMD);
            let param = self.postData;
            axios.post('https:'+config.url + "/article/add", param).then((response) => {
                if (response.data) {
                    let data = response.data.data;
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

            let size = file.size / 1024;
            if (size > 4 * 1024) {
                alert("文件超过4M");
                return false;
            }

            if (file && supportedTypes.indexOf(file.type) >= 0) {
                if (size >= 200) {//大于200K 进行压缩
                    let oReader = new FileReader();
                    oReader.onload = function (e) {
                        
                            let can = document.createElement("canvas");
                            let cxt = can.getContext("2d");
                            //加载图片获取图片真实宽度和高度  
                            var image = new Image();
                            image.onload = function () {
                                let width = image.width;
                                let height = image.height;
                                can.width = width;
                                can.height = height;
                                cxt.drawImage(image, 0, 0);
                                let dataUrl = can.toDataURL(file.type, 0.4);
                                let realData = dataBlob.dataURLtoBlob(dataUrl,file.name);

                                self.setState({ headImgBase64Small: dataUrl });
                                self.setState({ [name]: realData });
                                
                            };
                            image.src = e.target.result;
                    
                        self.setState({ headImgBase64: e.target.result });
                    }
                    oReader.readAsDataURL(file)
                }
                else {
                    self.setState({[name]:file});
                }
                //设置文件名字
                self.setState({ headImgFileName: file.name });
            }
            else { alert('只支持图片格式'); }
        }
        else {
            let value = target.type === "checkbox" ? target.checked : target.value;
            self.setState({ [name]: value });
            console.log(self.postData);
            // self.postData.set(name,value);


        }
    }
    render() {

        return (
            <div className='add_content'>
              <link rel="stylesheet" href="/static/markdownstyle/markdown.css"/>
            <link rel="stylesheet" href="/static/markdownstyle/haroopad/haroopad.css"/>
                <label htmlFor="headImg"></label>
                <input type="file" id="headImg" name="headImg"  onChange={this.handleChange} />

                <img src={this.state.headImgBase64} alt="" className='head_img_preview w100' />
                <img src={this.state.headImgBase64Small} alt="" className='head_img_preview w100' />
                <p>
                    <label htmlFor="title">标题</label>
                    <input id='title' name='title' value={this.state.title} onChange={this.handleChange}></input>
                </p>
                <p>
                    <input type="checkbox" name='isMD' checked={this.state.isMD} id="isMD" onChange={this.handleChange}/>
                    <label htmlFor="isMD">是否markDown文件</label>
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