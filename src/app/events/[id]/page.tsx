import Enforce from "@/util/enforce";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Enforce>
      <div className="p-24 min-h-[calc(100vh)] bg-white text-primary">
        My Post: {params.id}
      </div>
    </Enforce>
  )
}