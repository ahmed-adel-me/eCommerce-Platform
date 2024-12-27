export default function ErrorPage({ error }) {
  return (
    <div className="flex justify-center flex-col items-center h-screen gap-5">
      <h1 className="text-4xl">Whoops, something went wrong.</h1>
      <p className="text-lg">{error.message}</p>
      <a
        className="bg-gray-800 text-white py-1 px-3 rounded-md text-lg font-semibold hover:opacity-75"
        href="/"
      >
        Go home
      </a>
    </div>
  );
}
