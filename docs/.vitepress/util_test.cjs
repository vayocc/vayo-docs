const util = require('util');

const json = {

    '/articles/java/Syntax/': [
        {
            "text": "Syntax",
            "items": [
                {
                    "text": "Stream流",
                    "link": "/articles/java/Syntax/Stream流"
                }
            ]
        },
        {
            "text": "javaUtil",
            "items": [
                {
                    "text": "String字符串工具类",
                    "link": "/articles/java/javaUtil/string字符串工具类"
                }
            ]
        }
    ],




};

console.log(util.inspect(json, { depth: null, colors: true }));
