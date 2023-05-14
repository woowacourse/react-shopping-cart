import React, { Suspense } from 'react';
import styled from 'styled-components';

const Img = React.lazy(() => import('@/components/Img'));

const StyledJUA = styled.h1`
	font-family: 'Jua', sans-serif;
`;

const StyledHANNA11yrs = styled.h1`
	font-family: 'HANNA-11yrs', sans-serif;
`;

const StyledHANNAAir = styled.h1`
	font-family: 'HANNA-Air', sans-serif;
`;

const StyledDoHyeon = styled.h1`
	font-family: 'DoHyeon', sans-serif;
`;

function Check() {
	return (
		<>
			<StyledJUA>checkComponent</StyledJUA>
			<StyledHANNA11yrs>checkComponent</StyledHANNA11yrs>
			<StyledHANNAAir>checkComponent</StyledHANNAAir>
			<StyledDoHyeon>checkComponent</StyledDoHyeon>
			<Suspense fallback={<div>hi</div>}>
				<Img />
			</Suspense>
		</>
	);
}

export default Check;
