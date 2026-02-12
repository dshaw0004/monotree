#include<stdio.h>
#include<stdlib.h>

int main(){
  int port_number = rand() % (10000 - 1024 + 1);

  printf("Your random port is: %d\n", port_number);
  return 0;
}
