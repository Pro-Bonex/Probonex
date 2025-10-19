import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const CONSTITUTION_ARTICLES = [
  "1st Amendment - Freedom of Speech, Religion, Press",
  "4th Amendment - Search and Seizure",
  "5th Amendment - Due Process, Self-Incrimination",
  "6th Amendment - Right to Fair Trial",
  "8th Amendment - Cruel and Unusual Punishment",
  "13th Amendment - Abolition of Slavery",
  "14th Amendment - Equal Protection, Due Process",
  "15th Amendment - Voting Rights (Race)",
  "19th Amendment - Voting Rights (Gender)",
];

interface ConstitutionSelectProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const ConstitutionSelect = ({ selected, onChange }: ConstitutionSelectProps) => {
  const handleToggle = (article: string) => {
    if (selected.includes(article)) {
      onChange(selected.filter(a => a !== article));
    } else {
      onChange([...selected, article]);
    }
  };

  return (
    <div className="space-y-2">
      <Label>U.S. Constitution Violations (select all that apply)</Label>
      <div className="border rounded-lg p-4 space-y-2 max-h-60 overflow-y-auto">
        {CONSTITUTION_ARTICLES.map((article) => (
          <div key={article} className="flex items-center space-x-2">
            <Checkbox
              id={`const-${article}`}
              checked={selected.includes(article)}
              onCheckedChange={() => handleToggle(article)}
            />
            <label
              htmlFor={`const-${article}`}
              className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {article}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
