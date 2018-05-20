#!/usr/bin/python
import sys
from string import Template
fname = sys.argv[1]
TEMPLATE="""
<html>
<head>
    <title> Boook </title>
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">

    <style>
        * {font-family: 'Source Sans Pro', sans-serif;}
    body{ width: 800;
    margin: 0 auto;
        color: #575757; }




div.code{    white-space: pre;
    background: rgba(0, 0, 0, 0.1);
    color: black;
    padding: 5px;
    margin-bottom: 25px;
    font-family: monospace;
    font-size: 14px;
    letter-spacing: 1;
    line-height: 0.8;}

div.x1{ font-size: 50;text-align: center;margin-top: 50px;margin-bottom: 100px;}
div.x2{font-size: 25px;margin-bottom: 25px;margin-top: 20px;}
div.x3{ margin-bottom: 10px;text-align: justify;}

ol,ul{line-height: 1.3;margin-bottom: 35px;}
.left {position:fixed;left: 0px;top: 0px;padding:5px;width: 300px;height: 100%; display:block;overflow: auto;border-right: 1px solid #575757;}
a{display: block;font-family: 'Source Sans Pro', sans-serif; text-decoration: none; color: #575757;margin-bottom: 8px;}
a.a1{font-weight:bold;font-size: 16px;}
a.a2{margin-left:20px;}

    </style>
</head>
<body>
<div class="left" style="">$MENU</div>
<div class="right" style="">$CONTENT</div>
</body>
</html>
"""
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
menu=""
id = 0;
for line in content:
    if block_start and not line.startswith("- "):
        output.append("</ul>")
        block_start = False
    if num_start and not line.startswith("1. "):
        output.append("</ol>")
        num_start = False

    if line.startswith("## "):
        id = id +1;
        hashid = "hashid"+str(id)
        menu +="<a class='a1' href='#"+hashid+"'+>"+line[3:].strip()+"</a>"
        output.append("<div class='x1' id='"+hashid+"'>"+line[2:].strip()+"</div>")
    elif line.startswith("# "):
        id = id +1;
        hashid = "hashid"+str(id)
        menu +="<a class='a2' href='#"+hashid+"'+>"+line[2:].strip()+"</a>"
        output.append("<div class='x2' id='"+hashid+"'>"+line[2:].strip()+"</div>")
    elif line.startswith("- "):
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
html  = Template(TEMPLATE).substitute({'CONTENT':output,'MENU':menu})
file = open(fname+".html","w")
file.write(html)
file.close()

print 'Successfully converted'
