import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux';

import store from './configureStore';
import { IStateShape } from 'reducers';
import { IArcState } from 'reducers/arcReducer'
import { IWeb3State } from 'reducers/web3Reducer'

import * as arcActions from 'actions/arcActions';

import Header from "./components/Header/Header";
import HomeContainer from "./components/Home/HomeContainer";
import ViewDaoContainer from "./components/ViewDao/ViewDaoContainer";

interface IStateProps {
  arc: IArcState,
  web3: IWeb3State
}

const mapStateToProps = (state : IStateShape, ownProps: any) => ({
  arc: state.arc,
  web3: state.web3
});

interface IDispatchProps {
  connectToArc: typeof arcActions.connectToArc
}

const mapDispatchToProps = {
  connectToArc: arcActions.connectToArc
};

type IProps = IStateProps & IDispatchProps

class AppContainer extends React.Component<IProps, null> {

  constructor(props : IProps) {
    super(props);
  }

  componentDidMount () {
    this.props.connectToArc();
  }

  render() {
    const { web3 } = this.props;

    return (
      (web3.isConnected ?
        <div className='wrapper'>
          <Header web3={this.props.web3} />
          <Switch>
            <Route exact path="/" component={HomeContainer}/>
            <Route path="/dao/:dao_address" component={ViewDaoContainer}/>
          </Switch>
        </div>
        : <div>Loading...</div>
      )
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

