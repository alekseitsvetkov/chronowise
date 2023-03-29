import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center px-4">
			{/* <Helmet>
				<title>Chronowise — A focus timer from the future.</title>
				<meta
					name="description"
					content="Chronowise is a better way to improve your workflow. Meet the new way to increase productivity and reduce stress."
				/>
				<meta
					property="og:image"
					content="https://raw.githubusercontent.com/chronowise/.github/main/profile/chronowise_icon.png"
				/>
				<meta
					name="keywords"
					content="pomodoro, focus timer, chronowise"
				/>
				<meta name="author" content="Chronowise Technology Inc." />
			</Helmet> */}
			{/* <div className="mt-22 lg:mt-28" id="content" aria-hidden="true" /> */}
			{/* <div className="mt-24 lg:mt-5" /> */}

			<h1 className="fade-in-heading z-30 px-2 text-center text-4xl font-black leading-tight text-black dark:text-white">
				Chronowise is a better way<br />to improve your workflow
			</h1>
			<p className="mt-3 text-center text-lg">
				Meet the new way to increase productivity and<br />reduce stress.
			</p>
		</div>
    // <main className={styles.main}>
    //   <div className={styles.description}>
    //     <p>
    //       Get started by editing&nbsp;
    //       <code className={styles.code}>app/page.tsx</code>
    //     </p>
    //     <div>
    //       <a
    //         href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         By{' '}
    //         <Image
    //           src="/vercel.svg"
    //           alt="Vercel Logo"
    //           className={styles.vercelLogo}
    //           width={100}
    //           height={24}
    //           priority
    //         />
    //       </a>
    //     </div>
    //   </div>

    //   <div className={styles.center}>
    //     <Image
    //       className={styles.logo}
    //       src="/next.svg"
    //       alt="Next.js Logo"
    //       width={180}
    //       height={37}
    //       priority
    //     />
    //     <div className={styles.thirteen}>
    //       <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
    //     </div>
    //   </div>

    //   <div className={styles.grid}>
    //     <a
    //       href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className={styles.card}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={inter.className}>
    //         Docs <span>-&gt;</span>
    //       </h2>
    //       <p className={inter.className}>
    //         Find in-depth information about Next.js features and API.
    //       </p>
    //     </a>

    //     <a
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className={styles.card}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={inter.className}>
    //         Templates <span>-&gt;</span>
    //       </h2>
    //       <p className={inter.className}>Explore the Next.js 13 playground.</p>
    //     </a>

    //     <a
    //       href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       className={styles.card}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={inter.className}>
    //         Deploy <span>-&gt;</span>
    //       </h2>
    //       <p className={inter.className}>
    //         Instantly deploy your Next.js site to a shareable URL with Vercel.
    //       </p>
    //     </a>
    //   </div>
    // </main>
  )
}
