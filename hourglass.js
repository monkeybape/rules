// hourglass.js
let body = $response.body;
let obj = JSON.parse(body);

// 修改 authenticated 字段为 true
if (obj.hasOwnProperty('authenticated')) {
    obj.authenticated = true;
}

// 返回修改后的响应
$done({body: JSON.stringify(obj)});
