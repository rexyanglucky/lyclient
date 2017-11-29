import React,{ Component }  from 'react'
import config from '../config';
import axios from 'axios';
class Article extends Component{
    constructor(props){
        super(props);
        this.state={
            articleInfo:{}
        }
    }
    componentDidMount(){
        let self =this;
        // console.log(self.props.location.search);
        // alert(this.props.location.search);
        let self = this;
        axios.get(config.url + "/article/list").then((response) => {
            // console.log(response);
            if (response.data) {
                let data = response.data.data;
                console.log(data);
                self.setState({ articleList: data });
            }
        });
        
    }
    
    render(){
        return  (
            <div>123</div>
        )
    }
    
}
export default Article;