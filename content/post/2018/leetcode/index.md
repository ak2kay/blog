---
title: "LeetCode 每日一题题解集"
date: 2018-09-18
keywords:
  - LeetCode
  - Python
---



# GitHub repo

推荐一个终端刷 LeetCode 的工具：[leetcode-cli](https://github.com/skygragon/leetcode-cli)，如果不想每次刷 LeetCode 开浏览器或者和我一样是终端 vim 党，可以试用一下。个人使用觉得优点：
* 支持关键字搜索，配合插件可以实现分公司查询题目；
* 支持指定语言的模板文件生成；
* 借助插件，可以实现 submit 通过之后自动 push 到对应 Github 仓库。

* * *

<!-- more -->

# LeetCode 71: Simplify Path
**如果程序有一些情况需要回退，那么优先就考虑一下能不能使用栈。**

```python
#
# [71] Simplify Path
#
# https://leetcode.com/problems/simplify-path/description/
#
# algorithms
# Medium (26.95%)
# Total Accepted:    124.7K
# Total Submissions: 461.5K
# Testcase Example:  '"/home/"'
#
# Given an absolute path for a file (Unix-style), simplify it. 
#
# For example,
# path = "/home/", => "/home"
# path = "/a/./b/../../c/", => "/c"
# path = "/a/../../b/../c//.//", => "/c"
# path = "/a//b////c/d//././/..", => "/a/b/c"
#
# In a UNIX-style file system, a period ('.') refers to the current directory,
# so it can be ignored in a simplified path. Additionally, a double period
# ("..") moves up a directory, so it cancels out whatever the last directory
# was. For more information, look here:
# https://en.wikipedia.org/wiki/Path_(computing)#Unix_style
#
# Corner Cases:
#
#
# Did you consider the case where path = "/../"?
# In this case, you should return "/".
# Another corner case is the path might contain multiple slashes '/' together,
# such as "/home//foo/".
# In this case, you should ignore redundant slashes and return "/home/foo".
#


class Solution:
    def simplifyPath(self, path):
        """
        :type path: str
        :rtype: str
        """

        path = path.split('/')
        stack = []
        jump = ('', '.', '..')
        for item in path:
            if stack and item == '..':
                stack.pop()
            elif item not in jump:
                stack.append(item)

        return '/' + '/'.join(stack)

```

# LeetCode 53: maximum subarray
*****典型动规**

```python
#
# [53] Maximum Subarray
#
# https://leetcode.com/problems/maximum-subarray/description/
#
# algorithms
# Easy (41.14%)
# Total Accepted:    367K
# Total Submissions: 890.6K
# Testcase Example:  '[-2,1,-3,4,-1,2,1,-5,4]'
#
# Given an integer array nums, find the contiguous subarray (containing at
# least one number) which has the largest sum and return its sum.
#
# Example:
#
#
# Input: [-2,1,-3,4,-1,2,1,-5,4],
# Output: 6
# Explanation: [4,-1,2,1] has the largest sum = 6.
#
#
# Follow up:
#
# If you have figured out the O(n) solution, try coding another solution using
# the divide and conquer approach, which is more subtle.
#
#


class Solution:
    def maxSubArray(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        length = len(nums)
        if length < 2:
            return sum(nums)

        max_res = pre_res = nums[0]
        for i in range(1, length):
                pre_res = nums[i] if pre_res <= 0 else nums[i] + pre_res
                max_res = max(max_res, pre_res)

        return max_res
```

# LeetCode 28: Implement strStr()
**KMP 算法**
![KMP](kmp.webp)



```python
#
# [28] Implement strStr()
#
# https://leetcode.com/problems/implement-strstr/description/
#
# algorithms
# Easy (29.86%)
# Total Accepted:    316K
# Total Submissions: 1.1M
# Testcase Example:  '"hello"\n"ll"'
#
# Implement strStr().
#
# Return the index of the first occurrence of needle in haystack, or -1 if
# needle is not part of haystack.
#
# Example 1:
#
#
# Input: haystack = "hello", needle = "ll"
# Output: 2
#
#
# Example 2:
#
#
# Input: haystack = "aaaaa", needle = "bba"
# Output: -1
#
#
# Clarification:
#
# What should we return when needle is an empty string? This is a great
# question to ask during an interview.
#
# For the purpose of this problem, we will return 0 when needle is an empty
# string. This is consistent to C's strstr() and Java's indexOf().
#
#
class Solution:
    def strStr(self, haystack, needle):
        """
        :type haystack: str
        :type needle: str
        :rtype: int
        """
        if not needle:
            return 0
        h_length, n_length = len(haystack), len(needle)
        if h_length < n_length:
            return -1

        next_arr = self.get_next_arr(needle)
        i = j = 0
        while i < h_length and j < n_length:
            if haystack[i] == needle[j]:
                i += 1
                j += 1
            elif next_arr[j] == -1:
                i += 1
            else:
                j = next_arr[j]

        return i - j if j == n_length else -1

    def get_next_arr(self, needle):
        length = len(needle)
        if length < 2:
            return [-1]

        next_arr = [0 for i in range(length)]
        next_arr[0], next_arr[1] = -1, 0
        i, cur = 2, 0
        while i < length:
            if needle[cur] == needle[i-1]:
                next_arr[i] = cur + 1
                cur = next_arr[i]
                i += 1
            elif cur > 0:
                cur = next_arr[cur]
            else:
                next_arr[i] = 0
                i += 1

        return next_arr

```

**刚刚随手写 kmp 的时候发现，上面代码`get_next_arr`函数 while 循环里最后一个 else 分支里少些了`i += 1`，这样竟然也通过了 leetcode 的提交。醉了。顺便还试验了下，本来在`strStr`函数里，我是可以直接把 needle 的长度传给`get_next_arr`函数的，但后来发现，这样的话运行时间反而会加长。只能说函数多传一个参数比在函数里多建一个变量用时更长啊。**

# LeetCode 7: Reverse Integer


```python
#
# [7] Reverse Integer
#
# https://leetcode.com/problems/reverse-integer/description/
#
# algorithms
# Easy (24.43%)
# Total Accepted:    480.9K
# Total Submissions: 2M
# Testcase Example:  '123'
#
# Given a 32-bit signed integer, reverse digits of an integer.
#
# Example 1:
# Input: 123
# Output: 321
#
# Example 2:
# Input: -123
# Output: -321
#
# Example 3:
# Input: 120
# Output: 21
#
# Note:
# Assume we are dealing with an environment which could only store integers
# within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of
# this problem, assume that your function returns 0 when the reversed integer
# overflows.


class Solution:
    def reverse(self, x):
        """
        :type x: int
        :rtype: int
        """
        ans = str(x)[::-1] if x >= 0 else '-' + str(x)[:0:-1]
        ans = int(ans)
        if ans < - 2 ** 31 or ans > 2 ** 31 - 1:
            ans = 0

        return ans
```


# LeetCode 15: 3Sum

**有些时候，如果列表内元素需要重复访问的话，可以将其赋给变量，这个题把`nums[left]`, `nums[middle]`, `nums[right]`赋给变量比直接使用多打败了 20%的提交的人。：）**

```python
#
# [15] 3Sum
#
# https://leetcode.com/problems/3sum/description/
#
# algorithms
# Medium (22.03%)
# Total Accepted:    383.4K
# Total Submissions: 1.7M
# Testcase Example:  '[-1,0,1,2,-1,-4]'
#
# Given an array nums of n integers, are there elements a, b, c in nums such
# that a + b + c = 0? Find all unique triplets in the array which gives the sum
# of zero.
#
# Note:
#
# The solution set must not contain duplicate triplets.
#
# Example:
#
#
# Given array nums = [-1, 0, 1, 2, -1, -4],
#
# A solution set is:
# [
#  [-1, 0, 1],
#  [-1, -1, 2]
# ]
#
#
#
class Solution:
    def threeSum(self, nums):
        """
        :type nums: List[int]
        :rtype: List[List[int]]
        """
        length, res = len(nums), []

        if length < 3:
            return res

        nums.sort()

        for left in range(length-2):
            a = nums[left]
            if a > 0:
                break
            if left > 0 and a == nums[left-1]:
                continue

            middle = left + 1
            right = length - 1
            while middle < right:
                b, c = nums[middle], nums[right]
                cur_sum = a + b + c
                if cur_sum == 0:
                    res.append([a, b, c])
                    middle += 1
                    right -= 1
                    while middle < right and nums[middle] == nums[middle-1]:
                        middle += 1
                    while right > middle and nums[right] == nums[right+1]:
                        right -= 1
                elif cur_sum < 0:
                    middle += 1
                else:
                    right -= 1

        return res

```


# LeetCode 21: Merge Two Sorted Lists

**能用`if else`区分情况就不要用两个`if`，会慢。**

```python
#
# [21] Merge Two Sorted Lists
#
# https://leetcode.com/problems/merge-two-sorted-lists/description/
#
# algorithms
# Easy (42.96%)
# Total Accepted:    409.2K
# Total Submissions: 948.5K
# Testcase Example:  '[1,2,4]\n[1,3,4]'
#
# Merge two sorted linked lists and return it as a new list. The new list
# should be made by splicing together the nodes of the first two lists.
#
# Example:
#
# Input: 1->2->4, 1->3->4
# Output: 1->1->2->3->4->4
#
#
#
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def mergeTwoLists(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        if l1 is None:
            return l2
        elif l2 is None:
            return l1

        if l1.val <= l2.val:
            head = l1
            l1 = l1.next
        else:
            head = l2
            l2 = l2.next

        cur = head

        while l1 and l2:
            if l1.val <= l2.val:
                cur.next = l1
                l1 = l1.next
                cur = cur.next
            else:
                cur.next = l2
                l2 = l2.next
                cur = cur.next

        while l1:
            cur.next = l1
            l1 = l1.next
            cur = cur.next

        while l2:
            cur.next = l2
            l2 = l2.next
            cur = cur.next

        return head

```


# LeetCode 20: Valid Parentheses

```python
#
# [20] Valid Parentheses
#
# https://leetcode.com/problems/valid-parentheses/description/
#
# algorithms
# Easy (34.54%)
# Total Accepted:    402.5K
# Total Submissions: 1.2M
# Testcase Example:  '"()"'
#
# Given a string containing just the characters '(', ')', '{', '}', '[' and
# ']', determine if the input string is valid.
#
# An input string is valid if:
#
#
# Open brackets must be closed by the same type of brackets.
# Open brackets must be closed in the correct order.
#
#
# Note that an empty string is also considered valid.
#
# Example 1:
#
#
# Input: "()"
# Output: true
#
#
# Example 2:
#
#
# Input: "()[]{}"
# Output: true
#
#
# Example 3:
#
#
# Input: "(]"
# Output: false
#
#
# Example 4:
#
#
# Input: "([)]"
# Output: false
#
#
# Example 5:
#
#
# Input: "{[]}"
# Output: true
#
#
#
class Solution:
    def isValid(self, s):
        """
        :type s: str
        :rtype: bool
        """
        if not s:
            return True
        elif len(s) % 2 == 1:
            return False
        else:
            check_dict = {'(':')', '{':'}', '[':']'}
            stack = []
            for item in s:
                if item in check_dict:
                    stack.append(item)
                else:
                    if not stack or check_dict[stack[-1]] != item:
                        return False
                    else:
                        stack.pop()

            return True if not stack else False

```

# LeetCode 300: Longest Increasing Subsequence

**1. 第一种最普遍解法，每次往前遍历所有已知`lis`数组元素，来更新`lis[i]`，时间复杂度`O(N**2)`。**

```python
#
# [300] Longest Increasing Subsequence
#
# https://leetcode.com/problems/longest-increasing-subsequence/description/
#
# algorithms
# Medium (39.22%)
# Total Accepted:    154.8K
# Total Submissions: 394.3K
# Testcase Example:  '[10,9,2,5,3,7,101,18]'
#
# Given an unsorted array of integers, find the length of longest increasing
# subsequence.
#
# Example:
#
#
# Input: [10,9,2,5,3,7,101,18]
# Output: 4
# Explanation: The longest increasing subsequence is [2,3,7,101], therefore the
# length is 4.
#
# Note:
#
#
# There may be more than one LIS combination, it is only necessary for you to
# return the length.
# Your algorithm should run in O(n2) complexity.
#
#
# Follow up: Could you improve it to O(n log n) time complexity?
#
#
class Solution:
    def lengthOfLIS(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        length = len(nums)
        if length < 2:
            return length

        res = [1 for i in range(length)]
        i = 1
        while i < length:
            temp = nums[i]
            res[i] = 1
            for j in range(i-1, -1, -1):
                if temp > nums[j]:
                    res[i] = max(res[i], res[j]+1)
            i += 1

        return max(res)

```

**2. 一种新思路的解法， 跟解法一比较除了使用`lis`数组来保存以对应位置元素结尾的最长递增序列的长度之外，额外添加了一个`max_v`数组，对应数组元素`max_v[i]`代表`i`长度的递增子序列里的最大值的最小值；有了这个数组之后，我们就可以从当前已知最长的递增子序列长度`cur_max`开始递减匹配（递减匹配过程中，用`j`作中间变量），那么如果当前元素`nums[i]`大于`max_v[j]`，那么`i`位置最长的递增子序列长度`lis[i]=j+1`，同时我们要根据`lis[i]`的值来决定更不更新`cur_max`；同时也要根据`num[i]`是否小于`max_v[j+1]`来确定更不更新最长递增子序列长度为`j+1`的那些递增子序列的最大值，此算法时间复杂度`O(n**2)`。**

```python
class Solution:
    def lengthOfLIS(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        length = len(nums)
        if length < 2:
            return length

        max_v = [0 for i in range(length+1)]

        max_v[0] = min(nums) - 1
        max_v[1] = nums[0]
        lis = [1 for i in range(length)]

        cur_max = 1
        for i in range(1, length):
            for j in range(cur_max, -1, -1):
                if nums[i] > max_v[j]:
                    lis[i] = j + 1
                    break
            # 如果更新了当前最大值，那么更新 max_v
            if lis[i] > cur_max:
                cur_max = lis[i]
                max_v[cur_max] = nums[i]
            # 如果没有更新最大值，那么找到可能被 i 更新的 j
            # 当 nums[i] > max_v[j]也就是进入到了上面 for 循环中的 if 条件中
            # 如果进入了条件中，那么如果 nums[i]比原来 max_v[j+1]小的时候才有
            # 更新价值；
            elif nums[i] > max_v[j] and nums[i] < max_v[j+1]:
                max_v[j+1] = nums[i]

        return cur_max
```

********3. 上面的顺序匹配过程还可以改成二分，因为如果`i>j`, 那么一定有`max_v[i] > max_v[j]`，此算法时间复杂度`O(n*logn)`。**

```python
class Solution:
    def lengthOfLIS(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        length = len(nums)
        if length < 2:
            return length

        max_v = [0 for i in range(length+1)]

        max_v[0] = min(nums) - 1
        max_v[1] = nums[0]
        lis = [1 for i in range(length)]

        cur_max = 1
        for i in range(1, length):
            index = self.get_index(max_v[:cur_max+1], nums[i])
            if index >= 0:
                max_v[index+1] = nums[i]
                cur_max = max(cur_max, index+1)

        return cur_max

    def get_index(self, max_v, num):
        length = len(max_v)

        if num > max_v[-1]:
            return length - 1
        if num < max_v[0]:
            return -1

        low = 0
        high = length - 1
        while low <= high:
            middle = low + ((high - low) >> 1)
            if max_v[middle] < num and max_v[middle+1] > num:
                return middle
            elif max_v[middle] == num:
                return -1
            elif max_v[middle] > num:
                high = middle - 1
            else:
                low = middle + 1
```


# LeetCode 5: Longest Palindromic Substring

![manacher](manacher.webp)

```python
#
# [5] Longest Palindromic Substring
#
# https://leetcode.com/problems/longest-palindromic-substring/description/
#
# algorithms
# Medium (25.62%)
# Total Accepted:    370.8K
# Total Submissions: 1.4M
# Testcase Example:  '"babad"'
#
# Given a string s, find the longest palindromic substring in s. You may assume
# that the maximum length of s is 1000.
#
# Example 1:
#
#
# Input: "babad"
# Output: "bab"
# Note: "aba" is also a valid answer.
#
#
# Example 2:
#
#
# Input: "cbbd"
# Output: "bb"
#
#
#
class Solution:
    def longestPalindrome(self, s):
        """
        :type s: str
        :rtype: str
        """
        if s is None:
            return ''

        length = len(s)
        if length < 2:
            return s
        s = self.str_trans(s)
        length = len(s)
        res = [1 for i in range(length)]
        i = 0
        while i < length:
            j, step = i, 1
            while j-step > -1 and j+step < length and s[j-step] == s[j+step]:
                res[i] += 2
                step += 1
            i += 1

        lp = max(res)
        lp_index = res.index(lp)
        lp = lp // 2
        lp = s[lp_index-lp:lp_index+lp+1]
        return lp.replace('#', '')

    def str_trans(self, s):
        s = list(s)
        for i in range(len(s)):
            s[i] = '#' + s[i]
        s.append('#')
        return ''.join(s)
```


**使用 manacher 算法的解法：**

```python
class Solution:
    def longestPalindrome(self, s):
        """
        :type s: str
        :rtype: str
        """
        if s is None:
            return ''

        length = len(s)
        if length < 2:
            return s

        s = self.str_trans(s)

        length = len(s)
        res = [1 for i in range(length)]
        right = c  = -1
        for i in range(length):
            res[i] = min(res[2*c-i], right-i) if right > i else 1
            while i-res[i] > -1 and i+res[i] < length:
                if s[i-res[i]] == s[i+res[i]]:
                    res[i] += 1
                else:
                    break
            res[i] -= 1

            if i + res[i] > right:
                right = i + res[i]
                c = i

        lp = max(res)
        lp_index = res.index(lp)
        lp = s[lp_index-lp:lp_index+lp+1]
        return lp.replace('#', '')

    def str_trans(self, s):
        s = list(s)
        for i in range(len(s)):
            s[i] = '#' + s[i]
        s.append('#')
        return ''.join(s)

```

# LeetCode 9: Palindrome Number [boring question]

```python
#
# [9] Palindrome Number
#
# https://leetcode.com/problems/palindrome-number/description/
#
# algorithms
# Easy (38.18%)
# Total Accepted:    399.3K
# Total Submissions: 1M
# Testcase Example:  '121'
#
# Determine whether an integer is a palindrome. An integer is a palindrome when
# it reads the same backward as forward.
#
# Example 1:
#
#
# Input: 121
# Output: true
#
#
# Example 2:
#
#
# Input: -121
# Output: false
# Explanation: From left to right, it reads -121. From right to left, it
# becomes 121-. Therefore it is not a palindrome.
#
#
# Example 3:
#
#
# Input: 10
# Output: false
# Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
#
#
# Follow up:
#
# Coud you solve it without converting the integer to a string?
#
#
class Solution:
    def isPalindrome(self, x):
        """
        :type x: int
        :rtype: bool
        """
        x = list(str(x))
        low, high = 0, len(x)-1
        while low < high:
            if x[low] != x[high]:
                return False
            low += 1
            high -= 1
        return True

```

# LeetCode 6: ZigZag

**这个题还是挺有意思的，主要是分析以及实现。剑指 offer 上说的没错，借助几个具体例子，很容易就能摸清一般规律，解法如下：**

![zigzag-leetcode6](zigzag_leetcode6.webp)

```python
#
# [6] ZigZag Conversion
#
# https://leetcode.com/problems/zigzag-conversion/description/
#
# algorithms
# Medium (28.47%)
# Total Accepted:    239.9K
# Total Submissions: 838K
# Testcase Example:  '"PAYPALISHIRING"\n3'
#
# The string "PAYPALISHIRING" is written in a zigzag pattern on a given number
# of rows like this: (you may want to display this pattern in a fixed font for
# better legibility)
#
#
# P   A   H   N
# A P L S I I G
# Y   I   R
#
#
# And then read line by line: "PAHNAPLSIIGYIR"
#
# Write the code that will take a string and make this conversion given a
# number of rows:
#
#
# string convert(string s, int numRows);
#
# Example 1:
#
#
# Input: s = "PAYPALISHIRING", numRows = 3
# Output: "PAHNAPLSIIGYIR"
#
#
# Example 2:
#
#
# Input: s = "PAYPALISHIRING", numRows = 4
# Output: "PINALSIGYAHRPI"
# Explanation:
#
# P     I    N
# A   L S  I G
# Y A   H R
# P     I
#
#


class Solution:
    def convert(self, s, numRows):
        """
        :type s: str
        :type numRows: int
        :rtype: str
        """
        length = len(s)
        if numRows == 1 or length <= numRows:
            return s

        res = []
        for i in range(numRows):
            # max_delta 是打印第一行两个字符串之间的索引距离
            max_delta = numRows * 2 - 2
            j = i
            res.append(s[j])
            # next_must 为当前打印行和第一行竖直对应的元素索引
            next_must = j + max_delta
            # next_cur 为为斜坡元素
            next_cur = next_must - 2 * i
            while next_cur < length:
                if next_cur != j and next_cur != next_must:
                    res.append(s[next_cur])
                if next_must < length:
                    res.append(s[next_must])
                j = next_must
                next_must = j + max_delta
                next_cur = next_must - i * 2

        return ''.join(res)


# if __name__ == "__main__":
#     s = 'PAYPALISHIRING'
#     ex = Solution()
#     print(ex.convert(s, 4))
```

# LeetCode 8: String to Integer (atoi)

```python
#
# [8] String to Integer (atoi)
#
# https://leetcode.com/problems/string-to-integer-atoi/description/
#
# algorithms
# Medium (14.14%)
# Total Accepted:    270K
# Total Submissions: 1.9M
# Testcase Example:  '"42"'
#
# Implement atoi which converts a string to an integer.
#
# The function first discards as many whitespace characters as necessary until
# the first non-whitespace character is found. Then, starting from this
# character, takes an optional initial plus or minus sign followed by as many
# numerical digits as possible, and interprets them as a numerical value.
#
# The string can contain additional characters after those that form the
# integral number, which are ignored and have no effect on the behavior of this
# function.
#
# If the first sequence of non-whitespace characters in str is not a valid
# integral number, or if no such sequence exists because either str is empty or
# it contains only whitespace characters, no conversion is performed.
#
# If no valid conversion could be performed, a zero value is returned.
#
# Note:
#
#
# Only the space character ' ' is considered as whitespace character.
# Assume we are dealing with an environment which could only store integers
# within the 32-bit signed integer range: [−231,  231 − 1]. If the numerical
# value is out of the range of representable values, INT_MAX (231 − 1) or
# INT_MIN (−231) is returned.
#
#
# Example 1:
#
#
# Input: "42"
# Output: 42
#
#
# Example 2:
#
#
# Input: "   -42"
# Output: -42
# Explanation: The first non-whitespace character is '-', which is the minus
# sign.
# Then take as many numerical digits as possible, which gets 42.
#
#
# Example 3:
#
#
# Input: "4193 with words"
# Output: 4193
# Explanation: Conversion stops at digit '3' as the next character is not a
# numerical digit.
#
#
# Example 4:
#
#
# Input: "words and 987"
# Output: 0
# Explanation: The first non-whitespace character is 'w', which is not a
# numerical
# digit or a +/- sign. Therefore no valid conversion could be performed.
#
# Example 5:
#
#
# Input: "-91283472332"
# Output: -2147483648
# Explanation: The number "-91283472332" is out of the range of a 32-bit signed
# integer.
# Thefore INT_MIN (−231) is returned.
#
#
class Solution:
    def myAtoi(self, str):
        """
        :type str: str
        :rtype: int
        """
        string = str.strip()
        if not string:
            return 0
        elif string[0] not in '+-' and not self.is_num(string[0]):
            return 0
        elif string in '+-':
            return 0
        elif string[0] in '+-' and not self.is_num(string[1]):
            return 0

        flag = True
        for i in range(1, len(string)):
            if not self.is_num(string[i]):
                flag = False
                break

        if flag:
            convert_string = string
        else:
            convert_string = string[:i]

        res = int(convert_string)
        if res > 2 ** 31 - 1:
            return 2 ** 31 - 1
        elif res < -(2 ** 31):
            return -2 ** 31
        else:
            return res

    def is_num(self, char):
        ord_val = ord(char)
        if ord_val > 47 and ord_val < 58:
            return True
        else:
            return False


# if __name__ == "__main__":
#     string = '43'
#     ex = Solution()
#     print(ex.myAtoi(string))
```

# LeetCode 10: Regular Expression Matching [hard]
**这个题是剑指 offer 原题，在解剑指 offer 中，使用的解法是暴力递归，这个解法在 leetcode 是通不过的，同时看了 LeetCode 上的 Solution 之后，我真的有点儿方了。上面的 Python 解法写的无比精炼，简直是优美，下面上一下同样的暴力递归思路的比较：**

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

LeetCode 示范解法：

```python
class Solution(object):
    def isMatch(self, text, pattern):
        if not pattern:
            return not text

        first_match = bool(text) and pattern[0] in {text[0], '.'}

        if len(pattern) >= 2 and pattern[1] == '*':
            return (self.isMatch(text, pattern[2:]) or
                    first_match and self.isMatch(text[1:], pattern))
        else:
            return first_match and self.isMatch(text[1:], pattern[1:])
```

加一点对于 LeetCode 标准解的解释：

首先如果是匹配 pattern 中没有`*`字符，那么匹配过程就可以简化成：
```python
def match(text, pattern):
    if not pattern: return not text
    first_match = bool(text) and pattern[0] in {text[0], '.'}
    return first_match and match(text[1:], pattern[1:])
```
对应于解法中的 else 情况，那么如果匹配 pattern 中有`*`字符，且是解法中的 if 情况，那么不管 pattern[0]是否匹配，我们都需要看`*`代表前面字符出现 0 次时候的情况；另外，如果第一个字符是匹配的，那么我们还要看`*`匹配 1 次或多次的情况。

暴力递归的解法是通不过 LeetCode 测试的，此时为了加快速度我们可以用 functools 里的 lru_cache 来保存暴力递归中间值；同样也可以把暴力递归版本改成动态规划版本，相对来说使用 lru__cache 更省力。

使用 lru__cache 只需加入两行代码，代码就不贴了。

动态规划版本：
```python
class Solution(object):
    def isMatch(self, text, pattern):
        dp = [[False] * (len(pattern) + 1) for _ in range(len(text) + 1)]

        dp[-1][-1] = True
        for i in range(len(text), -1, -1):
            for j in range(len(pattern) - 1, -1, -1):
                first_match = i < len(text) and pattern[j] in {text[i], '.'}
                if j+1 < len(pattern) and pattern[j+1] == '*':
                    dp[i][j] = dp[i][j+2] or first_match and dp[i+1][j]
                else:
                    dp[i][j] = first_match and dp[i+1][j+1]

        return dp[0][0]
```


# LeetCode 45: Jump Game II [hard]
这个题是一个 hard 级别的题，但感觉跟其他 mid 难度的题差不多。这个题是做去哪儿网笔试
的时候做的，只 ac 了 67%，后来才知道是 LeetCode 原题，所以就想着看看代码为什么没有 ac，
结果到了 LeetCode 就 ac 了。

最开始解的时候，自己没有什么好的思路。但是在思考过程中，我发现，我们是想要每一步走的最远。
那么每次我们就看下当前位置能走多远，以及当前位置可走范围内的位置最远都可以走多远；
那么我们如果每次都选在当前位置能走的范围内（包括当前位置）的位置中能走的最远的那么位置，那么我们就能
最快到达最后一个位置。

自己真的想出来一个题的成就感是巨大的，在后来思考的过程中，我好像玄而又玄的一类的问题都应该可以这么解。
但是仔细想归纳却又说不出来。但是把一个过程不是很清晰的大过程，抽象出一个可用的规则，这种能力应该会越来越强把。



```python
#
# [45] Jump Game II
#
# https://leetcode.com/problems/jump-game-ii/description/
#
# algorithms
# Hard (26.29%)
# Total Accepted:    133.1K
# Total Submissions: 504.1K
# Testcase Example:  '[2,3,1,1,4]'
#
# Given an array of non-negative integers, you are initially positioned at the
# first index of the array.
#
# Each element in the array represents your maximum jump length at that
# position.
#
# Your goal is to reach the last index in the minimum number of jumps.
#
# Example:
#
#
# Input: [2,3,1,1,4]
# Output: 2
# Explanation: The minimum number of jumps to reach the last index is 2.
#    Jump 1 step from index 0 to 1, then 3 steps to the last index.
#
# Note:
#
# You can assume that you can always reach the last index.
#
#


class Solution:
    def jump(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        length = len(nums)
        if length <= 1:
            return 0

        cur = 0
        steps = 0
        while cur < length:
            temp = nums[cur]
            if cur + temp >= length-1:
                steps += 1
                return steps
            else:
                most_access = [cur, cur+temp]
                for i in range(cur+1, cur+temp+1):
                    if i + nums[i] > most_access[1]:
                        most_access = [i, i+nums[i]]
                cur_step = temp if most_access[0] == cur else most_access[0] - cur
                cur = most_access[0]
                steps += 1


# if __name__ == "__main__":
#     nums = list(map(int, input().split()))
#     ex = Solution()
#     print(ex.jump(nums))
```
