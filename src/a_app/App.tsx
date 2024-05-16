import { Layout } from '../f_shared/ui/Layout/Layout.tsx';

function App() {
  console.log('ds');
  return (
    <>
      <Layout
        headerSlot={<div style={{ backgroundColor: 'lightblue' }}>headerSlot</div>}
        footerSlot={<div style={{ backgroundColor: 'lightgreen' }}>footerSlot</div>}
        fixHeader
        fixFooter
      ></Layout>
    </>
  );
}

export default App;
