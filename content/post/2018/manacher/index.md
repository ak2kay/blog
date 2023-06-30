---
title: Manacher 算法
date: 2018-09-27
keywords:
  - 算法
  - Python
  - Manacher
---

Manacher 算法用作求字符串中的最长回文串长度。

<!-- more -->

## 算法过程
![manacher](manacher.webp)

## 利用 manacher 求解 LeetCode 第五题最长回文子串问题

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


def main():
    s = 'babad'
    ex = Solution()
    print(ex.longestPalindrome(s))


if __name__ == "__main__":
    main()

```
