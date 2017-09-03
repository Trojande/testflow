/**
 * Created by trojande on 9/3/17.
 */
import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router';

const styles = {
  header: {
    background: 'black',
  },
  list: {
    listStyle: 'none',
  },
  item: {
    display: 'inline-block',
    margin: 0,
    padding: '0 10px',
  },
  link: {
    color: 'white',
    '&:hover': {
      color: 'red',
      cursor: 'pointer',
    },
  },
  activeLink: {
    color: 'red',
  },
};
const menuItems: Array<{ name: string, url: string }> = [
  {
    name: 'Главная',
    url: '/',
  },
  {
    name: 'Авторизация',
    url: '/login',
  },
];
class Header extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.header}>
        <div className={classes.menu}>
          <ul className={classes.list}>
            {menuItems.map(item => (
              <li
                className={classes.item}
                key={`header-menu-item-${item.url}`}
              >
                <Link
                  to={item.url}
                  className={classes.link}
                  activeClassName={classes.activeLink}
                >{item.name}</Link>
              </li>

            ))}
          </ul>
        </div>
      </div>
    );
  }

}
export default injectSheet(styles)(Header);
