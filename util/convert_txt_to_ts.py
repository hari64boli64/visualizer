import re
import os
import glob
import shutil

input_dir = './input'
target_dir = './src/input_ts'

if os.path.isdir(target_dir):
    shutil.rmtree(target_dir)
os.mkdir(target_dir)
assert(os.path.isdir(input_dir))
txts = glob.glob(input_dir+'/*.in')

print(f"file num is {len(txts)}")

for txt in txts:
    with open(txt, mode="r") as input_file:
        seed = re.sub(r"\D", "", txt)
        output_file = open(target_dir+"/"+seed+".ts", 'w')
        output_file.write(
            f"const input_{seed}: string = `" +
            input_file.read() +
            f"`;\nexport default input_{seed};\n")
        output_file.close()
