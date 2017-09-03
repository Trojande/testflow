/**
 * Created by trojande on 9/3/17.
 */
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import Header from './Header';

type Props = {
    children?: React.Element<*>;
}
const styles = {
  content: {},
};
class Root extends Component<Props> {

  render() {
    const {
      children,
      classes,
    } = this.props;
    return (
      <div>
        <Header />
        <div className={classes.content}>{children}</div>
      </div>
    );
  }
}
export default injectSheet(styles)(Root);
