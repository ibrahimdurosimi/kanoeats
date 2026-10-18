import re

def update_file(filename, is_landing):
    with open(filename, 'r') as f:
        content = f.read()

    # Change props signature to use ...props: any
    if is_landing:
        content = re.sub(r'export default function LandingPage\({ onNavigate }: { onNavigate: \(tab: string\) => void }\) {',
                         r'export default function LandingPage({ onNavigate, ...props }: any) {', content)
        content = content.replace('window._cleanupLanding', '(window as any)._cleanupLanding')
    else:
        content = re.sub(r'export default function Dashboard\({ onNavigate }: { onNavigate: \(tab: string\) => void }\) {',
                         r'export default function Dashboard({ onNavigate, ...props }: any) {', content)
        content = content.replace('window._cleanup', '(window as any)._cleanup')

    with open(filename, 'w') as f:
        f.write(content)

update_file('src/components/LandingPage.tsx', True)
update_file('src/components/Dashboard.tsx', False)
