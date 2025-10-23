import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const UDHR_ARTICLES = [
  "Article 1 - Human Equality",
  "Article 2 - Freedom from discrimination (on any basis)",
  "Article 3 - Right to life, liberty, and security",
  "Article 4 - Freedom from slavery or servitude",
  "Article 5 - Freedom from torture or cruel punishment",
  "Article 6 - Right to recognition before the law",
  "Article 7 - Freedom from discrimination before the law",
  "Article 8 - *Constitutionally Dependant* right to remedy",
  "Article 9 - Freedom from arbitrary arrest or exile",
  "Article 10 - Right to fair (and public) trial",
  "Article 11 - Presumption of innocence + limit to penal sanctions",
  "Article 12 - Right to privacy of family, home, and correspondence",
  "Article 13 - Freedom of movement and residence + Int. Travel",
  "Article 14 - Right to seek asylum (N/A to non-political crimes)",
  "Article 15 - Right to nationality and freedom to change it",
  "Article 16 - Right to consensual marry and found a family",
  "Article 17 - Right to own property alone or in association",
  "Article 18 - Freedom of thought and religion, and change thereof",
  "Article 19 - Freedom of opinion and expression, regardless of media",
  "Article 20 - Freedom of peaceful assembly and association",
  "Article 21 - Right to participate in government and free elections",
  "Article 22 - Right to social security and personality development",
  "Article 23 - Right to work and take part in State and Economy",
  "Article 24 - Right to rest and leisure (reasonalbe work hours)",
  "Article 25 - Right to adequate standard of living (including children)",
  "Article 26 - Right to education (public and private)",
  "Article 27 - Right to freely participate in community",
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
