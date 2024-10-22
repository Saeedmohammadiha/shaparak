import { Breakpoint, PaperProps } from '@mui/material';
import { ReactNode } from 'react';

export type Props = {
	children: ReactNode | ReactNode[];
	fullWidthBreakpoint?: Breakpoint | number;
	muiPaperProps?: PaperProps;
};
