---
title: SnipDo 欧路词典插件
date: 2023-12-23
keywords:
  - Tool
---

分享一个基于 SnipDo 的欧路词典插件。

<!-- more -->

一些接下来会提到的软件介绍：

- [openai-translator](https://github.com/openai-translator/openai-translator): 基于 ChatGPT API 的划词翻译浏览器插件和跨平台桌面端应用；
- [snipdo](https://snipdo-app.com/): 官方介绍是：A fundamental Text Menu for Windows;
- [欧路词典](https://dict.eudic.net/): 一款词典软件，优势是支持自定义扩充词典。经过调教之后会非常好用。

那么这三个软件有什么关系呢？又与今天的分享有什么关系？

openai-translator 作为一款主打划词翻译的跨平台应用，在更新到最近的版本之后，在其设置页面，推荐使用 clip-extension 来替换其自身提供的划词功能。

对于 windows 平台，它推荐了 snipdo。这也是我开始关注到 snipdo 这个软件的契机。在搭配 openai-translator 使用了 snipdo 之后，我大概 get 到了 openai-translator 开始拥抱 clip-extension 的原因：对于划词这么一个基础的功能来说，很多软件，包括欧路词典都会提供划词的功能，这也就导致，如果大家都实现自己的划词功能，那么往往在用户执行了划词操作之后，各家的 UI 都会响应，此时由于不同的设计，用户几乎没有办法预期划词之后的 UI 会是怎样。
但诸如 snipdo 这类软件，就是将划词之后后续的操作统一接管起来，供用户选择使用。

在感受到了划词功能聚合之后的便利，我就在考虑将我自己用到的需要结合划词使用的应用都借助于 snipdo 聚合起来。其中的一个我使用的比较多的就是欧路词典。在简单了解了 snipdo 插件写法之后，决定写一个通过快捷键调用的欧路词典插件，插件放在这里：[github](https://github.com/ak2kay/store)，有感兴趣的同学可以自取。
