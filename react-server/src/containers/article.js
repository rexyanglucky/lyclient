import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import  Actions from '../actions';
import Article from '@/components/article/article';



function mapStateToProps(state){
    const {articleInfo}=state;
    return {articleInfo};
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Article);