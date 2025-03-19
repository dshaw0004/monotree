from datetime import date
import calendar

year = date.today().year
month = date.today().month
day = date.today().day

print(calendar.month(year, month))
