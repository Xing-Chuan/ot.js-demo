# ot.js example
> 一个基于 ot.js 的协同编辑示例

## Startup
```
npm install
npm start
```

理解一个新事物，先要了解它的理念(为什么会出现、出现带来哪些改变)，再熟悉它的框架(结构怎么划分，这么划分可以解决什么问题)，最后是底层实现细节，这样学习下来想必印象深刻

## Documents

### 协同编辑存在什么问题？

当前有两个用户，用户 A 和用户 B，我们的初始文档如下：

```js
abc
```

A 先进行编辑，在索引为 0 处插入 1，文档变为

```js
// A
1abc
```

B 后进行编辑，在索引为 0 处插入 2，文档变为

```js
// B
21bc
```

当我们的操作变更几乎同时发送到服务端

A 收到了 B 的编辑操作(在索引 0 位置插入了 2)，文档变为

```js
// A
21abc
```

B 收到了 A 的编辑操作(在索引 0 位置插入了 1)，文档变为

```js
// B
12abc
```

此时 A，B 本地的两份文档表现不一致了，这只是一次操作，经过多次操作之后，已经是两份完全不同的文档了。

参与此次协同的一共有三端：用户A、用户B、服务端

服务端只是传递操作的话，不能满足协同编辑的文档一致性，服务端还要保证推送出去的操作正确



我们来看看服务端怎样保持文档一致

```js
/* 初始文档 */

// A
abc
// B
abc
// Server
acb
```

服务端先后收到A、B的操作通知，A 在 index 0 插入 1，B 在 index 0 插入2

```js
// Server
abc => 看看A的操作，又看看B的操作，是要在目前文档 index 0 处插入 '21' => 21abc(通知A和B有新的操作变更)

// 通知B有新的操作变更
abc => 2abc(应该在索引为1的位置插入1) => 21abc

// 通知A新的操作变更
abc => 1abc(应该在索引为0的位置插入2) => 21abc
```

注意，B 收到的是"应该在索引为1的位置插入1"，而不是"应该在索引为0的位置插入1"

服务端收到通知是有先后顺序的，我们是先收到A的操作，再收到B的操作

```
// A是前面的操作，B是后面的操作
transform(A, B) => A`, B`
```

当A的操作应用于文档时，文档的文字索引会发生变化，所以正确的通知应该是 "应该在索引为1的位置插入1"

### 什么是 OT 算法？

OT算法就是将文档的变更转化为操作

```
ratain(4)
insert('from Xing-Chuan')
delete(-4)
```



### ot.js 文件介绍

- ajax-adapter.js  - [Client] 基于 JQuery ajax 的 Client 网络请求api封装
- socketio-adapter.js - [Client] 预计 socket.io 的 Client 网络请求api封装
- client.js - [Client] 维持 Client 端的数据状态
- undo-manager.js - [Client] undo 管理
- codemirror-adapter.js [Client] 基于 codemirror 的封装，注册文档变更及应用操作的接口
- editor-client.js - [Client] 统筹 client 和 文本编辑器(eg: codemirror)，处理发送和接收的入口
- editor-socketio-server.js - [Server] 基于 socket.io 的前后端结构，server 端的处理方法封装
- server.js - [Server] 处理 server 端接收的操作
- selection.js - [Client、Server] 光标操作的底层处理
- text-operation.js - [Client、Server] 文本变更操作的底层处理
- wrapped-operation.js - [Client、Server] selection 和 text-operation 的合并数据，最终传输的数据格式
- simple-text-operation.js - [Client、Server] 简版的 text-operation.js



![test](./images/test.jpg)





### 