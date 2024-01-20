export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="p-24 min-h-[calc(100vh)] bg-white text-primary">
      My Post: {params.id}
    </div>
  )
}