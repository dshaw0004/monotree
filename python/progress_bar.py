'''
print(f'\r[{"#" * int(40 * i / no_of_iter):-<40}] {i/no_of_iter:.2%}', end='')
The above line is the entire progress bar

Variables:
    no_of_iter - is the total number of iteration to reach 100%.
    i - is the current number of iteration.

Caution:
    If loop starts with i = 0 then add 1 to the *i* in the progress bar(i + 1).

Example:
    down below
'''
import time

no_of_iter = 50

print('starting a process')

for i in range(1, no_of_iter + 1):
    time.sleep(0.2)
    print(f'\r[{"#" * int(40 * i / no_of_iter):-<40}] {i/no_of_iter:.2%}', end='')
print()

print('process completed')
