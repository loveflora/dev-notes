export default function MovieDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  return <h1>Movies {id}</h1>;
}

// 폴더명 [ ] dynamic router

//) console.log(props); 라고 하면 ?
// http://localhost:3000/movies/1?region=kr&page=2
// { params: { id: '1' }, searchParams: { region: 'kr', page: '2' } }
