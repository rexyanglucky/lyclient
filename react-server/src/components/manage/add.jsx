import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
    // Switch
} from 'react-router-dom';
import axios from 'axios';
import config from '@/config';
import dataBlob from '@/lib/dataBlob';
import util from '@/lib/util';
import { publicArticle, getCategoryList, getTopicsList,saveArticleDraft } from '@/api/article';
import marked from 'marked';
import Checkbox from "@/components/common/lui/checkbox.jsx";
// import highlight from 'highlight.js'
import '@/css/add'
// import '../../../../node_modules/highlight.js/styles/atelier-cave-dark.css';
class Add extends Component {
    constructor(props) {
        super(props);
        // console.log(props);
        const { match, getArticleDetialAsync } = props;
        this.state = {
            title: '',   //标题
            content: '', //内容
            author: 'rex', //作者
            headImg: '',   //文章头部图片
            headImgBase64: '',
            headImgBase64Small: '', //压缩图片
            headImgFileName: '',//图片文件名
            isMD: false,//是否是markdown
            category: '',//分类 前端，后端，运维，数据库，生活,
            categoryName: '',//分类 前端，后端，运维，数据库，生活
            topics: [],  //标签 react vue reactnative mysql
            categroyList: [],
            topicsList: [],
            _id:''
        };
        this.isEdit = false;
        if (match && match.params && match.params.id && getArticleDetialAsync) {
            getArticleDetialAsync(match.params).then(() => {
                typeof this.props.articleInfo.topics === 'string' ? JSON.parse(this.props.articleInfo.topics) : this.props.articleInfo.topics;
                this.setState({ ...this.props.articleInfo })
                this.initSmde();

            });
            this.isEdit = true;
        }

        this.postData = new FormData();
        this.handleChange = this.handleChange.bind(this);
        this.saveArticleDraft = this.saveArticleDraft.bind(this);
        this.public = this.public.bind(this);
    }
    componentDidMount() {
        if (!this.isEdit) {
            this.initSmde();
        }
        this.initControl();
    }
    initSmde() {
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
    initControl() {
        const self = this;
        getTopicsList().then((result) => {
            self.setState({ topicsList: result.data });
        });
        getCategoryList().then((result) => {
            self.setState({ categroyList: result.data });
        })

    }
    /**
     * 保存草稿箱
     */
    saveArticleDraftPromise() {
        let self = this;
        self.setState({ content: self.smde.value() });
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                self.postData.append('content', self.state.content);
                self.postData.append('title', self.state.title);
                if (self.state.headImg)
                    if (this.isEdit && !self.state.headImgFileName) {
                        self.postData.append('headImg', self.state.headImg);
                    }
                    else {
                        self.postData.append('headImg', self.state.headImg, self.state.headImgFileName);
                    }
                self.postData.append('author', self.state.author);
                self.postData.append('isMD', self.state.isMD);
                self.postData.append('category', self.state.category);
                const categoryItem= self.state.categroyList.find(item => item.code == self.state.category);
                self.postData.append('categoryName',categoryItem?categoryItem.name:"");
                self.postData.append('topics', JSON.stringify(self.state.topics));
                // self.postData.append('topics', self.state.topics);
                if(self.state._id){
                   self.postData.append('_id',self.state._id)
                }
                let param = self.postData;
                let p = saveArticleDraft(param);
                // let p = axios.post(config.url + "/article/addDraft", param);
                resolve(p);
            }, 0);
        })

    }
    saveArticleDraft() {
        const self = this;
        let f = this.saveArticleDraftPromise()
            .then(response => {
                if (response.code === 1) {
                    let data = response.data;
                    util.alert('保存草稿成功');
                } else {
                    util.alert('保存失败');
                }
            });
    }

    //发布
    public() {
        this.saveArticleDraftPromise().then((response) => {
            if (response.code === 1) {
                const id = response.data[0];
                const param = { id };
                publicArticle(param).then((r) => {
                    if (r.code === 1) {
                        util.alert('发布成功');
                    } else {
                        util.alert('发布失败');
                    }
                });
            } else {
                util.alert('保存失败');
            }

        });
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
                util.alert("文件超过4M");
                return false;
            }

            if (file && supportedTypes.indexOf(file.type) >= 0) {

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
                        let dataUrl = '';
                        if (size >= 200) {//大于200K 进行压缩
                            dataUrl = can.toDataURL(file.type, 0.4);
                        } else {
                            dataUrl = can.toDataURL(file.type);
                        }
                        let realData = dataBlob.dataURLtoBlob(dataUrl, file.name);
                        self.setState({ headImgBase64Small: dataUrl });
                        self.setState({ [name]: realData });
                    };
                    image.src = e.target.result;
                    self.setState({ headImgBase64: e.target.result });
                }
                oReader.readAsDataURL(file)
                //设置文件名字
                self.setState({ headImgFileName: file.name });
            }
            else { util.alert('只支持图片格式'); }
        }
        else {
            let value = target.type === "checkbox" ? target.checked : target.value;
            self.setState({ [name]: value });
        }
    }
    handleTopic({ check, value, label }) {
        let t = this.state.topics;
        if (check) { t.push(label); }
        else { t.splice(t.indexOf(label), 1); }
        this.setState({ topics: t })
    }
    render() {
        return (
            <div className='add_content'>
                {this.state.topics.map(item => <p key={item}>{item}</p>)}
                <link rel="stylesheet" href="/static/markdownstyle/markdown.css" />
                <link rel="stylesheet" href="/static/markdownstyle/haroopad/haroopad.css" />
                <label htmlFor="headImg"></label>
                <input type="file" id="headImg" name="headImg" onChange={this.handleChange} />
                <img src={this.state.headImgBase64Small} alt="" className='head_img_preview w100' />
                <p>
                    <label htmlFor="title">标题</label>
                    <input id='title' name='title' value={this.state.title} onChange={this.handleChange}></input>
                </p>
                <p>
                    <input type="checkbox" name='isMD' checked={this.state.isMD} id="isMD" onChange={this.handleChange} />
                    <label htmlFor="isMD">是否markDown文件</label>
                </p>
                <label htmlFor="content">正文内容</label>
                <textarea id='content' name='content' value={this.state.content} onChange={this.handleChange}></textarea>
                <select name="category" id="category" onChange={this.handleChange}>
                    {this.state.categroyList.map(item => (<option key={item.code} value={item.code}>{item.name}</option>))}
                </select>
                <div className="topic-warp">
                    <div>
                        {
                            this.state.topicsList.map(item =>
                            {
                                return (<span className="topic-item" key={item.code}><Checkbox check= {(this.state.topics.indexOf(item.name)>-1)} clickCallback={this.handleTopic.bind(this)} label={item.name} value={item.code}>{item.name}</Checkbox></span>);
                            })
                        }

                    </div>
                </div>
                <p>
                    <input type="button" value="保存为草稿" onClick={this.saveArticleDraft} />
                    <input type="button" value="保存并发布" onClick={this.public} />
                </p>

                <Link to={{ pathname: '/manage' }} className="btn_add">返回列表</Link>
            </div>
        )
    }
}
export default Add;