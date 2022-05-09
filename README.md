# Leetcode Helper

A chrome extension helps you have fun at [leetcode.com](https://leetcode.com) and [leetcode.cn](https://leetcode.cn).

[https://chrome.google.com/webstore/detail/leetcode-helper/gleoepapfjkpcijfmchfabbnldejdnoj](https://chrome.google.com/webstore/detail/leetcode-helper/gleoepapfjkpcijfmchfabbnldejdnoj)

## Features

1. Copy for markdown
2. Find videos (beta)

- Copy question content for markdown

Question page:

![image](screenshots/1.png)

Click the `Copy` button on the right side, the question will be copyed for markdown.

The result for markdown:

```markdown
# [344\. Reverse String](https://leetcode.com/problems/reverse-string/)

## Description

Difficulty: **Easy**  

Related Topics: [Two Pointers](https://leetcode.com/tag/two-pointers/), [String](https://leetcode.com/tag/string/), [Recursion](https://leetcode.com/tag/recursion/)


Write a function that reverses a string. The input string is given as an array of characters `s`.

You must do this by modifying the input array with `O(1)` extra memory.

**Example 1:**

\```
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
\```

**Example 2:**

\```
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]
\```

**Constraints:**

*   1 <= s.length <= 10<sup>5</sup>
*   `s[i]` is a .


## Solution

Language: **JavaScript**

\```javascript
/**
 * @param {string} s
 * @return {string}
 */
var reverseString = function(s) {
    return s.split('').reverse().join('');
};
\```
```

## Installation

### Chrome webstore

[https://chrome.google.com/webstore/detail/leetcode-helper/gleoepapfjkpcijfmchfabbnldejdnoj](https://chrome.google.com/webstore/detail/leetcode-helper/gleoepapfjkpcijfmchfabbnldejdnoj)


### Manual

- Clone or download this project to local.
- Open `chrome://extensions/` in your chrome
- Drag the project folder to the browser.

Then, open a problem page in leetcode, you would see the buttons.
