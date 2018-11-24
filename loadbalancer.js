var httpProxy = require("http-proxy");
var http = require('http');
var where=require('node-where');
var request=require('request');


var proxy = httpProxy.createProxyServer({});
// var alert=false;
var server=http.createServer( function (req, res){
    // console.log(req)
    // console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    
	request('http://freegeoip.net/json/207.97.227.239', { json: true }, (err, res, body) => {
  		if (err) { return console.log(err); }
  		console.log(body.url);
  		console.log(body.explanation);
	});
	var country,state
	where.is(req.connection.remoteAddress, function (err, result) {
		console.log(result);
		country=result.get('countryCode');
        // state=result.get('regionCode');
        if(country!='US')
        {
            proxy.web(req, res, {target: "http://localhost:3000"}, function (e){
                proxy.web(req, res, {target: "http://localhost:3001"});
            });
        }
        else
        {
            proxy.web(req, res, {target: "localhost:3001"}, function (e){
                proxy.web(req, res, {target: "localhost:3000"});
            });
        }
		// if(!alert)
		// {
		// 	if(country!='US')
		// 	{
		// 		proxy.web(req, res, {target: "http://localhost:3000"}, function (e){
		// 			proxy.web(req, res, {target: "http://localhost:3001"});
		// 		});
		// 	}
		// 	else
		// 	{
		// 		proxy.web(req, res, {target: "localhost:3001"}, function (e){
		// 			proxy.web(req, res, {target: "localhost:3000"});
		// 		});
		// 	}
		// }
		// else
		// {
		// 	proxy.web(req, res, {target: "http://localhost:3001"}, function (e){
		// 		proxy.web(req, res, {target: "http://localhost:3000"});
		// 	});
		// }
		
	});
});

// var checkStatus = setInterval(function () {
// 	try {
// 		http.get("http://{{ hostvars['localhost']['canary_ec2_ipadd']}}", function (res) {
// 			alert=false;
// 		}).on('error', function (e) {
// 			alert = true;
// 		});
// 	} catch (e) {
// 		alert = true;
// 	}
// }, 5000);

server.listen(80);
