import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const categories = [
  { id: "noodles", label: "Noodles" },
  { id: "sauces", label: "Sauces" },
  { id: "ingredients", label: "Ingredients" },
  { id: "seasonings", label: "Seasonings" },
  { id: "equipment", label: "Equipment" },
];

export function ProductFilters() {
  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox id={category.id} />
              <Label htmlFor={category.id}>{category.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider
            defaultValue={[0, 100]}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span>$0</span>
            <span>$100</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold mb-4">Availability</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" />
            <Label htmlFor="in-stock">In Stock</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="bulk-order" />
            <Label htmlFor="bulk-order">Bulk Order Available</Label>
          </div>
        </div>
      </div>

      <Button className="w-full mt-4">Apply Filters</Button>
    </Card>
  );
} 