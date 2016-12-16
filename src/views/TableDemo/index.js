import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {
    Table,
    Pagination,
    Popconfirm,
    Row,
    Col,
    Modal,
    Input,
    Form,
    Button
} from 'antd';
import styles from './index.less';
import AddFrom from './components/AddForm';
import UpdFrom from './components/UpdForm';
import GetFrom from './components/GetForm';
import {page, clearSearch,showAdd,showUpd,del, disable, enable} from '../../actions/tableDemo'

const FormItem = Form.Item;

class TableDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
        this.paginationChange = this.paginationChange.bind(this);
    }

    componentWillMount() {
        this.props.page(1)
    }
    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}

    paginationChange(pageId) {
        this.props.page(pageId)
    }

    render() {
        const {loading, pager} = this.props;
        const self = this;

        const formItemLayout = {
            labelCol: {
                span: 7
            },
            wrapperCol: {
                span: 17
            }
        }

        // 表头配置与各个列的操作信息
        const caseTableHead = [
            {
                title: '员工编号',
                dataIndex: 'id',
                key: 'id',
            }, {
                title: '员工名',
                dataIndex: 'member',
                key: 'member',
            }, {
                title: '员工账号',
                dataIndex: 'number',
                key: 'number',
            },{
                title: '员工角色',
                dataIndex: 'type',
                key: 'type',
            },{
                title: '团队名',
                dataIndex: 'org',
                key: 'org',
            },{
                title: '管理',
                key: 'operation',
                render: (record) => {
                    return (
                        <span>
                            <a onClick={() => {
                                this.props.showUpd(record)
                            }}>修改</a>
                            <span>
                                <span className="ant-divider"></span>
                                {record.status == 'disable' ? (
                                    <Popconfirm placement="top" title="确定要启用这个团队成员吗" onConfirm={() => {
                                        this.props.enable(record.id);
                                    }}>
                                        <a>启用</a>
                                    </Popconfirm>
                                ) : (
                                    <Popconfirm placement="top" title="确定要禁用这个团队成员吗" onConfirm={() => {
                                        this.props.disable(record.id);
                                    }}>
                                        <a>禁用</a>
                                    </Popconfirm>
                                )}
                            </span>
                        </span>
                    )
                }
            }
        ]

        return (
            <div>
                <div style={{
                    marginBottom: 10
                }}>
                    <GetFrom />
                    <Button type="primary" onClick={this.props.showAdd}>添加</Button>
                </div>
                <div className={styles['table-group']}>
                    <Table columns={caseTableHead} className={styles["table"]} dataSource={this.props.list} pagination={false} loading={this.props.loading} onChange={this.handleTableDemoChange}/>
                </div>

                <div style={{
                    marginTop: 16
                }}>
                    <Pagination
                        showQuickJumper
                        total={this.props.pager.total}
                        showTotal={total => {
                            return `共 ${total} 条`
                        }}
                        current={this.props.pager.pageID}
                        onChange={this.paginationChange}
                        pageSize={this.props.pager.pageSize}
                    />
                </div>

                <AddFrom />

                <UpdFrom />
            </div>
        );
    }
};
function mapStateToProps(state) {
    return {
        loading: state.tableDemo.loading,
        list: state.tableDemo.list,
        pager: state.tableDemo.pager,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        disable: bindActionCreators(disable, dispatch),
        enable: bindActionCreators(enable, dispatch),
        page: bindActionCreators(page, dispatch),
        showAdd: bindActionCreators(showAdd, dispatch),
        showUpd: bindActionCreators(showUpd, dispatch),
        del: bindActionCreators(del, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableDemo);
