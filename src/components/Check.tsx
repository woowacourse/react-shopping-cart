import React, { ChangeEventHandler, Suspense } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { textState } from '@/atoms/textState';

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
	const [text, setText] = useRecoilState(textState);

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setText(e.target.value);
	};

	return (
		<>
			<div>{text}</div>
			<input type="text" value={text} onChange={onChange} />
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
