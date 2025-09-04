import Header from '../components/Header';

export default function Home() {
  return (
    <>
      <div className="w-full">
        <Header />
      </div>
    </>
  );
}

export function loader() {
  return 'Home data';
}
