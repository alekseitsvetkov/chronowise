import '@chronowise/ui/style';

export const metadata = {
  title: 'Chronowise',
  description: 'Chronowise is a better way to improve your workflow. Meet the new way to increase productivity and reduce stress.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
