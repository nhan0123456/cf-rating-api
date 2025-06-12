import useSWR from 'swr';
import { Line } from 'react-chartjs-2';

export default function Home() {
  const { data, error } = useSWR('/api/rating', url => fetch(url).then(r => r.json()));

  if (error) return <div>Error: {error.error || 'Không thể load dữ liệu'}</div>;
  if (!data) return <div>Loading...</div>;

  const labels = data.data.map(d => new Date(d.time).toLocaleDateString());
  const ratings = data.data.map(d => d.newRating);

  return (
    <div>
      <h1>Rating history of {data.handle}</h1>
      <Line data={{
        labels,
        datasets: [{ label: 'Rating', data: ratings, fill: false, borderColor: 'blue' }]
      }} />
    </div>
  );
}
