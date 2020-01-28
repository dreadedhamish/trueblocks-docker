import React from 'react';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

[{IMPORTS1}]
import { STATUS_TOGGLE, HELP_TOGGLE } from './components/SidePanel/reducers';
import { MAIN_MENU_TOGGLE } from './components/MainMenu/reducers';
import { MainMenu, StatusPanel, HelpPanel, PageHelp } from './components';
import Routes from './routes';
import './Content.css';

const mainMenu = [
[{NAVLINKS}]
];

const toggleStatus = () => ({ type: STATUS_TOGGLE });
const toggleHelp = () => ({ type: HELP_TOGGLE });
const toggleMainMenu = () => ({ type: MAIN_MENU_TOGGLE });

export function Content(props) {
  const { isStatusExpanded, isHelpExpanded, isMainMenuExpanded, toggleStatus, toggleHelp, toggleMainMenu } = props;

  const classNames = [
    'app-content',
    isMainMenuExpanded ? 'menu-expanded' : '',
    isStatusExpanded ? 'status-expanded' : '',
    isHelpExpanded ? 'help-expanded' : ''
  ].join(' ');

  return (
    <div className={classNames}>
      <MainMenu mainMenu={mainMenu} isExpanded={isMainMenuExpanded} toggle={toggleMainMenu} />
      <StatusPanel isExpanded={isStatusExpanded} toggle={toggleStatus} />
      <main>
        {Routes.map((route, index) => (
          <Route key={index} render={route.component} exact={route.exact} path={route.path} />
        ))}
      </main>
      <HelpPanel isExpanded={isHelpExpanded} toggle={toggleHelp}>
        <PageHelp />
      </HelpPanel>
    </div>
  );
}

const mapStateToProps = ({ reducer_SidePanels, reducer_MainMenu }) => ({
  isStatusExpanded: reducer_SidePanels.isStatusExpanded,
  isHelpExpanded: reducer_SidePanels.isHelpExpanded,
  isMainMenuExpanded: reducer_MainMenu.isMainMenuExpanded
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      toggleStatus,
      toggleHelp,
      toggleMainMenu
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Content);
