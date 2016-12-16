import React, {PropTypes} from 'react';
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    notification,
    Checkbox
} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login} from '../../actions/user';
import {getCookie} from '../../util';
const FormItem = Form.Item;

import styles from './index.less';
import logoImg from '../../static/logo.jpeg';
import loginImg from '../../static/login-bg.jpg';

const propTypes = {
    user: PropTypes.string,
    loggingIn: PropTypes.bool,
    loginErrors: PropTypes.string
};

const contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

class Login extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        const error = nextProps.loginErrors;
        const isLoggingIn = nextProps.loggingIn;
        const user = nextProps.user;
        const loggingOut = nextProps.loggingOut;

        if (error != this.props.loginErrors && error) {
            notification.error({message: '登录失败！', description: error});
        }

        if (!isLoggingIn && !error && user) {
            notification.success({
                message: '登录成功',
                // description: <span>欢迎&nbsp;<span style={{color: '#2db7f5'}}>&nbsp;{user}&nbsp;</span>&nbsp;</span>,
                description: '欢迎 '+ user,
                duration: 2
            });
        }
        // let backend_token = decodeURIComponent(getCookie('backend_token'));
        // if (user && backend_token) {
        if (user) {
            this.context.router.replace('/tdemo');
        }
    }
    handleSubmit(e) {
        e.preventDefault()
        const data = this.props.form.getFieldsValue()
        this.props.login(data.user, data.password)
    }

    render() {
        const {getFieldProps} = this.props.form
        return (
            <div className={styles["login-row"]}>

                <Row style={{
                    height: '100%'
                }} type="flex" justify="space-around" align="middle">
                    <Col span="9">
                        <Form horizontal onSubmit={this.handleSubmit.bind(this)} className={styles["login-form"]} style={{
                            background: '#fff'
                        }}>
                            <div style={{
                            }}>
                                {/*<img style={{ width: '150px' }} src={logoImg}/>*/}
                                <div style={{textAlign: 'center', fontSize: '20px', marginBottom: '12px'}}>Antd 脚手架</div>
                            </div>
                            <FormItem>
                                <Row>
                                    <Col span='16' offset='4' >
                                        <Input placeholder='请输入用户名' {...getFieldProps('user') }/>
                                    </Col>
                                </Row>
                            </FormItem>

                            <FormItem>
                                <Row>
                                    <Col span='16' offset='4' >
                                        <Input type='password' placeholder='请输入密码' {...getFieldProps('password') }/>
                                    </Col>
                                </Row>
                            </FormItem>

                            {/*
                                <Row className={styles["check-margin"]}>
                                    <Col span='16' offset='12'>
                                        <Checkbox {...getFieldProps('agreement') }>记住账号密码</Checkbox>
                                    </Col>
                                </Row>
                            */}

                            <Row>
                                <Col span='3' offset='7'>
                                    <Button type='default' htmlType='reset'>重置</Button>
                                </Col>
                                <Col span='3' offset='3'>
                                    <Button loading={this.props.loggingIn} type='primary' htmlType='submit'>确定</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

Login.contextTypes = contextTypes;
Login.propTypes = propTypes;
Login = Form.create()(Login);

function mapStateToProps(state) {
    const {user} = state;
    if (user.user) {
        return {user: user.user, loggingIn: user.loggingIn, loginErrors: ''};
    }
    return {user: null, loggingIn: user.loggingIn, loginErrors: user.loginErrors, loggingOut: state.user.loggingOut};
}

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(login, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
