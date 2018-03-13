import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from '@/actions/index';

// import Bundle from '@/components/common/bundle';
// import loadAdd from 'bundle-loader?lazy&name=manage/[name]!./add';
// const Add = (props) => (
//   <Bundle load={loadAdd}>
//     {(Add) => <Add {...props} />}
//   </Bundle>
// )
import Add from '@/components/manage/add';
function mapStateToProps(state){
    const {articleInfo}=state;
    return {articleInfo};
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Add);