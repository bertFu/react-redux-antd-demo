import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Form, Input, Button, Modal, Select, Row, Col} from 'antd';
import {search, clearSearch, setSearchParam} from '../../../actions/tableDemo'

const FormItem = Form.Item;

class GetTableDemo extends React.Component {
    constructor(props) {
        super(props)

        this.onSearch = this.onSearch.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
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

    onSearch(e) {
        e.preventDefault();
        this.props.search();
    }

    clearSearch(e) {
        e.preventDefault();
        this.props.clearSearch();
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
            <Form inline>
                <FormItem label="团队名">
                    <Input id="control-input" {...getFieldProps('teanName')} placeholder="请输入团队名" onPressEnter={() => {this.props.search()}} />
                </FormItem>
                <Button type="primary" onClick={this.onSearch} style={{ marginRight: '10px' }}>搜索</Button>
                <Button onClick={this.clearSearch} style={{ marginRight: '10px' }}>清除条件</Button>
            </Form>
        );
    }
};

GetTableDemo = Form.create({
    onFieldsChange: (props, fields) => {
        if (fields) {
            props.setSearchParam(fields);
        }
    },
    mapPropsToFields: (props) => {
        return {
            'teanName': {
                ...props.searchParams.teanName
            }
        }
    }
})(GetTableDemo);

function mapStateToProps(state) {
    return {searchParams: state.tableDemo.searchParams}
}
function mapDispatchToProps(dispatch) {
    return {
        search: bindActionCreators(search, dispatch),
        setSearchParam: bindActionCreators(setSearchParam, dispatch),
        clearSearch: bindActionCreators(clearSearch, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetTableDemo);
