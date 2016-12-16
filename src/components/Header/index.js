import React, {PropTypes} from 'react'
import { Row, Col, Icon, Menu, Dropdown } from 'antd'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Link } from 'react-router'
import {logout} from '../../actions/user';
import touxiang from '../../static/touxiang.jpg';
import styles from './index.less'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const defaultProps = {
}

const propTypes = {
}

class Header extends React.Component {
  constructor () {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
      if (e.key == 'logout') {
          this.props.logout();
      }
  }

  render () {
    const {user} = this.props
    return (
      <div className={styles['ant-layout-header']}>
        <Menu className={styles["header-menu"]} onClick={this.handleClick}
        mode="horizontal">
          <SubMenu title={<span><img style={{height: '21px', borderRadius: '50%', verticalAlign: 'middle', marginRight: '7px'}} src={touxiang} />{user.name}</span>}>
            <Menu.Item key="setting:1">选项1</Menu.Item>
            <Menu.Item key="setting:2">选项2</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout">注销</Menu.Item>
          </SubMenu>

        </Menu>
      </div>
    )
  }
}


Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

// const mapStateToProps = (state) => {
//
//     return {
//         user: state.user,
//     }
// }
//
// const mapDispatchtoProps = {
//     logout,
// }
//
// export default connect(mapStateToProps, mapDispatchtoProps)(Header)

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: bindActionCreators(logout, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
