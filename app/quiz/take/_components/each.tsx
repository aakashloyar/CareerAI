'use client'
import { useQuestionStore } from "@/store/questionStore";
import { queOptType,optionType } from "@/lib/validation"
export default function Each({each, qNo}:{each:queOptType ;qNo:number}) {
    console.log("***")
    console.log(each)
    const { questions, setQuestions } = useQuestionStore();
    const togglePick = (qid: string, oid: string) => {
        console.log("toggle****");
        const updated = questions.map(q => {
            if (q.id !== qid) return q;
            if (q.type === "single") {
                return {
                ...q,
                options: q.options.map(o => ({
                    ...o,
                    isPicked: o.id === oid ? !o.isPicked : false
                }))
                };
            } else {
                return {
                ...q,
                options: q.options.map(o =>
                    o.id === oid ? { ...o, isPicked: !o.isPicked } : o
                )
                };
            }
        });
        setQuestions(updated);
    };
    return (
        <div className="border-4 border-blue-300 rounded-2xl p-6 my-6 shadow-lg bg-gradient-to-r from-blue-50 to-white">
            {/* Question Header */}
           <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg">
                P{qNo}
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {each.value}
                </div>
                <div className="text-sm text-gray-500 italic">
                  {each.type} correct
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-3">
                {each.options.map((option, index) => (
                    <Option
                        key={option.id}
                        option={option}
                        number={index + 1}
                        onToggle={() => togglePick(each.id, option.id)}
                    />
                ))}
            </div>
        </div>
    )
   
}
export function Option({ option, number, onToggle}: { option: optionType; number: number;  onToggle: () => void }) {
  return (
    <div className="my-4">
      <div
        onClick={onToggle}
        className={`flex items-center gap-3 rounded-2xl border p-4 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer
          ${option.isPicked 
            ? "border-green-400 bg-green-100"  // picked → green
            : "border-gray-200 bg-white"       // not picked → white
          }`}
      >
        {/* Number badge */}
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full font-bold shadow-md
            ${option.isPicked 
              ? "bg-green-500 text-white" 
              : "bg-gray-300 text-gray-700"
            }`}
        >
          {String.fromCharCode(64 + number)}
        </div>

        {/* Option text */}
        <div className="text-gray-800 font-medium text-lg tracking-wide">
          {option.value}
        </div>
      </div>
    </div>
  );
}
