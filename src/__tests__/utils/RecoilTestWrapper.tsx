import { RecoilRoot, SetRecoilState } from "recoil";

const RecoilTestWrapper: React.FC<{
  children: React.ReactNode;
  initializeState: ({ set }: { set: SetRecoilState }) => void;
}> = ({ children, initializeState }) => (
  <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
);

export default RecoilTestWrapper;
