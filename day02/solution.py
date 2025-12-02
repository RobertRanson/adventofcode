def isInvalid(id):
    if len(str(id)) % 2 == 1:
        # print("Valid id as odd length: " + str(id))
        return False
    if(str(id)[0:(len(str(id))//2)] !=  str(id)[(len(str(id))//2):]):
        # print("Valid id as different halves: " + str(id))
        return False
    # print("Invalid id: " + str(id))
    return True


# 111, 1
def doesPatternMatch(id, pattern):
    if len(id) % len(pattern) !=0:
        # print("Pattern does not fit id repeatedly")
        return False
    for i in range(0, len(id), len(pattern)):
        if id[i:i+len(pattern)] != pattern:
            # print("Patten does not repeat")
            return False
    return True


def isValid(id, prefixIndex):
    # Base case, 
    if prefixIndex > len(str(id))//2:
        return True

    # print("Checking prefix of size: " + str(prefixIndex))
    prefix = str(id)[0:prefixIndex]
    if(doesPatternMatch(str(id), prefix)):
        # print("Pattern matches: " + str(id) + " with prefix: " + prefix)
        return isValid(id, prefixIndex + 1) and False
    else:
        return isValid(id, prefixIndex + 1) and True
    

def getIntRange(fromTo):
    start, end = fromTo.split('-')
    # print("Getting range from " + start + " to " + end)
    return list(range(int(start), int(end) + 1, 1))

def getAllRanges():
    print("Reading input...")
    with open('input.txt', 'r') as file:
        return file.read().split(',')

def part1():
    print("Starting part 1...")
    sum = 0
    for idRange in getAllRanges():
        for id in getIntRange(idRange):
            # print("Checking id: " + str(id))
            if isInvalid(id):
                sum += id   
    print(sum)

def part2():
    print("Starting part 2...")
    sum = 0
    for idRange in getAllRanges():
        for id in getIntRange(idRange):
            # print("Checking id: " + str(id))
            if not isValid(id, 1):
                sum += id
    print(sum)


def main():
#    part1()
   part2()

main()