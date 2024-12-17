

interface RequestParams{
    url:string
    data?:object
}

// 封装请求的函数，统一管理
export const request=<T>({url,data}:RequestParams)=>{
    // 创建一个promise
    return new Promise<T>((resolve,reject)=>{
        uni.request({
            url,
            data,
            success:(res)=>{
                resolve(res.data as T)
            },
            fail:reject,

        })
    })
}


export const getallDataApi = () => {
    return request({ url: "https://zyxcl.xyz/music/api/homepage/block/page" })
}