def fix_file(filename):
    with open(filename, 'r') as f:
        content = f.read()
    
    # Remove export from the script tag content
    content = content.replace("export function initLandingScript", "function initLandingScript")
    content = content.replace("export function initAppScript", "function initAppScript")
    
    with open(filename, 'w') as f:
        f.write(content)

fix_file('src/components/LandingPage.tsx')
fix_file('src/components/Dashboard.tsx')
