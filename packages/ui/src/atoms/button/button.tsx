import { VariantProps, cva, cx } from 'class-variance-authority';
import Link from 'next/link';
import * as React from 'react';
import { cn } from '../../lib';
import { SF_PRO_DISPLAY } from '../theme-provider/theme-provider';

const buttonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:data-[state=open]:bg-slate-800',
	{
		variants: {
			variant: {
				default:
					'bg-black text-white dark:hover:bg-white hover:bg-gray-600 dark:bg-white dark:text-black dark:hover:text-gray-500',
				destructive: 'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600',
				outline:
					'border border-slate-200 bg-transparent hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100',
				subtle:
					'hover:border-app-line/50 active:border-app-line active:bg-app-box/30 border-transparent',
				ghost:
					'bg-transparent hover:bg-slate-100 data-[state=open]:bg-transparent dark:text-slate-100 dark:hover:bg-gray-800 dark:hover:text-slate-100 dark:data-[state=open]:bg-transparent',
				link: 'bg-transparent text-slate-900 underline-offset-4 hover:bg-transparent hover:underline dark:bg-transparent dark:text-slate-100 dark:hover:bg-transparent'
			},
			size: {
				default: 'h-10 py-2 px-4',
				sm: 'h-9 rounded-md px-2',
				lg: 'rounded-lg py-4 px-5'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	VariantProps<typeof buttonVariants> { }

export interface LinkButtonProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
	VariantProps<typeof buttonVariants> {
	href: string;
}

const hasHref = (props: ButtonProps | LinkButtonProps): props is LinkButtonProps => 'href' in props;

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps | LinkButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return hasHref(props) ? (
			<Link {...props} ref={ref as any} className={cx(className, 'inline-block no-underline')} />
		) : (
			<button
				className={cn(
					buttonVariants({ variant, size, className }),
					`${SF_PRO_DISPLAY.variable} font-sans tracking-wide`
				)}
				ref={ref as any}
				{...props as ButtonProps}
			/>
		);
	}
);

Button.displayName = 'Button';

export { Button, buttonVariants };
