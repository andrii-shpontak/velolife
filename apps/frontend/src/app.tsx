import { useState } from "react";
import { useDummy } from "./hooks/use-dummy";
import { useUploadFile } from "./hooks/use-upload-file";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const uploadMutation = useUploadFile();
  const { refetch, data, isLoading, error } = useDummy();

  console.log({ data, error });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;
    uploadMutation.mutate(file);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-3">
      <h1 className="text-xl font-medium">Velo Life</h1>

      <input type="file" accept="image/*" onChange={handleChange} />

      <h2 className="text-2xl font-bold">BE status</h2>

      {!isLoading && (
        <>
          {data && <p>{String(data)}</p>}
          {error && <p className="text-red-500">{JSON.stringify(error)}</p>}
        </>
      )}

      <button
        className="border rounded-2xl text-2xl font-bold p-2"
        onClick={() => refetch()}
      >
        Ping
      </button>

      <button
        onClick={handleUpload}
        disabled={uploadMutation.isPending}
        className="border px-3 py-1 rounded"
      >
        {uploadMutation.isPending ? "Uploading..." : "Upload"}
      </button>

      {uploadMutation.isSuccess && (
        <img
          src={uploadMutation.data.url}
          alt="Uploaded"
          width={200}
          className="mt-4"
        />
      )}

      {uploadMutation.isError && (
        <p className="text-red-500">{uploadMutation.error.message}</p>
      )}
    </div>
  );
}

export default App;
