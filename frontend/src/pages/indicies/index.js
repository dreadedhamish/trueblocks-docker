import React from 'react';
import Page from '../../components/page';
import IndiciesInner from './inner';

//----------------------------------------------------------------------
class Indicies extends React.Component {
  getInner = () => {
    var params = this.props.match.params.subpage || 'status/modes=index&details';
    params = params.replace('subpage=', '').replace('-', '/');  // weird cleanup
    return <IndiciesInner subpage={params} />;
  };

  render = () => {
    return <Page inner={this.getInner()} />;
  };
}
export default Indicies;