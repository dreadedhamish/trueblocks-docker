//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Explore } from './dispatchers';

import { isError, NotReady, isEmpty, EmptyQuery } from '../../components';
import { isReady } from '../../components';
import { ObjectTable } from '../../components';
import * as utils from '../../utils';
import './explore.css';

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
class ExploreInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_submenu: props.cur_submenu
    };
    this.innerEar = this.innerEar.bind(this);
  }

  // EXISTING_CODE
  // EXISTING_CODE

  componentWillMount = () => {};

  componentDidMount = () => {
    this.innerEar('change_subpage', this.state.cur_submenu);
  };

  innerEar = (cmd, submenu) => {
    if (cmd === 'change_subpage') {
      // update the local state...
      this.setState({
        cur_submenu: submenu
      });
      // update the global state...
      this.props.dispatcher_Explore(submenu.route + '?' + submenu.query);
      return;
    }

    // EXISTING_CODE
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerMost = () => {
    if (isError(this.props)) return <NotReady {...this.props} />;
    else if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;
    else if (isEmpty(this.props.data)) return <EmptyQuery query={this.state.subpage} />;
    // EXISTING_CODE
    // EXISTING_CODE
    return <ObjectTable subpage="explore" data={this.props.data} innerEar={this.innerEar} />;
  };

  getInnerPage = () => {
    // EXISTING_CODE
    // EXISTING_CODE
    return <Fragment>{this.getInnerMost()}</Fragment>;
  };

  render = () => {
    return (
      <Fragment>
        <div className="inner-panel">
          <div className="title inner-page">{utils.breadCrumb('Explore', this.state.cur_submenu)}</div>
          {this.getInnerPage()}
        </div>
      </Fragment>
    );
  };
}

// EXISTING_CODE
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Status, reducer_Explore }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  sysConnected: reducer_Status.isConnected,
  sysError: reducer_Status.error,
  isLoading: reducer_Explore.isLoading,
  error: reducer_Explore.error,
  data: reducer_Explore.data,
  meta: reducer_Explore.meta
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      // EXISTING_CODE
      dispatcher_Explore
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreInner);