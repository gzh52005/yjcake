
const apiUrl = process.env.NODE_ENV === 'development' ? 'http://47.96.19.159:3006' : 'http://offer.qfh5.cn';
// const apiUrl=baseUrl+"/goodlist";

function request(url,data,options={}){
    url=apiUrl+url;
    
    if(options.method === 'get' || options.method===undefined){
        // 请求方法为get请求时
        if(data){
            //data=>｛｝请求参数的条件
            const params=[];
            for(let key in data){
                params.push(`${key}=${data[key]}`);
            }
            // console.log("params",params);
            url = url + '?' + params.join('&');
        }

    }
    return fetch(url,{
        ...options,
        credentials:'include',
    })
    .then(res=>{
        return res.json()
    })
   
}
// 封装get请求
    request.get = function(url,data={},options={}){
        options.method = 'get';
        
        return request(url,data,options);
    }

    request.post = function(url,data={},options={}){
        options.method = 'post';
        options.body = JSON.stringify(data)
        options.headers= new Headers({
            'Content-Type': 'application/json'
        })
        return request(url,data,options);
    }

    
export default request;