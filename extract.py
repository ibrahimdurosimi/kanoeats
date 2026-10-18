import sys

with open('prompt.txt', 'r') as f:
    content = f.read()

parts = content.split('<!DOCTYPE html>')
if len(parts) >= 3:
    app_html = '<!DOCTYPE html>' + parts[1]
    index_html = '<!DOCTYPE html>' + parts[2]
    
    with open('app_raw.html', 'w') as f:
        f.write(app_html)
        
    with open('index_raw.html', 'w') as f:
        f.write(index_html)
