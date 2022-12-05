interface Props {
  equation: string;
  result: string;
}

export const Result: React.FC<Props> = ({ equation, result }) => {
  return (
    <div className="flex justify-end p-8 bg-gray-800 rounded-xl">
      <div className="flex flex-col items-end">
        <p className="font-medium tracking-tighter mb-4">
          {equation}
        </p>
        <p className="text-5xl font-bold">
          {result}
        </p>
      </div>
    </div>
  )
}
