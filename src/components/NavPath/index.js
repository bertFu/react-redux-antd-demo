import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Breadcrumb} from 'antd'
import styles from './index.less'

const defaultProps = {
    navpath: []
}

const propTypes = {
    navpath: PropTypes.array
}

class NavPath extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {navpath} = this.props
        const bread = navpath.map((item) => {
            return (
                <Breadcrumb.Item key={'bc-' + item.key}>{item.name}</Breadcrumb.Item>
            )
        })
        const breadInit = <Breadcrumb.Item key={'bc-myMain'}>脚手架</Breadcrumb.Item>
        return (
            <div className={styles["ant-layout-breadcrumb"]}>
                <Breadcrumb>
                    <Breadcrumb.Item key='bc-0'>Antd</Breadcrumb.Item>
                    {bread.length == 0
                        ? breadInit
                        : bread}
                </Breadcrumb>
            </div>
        )
    }
}

NavPath.propTypes = propTypes;
NavPath.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    navpath: state.menu.navpath
  }
}

export default connect(mapStateToProps)(NavPath)
