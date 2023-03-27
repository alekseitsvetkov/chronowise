import { Helmet } from 'react-helmet';
// import { getWindow } from '../utils';

export { Page };

function Page({ is404 }: { is404: boolean }) {
	return (
		<>
			<div className="flex w-full justify-center">
				<Helmet>
					<title>Not Found - Chronowise</title>
				</Helmet>
				<div className="m-auto flex flex-col items-center ">
					<div className="h-32" />
					<p>Thats a 404.</p>
					<div className="flex flex-wrap justify-center">
						{/* <a
						
							href={getWindow()?.document.referrer || 'javascript:history.back()'}
							className="mt-2 mr-3 cursor-pointer"
						>
							← Back
						</a> */}
						<a href="/" className="mt-2 cursor-pointer !text-white">
							Discover Chronowise →
						</a>
					</div>
				</div>
				<div className="h-80" />
			</div>
		</>
	);
}