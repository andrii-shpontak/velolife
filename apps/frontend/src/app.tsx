import { useDummy } from "./hooks/use-dummy";

function App() {
  const { refetch } = useDummy();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-xl font-medium">Velo Life</h1>
      <div>
        <button onClick={() => refetch()}>Send Dummy Request</button>
      </div>
    </div>
  );
}

export default App;
