parts = [0, 1, 8, 16, 42, 106, 127, 152, 173, 186, 192, 214, 229, 255]

import itertools
for i in itertools.permutations(parts, 4):
    if not i[0] == 0:
        print 'http://%s.%s.%s.%s' % (i[0], i[1], i[2], i[3])
