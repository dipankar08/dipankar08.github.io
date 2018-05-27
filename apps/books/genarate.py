#!/usr/bin/python
import sys
from string import Template
fname = sys.argv[1]
TEMPLATE="""
<html>
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
    ol,ul{margin-bottom: 35px;text-align: justify;}
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

    div.x1{ font-size: 3rem; text-align: center;margin-top: 50px;margin-bottom: 100px;}
    div.x2{ font-size: 1.5rem;margin-bottom: 25px;margin-top: 20px;}
    div.x3{ font-size: 1rem;margin-bottom: 10px;text-align: justify;}

    .top {
        position: fixed;
        height: 40px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        width: 100%;
        top: 0;
    }
    .top .t { padding: 10px; margin-right:10px}
    .left {position:fixed;left: 0px;top: 50px;padding:5px;width: 300px;height: 100%; display:none;overflow: auto;border-right: 1px solid #575757;}
    .right{max-width: 800px; margin: 10px auto;padding:15px; margin-top:50px}

    a {display: block;font-family: 'Source Sans Pro', sans-serif; text-decoration: none; margin-bottom: 8px;}
    a.a1{font-weight:bold;font-size: 16px;}
    a.a2{margin-left:20px;}

    .footer{font-size: 11px;text-align: center;border-top: 1px solid #575757;}

    body.shown_menu .left {display:block}
    body.shown_menu .right {margin-left:320px;}

    body.dark,body.dark .top, body.dark a {background: #353535;color: #a7a0a0;}
    body.dark div.code {color: #0daf32;}
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
<div class="left" style="">$MENU</div>
<div class="right" style="">$CONTENT</div>
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
                output.append(es(line.replace("\n", "")))

output = "\n".join(output)
html  = Template(TEMPLATE).substitute({'CONTENT':output,'MENU':menu})
file = open(fname+".html","w")
file.write(html)
file.close()

print 'Successfully converted'
