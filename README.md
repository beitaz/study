# My Study Application

The project is an study [React](https://reactjs.org/) && [LoopBack](http://loopback.io) application.

<br />

## 创建 LoopBack 应用
---

### Create app
```shell
$ lb
? What's the name of your application? study
? Enter name of the directory to contain the project: study

? Which version of LoopBack would you like to use? 3.x (current)
? What kind of application do you have in mind? api-server (A LoopBack API server with local User auth)
...
I'm all done. Running `npm install` for you to install the required dependencies.
If this fails, try running the command yourself.
... 
```

### Configure datasource and create models
1. Install & configure MongoDB

...

Start MongoDB:
```shell
$ sudo mongod
```

MongoDB 基本命令:
```shell
$ mongo
> show dbs
> use db_name
> show collections
> db.article.find()
> exit
```

2. Add Connector and Configure DataSource
```shell
$ npm install --save loopback-connector-mongondb
+ loopback-connector-mongodb@3.3.1
added 10 packages in 6.22s

$ lb datasource mongoDS --connector mongoDB
? Enter the datasource name: mongoDS
? Select the connector for mongoDS: MongoDB (supported by StrongLoop)
? Connection String url to override other settings (eg: mongodb://username:password@hostname:port/database):
? host: localhost
? port: 27017
? user:
? password:
? database: study
```
避免与默认数据源名称 `db` 冲突报错 `Validation error: invalid DataSourceDefinition - name: is not unique` ,暂时使用 `mongoDS` 作为数据源名称,数据源配置完成后,修改 `PROJECT_ROOT/server/datasources.json` 配置
```shell
{
  "mongoDS": {
    "host": "localhost",
    "port": 27017,
    ...
  }
}
```
为:
```shell
{
  "db": {
    "host": "localhost",
    "port": 27017,
    ...
  }
}
```
`Note:` 也可以配置多数据源,通过修改 `PROJECT_ROOT/server/model-config.json` 配置数据源.

3. Create Models

```shell
$ lb model
[?] Enter the model name: person
[?] Select the data-source to attach person to: db (memory)
[?] Select model`s base class (PersistedModel)
[?] Expose person via the REST API? Yes
[?] Custom plural form (used to build REST URL):
[?] Common model or server only? common
Let's add some person properties now.
...
```

### Run the application
```shell
$ node .
Browse your REST API at http://0.0.0.0:3000/explorer
Web server listening at: http://0.0.0.0:3000/
```

### Explore your REST API
Load http://0.0.0.0:3000/explorer to see the built-in API Explorer on browser.

<br />

## 创建源码目录 `PROJECT_ROOT/client_src` 并初始化项目:
---
```shell
$ mkdir client_src
$ cd client_src
$ npm install -g create-react-app
$ create-react-app .
```
创建完成后,为避免端口冲突修改 `PROJECT_ROOT/client_src/package.json`
```shell
...
  "scripts": {
    "start": "PORT=3001 react-scripts start"
    ...
  }
...
```


<br />

## 开发
---

修改 ESLint 配置文件 `.eslintrc` 消除错误.

...


<br />

## 构建部署(build)
---
修改 `PROJECT_ROOT/package.json` 配置,将构建文件 `PROJECT_ROOT/client_src/build/*` 复制到 `PROJECT_ROOT/client/` 目录中:
```shell
...
  "scripts": {
    ...
    "build": "react-scripts build && cp -r build/* ../client/"
    ...
  }
...
```

构建并启动服务器:
```shell
$ npm run build
```

将文件 `PROJECT_ROOT/server/boot/root.js`
```javascript
...
  router.get('/', server.loopback.status());
...
```
修改为:
```javascript
...
  router.get('/');
...
```

将文件 `PROJECT_ROOT/server/middleware.json`
```json
...
  "files": {},
...
```
修改为:
```json
...
  "files": {
    "loopback#static": {
      "params": "$!../client"
    }
  },
...
```