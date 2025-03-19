#!/bin/bash
num=$1
if (($#<1)); then
     read -p "enter a number: " num
fi
for (( i=1; i <11; i++));
do
        echo "$num x $i = $(($num*$i))"
done       
