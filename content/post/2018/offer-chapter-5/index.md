---
title: "剑指 offer 第五章 题 39-52 题解 Python 版"
date: 2018-08-25
keywords:
  - 剑指 Offer
  - Python
---


## 时间效率类考察题：
节省时间就是延长生命。：）
* * *
### 题 39：数组中出现次数超过一半的数字
> 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。例如，输入一个长度为 9 的数组{1， 2， 3，2， 2， 2， 5， 4， 2}

**解法：** <br>
1.借用 partition 函数：<br>
> 如果一个元素在数组中出现次数超过一半，那么该元素一定也占据**排序数组**中位数位置。我们可以利用快排 partition 过程求得数组中位数元素。


<!-- more -->
```python
# -*- coding:utf-8 -*-
import random


class Solution:
    def MoreThanHalfNum_Solution(self, numbers):
        if len(numbers) <= 0:
            return None

        length = len(numbers)
        l, r = 0, length - 1
        middle = length >> 1
        m_left, m_right = self.partition(numbers, l, r)
        while middle not in range(m_left, m_right+1):
            if middle < m_left:
                r = m_left - 1
                m_left, m_right = self.partition(numbers, l, r)
            else:
                l = m_right + 1
                m_left, m_right = self.partition(numbers, l, r)

        return numbers[middle] if numbers.count(numbers[middle]) > length // 2 else 0

    def partition(self, numbers, l, r):
        """快排 partition 过程

        Arguments:
            numbers {list} -- 数组
            l {int} -- 左边界
            r {int} -- 右边界

        Returns:
            tuple -- 第一个元素为本轮选中元素占据的最左索引，第二个元素为本轮选中元素占据的最右索引
                     如果本轮选中元素在数组中只有一个，那么 tuple 中两个元素就是相等的。
        """

        self.swap(numbers, random.randint(l, r), r)
        start = l - 1
        end = r
        while l < end:
            if numbers[l] < numbers[r]:
                start += 1
                if start != l:
                    self.swap(numbers, start, l)
                l += 1
            elif numbers[l] == numbers[r]:
                l += 1
            else:
                end -= 1
                self.swap(numbers, l, end)
        self.swap(numbers, end, r)
        return start + 1, end

    def swap(self, numbers, i, j):
        numbers[i], numbers[j] = numbers[j], numbers[i]
```

2.使用题目中元素特性<br>
> 如果数组中一个元素出现的次数大于数组长度的一半，那么该元素出现的次数大于数组中其他元素出现的次数和。所以可以设计一个 count 变量用来统计元素个数，具体过程如下：<br>
1.count 初始值设为 0， 遍历数组<br>
2.当前遍历到的数组元素假定为 cur，那么如果此时 count 值为 0，count 值就加一，继续遍历，如果遍历到的元素等于 cur，count 值就加一，反之就减一；<br>
3.返回最后一个将 count 设为 1 的元素；<br>
同样的，我们需要检测最后输出元素是否出现次数是大于数组长度的一半的。

```python
# -*- coding:utf-8 -*-
import random


class Solution:
    def MoreThanHalfNum_Solution(self, numbers):
        if len(numbers) <= 0:
            return None

        count = 0
        for i in range(len(numbers)):
            if count == 0:
                flag = numbers[i]
                count += 1
            else:
                if numbers[i] != flag:
                    count -= 1
                else:
                    count += 1

        return flag if numbers.count(flag) > len(numbers) // 2 else 0
```
* * *
### 题 39 衍生题：给定整数 K，求长度为 N 的数组中元素出现次数超过 N/K 的元素

**解法：** <br>
这个题跟题 39 一脉相承，在题 39 中，我们的解法原型其实是每次都数组里删除两个不同的元素，如果数组中存在出现次数超过数组一般的元素，那么不同元素对删除完成之后剩下的元素一定是所求元素。<br>
现在拓展开来，如果我们要求数组中出现次数大于 N/K 的元素，那么我们一次删除 k-1 个，最后剩余的 k-1 个也就包含出现次数大于 N/K 的元素。<br>
拓展情况是包括题 39 的，拓展情况代码流程如下：<br>
&emsp;&emsp;1.首先设定一个大小为 k-1 的字典（出现次数超过 N/K 的元素，最多只可能有 k-1 个）;<br>
&emsp;&emsp;2.遍历数组，检测当前元素是否在字典里，<br>
&emsp;&emsp;&emsp;&emsp;1.如果在字典里，字典里对应 key 的 value 值加一；<br>
&emsp;&emsp;&emsp;&emsp;2.如果不在字典里：<br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;字典未满时，以当前遍历到的数组元素为 key，value 设为 1;<br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;如果字典已满，那么将字典中所有 key 对应的 value 值都减去 1（即从数组中删除了 K 个不同的元素）;<br>
&emsp;&emsp;3.每遍历一个元素，删除字典中 value 值小于 1 的元素。<br>
最后在字典里的元素就包括所求元素，我们做最后的检查就行了。
上面两种情况所求的的数据，我们都要最终校验数据是不是真的出现了符合要求的次数。

```python
# -*- coding=utf-8 -*-


def get_nk_item(arr, k):
    """求数组中出现次数超过 N/K 的元素

    Arguments:
        arr {list} -- 数组
        k {int} -- 分母

    Returns:
        tuple -- 所求元素
    """

    if len(arr) < k:
        return 0

    buf_dict = {}
    for i in range(len(arr)):
        if arr[i] in buf_dict:
            buf_dict[arr[i]] += 1
        else:
            if len(buf_dict) < k - 1:
                buf_dict[arr[i]] = 1
            else:
                for item in buf_dict:
                    buf_dict[item] -= 1
        remove_invalid(buf_dict)

    check_valid(arr, k, buf_dict)

    return tuple(buf_dict.keys())


def remove_invalid(buf_dict):
    """删除 buf_dict 中 value 值小于 1 的元素"""

    buf_remove = []
    for item in buf_dict:
        if buf_dict[item] < 1:
            buf_remove.append(item)

    for item in buf_remove:
        buf_dict.pop(item)


def check_valid(arr, k, buf_dict):
    """检测所求的元素是否满足次数要求"""

    buf_remove = []
    for item in buf_dict:
        if arr.count(item) <= len(arr) // k:
            buf_remove.append(item)

    for item in buf_remove:
        buf_dict.pop(item)
```

* * *
### 题 40：最小的 k 个数
> 输入 n 个整数，找出其中个最小的 k 个数。例如，输入 4、5、1、6、2、7、3、8 这八个数，则最小的 4 个数字是 1、2、3、4.

**解法：** <br>
1.借用 partition 函数<br>
> 如题 39，我们可以借用 partition 函数在 O(n)的时间复杂度内找到排序数组中索引为 k 的元素，然后输出前 k 个元素就行了，**注意：此时输出的前 k 个元素是无序的。**

```python
# -*- coding:utf-8 -*-
import random


class Solution:
    def GetLeastNumbers_Solution(self, tinput, k):
        if tinput is None or k is None or k > len(tinput) or k <= 0:
            return []
        if k == len(tinput):
            return tinput

        l, r = 0, len(tinput) - 1
        m_left, m_right = self.partition(tinput, l, r)
        while k not in range(m_left, m_right+1):
            if k < m_left:
                r = m_left - 1
                m_left, m_right = self.partition(tinput, l, r)
            else:
                l = m_right + 1
                m_left, m_right = self.partition(tinput, l, r)

        return tinput[:k]

    def partition(self, arr, l, r):
        self.swap(arr, random.randint(l, r), r)
        start = l - 1
        end = r
        while l < end:
            if arr[l] < arr[r]:
                start += 1
                if l != start:
                    self.swap(arr, l, start)
                l += 1
            elif arr[l] == arr[r]:
                l += 1
            else:
                end -= 1
                self.swap(arr, l, end)
        self.swap(arr, end, r)

        return start+1, end

    def swap(self, arr, i, j):
        arr[i], arr[j] = arr[j], arr[i]
```

2.借用堆的概念<br>
> 使用 partition 函数我们会破坏原有数组，如果不破坏原有数组就得复制一个新数组，如果数组很长，那么无疑 partition 的解法就有了缺点；<br>
使用堆我们就能很好的处理大数据的问题：<br>
1.首先我们利用数组前 k 个元素建立一个大小为 k 的最大堆；<br>
2.然后从数组第 k+1 个元素开始，<br>
&emsp;&emsp;如果当前元素小于堆顶，那么将堆顶弹出，然后将当前元素加入堆，并再次调节好堆，继续遍历过程；<br>
&emsp;&emsp;如果当前元素大于堆顶，那么继续遍历；<br>

**在方法二的代码实现中，我利用了 python 自带模块`heapq`.**

```python
# -*- coding:utf-8 -*-
import heapq


class Solution:
    def GetLeastNumbers_Solution(self, tinput, k):
        if tinput is None or k is None or k > len(tinput) or k <= 0:
            return []

        res = []
        for i in range(k):
            res.append(-tinput[i])
        heapq.heapify(res)
        for i in range(k, len(tinput)):
            if tinput[i] < -res[0]:
                res[0] = -tinput[i]
                heapq.heapify(res)

        return sorted(list(map(lambda x: -x, res)))
```

* * *
### 题 41：数据流中的中位数
> 如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数组排序之后位于中间的值。如果从数据流中读出偶数个个数值，那么中位数就是所有数组排序之后中间两个数的平均值。

**解法：** <br>
要求中位数随时可以求得，那么构建一个最大堆，一个最小堆，并且保持最大堆与最小堆中元素个数差值不超过 2.

```python
# -*- coding:utf-8 -*-
import heapq


class Solution:
    def __init__(self):
        self.min_heap = list([])
        self.max_heap = list([])

    def Insert(self, num):
        if not self.min_heap and not self.max_heap:
            heapq.heappush(self.min_heap, num)
            return
        if num > self.min_heap[0]:
            heapq.heappush(self.min_heap, num)
        else:
            heapq.heappush(self.max_heap, -num)
        if abs(len(self.min_heap) - len(self.max_heap)) > 1:
            self.balance()

    def balance(self):
        pop_heap, push_heap = (self.min_heap, self.max_heap) if len(
            self.min_heap) > len(self.max_heap) else (self.max_heap, self.min_heap)

        while len(pop_heap) - len(push_heap) > 1:
            heapq.heappush(push_heap, -heapq.heappop(pop_heap))

    def GetMedian(self):
        if len(self.max_heap) == len(self.min_heap):
            return (-self.max_heap[0] + self.min_heap[0]) / 2
        else:
            return -self.max_heap[0] if len(self.max_heap) > len(self.min_heap) else self.min_heap[0]
```

* * *
### 题 42：连续子数组的最大和
> 输入一个整型数组，数组里有正数也有负数。数组中一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。要求时间复杂度为 O(n).

**解法：** <br>
1.普通方法，遍历数组求解最大和：<br>
 在遍历数组过程中，我们设定一个变量 cur_sum 用来统计当前和，设定一个变量 max_sum 用来保存当前已经遍历过的元素组成的数组里的最大子数组和。 在每一步遍历中，我们都比较 cur_sum 和我们记录的 max_sum, 将较大的那个值设定为新的 max_sum：<br>
如果 cur_sum 当前值为正，那么 cur_sum 加上当前遍历元素可能比 cur_sum 要更大，此时 cur_sum 就加上当前遍历元素；<br>
如果 cur_sum 当前值为负，那么 cur_sum 机上当前遍历元素一定要比当前遍历到的元素小，那么明显的这个 cur_sum 不可能是最大的子数组和，此时将 cur_sum 设置为当前遍历到的元素，开启一个新的子数组和的计算。

```python
# -*- coding:utf-8 -*-
class Solution:
    def FindGreatestSumOfSubArray(self, array):
        if array is None:
            return None
        if len(array) < 2:
            return sum(array)

        max_sum = min(array)
        cur_sum = 0
        for item in array:
            if cur_sum < 0:
                cur_sum = item
            else:
                cur_sum += item

            if cur_sum > max_sum:
                max_sum = cur_sum

        return max_sum
```

2.使用动态规划：<br>

> 状态方程： <br>
233333，这题用动态规划好简单。<br>
```
f(n) = f(n-1) + arr[n] if f(n-1) > 0 <br>
f(n) = arr[n] if f(n-1) <= 0
```

```python
class Solution:
    def FindGreatestSumOfSubArray(self, arr):
        if arr is None:
            return None
        if len(arr) < 2:
            return sum(arr)

        res = [arr[0] for x in range(len(arr))]
        for i in range(1, len(arr)):
            if res[i-1] <= 0:
                res[i] = arr[i]
            else:
                res[i] = res[i-1] + arr[i]

        return max(res)
```

* * *
### 题 43：1~n 整数中 1 出现的次数
> 输入一个整数 n，求 1~n 这 n 个数整数的十进制表示中 1 出现的次数。例如，输入 12，1~12 这些证书中包含 1 的数字有 1、10、11 和 12，1 一共出现了 5 次。

**解法：** <br>
![1-n 中 1 出现的次数](occurrencesOf1.webp)

```python
# -*- coding=utf-8 -*-
class GetOccurTimesOfOne():
    """计算 1-n 中所有数字中 1 出现的次数"""
    def get_occur_time_of_one(self, num):
        if num is None or num < 1:
            return 0

        length = self.get_num_length(num)
        first = int(str(num)[0])
        # 第一位
        if first == 1:
            first_sum = num % self.base_10(length-1) + 1
        if first != 1:
            first_sum = self.base_10(length - 1)
        # 其他位
        other_num = self.base_10(length - 2) * (length - 1) * first
        next_num = self.get_occur_time_of_one(num % self.base_10(length-1))
        return first_sum + other_num + next_num

    def base_10(self, length):
        num = 1
        while length > 0:
            num *= 10
            length -= 1
        return num

    def get_num_length(self, num):
        length = 0
        while num != 0:
            length += 1
            num = num // 10
        return length
```

* * *
### 题 44： 数字序列中某一位的数字

> 数字以 0123456789101112131415...的格式序列化到一个字符序列中。在这个序列中，第 5 位（从 0 开始计数）是 5，第 13 位是 1， 第 19 位是 4，等等。倾斜一个函数，求任意第 n 位对应的数字。

**解法：** <br>
![解法](nth_int_in_sequence.webp)

```python
# -*- coding=utf-8 -*-
import sys


def get_nth_num_of_sequence(n):
    if n is None or n < 0:
        return None
    if n < 10:
        return n
    # 判断第 n 位的数组是几位数组以及对应位数数组在序列中开始的位置
    full_length, start = get_length_and_delta(n)
    # n 位为几位数的第几个数的第几位
    nth, delta = (n - start) // full_length, (n - start) % full_length
    num = base_10(full_length - 1) + nth
    return int(str(num)[delta])


def get_nth_of_num(num, i):
    num = list(str(num))
    return int(num[i])


def base_10(length):
    num = 1
    while length > 0:
        num *= 10
        length -= 1
    return num


def get_length_and_delta(n):
    start = i = 1
    while start <= n:
        more = 9 * (10 ** (i - 1)) * i
        start += more
        i += 1
    return i - 1, start - more


if __name__ == "__main__":
    n = int(sys.argv[1])
    print(get_nth_num_of_sequence(n))
```

* * *
### 题 45：把数组排成最小的数
> 输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。例如，输入数组{3， 32， 321}， 则打印出这三个数字能排成的最小数字 321323.

**解法：** <br>
1. 剑指 offer 上的解法定义自定义比较器很贪心，自己用了另外一种解法，更清楚明了。
![arrange list to min value](arrange_list_to_min_value.webp)

```python
# -*- coding:utf-8 -*-
class Solution:
    def PrintMinNumber(self, numbers):
        if numbers is None or len(numbers) < 1:
            return None

        temp_dict = {key: str(value) for key, value in enumerate(numbers)}
        longest = self.get_longest(temp_dict.values())
        for i in range(len(temp_dict)):
            while len(temp_dict[i]) < longest:
                temp_dict[i] = temp_dict[i] + temp_dict[i][-1]

        res = []
        for item in sorted(temp_dict.items(), key=lambda item: item[1]):
            res.append(numbers[item[0]])
        return int(''.join(map(str, res)))

    def get_longest(self, arr):
        longest = 0
        for item in arr:
            if len(item) > longest:
                longest = len(item)
        return longest


if __name__ == "__main__":
    nums = [3, 32, 321]
    ex = Solution()
    print(ex.PrintMinNumber(nums))
```


* * *
### 题 46：把数字翻译成字符串
> 给定一个数字，我们按照如下规则把它翻译成字符串：0 翻译成'a', 1 翻译成‘b’， ……， 11 翻译成‘I’， ……， 25 翻译成‘z’。一个数字可能有多个翻译。例如，12258 有 5 种不同的翻译，分别是'bccfi'、‘bwfi’、‘bczi’、‘mcfi’和'mzi'。请编程实现一个函数，用来计算一个数字有多少种不同的翻译方法。


**解法：** <br>
![convert int to str](convert_int_to_str.webp)

```python
# -*- coding=utf-8 -*-
class Solution():
    # 暴力递归版本
    def convert_int_to_str_recur(self, num):
        if num < 0:
            return None

        num = str(num)
        return self.process(num, 0)

    def process(self, num, index):
        if index >= len(num) - 1:
            return 1

        p1 = self.process(num, index+1)
        p2 = self.process(num, index+2) if int(num[index:index+2]) <= 25 else 0

        return p1 + p2

    # 动态规划版本
    def convert_int_to_str(self, num):
        if num < 0:
            return None

        num = str(num)
        res = [0 for i in range(len(num))]
        res [-1], res[-2] = 1, 2 if int(num[-2:]) <= 25 else 1
        for i in range(len(num)-3, -1, -1):
            res[i] = res[i+1]
            if int(num[i:i+2]) <= 25:
                res[i] += res[i+2]
        return res[0]

if __name__ == "__main__":
    num = 12226
    ex = Solution()
    print(ex.convert_int_to_str(num))
```

* * *
### 题 47：礼物的最大价值
> 在一个 mxn 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘左下角开始拿格子里的礼物，并且每次向右或者向下移动一格，直到到达棋盘的右下角。给定一个棋盘以及上面的礼物，请计算能达到的最大价值数。

![max value of presents](max_value_of_presents.webp)

```python
# -*- coding=utf-8 -*-
class Solution():
    def max_value_of_presents_recur(self, arr):
        if arr is None:
            return None
        if len(arr) == 0 or len(arr[0]) == 0:
            return 0

        row_l = len(arr)
        col_l = len(arr[0])
        return self.process(arr, 0, 0, row_l-1, col_l-1)

    def process(self, arr, i, j, row_l, col_l):
        if i == row_l and j == col_l:
            return arr[i][j]

        if i == row_l:
            res = arr[i][j] + self.process(arr, i, j+1, row_l, col_l)
        elif j == col_l:
            res = arr[i][j] + self.process(arr, i+1, j, row_l, col_l)
        else:
            res = arr[i][j] + max(self.process(arr, i, j+1, row_l, col_l),
                                  self.process(arr, i+1, j, row_l, col_l))
        return res

    # 动态规划版本
    def max_value_of_presents(self, arr):
        if arr is None:
            return None
        if len(arr) == 0 or len(arr[0]) == 0:
            return 0

        row_l = len(arr)
        col_l = len(arr[0])
        res = [[0 for i in range(len(arr[0]))] for i in range(len(arr))]
        res[row_l-1][col_l-1] = arr[row_l-1][col_l-1]

        i = row_l - 1
        for j in range(col_l-2, -1, -1):
            res[i][j] = arr[i][j] + res[i][j+1]

        j = col_l - 1
        for i in range(row_l-2, -1, -1):
            res[i][j] = arr[i][j] + res[i+1][j]

        for i in range(row_l-2, -1, -1):
            for j in range(col_l-2, -1, -1):
                res[i][j] = arr[i][j] + max(res[i+1][j], res[i][j+1])

        return res[0][0]


if __name__ == "__main__":
    arr = [[1, 10, 3, 8],
           [12, 2, 9, 6],
           [5, 7, 4, 11],
           [3, 7, 16, 5],
           ]
    ex = Solution()
    print(ex.max_value_of_presents(arr))
```

* * *
### 题 48：最长不含重复字符的子字符串

> 请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长字符串的长度。假设字符串中只包含‘a’-‘z’的字符。例如，在字符串“arabcacfr”中，最长的不含重复字符的字符串是“acfr”，长度为 4.

**解法：** <br>
![max length of undup str](max_length_of_undup_str.webp)

```python
# -*- coding=utf-8 -*-


class Solution():
    def get_max_length_of_undup_str(self, string):
        if string is None or len(string) <= 1:
            return int(string) if string is not None else None

        res = [0 for i in range(len(string))]
        index_arr = [-1 for i in range(52)]
        res[0] = 1
        index_arr[self.get_index(0, string)] = 0
        for i in range(1, len(string)):
            char_index = self.get_index(i, string)
            delta = i - index_arr[char_index]
            if index_arr[char_index] == -1 or delta > res[i-1]:
                res[i] = res[i-1] + 1
            else:
                res[i] = delta
            # 更新当前字符的最新索引
            index_arr[char_index] = i

        return res[-1]

    def get_index(self, index, string):
        temp = ord(string[index])
        if 65 <= temp <= 90:
            return temp - ord('A')
        elif 97 <= temp <= 122:
            return temp - ord('a') + 26
        else:
            raise TypeError('not a valid char!')


if __name__ == "__main__":
    string = 'arabcacfr' # answer is 4
    ex = Solution()
    print(ex.get_max_length_of_undup_str(string))
```

## 时间效率与空间效率的平衡
鱼与熊掌兼得

* * *
### 题 49： 丑数
> 我们把只包含因子 2、3 和 5 的数称为丑数（Ugly Number）。求从小到大的书序的第 1500 个丑数。例如 6、8 都是丑数，但 14 不是，因为它包含因子 7.习惯上我们把 1 当做第一个丑数。

**解法：** <br>
![ugly number](ugly_number.webp)

```python
# -*- coding=utf-8 -*-
import numbers


class Solution:
    def GetUglyNumber_Solution(self, index):
        assert isinstance(index, numbers.Integral)
        if index < 1:
            return None

        ugly = [1]
        while len(ugly) <= index:
            for item in ugly:
                if item * 2 > ugly[-1]:
                    break
            p1 = item * 2
            for item in ugly:
                if item * 3 > ugly[-1]:
                    break
            p2 = item * 3
            for item in ugly:
                if item * 5 > ugly[-1]:
                    break
            p3 = item * 5
            ugly.append(min(p1, p2, p3))

        return ugly[-1]


if __name__ == "__main__":
    n = [2, 3, 4, 5, 6, 7]
    ex = Solution()
    for item in n:
        print(ex.GetUglyNumber_Solution(item))
```


* * *
### 题 50：第一个只出现一次的字符
> 在字符串中找出第一个只出现一次的字符。如输入“abaccdeff”, 则输出‘b'

**解法：** <br>
1. 耍流氓式解法：利用 Python 标准库 Counter 计数器。
Counter 计算器会根据字符在字符串中出现的先后顺序返回字符在字符串中出现的次数，我们只要找到 Counter 中第一个 value 值为 1 的 key 就好了。

```python
# -*- coding:utf-8 -*-
from collections import Counter


class Solution:
    def FirstNotRepeatingChar(self, s):
        if s is None:
            return -1
        if len(s) == 0:
            return -1

        counter = Counter(s)
        for i in range(len(s)):
            if counter[s[i]] == 1:
                return i
        return -1
```

* * *
### 题 51： 数组中的逆序对

**解法：** <br>
![Inverse Pairs](inversed_pairs.webp)

```python
# -*- coding=utf-8 -*-


class Solution():
    def InversePairs_recur(self, data):
        if data is None or len(data) < 2:
            return 0

        return self.merge(data, 0, len(data)-1)

    def merge(self, data, left, right):
        if left == right:
            return 0

        middle = left + ((right - left) >> 1)
        left_pairs = self.merge(data, left, middle)
        right_pairs = self.merge(data, middle+1, right)
        merge_pairs = self.process(data, left, right, middle)

        return left_pairs + right_pairs + merge_pairs

    def process(self, data, left, right, middle):
        l, r = left, middle+1
        pairs = 0
        cur = left
        temp_arr = [0 for i in range(len(data))]
        while l <= middle and r <= right:
            # 如果左边数组元素 l 大于右边数组元素 r，则有逆序对 middle - l + 1
            if data[l] > data[r]:
                temp_arr[cur] = data[r]
                r += 1
                cur += 1
                pairs += middle - l + 1
            else:
                temp_arr[cur] = data[l]
                l += 1
                cur += 1
        while l <= middle:
            temp_arr[cur] = data[l]
            cur += 1
            l += 1
        while r <= right:
            temp_arr[cur] = data[r]
            r += 1
            cur += 1
        for i in range(left, right+1):
            data[i] = temp_arr[i]

        return pairs
```

**牛客网提示这个算法超时，我开始以为写的有问题，还改成了非递归归并，后来仔细想了想，不管是递归归并还是非递归归并时间复杂度都是 O(nlogn)，所以应该是牛客的问题，后来果然发现，随便直接输出一个值也会提示超时······呵呵哒。**


* * *
### 题 52：两个链表的第一个公共节点
> 输入两个链表，找出他们的第一个公共节点。链表节点定义如下：
```c++
struct ListNode
{
	int		  m_nkey;
	ListNode* m_pNext;
}
```

**解法：** <br>
![common node of linkedlists](common_node_of_LinkedLists.webp)

```python
# -*- coding:utf-8 -*-


class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    def FindFirstCommonNode(self, pHead1, pHead2):
        if pHead1 is None or pHead2 is None:
            return None

        loop1 = self.check_loop(pHead1)
        loop2 = self.check_loop(pHead2)
        # 都有环
        if loop1 and loop2:
            p = loop1
            while p.next != loop1:
                if p == loop2:
                    return loop1
                p = p.next
            return None
        # 都无环
        elif (not loop1) and (not loop2):
            p1, p2 = pHead1, pHead2
            while p1 != p2:
                p1 = pHead1 if p1 is None else p1.next
                p2 = pHead2 if p2 is None else p2.next
            return p1
        else:
            return None

    @staticmethod
    def check_loop(pHead):
        if pHead.next is None:
            return False

        buf_dict = {}
        p = pHead
        while p is not None:
            if p in buf_dict:
                return p
            buf_dict[pHead] = 0
            p = p.next
        return False
```
