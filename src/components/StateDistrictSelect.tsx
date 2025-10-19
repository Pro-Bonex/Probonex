import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const US_STATES = [
  { code: "AL", name: "Alabama", districts: 7 },
  { code: "AK", name: "Alaska", districts: 1 },
  { code: "AZ", name: "Arizona", districts: 9 },
  { code: "AR", name: "Arkansas", districts: 4 },
  { code: "CA", name: "California", districts: 52 },
  { code: "CO", name: "Colorado", districts: 8 },
  { code: "CT", name: "Connecticut", districts: 5 },
  { code: "DE", name: "Delaware", districts: 1 },
  { code: "FL", name: "Florida", districts: 28 },
  { code: "GA", name: "Georgia", districts: 14 },
  { code: "HI", name: "Hawaii", districts: 2 },
  { code: "ID", name: "Idaho", districts: 2 },
  { code: "IL", name: "Illinois", districts: 17 },
  { code: "IN", name: "Indiana", districts: 9 },
  { code: "IA", name: "Iowa", districts: 4 },
  { code: "KS", name: "Kansas", districts: 4 },
  { code: "KY", name: "Kentucky", districts: 6 },
  { code: "LA", name: "Louisiana", districts: 6 },
  { code: "ME", name: "Maine", districts: 2 },
  { code: "MD", name: "Maryland", districts: 8 },
  { code: "MA", name: "Massachusetts", districts: 9 },
  { code: "MI", name: "Michigan", districts: 13 },
  { code: "MN", name: "Minnesota", districts: 8 },
  { code: "MS", name: "Mississippi", districts: 4 },
  { code: "MO", name: "Missouri", districts: 8 },
  { code: "MT", name: "Montana", districts: 2 },
  { code: "NE", name: "Nebraska", districts: 3 },
  { code: "NV", name: "Nevada", districts: 4 },
  { code: "NH", name: "New Hampshire", districts: 2 },
  { code: "NJ", name: "New Jersey", districts: 12 },
  { code: "NM", name: "New Mexico", districts: 3 },
  { code: "NY", name: "New York", districts: 26 },
  { code: "NC", name: "North Carolina", districts: 14 },
  { code: "ND", name: "North Dakota", districts: 1 },
  { code: "OH", name: "Ohio", districts: 15 },
  { code: "OK", name: "Oklahoma", districts: 5 },
  { code: "OR", name: "Oregon", districts: 6 },
  { code: "PA", name: "Pennsylvania", districts: 17 },
  { code: "RI", name: "Rhode Island", districts: 2 },
  { code: "SC", name: "South Carolina", districts: 7 },
  { code: "SD", name: "South Dakota", districts: 1 },
  { code: "TN", name: "Tennessee", districts: 9 },
  { code: "TX", name: "Texas", districts: 38 },
  { code: "UT", name: "Utah", districts: 4 },
  { code: "VT", name: "Vermont", districts: 1 },
  { code: "VA", name: "Virginia", districts: 11 },
  { code: "WA", name: "Washington", districts: 10 },
  { code: "WV", name: "West Virginia", districts: 2 },
  { code: "WI", name: "Wisconsin", districts: 8 },
  { code: "WY", name: "Wyoming", districts: 1 },
];

interface StateDistrictSelectProps {
  state: string;
  district: string;
  onStateChange: (state: string) => void;
  onDistrictChange: (district: string) => void;
}

export const StateDistrictSelect = ({ state, district, onStateChange, onDistrictChange }: StateDistrictSelectProps) => {
  const selectedState = US_STATES.find(s => s.code === state || s.name === state);
  const districtCount = selectedState?.districts || 0;

  const handleStateChange = (newState: string) => {
    onStateChange(newState);
    onDistrictChange(""); // Reset district when state changes
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="state">State *</Label>
        <Select value={state} onValueChange={handleStateChange}>
          <SelectTrigger id="state">
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {US_STATES.map((s) => (
              <SelectItem key={s.code} value={s.code}>
                {s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {state && (
        <div className="space-y-2">
          <Label htmlFor="district">Congressional District *</Label>
          <Select value={district} onValueChange={onDistrictChange}>
            <SelectTrigger id="district">
              <SelectValue placeholder="Select a district" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {Array.from({ length: districtCount }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={String(num)}>
                  District {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
