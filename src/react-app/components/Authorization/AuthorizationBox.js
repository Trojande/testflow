/**
 * Created by trojande on 9/3/17.
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { setCookie } from '../../helpers';
import {
    sendLoginData,
    checkLoginData,
} from '../../actions';

type LoginState = {
    login: ?string,
    password: ?string,
    error: ?string,
};
type Props = {
  sendLoginData: Function,
};
class AuthorizationBox extends PureComponent<Props> {
  constructor(...args) {
    super(...args);
    this.state = {
      login: null,
      password: null,
      error: null,
    };
  }
  setLoginState = (fieldName: 'login' | 'password', value: string): void => {
    this.setState({
      [fieldName]: value,
    });
  };
  onFieldChange = (e: Event): void => {
    const { field: fieldName }: string = e.target && e.target.dataset;
    const { value }: string = e && e.target;
    this.setLoginState(fieldName, value);
  };
  sendDataHandler: void = () => {
    const {
      sendLoginData,
      checkLoginData,
    } : {
      sendLoginData: Function,
      checkLoginData: Function,
    } = this.props;
    const {
      login,
      password,
    }: {
      login: ?string,
      password: ?string,
    } = this.state;
    sendLoginData(login, password)
      .then((action: {}) => action.response.token)
      .then((token: string) => {
        setCookie('token', token);
        return Promise.resolve(token);
      })
      .then(checkLoginData)
      .then((action: {}) => {
        if (action.status === 'OK') {
          browserHistory.push('/');
        } else if (action.error) {
          this.setState({ error: action.error });
        }
      });
  };

  render() {
    const {
      login,
      password,
      error,
    }: LoginState = this.state;
    return (
      <div className="form">
        <input
          type="text"
          onChangeCapture={this.onFieldChange}
          value={login || ''}
          data-field="login"
        />
        <input
          type="text"
          onChangeCapture={this.onFieldChange}
          value={password || ''}
          data-field="password"
        />
        <button
          onClick={this.sendDataHandler}
        >
          send
        </button>
        {error &&
        <div>
          {error}
        </div>
        }
      </div>
    );
  }
}
export default connect(null, {
  sendLoginData,
  checkLoginData,
})(AuthorizationBox);
