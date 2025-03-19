#!/bin/bash
num=$1
if (($#<1)); then
     read -p "enter a number: " num
fi
for (( i=2; i <$num; i++));
do
        if (($num%$i==0)); then
                echo "$num is not a prime number."
                exit 0
        fi
done       

echo "$num is a prime number."
