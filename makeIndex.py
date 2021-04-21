import os
url="https://8onitsside.com/creative-coding/{}"
name1='{0}'
name2='{1}'
s =  \
f"""
<tr>
          <td id="indexTableData">
            <a href="{url.format('{0}')}" target="_blank">
              <div class='fullTdDiv'><span class='paddingSpan'>{name1}</span></div>
            </a>
          </td>
          <td id="indexTableData">
            <a href="{url.format('{1}')}" target="_blank">
              <div class='fullTdDiv'><span class='paddingSpan'>{name2}</span></div>
            </a>
          </td>
        </tr>
"""


ignore = ['reflections.bak', 'README.md', 'index.html', 'makeIndex.py', '.git', '.DS_Store']
tmp = []
print("<!-- BEGIN -->")
for i in os.listdir():
    if i in ignore: continue
    tmp.append(i)
    if len(tmp) == 2:
        print(s.format(*tmp))
        tmp = []
if (len(tmp)):
    if len(tmp) == 1:
        tmp = [tmp[0], tmp[0]]
    print(s.format(*tmp))
print("<!-- END -->")
