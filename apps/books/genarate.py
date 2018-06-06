#!/usr/bin/python
import sys
from string import Template
import os
import stat;
import pdb
fname = sys.argv[1]
TEMPLATE="""
<html>
<!--  this is an autogenerated file so any manuual chnages in this file will lost -->
<head>
    <title> Boook </title>
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
<style>

    html {
        font-size: 100%;
        line-height: 1.6;
        font-family: 'Source Sans Pro', sans-serif;
    }
    body, a, body .top{ margin: 0 auto; color: #575757;background:white;}
    ol,ul{margin-bottom: 15px; margin-top:0;text-align: justify;}
    li{ margin-bottom: 5px;}

    div.code {
        white-space: pre;
        background: rgba(0, 0, 0, 0.1);
        color: black;
        padding: 5px;
        margin-bottom: 25px;
        font-size: 0.9rem;
        letter-spacing: .05px;
        font-family: monospace;
    }

    div.x1 { 
        font-size: 3rem;
        text-align: left;
        margin-top: 150px;
        margin-bottom: 20px;
        border-bottom: 1px solid #eee;
    }
    div.x2{ font-size: 1.5rem;margin-bottom: 25px;margin-top: 20px;}
    div.x3{ font-size: 1rem;margin-bottom: 10px;text-align: justify;}

    .top {
        position: fixed;
        height: 40px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        width: 100%;
        top: 0;
    }
    .middle { }
    .top .t { padding: 10px; margin-right:10px}
    .left {position:fixed;left: 0px;top: 50px;padding:5px;width: 300px;height: calc(100% - 60px); display:none;overflow: auto;}
    .right{max-width: 800px; margin: 10px auto;padding:15px; margin-top:50px}

    a {display: block;font-family: 'Source Sans Pro', sans-serif; text-decoration: none; margin-bottom: 8px;}
    a.a1{font-weight:bold;font-size: 16px;}
    a.a2{margin-left:20px;}

    .footer{font-size: 11px;text-align: center;border-top: 1px solid #575757;}

    body.shown_menu .left {display:block}
    body.shown_menu .right {margin-left:320px;}

    body.dark,body.dark .top, body.dark a {background: #353535;color: #a7a0a0;}
    body.dark div.code {color: #0daf32;}

    /* Table Style */
    table {
        border-collapse: collapse;
        width:100%;
        margin-bottom: 50px;
    }
    table caption{
        background: rgba(0,0,0,0.75);
        color: white;
        font-weight: bold;
    }
    table th, table td, table caption{
        border: 1px solid rgba(0,0,0,0.1);
        padding: 10px;
    }
</style>
<script>
</script>
</head>
<body>
<div class="top">
     <span style='float:left'><b class="t" style="display: block;">Software Design Principles</b></span>
     <span style='float:right'>
        <i class="t fas fa-list-ul" onclick="$$('body').toggleClass('shown_menu');"></i>
        <i class="t fas fa-lightbulb" onclick="$$('body').toggleClass('dark');"></i>
    </span>
</div>
<div class="middle">
    <div class="left" style="">$MENU</div>
    <div class="right" style="">$CONTENT</div>
</div>
<div class="footer">
<p> Do you know this book/HTML is generated from a text file? I traied to use MS word and other software and its seems to be very hard to maintain, sync and reformat - So i get into this crazy idea - just have a text file and write into it. I have a python svript whcih just convert this text into html.</p>
<p> You are free to copy and share the content.  This book is free and always would be. If you have design question or find a bug in this book, please file a bug in github or mail me dutta.dipankar08@gmail.com</p>
<p> This site is add-free and planned to have add free till 2025. If you want to contribute, there are two easy way to do that - just send new content to me.</p>
<p> copyright @ 2018 . Dipankar Dutta </p>
<p> Made with Love from India <p>
</div>
</body>
</html>
"""
import re
def es(s):
    s = s.replace(">","&gt;")
    s = s.replace("<","&lt;")
    return s

def is_start_num(line):
    return re.search('^\d+\. ',line)
def getTableRow(line):
    return '<tr>'+''.join(['<td>'+x.strip()+'</td>' for x in line.split("# ")]) +'</tr>'

with open(fname) as f:
    content = f.readlines()
content += ["\n"]

def ignoreBlankLine(line):
    return code_start == False and  table_start == False and  line.strip().replace("\n","") == ""
output=[]
block_start = False
num_start = False
code_start = False;

table_start = False;
menu=""
id = 0;

index = 0;
while index < len(content):
    if index == 15:
        pass
        #pdb.set_trace()
    line = content[index]
    if ignoreBlankLine(line):
        index = index +1
        continue;
    if block_start and not line.startswith("- "):
        output.append("</ul>")
        block_start = False

    if num_start and is_start_num(line) == None:
        output.append("</ol>")
        num_start = False
    if table_start:
        if line.strip() == '':
            output.append("</table>")
            table_start = False
        else:
            output.append(getTableRow(line))
        index = index + 1
        continue

    # New Things found..
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
    elif is_start_num(line):
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
    elif line.startswith("Table: "):
        table_start = True
        output.append("<table>")
        output.append("<caption>"+line+"</caption>")
    else:
        if not code_start and not num_start and not block_start :
            output.append("<div class='x3'>"+line.strip()+"</div>")
        else:
            output.append(es(line.replace("\n", "")))
    # Update index
    index = index + 1

output = "\n".join(output)
# Fix : Rempve leading line after the code
output = output.replace("<div class='code'>\n","<div class='code'>")
html  = Template(TEMPLATE).substitute({'CONTENT':output,'MENU':menu})
FILE_NAME = fname+".html"
#os.chmod(FILE_NAME, stat.S_IWRITE|stat.S_IWGRP|stat.S_IWOTH)
file = open(FILE_NAME,"w")
file.write(html)
file.close()
#os.chmod(FILE_NAME, stat.S_IREAD|stat.S_IRGRP|stat.S_IROTH)

print 'Successfully converted'
