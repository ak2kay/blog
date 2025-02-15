---
title: "剑指 offer 第三章 题 16-26 题解 Python 版"
date: 2018-08-20
keywords:
  - 剑指 Offer
  - Python
---



### 代码完整性
> * 基础功能；
* 输入边界值；
* 错误处理；


<!-- more -->

#### 题 16：数值的整数次方
> 此题不需要考虑大数问题，仅仅是计算整数次方，所以处理好特殊值就行了。


```python
class Solution:
    def Power(self, base, exponent):
        """计算 base 的 exponent 次方

        Arguments:
            base {int} -- 整数
            exponent {int} -- 指数，可正可负

        Returns:
            int -- 结果
        """

        if base == 0:
            return 0
        if base == 1:
            return 1

        abs_exponent = self.abs_exp(base, abs(exponent))
        if exponent > 0:
            return abs_exponent
        else:
            return 1 / abs_exponent

	# 此处处理有个窍门，可以二分计算
    def abs_exp(self, base, exponent):
        if exponent == 0:
            return 1
        if exponent == 1:
            return base

        res = self.abs_exp(base, exponent >> 1)
        res *= res
        if exponent & 1 == 1:
            res *= base
        return res
```

#### 题 17：打印从 1 到最大的 n 位数
> 此题其实是想考察大数的处理，在 python 中，大数的影响几乎不存在，所以可以直接写。但是使用数组或者字符串表示大数的方式还是值得学一学。

```python
def print_1_to_n(n):
    if n < 1:
        return

    i = 1
    while len(str(i)) <= n:
        print(i)
        i += 1
    print(' ')
```

#### 题 18：删除链表的节点
#### 题 19：正则表达式匹配
> 这个题情况分析很复杂。因为、*可以表示出现任意次，所以在 pattern 中出现、*时，s 的推进情况就很复杂，此时用递归获取结果是最容易想明白的。<br>
 **以模式的第二个字符为判断标准，来构造递归，具体看代码。**


```python
class Solution:
    # s, pattern 都是字符串
    def match(self, s, pattern):
        if len(s) == 0 and len(pattern) == 0:
            return True
        # 如果 s 长度不为 0，而 pattern 长度为 0，这种情况不可能匹配成功
        elif len(s) != 0 and len(pattern) == 0:
            return False
        # 如果 s 长度为 0， 而 pattern 长度不为 0，那么可能会有 pattern 为'（.*）*'的情况
        elif len(s) == 0 and len(pattern) != 0:
            # 如果 pattern 第二位为 0, pattern 推进两个
            if len(pattern) > 1 and pattern[1] == '*':
                return self.match(s, pattern[2:])
            else:
                return False
        # 如果 s 和 pattern 长度都不为 0
        else:
            # pattern 第二位为*
            if len(pattern) > 1 and pattern[1] == '*':
                # 如果 s[0] != pattern[0]
                if s[0] !=  pattern[0] and pattern[0] != '.':
                    return self.match(s, pattern[2:])
                # 如果 s[0] == pattern[0], 那么有三种情况
                    # 1. s 不变，pattern 后移两步（pattern 前两个字符等价于空）
                    # 2. s 右移一个， pattern 右移两个 （pattern 前两个字符等价于一个字符）
                    # 3. s 右移一个， pattern 不右移 （pattern 前两个字符等价于多个字符））
                else:
                    return self.match(s, pattern[2:]) or \
                           self.match(s[1:], pattern[2:]) or \
                           self.match(s[1:], pattern)
            # pattern 第二位不是*
            else:
                # 比较第一位的情况
                if s[0] == pattern[0] or pattern[0] == '.':
                    return self.match(s[1:], pattern[1:])
                else:
                    return False
```

**这个题是真的烦。**

#### 题 20：表示数值的字符串
> 这个题并没有什么意思，找到所有可有可无的片段凑正则就行了。

```python
import re

class Solution:
    # s 字符串
    def isNumeric(self, s):
        return True if re.match(r"^[\+\-]?[0-9]*(\.[0-9]*)?([eE][\+\-]?[0-9]+)?$", s) else False
```

#### 题 21：调整数组顺序使奇数位于偶数前面
> 这个题可以借助荷兰国旗问题求解。

```python

# -*- coding:utf-8 -*-
class Solution:
    def reOrderArray(self, array):
        if array is None or len(array) < 2:
            return array

        p1 = 0
        p2 = len(array) - 1
        while p1 < p2:
            if self.is_even(array[p1]) and not self.is_even(array[p2]):
                self.swap(array, p1, p2)

            while not self.is_even(array[p1]):
                p1 += 1
            while self.is_even(array[p2]):
                p2 -= 1

    def is_even(self, item):
        return item & 1 == 0

    def swap(self, array, i, j):
        array[i], array[j] = array[j], array[i]
```

**如果要求保留原数组奇数间的顺序以及偶数间的顺序，借助了辅助数组的代码如下：**

```python
# -*- coding:utf-8 -*-
class Solution:
    def is_even(self, item):
        return item & 1 == 0

    def reOrderArray(self, array):
        if array is None or len(array) < 2:
            return array

        assi_array = []

        for item in array:
            if not self.is_even(item):
                assi_array.append(item)
        for item in array:
            if self.is_even(item):
                assi_array.append(item)

        return assi_array
```

### 代码鲁棒性
* 判断输入
* 容错性

#### 题 22：链表中倒数第 k 个节点
**题目：**
> 输入一个链表，输出该链表中倒数第 k 个节点。本题从 1 开始计数，即尾节点为倒数第 1 个节点。

```python
# -*- coding:utf-8 -*-
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def FindKthToTail(self, head, k):
        """打印链表倒数第 k 个节点

        Args:
            head (ListNode): 链表头结点
            k (int): 指定数字

        Returns:
            ListNode: 倒数第 k 个节点
        """

        p_ahead = head
        p_behind = head
        while k > 0:
            if p_ahead is None:
                return None
            p_ahead = p_ahead.next

            k -= 1
        while p_ahead is not None:
            p_ahead = p_ahead.next
            p_behind = p_behind.next
        return p_behind
```

#### 题 23：链表中环的入口节点
**题目：**
> 如果一个链表中包含环，如何找出环的入口节点？

```python
# -*- coding:utf-8 -*-
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def EntryNodeOfLoop(self, pHead):
        """找到链表中环的入口节点

        Args:
            pHead (ListNode): 链表头结点

        Returns:
            ListNode: 入口节点（如果没有返回 None）
        """

        if pHead is None or pHead.next is None:
            return None
        p1 = p2 = pHead
        while p2.next is not None:
            p2 = p2.next.next
            p1 = p1.next
            if p1 == p2:
                first_met = p1
                count = 1
                while p1.next != first_met:
                    p1 = p1.next
                    count += 1

                p1 = p2 = pHead
                for i in range(count):
                    p1 = p1.next
                while p1 != p2:
                    p1 = p1.next
                    p2 = p2.next
                return p1
        return None
```

#### 题 24：反转链表

**题目：**
> 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

```python
# -*- coding:utf-8 -*-
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def ReverseList(self, pHead):
        """反转链表，返回反转后的头

        Args:
            pHead (ListNode): 链表头

        Returns:
            ListNode: 反转之后链表头
        """

        if pHead is None or pHead.next is None:
            return pHead
        new_head = self.ReverseList(pHead.next)

        pHead.next.next = pHead
        pHead.next = None

        return new_head
```

#### 题 25：合并两个排序的链表
**题目：**
> 输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。

```python
# -*- coding:utf-8 -*-
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def Merge(self, pHead1, pHead2):
        """合并两个排序链表
        """

        if pHead1 is None:
            return pHead2
        elif pHead2 is None:
            return pHead1

        p1, p2 = pHead1, pHead2
        merge_head = None
        if p1.val < p2.val:
            merge_head = p1
            merge_head.next = self.Merge(p1.next, p2)
        else:
            merge_head = p2
            merge_head.next = self.Merge(p1, p2.next)

        return merge_head
```

