#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

/**
 * Description: Multithreaded C program using the Pthreads API.
 */

int sum;                   /* this data is shared by the thread(s) */
void *runner(void *param); /* threads call this function */

int main(int argc, char *argv[]) {
  if (argc != 2) {
    fprintf(stderr, "USAGE: %s <integer value>\n", argv[0]);
    return 1;
  }

  int upper = atoi(argv[1]);
  if (upper <= 0) {
    fprintf(stderr, "ERROR: Argument must be a positive integer.\n");
    return 1;
  }

  pthread_t tid;           /* the thread identifier */
  pthread_attr_t attr;     /* set of thread attributes */

  /* Initialize thread attributes */
  pthread_attr_init(&attr);

  /* Create the thread */
  if (pthread_create(&tid, &attr, runner, argv[1]) != 0) {
    perror("pthread_create");
    return 1;
  }

  /* Wait for the thread to exit */
  if (pthread_join(tid, NULL) != 0) {
    perror("pthread_join");
    return 1;
  }

  printf("sum = %d\n", sum);

  return 0;
}

/* The thread will execute in this function */
void *runner(void *param) {
  int upper = atoi((char *)param);
  sum = 0;

  for (int i = 1; i <= upper; i++) {
    sum += i;
  }

  pthread_exit(0);
}
