---
layout: post
title: "Learn SQL advanced"
date: 2019-09-09
description: "The list when i learned mysql for myself"
category: technical
author: hungnv950
usemathjax: true
thumbnail: /assets/img/posts/sql.jpg
---

The first thing i want tell about the first link i found from google. It make by qoura. Fine, i like it: https://www.quora.com/How-do-I-learn-more-advanced-SQL

Firstly i want learn SQL from basic, because maybe i'm a beginer in every thing. Of course, i dont like this. But some day, when i joined my project, i know i am a chicken. So, if i'm not a bigger, i will be a person.

First ez query:
```
SELECT * FROM Customers;
```
This query will select all record with all attributes of Customers.

### SELECT DISTINCT
The SQL select distinct statement is used to return only distinct(diffirent) values.
Inside a table, a column often contains many duplicate values, and sometimes you only want to list the different (distinct) value.

`Syntax:`

```
SELECT DISTINCT column1, column2,..
FROM table_name;
```

Example:

```
SELECT DISTINCT Country FROM Customers;
```
This query will have result all different Country of customer.


### WHERE Clause
The `where` clause is used to filter records.
The `where` clause is used to extract only those records that fulfill a specified condition (Đáp ứng một điều kiện cụ thể).
`Syntax:`

```
SELECT column1, column2
FROM table_name
WHERE condition;
```
This query will return the records of column1 and column2 with condition is `condition`

###

### SQL ORDER BY
The `order by` key word is used to sort the result-set in ascending or desending order.
In the default, the `order by` will sort the records in ascending order by default. To sort records `desending`, use `DESC`

```
SELECT column1, column2, ...
FROM table_name
ORDER BY column1, column2, ... ASC|DESC;
```

### INSERT INTO
Used to insert new records in table.

```
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

ex:
```
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');
```

### SQL NULL VALUE
*What is null value?*
A field wit null value is field with no vale.

IS NULL syntax
```
SELECT column_names
FROM table_name
WHERE column_name IS NULL;
```
IS NOT NULL syntax

```
SELECT column_names
FROM table_name
WHERE column_name IS NOT NULL;
```
