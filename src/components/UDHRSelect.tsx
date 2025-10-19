import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const UDHR_ARTICLES = [
  "Article 1 - All human beings are born free and equal",
  "Article 2 - Freedom from discrimination",
  "Article 3 - Right to life, liberty, and security",
  "Article 4 - Freedom from slavery",
  "Article 5 - Freedom from torture",
  "Article 6 - Right to recognition before the law",
  "Article 7 - Right to equality before the law",
  "Article 8 - Right to effective remedy",
  "Article 9 - Freedom from arbitrary arrest",
  "Article 10 - Right to fair trial",
  "Article 11 - Presumption of innocence",
  "Article 12 - Right to privacy",
  "Article 13 - Freedom of movement",
  "Article 14 - Right to asylum",
  "Article 15 - Right to nationality",
  "Article 18 - Freedom of thought and religion",
  "Article 19 - Freedom of opinion and expression",
  "Article 20 - Freedom of assembly",
  "Article 21 - Right to participate in government",
  "Article 23 - Right to work",
  "Article 25 - Right to adequate standard of living",
];

interface UDHRSelectProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const UDHRSelect = ({ selected, onChange }: UDHRSelectProps) => {
  const handleToggle = (article: string) => {
    if (selected.includes(article)) {
      onChange(selected.filter(a => a !== article));
    } else {
      onChange([...selected, article]);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Universal Declaration of Human Rights Violations (select all that apply)</Label>
      <div className="border rounded-lg p-4 space-y-2 max-h-60 overflow-y-auto">
        {UDHR_ARTICLES.map((article) => (
          <div key={article} className="flex items-center space-x-2">
            <Checkbox
              id={`udhr-${article}`}
              checked={selected.includes(article)}
              onCheckedChange={() => handleToggle(article)}
            />
            <label
              htmlFor={`udhr-${article}`}
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
