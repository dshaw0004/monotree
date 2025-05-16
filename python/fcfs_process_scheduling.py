# a python programm to schedule process using fcfs algorightm
from dataclasses import dataclass


@dataclass()
class Process:
    pid: int
    burst_time: int
    arrival_time: int = 0

    def __str__(self):
        return f'Process<pid: {self.pid}, arrival time : {self.arrival_time} , burst Time : {self.burst_time}>'


if __name__ == "__main__":
    p1 = Process(pid=1, burst_time=3, arrival_time=0)
    p2 = Process(pid=2, burst_time=2, arrival_time=3)
    p3 = Process(pid=3, burst_time=5, arrival_time=1)
    p4 = Process(pid=4, burst_time=1, arrival_time=2)
    p5 = Process(pid=5, burst_time=2, arrival_time=5)
    p6 = Process(pid=6, burst_time=4, arrival_time=2)
    p7 = Process(pid=7, burst_time=5, arrival_time=0)
    all_processes: list[Process] = [p1, p2, p3, p4, p5, p6, p7]
    sorted_processes: list[Process] = []
    for p in all_processes:
        if not len(sorted_processes):
            sorted_processes.append(p)
            continue
        for i in range(len(sorted_processes)):
            currP = sorted_processes[i]
            if p.arrival_time < currP.arrival_time:
                sorted_processes.insert(i, p)
                break
        else:
            sorted_processes.append(p)

    print("=========================================")
    print("Before applying any scheduling algorightm")
    print("=========================================")
    for p in all_processes:
        print(p)

    print("\n=========================================")
    print("After applying FCFS scheduling algorightm")
    print("=========================================")
    for p in sorted_processes:
        print(p)
