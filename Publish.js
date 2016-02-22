/**
 * Created by Administrator on 2016/2/22 0022.
 */
var redis = require("redis");

try{

    var client = redis.createClient(6379,'127.0.0.1');

    client.on("error",
        function(err){
            console.log("err"+err);
        }

    );
    client.on('ready',
        function(){
            client.publish('test1',"test,i am test");
            client.publish('test2',"test, i am test2");
            client.end();
        }
    );
}
catch(e){
    console.log("err:"+e);
}