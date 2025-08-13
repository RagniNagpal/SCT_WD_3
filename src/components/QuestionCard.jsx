export default function QuestionCard({ question, options, type, selected, onSelect }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4" dangerouslySetInnerHTML={{ __html: question }}></h2>
      <div className="space-y-3">
        {type === "fill" ? (
          <input
            type="text"
            value={selected || ""}
            onChange={(e) => onSelect(e.target.value)}
            className="border rounded w-full p-2"
            placeholder="Type your answer"
          />
        ) : (
          options.map((opt, i) => (
            <button
              key={i}
              className={`w-full text-left border rounded p-2 transition ${
                selected.includes(opt)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
              onClick={() => onSelect(opt)}
              dangerouslySetInnerHTML={{ __html: opt }}
            ></button>
          ))
        )}
      </div>
    </div>
  );
}
