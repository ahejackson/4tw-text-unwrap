#!/usr/bin/python3

import os
import sys
import fileinput
import argparse

def outfilename(filename):
    normpath = os.path.normpath(filename)
    name = os.path.splitext(os.path.basename(normpath))
    return os.path.join(os.path.dirname(normpath), name[0] + '-unwrap' + ''.join(name[1:]))

def unwrap(lines):
    unwrapped = ''

    for i, l in enumerate(lines):
        # Is there a next line?
        if i+1 < len(lines):
            next_line = lines[i+1]
        else:
            next_line = ''

        next_line_first_word = next_line.split(' ', 1)[0]

        if next_line_first_word != '':
            extended_line = l + ' ' + next_line_first_word
        else:
            extended_line = l

        if len(l) <= 70 and len(extended_line) > 70:
            # This line was wrapped due to 70-char limit => unwrap it!
            unwrapped += l + ' '
        else:
            unwrapped += l + '\n'
    
    return unwrapped

# super long code to get users Download folder from
# https://stackoverflow.com/questions/35851281/python-finding-the-users-downloads-folder
if os.name == 'nt':
    import ctypes
    from ctypes import windll, wintypes
    from uuid import UUID

    # ctypes GUID copied from MSDN sample code
    class GUID(ctypes.Structure):
        _fields_ = [
            ("Data1", wintypes.DWORD),
            ("Data2", wintypes.WORD),
            ("Data3", wintypes.WORD),
            ("Data4", wintypes.BYTE * 8)
        ] 

        def __init__(self, uuidstr):
            uuid = UUID(uuidstr)
            ctypes.Structure.__init__(self)
            self.Data1, self.Data2, self.Data3, \
                self.Data4[0], self.Data4[1], rest = uuid.fields
            for i in range(2, 8):
                self.Data4[i] = rest>>(8-i-1)*8 & 0xff

    SHGetKnownFolderPath = windll.shell32.SHGetKnownFolderPath
    SHGetKnownFolderPath.argtypes = [
        ctypes.POINTER(GUID), wintypes.DWORD,
        wintypes.HANDLE, ctypes.POINTER(ctypes.c_wchar_p)
    ]

    def _get_known_folder_path(uuidstr):
        pathptr = ctypes.c_wchar_p()
        guid = GUID(uuidstr)
        if SHGetKnownFolderPath(ctypes.byref(guid), 0, 0, ctypes.byref(pathptr)):
            raise ctypes.WinError()
        return pathptr.value

    FOLDERID_Download = '{374DE290-123F-4565-9164-39C4925E467B}'

    def get_download_folder():
        return _get_known_folder_path(FOLDERID_Download)
else:
    def get_download_folder():
        home = os.path.expanduser("~")
        return os.path.join(home, "Downloads")

# setup the arguments
parser = argparse.ArgumentParser()
parser.add_argument('file', help='the file to unwrap')
parser.add_argument('outfile', nargs='?', help='(optional) the output file')
parser.add_argument("-d", "--downloads", help="look in downloads folder", action="store_true")
args = parser.parse_args()

if args.outfile is None:
    args.outfile = outfilename(args.file)

# check if the file exists. if not, check if its in the downloads directory (or look their first if the option is passed in)
if args.downloads or (not os.path.exists(args.file) and os.path.exists(os.path.join(get_download_folder(), args.file))):
    args.file = os.path.join(get_download_folder(), args.file)
    args.outfile = os.path.join(get_download_folder(), args.outfile)

with open(args.file, 'r') as f:
    lines = f.readlines()

lines = [l.strip('\r\n') for l in lines]

unwrapped = unwrap(lines)

with open(args.outfile, 'w') as f:
    f.write(unwrapped)