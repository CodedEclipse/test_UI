import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return <Spinner animation="border" className='spinner-border-sm'  />;
}
function LoaderWight() {
  return <Spinner animation="border" className='spinner-border-sm' variant="light" />;
}
function PageLoader() {
  return (<div className='d-flex align-items-center justify-content-center w-100' style={{ height: '80vh' }}>
    <Spinner animation="grow" size='lg' className='color-volite' />
    <Spinner animation="grow" className='mx-2 color-volite' />
    <Spinner animation="grow" size='sm' className='color-volite' />
  </div>)
}
function PageLoaderBackdrop() {
  return (
    <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Spinner className='pageLoader' animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
  )
}

export { Loader, PageLoader,PageLoaderBackdrop,LoaderWight }