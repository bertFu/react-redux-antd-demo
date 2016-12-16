import React, {PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Menu, Icon, Badge} from 'antd'
import {Link} from 'react-router'
import {updateNavPath} from '../../actions/menu'

const SubMenu = Menu.SubMenu

import styles from './index.less'
import logo from '../../static/logo.jpg'

const defaultProps = {
    // items: [],
    // currentIndex: 0
}

const propTypes = {
    // items: PropTypes.array,
    // currentIndex: PropTypes.number
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props)

        this.menuClickHandle = this.menuClickHandle.bind(this);
    }

    componentDidMount() {}

    menuClickHandle(item) {
        this.props.updateNavPath(item.keyPath, item.key)
        this.setState({current: item.key});
    }

    render() {
        const { menuList } = this.props


        let menu = [];

        menuList.map((item) => {

            // openKey.push('sub' + item.key)


            if (!item.child || !Array.isArray(item.child) || item.child.length == 0) {

                menu.push(
                    <Menu.Item key={'sub' + item.key}>
                        <Link to={item.key}><Icon type={item.icon}/>{item.name}</Link>
                    </Menu.Item>
                )
            }

            let childMenu = [];

            item.child.forEach((item) => {

                childMenu.push((
                    <Menu.Item key={'child' + item.key}>
                        <Link to={'' + item.key}>{item.name}</Link>
                    </Menu.Item>
                ))
            })

            if(childMenu.length == 0) {
                return null;
            }

            menu.push(
                <SubMenu key={'sub' + item.key} title={<span><Icon type={item.icon}/><span>{item.name}</span></span >}>
                    {childMenu}
                </SubMenu>
            )
        });

        return (
            <aside className={styles["ant-layout-sider"]}>
                <div className={styles["ant-layout-logo"]}>
                    {/*<img src={logo}/>*/}
                    <span className={styles["nav-text"]}>Antd 脚手架</span>
                </div>
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={['tdemo']}
                    defaultOpenKeys={['']}
                    onClick={this.menuClickHandle}
                >
                    {menu}
                </Menu>
            </aside>
        )
    }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

function mapStateToProps(state) {

    return {
        menuList: state.menu.menuList,
        authList: state.user.authList,
        // currentIndex: state.menu.currentIndex
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateNavPath: bindActionCreators(updateNavPath, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
