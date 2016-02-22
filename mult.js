/**
 * Created by Administrator on 2016/2/22 0022.
 */
var redis = require("redis"),
    client = redis.createClient(6379,'127.0.0.1');
var multi = client.multi();
multi.incr("incr thing", redis.print);
multi.incr("incr other thing", redis.print);

// runs immediately
client.mset("incr thing", 100, "incr other thing", 1, redis.print);

// drains multi queue and runs atomically
multi.exec(function (err, replies) {
    console.log(replies); // 101, 2
});