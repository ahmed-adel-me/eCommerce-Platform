import Navbar from "./routes/root/Navbar";

export default function ErrorPage() {
  return (
    <>
      <Navbar />
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p></p>
      </div>
    </>
  );
}
