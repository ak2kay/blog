---
title: 使用 fail2ban 防止 ssh 暴力登录
date: 2018-09-27
---


fail2ban 可以设置规则自动拦截尝试失败次数过多的 IP，部署方法如下：

<!-- more -->

## 安装 fail2ban
```shell
yum -y install fail2ban
```
**请注意防火墙软件是`firewalld`而不是`iptables`**

```shell
# 查看状态
firewall-cmd --state

# 启动 firewalld
systemctl start firewalld

# 开机启动
systemctl enable firewalld
```

默认的`firewalld`会禁用所有端口连接，因此你需要手动的放行端口，比如你的博客服务的 web 端口：
```shell
firewall-cmd --zone=public --add-port=80/tcp --permanent

# 重载配置
firewall-cmd --reload

# 查看已经放行的端口
firewall-cmd --zone=public --list-ports
```

## 配置 fail2ban

fail2ban 的配置文件位于`/etc/fail2ban/`， 我们在该目录新建一个自定义配置文件`jail.local`
然后加入如下信息：
```shell
[DEFAULT]
ignoreip = 127.0.0.1/8
bantime = 86400
findtime = 600
maxretry = 5
banaction = firewallcmd-ipset
sender = email@email.com
senername = Fail2Ban
action = %(action_mwl)s

[sshd]
enabled = true
filter = sshd
port = 22
action = %(action_mwl)s
logpath = /var/log/secure
```

## 启动 fail2ban

```shell
systemctl start fail2ban
```

## 查看 fail2ban 日志以及 ip 禁用列表
```shell
# 查看日志
tail -F /var/log/fail2ban

# 查看禁用 ip
fail2ban-client status sshd
```
