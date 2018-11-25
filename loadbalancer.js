var httpProxy = require("http-proxy");
var http = require('http');
var where=require('node-where');
var request=require('request');
const ipstack = require('ipstack')


var proxy = httpProxy.createProxyServer({});
// var alert=false;
var server=http.createServer( function (req, res){
    // console.log(req)
    // console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    
	
	
	var country,state
	ipstack(req.connection.remoteAddress, "c0273b268891b3ff95fbbe82a9b223aa" function (err, result) {
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
