/**
 * Created by Administrator on 2016/2/22 0022.
 */
var redis = require("redis");
var msg=[];//存储订阅返回的消息
try{
    var client = redis.createClient(6379,'127.0.0.1');
    client.on(
        "error",
        function(err){
            console.log("err"+err);
        }
    );
    client.on('ready',
        function(){
            client.subscribe('test1');
            client.subscribe('test2');
            //client.end();
        }
    );
    client.on('subscribe',
        function(channel,count){
            console.log("subscribe channel:" + channel + ", count:"+count);
        }
    );
    client.on('message',
        function(channel,message){
                msg.push(message);
                console.log("msg channel:" + channel + ", msg:"+message);

            /*//遍历消息列表
            for(var key in msg){
                console.log(key+":"+msg[key]);
            }*/
            /* get/set方法不能放在message里，可以放在subscribe、unsubscribe、quit里面，所以直接存储存储不了；
            解决方案：新建一个客户端存储。
            client.set(channel,message,redis.print);
           client.get(channel,function(err,res){
                console.log(res);
            });*/

         /*   var client2 = redis.createClient(6379,'127.0.0.1');//用于存储数据
            client2.set(channel,message,redis.print);
            client2.get(channel,function(err,res){
                console.log(res);
            });*/
            redis.createClient(6379,'127.0.0.1').set(channel,message,redis.print);
        }
    );
    client.on('unsubscribe',
        function(channel,count){
            console.log("unsubscribe channel:" + channel + ", count:"+count);
        }
    );
}
catch(e){
    console.log("err:"+e);
}