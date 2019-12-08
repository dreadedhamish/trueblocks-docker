import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scraper_reducer } from './scraper-getdata';

import Loading from '../z_components/loading';
import PageNotes from '../z_components/page-notes';

const ScraperInner = (props) => {
  let status;
  if (props.isLoading) {
    status = 'loading';
  }

  if (props.error) {
    status = 'error';
  } else if (props.systemData.caches === undefined) {
    status = 'initializing';
  } else {
    status = 'ready';
  }

  let container;
  switch (status) {
    case 'ready':
      container = (
        <div className="inner-panel">
          <h4 className="inner-panel">Scraper Group 1</h4>
          <ul>
            <li>Item 1 1</li>
            <li>Item 1 2</li>
          </ul>
          <h4 className="inner-panel">Scraper Group 2</h4>
          <ul>
            <li>Item 2 1</li>
            <li>Item 2 2</li>
          </ul>
        </div>
      );
      break;
    case 'initializing':
      container = <Loading status={status} message="Initializing..." />;
      break;
    case 'error':
      container = <Loading status={status} message={props.error} />;
      break;
    default:
      container = <Loading status={status} message="Loading..." />;
  }
  return (
    <div className="right-panel">
      <div>
        <h1>
          Address Scraper
          <PageNotes
            text="The Address Scraper scans mainnet from its origin, visiting each block. Within each block, it visits each transaction
            and within each transaction, it visits each receipt, each log, and each trace extracting &lt;address appearances&gt; and building the Address Index."
          />
        </h1>
        {container}
      </div>
    </div>
  );
};

const mapStateToProps = ({ reducer_SystemStatus, Scraper_reducer }) => ({
  systemData: reducer_SystemStatus.systemData,
  isLoading: reducer_SystemStatus.isLoading,
  error: reducer_SystemStatus.error
  // indexData: Scraper_reducer.indexData,
  // loadingIndex: Scraper_reducer.isLoading
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      Scraper_reducer
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScraperInner);