import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Affix, Row, Col, Icon} from 'antd';

import NavPath from '../../components/NavPath';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import styles from './index.less';

import {fetchProfile} from '../../actions/user';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchProfile();
    }

    componentWillReceiveProps(nextProps) {

        const loggingOut = nextProps.loggingOut;
        if (loggingOut) {
          window.location.href = '/#/login';
        }
    }
    render() {
        const {user, actions} = this.props;
        const {collapse} = this.props; // 判断侧边栏隐藏显示

        return (
            <div className={collapse
                ? styles["ant-layout-aside"] + ' ' + styles["ant-layout-aside-collapse"]
                : styles["ant-layout-aside"]}>
                <Sidebar/>
                <div className={styles["ant-layout-main"]}>
                    <Header user={user}/>
                    <NavPath/>
                    <div className={styles["ant-layout-container"]}>
                        <div className={styles["ant-layout-content"]}>
                            {this.props.children}
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    user: PropTypes.object,
    children: PropTypes.node.isRequired
};

App.contextTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const {user} = state;
  return {
      user: user ? user : null,
      loggingOut: user.loggingOut
  };
};

function mapDispatchToProps(dispatch) {
  return {fetchProfile: bindActionCreators(fetchProfile, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
