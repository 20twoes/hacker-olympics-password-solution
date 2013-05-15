
var request = require('request');
var fs = require('fs');
var readline = require('readline');

var MAX_CONN = 200;

var queue = [];
var still_reading = true;
var active_conn = 0;


/*
 * Do a HEAD request to find valid ips.
 */

function record_valid_ip(error, resp, body) {
    active_conn -= 1;
    if (!error) {
        var ip = resp.request.uri.href;
        console.log('valid: ', ip);
        fs.appendFile('validips', ip + '\n', function (err) {
            if (err) throw err;
        });
        send_post(ip);
    }
}

function do_work(item) {
    active_conn += 1;
    request({
          uri: item
        , method: 'HEAD'
        //, timeout: 2000
        }, record_valid_ip);
    //console.log('ip: ' + line);
}

function ping_test() {
    if (still_reading === false && queue.length === 0) {
        process.exit(0);
    } else if (active_conn <= MAX_CONN) {
        var item = queue.shift();
        console.log('processing: ', item);
        do_work(item);
    } else {
        console.log('throttling');
    }
}
    

/*
 * See if any of these valid ips pass return what we want.
 */

function record_post_resp(error, resp, body) {
    if (!error && resp.statusCode < 400) {
        console.log('received post response');
        //console.log(resp);
        fs.appendFile('postresponses', body + '\n', function (err) {
            if (err) throw err;
        });
        fs.appendFile('postips', resp.request.href + '\n', function (err) {
            if (err) throw err;
        });
    }
}

function send_post(ip) {
    request({
          uri: ip + 'hackerolympics.json'
        , method: 'POST'
        , form: {'name': '20twoes'}
        //, timeout: 2000
        }, record_post_resp);
}


function main() {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    rl.on('line', function (line) {
        console.log('readline: ', line);
        queue.push(line);
    }).on('close', function() {
        console.log('end input');
        still_reading = false;
    });

    setInterval(ping_test, 100);
}

main();

