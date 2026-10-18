import re

def html_to_jsx(html):
    html = html.replace('class=', 'className=')
    html = html.replace('stroke-width=', 'strokeWidth=')
    html = html.replace('stroke-linecap=', 'strokeLinecap=')
    html = html.replace('stroke-linejoin=', 'strokeLinejoin=')
    html = html.replace('stroke-dasharray=', 'strokeDasharray=')
    html = html.replace('stroke-dashoffset=', 'strokeDashoffset=')
    html = html.replace('fill-rule=', 'fillRule=')
    html = html.replace('clip-rule=', 'clipRule=')
    html = html.replace('viewBox=', 'viewBox=')
    html = html.replace('for=', 'htmlFor=')
    
    # replace style="prop: val; prop2: val2" with style={{prop: 'val', prop2: 'val2'}}
    def repl_style(match):
        s = match.group(1)
        # simplistic conversion
        props = []
        for part in s.split(';'):
            part = part.strip()
            if not part: continue
            k, v = part.split(':', 1)
            k = k.strip()
            v = v.strip().replace("'", "\\'")
            # camel case k
            k = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
            props.append(f"{k}: '{v}'")
        return 'style={{' + ', '.join(props) + '}}'
    
    html = re.sub(r'style="([^"]*)"', repl_style, html)
    
    # remove onclick
    html = re.sub(r'onclick="[^"]*"', '', html)
    html = re.sub(r'onsubmit="[^"]*"', '', html)
    
    # close input tags, br, hr, img
    html = re.sub(r'<input([^>]*[^/])>', r'<input\1 />', html)
    html = re.sub(r'<br([^>]*[^/])>', r'<br\1 />', html)
    html = re.sub(r'<img([^>]*[^/])>', r'<img\1 />', html)
    
    # remove <!-- -->
    html = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', html, flags=re.DOTALL)
    
    return html

import sys
print("Script created")
