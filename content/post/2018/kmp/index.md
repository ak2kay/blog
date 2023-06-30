---
title: "KMP 算法"
date: 2018-09-20
keywords:
  - 算法
  - Python
  - KMP
---

KMP 算法用于检查短字符串是否在某个长字符串中。

<!-- more -->

## 算法过程
![KMP](kmp.webp)



## 使用 kmp 解 LeetCode28 题


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

        return next_arr

```
