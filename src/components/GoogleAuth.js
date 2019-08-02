import React from 'react';
import {gapi} from 'gapi-script';

class GoogleAuth extends React.Component {
    state = { isSignedIn: null };
    componentDidMount() {
        gapi.load('client : auth2', () => {
            window.gapi.init({
                clientId:
                    '29382760076-9paiublshjcjvbcdq5snrcr16n2bobh3.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() })
    };

    onsignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (!this.state.isSignedIn) {
            return (
                <button
                    onClick={this.onSignInClick}
                    className="ui red google button">
                    <i className="ui loading" />
                    Loading...
                </button>);
        } else if (this.state.isSignedIn) {
            return (
                <button
                    onClick={this.onSignOutClick}
                    className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>);
        } else {
            return (
                <button
                    onClick={this.auth.signIn}
                    className="ui red google button">
                    <i className="google icon" />
                    Sign In
                </button>);
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

export default GoogleAuth;