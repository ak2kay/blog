---
title: "剑指 offer 第二章 题 3-15 题解 Python 版"
date: 2018-08-19
keywords:
  - 剑指 Offer
  - Python
---

### 数组
#### 题 3： 数组中的重复数字
> 在一个长度为 n 的数组里所有的数字都在 0~n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数组。例如，如果输入长度为 7 的数组{2，3，1，0，2，5，3}，那么对应的输出是重复的 2 或 3.

**解法：**<br>
1. 可以用辅助 hash 表存放已经遍历到的元素，如果发现当前遍历到的元素已经在 hash 表中了，return；
2. 如果不适用辅助数据结构，那么就要从数组本身特点出发：<br>
* 数组所有数字在 0~n-1 范围内，如果我们把这个数组排序，如果没有重复元素，那么数字 i 就应该在索引位置为 i 的位置。如果有重复，那么必然一个数字会占据多个索引。
* 基于此，我们从头开始遍历，如果`numbers[i] != i`那么，就把 i 位置的元素和`numbers[i]`位置的元素交换（这样就有一个元素放到了如果不重复的情况下的正确位置），如果我们在交换的时候`number[i]`位置的元素就等于`numbers[i]`这说明，该数字出现了最少两次，我们得到了一个可能结果。

<!-- more -->

#### 题 4：二维数组中的查找
**题目：**
> 一个二维数组，从左到右递增，从上到下递增，给定一个数，判断该数是否在数组里。

```python
# -*- coding:utf-8 -*-
class Solution:
    def Find(self, target, array):
        """在一个从左到右递增，从上往下递增的数组中查找元素

        Args:
            target (int): 待查找数字
            array (list): 待查找数组

        Returns:
            bool: 是否找到
        """

        row_length = len(array)
        col_length = len(array[0])
        if row_length == 0 or col_length == 0:
            return False
        i, j = 0, col_length - 1
        while True:
            if array[i][j] == target:
                return True
            elif array[i][j] < target:
                if i < row_length - 1:
                    i += 1
                else:
                    return False
            else:
                if j > 0:
                    j -= 1
                else:
                    return False
```

### 字符串
#### 题 5：替换空格
**题目：**
> 实现一个函数，将字符串中每个空格替换成“%20”.

```python
# -*- coding:utf-8 -*-
class Solution:
    def replaceSpace(self, s):
        """将 s 中的空格替换成%20

        Args:
            s (str): 给定字符串

        Returns:
            str: 替换后字符串
        """

        blank_nums = s.count(' ')
        original_length = len(s)
        s = list(s)
        s.extend(['0' for i in range(2*blank_nums)])
        i = original_length - 1
        j = original_length + 2 * blank_nums - 1
        while i >= 0 and i <= j:
            if s[i] == ' ':
                s[j-2:j+1] = '%20'
                j -= 3
                i -= 1
            else:
                s[j] = s[i]
                j -= 1
                i -= 1
        s = ''.join(s)

        return s
```


### 链表
#### 题 6：从尾到头打印链表
**题目：**
> 输入一个链表的头部，从尾到头打印每个节点的值

```python
# -*- coding:utf-8 -*-
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def __init__(self):
        self.res = []

    def printListFromTailToHead(self, listNode):
        """从尾到头打印链表，将打印结果存入数组

        Args:
            listNode (ListNode): 链表头

        Returns:
            list: 数组结果
        """

        if listNode is not None:
            self.printListFromTailToHead(listNode.next)
            self.res.append(listNode.val)
        return self.res
```

### 树
#### 题 7：重建二叉树
**题目：**
> 给定一个二叉树的前序序列和中序序列，请重建该二叉树。

**解法：** <br>

找树根，然后递归建立左右子树。

```python
# -*- coding:utf-8 -*-
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    """根据前序序列和中序序列重建二叉树
    """

    def reConstructBinaryTree(self, pre, tin):
        """根据前序序列和中序序列重建二叉树

        Args:
            pre (list): 前序遍历序列
            tin (list): 中序遍历序列

        Returns:
            TreeNode: 重建二叉树头
        """

        if len(pre) != len(tin) or len(pre) == 0 or len(tin) == 0:
            return None
        root = TreeNode(pre[0])
        if pre[0] in tin:
            value = tin.index(pre[0])
        else:
            return None
        left_tin, right_tin = tin[:value], tin[value+1:]
        left_pre, right_pre = pre[1:1+len(left_tin)], pre[1+len(left_tin):]
        root.left = self.reConstructBinaryTree(left_pre, left_tin)
        root.right = self.reConstructBinaryTree(right_pre, right_tin)

        return root


def main():
    pre = [1, 2, 3, 4, 5, 6, 7]
    tin = [3, 2, 4, 1, 6, 5, 7]
    ex = Solution()
    root = ex.reConstructBinaryTree(pre, tin)
    print(root.val, ' ', root.left.val, ' ', root.right.val)


if __name__ == '__main__':
    main()
```

#### 题 8：二叉树的下一个节点
**题目：**
> 给定一棵二叉树和其中一个节点，如何找出中序序列的下一个节点？树中的节点除了有两个分别指向左、右节点的指针，还有一个指向父节点的指针。

```python
# -*- coding:utf-8 -*-
class TreeLinkNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None
        self.next = None


class Solution:
    def GetNext(self, pNode):
        """查找给定节点的下一个节点

        Args:
            pNode (TreeLinkNode): 给定二叉树头

        Returns:
            TreeLinkNode: 给定节点的下一个节点，没有则是 None
        """

        if pNode.right:
            p = pNode.right
            while p.left:
                p = p.left
            return p
        elif pNode.next and pNode.next.left == pNode:
            return pNode.next
        elif pNode.next and pNode.next.right == pNode:
            p = pNode
            while p.next and p.next.next:
                if p.next.next.left == p.next:
                    return p.next.next
                p = p.next
            return None
        else:
            return None
```

### 栈和队列
#### 题 9：用两个栈实现队列

**题目：**
> 用两个栈实现一个队列。

```python
# -*- coding:utf-8 -*-
class Stack:
    def __init__(self):
        self.data = []

    def push(self, item):
        self.data.append(item)

    def pop(self):
        return self.data.pop()

    def is_empty(self):
        return False if len(self.data) else True


class Solution:
    def __init__(self):
        self.stack1 = Stack()
        self.stack2 = Stack()

    def push(self, node):
        self.stack1.push(node)

    def pop(self):
        if self.stack2.is_empty():
            self.dao()
        return self.stack2.pop()

    def dao(self):
        while not self.stack1.is_empty():
            self.stack2.push(self.stack1.pop())
```

### 递归和循环
#### 题 10： 斐波那契数列
##### 题目一：求斐波那契数列的第 n 项

```python
# -*- coding:utf-8 -*-
class Solution:
    def Fibonacci(self, n):
        fib0, fib1 = 0, 1
        if n < 2:
            return n
        for i in range(2, n+1):
            fibi = fib0 + fib1
            fib0 = fib1
            fib1 = fibi
        return fibi
```
##### 题目二：跳台阶问题

```python
# -*- coding:utf-8 -*-
class Solution:
    def jumpFloor(self, number):
        # write code here
        fib1 = 1
        fib2 = 2
        if number == 1:
            return fib1
        if number == 2:
            return fib2
        for i in range(3, number+1):
            fibi = fib1 + fib2
            fib1 = fib2
            fib2 = fibi
        return fibi
```

##### 题目三：变态跳台阶问题

```python
# -*- coding:utf-8 -*-
class Solution:
    def jumpFloorII(self, number):
        """有时候我们只是缺少一个发现规律的眼睛
        """

        return 2 ** (number - 1)
```


### 查找和排序
#### 题 11：旋转数组的最小数字
**题目：**
> 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如，数组[3, 4, 5, 1, 2]为[1, 2, 3, 4, 5]的一个旋转，该数组的最小值为 1.

```python
# -*- coding:utf-8 -*-
class Solution:
    def minNumberInRotateArray(self, rotateArray):
        """找到旋转数组中的最小数字

        Args:
            rotateArray (list): 数组

        Returns:
            int: 最小数字
        """

        if rotateArray is None or len(rotateArray) <= 0:
            return 0
        low = mid = 0
        high = len(rotateArray) - 1
        while rotateArray[low] >= rotateArray[high]:
            mid = (low + high) // 2
            if rotateArray[low] == rotateArray[high] and rotateArray[low] == rotateArray[mid]:
                return self.sequential_compare(rotateArray, low, high)
            if rotateArray[mid] >= rotateArray[low]:
                low = mid
            if rotateArray[mid] <= rotateArray[high]:
                high = mid
            if high - low == 1:
                return rotateArray[high]
        return rotateArray[mid]

    def sequential_compare(self, rotateArray, low, high):
        if low == high:
            return rotateArray[low]
        for i in range(low, high+1):
            if rotateArray[i] < rotateArray[low]:
                return rotateArray[i]
        return rotateArray[low]
```


### 回溯法：
回溯法适合由多个步骤组成的问题，并且每个步骤都有多个选项。当我们在某一步选择了其中一个选项时，就进入下一步，然后又面临新的选项。当当前选项不满足条件时，我们就回退到上一步，选择其他选项。

#### 题 12：矩阵中的路径
**解法：** <br>
此题用回溯法解，如果发现矩阵当前节点能满足路径需要，但是当前节点周围的四个节点都不等于路径下一个值，那么就回退。

```python
class Solution:
    def hasPath(self, matrix, rows, cols, path):
        """寻找字符矩阵中相邻元素是否可以组成给定的 path

        Arguments:
            matrix {list} -- 字符矩阵
            rows {int} -- 矩阵总行数
            cols {int} -- 矩阵总列数
            path {str} -- 给定字符串路径

        Returns:
            bool -- 是否存在路径
        """

        if matrix is None or rows < 1 or cols < 1 or path is None:
            return False
        mem = [[False for i in range(cols)] for j in range(rows)]
        cur_path_length = 0
        for row in range(rows):
            for col in range(cols):
                cur_path_length = 0
                res = self.has_path(matrix, row, col, rows,
                                    cols, cur_path_length, path, mem)
                if res:
                    return True
        return False

    def has_path(self, matrix, row, col, rows, cols, cur_path_length, path, mem):
        """矩阵路径搜索函数

        Arguments:
            matrix {list} -- 字符矩阵
            row {int} -- 当前到达矩阵元素的行
            col {int} -- 当前到达矩阵元素的列
            rows {int} -- 矩阵总行数
            cols {int} -- 矩阵总列数
            cur_path_length {int} -- 当前已经确认存在的路径长度
            path {str} -- 给定字符串路径
            mem {list} -- 记录元素是否已经被访问过的矩阵

        Returns:
            bool -- 返回 row，col 元素的邻居能不能继续匹配 path
        """

        if cur_path_length == len(path):
            return True

        inner_res = False

        if row >= 0 and row < rows and col >= 0 and col < cols and \
                matrix[row][col] == path[cur_path_length] and not mem[row][col]:

            cur_path_length += 1
            mem[row][col] = True
            inner_res = self.has_path(matrix, row, col-1, rows, cols, cur_path_length, path, mem) or \
                self.has_path(matrix, row-1, col, rows, cols, cur_path_length, path, mem) or \
                self.has_path(matrix, row, col+1, rows, cols, cur_path_length, path, mem) or \
                self.has_path(matrix, row+1, col, rows, cols, cur_path_length, path, mem)

            if not inner_res:
                cur_path_length -= 1
                mem[row][col] = False

        return inner_res
```

#### 题 13: 机器人的运动范围

**解法：** <br>
与题 12 类似，回溯法求解。

```python
class Solution:
    def movingCount(self, threshold, rows, cols):
        """主函数

        Arguments:
            threshold {int} -- 阈值，当前访问的格子横纵坐标坐标各位数字加起来不应超过 threshold
            rows {int} -- 矩阵总行数
            cols {int} -- 矩阵总列数

        Returns:
            int -- 可以访问的坐标数
        """

        if threshold < 0 or rows <= 0 or cols <= 0:
            return 0

        visited = [False for i in range(rows * cols)]

        count = self.moving_count(threshold, rows, cols, 0, 0, visited)

        return count

    def moving_count(self, threshold, rows, cols, row, col, visited):
        """递归计算可去做标数

        Arguments:
            row {int} -- 当前横坐标
            col {int} -- 当前纵坐标
            visited {list} -- 记录当前坐标是否已经被计算过

        Returns:
            [type] -- [description]
        """

        count = 0
        if self.check(threshold, rows, cols, row, col, visited):
            # 防止重复计算
            visited[row * cols + col] = True
            count = 1 + self.moving_count(threshold, rows, cols, row, col-1, visited) \
                      + self.moving_count(threshold, rows, cols, row-1, col, visited) \
                      + self.moving_count(threshold, rows, cols, row, col+1, visited) \
                      + self.moving_count(threshold, rows, cols, row+1, col, visited)
        return count

    def check(self, threshold, rows, cols, row, col, visited):
        """判断该坐标是否可以访问

        Returns:
            bool
        """

        if row >= 0 and row < rows and col >= 0 and col < cols and \
                self.get_sum(row) + self.get_sum(col) <= threshold and \
                not visited[row * cols + col]:
            return True
        return False

    def get_sum(self, num):
        total = 0
        while num > 0:
            total += num % 10
            num //= 10
        return total
```

#### 回溯法总结：
**回溯法顾名思义最重要的是回溯，题 12 是最典型的回溯法，在该题中，只有当前节点的下一步走不通，我们是会把当前节点重新标记为未访问的，这样就“回退”了。<br>
但纵观这两个题，其实这就是一个递归，主要的还是对分支情况以及递归分支返回的处理。<br>
在回溯法中，只有条件符合，才会继续递归，要不然本次递归分支就直接被抛弃了。**

### 动态规划
如果题目是求最优解，且该题能够分解成若干个子问题，而且子问题还有重叠，这类题就适合用 dp 来解。<br>
dp 从暴力递归中来，可以用 dp 解决的题目一般都能用暴力递归解决，但是由于子问题有重叠，所以用递归就会造成大量的重复计算，而 dp 就是要找到问题之间存在的规律，从小到大的解决问题。

#### 题 14: 剪绳子
**题目：**
> 给你一根长度为 n 的绳子，请把绳子剪成 m 段，使得小段乘积最大。（n>1, m>1）


**解法：** <br>
`f(n) = max(f(i) * f(n-i))`

```python
def cut_rope(n):
    if n < 2:
        return 0
    if n == 2:
        return 1
    if n == 3:
        return 2

    temp_arr = [0 for i in range(n+1)]
    pre = (0, 1, 2, 3) # f(1), f(2), f(3)作为别人切下的子过程的时候与自己本身返回时不同的
    for i in range(len(pre)):
        temp_arr[i] = pre[i]

    for i in range(4, n+1):
        max_mul = 0
        for j in range(1, i//2+1):
            max_mul = max(temp_arr[j] * temp_arr[i - j], max_mul)
        temp_arr[i] = max_mul

    return temp_arr[n]
```

**需要注意的是，f(3)以及 f(3)以下的绳子在剪自身和作为别的绳子的子段的时候返回值是不一样的。绳子长度为 3，最少剪一刀应该返回 2，但从更长的绳子上剪下的绳子长度为 3 的贡献值应该为 3（而不是 2.）**

### 位运算
位运算在某些情况下非常有用。比如利用异或可以求数组中唯一不重复元素，利用(n - 1）& n 可以将 n 中最后一个 1 清零，可以计算 n 中比特位为 1 的个数，可以判断 n 是不是 2 的整数次方等等；

#### 题 15：二进制中 1 的个数

**解法：** <br>
这道题有多种解法：<br>
&emsp;&emsp;1.把数字 n 和 1 做与运算，判断 n 的最低位是不是 1，接着把 1 左移一位，判断 n 的次低位是不是 1。重复这个过程，我们就能判断 n 中有多少位 1；<br>
&emsp;&emsp;2.有一个小技巧：把一个整数减去 1，然后再和原整数做与运算，会把该整数最右边的 1 变成 0。那么整数里有几个 1，我们就比较几次就得了。<br>

```python
# 解法 1：
def numer2(n):
    count = 0
    flag = 1
    while flag <= 2 ** 31:
        if n & flag:
            count += 1
        flag = flag << 1
        print(flag, bin(flag))
    return count

# 解法 2：
from ctypes import *
def (n):
    count = 0
    while c_int(n).value:
        count += 1
        n = (n - 1) & n
    return count
```

**注意：因为 python 里 int 是没有位数限制的，当 int 超过 32 位时，python 会自动扩充，所以如果解法 1 中对 flag 不限制，while 会无限循环下去直到溢出；解法 2 中如果不使用 c_int 做限制，那么对于 n 是负数的情况同样会无限循环到溢出。**

