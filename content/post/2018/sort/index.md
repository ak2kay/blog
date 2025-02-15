---
title: "排序总结"
date: 2018-08-19
keywords:
  - 排序
---


### 对数器：
> 对数器用来检测自定义排序算法是否正确。以下排序算法都经过 10 万个随机数组测试。


```python
import random


class Comparator():
    def compare(self, arr):
        return sorted(arr)

    def generate_arr(self, max_length, max_value):
        length = random.randint(0, max_length)
        arr = [random.randint(-max_value, max_value) for i in range(length)]

        return arr

    def confirm(self, arr1, arr2):
        return arr1 == arr2
```

<!-- more -->

### 1. 堆排序
**下面这个堆排序写复杂了！！！，堆还有一个性质是可以利用的：当用数组表示存储 n 个元素的堆时，叶节点下标分别是[n//2, n//2+1, ..., n-1]，这样的话我们构建堆的时候只要自下往上对不是叶节点的坐标执行 heapify 操作就可以了。**

> 堆是一个极其重要的数据结构，堆排序主要是利用了堆的思想，其时间复杂度为`O(N*logN)`,额外空间复杂度为`O(1)`。<br>
&emsp;&emsp;1.将数组调整成大根堆：<br>
&emsp;&emsp;&emsp;&emsp;在数组中，如果我们把 index i 位置的数字看作是根节点，那么它的左子节点在`index (2 * i) + 1`位置，右子节点在`index (2 * i) + 2`位置。反之 index i 位置的节点的父节点的位置在`(i - 1) // 2`位置。遍历数组添加元素，对每个新添加的元素执行`heap_insert`操作，从加入点开始上浮，直到上浮到合适位置；<br>
&emsp;&emsp;2.将大根堆顶与数组中最后一个元素交换，然后在不包括最后一个元素的数组区间执行`heapify`操作<br>
&emsp;&emsp;&emsp;&emsp;在堆顶与数组中最后一个元素交换后，我们需要重新调整堆，使得堆顶最大；<br>
&emsp;&emsp;3.重复 2，直到可执行区间为 1

#### 代码：
```python
class HeapSort():

    def heapsort(self, arr):
        if arr is None or len(arr) < 2:
            return arr

        length = len(arr)
        for i in range(length):
            self.heap_insert(arr, i)


        self.swap(arr, 0, length - 1)
        size = length - 2
        while size > 0:
            self.heapify(arr, 0, size)
            self.swap(arr, 0, size)
            size -= 1

    def heap_insert(self, arr, i):

        while i > 0:
            parent = (i - 1) // 2
            if arr[parent] > arr[i]:
                break
            else:
                self.swap(arr, parent, i)
                i = parent

    def heapify(self, arr, i, size):
        left = 2 * i + 1
        while left <= size:
            right = 2 * i + 2
            largest = right if right <= size and arr[right] >= arr[left] else left
            largest = largest if arr[largest] >= arr[i] else i
            if largest == i:
                break
            self.swap(arr, largest, i)
            i = largest
            left = 2 * i + 1

    def swap(self, arr, i, j):
        arr[i], arr[j] = arr[j], arr[i]
```

**下面是严格根据算法导论实现的堆排序，其中 max_heapify 的过程写了递归和非递归两个版本，实测排序 10 万个随机数组，非递归版本和递归版本分别需要 24 秒和 27 秒。**

```python
# -*- coding=utf-8 -*-
import time


class HeapSort():

    def heapsort(self, arr):
        if arr is None or len(arr) < 2:
            return arr

        self._size = self._length = len(arr)
        self.build_max_heap(arr)
        for i in range(self._length-1, 0, -1):
            self.swap(arr, i, 0)
            self._size -= 1
            self.max_heapify(arr, 0)

    def build_max_heap(self, arr):
        for i in range(self._length//2-1, -1, -1):
            self.max_heapify(arr, i)

    def max_heapify(self, arr, i):
        left = 2 * i + 1
        while left < self._size:
            right = 2 * i + 2
            largest = right if right < self._size and arr[right] >= arr[left] else left
            largest = largest if arr[largest] >= arr[i] else i
            if largest == i:
                break
            self.swap(arr, largest, i)
            i = largest
            left = 2 * i + 1

    def max_heapify_recur(self, arr, i):
        left = 2 * i + 1
        right = 2 * i + 2
        if left < self._size and arr[left] > arr[i]:
            largest = left
        else:
            largest = i

        if right < self._size and arr[right] > arr[largest]:
            largest = right

        if largest != i:
            self.swap(arr, largest, i)
            self.max_heapify_recur(arr, largest)

    def swap(self, arr, i, j):
        arr[i], arr[j] = arr[j], arr[i]


if __name__ == "__main__":
    from comparator import Comparator
    com = Comparator()
    ex = HeapSort()
    start = time.time()
    for i in range(100000):
        arr = com.generate_arr(100, 100)
        arr1 = list(arr)

        ex.heapsort(arr1)
        arr2 = com.compare(arr)

        if not com.confirm(arr1, arr2):
            print('oops')
            print(arr, arr1, arr2)
    print(time.time()-start)

```

### 2. 快排
> 随机快排就是随机+partition 的过程。partition 过程其实就是荷兰国旗问题。

#### 代码：
```python
import random


class QuickSort():
    def quick_min(self, arr):
        if arr is None or len(arr) < 2:
            return arr

        self.quick_sort(arr, 0, len(arr) - 1)

    def quick_sort(self, arr, l, r):
        if l < r:
            self.swap(arr, random.randint(l, r), r)
            left, right = self.partation(arr, l, r)
            self.quick_sort(arr, l, left)
            self.quick_sort(arr, right, r)

    def partation(self, arr, l, r):
        left = l - 1
        right = r
        while l < right:
            if arr[l] < arr[r]:
                left += 1
                self.swap(arr, l, left)
                l += 1
            elif arr[l] == arr[r]:
                l += 1
            else:
                right -= 1
                self.swap(arr, l, right)

        self.swap(arr, right, r)
        return left, right + 1

    def swap(self, arr, i, j):
        arr[i], arr[j] = arr[j], arr[i]
```

### 3. 归并


#### 代码
```python
import time


class MergeSort():
    def merge_main(self, nums):
        length = len(nums)
        if length <= 1:
            return nums
        start = 0
        end = length - 1
        self.merge_sort_recur(nums, start, end)

    def merge_sort(self, nums):
        length = len(nums)
        if length <= 1:
            return nums
        i = 1
        while i < length:
            start = 0
            while start < length:
                middle = start + i - 1
                end = min(start + 2 * i - 1, length - 1)
                if middle < end:
                    self.merge(nums, start, end, middle)
                start += 2 * i
            i *= 2

    def merge_sort_recur(self, nums, start, end):
        if start == end:
            return
        middle = start + ((end - start) >> 1)
        self.merge_sort_recur(nums, start, middle)
        self.merge_sort_recur(nums, middle+1, end)
        self.merge(nums, start, end, middle)

    def merge(self, nums, start, end, middle):
        cur_left = start
        cur_right = middle + 1
        temp_list = []
        while cur_left <= middle and cur_right <= end:
            if nums[cur_left] <= nums[cur_right]:
                temp_list.append(nums[cur_left])
                cur_left += 1
            else:
                temp_list.append(nums[cur_right])
                cur_right += 1

        while cur_left <= middle:
            temp_list.append(nums[cur_left])
            cur_left += 1
        while cur_right <= end:
            temp_list.append(nums[cur_right])
            cur_right += 1

        for i in range(start, end+1):
            nums[i] = temp_list[i - start]


def main():
    from comparator import Comparator
    com = Comparator()
    ex = MergeSort()
    start = time.time()
    for i in range(100000):
        arr = com.generate_arr(100, 100)
        arr1 = list(arr)

        ex.merge_sort(arr)
        arr2 = com.compare(arr1)

        if not com.confirm(arr, arr2):
            print('oops')
            print(arr1, arr, arr2)
    print(time.time()-start)

    for i in range(100000):
        arr = com.generate_arr(100, 100)
        arr1 = list(arr)

        ex.merge_main(arr)
        arr2 = com.compare(arr1)

        if not com.confirm(arr, arr2):
            print('oops')
            print(arr1, arr, arr2)
    print(time.time()-start)


if __name__ == '__main__':
    main()
```


output:

```python
21.85367202758789
42.81224775314331
```

可以看出非递归版还是快啊，10 万个最大长度为 100 的数组，时间差达到非递归用时了。
