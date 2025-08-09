interface PageProps {
  params: Promise<{
    id: string[];
  }>;
}

export default async function Page({ params }: PageProps) {
  const par = await params;
  console.log('***** aagaya')
  console.log("*****",par)
  console.log("***********", par.id); // Will log ['foo', 'bar']

  return (
    <div>
      <h1>Params: {par.id.join('/')}</h1>
    </div>
  );
}

