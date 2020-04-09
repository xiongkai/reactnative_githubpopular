export async function processFavorite(favoriteDao, keyName, data, callback){
    if (data&&data.length>0){
        const favoriteKeys = await favoriteDao.getFavoriteKeys();
        if (favoriteKeys&&favoriteKeys.length>0){
            data.forEach(item=>{
                const index = favoriteKeys.findIndex(key=>{
                    return key === item[keyName]+"";
                });
                item.isFavorite = index >= 0;
            });
        }
    }
    callback();
}

export function processStoreName(data, storeName){
    if (data&&data.length>0){
        data.forEach(item=>{
            item.storeName = storeName;
        });
    }
}