from LogicGates import  NOT, OR


class SRLatch:
    """
    SR Latch using NOR Gate. This needed to be improved. It is not working properly.
    """
    def __init__(self, init_state: str) -> None:
        self.q = 1 if init_state == 'preset' else 0
        self.qb = NOT(self.q)

    def compute(self, s: int, r: int) -> None:
        temp_q = NOT(
                    OR(
                        r,
                        self.qb
                        )
                )
        temp_qb = NOT(
                    OR(
                        s,
                        self.q
                        )
                )

        print(f'For {s = } and {r = }, Q = {temp_q} and Q\' = {temp_qb}')
        self.q = temp_q
        self.qb = temp_qb
        

def main()-> None:
    sr: SRLatch = SRLatch(init_state='preset')
    sr.compute(0, 0)
    sr.compute(0, 1)
    sr.compute(1, 0)
    sr.compute(1, 1)


if __name__ == '__main__':
    main()
