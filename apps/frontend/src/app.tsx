import { useDummy } from "./hooks/use-dummy";

function App() {
  const { refetch } = useDummy();

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => refetch()}>Send Dummy Request</button>
      </div>
    </>
  );
}

export default App;
