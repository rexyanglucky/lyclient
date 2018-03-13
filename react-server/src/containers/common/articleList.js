import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ArticleList from '@/components/common/articleList';
import  Actions from '@/actions';

function mapStateToProps(state){
    const {articleList}=state;
    return {articleList};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ArticleList);

