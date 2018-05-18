#!/usr/bin/python
import sys
fname = sys.argv[1]
APPEND="""
<html>
<head>
    <title> Boook </title>
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">

    <style>
        *{font-family: 'Source Sans Pro', sans-serif;}
    body{ width: 800;
    margin: 0 auto;
        color: #575757; }
div.x1{ font-size: 60;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 60px;
}

div.x2{
    font-size: 25px;
        margin-bottom: 25px;}

div.code{    white-space: pre;
    background: rgba(0, 0, 0, 0.1);
    color: black;
    padding: 5px;
    margin-bottom: 25px;
    font-family: monospace;
    font-size: 14px;
    letter-spacing: 1;
    line-height: 0.8;}
div.x3{     margin-bottom: 25px;
    text-align: justify;
}
ol,ul{    line-height: 1.3;
        margin-bottom: 25px;}
    </style>
</head>
<body>
"""

PREPEND ="""
</body>"""
def es(s):
    s = s.replace(">","&gt;")
    s = s.replace("<","&lt;")
    return s

with open(fname) as f:
    content = f.readlines()
content += ["\n"]

output=[]
block_start = False
num_start = False
code_start = False;
for line in content:
  if block_start and not line.startswith("* "):
    output.append("</ul>")
    block_start = False
  if num_start and not line.startswith("1. "):
    output.append("</ol>")
    num_start = False

  if line.startswith("## "):
    output.append("<div class='x1'>"+line[3:].strip()+"</div>")
  elif line.startswith("# "):
    output.append("<div class='x2'>"+line[2:].strip()+"</div>")
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
    code_start = True
    output.append("<div class='code'>")
  elif line.startswith("}}}"):
    output.append("</div>")
    code_start = False
  else:
    if not code_start and not num_start and not block_start :
      output.append("<div class='x3'>"+line.strip()+"</div>")
    else:
        if line.strip():
            output.append(es(line))

output = "\n".join(output)

output = APPEND +output+PREPEND
file = open(fname+".html","w")
file.write(output)
file.close()

print 'Successfully converted'
