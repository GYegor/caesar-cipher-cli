# Caesar Cipher CLI

Command-line-application __Caesar Cipher CLI__ for Latin texts encryption/decryption both in lower and upper cases.
It doesn't affect any other non-Latin characters. 
* Can encrypt/decrypt readable text files
* Can write result to writable text files
* Can work in terminal if file paths are not defined explicitly by --input or --output options 

---

# Installation

1. Clone current repository to your local 
2. Perform in command line:
```
cd caesar-cipher-cli
npm install
```
3. Start usage

---

# Usage

```
  Usage: 
    node caesar-cipher --action <action-type> --shift <value> [--input <path1>] [--output <path2>]

  Options:
    -h, --help           print node caesar-cipher command line options
    -a, --action         one of encode, decode
    -s, --shift          integer - number of chars to shift-forth for 'encode', shift-back for 'decode'; 
                         exclude negatives, 0 and multiples of 26 (Alphabet characters number)
    -i, --input          absolute or relative path to readable text file
    -o, --otput          absolute or relative path to writable text file
```
