from LogicGates import AND, NOT

def Decoder_3to8_line(a0: int, a1: int, a2: int) -> tuple[int,...]:
    enable: int = 1
    d0: int = AND(
                NOT(a0),
                NOT(a1),
                NOT(a2),
                enable
                )
    d1: int = AND(
                a0,
                NOT(a1),
                NOT(a2),
                enable
                )
    d2: int = AND(
                NOT(a0),
                a1,
                NOT(a2),
                enable
                )
    d3: int = AND(
                a0,
                a1,
                NOT(a2),
                enable
                )
    d4: int = AND(
                NOT(a0),
                NOT(a1),
                a2,
                enable
                )
    d5: int = AND(
                a0,
                NOT(a1),
                a2,
                enable
                )
    d6: int = AND(
                NOT(a0),
                a1,
                a2,
                enable
                )
    d7: int = AND(
                a0,
                a1,
                a2,
                enable
                )

    return d0, d1, d2, d3, d4, d5, d6, d7
