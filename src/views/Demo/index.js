import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {getList, setTitle, addDemo, delDemo, showUpdDemoItem, closeUpdDemoItem, setUpdDemoInfo, updDemo} from '../../actions/demo'
import {connect} from 'react-redux';
import {
    Table,
    Pagination,
    Popconfirm,
    Modal,
    Button,
    Input,
    Icon,
    Form
} from 'antd';
import styles from './index.less';

class Demo extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.getList()
    }

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}

    render() {

        const demoTableHead = [
            {
                title: '',
                dataIndex: 'addStatus',
                key: 'addStatus',
                width: 50,
                render: (text, record, index) => {
                    switch (text) {
                        case 'loading':
                            return <span style={{color: '#2db7f5'}}><Icon type="loading" /></span>
                            break;
                        case 'success':
                            return <span style={{color: '#87d068'}}><Icon type="check-circle-o" /></span>
                            break;
                        case 'error':
                            return <span style={{color: '#f50'}}><Icon type="close-circle-o" /></span>
                            break;
                        default:
                            return "";
                    }
                }
            }, {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            }, {
                title: '标题',
                render: (text, record, index) => {
                    if (record.updStatus == 'update') {
                        return (
                            <Input
                                style={{
                                    width: '200px',
                                    marginRight: 8
                                }}
                                placeholder="请输入标题"
                                value={this.props.updDemoInfo.title}
                                onPressEnter={() => {this.props.updDemo()}}
                                onChange={title => {
                                    this.props.setUpdDemoInfo({
                                        title: title.target.value
                                    })
                                }}
                            />
                        )
                    }
                    return (
                        <div className="yincang">{record.title}</div>
                    )
                }
            }, {
                title: '管理',
                key: 'operation',
                render: (record) => {

                    let switchUpdState = function (updStatus) {
                        switch (updStatus) {
                            case 'loading':
                                return <span style={{color: '#fa0'}}><Icon type="loading" />修改中</span>
                                break;
                            case 'update':
                                return (
                                    <span>
                                        <a onClick={() => { this.props.closeUpdDemoItem(record.id) }}>取消修改</a>
                                        <span className="ant-divider"></span>
                                        <a onClick={() => { this.props.updDemo() }}>保存</a>
                                    </span>
                                )
                                break;
                            default:
                                return <a onClick={() => { this.props.showUpdDemoItem(record.id) }}>修改</a>
                        }
                    }
                    switchUpdState = switchUpdState.bind(this);

                    switch (record.delStatus) {
                        case 'loading':
                            return <span style={{color: '#fa0'}}><Icon type="loading" />删除中</span>
                            break;
                        case 'error':
                            return <span style={{color: '#f50'}}><Icon type="close-circle-o" />删除</span>
                            break;
                        default:
                            return (
                                <span>
                                    { switchUpdState(record.updStatus) }
                                    <span>
                                        <span className="ant-divider"></span>
                                        <Popconfirm placement="top" title="确定要删除这个任务吗" onConfirm={() => { this.props.delDemo(record.id); }}>
                                            <a>删除</a>
                                        </Popconfirm>
                                    </span>
                                </span>
                            );
                    }
                }
            }
        ]

        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 18
            }
        };

        return (
            <div>
                <div style={{
                    marginBottom: 8
                }}>
                    <Input
                        style={{
                            width: '200px',
                            marginRight: 8
                        }}
                        placeholder="请输入标题"
                        value={this.props.title}
                        onPressEnter={() => {this.props.addDemo()}}
                        onChange={title => {
                            this.props.setTitle(title.target.value)
                        }}
                    />
                    <Button type="primary" onClick={() => this.props.addDemo()}>添加</Button>
                </div>
                <div className={styles['table-group']}>
                    <Table columns={demoTableHead} className={styles["table"]} dataSource={this.props.list} pagination={false} size={"middle"} loading={false}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        list: state.demo.list,
        title: state.demo.title,
        updDemoInfo: state.demo.updDemoInfo,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getList: bindActionCreators(getList, dispatch),
        showUpdDemoItem: bindActionCreators(showUpdDemoItem, dispatch),
        setUpdDemoInfo: bindActionCreators(setUpdDemoInfo, dispatch),
        closeUpdDemoItem: bindActionCreators(closeUpdDemoItem, dispatch),
        addDemo: bindActionCreators(addDemo, dispatch),
        updDemo: bindActionCreators(updDemo, dispatch),
        delDemo: bindActionCreators(delDemo, dispatch),
        setTitle: bindActionCreators(setTitle, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
