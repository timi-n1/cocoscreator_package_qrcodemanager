
'use strict';

let buildPath = null;

module.exports = {
    load() {
        // 当 package 被正确加载的时候执行
    },

    unload() {
        // 当 package 被正确卸载的时候执行
    },

    messages: {
        'run'() {
            //from=PKRank&act20180115=true

            const fs = require('fs');
            const path = require('path');
            const request = require('request');
            const access_token = require('./access_token.js');
            const plan = 1;
            const appid = 'wx21b2f604739573d2';
            const output = path.resolve(__dirname, `../../../document/qr-${plan}.png`);

            const postData = JSON.stringify({
                scene: `?plan=${plan}&fromappid=${appid}`,
                width: 1280
            });

            request({
                method: 'POST',
                url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + access_token,
                body: postData
            }, function optionalCallback(err, httpResponse, body) {
                if (body.length < 400) {
                    Editor.log(body);
                }
                else{
                    Editor.success('生成小程序码成功!');
                }
            }).pipe(fs.createWriteStream(output));
        },
        'editor:build-start'(evt, data) {

        }
    },
};