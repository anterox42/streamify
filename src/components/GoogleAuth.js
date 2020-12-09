import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '100185859043-8qp2n0uidfd7oq91pnvg57a4bah6gat0.apps.googleusercontent.com',
        scope: 'email'
      }).then(()=>{
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      })
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    switch (this.props.isSignedIn) {
      case true:
        return (
          <button onClick={this.onSignOutClick} className="ui lightgrey google button">
            <i className="google icon"></i>
            Sign Out
          </button>
        );
      case false:
        return (
          <button onClick={this.onSignInClick} className="ui red google button">
            <i className="google icon"></i>
            Sign In with Google
          </button>
        );
      default:
        return null;
    }
  };
  
  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    )
  }
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);