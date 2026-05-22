type CollegeDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CollegeDetailPage({ params }: CollegeDetailPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen px-6 py-16 text-slate-100 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-4xl space-y-4">
        <h1 className="text-3xl font-semibold">College detail</h1>
        <p className="text-slate-300">Showing details for college ID: {id}</p>
      </section>
    </main>
  );
}