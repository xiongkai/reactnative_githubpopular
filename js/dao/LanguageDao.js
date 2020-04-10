import AsyncStorage from "@react-native-community/async-storage";

const FLAG_LANGUAGE = "flag_language";
const FLAG_KEY = "flag_key";

class LanguageDao{

    constructor(flag){
        this.flag = flag;
    }

    fetch(){
        return new Promise((resolve, reject)=>{
            AsyncStorage.getItem(this.flag)
                .then(result=>{
                    if (!result || result.length===0){
                        this.save(LANGUAGES);
                        resolve(LANGUAGES);
                        return;
                    }
                    try{
                        resolve(JSON.parse(result));
                    }catch (e) {
                        reject(e);
                    }
                })
                .catch(error=>{
                    reject(error);
                });
        });
    }

    save(data){
        const strData = JSON.stringify(data);
        AsyncStorage.setItem(this.flag, strData)
            .then(result=>{

            })
            .catch(error=>{

            });
    }
}

const languagesDao = new LanguageDao(FLAG_LANGUAGE);
const keysDao = new LanguageDao(FLAG_KEY);

export {languagesDao, keysDao};

export const LANGUAGES = [
    {
        "path": "c",
        "name": "C",
        "checked": false
    },
    {
        "path": "csharp",
        "name": "C#",
        "checked": true
    },
    {
        "path": "cpp",
        "name": "C++",
        "checked": true
    },
    {
        "path": "dart",
        "name": "Dart",
        "checked": true
    },
    {
        "path": "erlang",
        "name": "Erlang",
        "checked": false
    },
    {
        "path": "go",
        "name": "Go",
        "checked": true
    },
    {
        "path": "java",
        "name": "Java",
        "checked": true
    },
    {
        "path": "javascript",
        "short_name": "JS",
        "name": "JavaScript",
        "checked": true
    },
    {
        "path": "kotlin",
        "name": "Kotlin",
        "checked": true
    },
    {
        "path": "lua",
        "name": "Lua",
        "checked": false
    },
    {
        "short_name": "Obj-C",
        "path": "objective-c",
        "name": "Objective-C",
        "checked": true
    },
    {
        "path": "php",
        "name": "PHP",
        "checked": true
    },
    {
        "path": "plsql",
        "name": "PLSQL",
        "checked": false
    },
    {
        "path": "python",
        "name": "Python",
        "checked": false
    },
    {
        "path": "ruby",
        "name": "Ruby",
        "checked": false
    },
    {
        "path": "rust",
        "name": "Rust",
        "checked": false
    },
    {
        "path": "scala",
        "name": "Scala",
        "checked": false
    },
    {
        "path": "swift",
        "name": "Swift",
        "checked": true
    },
    {
        "path": "typescript",
        "name": "TypeScript",
        "checked": true
    }
];