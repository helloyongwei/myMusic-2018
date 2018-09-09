const http = require('http');
const fs = require('fs')
const qiniu = require('qiniu')


const port = process.argv[2] || 8888

const server = http.createServer(function(req, res) {
  const {url, method} = req
  if (url === '/uptoken') {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*')
    let file = fs.readFileSync('./qiniu-key.json')
    file = JSON.parse(file)
    let {accessKey, secretKey} = file

    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var options = {
      scope: 'mymusic-2018',
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);

    res.write(`
      {
        "uptoken": "${uploadToken}"
      }
    `)
    res.end()
  }else{
    res.statusCode = 404
    res.end()
  }
  
});

server.listen(port)
console.log("请打开http://localhost:"+port)


