---
layout: post
title:  Ruby Notes
description: Ruby Notes
categories:
- post
---

### Developer roadmap
- [https://github.com/kamranahmedse/developer-roadmap](https://github.com/kamranahmedse/developer-roadmap)

### Namming
1. Global variables start with `$`
2. Class variables start with `@@`
3. Instance variables start with `@`
4. Local variables must begin with a lowercase or an under score
5. Constants start with an upper case letter

Ruby variablse names must begin with a lowercase letter or underscore, and many contain only letters, numbers, and underscore characters.

Variable names must not conflict with keywords (e.g. you cannot have variable called `class`), but unambiguous name that contain reserved worlds are acceptable (i.e. both `classy` and `_class` are valid Ruby variable names)

### Variable
With instance variables, class variables or Global variables, we can use `#$`, `#@` or `#@@` to puts this values with string.

```
#{$x} ~ #$x
#{@x} ~ #@x
#{@@x} ~ #@@x

#{x} != #x => not working
```