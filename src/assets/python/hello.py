import sys, json, numpy as np

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def main():
    #get our data as an array from read_in()
    lines = read_in()

    #return the sum to the output stream
    for i in lines:
        print('hi #%i' % i)
    # print(lines)
#start process
if __name__ == '__main__':
    main()