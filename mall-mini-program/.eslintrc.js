module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    // 脚本在执行期间访问的额外的全局变量
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "Component": true,
        "Page": true,
        "App": true,
        "wx": true
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        // 强制执行一致的缩进（4个空格）
        "indent": [
            1,
            2
        ],
        // 强制使用一致的换行风格
        "linebreak-style": [
            0,
            "error",
            "windows"
        ]
    }
};