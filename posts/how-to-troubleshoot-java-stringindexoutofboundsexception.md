---
title: How to troubleshoot Java StringIndexOutOfBoundsException
author: Marcus Trujillo
tags: [tutorial, Java, troubleshooting]
publicationDate: 10/5/2021
description: Learn how to error handle the Java StringIndexOutOfBoundsException
image: https://storage.googleapis.com/sourcegraph-assets/learn/headers/sourcegraph-learn-header.png
imageAlt: Sourcegraph Learn
browserTitle: StringIndexOutOfBoundsException in Java error handling
type: posts
---
Java exceptions are a topic in their own right. In general they are thrown when... well... something exceptional happens. This means something our code might not expect or know how to handle. We won't cover the topic in depth but we will address
the StrinIndexOutofBoundsException specifically. This exception is thrown when you are using a string in java and your code tries to access an index that is beyond the
bounds of that string. Every character in a string in Java is indexed starting at 0 and ends at it's last character. For example the string "Hello World" would be indexed as follows, 
|H|e|l|l|o| |W|o|r|l|d|
|-|-|-|-|-|-|-|-|-|-|-|
|0|1|2|3|4|5|6|7|8|9|10|

Every character is indexed, even spaces. For our "Hello World" string, our valid indices are from 0 to 10. If we try to access an index for that string below 0, or above 
10, a StringIndexOutOfBoundsException will be thrown. 

## Reproducing the error
The following code will throw the exception in question. 
```java
class Main {
   public static void main(String[] args) {
      String str = "This string is length 24";
      System.out.println("Length of the String: "+str.length());
      for(int i=0; i<str.length(); i++) {
         System.out.println(str.charAt(i));
      }
      System.out.println(str.charAt(24));
   }
}
```

The reason the above code throws the exception is specifically line 8, ```System.out.println(str.charAt(24));```. This is pretty common when dealing with lengths. 
Our string is length 24, and we're accessing index 24, so what gives? We start counting length at 1 but indexing begins at 0, and thus we can only access up to index 23. 

The above example is a little bit artificial. Below is something more likely to occur naturally. 
```java
class Main {
   public static void main(String[] args) {
      String str = "This string is length 24";
      System.out.println("Length of the String: "+str.length());
      for(int i=0; i <= str.length(); i++) {
         System.out.println(str.charAt(i));
   }
}
```

Now the problem is our for loop. We set our stopping condition to be when i <= str.length(). The length is 24 because we start counting the length at 1.
However, our last character in our string is at index 23, so if we try to access index 24, we'll be out of bounds of our string. 

## Solution 1
Fixing the offending bug depends on the context of your code. The first thing to know is the length of the string you're going to be working with. If you're 
working with a string of a fixed length you could index out your string and access the place you know you'll want. For example in our string in the above code "This string is l
length 24" is indexed as follows.. 
|T|h|i|s| |s|t|r|i|n|g| |i|s| |l|e|n|g|t|h| |2|4|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|

we know that we shouldn't access any index below 0 or above 23. So the snippet ```str.charAt(24)``` will cause us issues. We need to change 24 to be something in bounds, 
something between 0-23 inclusive.

## Solution 2
In the second example (our more natural example), we should look to our loop to see if that's where the issue is hiding. We could use a debugger to see what value 
of i we get to when our code runs. Here we could change our loop header to read 
```for(int i=0; i<str.length(); i++)```
and this would stop us from getting beyond our last index for our string because we wouldn't reach our length value, we'd stop when i is one less than the length.

## Solution 3 
The last solution would be to wrap your code in a try/catch block so that you can gracefully handle the exception when it's thrown. Doing this would mean that if 
the exception is thrown you have code in place to do something that you define when it happens and it won't crash your program. 

```java
class Main {
   public static void main(String[] args) {

     try{
        String str = "Hello World";
        System.out.println("Length of the String: "+str.length());
        for(int i=0; i<=str.length(); i++) {
          System.out.println(str.charAt(11));
        }
     } catch(StringIndexOutOfBoundsException ex){
       //code to handle the exception here
       System.out.println("You went out of bounds on your string.");
     }
      
   }
}
```
## Learn more

Search across open source Java repositories that have the `StringIndexOutOfBoundsException` to understand the message more.
You can check out the [documentation](https://docs.oracle.com/javase/7/docs/api/java/lang/StringIndexOutOfBoundsException.html) from oracle to learn more.

<SourcegraphSearch query="StringIndexOutOfBoundsException lang:java" patternType="literal"/>

Check out more Sourcegraph Learn tutorials on [Java](https://learn.sourcegraph.com/tags/java).
