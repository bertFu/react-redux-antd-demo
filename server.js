require('babel-register');

const webpack = require('webpack');
const config = require('./webpack.config');

const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    configObject = require("./config"),
    jwt = require('jsonwebtoken'),
    app = express(),
    request = require('request'),
    path = require('path'),
    log4js = require("log4js"),
    utils = require("./utils"),
    ejs = require('ejs'),
    EventEmitter = require('events').EventEmitter;

app.engine('.html', ejs.__express);
app.set('view engine', 'html');

log4js.configure({
    appenders: [
        {type: 'console'},
        {
            type: 'dateFile',
            filename: 'logs/normal.log',
            layout: {type: 'basic'},
            pattern: '.yyyy-MM-dd',
            alwaysIncludePattern: true,
            category: 'normal'
        }
    ],
    levels: {
        normal: configObject.logLevel
    }
});

const normalLog = log4js.getLogger("normal");

app.use(log4js.connectLogger(normalLog, {level: 'trace', format: ':method :url'}));

let env = process.env.NODE_ENV;

const isProduction = env === 'production';
const isDeveloping = !isProduction;

// Webpack developer
if (isDeveloping) {
    // const compiler = webpack(config);
    // app.use(require('webpack-dev-middleware')(compiler, {
    //     publicPath: config.output.publicPath,
    //     noInfo: true
    // }));
    //
    // app.use(require('webpack-hot-middleware')(compiler));
}

//设置静态文件目录
const publicPath = path.resolve(__dirname + "/dist");
//静态资源的获取放后面
app.use(express.static(publicPath));

//设置可以接收cookie
app.use(cookieParser());

var jsonParser = bodyParser.json();

// 登录逻辑
app.post('/login', jsonParser, function (req, res) {
    let username = req.body.username;
    let pwd = req.body.pwd;

    request.post(configObject.agUrl + "YDSL/backend/login" + utils.getAgOauth(configObject.appID, configObject.token),
        {
            form: {account: username, password: pwd, appid: '124'}, timeout: configObject.agTimeout
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                normalLog.trace("case登录【" + username + "," + pwd + ",AG返回:" + body);

                // todo try catch
                let userResult = JSON.parse(body);

                if (userResult.code != 0) {
                    res.json({code: "-1", message: userResult.message});
                    return;
                }

                let user = userResult.content;

                buildCookie(res,user.admin,username);

                res.json({code: "0", message: "success"});

                return;
            } else {
                event.emit('agError', res, "case登录【" + username + "," + pwd + "】", body, response, error);
                return;
            }
        });

});

// 获取跟ag交互需要的参数
app.get('/getAgParams', jsonParser, function (req, res) {
    res.json({
        code: 0,
        message: '',
        content : {
            agUrl : configObject.agUrl,
            agOauth : utils.getAgOauth(configObject.appID, configObject.token)
        }
    });
});

//统一对登录状态进行判断
app.get(['/*'], function(req, res) {
    res.render('index', {});
    return;
});

//声明事件
let event = new EventEmitter();

// oauth登录逻辑
app.get('/oauth', function (req, res) {
    let username = req.query.username;
    let accessToken = req.query.access_token;

    if (!username) {
        res.clearCookie('mytoken');
        res.redirect('/');
        return;
    }

    if (!accessToken) {
        res.clearCookie('mytoken');
        res.redirect('/');
        return;
    }

    // 使用oauth2的方式调用ag接口
    request.get(configObject.agUrl + "case_task/account_auth?userId=" + username + "&userType=cgj", {
        timeout: configObject.agTimeout,
        headers: {
            'access-token': accessToken
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            normalLog.trace("获取用户信息【" + username + ",AG返回:" + body);

            // todo try catch
            let userResult = JSON.parse(body);

            if (userResult.code != 0) {
                res.clearCookie('mytoken');
                res.redirect('/');
                return;
            }

            let user = userResult.content;

            var token = createToken(user,username);

            normalLog.trace("token:" + token);

            buildCookie(res,token,user);

            res.redirect('/newIndex.html/my_task');

            return;
        } else {
            normalLog.error("进行case_task/account_auth验证的时候发生错误，" + ",AG返回:" + body + ",response:" + response + ",error:" + err);
            res.redirect('/');
        }
    });

});

// oauth详情页面登录逻辑
app.get('/oauth/detail', function (req, res) {
    let username = req.query.username;
    let accessToken = req.query.access_token;
    let id = req.query.id;

    if (!username) {
        res.clearCookie('mytoken');
        res.redirect('/');
        return;
    }

    if (!accessToken) {
        res.clearCookie('mytoken');
        res.redirect('/');
        return;
    }

    if (!id) {
        res.clearCookie('mytoken');
        res.redirect('/');
        return;
    }

    // 使用oauth2的方式调用ag接口
    request.get(configObject.agUrl + "case_task/account_auth?userId=" + username + "&userType=cgj", {
        timeout: configObject.agTimeout,
        headers: {
            'access-token': accessToken
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            normalLog.trace("获取用户信息【" + username + ",AG返回:" + body);

            // todo try catch
            let userResult = JSON.parse(body);

            if (userResult.code != 0) {
                res.clearCookie('mytoken');
                res.redirect('/');
                return;
            }

            let user = userResult.content;

            var token = createToken(user,username);

            normalLog.trace("token:" + token);

            buildCookie(res,token,user);

            res.redirect('/newIndex.html/case_detail/'+id);

            return;
        } else {
            normalLog.error("进行case_task/account_auth验证的时候发生错误，" + ",AG返回:" + body + ",response:" + response + ",error:" + err);
            res.redirect('/');
        }
    });

});

function createToken(user,username){
    return jwt.sign({
            'operator': user.realname,
            'operatorId': user.uuid,
            // 'rootTree': JSON.stringify(user.rootTree),
            'username': username,
            'avatarUrl': configObject.avatarUrl + username,
            'isNickname': user.isNickname,
            'nickname': user.nickname,
            'accountList': JSON.stringify(user.accountList),
            'isMultiple': user.isMultiple,
            'agUrl': configObject.agUrl,
            'agParams': utils.getAgOauth(configObject.appID,configObject.token)
        },
        'shhhhh',
        {
            expiresIn: configObject.tokenExpiresIn,
            issuer: configObject.tokenIssuer,
            audience: configObject.tokenAudience,
            subject: configObject.tokenSubject
        }
    );
}

function buildCookie(res,user,username){
    res.cookie('id', user.id, {maxAge: 1000 * 3600 * 24, httpOnly: false, path: '/'});
    res.cookie('name', user.name, {maxAge: 1000 * 3600 * 24, httpOnly: false, path: '/'});
    res.cookie('username', username, {maxAge: 1000 * 3600 * 24, httpOnly: false, path: '/'});
    res.cookie('image', user.image, {maxAge: 1000 * 3600 * 24, httpOnly: false, path: '/'});
    res.cookie('backend_token', user.backend_token, {maxAge: 1000 * 3600 * 24, httpOnly: false, path: '/'});
}

// 与ag交互发生错误
event.on('agError', function (res, errHtmlMessage, errLogMessage, body, response, err) {
    normalLog.error(errLogMessage + ",AG返回:" + body + ",response:" + response + ",error:" + err);
    res.json({code: "-1", message: "服务器发生异常，请稍后再试"});
    return;
});

app.post('/logout', function (req, res) {
    res.clearCookie('id');
    res.clearCookie('name');
    res.clearCookie('username');
    res.clearCookie('image');
    res.clearCookie('backend_token');
    res.json({code: "0", message: "注销成功"});
});

//与AG对接接口
app.post('/inter/*', jsonParser, function (req, res) {
    // 校验token有效性
    let backend_token = req.cookies.backend_token;

    if (!backend_token) {
        res.json({
            code: "-2",
            message: "请重新登录"
        });
        return;
    }

    let reqBody = req.body;
    if (reqBody == null) {
        res.json({
            code: "-3",
            message: "缺少参数"
        });
        return;
    }
    let serverName = reqBody.serverName;
    let method = reqBody.method;
    let data = reqBody.data;

    if (!serverName) {
        res.json({
            code: "-3",
            message: "缺少参数serverName"
        });
        return;
    }

    if (!method) {
        method = "GET";
    }

    normalLog.trace("本次请求的参数为:" + JSON.stringify(reqBody));

    let url = configObject.agUrl + serverName + utils.getAgOauth(configObject.appID, configObject.token);

    method = method.toUpperCase();

    if (method == "GET" || method == "DELETE") {

        for (let param in data) {
            if (param != "extend" && param != "keyword_value") {//不懂为什么会多一个extend属性
                url += "&" + param + "=" + data[param];
            }
        }

        if (method == "GET") {
            request.get(url, {timeout: configObject.agTimeout}, function (error, response, body) {
                handlerResponse(error, response, body, reqBody, res);
            });
        } else {
            request.delete(url, {timeout: configObject.agTimeout}, function (error, response, body) {
                handlerResponse(error, response, body, reqBody, res);
            });
        }
    } else if (method == "POST") {
        request.post(url, {form: data, timeout: configObject.agTimeout}, function (error, response, body) {
            handlerResponse(error, response, body, reqBody, res);
        });
    } else if (method == "PUT") {
        request.put(url, {form: data, timeout: configObject.agTimeout}, function (error, response, body) {
            handlerResponse(error, response, body, reqBody, res);
        });
    }

});

function handlerResponse(error, response, body, reqBody, res) {
    try {
        if (!error && response.statusCode == 200) {
            normalLog.trace("访问AG【" + JSON.stringify(reqBody) + ",AG返回:" + body);
            let result = JSON.parse(body);
            if(result.code == 0){
                res.json(JSON.parse(body));
                return;
            }else if(result.code == 98){
                res.json({code: "-2", message: "登录超时，请重新登录"});
                return;
            }else{
                res.json({code: "-3", message: result.message});
                return;
            }

        } else {
            normalLog.error("访问AG异常【" + JSON.stringify(reqBody) + "】AG返回:" + body + ",response:" + JSON.stringify(response) + ",error:" + error);
            res.json({code: "-3", message: "服务器发生异常,请稍后再试"});
            return;
        }
    } catch (err) {
        normalLog.error("处理AG响应时发生异常:" + err);
        res.json({code: "-3", message: "服务器发生异常,请稍后再试"});
        return;
    }
}

//监听全局异常,防止程序崩溃
app.use(function (err, req, res, next) {
    normalLog.error("发生全局异常:" + err);
    res.json({code: "-3", message: "服务器发生异常,请稍后再试"});
    return;
});

app.listen(configObject.port, function (err, result) {
    if (err) {
        normalLog.error("express全局异常:" + err);
    }
    console.log('Server running on port ' + configObject.port);
});
