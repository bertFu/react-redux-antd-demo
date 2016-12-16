import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Form, Input, Button, Modal, Select} from 'antd';
import {closeAdd, setAddParam, add} from '../../../actions/tableDemo'

const FormItem = Form.Item;

class AddTableDemo extends React.Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            this.props.add();
        });
    }

    render() {
        const {getFieldProps} = this.props.form;

        const formItemLayout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 14
            }
        }
        return (
            <Modal title="添加团队成员" okText="保存" confirmLoading={this.props.addLoading} visible={this.props.addModalVsible} onOk={this.handleSubmit} onCancel={this.props.closeAdd}>
                <Form horizontal>
                    <FormItem {...formItemLayout} label="团队">

                        <Select {...getFieldProps('org', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择团队!',
                                    type: 'string'
                                }
                            ]
                        })} placeholder="请选择团队">
                            <Option value="团队1">团队1</Option>
                            <Option value="团队2">团队2</Option>
                            <Option value="团队3">团队3</Option>
                        </Select>
                    </FormItem>

                    <FormItem {...formItemLayout} label="员工">

                        <Select {...getFieldProps('member', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择员工!',
                                    type: 'string'
                                }
                            ]
                        })} placeholder="请选择员工">
                            <Option value="员工1">员工1</Option>
                            <Option value="员工2">员工2</Option>
                            <Option value="员工3">员工3</Option>
                        </Select>
                    </FormItem>

                    <FormItem {...formItemLayout} label="类型">

                        <Select {...getFieldProps('type', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择类型!',
                                    type: 'string'
                                }
                            ]
                        })} placeholder="请选择类型">
                            <Option value="类型1">类型1</Option>
                            <Option value="类型2">类型2</Option>
                            <Option value="类型3">类型3</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="工号" required {...formItemLayout}>
                        <Input {...getFieldProps('number', { rules: [{required: true, message: '工号不能为空'}], })} placeholder="请输入工号"/>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
};

AddTableDemo = Form.create({
    onFieldsChange: (props, fields) => {
        if (fields) {
            props.setAddParam(fields);
        }
    },
    mapPropsToFields: (props) => {
        return {
            'number': {
                ...props.addParams.number
            },
            'org': {
                ...props.addParams.org
            },
            'member': {
                ...props.addParams.member
            },
            'type': {
                ...props.addParams.type
            }
        }
    }
})(AddTableDemo);

function mapStateToProps(state) {
    return {addParams: state.tableDemo.addParams, addModalVsible: state.tableDemo.addModalVsible, addLoading: state.tableDemo.addLoading}
}
function mapDispatchToProps(dispatch) {
    return {
        closeAdd: bindActionCreators(closeAdd, dispatch),
        setAddParam: bindActionCreators(setAddParam, dispatch),
        add: bindActionCreators(add, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTableDemo);
