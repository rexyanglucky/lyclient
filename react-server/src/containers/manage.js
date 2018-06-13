import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Manage from '../components/manage/manage'
import Actions from '../actions';


function mapStateToProps(state) {
   const {articleList}=state;
  return {articleList};
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch)
}

// export default connect(mapStateToProps, mapDispatchToProps)(Counter)
export default connect(mapStateToProps,mapDispatchToProps)(Manage);
