
# Server端实现



### Server需要维护的数据

```javascript
{
  document: '', // 当前文本内容
  revision: 0, // 当前已变更的版本号，通常与ops.length一致
  clients: { // 当前链接的用户端列表
    'xxsf-mhkg-ksgkd': {},
  },
}
```

### 需要注册的处理方法

```javascript
// 处理操作更新的方法
onOpration()
1、将接收到的操作数据转换为操作实例
2、如果有同时并行的操作，转换后再存储
3、对发送操作的client回复ack，表示操作已接收完毕
4、将操作对链接的其他client广播
5、循环往复 1-4 步
// 处理光标位置变更的方法
onSelection()
1、接收 client selection 变更的通知
2、失焦则清除对应 client 的 selection，未失焦则更新
3、广播光标更新的事件
```

