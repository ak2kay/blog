---
title: "剑指 offer 第四章 题 27-38 题解 Python 版"
date: 2018-08-21
keywords:
  - 剑指 Offer
  - Python
---

### 举例让抽象问题具体化
> 如果没有思路，那就尝试手推几个例子吧。


<!-- more -->

* * *
#### 题 27：二叉树的镜像
**题目：**
> 请完成一个函数，输入一课二叉树，请函数输出它的镜像。

**解法：**
镜像也就意味着每一个子树的左右节点都得互换，所以自然可以想到可以使用递归交换每个节点的左右子树就好了；<br>
顺手也写了个非递归版。

```python
# -*- coding:utf-8 -*-
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    # 返回镜像树的根节点
    def Mirror(self, root):
        if root is None:
            return
        stack = []
        stack.append(root)
        while stack:
            temp = stack.pop()
            if temp.left is not None or temp.right is not None:
                temp.left, temp.right = temp.right, temp.left
            if temp.left is not None:
                stack.append(temp.left)
            if temp.right is not None:
                stack.append(temp.right)

    def Mirror_recur(self, root):
        """递归版"""
        if root is None:
            return
        if root.left or root.right:
            root.left, root.right = root.right, root.left
        self.Mirror_recur(root.left)
        self.Mirror_recur(root.right)

    def mirror(self, root1, root2):
        """检测两棵二叉树是不是镜像树

        Args:
            root1 (TreeNode): 二叉树头结点
            root2 (TreeNode): 二叉树头结点

        Returns:
            bool: 是否为镜像树
        """

        if root1 is None and root2 is None:
            return True
        if root1 is None or root2 is None:
            return False

        if root1.val != root2.val:
            return False
        return self.mirror(root1.left, root2.right) and self.mirror(root1.right, root2.left)


def main():
    root = TreeNode(8)
    root.left = TreeNode(6)
    root.right = TreeNode(10)
    root.left.left = TreeNode(5)
    root.left.right = TreeNode(7)
    root.right.left = TreeNode(9)
    root.right.right = TreeNode(11)

    # 镜像树
    root1 = TreeNode(8)
    root1.left = TreeNode(6)
    root1.right = TreeNode(10)
    root1.left.left = TreeNode(5)
    root1.left.right = TreeNode(7)
    root1.right.left = TreeNode(9)
    root1.right.right = TreeNode(11)

    ex = Solution()
    ex.Mirror(root)
    print(ex.mirror(root1, root))


if __name__ == '__main__':
    main()
```

#### 题 28：对称的二叉树
**题目：**
> 请实现一个函数，用来判断一课二叉树是不是对称的。如果一个二叉树和它的镜像一样，那么他就是对称的。

**解法：** <br>
1. 题意说的很清楚，可以通过判断二叉树和它的镜像是否相等来判断二叉树是否对象，或者换一种说法，检测二叉树和它自己是否是镜像才。

2. 利用树的遍历，前序中左右，我们再写一个自定义序中右左，那么对于对称树，这两个遍历序是一样的，可以利用这个来确定是否是对称树。

```python
# -*- coding:utf-8 -*-
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:

    def is_symmetry_tree(self, root1, root2):
        """检测两棵二叉树是不是镜像树

        Args:
            root1 (TreeNode): 二叉树头结点
            root2 (TreeNode): 二叉树头结点

        Returns:
            bool: 是否为镜像树
        """

        if root1 is None and root2 is None:
            return True
        if root1 is None or root2 is None:
            return False

        if root1.val != root2.val:
            return False
        return self.is_symmetry_tree(root1.left, root2.right) and \
               self.is_symmetry_tree(root1.right, root2.left)


def main():
    root = TreeNode(8)
    root.left = TreeNode(6)
    root.right = TreeNode(6)
    root.left.left = TreeNode(5)
    root.left.right = TreeNode(7)
    root.right.left = TreeNode(7)
    root.right.right = TreeNode(5)


    ex = Solution()
    print(ex.is_symmetry_tree(root, root))


if __name__ == '__main__':
    main()
```

#### 题 29：顺时针打印矩阵
**题目：**
> 输入一个矩阵，按照从外向内以顺时针一次打印出每一个数字。

**解法：** <br>
这个题主要是确定每次的打印范围，然后规范化打印之后再处理特殊情况：
![print matrix clocked](print_matrix_clocked.webp)

```python
# -*- coding:utf-8 -*-
class Solution:
    """matrix 类型为二维列表，需要返回列表"""

    def printMatrix(self, matrix):
        res = []
        row_length = len(matrix)
        col_length = len(matrix[0])
        if row_length == 0 or col_length == 0:
            return res
        i = j = 0
        m = row_length - 1
        n = col_length - 1
        while i < m and j < n:
            for _ in range(j, n):
                res.append(matrix[i][_])
            for _ in range(i, m):
                res.append(matrix[_][n])
            for _ in range(n, j, -1):
                res.append(matrix[m][_])
            for _ in range(m, i, -1):
                res.append(matrix[_][j])
            i += 1
            j += 1
            m -= 1
            n -= 1
        if i == m == j == n:
            res.append(matrix[i][j])
        elif i == m:
            for _ in range(j, n+1):
                res.append(matrix[i][_])
        elif j == n:
            for _ in range(i, m+1):
                res.append(matrix[_][n])
        return res
```

### 举例让抽象问题具体化
如果规律不能一眼看出来，那就试着用具体例子模拟过程吧。**不要钻牛角尖，因为没有用。**

#### 题 30：包含 min 函数的栈
> 使用辅助栈，辅助栈与主栈同步增长，辅助栈中放入已压入元素的最小值；辅助栈与主栈同步弹出；

```python
# -*- coding:utf-8 -*-
class Solution:
    def __init__(self):
        self.stack = []
        self.stack_min = []
        self.min_value = None

    def push(self, node):
        if not self.stack:
            self.min_value = node
        else:
            self.min_value = min(self.min_value, node)

        self.stack.append(node)
        self.stack_min.append(self.min_value)

    def pop(self):
        self.stack_min.pop()
        return self.stack.pop()

    def top(self):
        return self.stack[-1]

    def min(self):
        return self.stack_min[-1]
```

* * *
#### 题 31：栈的压入、弹出序列
**解法：** <br>
如果要判断一个序列是不是栈的弹出序列，那么把压入序列真正的压入一遍就知道了。此题分析如下：
1. 设立一个辅助栈和两个变量用作标志，一个指向弹出序列中的待弹出元素，一个指向压入序列中还未压入栈的元素，两个变量初始值都为 0；
2. 如果待弹出元素和栈顶元素不相同，那么就去待压入元素中寻找和待弹出元素相等的值，将其压入栈；<br>
3. 如果待弹出元素和栈顶元素相同，那么弹出栈顶，待弹出元素往后继续，重复这个过程直到变成条件 2，再重复条件 2；
4. 在 3 中如果找不到相等元素，那么就说明弹出序列有问题。

```python
# -*- coding:utf-8 -*-
class Solution:
    def IsPopOrder(self, pushV, popV):
        if len(pushV) != len(popV):
            return False

        stack = []
        cur_push = 0
        cur_pop = 0
        while stack or cur_push < len(pushV):
            # cur_pop 与栈顶相同，则弹出，cur_pop + 1
            if stack and stack[-1] == popV[cur_pop]:
                stack.pop()
                cur_pop += 1
            else:
                # cur_pop 与栈顶不同，那么开始压栈，直到找到相等值
                while cur_push < len(pushV) and pushV[cur_push] != popV[cur_pop]:
                    stack.append(pushV[cur_push])
                    cur_push += 1
                if cur_push < len(pushV):
                    stack.append(pushV[cur_push])
                    cur_push += 1
                # 去除长度不等之外的唯一错误情况：找不到相等值压栈
                else:
                    return False

        return True
```

* * *
#### 题 32：从上往下打印二叉树
##### 题目一：不分行打印
##### 题目二：分行打印

> 从上到下打印二叉树的每个节点，同一层的节点按照从左到右的顺序打印，代码实现的为分行打印。

**解法：**<br>
层次遍历，利用队列解，剩下的大家就都知道了。

```python
class TreeNode():
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None


class Solution():
    def print_tree_with_level(self, root):
        if root is None:
            return None
        qu = []
        qu.append(root)
        count = 0
        while qu:
            to_be_print = len(qu)
            while to_be_print > 0:
                temp = qu.pop(0)
                print(temp.val, end=' ')
                if temp.left:
                    qu.append(temp.left)
                if temp.right:
                    qu.append(temp.right)
                to_be_print -= 1
            count += 1
            print('第%d 层、n' % count)


def main():
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.left = TreeNode(4)
    root.left.right = TreeNode(5)
    root.right.left = TreeNode(6)
    root.right.right = TreeNode(7)
    ex = Solution()
    ex.print_tree_with_level(root)


if __name__ == '__main__':
    main()
```

##### 题目三：之字形打印二叉树
**题目：**
> 请实现一个函数按照之字形打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，如此反复。

```python
# -*- coding=utf-8 -*-
class TreeNode():
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None


class Solution():
    """分层之字形打印二叉树
    """

    def Print(self, pRoot):
        if pRoot is None:
            return []

        s1, s2, res = [], [], []
        s1.append(pRoot)
        while s1 or s2:
            if s1:
                cur_level_res = []
                while s1:
                    item = s1.pop()
                    cur_level_res.append(item.val)
                    if item.left:
                        s2.append(item.left)
                    if item.right:
                        s2.append(item.right)
                res.append(cur_level_res)

            if s2:
                cur_level_res = []
                while s2:
                    item = s2.pop()
                    cur_level_res.append(item.val)
                    if item.right:
                        s1.append(item.right)
                    if item.left:
                        s1.append(item.left)
                res.append(cur_level_res)

        return res


def main():
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.left = TreeNode(4)
    root.left.right = TreeNode(5)
    root.right.left = TreeNode(6)
    root.right.right = TreeNode(7)
    ex = Solution()
    print(ex.Print(root))


if __name__ == "__main__":
    main()
```

#### 题 33：二叉搜索树的后序遍历序列
**题目：**
> 输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历结果。假设数组中没有相同元素。

**解法：** <br>
```python
# -*- coding:utf-8 -*-
class Solution:
    def VerifySquenceOfBST(self, sequence):
        length = len(sequence)
        if length <= 0:
            return False

        root = sequence[-1]
        for i in range(length):
            if sequence[i] > root:
                break
        j = i
        for j in range(i, length-1):
            if sequence[j] < root:
                return False
        left = True
        if i > 0:
            left = self.VerifySquenceOfBST(sequence[:i])
        right = True
        if i < length - 1:
            right = self.VerifySquenceOfBST(sequence[i:-1])

        return left and right
```

#### 题 34：二叉树中和为某一值的路径
**题目：**
> 输入一棵二叉树和一个整数，打印出二叉树中节点值得和为输入整数的所有路径。从树的根节点开始往下一直到叶节点所经过的节点形成一条路径。

```python
# -*- coding:utf-8 -*-
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def FindPath(self, root, expectNumber):
        """找到二叉树中和为某个值的路径

        Args:
            root (TreeNode): 二叉树根节点
            expectNumber (int): 目标和

        Returns:
            list: 二维列表，内部每个列表表示找到的路径
        """

        if root is None:
            return []
        res = []

        def find_main(root, path, cur_sum):
            cur_sum += root.val
            path.append(root)

            is_leaf = True if root.left is None and root.right is None else False
            if cur_sum == expectNumber and is_leaf:
                one_path = []
                for item in path:
                    one_path.append(item.val)
                res.append(one_path)

            if cur_sum < expectNumber:
                if root.left is not None:
                    find_main(root.left, path, cur_sum)
                if root.right is not None:
                    find_main(root.right, path, cur_sum)

            path.pop()

        find_main(root, [], 0)
        return res
```

### 分解让复杂问题简单化
将大问题分解成小问题——怎样将大问题分解成小问题？无他，多练，就脑熟了。

#### 题 35：复杂链表的复制
**题目：**
> 请实现函数复制一个复杂链表。在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 sibling 指针指向链表中的任意节点或者 None。

```python
# -*- coding:utf-8 -*-
class RandomListNode:
    def __init__(self, x):
        self.label = x
        self.next = None
        self.random = None


class Solution:
    def Clone(self, pHead):
        """返回克隆的复杂链表的头结点

        Args:
            pHead (RandomListNode): 复杂链表头部

        Returns:
            RanddomListNode: 复制链表头部
        """

        if pHead is None:
            return None

        buf_dict = {}
        copy_head = RandomListNode(pHead.label)
        p, copy_p = pHead, copy_head
        while p.next is not None:
            copy_p.next = RandomListNode(p.next.label)
            p = p.next
            copy_p = copy_p.next
            buf_dict[p] = copy_p

        p, copy_p = pHead, copy_head
        while p is not None:
            if p.random is not None:
                copy_p.random = buf_dict[p.random]
            p = p.next
            copy_p = copy_p.next
        return copy_head
```

#### 题 36：二叉搜索树与双向链表
> 输入一个二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。要求不能创建任何新节点，只能调整树中节点指针的指向。

```python
# -*- coding:utf-8 -*-
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def Convert(self, pRootOfTree):
        """将二叉搜索树与双向链表

        Args:
            pRootOfTree (TreeNode): 二叉树根节点

        Returns:
            TreeNode: 双向链表头部
        """

        if pRootOfTree is None:
            return pRootOfTree
        if pRootOfTree.left is None and pRootOfTree.right is None:
            return pRootOfTree

        def mid_order(root, res):
            if root is None:
                return res

            mid_order(root.right, res)
            res.append(root)
            mid_order(root.left, res)

            return res
        pre_res = mid_order(pRootOfTree, [])
        pre_res = pre_res[::-1]
        head = pre_res[0]
        head.left = None
        head.right = pre_res[1]
        if len(pre_res) > 2:
            for i in range(1, len(pre_res)-1):
                temp = pre_res[i]
                temp.left = pre_res[i-1]
                temp.right = pre_res[i+1]

        pre_res[-1].right = None
        pre_res[-1].left = pre_res[-2]
        return head
```

#### 题 37：序列化二叉树
**题目：**
> 请实现两个函数，分别用来序列化和反序列化二叉树

```python
# -*- coding:utf-8 -*-
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def Serialize(self, root):
        """前序序列化二叉树

        Args:
            root (TreeNo): 二叉树根节点

        Returns:
            str: 序列化字符串
        """

        if root is None:
            return '#_'
        res = '%d_' % root.val
        res += self.Serialize(root.left)
        res += self.Serialize(root.right)
        return res

    def Deserialize(self, s):
        """根据字符串反序列化由 Serialize 函数序列化的二叉树

        Args:
            s (str): 序列化的字符串

        Returns:
            TreeNode: 反序列化之后二叉树头结点
        """

        s = s.split('_')[:-1]

        def inside(s):
            head = s.pop(0)
            print(head)
            if head == '#':
                return None
            head = TreeNode(int(head))
            head.left = inside(s)
            head.right = inside(s)

            return head

        return inside(s)
```

#### 题 38：字符串的排列

**解法：** <br>
全排列问题，可以用递归做。递归做的越多越发现有时候递归不是很好写。暂定以后的递归套路为分析最后情况，制定 basecase 必须要给递归返回有利条件。

```python
# -*- coding:utf-8 -*-
class Solution:
    def Permutation(self, ss):
        if ss is None or len(ss) < 2:
            return ss
        ss = list(ss)
        res = set({})
        self.permut(ss, 0, res)

        return sorted(list(res))

    def permut(self, ss, begin, res):
        if begin == len(ss) - 1:
            res.add(''.join(ss))
            return

        cur = begin
        for cur in range(begin, len(ss)):
            self.swap(ss, begin, cur)    # 交换
            self.permut(ss, begin+1, res)
            self.swap(ss, begin, cur)    # 复位

    def swap(self, ss, i, j):
        ss[i], ss[j] = ss[j], ss[i]
```



