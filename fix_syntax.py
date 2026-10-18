with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

target = """            </div>
        </header>"""

replacement = """            </div>
          </div>
        </header>"""

content = content.replace(target, replacement)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
