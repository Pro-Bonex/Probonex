import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationAutocompleteProps {
  city: string;
  state: string;
  onCityChange: (city: string) => void;
  onStateChange: (state: string) => void;
}

{/* Define Possible States */}
const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

export const LocationAutocomplete = ({ city, state, onCityChange, onStateChange }: LocationAutocompleteProps) => {
  // Left Loader - Pre-code
  const [stateOpen, setStateOpen] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [cityOpen, setCityOpen] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // Fetch Cities Function using CountriesNow API - UNUSED IN ACTUAL IMPLEMENTATION 10/22/2025
  useEffect(() => {
    const fetchCities = async () => {
      if (!state) {
        setCities([]);
        return;
      }

      setLoadingCities(true);
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            country: 'United States',
            state: state
          })
        });

        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          setCities(data.data.sort());
        } else {
          setCities([]);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, [state]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        {/* State Dropdown */}
        <Label>State *</Label>
        <Popover open={stateOpen} onOpenChange={setStateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={stateOpen}
              className="w-full justify-between"
            >
              {state || "Select state..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          
          {/* Text Applicable - Only with user typing */}
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search state..." />
              <CommandList>
                <CommandEmpty>No state found.</CommandEmpty>
                <CommandGroup>
                  {US_STATES.map((stateName) => (
                    <CommandItem
                      key={stateName}
                      value={stateName}
                      onSelect={(currentValue) => {
                        onStateChange(currentValue === state ? "" : currentValue);
                        onCityChange(""); // Reset city when state changes
                        setStateOpen(false); // Reset "State" active select state
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          state === stateName ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {stateName}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Selection City Trigger - UNUSED 10/22/2025 */}
      <div className="space-y-2">
        <Label>City *</Label>
        {!state ? (
          <Input
            placeholder="Select a state first"
            disabled
          />
        ) : loadingCities ? (
          <Input
            placeholder="Loading cities..."
            disabled
          />
        ) : cities.length > 0 ? (
          <Popover open={cityOpen} onOpenChange={setCityOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={cityOpen}
                className="w-full justify-between"
              >
                {city || "Select city..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search city..." />
                <CommandList>
                  <CommandEmpty>No city found.</CommandEmpty>
                  <CommandGroup>

                    {/* Mapping Commands */}
                    {cities.map((cityName) => (
                      <CommandItem
                        key={cityName}
                        value={cityName}
                        onSelect={(currentValue) => {
                          onCityChange(currentValue === city ? "" : currentValue);
                          setCityOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            city === cityName ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {cityName}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        ) : (
          // Fallover Method - Simple Input (USED AS CITY PERCISION DOESNT IMPACT APP FUNCTIONALITY 10/22/2025)
          <Input
            placeholder="Enter city name"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};