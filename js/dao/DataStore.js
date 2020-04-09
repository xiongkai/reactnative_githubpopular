import AsyncStorage from "@react-native-community/async-storage";
import GithubTrending from "GitHubTrending";

const githubTrending = new GithubTrending();

const expireTime = 4*60*60*1000; //本地数据过期时间4小时

class DataStore {

    /**
     * 重新包装网络数据，增加时间戳
     * @param data
     * @returns {{data: *, timestamp: number}}
     * @private
     */
    _wrapData(data) {
        return {data: data, timestamp: new Date().getTime()};
    }

    /**
     * 检查本地数据是否过期
     * @param timestamp
     * @returns {boolean}
     * @private
     */
    _checkExpired(timestamp){
        const nowTime = new Date().getTime();
        return nowTime - timestamp < expireTime;
    }

    /**
     * 获取数据，先本地再网络
     * @param url
     * @returns {Promise<any>}
     */
    fetchData(url){
        return new Promise((resolve, reject)=>{
            this.fetchLocalData(url)
                .then(wrapData=>{
                    if (wrapData&&this._checkExpired(wrapData.timestamp)){
                        resolve(wrapData.data);
                    }else{
                        this.fetchNetData(url)
                            .then(data=>{
                                resolve(data);
                            })
                            .catch(error=>{
                                reject(error);
                            })
                    }
                })
                .catch(error=>{
                    this.fetchNetData(url)
                        .then(data=>{
                            resolve(data);
                        })
                        .catch(error=>{
                            reject(error);
                        })
                });
        });
    }

    /**
     *  获取趋势页面数据
     */
    fetchTrending(url){
        return new Promise((resolve, reject)=>{
            this.fetchLocalData(url)
                .then(wrapData=>{
                    if (wrapData&&this._checkExpired(wrapData.timestamp)){
                        resolve(wrapData.data);
                    }else{
                        githubTrending.fetchTrending(url)
                            .then(data=>{
                                if (data && data.length > 0){
                                    const promise = this.saveData(url, data);
                                    if (promise){
                                        promise.then(()=>{
                                            resolve(data);
                                        }).catch(error=>{
                                            resolve(data)
                                        });
                                    }else{
                                        resolve(data);
                                    }
                                }else{
                                    resolve([]);
                                }
                            })
                            .catch(error=>{
                                reject(error);
                            });
                    }
                })
                .catch(error=>{
                    githubTrending.fetchTrending(url)
                        .then(data=>{
                            resolve(data);
                        })
                        .catch(error=>{
                            reject(error);
                        });
                });
        });
    }

    /**
     * 保存数据到本地
     * @param url
     * @param data
     */
    saveData(url, data){
        if (!data || !url){
            return;
        }
        const wrapData = this._wrapData(data);
        return AsyncStorage.setItem(url, JSON.stringify(wrapData));
    }

    /**
     * 获取本地数据
     * @param url
     * @returns {Promise<any>}
     */
    fetchLocalData(url){
        return new Promise((resolve, reject)=>{
            AsyncStorage.getItem(url)
                .then(value=>{
                    try{
                        resolve(JSON.parse(value));
                    }catch (error) {
                        reject(error);
                    }
                })
                .catch(error=>{
                    reject(error);
                });
        });
    }

    /**
     * 获取网络数据
     * @param url
     * @returns {Promise<any>}
     */
    fetchNetData(url){
        return new Promise((resolve, reject)=>{
            fetch(url)
                .then(response=>{
                    if (response.ok){
                        return response.json();
                    }
                    throw new Error("NetWork response was not ok!");
                })
                .then(data=>{
                    data = data && data.items;
                    if (data && data.length > 0){
                        const promise = this.saveData(url, data);
                        if (promise){
                            promise.then(()=>{
                                resolve(data);
                            }).catch(error=>{
                                resolve(data)
                            });
                        }else{
                            resolve(data);
                        }
                    }else{
                        resolve([]);
                    }
                })
                .catch(error=>{
                    reject(error);
                });
        });
    }
}

export default new DataStore();