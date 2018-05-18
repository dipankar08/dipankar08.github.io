#!/usr/bin/python
import sys
fname = sys.argv[1]
APPEND="""
<html>
<head>

</head>
<body>
"""

PREPEND ="""
</body>"""

with open(fname) as f:
    content = f.readlines()
content += ["\n"]

output=[]
block_start = False
num_start = False
for line in content:
  if block_start and not line.startswith("* "):
    output.append("</ul>")
    block_start = False
  if num_start and not line.startswith("1. "):
    output.append("</ol>")
    num_start = False

  if line.startswith("## "):
    output.append("<div calss='x1'>"+line[3:].strip()+"</div>")
  elif line.startswith("# "):
    output.append("<div calss='x2'>"+line[2:].strip()+"</div>")
  elif line.startswith("* "):
    if block_start == False:
      block_start = True;
      output.append("<ul>")
    output.append("<li>"+line[2:].strip()+"</li>")
  elif line.startswith("1. "):
    if num_start == False:
      num_start = True;
      output.append("<ol>")
    output.append("<li>"+line[3:].strip()+"</li>")
  elif line.startswith("{{{"):
    output.append("<code>")
  elif line.startswith("}}}"):
    output.append("</code>")
  else:
    output.append(line.strip())

output = "\n".join(output)

output = APPEND +output+PREPEND
file = open(fname+".html","w")
file.write(output)
file.close()

print 'Successfully converted' 




