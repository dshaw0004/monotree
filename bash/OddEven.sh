#!/bin/bash
num=$1
if (($# < 1)); then
  read -p "enter a number: " num
fi
if (($num % 2 == 0)); then
  echo "$num is a even number."
else
  echo "$num is a odd number."
fi
