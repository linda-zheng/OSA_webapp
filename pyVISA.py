# sample functions to access an OSA that is physically connected to your computer
import pyvisa
import time
import csv
import numpy
#import matplotlib.pyplot as plt

dt = 1

rm = pyvisa.ResourceManager()
print(rm.list_resources())
OSA = rm.open_resource('GPIB0::10::INSTR')

OSA.chunck_size = 1000000
OSA.timeout = 60

def getIDN():
    return OSA.query("*IDN?")

def sweep(): # ensure you are getting the most up-to-date information
    OSA.write(':INIT:TMOD 0')
    OSA.write(':INIT:SMOD SING')
    OSA.write(':INIT');
    while (int(OSA.query(':STAT:OPER:COND?'))>0) :
        time.sleep(dt)

def trace(): 
    str1= OSA.query(':TRAC1:DATA? 0,1')
    data1 = numpy.fromstring(str1, dtype=float, sep=',')
    print(len(data1))

    W0 = float(OSA.query(':SENS:WAV:STAR?'))*1e9
    W1 = float(OSA.query(':SENS:WAV:STOP?'))*1e9
    WW = numpy.linspace(W0, W1, len(data1))

    data = numpy.column_stack((WW, data1))
    #plt.plot(WW, data1)
    #plt.show()
    return(data)

# ensure you are closing the connection at the end
#OSA.close()

