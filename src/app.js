const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><form action="/message" method="post"><input type="text" name="message"><button type="submit">Send request</button></form></body>');
    res.write('</html>')
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split('=')[1]
      fs.writeFileSync('message.txt', message);
      console.log(message);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    })
  }
  res.setHeader('Content-Type', 'text/html')
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.end();
});
// url.post('/trang-chu', function (req, res) {
//     response.redirect('/xin-chao');
// })
server.listen(3000);
